import { BasePage } from "./base";
import type { Page, Locator } from "@playwright/test";
import { setPom, URL } from "./pages-controller";
import { gotoNewPage } from "./util";
import { AuthorizationError } from "../models/error";
import type { NewDatasetPage } from "./new-dataset-page";
import type {DatasetPage} from "./dataset-page";

export class DatasetsListPage extends BasePage {
  readonly newDatasetButton: Locator;
  readonly listMainContent: Locator
  readonly datasetsList: Locator;

  constructor(page: Page) {
    super(page, [page.getByPlaceholder('Etsi tietoaineistoja…')]);
    this.listMainContent = this.mainContent.locator('[role="main"]');
    this.newDatasetButton = page.getByRole('link', { name: 'Lisää tietoaineisto' });
    this.datasetsList = this.listMainContent.locator('ul.dataset-list');
  }

  async goto(): Promise<DatasetsListPage> {
    await this.page.goto(URL.DatasetsList);
    await this.assertPage();
    return this;
  }

  async gotoNewDatasetPage(): Promise<NewDatasetPage> {
    return await gotoNewPage(
      this.page,
      URL.NewDataset,
      async () => await this.newDatasetButton
        .click()
        .catch(_ => {
          throw new AuthorizationError("Is not allowed to create a new dataset")
        })
    )
  }

  async gotoDatasetPage(datasetName: string, datasetId?: string): Promise<DatasetPage> {
    if (!datasetId) {
      const datasetLocator = this.datasetsList.getByRole('link', { name: datasetName, exact: true}).first();
      const urlWithDatasetId = await datasetLocator.getAttribute('href');
      datasetId = urlWithDatasetId?.split('/').pop();
      if (!datasetId) {
        throw new Error(`Dataset with name "${datasetName}" not found in the list`);
      }
    }
    return await gotoNewPage(
      this.page,
      URL.Dataset,
      async () => await this.datasetsList.locator(`a[href*="${datasetId}"]`).getByText(datasetName).click(),
      datasetId
    )
  }
}

setPom(URL.DatasetsList, DatasetsListPage);