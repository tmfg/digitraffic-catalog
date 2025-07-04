import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {pathParameterURL, urlify} from "./util";
import {DatasetInfo, type Visibility, type OptionalDatasetInfoValues, type ContactPoint, type RightsHolder, type Assessment} from "../models/dataset-info";
import {labelToFrequency} from "../../src/ts/model/frequency";
import {labelToRegionalCoverage} from "../../src/ts/model/regional-coverage";
import {
  labelToMobilityTheme,
  type SUB_MOBILITY_THEMES_T,
  type TOP_MOBILITY_THEMES_T
} from "../../src/ts/model/mobility-theme";
import {isVisible} from "../util";
import {labelToTheme} from "../../src/ts/model/theme";
import {labelToTransportMode} from "../../src/ts/model/transport-mode";
import {labelToLanguage} from "../../src/ts/model/language";
import {labelToGeoreferencingMethod} from "../../src/ts/model/georeferencing-method";
import {labelToNetworkCoverage} from "../../src/ts/model/network-coverage";
import { labelToIntendedInformationService } from "../../src/ts/model/intended-information-service";

export class DatasetPage extends BasePage {
  readonly datasetId: string
  readonly pageUrl: string
  readonly datasetMainContent: Locator
  readonly metadataTable: Locator
  readonly visibilityBadge: Locator
  readonly title: Locator
  readonly frequency: Locator
  readonly regionalCoverage: Locator
  readonly dataContentCategory: Locator
  readonly description: Locator
  readonly dataContentSubCategory: Locator
  readonly theme: Locator
  readonly transportMode: Locator
  readonly startTimestamp: Locator
  readonly endTimestamp: Locator
  readonly contactPoints: Locator
  readonly version: Locator
  readonly versionNotes: Locator
  readonly assessments: Locator
  readonly language: Locator
  readonly georeferencingMethod: Locator
  readonly networkCoverage: Locator
  readonly spatialReferenceSystem: Locator
  readonly intendedInformationService: Locator
  readonly urlToQualityDescription: Locator
  readonly relatedDatasets: Locator
  readonly rightsHolders: Locator

  constructor(page: Page, datasetId: string) {
    super(page, [page.getByRole('heading', {name: 'RDF links'})]);
    this.datasetId = datasetId;
    this.pageUrl = urlify(pathParameterURL(URL.Dataset, {'datasetId': datasetId}));
    this.datasetMainContent = this.mainContent.getByRole('article').locator('.module-content')
    this.metadataTable = this.datasetMainContent.locator('.additional-info table');
    this.visibilityBadge = this.datasetMainContent.locator('.badge')
    this.title = this.datasetMainContent.getByRole('heading', {level: 1});
    this.frequency = this.getMetadataTableRowLocator('Päivitysten tiheys');
    this.regionalCoverage = this.getMetadataTableRowLocator('Alueellinen kattavuus');
    this.dataContentCategory = this.getMetadataTableRowLocator('Kategoria');
    this.description = this.metadataTable.locator('tr:has(th:text("Kuvaus"))').first().locator('td');
    this.dataContentSubCategory = this.getMetadataTableRowLocator('Alakategoria');
    this.theme = this.getMetadataTableRowLocator('Aihe');
    this.transportMode = this.getMetadataTableRowLocator('Liikennemuoto');
    this.startTimestamp = this.getMetadataTableRowLocator('Alkamisaika');
    this.endTimestamp = this.getMetadataTableRowLocator('Päättymisaika');
    this.contactPoints = this.getMetadataTableRowLocator('Yhteyspiste');
    this.version = this.getMetadataTableRowLocator('Tietoaineiston versio');
    this.versionNotes = this.getMetadataTableRowLocator('Version tiedot');
    this.assessments = this.getMetadataTableRowLocator('Arvio');
    this.language = this.getMetadataTableRowLocator('Kieli');
    this.georeferencingMethod = this.getMetadataTableRowLocator('Georeferointitapa');
    this.networkCoverage = this.getMetadataTableRowLocator('Liikenneverkko');
    this.spatialReferenceSystem = this.getMetadataTableRowLocator('Paikkaviittausjärjestelmä');
    this.intendedInformationService = this.getMetadataTableRowLocator('Hyödyntävä tietopalvelu');
    this.urlToQualityDescription = this.getMetadataTableRowLocator('Julkaisijan kuvaus laadusta');
    this.relatedDatasets = this.getMetadataTableRowLocator('Liittyvä tietoaineisto');
    this.rightsHolders = this.getMetadataTableRowLocator('Oikeuksien haltija');
  }

