import {BasePage, type JSLoadedInterface} from "./base";
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

export class AddOrganizationMemberPage extends BasePage implements JSLoadedInterface<AddOrganizationMemberPage> {
  readonly organization: Organization
  readonly pageUrl: string
  readonly existingUserSelector: Locator
  readonly roleSelector: Locator
  readonly addUserButton: Locator

  constructor(page: Page, organization: Organization) {
    super(page, [page.getByRole('heading', {name: 'Lisää jäsen'})]);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.AddOrganizationMember, {'name': organization.name})
    this.existingUserSelector = page.getByRole('link', { name: 'Käyttäjänimi' })
    this.roleSelector = page.getByRole('link', { name: 'Jäsen', exact: true })
    this.addUserButton = page.getByRole('button', {name: 'Lisää jäsen'})
  }
  async goto(): Promise<AddOrganizationMemberPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

    async ensurePageJsLoaded<AddOrganizationMemberPage>(): Promise<AddOrganizationMemberPage> {
        await this.page.waitForLoadState('networkidle');
        return this as unknown as AddOrganizationMemberPage;
    }

  async selectExistingUser(user: KnownUser): Promise<void> {
    const userName = user.getUserAttribute("name")
    await this.existingUserSelector.click()
    await this.page.locator('#s2id_autogen1_search').fill(userName)
    await this.page.getByRole('option', { name: userName }).click()
  }

  async selectRole(role: Role):Promise<void> {
    await this.roleSelector.click()
    await this.page.locator('#s2id_autogen2_search').fill(role)
    await this.page.getByRole('option', { name: role }).click()
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