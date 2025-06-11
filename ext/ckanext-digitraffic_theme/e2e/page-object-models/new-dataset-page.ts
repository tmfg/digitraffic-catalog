import type { Locator, Page } from "@playwright/test";
import { BasePage, type JSLoadedInterface } from "./base";
import { setPom, URL } from "./pages-controller";
import { DatasetInfo } from "../models/dataset-info";
import { gotoNewPage } from "./util";
import { NewResourcePage } from "./new-resource-page";

export class NewDatasetPage extends BasePage
  implements JSLoadedInterface<NewDatasetPage> {
  readonly visibilityFields: Locator;
  readonly visibilityFieldPublic: Locator;
  readonly visibilityFieldPrivate: Locator;
  readonly titleField: Locator;
  readonly frequencyField: Locator;
  readonly regionalCoverageField: Locator;
  readonly dataContentCategoryField: Locator;
  readonly descriptionField: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Yleiset'}), page.getByRole('heading', {name: 'Versiointi'})]);
    this.visibilityFields = page.locator('.control-group:has([for="field-private"])');
    this.visibilityFieldPublic = this.visibilityFields.getByLabel('Julkinen');
    this.visibilityFieldPrivate = this.visibilityFields.getByLabel('Yksityinen');
    this.titleField = page.getByLabel('Nimike englanniksi')
    this.frequencyField = page.getByLabel('* Päivitysten tiheys');
    this.regionalCoverageField = page.getByLabel('Alueellinen kattavuus');
    this.dataContentCategoryField = page.getByLabel('* Kategoria');
    this.descriptionField = page.getByLabel('Kuvaus englanniksi');
    this.saveButton = page.getByRole('button', {name: 'Seuraava: Lisää dataa'});
  }

  async goto(): Promise<NewDatasetPage> {
    await this.page.goto(URL.NewDataset);
    await this.assertPage();
    return this;
  }

  async getDatasetInfo(): Promise<DatasetInfo> {
    throw new Error("Method not implemented");
  }

  async ensurePageJsLoaded<NewDatasetPage>(): Promise<NewDatasetPage> {
    await this.page.waitForLoadState("networkidle");

    await this.page.waitForFunction(() => {
      return customElements.get("fds-dropdown") !== undefined;
    });

    await this.page.locator("fds-dropdown").waitFor({ state: "attached" });

    return this as unknown as NewDatasetPage;
  }

  async fillForm(datasetInfo: DatasetInfo) {
    if (datasetInfo.visibility === "public") {
      await this.visibilityFieldPublic.check();
    }
    if (datasetInfo.visibility === "private") {
      await this.visibilityFieldPrivate.check();
    }
    await this.titleField.fill(datasetInfo.title)
    await this.frequencyField.selectOption(datasetInfo.frequency)
    await this.regionalCoverageField.selectOption(datasetInfo.regionalCoverage)
    await this.dataContentCategoryField.selectOption(datasetInfo.dataContentCategory)
    await this.descriptionField.fill(datasetInfo.description)
  }

  async setDatasetInfo(datasetInfo: DatasetInfo): Promise<NewResourcePage> {
    await this.fillForm(datasetInfo);
    return await gotoNewPage<NewResourcePage>(
      this.page,
      URL.NewResource,
      async (newResourcePOM) => {
        await this.saveButton.click();
        const isSaveSuccessful = await newResourcePOM.isAtPage();
        if (!isSaveSuccessful) {
          throw new Error("Couldn't save the dataset information");
        }
        const url = this.page.url();
        const datasetIdMatch = url.match(/dataset\/([0-9a-fA-F-]+)/);
        if (!datasetIdMatch || datasetIdMatch.length < 2) {
          throw new Error("Couldn't extract dataset ID from the URL");
        }
        console.log(`Dataset ID: ${datasetIdMatch[1]}`);
        newResourcePOM.setDatasetId(datasetIdMatch[1] as string);
      },
    );
  }
}

setPom(URL.NewDataset, NewDatasetPage);
