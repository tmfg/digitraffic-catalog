import {getUserOrThrow, test} from '../fixtures/users'
import {Identity, User} from '../users/user';
import {URL} from '../page-object-models/pages-controller'

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationAdmin, Identity.SysAdmin] as const

test.describe('User info update tests', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Modify user data', async ({users}) => {
    const organizationEditor = getUserOrThrow(users, Identity.OrganizationEditor)
    const homePage = await organizationEditor.gotoHomePage();
    console.log("#### USER INFO #####")
    console.log(organizationEditor.userInfo)
    if (organizationEditor.userInfo !== undefined) {
      const userProfilePage = await homePage.gotoUserProfilePage(organizationEditor.userInfo);
      const editUserPage = await userProfilePage.gotoEditUserPage()
      editUserPage.updateUserInfo(editedUserInfo)
    }
  })

  test('Modifying other user data as admin fails', async ({users}) => {

  })
})