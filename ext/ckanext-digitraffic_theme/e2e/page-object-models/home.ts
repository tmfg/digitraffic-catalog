import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {isVisible} from "../util";

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
  async isAtPage(): Promise<boolean> {
    return await isVisible(this.welcomeHeader)
  }
}

setPom(URL.Home, HomePage)