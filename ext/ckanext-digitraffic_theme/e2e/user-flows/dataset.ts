import { KnownUser } from "../users/known-user";
//import { DatasetInfo } from "../models/dataset-info";
import { type Page, test } from "@playwright/test";
import type { /*UserFlowOptions,*/ UserFlowResponse } from "./util";
import { NewDatasetPage } from "../page-object-models/new-dataset-page";

/**
 * Navigates to the new dataset page using UI elements
 *
 * @param {KnownUser} user - The user performing the navigation
 * @param {Page} page - Optional page to use
 */
export async function browseToNewDatasetPage(user: KnownUser, page: Page | undefined = undefined): Promise<UserFlowResponse<NewDatasetPage>> {
  return await test.step(`Browsing to new dataset page as ${user.identity}`, async () => {
    if (!page) {
      page = await user.createNewPage('newDatasetPage');
    }

    const homePage = await user.gotoHomePage(page);
    const datasetsListPage = await homePage.gotoDatasetsListPage();
    const newDatasetPage = await datasetsListPage.gotoNewDatasetPage();

    return {
      isRunSuccessful: true,
      pom: newDatasetPage
    };
  });
}

