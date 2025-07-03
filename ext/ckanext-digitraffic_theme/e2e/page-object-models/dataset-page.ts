import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {pathParameterURL, urlify} from "./util";
import {DatasetInfo, type Visibility} from "../models/dataset-info";
import {Frequency, frequencyLabels} from "../../src/ts/model/frequency";
import {getObjectKeyByValue} from "../util";
import {RegionalCoverage, regionalCoverageLabels} from "../../src/ts/model/regional-coverage";
import {MOBILITY_THEME_LABELS, type TOP_MOBILITY_THEMES_T} from "../../src/ts/model/mobility-theme";
import {isVisible} from "../util";

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

  async goto(): Promise<DatasetPage> {
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }

  async getDatasetInfo(): Promise<DatasetInfo> {
    const dataContentCategoryLabels = Object.entries(MOBILITY_THEME_LABELS)
      .map(([key, value]) => ({[key]: value.fi}))
    const getOrThrow = <T>(value: T): Exclude<T, null | undefined> => {
        if (value === null || value === undefined) {
            throw new Error("Value is null or undefined");
        }
        return value as unknown as Exclude<T, null | undefined>;
    }
    const optionalValues = {

    }
    return new DatasetInfo(
      await this.getVisibility(),
      getOrThrow(await this.title.textContent()),
      Frequency[getOrThrow(getObjectKeyByValue(frequencyLabels, await this.frequency.textContent())) as keyof typeof Frequency],
      RegionalCoverage[getOrThrow(getObjectKeyByValue(regionalCoverageLabels, await this.regionalCoverage.textContent()) as keyof typeof RegionalCoverage)],
      getOrThrow(getObjectKeyByValue(dataContentCategoryLabels, await this.dataContentCategory.textContent())) as TOP_MOBILITY_THEMES_T,
      getOrThrow(await this.description.textContent()),
      this.datasetId,
      optionalValues
    )
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