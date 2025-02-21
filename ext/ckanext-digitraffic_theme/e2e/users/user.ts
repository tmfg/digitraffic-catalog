/**
 * This module defines the constructs that can be used in E2E-tests to take up some known [identity]{@link Identity} as
 * a {@link User}
 */
import {Browser, BrowserContext, Page} from "@playwright/test";
import {HomePage, OrganizationsListPage} from "../page-object-models";
import {getPom, URL} from "../page-object-models/pages-controller";
import {gotoNewPage} from "../page-object-models/util";
import {existsSync} from 'fs'
import {isVisible} from "../util";

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
  SysAdmin = 'Datakatalogi-test-admin',
  Anonymous = 'Anonymous'
}

/**
 * User object is used to take up an [identity]{@Identity} and to provide some useful methods for the user to perform
 * with a browser.
 */
export class User {
  private identity: Identity;
  private pages: Map<string, Page>;
  private browserContext: BrowserContext;

  /**
   * The constructor is made private as we want to create the User objects through {@link User.of} static method. This is
   * because we want to call some asynchronous code when initializing a User.
   * @param identity
   * @param browserContext
   * @private
   */
  private constructor(identity: Identity, browserContext: BrowserContext) {
    this.identity = identity;
    this.pages = new Map();
    this.browserContext = browserContext
  }

  /**
   * Creates a {@link User} which has the given {@link Identity}. Note that the identities are meant to represent some
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
   * We do not support a case where new users are created. This would require that it would be possible to dynamically
   * create a user at Azure AD with all the correct settings for a test user.
   *
   * The idea of this object is that the User object would own the {@link BrowserContext} it uses and all the actions
   * done with the said context would go via this object. Like opening a new page or saving the authentication state
   * into a cache. Of course, the browser context is owned by the browser object that is given as
   * an argument to this factory method and the context is modified by the actions taken inside the browser. However,
   * one should not use the context outside the user object methods even though it is possible to do so.
   * This way we can ensure that the browser state is consistent with the intended {@link Identity}.
   *
   * @param {Identity} identity – The identity to use with the user
   * @param {Browser} browser – Browser to use to create the browser context
   * @see {@link Identity}
   */
  static async of(identity: Identity, browser: Browser): Promise<User> {
    const storagePath = User.getIdentityStorageStatePath(identity)
    const cachedAuthStateExists = existsSync(storagePath)
    const context = await browser.newContext(cachedAuthStateExists ? {storageState: storagePath} : {})
    return new User(identity, context)
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

  async isUserLoggedIn() {
    const page = this.getDatacatalogPage()
    const userActionsLocator = page.locator('header .account button', {hasText: this.identity})
    return await isVisible(userActionsLocator)
  }

  private getDatacatalogPage(): Page {
    for (let [pageName, page] of this.pages) {
      if (page.url().startsWith(process.env.TEST_SITE_URL)) {
        return page
      }
    }
  }

  getPage(name: string) {
    return this.pages.get(name)
  };

  async createNewPage(name: string) {
    this.checkPageExists(name)
    const newPage = await this.browserContext.newPage();
    this.pages.set(name, newPage)
    return newPage
  }

  async goToNewPage(url: string, options = undefined) {
    const name = options?.name ?? url
    this.checkPageExists(name)
    const newPage = await this.createNewPage(name)
    await newPage.goto(url);
    return newPage
  }

  pageWithNameExists(name: string) {
    return this.pages.has(name);
  }

  checkPageExists(name: string) {
    if (this.pageWithNameExists(name)) {
      throw Error(`A page with given name (${name}) already exists. Please provide a new name.`)
    }
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
    await this.browserContext.storageState({path: User.getIdentityStorageStatePath(identity)})
  }

  async goToHomePage(page: Page):Promise<HomePage> {
    return gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {await homePagePOM.goto()}
    )
  }

  async goToOrganizationsListPage(page: Page):Promise<OrganizationsListPage> {
    return gotoNewPage(
      page,
      URL.OrganizationsList,
      async (organizationsListPOM: OrganizationsListPage) => {await organizationsListPOM.goto()}
    )
  }
}
