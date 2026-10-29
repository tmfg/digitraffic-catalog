"""CKAN validators for the organisation identifiers declared in `schemas/organization_schema.yaml`.

They translate between CKAN and the domain classes in `ckanext.digitraffic_core.identifiers`, which own the rules."""

import logging
from typing import Any, Optional, Union

import ckan.plugins.toolkit as toolkit
from ckan import authz, model
from ckan.lib.navl.dictization_functions import StopOnError, missing
from ckan.types import Context, FlattenDataDict, FlattenErrorDict, FlattenKey

from ckanext.digitraffic_core.identifiers.eudi import Eudi
from ckanext.digitraffic_core.identifiers.euid import Euid
from ckanext.digitraffic_core.identifiers.exceptions import (
    IdentifierChangeNotAllowed,
    IdentifierMismatch,
    InvalidFinnishEuid,
    InvalidIdentifier,
    MissingIdentifier,
)
from ckanext.digitraffic_core.identifiers.identifier_holders import IdentifierHolders
from ckanext.digitraffic_core.identifiers.organization_identifiers import (
    OrganizationIdentifiers,
)
from ckanext.digitraffic_core.identifiers.ytunnus import Ytunnus

IDENTIFIER_REQUIRED_OPTION = "ckanext.digitraffic_core.organization_identifier_required"

logger = logging.getLogger(__name__)

IdentifierClass = Union[type[Ytunnus], type[Euid], type[Eudi]]


def _is_blank(value: Any) -> bool:
    return value is missing or value is None or (isinstance(value, str) and not value.strip())


def _given(value: Any) -> Any:
    """CKAN's `missing` marker as `None`; any other value unchanged."""
    return None if value is missing else value


def _parse(identifier_class: IdentifierClass, value: Any) -> str:
    if not isinstance(value, str):
        raise toolkit.Invalid(toolkit._("The identifier must be text."))
    try:
        return str(identifier_class.parse(value))
    except InvalidIdentifier as error:
        raise toolkit.Invalid(str(error))


def _own_organization(data: FlattenDataDict) -> Optional[model.Group]:
    """The stored organisation being updated, or `None` when it is being created."""
    own_id = data.get(("id",))
    if _is_blank(own_id):
        return None
    return model.Group.get(own_id)


def _record_deleted_extra(
    key: FlattenKey, data: FlattenDataDict, errors: FlattenErrorDict, context: Context
) -> None:
    """Pass `key` to CKAN as a deleted extra: CKAN's `convert_to_extras` adds the entry, flagged `deleted` as in
    CKAN's extras schema."""
    data[key] = ""
    toolkit.get_converter("convert_to_extras")(key, data, errors, context)
    # convert_to_extras appends at the next index, so its entry is the last one.
    index = max(k[1] for k in data if len(k) > 1 and k[0] == "extras")
    data[("extras", index, "deleted")] = True


def ignore_blank_validator(
    key: FlattenKey, data: FlattenDataDict, errors: FlattenErrorDict, context: Context
) -> None:
    """Treat a missing, empty or whitespace-only value as not given: drop it and skip the remaining validators.

    A value given as empty or whitespace for a field the organisation stores deletes it. CKAN's `group_dict_save`
    leaves every stored extra in place when an update sends no extras, so without an explicit deletion clearing
    an organisation's only identifier would keep it. A field left out is not deleted here.

    The stored organisation is the one CKAN's update puts in `context["group"]` before validating; a create
    has none, and nothing to delete."""
    value = data.get(key)
    if not _is_blank(value):
        return
    stored = context.get("group")
    if value is not missing and stored is not None and key[-1] in stored.extras:
        _record_deleted_extra(key, data, errors, context)
    data.pop(key, None)
    raise StopOnError


def ytunnus_validator(value: Any, context: Context) -> Any:
    """Accept a Y-tunnus only in its stored form `1234567-8` (whitespace trimmed) with a valid check digit."""
    return _parse(Ytunnus, value)


def euid_validator(value: Any, context: Context) -> Any:
    """Accept an EUID in the generic EU structure, stored as entered (whitespace trimmed).

    Whether a `FIFPRO.` EUID names a valid Y-tunnus is checked with the other identifiers."""
    return _parse(Euid, value)


