import {UserInfo} from "../../models/user-info";
import {test} from "@playwright/test";
import {EditUserPage, UserProfilePage} from "../../page-object-models";
import type {UserNavigationMixin, UserProfileMixin, UserWriteMixin} from "./mixin-types";
import type {IUserView} from "../user-view-types";
import {addMixinForUserView, MixinName, removeMixinFromUserView, setMixin} from "./mixins-controller";
import {URL} from "../../page-object-models/pages-controller";

const userNavigationMixin: UserNavigationMixin = {
  async gotoUserProfilePage<T extends IUserView & UserNavigationMixin>(this: T, userName: string) {
    return await test.step(`Going to user's ${userName} profile page as ${this.user.identity}`, async () => {
      const pom = this.0();
      const userProfilePage = await pom.gotoUserProfilePage(userName);
      this.pom = userProfilePage;
      return addMixinForUserView<UserWriteMixin, typeof this>(this, MixinName.UserWrite);
    });
  },

  async gotoUserEditPage<T extends IUserView & UserNavigationMixin>(this: T, userName: string) {
    return await test.step(`Going to user's ${userName} profile edit page as ${this.user.identity}`, async () => {
      await this.gotoEditUserPage(userName);
      return addMixinForUserView<UserWriteMixin, typeof this>(this, MixinName.UserWrite);
    });
  },

  async browseToUserEditPage(this: IUserView & UserNavigationMixin, userToEditName: string) {
    return await test.step(`Browsing to user's ${userToEditName} profile page as ${this.user.identity}`, async () => {

      const homePage = (await this.gotoHomePage()).getPOM();
      let userProfilePage: UserProfilePage
      if (this.user.userInfo.name === userToEditName) {
        userProfilePage = await homePage.gotoUserProfilePage(userToEditName);
      } else {
        const modifiersUserProfilePage = await homePage.gotoUserProfilePage(userToEditName);
        const usersListingPage = await modifiersUserProfilePage.gotoUsersListingPage();
        userProfilePage = await usersListingPage.gotoListedUserPage(userToEditName)
      }
      const editUserProfilePOM = await userProfilePage.gotoEditUserPage()
      this.pom = editUserProfilePOM;
      return addMixinForUserView<UserWriteMixin, typeof this>(this, MixinName.UserWrite);
    });
  }
}

const userWriteMixin: UserWriteMixin = {
  async fillUserInfo<T extends IUserView & UserWriteMixin>(this: T, newUserInfo: Partial<UserInfo>) {
    return await test.step(`Filling user info as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<EditUserPage>(URL.EditUser);
      const editedUserInfo = (await pom.getUserInfo()).cloneWith(newUserInfo);

      await pom.fillForm(editedUserInfo);
      return this;
    });
  },

  async saveUserInfo<T extends IUserView & UserWriteMixin, U extends IUserView & UserProfileMixin>(this: T): Promise<U> {
    // @ts-ignore
    return await test.step(`Saving user info as ${this.user.identity}`, async () => {
      const pom = this.getAndValidatePOM<EditUserPage>(URL.EditUser);
      const userProfilePage = await pom.saveUserInfo();
      this.pom = userProfilePage;
      const userWriteRemovedUserView = removeMixinFromUserView<UserWriteMixin, typeof this>(this, MixinName.UserWrite)
      return addMixinForUserView<UserProfileMixin, typeof userWriteRemovedUserView>(userWriteRemovedUserView, MixinName.UserProfile)
    });
  }
}

const userProfileMixin: UserProfileMixin = {

}

setMixin(MixinName.UserNavigation, userNavigationMixin);
setMixin(MixinName.UserWrite, userWriteMixin);
setMixin(MixinName.UserProfile, userProfileMixin);