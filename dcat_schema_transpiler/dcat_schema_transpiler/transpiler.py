from file_handler.schema import rdf_to_yaml
from mobility_dcat_ap.dataset import create_dataset

ds = create_dataset()
rdf_to_yaml(ds)