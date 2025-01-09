import pprint
from ckan.logic import get_action, check_access
import ckan.model as model
from typing import cast
from ckan.common import current_user
from ckan.types import Context


def print_field_and_data(field_name: str, data: dict):
    print("FIELD NAME AND DATA ------>")
    print(f"field_name: {field_name}")
    pprint.pprint(data)
    print("<----- FIELD NAME AND DATA")


def is_dataset_public(dataset_id):
    dataset = model.Session.query(model.Package).filter_by(id=dataset_id).first()
    return isinstance(dataset, model.Package) and dataset.private is False


def get_datasets_as_form_choices():
    context = cast(
        Context,
        {
            "model": model,
            "session": model.Session,
            "user": current_user.name,
            "auth_user_obj": current_user,
        },
    )

    # returns datasets created by current user or belonging to organization the user also belongs to
    datasets = get_action("package_search")(
        context,
        {"q": "", "rows": 100},
    )

    return [
        {"value": dataset["id"], "label": dataset["title"]}
        for dataset in datasets["results"]
        # only include in the listing datasets the current user is authorized to edit
        if check_access("package_update", context, {"id": dataset["id"]})
    ]


helpers = {
    "print_field_and_data": print_field_and_data,
    "get_datasets_as_form_choices": get_datasets_as_form_choices,
}
