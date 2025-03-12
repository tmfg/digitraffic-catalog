import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL, urlify} from "./util";
import {Organization} from "../models/organization";
import {AuthorizationError} from "../models/error";

export class OrganizationPage extends BasePage {
  readonly organization: Organization
  readonly pageUrl: string
  readonly organizationPageDescriptionText: Locator
  readonly editOrganizationButton: Locator
  constructor(page: Page, organization: Organization) {
    super(page, [page.getByRole('heading', {name: organization.name})]);
    this.organization = organization
    this.pageUrl = urlify(pathParameterURL(URL.Organization, {'name': organization.name}))
    this.organizationPageDescriptionText = page.getByText(organization.description)
    this.editOrganizationButton = page.getByRole('link', {name: 'Hallinnoi'})
  }
  async goto(): Promise<OrganizationPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async gotoEditOrganizationPage(): Promise<BasePage> {
    return await gotoNewPage(
      this.page,
      URL.EditOrganization,
      async () => await this.editOrganizationButton
        .click()
        .catch(err => {
          console.log(err)
          throw new AuthorizationError("Is not allowed to edit the organization")
        }),
      this.organization
    )
  }
}

setPom(URL.Organization, OrganizationPage)