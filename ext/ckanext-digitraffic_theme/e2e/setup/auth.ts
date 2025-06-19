/**
 * This module is used to sign in all the test users with different roles. After signing in, the browser state
 * is saved into a cache where it can be used in later tests so that the authentication flow needs to be done
 * only once. This authentication process follows the guidelines set
 * [here]{@link https://playwright.dev/docs/auth#multiple-signed-in-roles}
 */

import {test as setup, getKnownUserOrThrow, getIdentityUserOrThrow} from '../fixtures/users';
import {IdentityUser} from '../users/identity-user'
import {Identity} from '../users/identity-user'
import {hideDevTools, getEnv} from "../util";
import {organization} from "../testdata";
import {addMemberToOrganization, createOrganization, removeMemberFromOrganization} from "../user-views/mixins/organization"
import {OrganizationCreationError, Role} from "../page-object-models";


async function authenticate(user: IdentityUser, identity: Identity, username: string, password: string): Promise<void> {
  await setup.step(`Authenticate as ${identity}`, async () => {
    const page = user.getPageFromContext()
    await page.goto('/')

    await hideDevTools(page)
    if (!await user.isUserLoggedIn()) {
      await user.authenticateUser(page, username, password)
    }
  })
}

setup.describe('Create and log in all the test users', () => {
  setup.use({
    identitiesToUse: [new Set([Identity.SysAdmin, Identity.OrganizationAdmin, Identity.OrganizationEditor, Identity.OrganizationMember]), {scope: 'test'}],
    isUserInfoGathered: false
  });

  setup('authenticate all users', async ({users}) => {
    setup.setTimeout(60 * 1000)
    const credentials = new Map()
    credentials.set(
      Identity.SysAdmin, {
        password: getEnv("E2E_SYSADMIN_PASSWORD"),
        username: getEnv("E2E_SYSADMIN_USERNAME")
      })
    credentials.set(
      Identity.OrganizationAdmin, {
        password: getEnv("E2E_ORGANIZATION_ADMIN_PASSWORD"),
        username: getEnv("E2E_ORGANIZATION_ADMIN_USERNAME")
      })
    credentials.set(
      Identity.OrganizationEditor, {
        password: getEnv("E2E_ORGANIZATION_EDITOR_PASSWORD"),
        username: getEnv("E2E_ORGANIZATION_EDITOR_USERNAME")
      })
    credentials.set(
      Identity.OrganizationMember, {
        password: getEnv("E2E_ORGANIZATION_MEMBER_PASSWORD"),
        username: getEnv("E2E_ORGANIZATION_MEMBER_USERNAME")
      }
    )
    for (const identity of users.keys()) {
      const user = getIdentityUserOrThrow(users, identity)
      await authenticate(user, identity, credentials.get(identity).username, credentials.get(identity).password)
    }
  });
})

setup.describe('Have sysadmin to setup test users', () => {

  setup.use({
    identitiesToUse: [new Set([Identity.SysAdmin, Identity.OrganizationAdmin, Identity.OrganizationEditor, Identity.OrganizationMember]), {scope: 'test'}]
  });

  setup('Create organization for the test users', async ({users}) => {
    setup.setTimeout(60 * 1000)
    const sysAdminIdentity = Identity.SysAdmin
    const sysAdmin = getKnownUserOrThrow(users, sysAdminIdentity)
    await authenticate(sysAdmin, sysAdminIdentity, getEnv("E2E_SYSADMIN_USERNAME"), getEnv("E2E_SYSADMIN_PASSWORD"))
    const {
      pom: organizationPage,
      isRunSuccessful: isOrganizationCreated,
      error
    } = await createOrganization(sysAdmin, organization)
    if (organizationPage && (isOrganizationCreated || (error instanceof OrganizationCreationError && error.reasons.has("OrganizationAlreadyExists")))) {
      const {
        pom: editOrganizationPage,
        isRunSuccessful: isOrganizationAdminAdded,
      } = await addMemberToOrganization(sysAdmin, organization, getKnownUserOrThrow(users, Identity.OrganizationAdmin), Role.Admin, organizationPage.page)
      if (editOrganizationPage?.page === undefined) {
        throw new Error("Edit organization page is not available after adding organization admin");
      }
      const {
        pom: editOrganizationPage2,
      } = await addMemberToOrganization(sysAdmin, organization, getKnownUserOrThrow(users, Identity.OrganizationEditor), Role.Editor, editOrganizationPage.page)
      if (editOrganizationPage2?.page === undefined) {
        throw new Error("Edit organization page is not available after adding organization editor");
      }
      const {
        pom: editOrganizationPage3,
      } = await addMemberToOrganization(sysAdmin, organization, getKnownUserOrThrow(users, Identity.OrganizationMember), Role.Member, editOrganizationPage2.page)
      if (editOrganizationPage3?.page === undefined) {
        throw new Error("Edit organization page is not available after adding organization editor");
      }
      if (editOrganizationPage && isOrganizationAdminAdded) {
        await removeMemberFromOrganization(sysAdmin, organization, sysAdmin, editOrganizationPage3.page)
      }
    }

  });
})

/*setup('Create anonymous user browser state', async ({ page }) => {
  await page.goto('/');

  await page.context().storageState({ path: anonymousFile });
});*/