"""CKAN adapter: which other active organisation holds an organisation's identifiers."""

from __future__ import annotations

from typing import Optional

from ckan import model
from sqlalchemy import and_, or_

from ckanext.digitraffic_core.identifiers.organization_identifiers import (
    OrganizationIdentifiers,
)


class IdentifierHolders:
    """The identifiers stored on active organisations, queried through CKAN's model."""

    def find_other_holder(
        self, identifiers: OrganizationIdentifiers, excluding_group_id: Optional[str]
    ) -> Optional[str]:
        """The id of an active organisation, other than `excluding_group_id`, that holds any of the
        identifiers' entity keys as an active extra; `None` when there is none."""
        entity_keys = identifiers.collect_entity_keys()
        if not entity_keys:
            return None
        collisions = [
            and_(model.GroupExtra.key == key, model.GroupExtra.value == value)
            for key, value in entity_keys
        ]
        query = (
            model.Session.query(model.GroupExtra.group_id)
            .join(model.Group, model.Group.id == model.GroupExtra.group_id)
            .filter(model.Group.is_organization.is_(True))
            .filter(model.Group.state == "active")
            .filter(model.GroupExtra.state == "active")
            .filter(or_(*collisions))
        )
        if excluding_group_id is not None:
            query = query.filter(model.Group.id != excluding_group_id)
        holder = query.first()
        return None if holder is None else holder.group_id
