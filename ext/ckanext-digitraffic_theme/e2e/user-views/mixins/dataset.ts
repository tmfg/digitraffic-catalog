import { DatasetInfo } from "../../models/dataset-info";
import { Page, test } from "@playwright/test";
import { NewDatasetPage, DatasetPage } from "../../page-object-models";
import { gotoNewPage } from "../../page-object-models/util";
import type { DatasetNavigationMixin, DatasetViewMixin, DatasetWriteMixin, ResourceWriteMixin, } from "./mixin-types";
import { addMixinForUserView, MixinName, removeMixinFromUserView, setMixin } from "./mixins-controller";
import { URL } from "../../page-object-models/pages-controller";
import type { IUserView } from "../user-view-types";
import { EditDatasetPage } from "../../page-object-models/edit-dataset-page";


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

  async saveDatasetChanges<T extends IUserView & DatasetWriteMixin, U extends IUserView & DatasetViewMixin>(this: T): Promise<U> {
    // @ts-ignore
    return await test.step(`Saving dataset changes as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<EditDatasetPage>(URL.EditDataset);
      const datasetPage = await pom.saveDataset();
      this.pom = datasetPage;
      const datasetWriteRemovedUserView = removeMixinFromUserView<DatasetWriteMixin, typeof this>(this, MixinName.DatasetWrite)
      return addMixinForUserView<DatasetViewMixin, typeof datasetWriteRemovedUserView>(datasetWriteRemovedUserView, MixinName.DatasetView)
    });
  },
}




const datasetNavigationMixin: DatasetNavigationMixin = {
  async gotoNewDatasetPage<T extends IUserView & DatasetNavigationMixin>(this: T) {
    const pom = this.getPOM()

    this.pom = await gotoNewPage(
      pom.page,
      URL.NewDataset,
      async (newDatasetPOM: NewDatasetPage) => { await newDatasetPOM.goto() }
    )
    return addMixinForUserView<DatasetWriteMixin, typeof this>(this, MixinName.DatasetWrite)
  },

  async gotoDatasetEditPage<T extends IUserView & DatasetNavigationMixin>(this: T, datasetId: string) {
    const pom = this.getPOM()

    this.pom = await gotoNewPage(
      pom.page,
      URL.EditDataset,
      async (datasetEditPOM: EditDatasetPage) => { await datasetEditPOM.goto() },
      datasetId
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
  async checkDatasetInfo<T extends IUserView & DatasetViewMixin>(this: T, datasetInfo: DatasetInfo) {
    return await test.step(`Checking dataset info as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<DatasetPage>(URL.Dataset);
      const datasetInfoFromPage = await pom.getDatasetInfo();
      if (datasetInfoFromPage.optionalValues) {
        // The UI does not preseve original timezone value, so we set it to the expected value
        datasetInfoFromPage.optionalValues.ianaTimezone = datasetInfo.optionalValues?.ianaTimezone;
      }
      if (datasetInfo.optionalValues?.relatedDatasets) {
        // The UI provides links to related datasets. So we just check that the links are present
        test.expect((datasetInfoFromPage.optionalValues?.relatedDatasets?.length ?? 0) > 0).toBeTruthy();
        datasetInfoFromPage.optionalValues!.relatedDatasets = datasetInfo.optionalValues.relatedDatasets;
      }
      test.expect(datasetInfoFromPage).toStrictEqual(datasetInfo);
      return this;
    });
  },
  async checkRDFTurtleWorks<T extends IUserView & DatasetViewMixin>(this: T) {
    return await test.step(`Checking RDF Turtle works as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<DatasetPage>(URL.Dataset);
      await pom.openRDFTurtleToNewPage();
      const rdfPageTuple = (await this.user.resolveUnmanagedPages()).entries().next().value
      if (!rdfPageTuple) {
        throw new Error("RDF Turtle page not found");
      }
      const [rdfPageName, rdfPage] = rdfPageTuple;
      await rdfPage.bringToFront()
      await test.expect(rdfPage.getByText("a dcat:Dataset")).toBeVisible();
      await this.getPage().bringToFront()
      await this.user.removePage(rdfPageName)
      return this;
    });
  }
}

setMixin(MixinName.DatasetNavigate, datasetNavigationMixin);
setMixin(MixinName.DatasetWrite, datasetWriteMixin);
setMixin(MixinName.DatasetView, datasetViewMixin);
