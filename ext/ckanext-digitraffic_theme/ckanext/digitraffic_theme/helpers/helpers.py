import json
import pprint
from ckan.logic import get_action, check_access, NotFound, NotAuthorized
import ckan.model as model
from typing import Any, Union, cast
from ckan.common import current_user, config
from ckan.types import Context
from ckan.lib.helpers import get_translated
from ckan.plugins import toolkit


def print_field_and_data(field_name: str, data: dict):
    print("FIELD NAME AND DATA ------>")
    print(f"field_name: {field_name}")
    pprint.pprint(data)
    print("<----- FIELD NAME AND DATA")


def is_dataset_public(dataset_id: str) -> bool:
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

    choices = []
    for dataset in datasets["results"]:
        try:
            if check_access("package_update", context, {"id": dataset["id"]}):
                choices.append({"value": dataset["id"], "label": dataset["title"]})
        except (NotFound, NotAuthorized):
            continue
    return choices


def url_from_dataset_id(dataset_id: str) -> str:
    ckan_site_url = config.get("ckan.site_url", "").rstrip("/")
    return f"{ckan_site_url}/dataset/{dataset_id}"


def from_json(string: str) -> Any:
    if string and isinstance(string, str):
        return json.loads(string)
    return {}


# This is otherwise the same function as the one in the CKAN core,
# except that it will return 'title' in place of 'name' if translation is not found.
def dataset_display_name(
    package_or_package_dict: Union[dict[str, Any], model.Package],
) -> str:
    if isinstance(package_or_package_dict, dict):
        return (
            get_translated(package_or_package_dict, "title")
            or package_or_package_dict["title"]
        )
    else:
        return package_or_package_dict.title or package_or_package_dict.name


def get_organization_dataset_counts():
    context = cast(
        Context,
        {
            "model": model,
            "session": model.Session,
            "user": current_user.name,
            "auth_user_obj": current_user,
        },
    )
    orgs = get_action("organization_list")(context, {"all_fields": True})
    results = []
    for org in orgs:
        # get all public datasets for this org
        datasets = get_action("package_search")(
            context,
            {
                "fq": f'organization:{org["name"]} +private:false',
                "rows": 0,  # we only want the count
            },
        )
        results.append(
            {
                "name": org["name"],
                "title": org.get("title", org["name"]),
                "dataset_count": datasets["count"],
            }
        )

    return [
        org
        for org in sorted(
            results, key=lambda result: result["dataset_count"], reverse=True
        )
        if org["dataset_count"] > 0
    ]


def get_site_title():
    titles = {
        "en": "Transport Data Catalog",
        "fi": "Liikennedatakatalogi",
        "sv": "Trafikdatakatalog",
    }
    lang = toolkit.h.lang()
    return titles.get(lang, config.get("ckan.site_title", "CKAN"))


helpers = {
    "print_field_and_data": print_field_and_data,
    "get_datasets_as_form_choices": get_datasets_as_form_choices,
    "url_from_dataset_id": url_from_dataset_id,
    "from_json": from_json,
    "is_dataset_public": is_dataset_public,
    "dataset_display_name": dataset_display_name,
    "get_organization_dataset_counts": get_organization_dataset_counts,
    "get_site_title": get_site_title,
}
