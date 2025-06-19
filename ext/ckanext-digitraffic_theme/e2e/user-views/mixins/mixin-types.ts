import type {IUserView} from "../user-view-types";
import type {ResourceInfo} from "../../models/resource-info";
import type {DatasetInfo} from "../../models/dataset-info";
import type {UserInfo} from "../../models/user-info";

export type Mixin = {}

//export type MixinsList<T extends Mixin[]> = T extends [] ? {} : T extends [infer U] ? U : T extends [infer U, infer V] ? U & V : T extends [infer U, infer V, infer W] ? U & V & W : never
export type ListCombination<T extends unknown[]> = T extends [] ? {} : T extends [infer U] ? U : T extends [infer U, ...infer V] ? U & ListCombination<V> : never
//export type MixinsList<T extends Mixin[]> = T extends [] ? {} : T extends [infer U] ? U : T extends [infer U, ... infer V] ? U & MixinsList<V> : never
export type MixinsCombination<T extends Mixin[]> = ListCombination<T>

export type DatasetNavigationMixin = {
  gotoNewDatasetPage:<T extends Mixin[]>(this: IUserView & DatasetNavigationMixin & MixinsCombination<T>) => Promise<IUserView & DatasetNavigationMixin & DatasetWriteMixin & MixinsCombination<T>>;
  browseToNewDatasetPage:(this: IUserView & DatasetNavigationMixin) => Promise<IUserView & DatasetNavigationMixin & DatasetWriteMixin>;
};

export type DatasetWriteMixin = {
  fillNewDatasetInfo: <T extends (IUserView & DatasetWriteMixin)>(newDatasetInfo: DatasetInfo) => Promise<T>;
  saveDataset: <T extends (IUserView & DatasetWriteMixin), U extends (IUserView & ResourceWriteMixin)>(this: T) => Promise<U>;
};

export type ResourceWriteMixin = {
  fillNewResourceInfo: <T extends (IUserView & ResourceWriteMixin)>(resourceInfo: ResourceInfo) => Promise<T>;
  saveResource: <T extends (IUserView & ResourceWriteMixin), U extends (IUserView & DatasetViewMixin)>(this: T) => Promise<U>;
}

export type DatasetViewMixin = {

}

export type UserNavigationMixin = {
  gotoUserProfilePage: <T extends Mixin[]>(this: IUserView & UserNavigationMixin & MixinsCombination<T>, userName: string) => Promise<IUserView & UserNavigationMixin & MixinsCombination<T>>;
  gotoUserEditPage: (this: IUserView & UserNavigationMixin, userName: string) => Promise<IUserView & UserWriteMixin>;
  browseToUserEditPage: (this: IUserView & UserNavigationMixin, userName: string) => Promise<IUserView & UserWriteMixin>;
}

export type UserWriteMixin = {
  fillUserInfo: <T extends (IUserView & UserWriteMixin)>(newUserInfo: Partial<UserInfo>) => Promise<T>;
    saveUserInfo: <T extends (IUserView & UserWriteMixin), U extends (IUserView & UserProfileMixin)>(this: T) => Promise<U>;
}

export type UserProfileMixin = {

}

//export type UserViewWithDatasetWriteMixin = IUserView & DatasetWriteMixin;
//export type UserViewWithResourceWriteMixin = IUserView & ResourceWriteMixin;