import pprint
from rdflib import Graph

from ckanext.dcat.profiles import  EuropeanDCATAP2Profile
from ckanext.digitraffic_theme.profiles.model.mobility_data import MobilityData
from ckanext.digitraffic_theme.profiles.rdf.mobility_dcat_ap import MOBILITYDCATAP


class MobilityDCATAPProfile(EuropeanDCATAP2Profile):

    def parse_dataset(self, dataset_dict, dataset_ref):
        return super().parse_dataset(dataset_dict, dataset_ref)

    def graph_from_dataset(self, dataset_dict, dataset_ref):
        pprint.pprint(dataset_dict)
        mobility_data: MobilityData = MobilityData(dataset_dict)
        g:Graph = self.g
        g.add((dataset_ref, MOBILITYDCATAP.mobilityTheme, mobility_data.mobility_theme))
        super().graph_from_dataset(dataset_dict, dataset_ref)