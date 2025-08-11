from mobility_dcat_ap.namespace import MOBILITYDCATAP
from rdflib.namespace import DCAT, DCTERMS, FOAF, OWL, ORG, RDFS
from mobility_dcat_ap.dataset import (
    CVOCAB_AGENT_TYPE,
    CVOCAB_EUV_FREQUENCY,
    CVOCAB_INTENDED_INFORMATION_SERVICE,
    CVOCAB_MOBILITY_THEME,
    CVOCAB_NETWORK_COVERAGE,
    CVOCAB_RIGHTS_STATEMENT_TYPE,
    CVOCAB_TRANSPORT_MODE,
    OA,
    CNT,
)

from dcat_schema_transpiler.namespaces.ADMS import ADMS
from dcat_schema_transpiler.namespaces.DQV import DQV
from dcat_schema_transpiler.namespaces.VCARD import VCARD
from dcat_schema_transpiler.namespaces.LOCN import LOCN

TRANSLATIONS = {
    DCAT.Dataset: {
        DCTERMS.title: {"label": {"en": "Title", "fi": "Nimike", "sv": "Titel"}},
        DCTERMS.description: {
            "label": {"en": "Description", "fi": "Kuvaus", "sv": "Beskrivning"}
        },
        ADMS.versionNotes: {
            "label": {
                "en": "Version notes",
                "fi": "Version tiedot",
                "sv": "Anteckningar om version",
            },
            "help_text": {
                "en": "A description of the differences between this version and a previous version of the dataset.",
                "fi": "Kuvaus tietoaineiston nykyisen ja edeltävän version eroista.",
                "sv": "En beskrivning av skillnaderna mellan den här versionen och en tidigare version av datauppsättningen.",
            },
        },
        OWL.versionInfo: {
            "label": {
                "en": "Dataset version",
                "fi": "Tietoaineiston versio",
                "sv": "Version av datauppsättning",
            }
        },
        DCTERMS.conformsTo: {
            "label": {
                "en": "Spatial reference system",
                "fi": "Paikkaviittausjärjestelmä",
                "sv": "Rumsligt referenssystem",
            },
            "help_text": {
                "en": "Value must be an EPSG number.",
                "fi": "Arvon tulee olla EPSG-tunniste.",
                "sv": "Värdet måste vara ett EPSG-nummer.",
            },
        },
        DCTERMS.relation: {
            "label": {
                "en": "Related dataset",
                "fi": "Liittyvä tietoaineisto",
                "sv": "Relaterad datauppsättning",
            },
            "help_text": {
                "en": "A related dataset that is somehow referenced, cited, or otherwise pointed to by this dataset.",
                "fi": "Toinen tietoaineisto, johon tämä tietoaineisto jollakin tavalla viittaa tai olennaisesti liittyy.",
                "sv": "En relaterad datauppsättning som på något sätt refereras till, citeras eller på annat sätt pekas på av den här datauppsättningen.",
            },
        },
        DCTERMS.isReferencedBy: {
            "label": {
                "en": "Is referenced by",
                "fi": "Viittaukset muista aineistoista",
                "sv": "Refereras av",
            }
        },
        MOBILITYDCATAP.mobilityTheme: {
            "main": {
                "label": {
                    "en": "Data content category",
                    "fi": "Kategoria",
                    "sv": "Kategori för datainnehåll",
                }
            },
            "sub": {
                "label": {
                    "en": "Data content subcategory",
                    "fi": "Alakategoria",
                    "sv": "Underkategori för datainnehåll",
                }
            },
        },
        MOBILITYDCATAP.transportMode: {
            "label": {
                "en": "Transport mode",
                "fi": "Liikennemuoto",
                "sv": "Transportsätt",
            }
        },
        DCTERMS.spatial: {
            "label": {
                "en": "Regional coverage",
                "fi": "Alueellinen kattavuus",
                "sv": "Regional täckning",
            },
        },
        DCAT.theme: {
            "label": {"en": "Theme", "fi": "Aihe", "sv": "Tema"},
        },
        MOBILITYDCATAP.networkCoverage: {
            "label": {
                "en": "Network coverage",
                "fi": "Liikenneverkko",
                "sv": "Nätverkets täckning",
            },
            "help_text": {
                "en": "The part of the transport network that is covered by the delivered content.",
                "fi": "Liikenneverkon osa, jonka tietoaineisto kattaa.",
                "sv": "Den del av transportnätet som omfattas av det levererade innehållet.",
            },
        },
        DCTERMS.rightsHolder: {
            "label": {
                "en": "Rights holder",
                "fi": "Oikeuksien haltija",
                "sv": "Rättighetsinnehavare",
            },
        },
        DCAT.contactPoint: {
            "label": {"en": "Contact point", "fi": "Yhteyspiste", "sv": "Kontaktpunkt"}
        },
        MOBILITYDCATAP.assessmentResult: {
            "label": {"en": "Assessment", "fi": "Arvio", "sv": "Bedömning"},
            "help_text": {
                "en": "URL for the results of an assessment process by some third party.",
                "fi": "Kolmannen osapuolen tekemään laatuarvioon viittaava URL.",
                "sv": "URL för resultatet av en utvärderingsprocess av en tredje part.",
            },
        },
        DQV.hasQualityAnnotation: {
            "label": {
                "en": "Quality description",
                "fi": "Julkaisijan kuvaus laadusta",
                "sv": "Kvalitetsbeskrivning",
            },
            "help_text": {
                "en": "URL for an assessment or notes by the publisher regarding quality of dataset contents.",
                "fi": "Julkaisijan laatua koskevaan arvioon tai muihin huomioihin viittaava URL.",
                "sv": "URL för en bedömning eller anteckningar av utgivaren om kvaliteten på datauppsättningens innehåll.",
            },
        },
        MOBILITYDCATAP.intendedInformationService: {
            "label": {
                "en": "Intended information service",
                "fi": "Hyödyntävä tietopalvelu",
                "sv": "Avsedd informationstjänst",
            },
            "help_text": {
                "en": "An information service, which the data content is intended to support.",
                "fi": "Tietopalvelu, jonka tueksi tietoaineisto on tarkoitettu.",
                "sv": "En informationstjänst som datainnehållet är avsett att stödja.",
            },
        },
        MOBILITYDCATAP.georeferencingMethod: {
            "label": {
                "en": "Georeferencing method",
                "fi": "Georeferointitapa",
                "sv": "Metod för georeferering",
            }
        },
        DCTERMS.language: {
            "label": {"en": "Language", "fi": "Kieli", "sv": "Språk"},
            "help_text": {
                "en": "Language used in content data.",
                "fi": "Tietoaineistossa käytetty kieli.",
                "sv": "Språk som används i innehållsdata.",
            },
        },
        DCTERMS.temporal: {
            "start": {
                "label": {
                    "en": "Validity start time",
                    "fi": "Voimassaolon alkamisaika",
                    "sv": "Starttid för giltighet",
                },
                "help_text": {
                    "en": "Time reference of the delivered content (e.g., validity time of a public-transport time table).",
                    "fi": "Tietosisältöä koskeva aikarajaus (esim. bussiaikataulun voimassaoloaika).",
                    "sv": "Tidsreferens för det levererade innehållet (t.ex. giltighetstid för en tidtabell för kollektivtrafik).",
                },
            },
            "end": {
                "label": {
                    "en": "Validity end time",
                    "fi": "Voimassaolon päättymisaika",
                    "sv": "Sluttid för giltighet",
                },
                "help_text": {
                    "en": "Time reference of the delivered content (e.g., validity time of a public-transport time table).",
                    "fi": "Tietosisältöä koskeva aikarajaus (esim. bussiaikataulun voimassaoloaika).",
                    "sv": "Tidsreferens för det levererade innehållet (t.ex. giltighetstid för en tidtabell för kollektivtrafik).",
                },
            },
        },
    },
    DCAT.Distribution: {
        DCAT.accessURL: {
            "label": {"en": "Access URL", "fi": "URL", "sv": "Åtkomst-URL"},
            "help_text": {
                "en": "URL that gives access to this Distribution of the Dataset.",
                "fi": "URL-osoite, josta pääsee tietoaineiston tähän resurssiin. Mikäli tietoaineistoon pääsy vaatii ensin esim. käyttäjäksi rekisteröitymistä, tulee tähän kenttään antaa linkki rekisteröitymistä tarjoavaan palveluun. Muussa tapauksessa anna osoite rajapintaan tai tiedostoon.",
                "sv": "URL som ger åtkomst till den här distributionen av datauppsättningen.",
            },
        },
        MOBILITYDCATAP.mobilityDataStandard: {
            "label": {
                "en": "Mobility data standard",
                "fi": "Liikenteen tietostandardi",
                "sv": "Standard för mobilitetsdata",
            }
        },
        DCTERMS.format: {"label": {"en": "Format", "fi": "Formaatti", "sv": "Format"}},
        DCTERMS.rights: {
            "label": {
                "en": "Conditions for access and usage",
                "fi": "Pääsy- ja käyttöehdot",
                "sv": "Villkor för åtkomst och användning",
            }
        },
        MOBILITYDCATAP.applicationLayerProtocol: {
            "label": {
                "en": "Application layer protocol",
                "fi": "Sovelluskerroksen protokolla",
                "sv": "Protokoll för applikationslager",
            }
        },
        DCTERMS.description: {
            "label": {"en": "Description", "fi": "Kuvaus", "sv": "Beskrivning"}
        },
        DCTERMS.license: {
            "label": {
                "en": "Standard license",
                "fi": "Lisenssi",
                "sv": "Standard-licens",
            }
        },
        DCAT.accessService: {"label": {"en": "", "fi": "", "sv": ""}},
        CNT.characterEncoding: {
            "label": {
                "en": "Character encoding",
                "fi": "Merkistö",
                "sv": "Teckenkodning",
            }
        },
        MOBILITYDCATAP.communicationMethod: {
            "label": {
                "en": "Communication method",
                "fi": "Rajapinnan käyttötapa",
                "sv": "Kommunikationsmetod",
            }
        },
        MOBILITYDCATAP.dataFormatNotes: {
            "label": {
                "en": "Data format notes",
                "fi": "Huomioita formaatista",
                "sv": "Anteckningar om dataformat",
            }
        },
        DCAT.downloadURL: {
            "label": {
                "en": "Download URL",
                "fi": "URL (tiedosto)",
                "sv": "Nedladdnings-URL",
            },
            "help_text": {
                "en": "A direct link to a downloadable file of this Distribution.",
                "fi": "Suora linkki resurssiin ladattavassa tiedostomuodossa.",
                "sv": "En direktlänk till en nedladdningsbar fil av denna distribution.",
            },
        },
        MOBILITYDCATAP.grammar: {
            "label": {
                "en": "Data grammar",
                "fi": "Tietoskeema",
                "sv": "Datastruktur",
            },
            "help_text": {
                "en": "The technical data grammar format of the delivered content within the Distribution.",
                "fi": "Tiedon rakenteen määräävä standardi.",
                "sv": "Tekniska dataformat och struktur för det levererade innehållet i distributionen.",
            },
        },
        ADMS.sample: {
            "label": {"en": "Sample", "fi": "Näyte", "sv": "Prov"},
            "help_text": {
                "en": "A sample Distribution of the Dataset. A data sample allows data users to investigate the data content and data structure, without subscribing to a data feed or downloading a complete data set.",
                "fi": "Ote tietoaineistosta sisällön arviointia varten.",
                "sv": "Ett exempel på distribution av datauppsättningen. Med hjälp av ett dataurval kan dataanvändare undersöka datainnehållet och datastrukturen utan att prenumerera på en datafeed eller ladda ned en fullständig datamängd.",
            },
        },
        DCTERMS.temporal: {
            "start": {
                "label": {
                    "en": "Start time",
                    "fi": "Saatavuuden alkamisaika",
                    "sv": "Starttid",
                },
                "help_text": {
                    "en": "The beginning of the time interval when a data service, e.g., a data feed, is delivered technically via the data platform. If there is no entry it means that the publication gets valid immediately.",
                    "fi": "Aikavälin alku, jolla tietoaineisto on saatavilla jakelualustan kautta. Tyhjä arvo tarkoittaa välitöntä julkaisua.",
                    "sv": "Början på det tidsintervall då en datatjänst, t.ex. en datafeed, levereras tekniskt via dataplattformen. Om det inte finns någon post betyder det att publikationen blir giltig direkt.",
                },
            },
            "end": {
                "label": {
                    "en": "End time",
                    "fi": "Saatavuuden päättymisaika",
                    "sv": "Sluttid",
                },
                "help_text": {
                    "en": "The end of the time interval when a data service, e.g., a data feed, is delivered technically via the data platform. If there is no entry it means that the publication gets valid immediately.",
                    "fi": "Aikavälin loppu, jolla tietoaineisto on saatavilla jakelualustan kautta. Tyhjä arvo tarkoittaa välitöntä julkaisua.",
                    "sv": "Slutet på det tidsintervall då en datatjänst, t.ex. en datafeed, levereras tekniskt via dataplattformen. Om det inte finns någon post betyder det att publikationen blir giltig direkt.",
                },
            },
        },
        DCTERMS.title: {"label": {"en": "Title", "fi": "Nimike", "sv": "Titel"}},
    },
    DCAT.DataService: {
        "label": {"en": "Data Service", "fi": "Tietopalvelu", "sv": "Datatjänst"},
        DCAT.endpointURL: {
            "label": {
                "en": "Endpoint URL",
                "fi": "URL (rajapinta)",
                "sv": "Slutpunkts-URL",
            },
            "help_text": {
                "en": "The root location or primary endpoint of the data service related to this resource.",
                "fi": "URL tietoaineiston tätä resurssia tarjoavaan rajapintaan.",
                "sv": "Rotplatsen eller den primära slutpunkten för datatjänsten som är relaterad till den här distributionen.",
            },
        },
        DCTERMS.title: {
            "label": {
                "en": "Data service name",
                "fi": "Tietopalvelun nimi",
                "sv": "Namn på datatjänst",
            },
            "help_text": {
                "en": "Name of the data service the API is a part of, if applicable.",
                "fi": "Palvelun nimi mikäli rajapinta on osa laajempaa palvelukokonaisuutta.",
                "sv": "Namnet på den datatjänst som API:et är en del av, om tillämpligt.",
            },
        },
        DCAT.endpointDescription: {
            "label": {
                "en": "Endpoint description",
                "fi": "Rajapinnan kuvaus",
                "sv": "Beskrivning av slutpunkt",
            },
            "help_text": {
                "en": "Link to e.g. a Swagger or OpenAPI description.",
                "fi": "Linkki esim. Swagger tai OpenAPI -kuvaukseen.",
                "sv": "Länk till t.ex. en Swagger- eller OpenAPI-beskrivning.",
            },
        },
        DCTERMS.description: {
            "label": {
                "en": "Data service description",
                "fi": "Palvelun kuvaus",
                "sv": "Beskrivning av datatjänsten",
            },
            "help_text": {
                "en": "Description of the data service the API is a part of, if applicable.",
                "fi": "Kuvaus palvelusta mikäli rajapinta on osa laajempaa palvelukokonaisuutta.",
                "sv": "Beskrivning av den datatjänst som gränssnittet är en del av, om tillämpligt.",
            },
        },
    },
    DCTERMS.Frequency: {
        "label": {"en": "Frequency", "fi": "Päivitysten tiheys", "sv": "Frekvens"},
    },
    DCTERMS.LicenseDocument: {
        DCTERMS.identifier: {
            "label": {
                "en": "Standard license",
                "fi": "Lisenssi",
                "sv": "Standardlicens",
            },
        },
        RDFS.label: {
            "label": {
                "en": "License text",
                "fi": "Lisenssiteksti",
                "sv": "Licenstext",
            },
        },
    },
    DCTERMS.RightsStatement: {
        DCTERMS.type: {
            "label": {
                "en": "Conditions for access and usage",
                "fi": "Pääsy- ja käyttöehdot",
                "sv": "Villkor för åtkomst och användning",
            },
        },
        RDFS.label: {
            "label": {
                "en": "Additional information for access and usage",
                "fi": "Lisätietoa pääsystä ja käytöstä",
                "sv": "Ytterligare information för åtkomst och användning",
            },
        },
    },
    FOAF.Agent: {
        "label": {"en": "Agent", "fi": "Toimija", "sv": "Agent"},
        FOAF.name: {
            "label": {"en": "Name", "fi": "Nimi", "sv": "Namn"},
        },
        FOAF.firstName: {
            "label": {"en": "First name", "fi": "Etunimi", "sv": "Förnamn"},
        },
        FOAF.surname: {
            "label": {"en": "Surname", "fi": "Sukunimi", "sv": "Efternamn"},
        },
        FOAF.mbox: {
            "label": {"en": "Email", "fi": "Sähköposti", "sv": "E-post"},
        },
        FOAF.phone: {
            "label": {
                "en": "Phone number",
                "fi": "Puhelinnumero",
                "sv": "Telefonnummer",
            },
        },
        FOAF.workplaceHomepage: {
            "label": {
                "en": "Workplace homepage",
                "fi": "Työpaikan kotisivu",
                "sv": "Arbetsplatsens hemsida",
            },
        },
        DCTERMS.type: {
            "label": {
                "en": "Agent type",
                "fi": "Toimijan tyyppi",
                "sv": "Typ av agent",
            },
        },
        ORG.memberOf: {
            "label": {"en": "Member of", "fi": "Jäsenyydet", "sv": "Medlem i"}
        },
    },
    MOBILITYDCATAP.Assessment: {
        "label": {"en": "Assessment", "fi": "Arvio", "sv": "Bedömning"},
        OA.hasBody: {
            "label": {
                "en": "Assessment result",
                "fi": "Arvion tulos",
                "sv": "Resultat av bedömningen",
            },
            "help_text": {
                "en": "URL for the results of an assessment process by some organisation.",
                "fi": "Kolmannen osapuolen aineistolle tekemään arvioon viittaava URL.",
                "sv": "URL för resultatet av en utvärderingsprocess av en tredje part.",
            },
        },
        DCTERMS.issued: {
            "label": {
                "en": "Assessment date",
                "fi": "Arvion päivämäärä",
                "sv": "Datum för bedömning",
            },
        },
    },
    DQV.QualityAnnotation: {
        OA.hasBody: {
            "label": {
                "en": "Quality description",
                "fi": "Julkaisijan kuvaus laadusta",
                "sv": "Kvalitetsbeskrivning",
            },
            "help_text": {
                "en": "URL for an assessment or notes by the publisher regarding quality of dataset contents.",
                "fi": "Julkaisijan laatua koskevaan arvioon tai muihin huomioihin viittaava URL.",
                "sv": "URL för en bedömning eller anteckningar av utgivaren om kvaliteten på datauppsättningens innehåll.",
            },
        }
    },
    VCARD.Kind: {
        "label": {"en": "", "fi": "", "sv": ""},
        "contact_point_type": {
            "en": "Contact point type",
            "fi": "Yhteyspisteen tyyppi",
            "sv": "Typ av kontaktpunkt",
        },
        VCARD.hasEmail: {
            "label": {"en": "Email", "fi": "Sähköposti", "sv": "E-post"},
        },
        VCARD.hasURL: {
            "label": {"en": "Website", "fi": "Verkkosivu", "sv": "Webbplats"},
        },
        VCARD.hasTelephone: {
            "label": {
                "en": "Phone number",
                "fi": "Puhelinnumero",
                "sv": "Telefonnummer",
            },
        },
        VCARD.fn: {
            "label": {"en": "Full name", "fi": "Koko nimi", "sv": "Fullständigt namn"},
        },
        VCARD["organization-name"]: {
            "label": {
                "en": "Organization name",
                "fi": "Organisaation nimi",
                "sv": "Organisationens namn",
            }
        },
    },
    VCARD.Organization: {
        "label": {"en": "Organization", "fi": "Organisaatio", "sv": "Organisation"},
    },
    VCARD.Individual: {"label": {"en": "Person", "fi": "Henkilö", "sv": "Person"}},
    VCARD.Address: {
        VCARD["country-name"]: {
            "label": {"en": "Country", "fi": "Maa", "sv": "Land"},
        },
        VCARD.locality: {
            "label": {"en": "City", "fi": "Kaupunki", "sv": "Stad"},
        },
        VCARD["postal-code"]: {
            "label": {"en": "Postal code", "fi": "Postinumero", "sv": "Postnummer"},
        },
        VCARD.region: {
            "label": {"en": "Region", "fi": "Alue", "sv": "Region"},
        },
        VCARD["street-address"]: {
            "label": {"en": "Street address", "fi": "Katuosoite", "sv": "Gatuadress"},
        },
    },
    LOCN.Address: {
        LOCN.thoroughfare: {
            "label": {"en": "Street address", "fi": "Katuosoite", "sv": "Gatuadress"},
        },
        LOCN.postName: {
            "label": {"en": "City", "fi": "Kaupunki", "sv": "Stad"},
        },
        LOCN.postCode: {
            "label": {"en": "Postal code", "fi": "Postinumero", "sv": "Postnummer"},
        },
        LOCN.adminUnitL2: {
            "label": {"en": "Region", "fi": "Alue", "sv": "Region"},
        },
        LOCN.adminUnitL1: {
            "label": {"en": "Country", "fi": "Maa", "sv": "Land"},
        },
    },
    ORG.Organization: {
        "label": {"en": "Organization", "fi": "Organisaatio", "sv": "Organisation"},
        FOAF.name: {
            "label": {
                "en": "Organization name",
                "fi": "Organisaation nimi",
                "sv": "Organisationens namn",
            }
        },
    },
}

