import {expect, Locator, Page} from '@playwright/test'
import { getPom, URL } from './pages-controller'
import { isVisible } from '../util'

/**
 * This is the base page object model that contains relevant methods for the header and footer sections of
 * the Data catalog page
 */
export abstract class BasePage {
  readonly page: Page
  readonly header: Locator
  readonly accountNavigation: Locator
  readonly appNavigation: Locator
  readonly appNavigationHamburger: Locator
  readonly organizationsNavigatior: Locator
  readonly userProfileNavigator: Locator
  readonly mainContent: Locator

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('header')
    this.appNavigation = this.header.locator('nav#app-navigation')
    this.accountNavigation = this.header.locator('nav.account')
    this.appNavigationHamburger = page.locator('[data-lucide="menu"]')
    this.organizationsNavigatior = this.appNavigation.getByRole('link', {name: "Organisaatiot"})
    this.userProfileNavigator = this.accountNavigation.getByRole('link', {name: "Profile"})
    this.mainContent = page.locator('body > .main')
  }

  /**
   * This function is used to navigate this.page to the page that this POM represents
   */
  abstract async goto(): Promise<BasePage>

  /**
   * This function is used to assert that this.page is at the page that this POM represents and the page is fully loaded
   */
  async assertPage(): Promise<void> {
    expect(await this.isAtPage()).toBeTruthy()
  }

  abstract async isAtPage(): Promise<boolean>

  async gotoOrganizationsListPage(): Promise<BasePage> {
    const organizationPageConstructor = getPom(URL.OrganizationsList)
    const organizationPOM = new organizationPageConstructor(this.page) as BasePage

    if (!await this.isWideScreen()) {
      await this.makeAppNavigationOpen();
    }
    await this.organizationsNavigatior.click()
    await organizationPOM.assertPage()
    return organizationPOM
  }

  async gotoUserProfilePage(): Promise<BasePage> {
    const userProfilePageConstructor = getPom(URL.User)
    const userProfilePOM = new userProfilePageConstructor(this.page) as BasePage

    if (!await this.isWideScreen()) {
      await this.makeAppNavigationOpen();
    } else {
      await this.makeAccountNavigationOpen();
    }
    await this.userProfileNavigator.click()
    await userProfilePOM.assertPage()
    return userProfilePOM
  }

  async makeAppNavigationOpen(): Promise<void> {
    if (await this.isAppNavigationHamburgerOpen()) {
      await this.switchAppNavigationHamburger()
    }
  }

  async makeAccountNavigationOpen(): Promise<void> {
    console.log('makeAccountNavigationOpen')
    if (!await this.isAccountNavigationOpen()) {
      await this.switchAccountNavigation()
    }
  }

  private async switchAppNavigationHamburger(): Promise<void> {
    if (await this.isWideScreen()) {
      throw new AppNavigationViewportStateError('wide','Cannot interact with app navigation hamburger when wide screen is in use')
    }
    await this.appNavigationHamburger.click()
  }

  private async switchAccountNavigation(): Promise<void> {
    if (!await this.isWideScreen()) {
      throw new AppNavigationViewportStateError('narrow','Cannot interact with account navigation when narrow screen is in use')
    }
    await this.accountNavigation.click()
  }

  private async isAppNavigationHamburgerOpen(): Promise<boolean> {
    if (await this.isWideScreen()) {
      throw new AppNavigationViewportStateError('wide','Cannot interact with app navigation hamburger when wide screen is in use')
    }
    return await isVisible(this.organizationsNavigatior)
  }

  private async isAccountNavigationOpen():Promise<boolean> {
    if (!await this.isWideScreen()) {
      throw new AppNavigationViewportStateError('narrow','Cannot interact with account navigation when narrow screen is in use')
    }
    return await isVisible(this.userProfileNavigator)
  }

  async isWideScreen():Promise<boolean> {
    return !(await isVisible(this.appNavigationHamburger))
  }
}

class AppNavigationViewportStateError extends Error {
  constructor(viewportIs: 'wide' | 'narrow', userMessage: string = '') {
    const message = `Trying to interact with app navigation as if it was ${viewportIs}. It is not. ${userMessage}`
    super(message);
    this.name = 'AppNavigationViewportStateError'
  }
}