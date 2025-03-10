/**
 * This module defines the constructs that can be used in E2E-tests to take up some known [identity]{@link Identity} as
 * a {@link User}
 */
import type {BrowserContext, Page} from "@playwright/test";
import {HomePage, OrganizationPage, OrganizationsListPage} from "../page-object-models";
import {URL} from "../page-object-models/pages-controller";
import {gotoNewPage} from "../page-object-models/util";
import {Organization} from "../models/organization";

/**
 * User object is used to take up an [identity]{@Identity} and to provide some useful methods for the user to perform
 * with a browser.
 */
export class User {
  protected pages: Map<string, Page>;
  protected browserContext: BrowserContext;

  /**
   * The constructor is made private as we want to create the User objects through {@link User.of} static method. This is
   * because we want to call some asynchronous code when initializing a User.
   * @param browserContext
   * @protected
   */
  constructor(browserContext: BrowserContext) {
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

  async removePage(name: string): Promise<void> {
    if (this.pages.has(name)) {
      await this.getPage(name)?.close()
      this.pages.delete(name)
    }
  }

  async exit(): Promise<void> {
    for (const name in this.pages) {
      await this.removePage(name)
    }
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
}

export class UserStateError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'UserStateError'
  }
}