# for inserting missing translations to vocabularies
VOCABULARY_PATCH_TRANSLATIONS = {
    CVOCAB_AGENT_TYPE: {
        "Academia/Scientific organisation": {
            "fi": "Akateeminen tai tieteellinen organisaatio"
        },
        "Company": {"fi": "Yritys"},
        "Industry consortium": {"fi": "Yrityskonsortio"},
        "Local Authority": {"fi": "Paikallisviranomainen"},
        "National authority": {"fi": "Kansallinen viranomainen"},
        "Non-Governmental Organisation": {"fi": "Kansalaisjärjestö"},
        "Non-Profit Organisation": {"fi": "Voittoa tavoittelematon organisaatio"},
        "Private Individual(s)": {"fi": "Yksityishenkilö(t)"},
        "Regional authority": {"fi": "Alueellinen viranomainen"},
        "Standardisation body": {"fi": "Standardointielin"},
        "Supra-national authority": {"fi": "Ylikansallinen viranomainen"},
    },
    CVOCAB_EUV_FREQUENCY: {
        "every fifteen minutes": {"fi": "joka viidestoista minuutti"},
        "every five minutes": {"fi": "joka viides minuutti"},
        "every minute": {"fi": "joka minuutti"},
        "every ten minutes": {"fi": "joka kymmenes minuutti"},
        "every thirty minutes": {"fi": "kerran puolessa tunnissa"},
        "every twelve hours": {"fi": "joka kahdestoista tunti"},
    },
    CVOCAB_RIGHTS_STATEMENT_TYPE: {
        "Contractual arrangement": {"fi": "Sopimusjärjestely"},
        "Contractual arrangement, fee required": {
            "fi": "Sopimusjärjestely, maksu vaaditaan"
        },
        "Contractual arrangement, free of charge": {
            "fi": "Sopimusjärjestely, maksuton"
        },
        "Fee required": {"fi": "Maksu vaaditaan"},
        "Free of charge": {"fi": "Maksuton"},
        "Licence provided": {"fi": "Annettu lisenssi"},
        "Licence provided, fee required": {"fi": "Annettu lisenssi, maksu vaaditaan"},
        "Licence provided, free of charge": {"fi": "Annettu lisenssi, maksuton"},
        "Other": {"fi": "Muu"},
        "Royalty-free": {"fi": "Ei tekijänpalkkiota"},
    },
    CVOCAB_MOBILITY_THEME: {
        "Air and space travel": {"fi": "Ilma- ja avaruusmatkailu"},
        "Cycle network data": {"fi": "Pyöräilyverkon tiedot"},
        "Dynamic traffic signs and regulations": {
            "fi": "Dynaamiset liikennemerkit ja -säännöt"
        },
        "Filling and charging stations": {"fi": "Tankkaus- ja latausasemat"},
        "Freight and logistics": {"fi": "Rahti ja logistiikka"},
        "General information for trip-planning": {
            "fi": "Yleistä tietoa reittisuunnitteluun"
        },
        "Other": {"fi": "Muu"},
        "Parking, service and rest area information": {
            "fi": "Pysäköinti-, palvelu- ja levähdysalueiden tiedot"
        },
        "Pedestrian network data": {"fi": "Jalankulkuverkon tiedot"},
        "Public transport non-scheduled transport": {
            "fi": "Joukkoliikenne, aikatauluttamaton"
        },
        "Public transport scheduled transport": {"fi": "Joukkoliikenne, säännöllinen"},
        "Real-time traffic data": {"fi": "Reaaliaikaiset liikennetiedot"},
        "Road events and conditions": {"fi": "Tieolosuhteet ja tapahtumat"},
        "Road work information": {"fi": "Tietyötiedot"},
        "Sharing and Hiring Services": {"fi": "Vuokraus- ja yhteiskäyttöpalvelut"},
        "Static road network data": {"fi": "Staattiset tieverkon tiedot"},
        "Static traffic signs and regulations": {
            "fi": "Staattiset liikennemerkit ja -säännöt"
        },
        "Toll information": {"fi": "Tietullitiedot"},
        "Waterways and water bodies": {"fi": "Vesiväylät ja vesistöt"},
        "Accesibility information for vehicles": {
            "fi": "Ajoneuvojen esteettömyystiedot"
        },
        "Accidents and incidents": {"fi": "Liikenneonnettomuudet ja -häiriöt"},
        "Address identifiers": {"fi": "Osoitetunnisteet"},
        "Applicable road user charges and payment methods": {
            "fi": "Sovellettavat tienkäyttömaksut ja maksutavat"
        },
        "Availability of charging points for electric vehicles": {
            "fi": "Sähköajoneuvojen latauspisteiden saatavuus"
        },
        "Availability of delivery areas": {
            "fi": "Lastaus- ja purkauspaikkojen saatavuus"
        },
        "Availability of filling stations": {"fi": "Tankkausasemien saatavuus"},
        "Basic commercial conditions": {"fi": "Kaupalliset perusehdot"},
        "Basic common standard fares": {"fi": "Yleiset perusmaksut"},
        "Bike sharing Availability": {"fi": "Kaupunkipyörien saatavuus"},
        "Bike-hiring Availability": {"fi": "Vuokrapyörien saatavuus"},
        "Bike-hiring Stations": {"fi": "Pyöränvuokrausasemat"},
        "Bike-parking locations": {"fi": "Polkupyöräparkit"},
        "Bike-sharing Locations and stations": {
            "fi": "Kaupunkipyörien sijainnit ja asemat"
        },
        "Bridge access conditions": {"fi": "Siltojen käyttörajoitukset"},
        "Bridge closures and access conditions": {
            "fi": "Siltojen sulkemiset ja käyttörajoitukset"
        },
        "Car parking availability": {"fi": "Autojen pysäköinnin saatavuus"},
        "Car parking locations and conditions": {
            "fi": "Autojen pysäköintipaikat ja -olosuhteet"
        },
        "Car-hiring Availability": {"fi": "Autonvuokrauksen saatavuus"},
        "Car-hiring Stations": {"fi": "Autonvuokrausasemat"},
        "Car-sharing Availability": {"fi": "Yhteiskäyttöautojen saatavuus"},
        "Car-sharing Locations and stations": {
            "fi": "Yhteiskäyttöautojen sijainnit ja asemat"
        },
        "Common fare products": {"fi": "Yleiset lipputuotteet"},
        "Connection links": {"fi": "Vaihtoyhteydet"},
        "Current travel times": {"fi": "Ajankohtaiset matka-ajat"},
        "Direction of travel on reversible lanes": {
            "fi": "Vaihtuvasuuntaisten kaistojen ajosuunta"
        },
        "Disruptions, delays, cancellations": {
            "fi": "Häiriöt, viivästykset, peruutukset"
        },
        "Dynamic overtaking bans on heavy goods vehicles": {
            "fi": "Dynaamiset raskaiden ajoneuvojen ohituskiellot"
        },
        "Dynamic speed limits": {"fi": "Dynaamiset nopeusrajoitukset"},
        "E-scooter-sharing Availability": {
            "fi": "Yhteiskäyttöisten sähköpotkulautojen saatavuus"
        },
        "E-scooter-sharing Locations and stations": {
            "fi": "Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat"
        },
        "Environmental standards for vehicles": {
            "fi": "Ajoneuvojen ympäristöstandardit"
        },
        "Expected delays": {"fi": "Tiedossa olevat viivästykset"},
        "Fares": {"fi": "Maksut ja tariffit"},
        "Freight delivery regulations": {"fi": "Rahdinkuljetusmääräykset"},
        "Geometry": {"fi": "Geometria"},
        "Gradients": {"fi": "Kaltevuudet"},
        "Hours of operation": {"fi": "Käyttöajat"},
        "Identification of tolled roads": {
            "fi": "Tietullin alaisten teiden yksilöiminen"
        },
        "Junctions": {"fi": "Liittymät"},
        "Lane closures and access conditions": {
            "fi": "Kaistojen sulkemiset ja käyttörajoitukset"
        },
        "Location and conditions of charging points": {
            "fi": "Latauspisteiden sijainnit ja olosuhteet"
        },
        "Location and conditions of filling stations": {
            "fi": "Tankkausasemien sijainnit ja olosuhteet"
        },
        "Location and length of queues": {"fi": "Jonojen sijainti ja pituus"},
        "Location of delivery areas": {"fi": "Lastaus- ja purkausalueiden sijainti"},
        "Location of tolling stations": {"fi": "Tietulliasemien sijainti"},
        "Locations and stations": {"fi": "Sijainnit ja asemat"},
        "Long-term road works": {"fi": "Pitkäaikaiset tietyöt"},
        "Network closures/diversions": {"fi": "Verkon suljetut osat ja/tai kiertotiet"},
        "Network detailed attributes": {"fi": "Verkon yksityiskohtaiset tiedot"},
        "Network geometry and lane character": {
            "fi": "Verkkogeometria ja kaistojen luonne"
        },
        "Network topology and routes/lines": {
            "fi": "Verkkotopologia ja reitit/linjat "
        },
        "Number of lanes": {"fi": "Kaistojen määrä"},
        "Operational Calendar": {"fi": "Operatiivinen kalenteri"},
        "Other access restrictions and traffic regulations": {
            "fi": "Muut käyttörajoitukset ja liikennesäännöt"
        },
        "Other static traffic signs": {"fi": "Muut staattiset liikennemerkit"},
        "Other temporary traffic management measures or plans": {
            "fi": "Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat"
        },
        "Other traffic regulations": {"fi": "Muut liikennesäännöt"},
        "Parameters needed to calculate costs": {
            "fi": "Kustannusten laskemiseen tarvittavat parametrit"
        },
        "Parameters needed to calculate environmental factors": {
            "fi": "Ympäristötekijöiden laskemiseen tarvittavat parametrit"
        },
        "Park and Ride stops": {"fi": "Julkisen liikenteen liityntäpysäköinti"},
        "Passenger classes": {"fi": "Matkustajaluokat"},
        "Payment methods": {"fi": "Maksutavat"},
        "Payment methods for tolls": {"fi": "Tietullien maksutavat"},
        "Pedestrian accessibility facilities": {
            "fi": "Jalankulkijoiden esteettömyyttä tukevat välineet"
        },
        "Pedestrian network geometry": {"fi": "Jalankulkuverkon geometria"},
        "Permanent access restrictions": {"fi": "Pysyvät käyttörajoitukset"},
        "Planned interchanges between scheduled services": {
            "fi": "Suunnitellut vaihdot säännöllisten palvelujen välillä"
        },
        "Points of interest": {"fi": "Kohdepisteet"},
        "Poor road conditions": {"fi": "Huonokuntoiset tiet"},
        "Predicted travel times": {"fi": "Ennustetut matka-ajat"},
        "Provider data": {"fi": "Palveluntarjoajan tiedot"},
        "Purchase information": {"fi": "Ostotiedot"},
        "Real-time estimated departure and arrival times": {
            "fi": "Reaaliaikaiset arvioidut lähtö- ja saapumisajat"
        },
        "Reservation and purchase options": {"fi": "Varaus- ja ostovaihtoehdot"},
        "Road classification": {"fi": "Tien luokitus"},
        "Road closures and access conditions": {
            "fi": "Teiden sulkemiset ja käyttörajoitukset"
        },
        "Road weather conditions": {"fi": "Tieolosuhteet"},
        "Road width": {"fi": "Teiden leveys"},
        "Service and rest area availability": {
            "fi": "Palvelu- ja levähdysalueiden saatavuus"
        },
        "Service and rest area locations and conditions": {
            "fi": "Palvelu- ja levähdysalueiden sijainnit ja olosuhteet"
        },
        "Service areas and service times": {"fi": "Palvelualueet ja palveluajat"},
        "Short-term road works": {"fi": "Lyhytaikaiset tietyöt"},
        "Special Fare Products": {"fi": "Erikoismaksutuotteet"},
        "Speed": {"fi": "Nopeus"},
        "Speed limits": {"fi": "Nopeusrajoitukset"},
        "Stop facilities accessibility and paths within facility": {
            "fi": "Pysäkkipalveluiden esteettömyys ja reitit"
        },
        "Stop facilities geometry and map layout": {
            "fi": "Pysäkkipalveluiden geometria ja kartta"
        },
        "Stop facilities location and features": {
            "fi": "Pysäkkipalveluiden sijainti ja ominaisuudet"
        },
        "Stop facilities status of features": {
            "fi": "Pysäkkipalveluiden ominaisuuksien tila"
        },
        "Timetables static": {"fi": "Aikataulut, staattiset"},
        "Topographic places": {"fi": "Topografiset paikat"},
        "Traffic circulation plans": {"fi": "Liikennevirtasuunnitelmat"},
        "Traffic data at border crossings to third countries": {
            "fi": "Liikennetiedot rajanylityspaikoilla kolmansiin maihin"
        },
        "Traffic volume": {"fi": "Liikenteen määrä"},
        "Transport operators": {"fi": "Liikenteenharjoittajat"},
        "Truck parking availability": {"fi": "Kuorma-autopysäköinnin saatavuus"},
        "Truck parking locations and conditions": {
            "fi": "Kuorma-autojen pysäköintipaikat ja -olosuhteet"
        },
        "Tunnel access conditions": {"fi": "Tunneleiden käyttörajoitukset"},
        "Tunnel closures and access conditions": {
            "fi": "Tunneleiden sulkemiset ja käyttörajoitukset"
        },
        "Vehicle details": {"fi": "Ajoneuvojen tiedot"},
        "Waiting time at border crossings to non-EU Member States": {
            "fi": "Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin"
        },
    },
    CVOCAB_TRANSPORT_MODE: {
        "Air": {"fi": "Ilmailu"},
        "Bicycle": {"fi": "Polkupyörä"},
        "Bike Hire": {"fi": "Vuokrapyörä"},
        "Bike Sharing": {"fi": "Kaupunkipyörä"},
        "Bus": {"fi": "Bussi"},
        "Car": {"fi": "Auto"},
        "Car Hire": {"fi": "Vuokra-auto"},
        "Car Pooling": {"fi": "Kimppakyyti, auto"},
        "Car Sharing": {"fi": "Yhteiskäyttöauto"},
        "E-Scooter": {"fi": "Sähköpotkulauta"},
        "Long-distance coach": {"fi": "Pitkän matkan bussi"},
        "Long-distance rail": {"fi": "Pitkän matkan juna"},
        "Maritime": {"fi": "Merenkulku"},
        "Metro, Subway train": {"fi": "Metro"},
        "Motorcycle": {"fi": "Moottoripyörä"},
        "Other": {"fi": "Muu"},
        "Pedestrian": {"fi": "Jalankulku"},
        "Regional and local rail": {"fi": "Alueellinen ja paikallinen raideliikenne"},
        "Ride Pooling": {"fi": "Kimppakyyti, muu"},
        "Shuttle bus": {"fi": "Liityntäbussi"},
        "Shuttle ferry": {"fi": "Liityntälautta"},
        "Taxi": {"fi": "Taksi"},
        "Tram, Light rail": {"fi": "Raitiovaunu, kevyt raideliikenne"},
        "Truck": {"fi": "Kuorma-auto"},
    },
    CVOCAB_NETWORK_COVERAGE: {
        "Air network": {"fi": "Ilmailuverkko"},
        "Metro, subway, tram or light-rail network": {
            "fi": "Metro, raitiovaunu tai kevyt raideliikenneverkko"
        },
        "Motorways": {"fi": "Moottoritiet"},
        "Other": {"fi": "Muu"},
        "Other public transport network": {"fi": "Muu joukkoliikenneverkko"},
        "Rail network": {"fi": "Rautatieverkko"},
        "Regional roads": {"fi": "Alueelliset tiet"},
        "State roads or federal roads": {"fi": "Valtion tai liittovaltion tiet"},
        "TEN Network": {"fi": "TEN-verkko"},
        "TERN Network": {"fi": "TERN-verkko"},
        "Urban and local roads": {"fi": "Kaupunkien tiet ja paikalliset tiet"},
        "Waterways": {"fi": "Vesiväylät"},
    },
    CVOCAB_INTENDED_INFORMATION_SERVICE: {
        "Dynamic Information service": {"fi": "Dynaaminen tietopalvelu"},
        "Dynamic Passing times, trip plans and auxiliary information": {
            "fi": "Dynaamiset ohitusajat, reittisuunnitelmat ja lisätiedot"
        },
        "Dynamic availability check": {"fi": "Dynaaminen saatavuuden tarkistus"},
        "Information service": {"fi": "Tietopalvelu"},
        "Location search": {"fi": "Sijaintihaku"},
        "Other": {"fi": "Muu"},
        "Trip plan computation scheduled modes transport": {
            "fi": "Reittisuunnitelman laskenta aikataulutetuilla kuljetusmuodoilla"
        },
        "Trip plans": {"fi": "Reittisuunnitelmat"},
        "Trip plans, auxiliary information, availability check": {
            "fi": "Reittisuunnitelmat, lisätiedot, saatavuuden tarkistus"
        },
    },
}
