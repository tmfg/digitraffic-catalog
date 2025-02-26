import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {Organization} from "../models/organization";
import {AuthorizationError} from "../models/error";
import {User} from "../users/user";
import {isVisible} from "../util";

export enum Role {
  Admin = 'Ylläpitäjä - Admin',
  Editor = 'Muokkaaja - Editor',
  Member = 'Jäsen'
}

export class AddOrganizationMemberPage extends BasePage {
  readonly organization: Organization
  readonly pageUrl: string
  readonly addUserHeader: Locator
  readonly existingUserSelector: Locator
  readonly roleSelector: Locator
  readonly addUserButton: Locator

  constructor(page: Page, organization: Organization) {
    super(page);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.AddOrganizationMember, {'name': organization.name})
    this.addUserHeader = page.getByRole('heading', {name: 'Lisää jäsen'})
    this.existingUserSelector = page.getByLabel('Olemassa oleva käyttäjä')
    this.roleSelector = page.getByLabel('Rooli')
    this.addUserButton = page.getByRole('button', {name: 'Lisää jäsen'})
  }
  async goto(): Promise<AddOrganizationMemberPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async isAtPage(): Promise<boolean> {
    return await isVisible(this.addUserHeader)
  }

  async selectExistingUser(user: User): Promise<void> {
    await this.existingUserSelector.fill(user.userInfo.name)
  }

  async selectRole(role: Role):Promise<void> {
    await this.roleSelector.selectOption(role)
  }

  async pressAdd(): Promise<BasePage> {
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

  async addUserToOrganization(user: User, role: Role):Promise<BasePage> {
    await this.selectExistingUser(user)
    await this.selectRole(role)
    return await this.pressAdd()
  }
}

setPom(URL.AddOrganizationMember, AddOrganizationMemberPage)