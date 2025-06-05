import { BasePage } from "./base";
import type { Page } from "@playwright/test";
import { setPom, URL } from "./pages-controller";
import { pathParameterURL, urlify } from "./util";

export class DatasetPage extends BasePage {
  readonly pageUrl: string

  constructor(page: Page, datasetId: string) {
    super(page, [page.getByRole('heading', { name: 'RDF links' })]);

    this.pageUrl = urlify(pathParameterURL(URL.Dataset, {'datasetId': datasetId}));
  }

  async goto(): Promise<DatasetPage> {
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }
}

setPom(URL.Dataset, DatasetPage);