/**
 * This module is used to sign in all the test users with different roles. After signing in, the browser state
 * is saved into a cache where it can be used in later tests so that the authentication flow needs to be done
 * only once. This authentication process follows the guidelines set
 * [here]{@link https://playwright.dev/docs/auth#multiple-signed-in-roles}
 */

import {expect, IdentitysOptions, test as setup} from '../fixtures/users';
import {Identity, User} from '../users/user'
import {isAtUrl, isVisible} from "../util";
import {organization} from "../testdata";
import {addMemberToOrganization, createOrganization, removeMemberFromOrganization} from "../user-flows/organization"
import {Role} from "../page-object-models/add-organization-member-page";
import {OrganizationCreationError, OrganizationStateError} from "../page-object-models";


async function authenticate(user: User, identity: Identity, username: string, password: string): Promise<void> {
  const page = await user.goToNewPage('/')

  const hideDevToolLocator = page.getByRole('link', {name: 'Hide »'})

  if (await isVisible(hideDevToolLocator)) {
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
}

setup.describe('Create and log in all the test users', () => {
  setup.use({
    identitiesToUse: [[Identity.OrganizationAdmin, Identity.OrganizationEditor], {scope: 'test'}],
    isUserInfoGathered: false
  } as IdentitysOptions);

  setup('authenticate as an organization admin', async ({users}: { users: Map<Identity, User> }) => {
    const credentials = new Map()
    credentials.set(
      Identity.OrganizationAdmin, {
        password: process.env.ORGANIZATION_ADMIN_PASSWORD,
        username: process.env.ORGANIZATION_ADMIN_USERNAME
      })
    credentials.set(
      Identity.OrganizationEditor, {
        password: process.env.ORGANIZATION_EDITOR_PASSWORD,
        username: process.env.ORGANIZATION_EDITOR_USERNAME
      })
    for (const [identity, user] of users) {
      await authenticate(user, identity, credentials.get(identity).username, credentials.get(identity).password)
    }
  });
})

setup.describe('Have sysadmin to setup test users', () => {

  setup.use({
    identitiesToUse: [[Identity.SysAdmin, Identity.OrganizationAdmin], {scope: 'test'}]
  } as IdentitysOptions);

  setup('Create organization for the test users', async ({users}: { users: Map<Identity, User> }) => {
    const sysAdminIdentity = Identity.SysAdmin
    const sysAdmin = users.get(sysAdminIdentity)
    const organizationMembers = [Identity.OrganizationAdmin, Identity.OrganizationEditor]
    await authenticate(sysAdmin, sysAdminIdentity, process.env.SYSADMIN_USERNAME, process.env.SYSADMIN_PASSWORD)
    const { pom: organizationPage, isRunSuccessful: isOrganizationCreated, error} = await createOrganization(sysAdmin, organization)
    if (isOrganizationCreated || (error instanceof OrganizationCreationError && error.reasons.has("OrganizationAlreadyExists"))) {
      const { pom: editOrganizationPage, isRunSuccessful: isOrganizationAdminAdded, error: organizationAdminCreatedError} = await addMemberToOrganization(sysAdmin, organization, users.get(Identity.OrganizationAdmin), Role.Admin, organizationPage.page)
      if (isOrganizationAdminAdded) {
        await removeMemberFromOrganization(sysAdmin, organization, sysAdmin, editOrganizationPage.page)
      }
    }

  });
})

/*setup('Create anonymous user browser state', async ({ page }) => {
  await page.goto('/');

  await page.context().storageState({ path: anonymousFile });
});*/