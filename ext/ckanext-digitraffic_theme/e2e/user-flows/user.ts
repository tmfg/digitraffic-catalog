import {KnownUser} from "../users/known-user";
import {UserInfo} from "../models/user-info";
import {type Page, test} from "@playwright/test";
import type {UserFlowOptions, UserFlowResponse} from "./util";
import {EditUserPage, UserProfilePage} from "../page-object-models";

/**
 * Browses to the edit page of some user. Browsing in this case means that UI elements are used to go to the edit page
 * instead of just writing the correct URL to the browser and hitting enter
 *
 * @param {KnownUser} user - The user that is used to browse to the edit page
 * @param {string} userToEditName - Username of the user to whose edit page we want to browse into
 * @param {Page} page - Page to use
 */
export async function browseToUserEditPage(user: KnownUser, userToEditName: string, page: Page | undefined = undefined): Promise<UserFlowResponse<EditUserPage>> {
  return await test.step(`Browsing to user's ${userToEditName} edit page as ${user.identity}`, async () => {
    if (!page) {
      page = await user.createNewPage('createOrganizationPage')
    }
    const homePage = await user.gotoHomePage(page);
    let userProfilePage:UserProfilePage
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
}

export async function editUserInfo(user: KnownUser, userToEdit: KnownUser, newUserInfo: Partial<UserInfo>, options?: UserFlowOptions): Promise<UserFlowResponse<UserProfilePage>> {
  return await test.step(`Editing user's ${userToEdit.identity} information as ${user.identity}`, async () => {
    let page = options?.page
    if (page === undefined) {
      page = await user.createNewPage('createOrganizationPage')
    }
    let editUserPOM: EditUserPage
    if (typeof options?.navigate === 'undefined' || options?.navigate) {
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
}