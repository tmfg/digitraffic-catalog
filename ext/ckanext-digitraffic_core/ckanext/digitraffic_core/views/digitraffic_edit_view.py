from typing import Union, Optional
from werkzeug.datastructures import MultiDict, ImmutableMultiDict

import ckan.plugins.toolkit as toolkit
from ckan.views.user import EditView
from flask import Response

class DigitrafficEditView(EditView):
    """
    The default User edit view expects a password to be set. However, we use Azure AD set tokens.
    """
    def post(self, id: Optional[str] = None) -> Union[Response, str]:
        form_data = MultiDict(toolkit.request.form)
        form_data.update({"password1": "", "password2": "", "old_password": ""})
        toolkit.request.form = ImmutableMultiDict(form_data)
        return super().post(id)