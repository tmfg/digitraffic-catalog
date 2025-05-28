import {KnownUser} from "../users/known-user";
import {DatasetInfo} from "../models/dataset-info";
import {type Page, test} from "@playwright/test";
import type {UserFlowOptions, UserFlowResponse} from "./util";
import {NewDatasetPage} from "../page-object-models/new-dataset-page";

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

/**
 * Sets information for a new dataset
 *
 * @param {KnownUser} user - The user creating the dataset
 * @param {DatasetInfo} newDatasetInfo - Information for the new dataset
 * @param {UserFlowOptions} options - Optional parameters
 */
export async function setNewDatasetInfo(user: KnownUser, newDatasetInfo: DatasetInfo, options?: UserFlowOptions): Promise<UserFlowResponse<NewDatasetPage>> {
  return await test.step(`Creating new dataset as ${user.identity}`, async () => {
    let page = options?.page;
    if (page === undefined) {
      page = await user.createNewPage('newDatasetPage');
    }

    let newDatasetPOM: NewDatasetPage;
    if (typeof options?.navigate === 'undefined' || options?.navigate) {
      const response = await browseToNewDatasetPage(user, page)
      if ('error' in response) {
        return {
          isRunSuccessful: false,
          error: response.error
        };
      }
      newDatasetPOM = response.pom;
    } else {
      newDatasetPOM = new NewDatasetPage(page);
    }

    await newDatasetPOM.assertPage();

    const newDatasetPageAfterUpdate = await newDatasetPOM.setDatasetInfo(newDatasetInfo);
    return {
      isRunSuccessful: true,
      pom: newDatasetPageAfterUpdate
    }
  });
}