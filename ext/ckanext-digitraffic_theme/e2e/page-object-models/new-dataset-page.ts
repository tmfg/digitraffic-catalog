import type {Page} from "@playwright/test";
import { BasePage } from './base';
import { setPom, URL} from "./pages-controller";
import { DatasetInfo } from '../models/dataset-info';

export class NewDatasetPage extends BasePage {

  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Yleiset'}), page.getByRole('heading', {name: 'Versiointi'})]);
  }

  async goto(): Promise<NewDatasetPage> {
    await this.page.goto(URL.NewDataset);
    await this.assertPage();
    return this;
  }

  async getDatasetInfo(): Promise<DatasetInfo> {
    throw new Error('Method not implemented');
  }

  /*async setDatasetInfo(datasetInfo: DatasetInfo): Promise<DatasetPage> {
    throw new Error('Method not implemented');
  }*/
}

setPom(URL.NewDataset,NewDatasetPage)