import type {Browser, BrowserContext, Page} from "@playwright/test";
import {expect} from "@playwright/test";
import {existsSync} from 'fs'
import {getEnv, isVisible, isAtUrl} from "../util";
import {User} from "./user";

/**
 * Identity represents a known user identity. Each member of this enum must have a corresponding test account created
 * in Azure AD so that it can be used to sign in to Datacatalog.
 *
 * @enum {number}
 */
export enum Identity {
  OrganizationMember = 'Datakatalogi-testorganization-member',
  OrganizationEditor = 'Datakatalogi-testorganization-editor',
  OrganizationAdmin = 'Datakatalogi-testorganization-admin',
  SysAdmin = 'Datakatalogi-testsystem-admin',
  Anonymous = 'Anonymous'
}

/**
 * IdentityUser object is used to take up an [identity]{@Identity} and to provide methods to manage the authentication
 * state of the user
 */
export class IdentityUser extends User {
  readonly identity: Identity;

  /**
   * The constructor is made protected as we want to create the IdentityUser objects through {@link IdentityUser.of}
   * static method. This is because we want to call some asynchronous code when initializing an IdentityUser.
   * @param {BrowserContext} browserContext - @see {@link User}
   * @param {Identity} identity - Identity of the user. @see {@link Identity}
   * @protected
   */
  protected constructor(browserContext: BrowserContext, identity: Identity) {
    super(browserContext)
    this.identity = identity;
  }

  /**
   * Creates an {@link IdentityUser} which has the given {@link Identity}. Note that the identities are meant to represent some
   * known test user. Therefore, the user objects are also representing this identity. However, when creating a user
   * object with some identity, a new [browser context]{@link https://playwright.dev/docs/api/class-browsercontext}
   * is always created. This means that if you create two user objects with the same {@link Identity}, you'll end up
   * having two objects that have their own browser state but the state is initialized with the same authentication
   * state. With this in mind, when running tests, the server state might be different each time depending on the order
   * in which tests are run. Say, you first run a test that creates a private dataset with some identity. Now, all
   * the subsequent tests with the same user will have access to this dataset if it was not deleted at the end of
   * the first test. And if you run the tests in parallel, then you might, or you might not, have this extra dataset
   * visible even if it was deleted at the end of the first test.
   *
   * We do not support a case where a new user is created. This would require that it is possible to dynamically
   * create a user at Azure AD with all the correct settings for a test user.
   *
   * @param {Identity} identity – The identity to use with the user
   * @param {Browser} browser – Browser to use to create the browser context
   * @see {@link Identity}
   */
  static async of(identity: Identity, browser: Browser): Promise<IdentityUser> {
    const storagePath = IdentityUser.getIdentityStorageStatePath(identity)
    const cachedAuthStateExists = existsSync(storagePath)
    const context = await browser.newContext(cachedAuthStateExists ? {storageState: storagePath} : {})
    return new IdentityUser(context, identity)
  }

  /**
   * This method is meant for child classes. A child class will want to call the {@link of} static factory
   * method in order to have a properly set browser context. However, calling the factory method will create a new
   * IdentityUser object which state the child class will want to use. This method will provide the needed state.
   * @param authenticatedUser
   * @protected
   */
  protected static paramsForSuper(authenticatedUser: IdentityUser):[BrowserContext, Identity] {
    return [authenticatedUser.browserContext, authenticatedUser.identity]
  }

  /**
   * Sets the current browser state as the authentication state for the user identity.
   *
   * @see {@link Identity}
   */
  async setAuthStorageState(): Promise<void> {
    if (await this.isUserLoggedIn()) {
      await this.cacheUserAuthState(this.identity)
    } else {
      throw new Error("Cannot set the authentication state as the user is not logged in")
    }
  }

  async authenticateUser(page: Page, username: string, password: string): Promise<void> {
    await page.getByRole('link', {name: 'Kirjaudu sisään'}).first().click();
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
    await expect(page.getByRole('button', {name: this.identity})).toBeVisible();
    await this.setAuthStorageState();
  }

  async isUserLoggedIn() {
    const page = this.getDatacatalogPage()
    if (page) {
      return await IdentityUser._isUserLoggedIn(page, this.identity)
    }
    return false
  }

  private static async _isUserLoggedIn(page: Page, identity: Identity): Promise<boolean> {
    const userActionsLocator = page.locator('header .account button', {hasText: identity})
    return await isVisible(userActionsLocator)
  }

  private getDatacatalogPage(): Page | undefined {
    for (let [_, page] of this.pages) {
      if (page.url().startsWith(getEnv("TEST_SITE_URL"))) {
        return page
      }
    }
    return
  }

  /**
   * This is used to get the cache location of user's authentication state.
   * @param {Identity} identity – identity whose cache location is returned
   * @param {string} browserName – Name of the browser.
   * @private
   */
  private static getIdentityStorageStatePath(identity: Identity): string {
    switch (identity) {
      case Identity.Anonymous:
        return `playwright/.auth/anonymous.json`
      case Identity.OrganizationMember:
        return `playwright/.auth/organization-member.json`
      case Identity.OrganizationEditor:
        return `playwright/.auth/organization-editor.json`
      case Identity.OrganizationAdmin:
        return `playwright/.auth/organization-admin.json`
      case Identity.SysAdmin:
        return `playwright/.auth/system-admin.json`
    }
  }

  /**
   * The state is saved into a local filesystem so that it can be used across multiple tests without needing
   * to re-authenticate each time.
   * @param identity
   * @private
   */
  private async cacheUserAuthState(identity: Identity) {
    await this.browserContext.storageState({path: IdentityUser.getIdentityStorageStatePath(identity)})
  }
}
