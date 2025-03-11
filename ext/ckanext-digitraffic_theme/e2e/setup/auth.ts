/**
 * This module is used to sign in all the test users with different roles. After signing in, the browser state
 * is saved into a cache where it can be used in later tests so that the authentication flow needs to be done
 * only once. This authentication process follows the guidelines set
 * [here]{@link https://playwright.dev/docs/auth#multiple-signed-in-roles}
 */

import {expect, test as setup, getKnownUserOrThrow, getIdentityUserOrThrow} from '../fixtures/users';
import {IdentityUser} from '../users/identity-user'
import {Identity} from '../users/identity-user'
import {getVisibleLocator, getEnv, isAtUrl} from "../util";
import {organization} from "../testdata";
import {addMemberToOrganization, createOrganization, removeMemberFromOrganization} from "../user-flows/organization"
import {OrganizationCreationError, Role} from "../page-object-models";


async function authenticate(user: IdentityUser, identity: Identity, username: string, password: string): Promise<void> {
  await setup.step(`Authenticate as ${identity}`, async () => {
    const page = await user.goToNewPage('/')

    const hideDevToolLocator = page.getByRole('link', {name: 'Hide »'})
    const showDevToolLocator = page.getByRole('link', { name: '«' })

    const devToolLocator = await getVisibleLocator(hideDevToolLocator, showDevToolLocator)

    if (devToolLocator === hideDevToolLocator) {
      await hideDevToolLocator.click();
    }
    if (!await user.isUserLoggedIn()) {
      await page.getByRole('link', {name: 'Kirjaudu sisään'}).click();
      if (await isAtUrl(page, 'https://login.microsoftonline.com/**')) {
        await page.locator('input[type="email"]').fill(username);
        await page.getByRole('button', {name: "Next"}).click();
        // This waits until all hidden password fields are gone
        await expect(page.locator('input[type="password"][aria-hidden="true"]')).toHaveCount(0);
        await page.locator('input[type="password"]').fill(password);
        await page.getByRole('button', {name: "Sign in"}).click();
        await expect(page.getByRole('heading', {name: 'Stay signed in?'})).toBeVisible();
        await page.getByRole('button', {name: "Yes"}).click();
      }
      await expect(page.getByRole('button', {name: identity})).toBeVisible();
      await user.setAuthStorageState();
    }
  })
}

setup.describe('Create and log in all the test users', () => {
  setup.use({
    identitiesToUse: [new Set([Identity.SysAdmin, Identity.OrganizationAdmin, Identity.OrganizationEditor]), {scope: 'test'}],
    isUserInfoGathered: false
  });

  setup('authenticate all users', async ({users}) => {
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
    for (const identity of users.keys()) {
      const user = getIdentityUserOrThrow(users, identity)
      await authenticate(user, identity, credentials.get(identity).username, credentials.get(identity).password)
    }
  });
})

setup.describe('Have sysadmin to setup test users', () => {

  setup.use({
    identitiesToUse: [new Set([Identity.SysAdmin, Identity.OrganizationAdmin]), {scope: 'test'}]
  });

  setup('Create organization for the test users', async ({users}) => {
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
      if (editOrganizationPage && isOrganizationAdminAdded) {
        await removeMemberFromOrganization(sysAdmin, organization, sysAdmin, editOrganizationPage.page)
      }
    }

  });
})

/*setup('Create anonymous user browser state', async ({ page }) => {
  await page.goto('/');

  await page.context().storageState({ path: anonymousFile });
});*/