import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";

export class HomePage extends BasePage {
  readonly welcomeHeader: Locator
  constructor(page: Page) {
    super(page);
    this.welcomeHeader = page.getByRole('heading', {name: 'Tervetuloa CKAN:iin'})
  }
  async goto(): Promise<HomePage> {
    await this.page.goto(URL.Home);
    return this;
  }
  async assertPage(): Promise<void> {
    await expect(this.welcomeHeader).toBeVisible()
  }
}

setPom(URL.Home, HomePage)