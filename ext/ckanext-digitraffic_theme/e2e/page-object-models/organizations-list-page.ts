import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage} from "./util";

export class OrganizationsListPage extends BasePage {
  readonly organizationsListPageIntroductionHeader: Locator
  readonly newOrganizationButton: Locator
  constructor(page: Page) {
    super(page);
    this.organizationsListPageIntroductionHeader = page.getByRole('heading', {name: 'Mitä organisaatiot ovat?'})
    this.newOrganizationButton = page.getByRole('link', {name: 'Lisää organisaatio'})
  }
  async goto(): Promise<OrganizationsListPage> {
    await this.page.goto(URL.OrganizationsList);
    return this;
  }

  async gotoNewOrganizationPage(): Promise<BasePage> {
    /*const newOrganizationPageConstructor = getPom(URL.NewOrganization)
    const newOrganizationPOM = new newOrganizationPageConstructor(this.page) as BasePage

    await this.newOrganizationButton.click()
    await newOrganizationPOM.assertPage()*/

    return await gotoNewPage(
      this.page,
      URL.NewOrganization,
      async () => await this.newOrganizationButton.click()
    )

    //return newOrganizationPOM
  }

  async assertPage(): Promise<void> {
    await expect(this.organizationsListPageIntroductionHeader).toBeVisible()
  }
}

setPom(URL.OrganizationsList, OrganizationsListPage)