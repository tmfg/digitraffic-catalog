export const NS_RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
export const NS_DCAT = "http://www.w3.org/ns/dcat#"
export const NS_DCT = "http://purl.org/dc/terms/"
export const NS_MOBILITYDCATAP = "https://w3id.org/mobilitydcat-ap#"
export const NS_DCATAP = "http://data.europa.eu/r5r/"
export const NS_ORG = "http://www.w3.org/ns/org#"
export const NS_XSD = "http://www.w3.org/2001/XMLSchema#"
export const NS_FOAF = "http://xmlns.com/foaf/0.1/"
export const NS_VCARD = "http://www.w3.org/2006/vcard/ns#"
export const NS_ADMS = "http://www.w3.org/ns/adms#"
export const NS_OWL = "http://www.w3.org/2002/07/owl#"
export const NS_DQV = "http://www.w3.org/ns/dqv#"
export const NS_CNT = "http://www.w3.org/2011/content#"

export enum RDF {
  type = `${NS_RDF}type`,
}

export enum DCAT {
  Dataset = `${NS_DCAT}Dataset`,
  Distribution = `${NS_DCAT}Distribution`,
  Catalog = `${NS_DCAT}Catalog`,
  CatalogRecord = `${NS_DCAT}CatalogRecord`,
  distribution = `${NS_DCAT}distribution`,
  contactPoint = `${NS_DCAT}contactPoint`,
  keyword = `${NS_DCAT}keyword`,
  theme = `${NS_DCAT}theme`,
  accessService = `${NS_DCAT}accessService`,
  downloadURL = `${NS_DCAT}downloadURL`,
  accessURL = `${NS_DCAT}accessURL`,
  dataset = `${NS_DCAT}dataset`,
  record = `${NS_DCAT}record`,
  themeTaxonomy = `${NS_DCAT}themeTaxonomy`,
}

export enum DCT {
  title = `${NS_DCT}title`,
  description = `${NS_DCT}description`,
  accrualPeriodicity = `${NS_DCT}accrualPeriodicity`,
  spatial = `${NS_DCT}spatial`,
  publisher = `${NS_DCT}publisher`,
  conformsTo = `${NS_DCT}conformsTo`,
  rightsHolder = `${NS_DCT}rightsHolder`,
  temporal = `${NS_DCT}temporal`,
  hasVersion = `${NS_DCT}hasVersion`,
  identifier = `${NS_DCT}identifier`,
  isReferencedBy = `${NS_DCT}isReferencedBy`,
  isVersionOf = `${NS_DCT}isVersionOf`,
  language = `${NS_DCT}language`,
  relation = `${NS_DCT}relation`,
  issued = `${NS_DCT}issued`,
  modified = `${NS_DCT}modified`,
  format = `${NS_DCT}format`,
  license = `${NS_DCT}license`,
  rights = `${NS_DCT}rights`,
  hasPart = `${NS_DCT}hasPart`,
  isPartOf = `${NS_DCT}isPartOf`,
}

export enum MOBILITYDCATAP {
  mobilityTheme = `${NS_MOBILITYDCATAP}mobilityTheme`,
  georeferencingMethod = `${NS_MOBILITYDCATAP}georeferencingMethod`,
  networkCoverage = `${NS_MOBILITYDCATAP}networkCoverage`,
  transportMode = `${NS_MOBILITYDCATAP}transportMode`,
  assessmentResult = `${NS_MOBILITYDCATAP}assessmentResult`,
  intendedInformationService = `${NS_MOBILITYDCATAP}intendedInformationService`,
  mobilityDataStandard = `${NS_MOBILITYDCATAP}mobilityDataStandard`,
  applicationLayerProtocol = `${NS_MOBILITYDCATAP}applicationLayerProtocol`,
  communicationMethod = `${NS_MOBILITYDCATAP}communicationMethod`,
  dataFormatNotes = `${NS_MOBILITYDCATAP}dataFormatNotes`,
  grammar = `${NS_MOBILITYDCATAP}grammar`,
}

export enum DCATAP {
  applicableLegislation = `${NS_DCATAP}applicableLegislation`,
}

export enum ADMS {
  identifier = `${NS_ADMS}identifier`,
  versionNotes = `${NS_ADMS}versionNotes`,
  sample = `${NS_ADMS}sample`,
}

export enum OWL {
  versionInfo = `${NS_OWL}versionInfo`,
}

export enum DQV {
  hasQualityAnnotation = `${NS_DQV}hasQualityAnnotation`,
}

export enum CNT {
  characterEncoding = `${NS_CNT}characterEncoding`,
}

export enum FOAF {
  homepage = `${NS_FOAF}homepage`,
}

export enum XSD {
    date = `${NS_XSD}date`,
}
