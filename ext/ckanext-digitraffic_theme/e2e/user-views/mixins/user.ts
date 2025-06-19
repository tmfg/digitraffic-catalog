//import type {KnownUser} from "../../users/known-user";
import {UserInfo} from "../../models/user-info";
import {test} from "@playwright/test";
//import type {UserFlowOptions, UserFlowResponse} from "./util";
import {EditUserPage, UserProfilePage} from "../../page-object-models";
import type {UserNavigationMixin, UserProfileMixin, UserWriteMixin} from "./mixin-types";
import type {IUserView} from "../user-view-types";
import {addMixinForUserView, MixinName, removeMixinFromUserView, setMixin} from "./mixins-controller";
import {URL} from "../../page-object-models/pages-controller";

/**
 * Browses to the edit page of some user. Browsing in this case means that UI elements are used to go to the edit page
 * instead of just writing the correct URL to the browser and hitting enter
 *
 * @param {KnownUser} user - The user that is used to browse to the edit page
 * @param {string} userToEditName - Username of the user to whose edit page we want to browse into
 * @param {Page} page - Page to use
 */

/*export async function browseToUserEditPage(user: KnownUser, userToEditName: string, page: Page | undefined = undefined): Promise<UserFlowResponse<EditUserPage>> {
  return await test.step(`Browsing to user's ${userToEditName} edit page as ${user.identity}`, async () => {
    if (!page) {
      page = await user.createNewPage('createOrganizationPage')
    }
    const homePage = await user.gotoHomePage(page);
    let userProfilePage: UserProfilePage
    if (user.userInfo.name === userToEditName) {
      userProfilePage = await homePage.gotoUserProfilePage(userToEditName);
    } else {
      const modifiersUserProfilePage = await homePage.gotoUserProfilePage(userToEditName);
      const usersListingPage = await modifiersUserProfilePage.gotoUsersListingPage();
      userProfilePage = await usersListingPage.gotoListedUserPage(userToEditName)
    }
    const editUserProfilePOM = await userProfilePage.gotoEditUserPage()
    return {
      isRunSuccessful: true,
      pom: editUserProfilePOM
    }
  })
}*/

/*export async function editUserInfo(user: KnownUser, userToEdit: KnownUser, newUserInfo: Partial<UserInfo>, options?: UserFlowOptions): Promise<UserFlowResponse<UserProfilePage>> {
  return await test.step(`Editing user's ${userToEdit.identity} information as ${user.identity}`, async () => {
    let page = options?.page
    if (page === undefined) {
      page = await user.createNewPage('createOrganizationPage')
    }
    let editUserPOM: EditUserPage
    if (typeof options?.navigate === 'undefined' || options?.navigate === 'goto') {
      editUserPOM = await user.gotoEditUserPage(userToEdit.userInfo.name, page)
    } else {
      editUserPOM = new EditUserPage(page, userToEdit.userInfo.name)
    }
    await editUserPOM.assertPage()

    const editedUserInfo = (await editUserPOM.getUserInfo()).cloneWith(newUserInfo)
    const userPageAfterUpdate = await editUserPOM.updateUserInfo(editedUserInfo)
    return {
      isRunSuccessful: true,
      pom: userPageAfterUpdate
    }
  })
}*/

const userNavigationMixin: UserNavigationMixin = {
  async gotoUserProfilePage<T extends IUserView & UserNavigationMixin>(this: T, userName: string) {
    return await test.step(`Going to user's ${userName} profile page as ${this.user.identity}`, async () => {
      const pom = this.getPOM();
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

      //await pom.updateUserInfo(editedUserInfo)

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