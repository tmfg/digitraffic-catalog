import type {BrowserContext, Page, Browser} from "@playwright/test";
import {EditUserPage, HomePage, NewDatasetPage, OrganizationPage, OrganizationsListPage} from "../page-object-models";
import {URL} from "../page-object-models/pages-controller";
import {gotoNewPage} from "../page-object-models/util";
import {Organization} from "../models/organization";

/**
 * User class provides basic features for page handling and navigation for a user.
 * This class is meant to be extended by other classes.
 */
export abstract class User {
  protected pages: Map<string, Page>;
  protected browserContext: BrowserContext;

  /**
   * Each user should have their own [browser context]{@link https://playwright.dev/docs/api/class-browsercontext}.
   * The idea is that the user object would own the {@link BrowserContext} it uses and all the actions
   * done with the said context would go via this object. Like opening a new page or saving the authentication state
   * into a cache. Of course, the browser context is owned by the [browser object]{@link Browser} that is used
   * to create the context and the context is modified by the actions taken inside the browser. However,
   * one should not use the context outside the user object methods even though it is possible to do so.
   * This way we can ensure that the browser state is consistent with the user.
   *
   * @param {BrowserContext} browserContext - Playwright browser context
   * @protected
   */
  protected constructor(browserContext: BrowserContext) {
    this.pages = new Map();
    this.browserContext = browserContext
  }

  getPage(name: string) {
    return this.pages.get(name)
  };

  async createNewPage(name: string): Promise<Page> {
    this.checkPageExists(name)
    const newPage = await this.browserContext.newPage();
    this.pages.set(name, newPage)
    return newPage
  }

  /**
   * Closes the named page and removes the page from the memory
   *
   * @param {string} name - Name of the page to be removed
   */
  async removePage(name: string): Promise<void> {
    if (this.pages.has(name)) {
      await this.getPage(name)?.close()
      this.pages.delete(name)
    }
  }

  /**
   * Removes all the pages. @see {@link removePage}
   */
  async removeAllPages(): Promise<void> {
    for (const name in this.pages) {
      await this.removePage(name)
    }
  }

  /**
   * Removes all pages (@see {@link removePage}) and closes the browser context.
   */
  async exit(): Promise<void> {
    await this.removeAllPages()
    await this.browserContext.close()
  }

  async goToNewPage(url: string, options?: {name?: string}) {
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

  async gotoHomePage(page?: Page):Promise<HomePage> {
    if (page === undefined) {
      page = await this.createNewPage("gotoHomePage")
    }
    return await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {await homePagePOM.goto()}
    )
  }

  async gotoOrganizationsListPage(page?: Page):Promise<OrganizationsListPage> {
    if (page === undefined) {
      page = await this.createNewPage("gotoOrganizationsListPage")
    }
    return await gotoNewPage(
      page,
      URL.OrganizationsList,
      async (organizationsListPOM: OrganizationsListPage) => {await organizationsListPOM.goto()}
    )
  }

  async gotoEditUserPage(name: string, page?: Page): Promise<EditUserPage> {
    if (page === undefined) {
      page = await this.createNewPage("gotoEditUserPage")
    }
    return await gotoNewPage(
      page,
      URL.EditUser,
      async (editUserPOM: EditUserPage) => {await editUserPOM.goto()},
      name
    )
  }

  async gotoOrganizationPage(organization: Organization, page?: Page):Promise<OrganizationPage> {
    if (page === undefined) {
      page = await this.createNewPage("gotoOrganizationPage")
    }
    return await gotoNewPage(
      page,
      URL.Organization,
      async (organizationPOM: OrganizationPage) => {await organizationPOM.goto()},
      organization
    )
  }

  async gotoNewDatasetPage(page?: Page): Promise<NewDatasetPage> {
    if (page === undefined) {
      page = await this.createNewPage("gotoNewDatasetPage")
    }
    return await gotoNewPage(
      page,
      URL.NewDataset,
      async (newDatasetPOM: NewDatasetPage) => {await newDatasetPOM.goto()}
    )
  }
}

export class UserStateError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'UserStateError'
  }
}