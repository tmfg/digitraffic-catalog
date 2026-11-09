import os

import ckan
import polib
import pytest

from ckanext.digitraffic_core.js_translations import CKAN_JS_MESSAGES

I18N_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "i18n")
CKAN_POT = os.path.join(os.path.dirname(ckan.__file__), "i18n", "ckan.pot")
OUR_POT = os.path.join(I18N_DIR, "ckanext-digitraffic_core.pot")


def _po(lang: str) -> polib.POFile:
    return polib.pofile(os.path.join(I18N_DIR, lang, "LC_MESSAGES", "ckanext-digitraffic_core.po"))


def _js_msgids() -> set[str]:
    return {
        entry.msgid
        for pot in (CKAN_POT, OUR_POT)
        for entry in polib.pofile(pot)
        if any(file.endswith(".js") for file, _line in entry.occurrences)
    }


@pytest.mark.parametrize("lang", ["fi", "sv"])
def test_ckan_js_messages_are_translated(lang):
    po = _po(lang)
    for msgid in CKAN_JS_MESSAGES:
        entry = po.find(msgid)
        assert entry is not None and entry.msgstr and not entry.fuzzy, f"{lang}: {msgid!r} is not translated"


@pytest.mark.parametrize("lang", ["fi", "sv"])
def test_no_fuzzy_or_obsolete_translation_reaches_javascript(lang):
    # `ckan translation js` exports every entry that has a msgstr, also fuzzy and obsolete ones
    js_msgids = _js_msgids()
    leaking = [
        entry.msgid
        for entry in _po(lang)
        if entry.msgid in js_msgids and entry.msgstr and (entry.fuzzy or entry.obsolete)
    ]
    assert leaking == []
