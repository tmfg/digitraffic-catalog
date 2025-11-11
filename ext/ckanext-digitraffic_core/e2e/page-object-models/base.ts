import {expect, type Locator, type Page} from '@playwright/test'
import { getPom, URL } from './pages-controller'
import {
  isVisible,
  getVisibleLocator,
  cancellableIsVisible,
  type CancellableLocatorsChecks
} from '../util'
import type {OrganizationsListPage} from "./organizations-list-page";
import type {DatasetsListPage} from "./datasets-list-page";
import type {UserProfilePage} from "./user-profile-page";

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
  readonly userIcon: Locator
  readonly userNavigationChevronDownIcon: Locator
  readonly userNavigationChevronUpIcon: Locator
  readonly organizationsNavigatior: Locator
  readonly userProfileNavigator: Locator
  readonly datasetsNavigator: Locator
  readonly mainContent: Locator
  protected isAtPageLocators: [Locator, ...Locator[]]

  protected constructor(page: Page, isAtPageLocators: [Locator, ...Locator[]]) {
    this.page = page
    this.isAtPageLocators = isAtPageLocators
    this.header = page.locator('header')
    this.appNavigation = this.header.locator('nav#app-navigation')
    this.accountNavigation = this.header.locator('nav.account')
    this.appNavigationHamburger = page.locator('[data-lucide="menu"]')
    this.userIcon = this.accountNavigation.locator('.lucide-user')
    this.organizationsNavigatior = this.appNavigation.getByRole('link', {name: "Organisaatiot"})
    this.userProfileNavigator = this.accountNavigation.getByRole('link', {name: "Profiili", exact: true})
    this.userNavigationChevronDownIcon = this.accountNavigation.locator('.lucide-chevron-down')
    this.userNavigationChevronUpIcon = this.accountNavigation.locator('.lucide-chevron-up')
    this.datasetsNavigator = this.appNavigation.getByRole('link', {name: "Tietoaineistot"})
    this.mainContent = page.locator('body > .main')
  }

  /**
   * This function is used to navigate this.page to the page that this POM represents
   */
  abstract goto(): Promise<BasePage>

  /**
   * This function is used to assert that this.page is at the page that this POM represents and the page is fully loaded
   */
  async assertPage(): Promise<void> {
    expect(await this.isAtPage()).toBeTruthy()
  }

  async isAtPage(): Promise<boolean> {
    return (await Promise.all(this.isAtPageLocators.map(locator => isVisible(locator)))).every(locatorIsVisible => locatorIsVisible)
  }
  cancellablePageCheck(): CancellableLocatorsChecks {
    const locatorChecks = this.isAtPageLocators.map(locator => cancellableIsVisible(locator))
    const cancelAll = async () => {
      await Promise.all(locatorChecks.map(({ cancel }) => cancel()))
    }
    return {
      cancel: cancelAll,
      locators: Promise.all(locatorChecks.map(({ locator }) => locator))
    }
  }

  async gotoOrganizationsListPage(): Promise<OrganizationsListPage> {
    const organizationPageConstructor = getPom(URL.OrganizationsList)
    const organizationPOM = new organizationPageConstructor(this.page) as OrganizationsListPage

    if (!await this.isWideScreen()) {
      await this.makeAppNavigationOpen();
    }
    await this.organizationsNavigatior.click()
    await organizationPOM.assertPage()
    return organizationPOM
  }

  async gotoUserProfilePage(name: string): Promise<UserProfilePage> {
    const userProfilePageConstructor = getPom(URL.User)
    const userProfilePOM = new userProfilePageConstructor(this.page, name) as UserProfilePage

    if (!await this.isWideScreen()) {
      await this.makeAppNavigationOpen();
    } else {
      await this.makeAccountNavigationOpen();
    }
    await this.userProfileNavigator.click()
    await userProfilePOM.assertPage()
    return userProfilePOM
  }

  async gotoDatasetsListPage(): Promise<DatasetsListPage> {
    const datasetsListPageConstructor = getPom(URL.DatasetsList);
    const datasetsListPOM = new datasetsListPageConstructor(this.page) as DatasetsListPage;

    if (!await this.isWideScreen()) {
      await this.makeAppNavigationOpen();
    }

    await this.datasetsNavigator.click();
    await datasetsListPOM.assertPage();
    return datasetsListPOM;
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
    const chevronIcon = await getVisibleLocator(this.userNavigationChevronDownIcon, this.userNavigationChevronUpIcon)
    return chevronIcon === this.userNavigationChevronUpIcon
  }

  async isWideScreen():Promise<boolean> {
    const visibleLocator = await getVisibleLocator(this.appNavigationHamburger, this.userIcon)
    return visibleLocator === this.userIcon;
  }
}

export interface JSLoadedInterface<T extends BasePage> {
  ensurePageJsLoaded: () => Promise<T>
}

export function implementsJSLoadedInterface<T extends BasePage>(pom: T): pom is T & JSLoadedInterface<T> {
    return 'ensurePageJsLoaded' in pom && typeof pom.ensurePageJsLoaded === 'function';
}

class AppNavigationViewportStateError extends Error {
  constructor(viewportIs: 'wide' | 'narrow', userMessage: string = '') {
    const message = `Trying to interact with app navigation as if it was ${viewportIs}. It is not. ${userMessage}`
    super(message);
    this.name = 'AppNavigationViewportStateError'
  }
}