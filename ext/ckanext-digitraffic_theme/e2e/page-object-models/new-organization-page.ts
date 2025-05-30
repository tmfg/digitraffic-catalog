import {BasePage, type JSLoadedInterface} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {Organization} from "../models/organization";
import {gotoNewPage} from "./util";
import {isVisible} from "../util";

export class NewOrganizationPage extends BasePage implements JSLoadedInterface<NewOrganizationPage> {
  readonly nameField: Locator
  readonly descriptionField: Locator
  readonly urlField: Locator
  readonly createNewOrganizationButton: Locator
  readonly errorMessage: Locator
  readonly errorReasons: Locator
  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Luo uusi organisaatio'})]);
    this.nameField = page.getByLabel('Nimi')
    this.urlField = page.getByRole('textbox', {name: '* URL:'})
    this.descriptionField = page.getByLabel('Kuvaus')
    this.createNewOrganizationButton = page.getByRole('button', {name: 'Luo uusi organisaatio'})
    this.errorMessage = page.getByText("Lomake sisältää virheellisiä syötteitä")
    this.errorReasons = page.locator(".error-explanation ul")
  }
  async goto(): Promise<NewOrganizationPage> {
    await this.page.goto(URL.NewOrganization);
    return this;
  }

  async ensurePageJsLoaded<NewOrganizationPage>(): Promise<NewOrganizationPage> {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('button', { name: 'Edit' });
    return this as unknown as NewOrganizationPage;
  }

  async fillForm(organization: Organization): Promise<void> {
    await this.nameField.fill(organization.name)
    if (organization.description) {
      await this.descriptionField.fill(organization.description)
    }
  }

  async createOrganization(organization: Organization): Promise<BasePage> {
    await this.fillForm(organization)
    return await gotoNewPage(
      this.page,
      URL.Organization,
      async (organizationPOM) => {
        await this.createNewOrganizationButton.click()
        const creationFailedConditions = Promise.all([
          organizationPOM.isAtPage().then(isAtPage => !isAtPage),
          isVisible(this.isAtPageLocators[0]),
          isVisible(this.errorMessage)
        ])
        const isCreationUnsuccessful = await creationFailedConditions.then(results => {
          return results.every(predicateResult => predicateResult)
        })
        if (isCreationUnsuccessful) {
          const isOrganizationCreatedAlready = await isVisible(this.errorReasons.getByText('Ryhmän nimi löytyy jo tietokannasta'))
          console.log(`isOrganizationCreatedAlready: ${isOrganizationCreatedAlready}`)
          const reasons = new Set<ErrorReasons>()
          if (isOrganizationCreatedAlready) {
            reasons.add("OrganizationAlreadyExists")
          }
          throw new OrganizationCreationError("Creating new organization failed", reasons)
        }
      },
      organization
      )
  }
}

export class OrganizationStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrganizationStateError'
  }
}

export type ErrorReasons = "OrganizationAlreadyExists"

export class OrganizationCreationError extends OrganizationStateError {
  readonly reasons: Set<ErrorReasons>
  constructor(message: string, reasons: Set<ErrorReasons>) {
    super(message);
    this.name = 'OrganizationCreateError'
    this.reasons = reasons
  }
}

setPom(URL.NewOrganization, NewOrganizationPage)