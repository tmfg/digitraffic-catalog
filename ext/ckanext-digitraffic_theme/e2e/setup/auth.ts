/**
 * This module is used to sign in all the test users with different roles. After signing in, the browser state
 * is saved into a cache where it can be used in later tests so that the authentication flow needs to be done
 * only once.
 */

import {expect, IdentitysOptions, test as setup} from '../fixtures/users';
import {Identity, User} from '../users/user'

/*if (fs.existsSync(organizationAdminFile)) {
  setup.use({ storageState: organizationAdminFile });
}*/

setup.use({
  identitiesToUse: [[Identity.OrganizationAdmin], {scope: 'test'}]
} as IdentitysOptions);

setup('authenticate as an organization admin', async ({ users }: {users: Map<Identity, User>}) => {
  const organizationAdmin = users.get(Identity.OrganizationAdmin)
  const page = await organizationAdmin.goToNewPage('/')

  const hideDevToolLocator = page.getByRole('link', { name: 'Hide »' })

  if (await hideDevToolLocator.isVisible()) {
    await hideDevToolLocator.click();
  }
  if (!await organizationAdmin.isUserLoggedIn()) {
    await page.getByRole('link', { name: 'Kirjaudu sisään' }).click();
    await page.locator('input[type="email"]').fill(process.env.ORGANIZATION_ADMIN_USERNAME);
    await page.getByRole('button', { name: "Next" }).click();
    // This waits until all hidden password fields are gone
    await expect(page.locator('input[type="password"][aria-hidden="true"]')).toHaveCount(0);
    await page.locator('input[type="password"]').fill(process.env.ORGANIZATION_ADMIN_PASSWORD);
    await page.getByRole('button', { name: "Sign in" }).click();
    await expect(page.getByRole('heading', { name: 'Stay signed in?' })).toBeVisible();
    await page.getByRole('button', { name: "Yes" }).click();
    await expect(page.getByRole('button', { name: 'Datakatalogi-testorganization-admin' })).toBeVisible();
    await organizationAdmin.setAuthStorageState();
  }
});

/*setup('Create anonymous user browser state', async ({ page }) => {
  await page.goto('/');

  await page.context().storageState({ path: anonymousFile });
});*/