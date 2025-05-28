// e2e/page-object-models/new-resource-page.ts
import type { Locator, Page } from "@playwright/test";
import { BasePage, type JSLoadedInterface } from './base';
import { setPom, URL } from "./pages-controller";
import {pathParameterURL} from "./util";

export class NewResourcePage extends BasePage implements JSLoadedInterface<NewResourcePage> {
  datasetId: string | undefined;
  pageUrl: string | undefined;

  constructor(page: Page) {
    super(page, [page.getByRole('heading', { name: 'Verkko-osoitteet' })]);
  }

  setDatasetId(datasetId: string): NewResourcePage {
    this.datasetId = datasetId;
    this.pageUrl = pathParameterURL(URL.NewResource, {'datasetId': datasetId});
    return this;
  }

  async goto(): Promise<NewResourcePage> {
    if (!this.pageUrl) {
      throw new Error("Dataset ID is not set. Use setDatasetId() before calling goto().");
    }
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }

  async ensurePageJsLoaded(): Promise<NewResourcePage> {
    await this.page.waitForLoadState('networkidle');

    return this;
  }
}

setPom(URL.NewResource, NewResourcePage);