import { BasePage, type JSLoadedInterface } from "./base";
import type { Locator, Page } from "@playwright/test";
import { setPom, URL } from "./pages-controller";
import { gotoNewPage, pathParameterURL } from "./util";

import { DatasetPage } from "./dataset-page";

export class EditDatasetPage extends BasePage implements JSLoadedInterface<EditDatasetPage> {
    readonly pageUrl: string
    readonly saveButton: Locator
    readonly datasetId: string

    constructor(page: Page, datasetId: string) {
        super(page, [page.getByRole('heading', { name: 'Yleiset' }), page.getByRole('heading', { name: 'Versiointi' })]);
        this.pageUrl = pathParameterURL(URL.EditDataset, { 'datasetId': datasetId })
        this.saveButton = page.getByRole('button', { name: 'Päivitä tietoaineisto' });
        this.datasetId = datasetId
    }
    async goto(): Promise<EditDatasetPage> {
        await this.page.goto(this.pageUrl);
        return this;
    }
    async ensurePageJsLoaded<EditDatasetPage>(): Promise<EditDatasetPage> {
        await this.page.waitForLoadState('networkidle');
        return this as unknown as EditDatasetPage;
    }
    async saveDataset(): Promise<DatasetPage> {
        return await gotoNewPage<DatasetPage>(
            this.page,
            URL.Dataset,
            async (datasetPOM) => {
                await this.saveButton.click();
                const isSaveSuccessful = await datasetPOM.isAtPage();
                if (!isSaveSuccessful) {
                    throw new Error("Couldn't save the dataset information");
                }
            },
            this.datasetId
        );
    }
}

setPom(URL.EditDataset, EditDatasetPage)