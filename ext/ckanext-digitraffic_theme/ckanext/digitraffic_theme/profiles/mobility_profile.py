from ckanext.dcat.profiles import  EuropeanDCATAP2Profile


class MobilityDCATAPProfile(EuropeanDCATAP2Profile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)
    def graph_from_dataset(self, dataset_dict, dataset_ref):
        return super().graph_from_dataset(dataset_dict, dataset_ref)