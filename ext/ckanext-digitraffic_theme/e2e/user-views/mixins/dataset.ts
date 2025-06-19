import {DatasetInfo} from "../../models/dataset-info";
import {test} from "@playwright/test";
import {NewDatasetPage} from "../../page-object-models";
import {gotoNewPage} from "../../page-object-models/util";
import type {DatasetNavigationMixin, DatasetViewMixin, DatasetWriteMixin, ResourceWriteMixin,} from "./mixin-types";
import {addMixinForUserView, MixinName, removeMixinFromUserView, setMixin} from "./mixins-controller";
import {URL} from "../../page-object-models/pages-controller";
import type {IUserView} from "../user-view-types";


/**
 * Mixin for dataset-related user flows. Has to be used with a KnownUser instance.
 */
const datasetWriteMixin: DatasetWriteMixin = {

  /**
   * Sets information for a new dataset
   *
   * @param {DatasetInfo} newDatasetInfo - Information for the new dataset
   */
  async fillNewDatasetInfo<T extends IUserView & DatasetWriteMixin>(this: T, newDatasetInfo: DatasetInfo) {
    return await test.step(`Filling new dataset as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<NewDatasetPage>(URL.NewDataset);
      await pom.fillForm(newDatasetInfo);
      return this
    });
  },
  /**
   * Hits the save button on the dataset page
   */
  async saveDataset<T extends IUserView & DatasetWriteMixin, U extends IUserView & ResourceWriteMixin>(this: T): Promise<U> {
    // @ts-ignore
    return await test.step(`Saving dataset as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<NewDatasetPage>(URL.NewDataset);
      const newResourcePage = await pom.saveDataset();
      this.pom = newResourcePage;
      const datasetWriteRemovedUserView = removeMixinFromUserView<DatasetWriteMixin, typeof this>(this, MixinName.DatasetWrite)
      return addMixinForUserView<ResourceWriteMixin, typeof datasetWriteRemovedUserView>(datasetWriteRemovedUserView, MixinName.ResourceWrite)
    });
  },
}

const datasetNavigationMixin: DatasetNavigationMixin = {
  async gotoNewDatasetPage<T extends IUserView & DatasetNavigationMixin>(this: T) {
    const pom = this.getPOM()

    await gotoNewPage(
      pom.page,
      URL.NewDataset,
      async (newDatasetPOM: NewDatasetPage) => {await newDatasetPOM.goto()}
    )
    return addMixinForUserView<DatasetWriteMixin, typeof this>(this, MixinName.DatasetWrite)
  },

  /**
   * Browses to the new dataset page using UI elements
   *
   * @param {UserActions} userActions - Optional user actions to perform after navigating
   * @param {Page} page - Optional page to use
   */
  async browseToNewDatasetPage<T extends IUserView & DatasetNavigationMixin>(this: T) {
    return await test.step("Browsing to new dataset page", async () => {
      const homePage = (await this.gotoHomePage()).getPOM();
      const datasetsListPage = await homePage.gotoDatasetsListPage();
      const newDatasetPage = await datasetsListPage.gotoNewDatasetPage();
      this.pom = newDatasetPage;
      return addMixinForUserView<DatasetWriteMixin, typeof this>(this, MixinName.DatasetWrite)
    });
  },
}

const datasetViewMixin: DatasetViewMixin = {

}

setMixin(MixinName.DatasetNavigate, datasetNavigationMixin);
setMixin(MixinName.DatasetWrite, datasetWriteMixin);
setMixin(MixinName.DatasetView, datasetViewMixin);