  private getMetadataTableRowLocator(rowName: string): Locator {
    // Create a regex that matches the row name with optional whitespace around it
    // The `exact` keyword in `getByRole` does not work for this case, so we use a regex
    const exactNameRegex = new RegExp(`(?<![a-öA-Ö]+)[\s\n\t\r]?${rowName}[\s\n\t\r]?(?![a-öA-Ö]+)`, 'i');
    const row = this.metadataTable.getByRole('row', {name: exactNameRegex});
    return row.locator('td');
  }

  async goto(): Promise<DatasetPage> {
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }

  async getDatasetInfo(): Promise<DatasetInfo> {
    try {
      // Helper function to safely get text content with trimming
      const getTextContent = async (locator: Locator, fieldName: string): Promise<string> => {
        try {
          const text = await locator.textContent();
          console.log(`${fieldName}: "${text}"`);
          return text?.trim() || '';
        } catch (error) {
          console.log(`Error getting text for ${fieldName}: ${error}`);
          return '';
        }
      };

      // Improved getObjectContent function to better handle complex data structures
      const getObjectContent = async(
        locator: Locator,
        fieldName: string
      ): Promise<{}> => {
        try {
          const object: Record<string, any> = {};
          const definitionList = locator.locator('dl');
          const termsLocators = await definitionList.locator('dt').all();

          for (const termLocator of termsLocators) {
            const term = await termLocator.textContent();
            if (!term) {
              console.log(`No term found for ${fieldName} in object`);
              continue;
            }

            const termText = term.trim();
            // Find the definition detail that corresponds to this term
            const ddLocator = termLocator.locator('xpath=./following-sibling::dd[1]');
            const value = await ddLocator.textContent() || '';
            object[termText] = value.trim();
          }

          return object;
        } catch (error) {
          console.log(`Error getting object content for ${fieldName}:`, error);
          return {};
        }
      };

      // Improved getObjectsContent function to handle arrays of objects properly
      const getObjectsContent = async (
        cellLocator: Locator,
        fieldName: string
      ): Promise<{}[]> => {
        try {
          const objects = [];
          const objectLocators = await cellLocator.locator('.panel').all();
          for (const objectLocator of objectLocators) {
            const object = await getObjectContent(objectLocator, `${fieldName} item`);
            if (Object.keys(object).length > 0) {
              objects.push(object);
            }
          }

          return objects;
        } catch (error) {
          console.log(`Error getting objects content for ${fieldName}:`, error);
          return [];
        }
      };

      // Helper function to safely parse dates
      const parseDate = (dateString: string): Date | undefined => {
        if (!dateString) return undefined;

        try {
          // Try to parse the date and ensure it's valid
          const date = new Date(dateString);
          // Check if the date is valid (invalid dates return NaN for getTime())
          return isNaN(date.getTime()) ? undefined : date;
        } catch (error) {
          console.log(`Error parsing date: ${dateString}`, error);
          return undefined;
        }
      };

      // Get field values with safe extraction
      const visibilityValue = await this.getVisibility();
      const titleValue = await getTextContent(this.title, 'title');
      const frequencyValue = labelToFrequency(await getTextContent(this.frequency, 'frequency'));
      const regionalCoverageValue = labelToRegionalCoverage(await getTextContent(this.regionalCoverage, 'regionalCoverage'));
      const dataContentCategoryValue = labelToMobilityTheme(await getTextContent(this.dataContentCategory, 'dataContentCategory')) as TOP_MOBILITY_THEMES_T;

      const descriptionValue = await getTextContent(this.description, 'description');

      const dataContentSubCategoryValue = labelToMobilityTheme(await getTextContent(this.dataContentSubCategory, 'dataContentSubCategory')) as SUB_MOBILITY_THEMES_T;
      const themeValue = labelToTheme(await getTextContent(this.theme, 'theme'));
      const transportModeValue = labelToTransportMode(await getTextContent(this.transportMode, 'transportMode'));

      // Improved date parsing with validation
      const startTimestampText = await getTextContent(this.startTimestamp, 'startTimestamp');
      const endTimestampText = await getTextContent(this.endTimestamp, 'endTimestamp');
      const startTimestampValue = parseDate(startTimestampText);
      const endTimestampValue = parseDate(endTimestampText);

      const versionValue = await getTextContent(this.version, 'version');
      const versionNotesValue = await getTextContent(this.versionNotes, 'versionNotes');
      const languageValue = labelToLanguage(await getTextContent(this.language, 'language'));
      const georeferencingMethodValue = labelToGeoreferencingMethod(await getTextContent(this.georeferencingMethod, 'georeferencingMethod'));
      const networkCoverageValue = labelToNetworkCoverage(await getTextContent(this.networkCoverage, 'networkCoverage'));
      const intendedInformationServiceValue = labelToIntendedInformationService(await getTextContent(this.intendedInformationService, 'intendedInformationService'));
      const urlToQualityDescriptionValue = await getTextContent(this.urlToQualityDescription, 'urlToQualityDescription');
      const spatialReferenceSystemValue = await getTextContent(this.spatialReferenceSystem, 'spatialReferenceSystem');
      let intSpatialReferenceSystemValue: number | undefined = undefined;

      if (spatialReferenceSystemValue) {
        const intMatch = spatialReferenceSystemValue.match(/\/(\d+)$/)

        if (intMatch && intMatch[1]) {
          intSpatialReferenceSystemValue = parseInt(intMatch[1]);
        }
      }

      // Extract values for optional fields
      const optionalValues: OptionalDatasetInfoValues = {
        'dataContentSubCategory': dataContentSubCategoryValue,
        'theme': themeValue,
        'transportMode': transportModeValue,
        'version': versionValue,
        'versionNotes': versionNotesValue,
        'language': languageValue,
        'georeferencingMethod': georeferencingMethodValue,
        'networkCoverage': networkCoverageValue,
        'intendedInformationService': intendedInformationServiceValue,
        'urlToQualityDescription': urlToQualityDescriptionValue,
        'spatialReferenceSystem': intSpatialReferenceSystemValue,
        'ianaTimezone': 'UTC'
      };

      // Only add date fields if they're valid
      if (startTimestampValue) {
        optionalValues.startTimestamp = startTimestampValue;
      }

      if (endTimestampValue) {
        optionalValues.endTimestamp = endTimestampValue;
      }

      const relatedText = await getTextContent(this.relatedDatasets, 'relatedDatasets');
      if (relatedText) {
        const linksAsString = relatedText.split(/[\s]+/).map(item => item.trim());
        optionalValues.relatedDatasets = linksAsString
      } else {
        optionalValues.relatedDatasets = [];
      }

      const finnishObjectToContactPoint = (finnishContactPoint: Record<string, any>): ContactPoint => {
        const telephone = finnishContactPoint["Puhelinnumero"]
        return {
          countryName: finnishContactPoint["Maa"],
          email: finnishContactPoint["Sähköposti"],
          fullName: finnishContactPoint["Koko nimi"],
          locality: finnishContactPoint["Kaupunki"],
          postalCode: finnishContactPoint["Postinumero"],
          region: finnishContactPoint["Alue"],
          streetAddress: finnishContactPoint["Katuosoite"],
          telephone: telephone ? telephone.replace(/ /g, '') : undefined,
          type: (finnishContactPoint["Yhteyspisteen tyyppi"] === "Organisaatio" ? 'http://www.w3.org/2006/vcard/ns#Organization' : 'http://www.w3.org/2006/vcard/ns#Individual'),
          url: finnishContactPoint["Verkkosivu"],
            ...(finnishContactPoint["Organisaation nimi"] ? {
              organizationName: finnishContactPoint["Organisaation nimi"]
            } : {})
        }
      }

      const finnishObjectToAssessment = (finnishAssessment: Record<string, any>): Assessment => {
        return {
            date: parseDate(finnishAssessment["Arvion päivämäärä"]),
            urlToResult: finnishAssessment["Arvion tulos"]
        }
      }

      const finnishObjectToRightsHolder = (finnishRightsHolder: Record<string, any>): RightsHolder => {
        const phoneNumber = finnishRightsHolder["Puhelinnumero"]
        return {
            countryName: finnishRightsHolder["Maa"],
            email: finnishRightsHolder["Sähköposti"],
            name: finnishRightsHolder["Nimi"],
            phone: phoneNumber ? phoneNumber.replace(/ /g, '') : undefined,
            streetAddress: finnishRightsHolder["Katuosoite"],
            city: finnishRightsHolder["Kaupunki"],
            postalCode: finnishRightsHolder["Postinumero"],
            region: finnishRightsHolder["Alue"],
            type: (finnishRightsHolder["Toimijan tyyppi"] === "Yritys" ? 'http://purl.org/adms/publishertype/Company' : 'http://purl.org/adms/publishertype/PrivateIndividual(s)'),
                ...(finnishRightsHolder["Jäsenyydet"] ? {
                organizationName: finnishRightsHolder["Jäsenyydet"]
                } : {}),
                ...(finnishRightsHolder["Etunimi"] ? {
                firstName: finnishRightsHolder["Etunimi"]
                } : {}),
                ...(finnishRightsHolder["Sukunimi"] ? {
                surname: finnishRightsHolder["Sukunimi"]
                } : {}),
                ...(finnishRightsHolder["Työpaikan kotisivu"] ? {
                workplaceHomepage: finnishRightsHolder["Työpaikan kotisivu"]
                } : {})
        }
      }

      // Get contact points with improved typing
      optionalValues.contactPoints = await getObjectsContent(
        this.contactPoints,
        'contactPoints'
      ).then(contactPoints => contactPoints.map(finnishObjectToContactPoint));

      // Get assessments with improved typing
      optionalValues.assessments = await getObjectsContent(
        this.assessments,
        'assessments'
      ).then(assessments => assessments.map(finnishObjectToAssessment));

      // Get rights holders with improved typing
      optionalValues.rightsHolders = await getObjectsContent(
        this.rightsHolders,
        'rightsHolders'
      ).then(rightsHolders => rightsHolders.map(finnishObjectToRightsHolder));

      const datasetInfo = new DatasetInfo(
        visibilityValue,
        titleValue,
        frequencyValue,
        regionalCoverageValue,
        dataContentCategoryValue,
        descriptionValue,
        this.datasetId,
        optionalValues
      );
      console.log('DatasetInfo found from the page:', datasetInfo);
      return datasetInfo
    } catch (error) {
      console.error("Error in getDatasetInfo:", error);
      throw error;
    }
  }

  async getVisibility(): Promise<Visibility> {
    const isBadgeVisible = await isVisible(this.visibilityBadge);
    if (isBadgeVisible) {
      return 'private';
    } else {
      return 'public';
    }
  }
}

setPom(URL.Dataset, DatasetPage);
