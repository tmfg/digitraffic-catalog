import os

import ckan.plugins as plugins
import yaml, json, six, re
from ckan.plugins import SingletonPlugin
from ckan.plugins.toolkit import Invalid, get_validator, missing
from ckanext.fluent.helpers import fluent_alternate_languages, fluent_form_languages
from ckanext.scheming.helpers import scheming_language_text
from ckanext.scheming.validation import scheming_validator, validators_from_string
from ckantoolkit import _, config

# loose definition of BCP47-like strings
BCP_47_LANGUAGE = "^[a-z]{2,8}(-[0-9a-zA-Z]{1,8})*$"

LANG_SUFFIX = "_translated"

current_dir = os.path.dirname(__file__)
yaml_path = os.path.join(current_dir, "schemas/mobility_dcat.yaml")

with open(yaml_path, "r") as file:
    schema = yaml.safe_load(file)


def find_field(schema, field_name):
    for field in schema.get("resource_fields", []):
        if field.get("field_name") == field_name:
            return field
    return None


# set field format_iri for CKAN extras on the basis of current format label
def set_format_iri(key, data, errors, context):
    format_key = ("resources", 0, "format")
    format_value = data.get(format_key)
    if format_value:
        format_iri = None
        format_field = find_field(schema, "format")
        if format_field:
            format_choices = format_field.get("choices", [])
            for choice in format_choices:
                if choice["label"] == format_value:
                    format_iri = choice["iri"]
        if format_iri:
            data[key] = format_iri
            return True
    return False


@scheming_validator
def fluent_text(field, schema):
    """
    Accept multilingual text input in the following forms
    and convert to a json string for storage:

    1. a multilingual dict, eg.

       {"en": "Text", "fr": "texte"}

    2. a JSON encoded version of a multilingual dict, for
       compatibility with old ways of loading data, eg.

       '{"en": "Text", "fr": "texte"}'

    3. separate fields per language (for form submissions):

       fieldname-en = "Text"
       fieldname-fr = "texte"

    When using this validator in a ckanext-scheming schema setting
    "required" to true will make all form languages required to
    pass validation.
    """
    # combining scheming required checks and fluent field processing
    # into a single validator makes this validator more complicated,
    # but should be easier for fluent users and eliminates quite a
    # bit of duplication in handling the different types of input
    print("joo")
    required_langs = []
    alternate_langs = {}
    if field and field.get("required"):
        required_langs = fluent_form_languages(field, schema=schema)
        alternate_langs = fluent_alternate_languages(field, schema=schema)

    def validator(key, data, errors, context):
        print("joo2")
        # just in case there was an error before our validator,
        # bail out here because our errors won't be useful
        if errors[key]:
            return

        value = data[key]
        # 1 or 2. dict or JSON encoded string
        if value is not missing:
            if isinstance(value, six.string_types):
                try:
                    value = json.loads(value)
                except ValueError:
                    errors[key].append(_("Failed to decode JSON string"))
                    return
            if not isinstance(value, dict):
                errors[key].append(_("expecting JSON object"))
                return

            for lang, text in value.items():
                try:
                    m = re.match(BCP_47_LANGUAGE, lang)
                except TypeError:
                    errors[key].append(_("invalid type for language code: %r") % lang)
                    continue
                if not m:
                    errors[key].append(_('invalid language code: "%s"') % lang)
                    continue
                if not isinstance(text, six.string_types):
                    errors[key].append(_('invalid type for "%s" value') % lang)
                    continue
                if isinstance(text, str):
                    try:
                        value[lang] = (
                            text if six.PY3 else text.encode("utf-8").decode("utf-8")
                        )
                    except UnicodeDecodeError:
                        errors[key].append(_('invalid encoding for "%s" value') % lang)

            for lang in required_langs:
                if value.get(lang) or any(
                    value.get(l) for l in alternate_langs.get(lang, [])
                ):
                    continue
                errors[key].append(_('Required language "%s" missing') % lang)

            if not errors[key]:
                data[key] = json.dumps(value, ensure_ascii=False)
            return

        # 3. separate fields
        output = {}
        prefix = key[-1] + "-"
        extras = data.get(key[:-1] + ("__extras",), {})

        for name, text in extras.items():
            if not name.startswith(prefix):
                continue
            lang = name.split("-", 1)[1]
            m = re.match(BCP_47_LANGUAGE, lang)
            if not m:
                errors[name] = [_('invalid language code: "%s"') % lang]
                output = None
                continue

            if output is not None:
                output[lang] = text

        for lang in required_langs:
            if extras.get(prefix + lang) or any(
                extras.get(prefix + l) for l in alternate_langs.get(lang, [])
            ):
                continue
            errors[key[:-1] + (key[-1] + "-" + lang,)] = [_("Missing value")]
            output = None

        if output is None:
            return

        for lang in output:
            del extras[prefix + lang]
        data[key] = json.dumps(output, ensure_ascii=False)

    return validator


class DigitrafficValidators(SingletonPlugin):
    plugins.implements(plugins.IValidators)

    def get_validators(self):
        return {
            "set_format_iri": set_format_iri,
        }
