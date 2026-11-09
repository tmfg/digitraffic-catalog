"""
CKAN's own browser texts that CKAN's Finnish and Swedish catalogs leave untranslated.

Listing them here keeps them in this extension's .pot, so update_catalog keeps their translations;
`ckan translation js` merges our .po files over CKAN's. Only Babel reads this module.
"""


def _(message: str) -> str:
    return message


CKAN_JS_MESSAGES = (
    _("Please Confirm"),
    _("Searching..."),
    _("Notification"),
    _("Reorder resource view"),
)
