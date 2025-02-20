import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";

export class OrganizationPage extends BasePage {
  readonly organizationPageIntroductionHeader: Locator
  constructor(page: Page) {
    super(page);
    this.organizationPageIntroductionHeader = page.getByRole('heading', {name: 'Mitä organisaatiot ovat?'})
  }
  async goto(): Promise<OrganizationPage> {
    await this.page.goto(URL.Organization);
    return this;
  }

  async assertPage(): Promise<void> {
    await expect(this.organizationPageIntroductionHeader).toBeVisible()
  }
}

setPom(URL.Organization, OrganizationPage)