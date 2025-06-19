import type {Locator, Page} from "@playwright/test";
import {BasePage, type JSLoadedInterface} from './base';
import {setPom, URL} from "./pages-controller";
import {ResourceInfo} from '../models/resource-info';
import {gotoNewPage, pathParameterURL, urlify} from "./util";
import type {DatasetPage} from "./dataset-page";

export class NewResourcePage extends BasePage implements JSLoadedInterface<NewResourcePage> {
  readonly urlField: Locator;
  readonly formatField: Locator;
  readonly mobilityDataStandardField: Locator;
  readonly rightsTypeField: Locator;
  readonly saveButton: Locator;
  datasetId?: string;
  pageUrl?: string;

  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Verkko-osoitteet'})]);
    this.urlField = page.getByLabel('* URL');
    this.formatField = page.getByLabel('* Formaatti');
    this.mobilityDataStandardField = page.getByLabel('* Liikenteen tietostandardi');
    this.rightsTypeField = page.getByLabel('* Pääsy- ja käyttöehdot');
    this.saveButton = page.getByRole('button', {name: 'Valmis'});
  }

  setDatasetId(datasetId: string): NewResourcePage {
    console.log('Setting dataset ID:', datasetId);
    this.datasetId = datasetId;
    this.pageUrl = urlify(pathParameterURL(URL.NewResource, {'datasetId': datasetId}));
    return this;
  }

  async goto(): Promise<NewResourcePage> {
    if (!this.datasetId || !this.pageUrl) {
      throw new Error('Dataset ID is required to navigate to the new resource page');
    }
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }

  async ensurePageJsLoaded<NewResourcePage>(): Promise<NewResourcePage> {
    await this.page.waitForLoadState('networkidle');
    return this as unknown as NewResourcePage;
  }

  async fillForm(resourceInfo: ResourceInfo) {
    await this.urlField.fill(resourceInfo.url);
    await this.formatField.selectOption(resourceInfo.format.label);
    await this.mobilityDataStandardField.selectOption(resourceInfo.mobilityDataStandard);
    await this.rightsTypeField.selectOption(resourceInfo.rightsType);
  }

  async saveResource(): Promise<DatasetPage> {
    if (!this.datasetId) {
      throw new Error('Dataset ID is required to save the resource info');
    }
    return await gotoNewPage<DatasetPage>(
      this.page,
      URL.Dataset,
      async (datasetPOM) => {
        await this.saveButton.click()
        const isSaveSuccessful = await datasetPOM.isAtPage()
        if (!isSaveSuccessful) {
          throw new Error("Couldn't save the resource information");
        }
      },
      this.datasetId
    )
  }
}

setPom(URL.NewResource, NewResourcePage);