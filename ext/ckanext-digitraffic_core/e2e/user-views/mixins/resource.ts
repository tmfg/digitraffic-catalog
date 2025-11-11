import {addMixinForUserView, MixinName, removeMixinFromUserView, setMixin} from "./mixins-controller";
import type {DatasetViewMixin, ResourceWriteMixin} from "./mixin-types";
import type {IUserView} from "../user-view-types";
import {ResourceInfo} from "../../models/resource-info";
import {NewResourcePage} from "../../page-object-models";
import {URL} from "../../page-object-models/pages-controller";
import {test} from "@playwright/test";

const resourceWriteMixin: ResourceWriteMixin = {
  /**
   * Sets information for a new resource in the dataset
   *
   * @param {ResourceInfo} newResourceInfo - Information for the new resource
   */
  async fillNewResourceInfo<T extends IUserView & ResourceWriteMixin>(this: T, newResourceInfo: ResourceInfo) {
    return await test.step(`Filling new resource as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<NewResourcePage>(URL.NewResource);
      if (!newResourceInfo.datasetId) {
        throw new Error('Resource info must contain datasetId');
      }
      pom.setDatasetId(newResourceInfo.datasetId)

      await pom.fillForm(newResourceInfo);

      return this
    })
  },
  /**
   * Hits the save button on the reource page
   */
  async saveResource<T extends IUserView & DatasetViewMixin, U extends IUserView & DatasetViewMixin>(this: T): Promise<U> {
    // @ts-ignore
    return await test.step(`Saving resource as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<NewResourcePage>(URL.NewResource);
      const datasetPage = await pom.saveResource();
      this.pom = datasetPage;
      const datasetWriteRemovedUserView = removeMixinFromUserView<DatasetViewMixin, typeof this>(this, MixinName.ResourceWrite)
      return addMixinForUserView<DatasetViewMixin, typeof datasetWriteRemovedUserView>(datasetWriteRemovedUserView, MixinName.DatasetView)
    });
  },
}

setMixin(MixinName.ResourceWrite, resourceWriteMixin)