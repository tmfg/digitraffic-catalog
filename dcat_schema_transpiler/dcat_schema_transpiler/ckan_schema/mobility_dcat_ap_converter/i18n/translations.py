from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdflib.namespace import DCAT, DCTERMS, FOAF, OWL, ORG
from mobility_dcat_ap.dataset import OA

from dcat_schema_transpiler.namespaces.ADMS import ADMS
from dcat_schema_transpiler.namespaces.DQV import DQV
from dcat_schema_transpiler.namespaces.VCARD import VCARD
from dcat_schema_transpiler.namespaces.LOCN import LOCN


TRANSLATIONS = {
    DCAT.Dataset: {
        ADMS.versionNotes: {
            "label": {"en": "Version notes", "fi": "Version tiedot"},
            "help_text": {
                "en": "A description of the differences between this version and a previous version of the dataset.",
                "fi": "Kuvaus tietoaineiston nykyisen ja edeltävän version eroista.",
            },
        },
        OWL.versionInfo: {
            "label": {"en": "Dataset version", "fi": "Tietoaineiston versio"}
        },
        DCTERMS.conformsTo: {
            "label": {
                "en": "Spatial reference system",
                "fi": "Paikkaviittausjärjestelmä",
            },
            "help_text": {
                "en": "Value must be an EPSG number.",
                "fi": "Arvon tulee olla EPSG-tunniste.",
            },
        },
        DCTERMS.relation: {
            "label": {"en": "Related dataset", "fi": "Liittyvä tietoaineisto"},
            "help_text": {
                "en": "A related dataset that is somehow referenced, cited, or otherwise pointed to by this dataset.",
                "fi": "Toinen tietoaineisto, johon tämä tietoaineisto jollakin tavalla viittaa tai olennaisesti liittyy.",
            },
        },
        DCTERMS.isReferencedBy: {
            "label": {"en": "Is referenced by", "fi": "Viittaukset muista aineistoista"}
        },
        MOBILITYDCATAP.mobilityTheme: {
            "main": {"label": {"en": "Data content category", "fi": "Kategoria"}},
            "sub": {"label": {"en": "Data content subcategory", "fi": "Alakategoria"}},
        },
        MOBILITYDCATAP.transportMode: {
            "label": {"en": "Transport mode", "fi": "Liikennemuoto"}
        },
        DCTERMS.spatial: {
            "label": {"en": "Location", "fi": "Sijainti"},
        },
        DCAT.theme: {
            "label": {"en": "Theme", "fi": "Aihe"},
        },
        MOBILITYDCATAP.networkCoverage: {
            "label": {"en": "Network coverage", "fi": "Liikenneverkko"},
            "help_text": {
                "en": "The part of the transport network that is covered by the delivered content.",
                "fi": "Liikenneverkon osa, jonka tietoaineisto kattaa.",
            },
        },
        DCTERMS.rightsHolder: {
            "label": {"en": "Rights holder", "fi": "Oikeuksien haltija"},
        },
        MOBILITYDCATAP.assessmentResult: {
            "label": {"en": "Assessment", "fi": "Laatuarvio"},
            "help_text": {
                "en": "URL for the results of an assessment process by some third party.",
                "fi": "Kolmannen osapuolen tekemään laatuarvioon viittaava URL.",
            },
        },
        DCTERMS.relation: {
            "label": {"en": "Related dataset", "fi": "Liittyvä tietoaineisto"},
            "help_text": {
                "en": "A related dataset that is somehow referenced, cited, or otherwise pointed to by this dataset.",
                "fi": "Toinen tietoaineisto, johon tämä tietoaineisto jollakin tavalla viittaa tai olennaisesti liittyy.",
            },
        },
        DQV.hasQualityAnnotation: {
            "label": {"en": "Quality description", "fi": "Julkaisijan kuvaus laadusta"},
            "help_text": {
                "en": "URL for an assessment or notes by the publisher regarding quality of dataset contents.",
                "fi": "Julkaisijan laatua koskevaan arvioon tai muihin huomioihin viittaava URL.",
            },
        },
        MOBILITYDCATAP.intendedInformationService: {
            "label": {
                "en": "Intended information service",
                "fi": "Hyödyntävä tietopalvelu",
            },
            "help_text": {
                "en": "An information service, which the data content is intended to support.",
                "fi": "Tietopalvelu, jonka tueksi tietoaineisto on tarkoitettu.",
            },
        },
        MOBILITYDCATAP.georeferencingMethod: {
            "label": {"en": "Georeferencing method", "fi": "Georeferointitapa"}
        },
    },
    FOAF.Agent: {
        FOAF.name: {
            "label": {"en": "Name", "fi": "Nimi"},
        },
        FOAF.firstName: {
            "label": {"en": "First name", "fi": "Etunimi"},
        },
        FOAF.surname: {
            "label": {"en": "Surname", "fi": "Sukunimi"},
        },
        FOAF.mbox: {
            "label": {"en": "Email", "fi": "Sähköposti"},
        },
        FOAF.phone: {
            "label": {"en": "Phone number", "fi": "Puhelinnumero"},
        },
        FOAF.workplaceHomepage: {
            "label": {"en": "Workplace homepage", "fi": "Työpaikan kotisivu"},
        },
        DCTERMS.type: {
            "label": {"en": "Agent type", "fi": "Toimijan tyyppi"},
        },
        ORG.memberOf: {"label": {"en": "Member of", "fi": "Jäsenyydet"}},
    },
    MOBILITYDCATAP.Assessment: {
        OA.hasBody: {
            "label": {"en": "Assessment result", "fi": "Arvion tulos"},
            "help_text": {
                "en": "URL for the results of an assessment process by some organisation.",
                "fi": "Kolmannen osapuolen aineistolle tekemään arvioon viittaava URL.",
            },
        },
        DCTERMS.issued: {
            "label": {"en": "Assessment date", "fi": "Arvion päivämäärä"},
        },
    },
    DQV.QualityAnnotation: {
        OA.hasBody: {
            "label": {
                "en": "Quality description",
                "fi": "Julkaisijan kuvaus laadusta",
            },
            "help_text": {
                "en": "URL for an assessment or notes by the publisher regarding quality of dataset contents.",
                "fi": "Julkaisijan laatua koskevaan arvioon tai muihin huomioihin viittaava URL.",
            },
        }
    },
    VCARD.Kind: {
        VCARD.hasEmail: {
            "label": {"en": "Email", "fi": "Sähköposti"},
        },
        VCARD.hasURL: {
            "label": {"en": "Website", "fi": "Verkkosivu"},
        },
        VCARD.hasTelephone: {
            "label": {"en": "Phone number", "fi": "Puhelinnumero"},
        },
        VCARD.fn: {
            "label": {"en": "Full name", "fi": "Koko nimi"},
        },
        VCARD["organization-name"]: {
            "label": {"en": "Organization name", "fi": "Organisaation nimi"}
        },
    },
    VCARD.Address: {
        VCARD["country-name"]: {
            "label": {"en": "Country", "fi": "Maa"},
        },
        VCARD.locality: {
            "label": {"en": "City", "fi": "Kaupunki"},
        },
        VCARD["postal-code"]: {
            "label": {"en": "Postal code", "fi": "Postinumero"},
        },
        VCARD.region: {
            "label": {"en": "Region", "fi": "Alue"},
        },
        VCARD["street-address"]: {
            "label": {"en": "Street address", "fi": "Katuosoite"},
        },
    },
    LOCN.Address: {
        LOCN.thoroughfare: {
            "label": {"en": "Street address", "fi": "Katuosoite"},
        },
        LOCN.postName: {
            "label": {"en": "City", "fi": "Kaupunki"},
        },
        LOCN.postCode: {
            "label": {"en": "Postal code", "fi": "Postinumero"},
        },
        LOCN.adminUnitL2: {
            "label": {"en": "Region", "fi": "Alue"},
        },
        LOCN.adminUnitL1: {
            "label": {"en": "Country", "fi": "Maa"},
        },
    },
}
