import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {Organization} from "../models/organization";
import {gotoNewPage} from "./util";

export class NewOrganizationPage extends BasePage {
  readonly newOrganizationPageHeader: Locator
  readonly nameField: Locator
  readonly descriptionField: Locator
  readonly urlField: Locator
  readonly createNewOrganizationButton: Locator
  constructor(page: Page) {
    super(page);
    this.newOrganizationPageHeader = page.getByRole('heading', {name: 'Luo uusi organisaatio'})
    this.nameField = page.getByLabel('Nimi')
    this.urlField = page.getByRole('textbox', {name: '* URL:'})
    this.descriptionField = page.getByLabel('Kuvaus')
    this.createNewOrganizationButton = page.getByRole('button', {name: 'Luo uusi organisaatio'})
  }
  async goto(): Promise<NewOrganizationPage> {
    await this.page.goto(URL.NewOrganization);
    return this;
  }

  async assertPage(): Promise<void> {
    await expect(this.newOrganizationPageHeader).toBeVisible()
  }

  private urlify(text: string) {
    return text.trim().toLowerCase().replaceAll(' ', '-')
  }

  async fillForm(organization: Organization): Promise<void> {
    await this.nameField.fill(organization.name)
    await this.urlField.fill(this.urlify(organization.name))
    if (organization.description) {
      await this.descriptionField.fill(organization.description)
    }
  }

  async createOrganization(organization: Organization): Promise<BasePage> {
    await this.fillForm(organization)
    return await gotoNewPage(
      this.page,
      URL.Organization,
      async () => await this.createNewOrganizationButton.click(),
      organization
      )
  }
}

setPom(URL.NewOrganization, NewOrganizationPage)