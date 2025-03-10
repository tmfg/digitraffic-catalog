import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {expect} from "@playwright/test";

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationAdmin, Identity.SysAdmin] as const

test.describe('User info update tests', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Modify user data', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const homePage = await organizationEditor.gotoHomePage();
    const userProfilePage = await homePage.gotoUserProfilePage(organizationEditor.userInfo.name);
    const editUserPage = await userProfilePage.gotoEditUserPage()

    const newUserInfo = {
      description: "description"
    }
    const editedUserInfo = (await editUserPage.getUserInfo()).cloneWith(newUserInfo)
    const editUserPageAfterUpdate = await editUserPage.updateUserInfo(editedUserInfo)

    await expect(editUserPageAfterUpdate.userDescription).toContainText(newUserInfo.description)
  })

  /*test('Modifying other user data as admin fails', async ({users}) => {

  })*/
})