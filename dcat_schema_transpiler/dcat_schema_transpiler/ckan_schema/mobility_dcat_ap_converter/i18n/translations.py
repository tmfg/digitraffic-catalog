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
        DCTERMS.title: {
            "label": {
                "en": "Dataset title",
                "fi": "Tietoaineiston nimike",
                "sv": "Datamängdens titel",
            }
        },
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
                "en": "Value must be an <a href='https://www.epsg.org' target='_blank'>EPSG</a> number.",
                "fi": "Arvon tulee olla <a href='https://www.epsg.org' target='_blank'>EPSG</a>-tunniste.",
                "sv": "Värdet måste vara ett <a href='https://www.epsg.org' target='_blank'>EPSG</a>-nummer.",
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
        DCTERMS.PeriodOfTime: {
            DCAT.startDate: {
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
            DCAT.endDate: {
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
                "sv": "Standardlicens",
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
                "sv": "Tekniskt dataformat och struktur för det levererade innehållet i distributionen.",
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
        DCTERMS.PeriodOfTime: {
            DCAT.startDate: {
                "label": {
                    "en": "Availability start time",
                    "fi": "Saatavuuden alkamisaika",
                    "sv": "Starttid för tillgänglighet",
                },
                "help_text": {
                    "en": "The beginning of the time interval when a data service, e.g., a data feed, is delivered technically via the data platform.",
                    "fi": "Aikavälin alku, jolla tietoaineisto on saatavilla jakelualustan kautta.",
                    "sv": "Början på det tidsintervall då en datatjänst, t.ex. en datafeed, levereras tekniskt via dataplattformen.",
                },
            },
            DCAT.endDate: {
                "label": {
                    "en": "Availability end time",
                    "fi": "Saatavuuden päättymisaika",
                    "sv": "Sluttid för tillgänglighet",
                },
                "help_text": {
                    "en": "The end of the time interval when a data service, e.g., a data feed, is delivered technically via the data platform.",
                    "fi": "Aikavälin loppu, jolla tietoaineisto on saatavilla jakelualustan kautta.",
                    "sv": "Slutet på det tidsintervall då en datatjänst, t.ex. en datafeed, levereras tekniskt via dataplattformen.",
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
                "fi": "Rajapinnan URL",
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
                "fi": "Tietopalvelun kuvaus",
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
            "fi": "Akateeminen tai tieteellinen organisaatio",
            "sv": "Akademisk/vetenskaplig organisation",
        },
        "Company": {"fi": "Yritys", "sv": "Företag"},
        "Industry consortium": {"fi": "Yrityskonsortio", "sv": "Branschkonsortium"},
        "Local Authority": {"fi": "Paikallisviranomainen", "sv": "Lokal myndighet"},
        "National authority": {
            "fi": "Kansallinen viranomainen",
            "sv": "Nationell myndighet",
        },
        "Non-Governmental Organisation": {
            "fi": "Kansalaisjärjestö",
            "sv": "Icke-statlig organisation",
        },
        "Non-Profit Organisation": {
            "fi": "Voittoa tavoittelematon organisaatio",
            "sv": "Ideell organisation",
        },
        "Private Individual(s)": {"fi": "Yksityishenkilö(t)", "sv": "Privatperson(er)"},
        "Regional authority": {
            "fi": "Alueellinen viranomainen",
            "sv": "Regional myndighet",
        },
        "Standardisation body": {
            "fi": "Standardointielin",
            "sv": "Standardiseringsorgan",
        },
        "Supra-national authority": {
            "fi": "Ylikansallinen viranomainen",
            "sv": "Överstatlig myndighet",
        },
    },
    CVOCAB_EUV_FREQUENCY: {
        "every fifteen minutes": {
            "fi": "joka viidestoista minuutti",
            "sv": "var femtonde minut",
        },
        "every five minutes": {"fi": "joka viides minuutti", "sv": "var femte minut"},
        "every minute": {"fi": "joka minuutti", "sv": "varje minut"},
        "every ten minutes": {"fi": "joka kymmenes minuutti", "sv": "var tionde minut"},
        "every thirty minutes": {
            "fi": "kerran puolessa tunnissa",
            "sv": "var trettionde minut",
        },
        "every twelve hours": {
            "fi": "joka kahdestoista tunti",
            "sv": "var tolfte timme",
        },
    },
    CVOCAB_RIGHTS_STATEMENT_TYPE: {
        "Contractual arrangement": {
            "fi": "Sopimusjärjestely",
            "sv": "Avtalsarrangemang",
        },
        "Contractual arrangement, fee required": {
            "fi": "Sopimusjärjestely, maksu vaaditaan",
            "sv": "Avtalsarrangemang, avgift krävs",
        },
        "Contractual arrangement, free of charge": {
            "fi": "Sopimusjärjestely, maksuton",
            "sv": "Avtalsarrangemang, utan kostnad",
        },
        "Fee required": {"fi": "Maksu vaaditaan", "sv": "Avgift krävs"},
        "Free of charge": {"fi": "Maksuton", "sv": "Kostnadsfritt"},
        "Licence provided": {"fi": "Annettu lisenssi", "sv": "Licens tillhandahålls"},
        "Licence provided, fee required": {
            "fi": "Annettu lisenssi, maksu vaaditaan",
            "sv": "Licens tillhandahålls, avgift krävs",
        },
        "Licence provided, free of charge": {
            "fi": "Annettu lisenssi, maksuton",
            "sv": "Licens tillhandahålls, utan kostnad",
        },
        "Other": {"fi": "Muu", "sv": "Annat"},
        "Royalty-free": {"fi": "Ei tekijänpalkkiota", "sv": "Royaltyfri"},
    },
    CVOCAB_MOBILITY_THEME: {
        "Air and space travel": {
            "fi": "Ilma- ja avaruusmatkailu",
            "sv": "Flyg- och rymdresor",
        },
        "Cycle network data": {"fi": "Pyöräilyverkon tiedot", "sv": "Cykelvägsdata"},
        "Dynamic traffic signs and regulations": {
            "fi": "Dynaamiset liikennemerkit ja -säännöt",
            "sv": "Dynamiska trafikskyltar och regler",
        },
        "Filling and charging stations": {
            "fi": "Tankkaus- ja latausasemat",
            "sv": "Tanknings- och laddningsstationer",
        },
        "Freight and logistics": {
            "fi": "Rahti ja logistiikka",
            "sv": "Frakt och logistik",
        },
        "General information for trip-planning": {
            "fi": "Yleistä tietoa reittisuunnitteluun",
            "sv": "Allmän information för reseplanering",
        },
        "Other": {"fi": "Muu", "sv": "Annat"},
        "Parking, service and rest area information": {
            "fi": "Pysäköinti-, palvelu- ja levähdysalueiden tiedot",
            "sv": "Information om parkering, service och rastplatser",
        },
        "Pedestrian network data": {
            "fi": "Jalankulkuverkon tiedot",
            "sv": "Data om gångnät",
        },
        "Public transport non-scheduled transport": {
            "fi": "Joukkoliikenne, aikatauluttamaton",
            "sv": "Kollektivtrafik som inte är schemalagd",
        },
        "Public transport scheduled transport": {
            "fi": "Joukkoliikenne, säännöllinen",
            "sv": "Kollektivtrafik, reguljär trafik",
        },
        "Real-time traffic data": {
            "fi": "Reaaliaikaiset liikennetiedot",
            "sv": "Trafikdata i realtid",
        },
        "Road events and conditions": {
            "fi": "Tieolosuhteet ja tapahtumat",
            "sv": "Väghändelser och vägförhållanden",
        },
        "Road work information": {
            "fi": "Tietyötiedot",
            "sv": "Information om vägarbeten",
        },
        "Sharing and Hiring Services": {
            "fi": "Vuokraus- ja yhteiskäyttöpalvelut",
            "sv": "Delnings- och uthyrningstjänster",
        },
        "Static road network data": {
            "fi": "Staattiset tieverkon tiedot",
            "sv": "Data om det statiska vägnätet",
        },
        "Static traffic signs and regulations": {
            "fi": "Staattiset liikennemerkit ja -säännöt",
            "sv": "Statiska trafikskyltar och regler",
        },
        "Toll information": {"fi": "Tietullitiedot", "sv": "Information om vägtullar"},
        "Waterways and water bodies": {
            "fi": "Vesiväylät ja vesistöt",
            "sv": "Vattendrag och vattenområden",
        },
        "Accesibility information for vehicles": {
            "fi": "Ajoneuvojen esteettömyystiedot",
            "sv": "Tillgänglighetsinformation för fordon",
        },
        "Accidents and incidents": {
            "fi": "Liikenneonnettomuudet ja -häiriöt",
            "sv": "Olyckor och tillbud",
        },
        "Address identifiers": {"fi": "Osoitetunnisteet", "sv": "Adressidentifierare"},
        "Applicable road user charges and payment methods": {
            "fi": "Sovellettavat tienkäyttömaksut ja maksutavat",
            "sv": "Tillämpliga vägavgifter och betalningsmetoder",
        },
        "Availability of charging points for electric vehicles": {
            "fi": "Sähköajoneuvojen latauspisteiden saatavuus",
            "sv": "Tillgång till laddstationer för elbilar",
        },
        "Availability of delivery areas": {
            "fi": "Lastaus- ja purkauspaikkojen saatavuus",
            "sv": "Tillgänglighet av leveransområden",
        },
        "Availability of filling stations": {
            "fi": "Tankkausasemien saatavuus",
            "sv": "Tillgång till bensinstationer",
        },
        "Basic commercial conditions": {
            "fi": "Kaupalliset perusehdot",
            "sv": "Grundläggande kommersiella villkor",
        },
        "Basic common standard fares": {
            "fi": "Yleiset perusmaksut",
            "sv": "Grundläggande gemensamma standardpriser",
        },
        "Bike sharing Availability": {
            "fi": "Kaupunkipyörien saatavuus",
            "sv": "Cykeldelning tillgänglighet",
        },
        "Bike-hiring Availability": {
            "fi": "Vuokrapyörien saatavuus",
            "sv": "Tillgänglighet för cykeluthyrning",
        },
        "Bike-hiring Stations": {
            "fi": "Pyöränvuokrausasemat",
            "sv": "Stationer för uthyrning av cyklar",
        },
        "Bike-parking locations": {
            "fi": "Polkupyöräparkit",
            "sv": "Parkeringsplatser för cyklar",
        },
        "Bike-sharing Locations and stations": {
            "fi": "Kaupunkipyörien sijainnit ja asemat",
            "sv": "Cykeldelningens platser och stationer",
        },
        "Bridge access conditions": {
            "fi": "Siltojen käyttörajoitukset",
            "sv": "Villkor för tillträde till broar",
        },
        "Bridge closures and access conditions": {
            "fi": "Siltojen sulkemiset ja käyttörajoitukset",
            "sv": "Stängning av broar och tillträdesvillkor",
        },
        "Car parking availability": {
            "fi": "Autojen pysäköinnin saatavuus",
            "sv": "Tillgång till bilparkering",
        },
        "Car parking locations and conditions": {
            "fi": "Autojen pysäköintipaikat ja -olosuhteet",
            "sv": "Parkeringsplatser och villkor för bilparkering",
        },
        "Car-hiring Availability": {
            "fi": "Autonvuokrauksen saatavuus",
            "sv": "Tillgänglighet för biluthyrning",
        },
        "Car-hiring Stations": {
            "fi": "Autonvuokrausasemat",
            "sv": "Stationer för biluthyrning",
        },
        "Car-sharing Availability": {
            "fi": "Yhteiskäyttöautojen saatavuus",
            "sv": "Tillgänglighet för bildelning",
        },
        "Car-sharing Locations and stations": {
            "fi": "Yhteiskäyttöautojen sijainnit ja asemat",
            "sv": "Bildelningens platser och stationer",
        },
        "Common fare products": {
            "fi": "Yleiset lipputuotteet",
            "sv": "Vanliga biljettprodukter",
        },
        "Connection links": {"fi": "Vaihtoyhteydet", "sv": "Anslutningslänkar"},
        "Current travel times": {
            "fi": "Ajankohtaiset matka-ajat",
            "sv": "Aktuella restider",
        },
        "Direction of travel on reversible lanes": {
            "fi": "Vaihtuvasuuntaisten kaistojen ajosuunta",
            "sv": "Färdriktning i reversibla körfält",
        },
        "Disruptions, delays, cancellations": {
            "fi": "Häiriöt, viivästykset, peruutukset",
            "sv": "Störningar, förseningar, inställda avgångar",
        },
        "Dynamic overtaking bans on heavy goods vehicles": {
            "fi": "Dynaamiset raskaiden ajoneuvojen ohituskiellot",
            "sv": "Dynamiska omkörningsförbud för tunga lastbilar",
        },
        "Dynamic speed limits": {
            "fi": "Dynaamiset nopeusrajoitukset",
            "sv": "Dynamiska hastighetsgränser",
        },
        "E-scooter-sharing Availability": {
            "fi": "Yhteiskäyttöisten sähköpotkulautojen saatavuus",
            "sv": "Tillgänglighet för elsparkcykeldelning",
        },
        "E-scooter-sharing Locations and stations": {
            "fi": "Yhteiskäyttöisten sähköpotkulautojen sijainnit ja asemat",
            "sv": "Elsparkcykeldelningens platser och stationer",
        },
        "Environmental standards for vehicles": {
            "fi": "Ajoneuvojen ympäristöstandardit",
            "sv": "Miljöstandarder för fordon",
        },
        "Expected delays": {
            "fi": "Tiedossa olevat viivästykset",
            "sv": "Förväntade förseningar",
        },
        "Fares": {"fi": "Maksut ja tariffit", "sv": "Biljettpriser"},
        "Freight delivery regulations": {
            "fi": "Rahdinkuljetusmääräykset",
            "sv": "Regler för fraktleveranser",
        },
        "Geometry": {"fi": "Geometria", "sv": "Geometri"},
        "Gradients": {"fi": "Kaltevuudet", "sv": "Lutningar"},
        "Hours of operation": {"fi": "Käyttöajat", "sv": "Öppettider"},
        "Identification of tolled roads": {
            "fi": "Tietullin alaisten teiden yksilöiminen",
            "sv": "Identifiering av avgiftsbelagda vägar",
        },
        "Junctions": {"fi": "Liittymät", "sv": "Korsningar"},
        "Lane closures and access conditions": {
            "fi": "Kaistojen sulkemiset ja käyttörajoitukset",
            "sv": "Avstängning av körfält och framkomlighetsvillkor",
        },
        "Location and conditions of charging points": {
            "fi": "Latauspisteiden sijainnit ja olosuhteet",
            "sv": "Laddstationernas placering och villkor",
        },
        "Location and conditions of filling stations": {
            "fi": "Tankkausasemien sijainnit ja olosuhteet",
            "sv": "Tankstationernas läge och villkor",
        },
        "Location and length of queues": {
            "fi": "Jonojen sijainti ja pituus",
            "sv": "Plats och längd på köerna",
        },
        "Location of delivery areas": {
            "fi": "Lastaus- ja purkausalueiden sijainti",
            "sv": "Placering av leveransområden",
        },
        "Location of tolling stations": {
            "fi": "Tietulliasemien sijainti",
            "sv": "Placering av vägtullstationer",
        },
        "Locations and stations": {
            "fi": "Sijainnit ja asemat",
            "sv": "Platser och stationer",
        },
        "Long-term road works": {
            "fi": "Pitkäaikaiset tietyöt",
            "sv": "Långvariga vägarbeten",
        },
        "Network closures/diversions": {
            "fi": "Verkon suljetut osat ja/tai kiertotiet",
            "sv": "Nedläggning/omläggning av nät",
        },
        "Network detailed attributes": {
            "fi": "Verkon yksityiskohtaiset tiedot",
            "sv": "Detaljerade attribut för nätverk",
        },
        "Network geometry and lane character": {
            "fi": "Verkkogeometria ja kaistojen luonne",
            "sv": "Nätverksgeometri och körfältskaraktär",
        },
        "Network topology and routes/lines": {
            "fi": "Verkkotopologia ja reitit/linjat ",
            "sv": "Nätverkstopologi och vägar/linjer",
        },
        "Number of lanes": {"fi": "Kaistojen määrä", "sv": "Antal körfält"},
        "Operational Calendar": {
            "fi": "Operatiivinen kalenteri",
            "sv": "Operativ kalender",
        },
        "Other access restrictions and traffic regulations": {
            "fi": "Muut käyttörajoitukset ja liikennesäännöt",
            "sv": "Andra tillträdsbegränsningar och trafikbestämmelser",
        },
        "Other static traffic signs": {
            "fi": "Muut staattiset liikennemerkit",
            "sv": "Andra statiska trafikskyltar",
        },
        "Other temporary traffic management measures or plans": {
            "fi": "Muut tilapäiset liikenteenhallintatoimenpiteet tai -suunnitelmat",
            "sv": "Andra tillfälliga trafikstyrningsåtgärder eller planer",
        },
        "Other traffic regulations": {
            "fi": "Muut liikennesäännöt",
            "sv": "Övriga trafikregler",
        },
        "Parameters needed to calculate costs": {
            "fi": "Kustannusten laskemiseen tarvittavat parametrit",
            "sv": "Parametrar som behövs för att beräkna kostnader",
        },
        "Parameters needed to calculate environmental factors": {
            "fi": "Ympäristötekijöiden laskemiseen tarvittavat parametrit",
            "sv": "Parametrar som behövs för att beräkna miljöfaktorer",
        },
        "Park and Ride stops": {
            "fi": "Julkisen liikenteen liityntäpysäköinti",
            "sv": "Park and Ride-hållplatser",
        },
        "Passenger classes": {"fi": "Matkustajaluokat", "sv": "Passagerarklasser"},
        "Payment methods": {"fi": "Maksutavat", "sv": "Betalningsmetoder"},
        "Payment methods for tolls": {
            "fi": "Tietullien maksutavat",
            "sv": "Betalningsmetoder för vägtullar",
        },
        "Pedestrian accessibility facilities": {
            "fi": "Jalankulkijoiden esteettömyyttä tukevat välineet",
            "sv": "Tillgänglighetsmöjligheter för fotgängare",
        },
        "Pedestrian network geometry": {
            "fi": "Jalankulkuverkon geometria",
            "sv": "Geometri för fotgängarnätverk",
        },
        "Permanent access restrictions": {
            "fi": "Pysyvät käyttörajoitukset",
            "sv": "Permanenta åtkomstbegränsningar",
        },
        "Planned interchanges between scheduled services": {
            "fi": "Suunnitellut vaihdot säännöllisten palvelujen välillä",
            "sv": "Planerade bytespunkter mellan linjetrafik",
        },
        "Points of interest": {"fi": "Kohdepisteet", "sv": "Intressanta platser"},
        "Poor road conditions": {"fi": "Huonokuntoiset tiet", "sv": "Dåligt väglag"},
        "Predicted travel times": {
            "fi": "Ennustetut matka-ajat",
            "sv": "Förutspådda restider",
        },
        "Provider data": {
            "fi": "Palveluntarjoajan tiedot",
            "sv": "Uppgifter om leverantör",
        },
        "Purchase information": {"fi": "Ostotiedot", "sv": "Information om köp"},
        "Real-time estimated departure and arrival times": {
            "fi": "Reaaliaikaiset arvioidut lähtö- ja saapumisajat",
            "sv": "Beräknade avgångs- och ankomsttider i realtid",
        },
        "Reservation and purchase options": {
            "fi": "Varaus- ja ostovaihtoehdot",
            "sv": "Reservations- och köpalternativ",
        },
        "Road classification": {"fi": "Tien luokitus", "sv": "Vägklassificering"},
        "Road closures and access conditions": {
            "fi": "Teiden sulkemiset ja käyttörajoitukset",
            "sv": "Avstängda vägar och villkor för framkomlighet",
        },
        "Road weather conditions": {"fi": "Tieolosuhteet", "sv": "Vägförhållanden"},
        "Road width": {"fi": "Teiden leveys", "sv": "Vägens bredd"},
        "Service and rest area availability": {
            "fi": "Palvelu- ja levähdysalueiden saatavuus",
            "sv": "Tillgänglighet till service- och rastplatser",
        },
        "Service and rest area locations and conditions": {
            "fi": "Palvelu- ja levähdysalueiden sijainnit ja olosuhteet",
            "sv": "Platser och villkor för service- och rastplatser",
        },
        "Service areas and service times": {
            "fi": "Palvelualueet ja palveluajat",
            "sv": "Serviceområden och servicetider",
        },
        "Short-term road works": {
            "fi": "Lyhytaikaiset tietyöt",
            "sv": "Kortvariga vägarbeten",
        },
        "Special Fare Products": {
            "fi": "Erikoismaksutuotteet",
            "sv": "Specialprisprodukter",
        },
        "Speed": {"fi": "Nopeus", "sv": "Hastighet"},
        "Speed limits": {"fi": "Nopeusrajoitukset", "sv": "Hastighetsgränser"},
        "Stop facilities accessibility and paths within facility": {
            "fi": "Pysäkkien esteettömyys ja reitit",
            "sv": "Hållplatsanläggningars tillgänglighet och stigar inom anläggningen",
        },
        "Stop facilities geometry and map layout": {
            "fi": "Pysäkkien geometria ja kartta",
            "sv": "Geometri och kartlayout för hållplatsanläggningar",
        },
        "Stop facilities location and features": {
            "fi": "Pysäkkien sijainti ja toiminnot",
            "sv": "Hållplatsens läge och funktioner",
        },
        "Stop facilities status of features": {
            "fi": "Pysäkkien toimintojen tila",
            "sv": "Status för hållplatsernas funktioner",
        },
        "Timetables static": {
            "fi": "Aikataulut, staattiset",
            "sv": "Tidtabeller, statiska",
        },
        "Topographic places": {
            "fi": "Topografiset paikat",
            "sv": "Topografiska platser",
        },
        "Traffic circulation plans": {
            "fi": "Liikennevirtasuunnitelmat",
            "sv": "Planer för trafikcirkulation",
        },
        "Traffic data at border crossings to third countries": {
            "fi": "Liikennetiedot rajanylityspaikoilla kolmansiin maihin",
            "sv": "Trafikuppgifter vid gränsövergångar till tredjeländer",
        },
        "Traffic volume": {"fi": "Liikenteen määrä", "sv": "Trafikvolym"},
        "Transport operators": {"fi": "Liikenteenharjoittajat", "sv": "Transportörer"},
        "Truck parking availability": {
            "fi": "Kuorma-autopysäköinnin saatavuus",
            "sv": "Tillgänglighet för lastbilsparkering",
        },
        "Truck parking locations and conditions": {
            "fi": "Kuorma-autojen pysäköintipaikat ja -olosuhteet",
            "sv": "Parkeringsplatser och villkor för lastbilar",
        },
        "Tunnel access conditions": {
            "fi": "Tunneleiden käyttörajoitukset",
            "sv": "Villkor för tillträde till tunnlar",
        },
        "Tunnel closures and access conditions": {
            "fi": "Tunneleiden sulkemiset ja käyttörajoitukset",
            "sv": "Stängning av tunnlar och villkor för tillträde",
        },
        "Vehicle details": {"fi": "Ajoneuvojen tiedot", "sv": "Uppgifter om fordonet"},
        "Waiting time at border crossings to non-EU Member States": {
            "fi": "Odotusaika rajanylityspaikoilla EU:n ulkopuolisiin maihin",
            "sv": "Väntetid vid gränsövergångar till länder utanför EU",
        },
    },
    CVOCAB_TRANSPORT_MODE: {
        "Air": {"fi": "Ilmailu", "sv": "Flyg"},
        "Bicycle": {"fi": "Polkupyörä", "sv": "Cykel"},
        "Bike Hire": {"fi": "Vuokrapyörä", "sv": "Cykeluthyrning"},
        "Bike Sharing": {"fi": "Kaupunkipyörä", "sv": "Cykeldelning"},
        "Bus": {"fi": "Bussi", "sv": "Buss"},
        "Car": {"fi": "Auto", "sv": "Bil"},
        "Car Hire": {"fi": "Vuokra-auto", "sv": "Biluthyrning"},
        "Car Pooling": {"fi": "Kimppakyyti, auto", "sv": "Samåkning med bil"},
        "Car Sharing": {"fi": "Yhteiskäyttöauto", "sv": "Bildelning"},
        "E-Scooter": {"fi": "Sähköpotkulauta", "sv": "Elsparkcykel"},
        "Long-distance coach": {"fi": "Pitkän matkan bussi", "sv": "Långfärdsbuss"},
        "Long-distance rail": {
            "fi": "Pitkän matkan juna",
            "sv": "Fjärrtrafik på järnväg",
        },
        "Maritime": {"fi": "Merenkulku", "sv": "Sjöfart"},
        "Metro, Subway train": {"fi": "Metro", "sv": "Tunnelbana"},
        "Motorcycle": {"fi": "Moottoripyörä", "sv": "Motorcykel"},
        "Other": {"fi": "Muu", "sv": "Annat"},
        "Pedestrian": {"fi": "Jalankulku", "sv": "Fotgängare"},
        "Regional and local rail": {
            "fi": "Alueellinen ja paikallinen raideliikenne",
            "sv": "Regional och lokal järnvägstrafik",
        },
        "Ride Pooling": {"fi": "Kimppakyyti, muu", "sv": "Samåkning"},
        "Shuttle bus": {"fi": "Liityntäbussi", "sv": "Pendelbuss"},
        "Shuttle ferry": {"fi": "Liityntälautta", "sv": "Pendelfärja"},
        "Taxi": {"fi": "Taksi", "sv": "Taxi"},
        "Tram, Light rail": {
            "fi": "Raitiovaunu, kevyt raideliikenne",
            "sv": "Spårvagn, lättjärnväg",
        },
        "Truck": {"fi": "Kuorma-auto", "sv": "Lastbil"},
    },
    CVOCAB_NETWORK_COVERAGE: {
        "Air network": {"fi": "Ilmailuverkko", "sv": "Flygnät"},
        "Metro, subway, tram or light-rail network": {
            "fi": "Metro, raitiovaunu tai kevyt raideliikenneverkko",
            "sv": "Tunnelbana, spårvagn eller lättjärnvägsnät",
        },
        "Motorways": {"fi": "Moottoritiet", "sv": "Motorvägar"},
        "Other": {"fi": "Muu", "sv": "Annat"},
        "Other public transport network": {
            "fi": "Muu joukkoliikenneverkko",
            "sv": "Annat kollektivtrafiknät",
        },
        "Rail network": {"fi": "Rautatieverkko", "sv": "Järnvägsnät"},
        "Regional roads": {"fi": "Alueelliset tiet", "sv": "Regionala vägar"},
        "State roads or federal roads": {
            "fi": "Valtion tai liittovaltion tiet",
            "sv": "Statliga vägar eller federala vägar",
        },
        "TEN Network": {"fi": "TEN-verkko", "sv": "TEN-nätverket"},
        "TERN Network": {"fi": "TERN-verkko", "sv": "TERN-nätverket"},
        "Urban and local roads": {
            "fi": "Kaupunkien tiet ja paikalliset tiet",
            "sv": "Stads- och lokalvägar",
        },
        "Waterways": {"fi": "Vesiväylät", "sv": "Vattenvägar"},
    },
    CVOCAB_INTENDED_INFORMATION_SERVICE: {
        "Dynamic Information service": {
            "fi": "Dynaaminen tietopalvelu",
            "sv": "Tjänst för dynamisk information",
        },
        "Dynamic Passing times, trip plans and auxiliary information": {
            "fi": "Dynaamiset ohitusajat, reittisuunnitelmat ja lisätiedot",
            "sv": "Dynamiska passeringstider, resplaner och hjälpinformation",
        },
        "Dynamic availability check": {
            "fi": "Dynaaminen saatavuuden tarkistus",
            "sv": "Dynamisk tillgänglighetskontroll",
        },
        "Information service": {"fi": "Tietopalvelu", "sv": "Informationstjänst"},
        "Location search": {"fi": "Sijaintihaku", "sv": "Platssökning"},
        "Other": {"fi": "Muu", "sv": "Annat"},
        "Trip plan computation scheduled modes transport": {
            "fi": "Reittisuunnitelman laskenta aikataulutetuilla kuljetusmuodoilla",
            "sv": "Beräkning av färdplan, schemalagda transportsätt",
        },
        "Trip plans": {"fi": "Reittisuunnitelmat", "sv": "Resplaner"},
        "Trip plans, auxiliary information, availability check": {
            "fi": "Reittisuunnitelmat, lisätiedot, saatavuuden tarkistus",
            "sv": "Resplaner, hjälpinformation, kontroll av tillgänglighet",
        },
    },
}
