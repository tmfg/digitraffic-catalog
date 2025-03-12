import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {Organization} from "../models/organization";
import {AuthorizationError} from "../models/error";
import type {EditOrganizationPage} from "./edit-organization-page";
import {KnownUser} from "../users/known-user";

export enum Role {
  Admin = 'Ylläpitäjä',
  Editor = 'Muokkaaja - Editor',
  Member = 'Jäsen'
}

export class AddOrganizationMemberPage extends BasePage {
  readonly organization: Organization
  readonly pageUrl: string
  readonly existingUserSelector: Locator
  readonly roleSelector: Locator
  readonly addUserButton: Locator

  constructor(page: Page, organization: Organization) {
    super(page, [page.getByRole('heading', {name: 'Lisää jäsen'})]);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.AddOrganizationMember, {'name': organization.name})
    this.existingUserSelector = page.getByLabel('Olemassa oleva käyttäjä')
    this.roleSelector = page.getByLabel('Rooli')
    this.addUserButton = page.getByRole('button', {name: 'Lisää jäsen'})
  }
  async goto(): Promise<AddOrganizationMemberPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async selectExistingUser(user: KnownUser): Promise<void> {
    await this.existingUserSelector.fill(user.getUserAttribute("name"))
  }

  async selectRole(role: Role):Promise<void> {
    await this.roleSelector.selectOption(role)
  }

  async pressAdd(): Promise<EditOrganizationPage> {
    return await gotoNewPage(
      this.page,
      URL.EditOrganization,
      async () => await this.addUserButton
        .click()
        .catch(err => {
          console.log(err)
          throw new AuthorizationError("Is not allowed to add a member to an organization")
        }),
      this.organization
    )
  }

  async addUserToOrganization(user: KnownUser, role: Role):Promise<BasePage> {
    await this.selectExistingUser(user)
    await this.selectRole(role)
    return await this.pressAdd()
  }
}

setPom(URL.AddOrganizationMember, AddOrganizationMemberPage)