import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {expect} from "@playwright/test";
import {browseToUserEditPage, editUserInfo} from "../user-flows/user";
import {assertIsSuccessfulResponse} from "../user-flows/util";

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationAdmin, Identity.SysAdmin] as const

test.describe('User info update tests', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Modify user data', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const newUserInfo = {
      description: "description"
    }
    const browseResponse = await browseToUserEditPage(organizationEditor, organizationEditor.userInfo.name)
    assertIsSuccessfulResponse(browseResponse)
    const {pom: editPagePOM } = browseResponse
    const editResponse = await editUserInfo(organizationEditor, organizationEditor, newUserInfo, {
      page: editPagePOM.page,
      navigate: false
    })
    assertIsSuccessfulResponse(editResponse)
    const {pom: userProfilePagePOM} = editResponse
    await expect(userProfilePagePOM.userDescription).toContainText(newUserInfo.description)
  })

  /*test('Modifying other user data as admin fails', async ({users}) => {

  })*/
})