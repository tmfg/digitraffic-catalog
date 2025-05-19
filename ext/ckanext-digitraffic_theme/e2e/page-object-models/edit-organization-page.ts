import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {Organization} from "../models/organization";
import {AuthorizationError} from "../models/error";
import {isVisible} from "../util";

export class EditOrganizationPage extends BasePage {
  readonly pageUrl: string
  readonly organization: Organization
  readonly organizationPageDescriptionText: Locator
  readonly editorNavigationTabs: Locator
  readonly editorMainContent: Locator
  readonly addMemberButton: Locator
  constructor(page: Page, organization: Organization) {
    super(page, [page.getByRole('heading', {name: organization.name})]);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.EditOrganization, {'name': organization.name})
    this.organizationPageDescriptionText = page.getByText(organization.description)
    this.editorNavigationTabs = this.mainContent.locator('header .nav')
    this.editorMainContent = this.mainContent.getByRole('article').locator('.module-content')
    this.addMemberButton = this.editorMainContent.getByRole('link', {name: 'Lisää jäsen'})
  }
  async goto(): Promise<EditOrganizationPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async selectMembersTab(): Promise<void> {
    await this.editorNavigationTabs.getByRole('link', {name: 'Jäsenet'}).click()
  }

  async gotoAddMemberPage(): Promise<BasePage> {
    await this.selectMembersTab()
    return await gotoNewPage(
      this.page,
      URL.AddOrganizationMember,
      async () => await this.addMemberButton
        .click()
        .catch(err => {
          console.log(err)
          throw new AuthorizationError("Is not allowed to add a member to an organization")
        }),
      this.organization
    )
  }

  async removeMember(name: string): Promise<void> {
    if (name === undefined) {
      throw Error("Name of the member to be removed must be provided")
    }
    await this.selectMembersTab()
    // This is here so that JavaScript is loaded. If JavaScript is not loaded then a confirmation modal is not shown
    // and when clicking the delete button, navigation to a new page happens.
    await this.page.waitForLoadState("networkidle")
    const userRow = this.page.getByRole('row')
      .filter({has: this.page.locator(`a[href~="${pathParameterURL(URL.User, {name})}"]`)})
    if (await isVisible(userRow)) {
      await userRow
        .locator('a[title="Poista"]')
        .click()
      await this.page.getByRole('button', {name: "Confirm"}).click()
    }
  }
}

setPom(URL.EditOrganization, EditOrganizationPage)