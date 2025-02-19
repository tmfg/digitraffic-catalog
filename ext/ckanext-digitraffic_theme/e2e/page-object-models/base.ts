import { Page } from '@playwright/test'

/**
 * The is the base model that contains relevant methods for the header and footer sections of the Datacatalog page
 */
export abstract class BasePage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }
  abstract async goto()

  async gotoOrganizationPage(){
    if (this.isWideScreen()) {

    } else {

    }
  }

  isWideScreen() {
    return !this.page.locator('[data-lucide="menu"]').isVisible()
  }
}