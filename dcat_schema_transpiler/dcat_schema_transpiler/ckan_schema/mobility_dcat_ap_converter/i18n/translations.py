from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdflib.namespace import DCAT, DCTERMS, FOAF, OWL, ORG, RDFS
from mobility_dcat_ap.dataset import OA, CNT

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
        DCAT.contactPoint: {"label": {"en": "Contact point", "fi": "Yhteyspiste"}},
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
    DCAT.Distribution: {
        DCAT.accessURL: {
            "label": {"en": "Access URL", "fi": "URL"},
            "help_text": {
                "en": "URL that gives access to this Distribution of the Dataset.",
                "fi": "URL-osoite, josta pääsee tietoaineiston tähän resurssiin. Mikäli tietoaineistoon pääsy vaatii ensin esim. käyttäjäksi rekisteröitymistä, tulee tähän kenttään antaa linkki rekisteröitymistä tarjoavaan palveluun. Muussa tapauksessa anna osoite rajapintaan tai tiedostoon.",
            },
        },
        MOBILITYDCATAP.mobilityDataStandard: {
            "label": {"en": "Mobility data standard", "fi": "Liikenteen tietostandardi"}
        },
        DCTERMS.format: {"label": {"en": "Format", "fi": "Formaatti"}},
        DCTERMS.rights: {"label": {"en": "", "fi": ""}},
        MOBILITYDCATAP.applicationLayerProtocol: {
            "label": {"en": "Application layer protocol", "fi": ""}
        },
        DCTERMS.description: {"label": {"en": "Description", "fi": "Kuvaus"}},
        DCTERMS.license: {"label": {"en": "", "fi": ""}},
        DCAT.accessService: {"label": {"en": "", "fi": ""}},
        CNT.characterEncoding: {
            "label": {"en": "Character encoding", "fi": "Merkistö"}
        },
        MOBILITYDCATAP.communicationMethod: {
            "label": {"en": "Communication method", "fi": "Rajapinnan käyttötapa"}
        },
        MOBILITYDCATAP.dataFormatNotes: {
            "label": {"en": "Data format notes", "fi": "Huomioita formaatista"}
        },
        DCAT.downloadURL: {
            "label": {"en": "Download URL", "fi": "URL (tiedosto)"},
            "help_text": {
                "en": "A direct link to a downloadable file of this Distribution.",
                "fi": "Suora linkki resurssiin ladattavassa tiedostomuodossa.",
            },
        },
        MOBILITYDCATAP.grammar: {
            "label": {"en": "Data grammar", "fi": "Tietoskeema"},
            "help_text": {
                "en": "The technical data grammar format of the delivered content within the Distribution.",
                "fi": "Tiedon rakenteen määräävä standardi.",
            },
        },
        ADMS.sample: {
            "label": {"en": "Sample", "fi": "Näyte"},
            "help_text": {
                "en": "A sample Distribution of the Dataset. A data sample allows data users to investigate the data content and data structure, without subscribing to a data feed or downloading a complete data set.",
                "fi": "Ote tietoaineistosta sisällön arviointia varten.",
            },
        },
        DCTERMS.temporal: {"label": {"en": "", "fi": ""}},
        DCTERMS.title: {"label": {"en": "Title", "fi": "Nimike"}},
    },
    DCAT.DataService: {
        DCAT.endpointURL: {
            "label": {"en": "Endpoint URL", "fi": "URL (rajapinta)"},
            "help_text": {
                "en": "The root location or primary endpoint of the Data Service related to this Distribution",
                "fi": "URL tietoaineiston tätä resurssia tarjoavaan rajapintaan.",
            },
        },
        DCTERMS.title: {
            "label": {"en": "Data service name", "fi": "Palvelun nimi"},
            "help_text": {
                "en": "Name of the data service the API is a part of, if applicable.",
                "fi": "Palvelun nimi mikäli rajapinta on osa laajempaa palvelukokonaisuutta.",
            },
        },
        DCAT.endpointDescription: {
            "label": {"en": "Endpoint description", "fi": "Rajapinnan kuvaus"},
            "help_text": {
                "en": "Link to e.g. a Swagger or OpenAPI description.",
                "fi": "Linkki esim. Swagger tai OpenAPI -kuvaukseen.",
            },
        },
        DCTERMS.description: {
            "label": {"en": "Data service description", "fi": "Palvelun kuvaus"},
            "help_text": {
                "en": "Description of the data service the API is a part of, if applicable.",
                "fi": "Kuvaus palvelusta mikäli rajapinta on osa laajempaa palvelukokonaisuutta.",
            },
        },
    },
    DCTERMS.Frequency: {
        "label": {"en": "Frequency", "fi": "Päivitysten tiheys"},
    },
    DCTERMS.LicenseDocument: {
        DCTERMS.identifier: {
            "label": {"en": "Standard license", "fi": "Lisenssi"},
        },
        RDFS.label: {
            "label": {"en": "License text", "fi": "Lisenssiteksti"},
        },
    },
    DCTERMS.RightsStatement: {
        DCTERMS.type: {
            "label": {
                "en": "Conditions for access and usage",
                "fi": "Pääsy- ja käyttöehdot",
            },
        },
        RDFS.label: {
            "label": {
                "en": "Additional information for access and usage",
                "fi": "Lisätietoa pääsystä ja käytöstä",
            },
        },
    },
    FOAF.Agent: {
        "label": {"en": "Agent", "fi": "Toimija"},
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
        "label": {"en": "Assessment", "fi": "Arvio"},
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
        "label": {"en": "", "fi": ""},
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
    ORG.Organization: {
        "label": {"en": "Organization", "fi": "Organisaatio"},
        FOAF.name: {"label": {"en": "Organization name", "fi": "Organisaation nimi"}},
    },
}

# for vocabularies with missing translations
PATCH_TRANSLATIONS = {
    DCTERMS.Frequency: {
        "every fifteen minutes": {"fi": "joka viidestoista minuutti"},
        "every five minutes": {"fi": "joka viides minuutti"},
        "every minute": {"fi": "joka minuutti"},
        "every ten minutes": {"fi": "joka kymmenes minuutti"},
        "every thirty minutes": {"fi": "kerran puolessa tunnissa"},
        "every twelve hours": {"fi": "joka kahdestoista tunti"},
    }
}
