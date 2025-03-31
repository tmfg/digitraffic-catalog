from flask.views import MethodView
import ckan.plugins.toolkit as toolkit

class RemovedView(MethodView):
    def get(self):
        http_code = 410
        extra_vars = {
            'code': http_code,
            'content': 'The page you are looking for has been removed.',
            'name': 'Page is removed',
            'show_login_redirect_link': False
        }
        return toolkit.render("error_document_template.html", extra_vars), http_code