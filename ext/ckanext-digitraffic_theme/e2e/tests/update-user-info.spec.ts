import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {expect} from "@playwright/test";
import {OrganizationEditorView} from "../user-views/organization-editor-view";
import {UserProfilePage} from "../page-object-models";
import {AuthorizationError} from "../models/error";
import {SysAdminView} from "../user-views/sys-admin-view";

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationAdmin, Identity.SysAdmin] as const

test.describe('User info update tests', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Modify user data', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const organizationView = await OrganizationEditorView.of(organizationEditor)
    const newUserInfo = {
      description: "description"
    }

    await organizationView.browseToUserEditPage(organizationEditor.userInfo.name)
      .then(profileEditView => profileEditView.fillUserInfo(newUserInfo))
      .then(profileEditView => profileEditView.saveUserInfo())
      .then(async userProfileView => {
        const pom = userProfileView.getPOM<UserProfilePage>()
        await expect(pom).toBeInstanceOf(UserProfilePage)
        await expect(pom.userDescription).toContainText(newUserInfo.description)
      })
  })

  test('Modifying other user data as admin fails', async ({users}) => {
    const sysAdmin = getKnownUserOrThrow(users, Identity.SysAdmin)
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const organizationView = await SysAdminView.of(sysAdmin)

    await expect(organizationView.gotoUserEditPage(organizationEditor.userInfo.name)).rejects.toThrowError(AuthorizationError)
  })
})