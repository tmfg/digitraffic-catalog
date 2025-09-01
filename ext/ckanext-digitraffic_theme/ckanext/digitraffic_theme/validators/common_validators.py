from ckan.plugins.toolkit import _

def url_error_message_formatting(key, data, errors, context):
    if key in errors and len(errors[key]) > 0:
        # Even though the value of errors[key] is a list, it is pretty much treated as a string
        # as only the first element is used and the rest are ignored by the rest of the code.
        errors[key] = [
            "{original_error}. {instructions}".format(original_error=errors[key][0], instructions=_("Make sure the URL starts with http:// or https://"))
        ]
