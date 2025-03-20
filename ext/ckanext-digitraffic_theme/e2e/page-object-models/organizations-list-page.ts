import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage} from "./util";
import {AuthorizationError} from "../models/error";
import {isVisible} from "../util";
import  {NewOrganizationPage} from "./new-organization-page";

export class OrganizationsListPage extends BasePage {
  readonly newOrganizationButton: Locator
  readonly listMainContent: Locator
  readonly organizationsList: Locator
  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Mitä organisaatiot ovat?'})]);
    this.newOrganizationButton = page.getByRole('link', {name: 'Lisää organisaatio'})
    this.listMainContent = this.mainContent.getByRole('article')
    this.organizationsList = this.listMainContent.locator('ul.media-grid')
  }
  async goto(): Promise<OrganizationsListPage> {
    await this.page.goto(URL.OrganizationsList);
    return this;
  }

  async gotoNewOrganizationPage(): Promise<NewOrganizationPage> {
    return await gotoNewPage(
      this.page,
      URL.NewOrganization,
      async () => await this.newOrganizationButton
        .click()
        .catch(_ => {
          throw new AuthorizationError("Is not allowed to create a new organization")
        })
    )
  }

  async isOrganizationCreated(organizationName: string): Promise<boolean> {
    if (await isVisible(this.organizationsList)) {
      return await isVisible(this.organizationsList.getByRole('heading', {name: organizationName}))
    }
    return false
  }
}

setPom(URL.OrganizationsList, OrganizationsListPage)