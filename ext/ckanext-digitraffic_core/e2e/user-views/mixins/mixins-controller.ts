import type {IUserView} from "../user-view-types";
import type {Mixin, MixinsCombination} from "./mixin-types";

export enum MixinName {
  UserNavigation = 'UserNavigation',
  UserWrite = 'UserWrite',
  UserProfile = 'UserProfile',
  DatasetView = 'DatasetView',
  DatasetNavigate = 'DatasetNavigate',
  DatasetWrite = 'DatasetWrite',
  ResourceWrite = 'ResourceWrite',
}

const mixins = new Map<MixinName, Mixin>()

export function getMixin(mixinName: MixinName): Mixin {
  const mixin = mixins.get(mixinName)
  if (mixin === undefined) {
    throw new Error(`Mixin at "${mixinName}" is not set`)
  }
  return mixin
}

export function setMixin(mixinName: MixinName, mixin: Mixin) {
  if (mixins.has(mixinName)) {
    return
  }
  mixins.set(mixinName, mixin)
}

export function setMixinForUserView<T extends Mixin[], U extends Mixin[]>(
  userView: IUserView,
  ...mixinNames: MixinName[]
): IUserView & MixinsCombination<T> & MixinsCombination<U> {
  const newUserView = userView.copy()
  for (const mixinName of mixinNames) {
    const mixin = getMixin(mixinName)
    if (mixin === undefined) {
      throw new Error(`Mixin at "${mixinName}" is not set`)
    }
    Object.assign(newUserView, mixin)
  }
  return newUserView as IUserView & MixinsCombination<T> & MixinsCombination<U>;
}

export function addMixinForUserView<T extends Mixin, U extends IUserView>(
  userView: U,
  mixinName: MixinName
): U & T {
  const mixin = getMixin(mixinName)
  if (mixin === undefined) {
    throw new Error(`Mixin at "${mixinName}" is not set`)
  }
  Object.assign(userView, mixin)
  return userView as U & T;
}

export type MixinRemoved<T extends Mixin, U extends IUserView> = Omit<U, keyof T>;

export function removeMixinFromUserView<T extends Mixin, U extends IUserView>(
  userView: U,
  mixinName: MixinName
): MixinRemoved<T, U> {
  const mixin = getMixin(mixinName)
  if (mixin === undefined) {
    throw new Error(`Mixin at "${mixinName}" is not set`)
  }
  for (const key of Object.keys(mixin)) {
    delete userView[key as keyof U];
  }
  return userView as MixinRemoved<T, U>;
}