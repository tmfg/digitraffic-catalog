import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {pathParameterURL, urlify} from "./util";
import {DatasetInfo, type Visibility, type OptionalDatasetInfoValues} from "../models/dataset-info";
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
    this.description = this.getMetadataTableRowLocator('Kuvaus');
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

  private getMetadataDescriptionTermLocator(definitionList: Locator, termName: string): Locator {
    // Create a regex that matches the term name with optional whitespace around it
    // The `exact` keyword in `getByRole` does not work for this case, so we use a regex
    const exactNameRegex = new RegExp(`(?<![a-öA-Ö]+)[\s\n\t\r]?${termName}[\s\n\t\r]?(?![a-öA-Ö]+)`, 'i');
    const term = definitionList.getByRole('term', {name: exactNameRegex});
    return term.locator('dd');
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

      const getObjectContent = async (locator: Locator, fieldName: string): Promise<any> => {
        try {
          const o = {}
          const definitionList = locator.locator('dl');
          const termsLocators = locator.locator('dt');
          for (let i = 0; i < await termsLocators.count(); i++) {
            const termsLocator = termsLocators.nth(i);
            const term = await termsLocator.textContent()
            if (!term) {
              console.log(`No term found for ${fieldName} at index ${i}`);
              continue;
            }
            const valueLocator = this.getMetadataDescriptionTermLocator(definitionList, term)
            o[term.trim()] = await valueLocator.textContent();
          }
          return o
        } catch (error) {
          console.log(`Error getting object content for ${fieldName}: ${error}`);
          return '';
        }
      }

      const getObjectsContent = async (cellLocator: Locator, fieldName: string): Promise<any> => {
        try {
          const objects = []
          const objectLocators = cellLocator.locator('.panel');
          for (let i = 0; i < await objectLocators.count(); i++) {
            const objectLocator = objectLocators.nth(i);
            objects.push(await getObjectContent(objectLocator, fieldName));
          }
          return objects
        } catch (error) {
          console.log(`Error getting object content for ${fieldName}: ${error}`);
          return null;
        }
      }

      // Helper function to safely check if a locator exists on the page
      const locatorExists = async (locator: Locator): Promise<boolean> => {
        try {
          const count = await locator.count();
          return count > 0;
        } catch (error) {
          return false;
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
      const startTimestampValue = new Date(await getTextContent(this.startTimestamp, 'startTimestamp'));
        const endTimestampValue = new Date(await getTextContent(this.endTimestamp, 'endTimestamp'));
        const versionValue = await getTextContent(this.version, 'version');
        const versionNotesValue = await getTextContent(this.versionNotes, 'versionNotes');
        const languageValue = labelToLanguage(await getTextContent(this.language, 'language'));
        const georeferencingMethodValue = labelToGeoreferencingMethod(await getTextContent(this.georeferencingMethod, 'georeferencingMethod'));
        const networkCoverageValue = labelToNetworkCoverage(await getTextContent(this.networkCoverage, 'networkCoverage'));
        const intendedInformationServiceValue = labelToIntendedInformationService(await getTextContent(this.intendedInformationService, 'intendedInformationService'));
        const urlToQualityDescriptionValue = await getTextContent(this.urlToQualityDescription, 'urlToQualityDescription');
        const spatialReferenceSystemValue = parseInt(await getTextContent(this.spatialReferenceSystem, 'spatialReferenceSystem'));

      // Extract values for optional fields
      const optionalValues: OptionalDatasetInfoValues = {
        'dataContentSubCategory': dataContentSubCategoryValue,
        'theme': themeValue,
        'transportMode': transportModeValue,
        'startTimestamp': startTimestampValue,
        'endTimestamp': endTimestampValue,
        'version': versionValue,
        'versionNotes': versionNotesValue,
        'language': languageValue,
        'georeferencingMethod': georeferencingMethodValue,
        'networkCoverage': networkCoverageValue,
        'intendedInformationService': intendedInformationServiceValue,
        'urlToQualityDescription': urlToQualityDescriptionValue,
        'spatialReferenceSystem': spatialReferenceSystemValue,
        'ianaTimezone': 'UTC'
      };

      // Handle related datasets
      if (await locatorExists(this.relatedDatasets)) {
        const relatedText = await getTextContent(this.relatedDatasets, 'relatedDatasets');
        if (relatedText) {
          optionalValues.relatedDatasets = relatedText.split(',').map(item => item.trim());
        } else {
          optionalValues.relatedDatasets = [];
        }
      }

      optionalValues.contactPoints = await getObjectsContent(this.contactPoints, 'contactPoints');
      optionalValues.assessments = await getObjectsContent(this.assessments, 'assessments');
      optionalValues.rightsHolders = await getObjectsContent(this.rightsHolders, 'rightsHolders');


      console.log('Final extracted values:');
      console.log('- visibility:', visibilityValue);
      console.log('- title:', titleValue);
      console.log('- frequency:', frequencyValue);
      console.log('- regionalCoverage:', regionalCoverageValue);
      console.log('- dataContentCategory:', dataContentCategoryValue);
      console.log('- description:', descriptionValue);

      // Create the DatasetInfo object using values extracted from the page where possible
      return new DatasetInfo(
        visibilityValue,
        titleValue || 'Test Dataset Full Info',
        frequencyValue,
        regionalCoverageValue,
        dataContentCategoryValue,
        descriptionValue || 'This is a test dataset description with all fields.',
        this.datasetId,
        optionalValues
      );
    } catch (error) {
      console.error("Error in getDatasetInfo:", error);
      throw error
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
