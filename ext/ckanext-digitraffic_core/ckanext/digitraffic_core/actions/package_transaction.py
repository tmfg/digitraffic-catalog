from typing import Any, Callable

import ckan.model as model
import ckan.plugins.toolkit as toolkit
from ckan.lib.search import rebuild
from ckan.types import Context, DataDict

_TRANSACTION_KEY = "digitraffic_core_package_transaction"
_DEFERRED = {"defer_commit": True, "return_id_only": True}
_ABSENT = object()


class PackageTransaction:
    def __init__(self, context: Context):
        self._context = context
        self._outermost = _TRANSACTION_KEY not in context
        if self._outermost:
            context[_TRANSACTION_KEY] = set()
        self._commits = self._outermost and not context.get("defer_commit")
        self._caller_wants_id = bool(context.get("return_id_only"))

    def call(self, action: Callable, data_dict: DataDict) -> str:
        previous = {key: self._context.get(key, _ABSENT) for key in _DEFERRED}
        self._context.update(_DEFERRED)
        try:
            package_id = action(self._context, data_dict)
        finally:
            for key, value in previous.items():
                if value is _ABSENT:
                    self._context.pop(key, None)
                else:
                    self._context[key] = value
        self._context[_TRANSACTION_KEY].add(package_id)
        return package_id

    def complete(self, package_id: str) -> Any:
        touched = self._context[_TRANSACTION_KEY]
        if self._outermost:
            del self._context[_TRANSACTION_KEY]
        if self._commits:
            model.repo.commit()
            for touched_id in touched:
                rebuild(package_id=touched_id)
        if self._caller_wants_id:
            return package_id
        return toolkit.get_action("package_show")(
            {"user": self._context.get("user"), "ignore_auth": True, "use_cache": False},
            {"id": package_id},
        )

    def abort(self) -> None:
        if self._outermost:
            self._context.pop(_TRANSACTION_KEY, None)
            model.repo.session.rollback()