def eudi_validator(value: Any, context: Context) -> Any:
    """Trim an EUDI; any non-blank text is accepted."""
    return _parse(Eudi, value)


def organization_identifier_unique_validator(
    key: FlattenKey, data: FlattenDataDict, errors: FlattenErrorDict, context: Context
) -> None:
    """Reject an identifier another active organisation already holds, also across a Y-tunnus and its
    Finnish EUID, and a Finnish EUID without a valid Y-tunnus.

    The message does not name the other organisation."""
    value = data.get(key)
    if errors.get(key) or _is_blank(value):
        return

    try:
        identifiers = OrganizationIdentifiers.parse(**{key[-1]: value})
    except InvalidFinnishEuid as error:
        raise toolkit.Invalid(str(error))
    own = _own_organization(data)
    own_id = own.id if own is not None else None
    holder_id = IdentifierHolders().find_other_holder(identifiers, own_id)
    if holder_id is not None:
        logger.info(
            "Organisation identifier already in use: field=%s organization_id=%s holder_id=%s",
            key[-1],
            own_id,
            holder_id,
        )
        raise toolkit.Invalid(toolkit._("This identifier is already in use."))


def organization_identifier_sysadmin_only_validator(
    key: FlattenKey, data: FlattenDataDict, errors: FlattenErrorDict, context: Context
) -> None:
    """Let only a sysadmin set or change an identifier; for anyone else keep the stored value.

    A missing or blank value from a non-sysadmin is replaced by the stored one, so a form or API
    call that leaves the identifier out does not delete it."""
    if context.get("ignore_auth") or authz.is_sysadmin(context.get("user")):
        return

    own = _own_organization(data)
    try:
        stored = OrganizationIdentifiers.from_extras(own.extras if own is not None else {})
    except InvalidIdentifier:
        logger.warning(
            "Stored organisation identifiers break the identifier rules: organization_id=%s",
            own.id if own is not None else None,
        )
        errors[key].append(
            toolkit._("The stored identifiers are invalid; ask a system administrator to correct them.")
        )
        raise StopOnError
    try:
        kept = stored.keep_stored(key[-1], _given(data.get(key)))
    except IdentifierChangeNotAllowed:
        logger.warning(
            "Rejected organisation identifier change by a non-sysadmin: field=%s organization_id=%s",
            key[-1],
            own.id if own is not None else None,
        )
        errors[key].append(
            toolkit._("Only a system administrator can set or change this identifier.")
        )
        raise StopOnError
    if kept is not None:
        data[key] = kept


def organization_identifiers_validator(
    key: FlattenKey, data: FlattenDataDict, errors: FlattenErrorDict, context: Context
) -> None:
    """Organisation-level rules: a `FIFPRO.` EUID must name a valid Y-tunnus and match the given one, and, when
    `ckanext.digitraffic_core.organization_identifier_required` is on, at least one identifier is required.

    Fields that already failed their own validators are left out; they are not blank, so they also
    satisfy the requirement. CKAN also runs this validator when it shows an organisation, without the
    field validators, so a stored value that breaks the format rules is left to the field validators."""
    valid = {
        field: _given(data.get((field,)))
        for field in OrganizationIdentifiers.KEYS
        if not errors.get((field,))
    }
    try:
        identifiers = OrganizationIdentifiers.parse(**valid)
    except InvalidFinnishEuid as error:
        errors.setdefault((Euid.KEY,), []).append(str(error))
        return
    except IdentifierMismatch:
        errors.setdefault((Euid.KEY,), []).append(
            toolkit._("The Finnish EUID does not match the Y-tunnus.")
        )
        return
    except InvalidIdentifier:
        return

    required = toolkit.asbool(toolkit.config.get(IDENTIFIER_REQUIRED_OPTION))
    if required and len(valid) == len(OrganizationIdentifiers.KEYS):
        try:
            identifiers.require_any()
        except MissingIdentifier:
            errors.setdefault((Ytunnus.KEY,), []).append(
                toolkit._("An organisation needs a Y-tunnus, an EUID or an EUDI.")
            )
