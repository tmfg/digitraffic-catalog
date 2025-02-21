import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {Organization} from "../models/organization";

export class OrganizationPage extends BasePage {
  readonly organization: Organization
  readonly pageUrl: string
  readonly organizationPageNameHeader: Locator
  readonly organizationPageDescriptionText: Locator
  constructor(page: Page, organization: Organization) {
    super(page);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.Organization, {'name': organization.name})
    this.organizationPageNameHeader = page.getByRole('heading', {name: organization.name})
    this.organizationPageDescriptionText = page.getByText(organization.description)
  }
  async goto(): Promise<OrganizationPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async assertPage(): Promise<void> {
    await expect(this.organizationPageNameHeader).toBeVisible()
    await expect(this.organizationPageDescriptionText).toBeVisible()
  }
}

setPom(URL.Organization, OrganizationPage)