import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {isVisible} from "../util";
import type {UserProfilePage} from ".";

export class UsersListPage extends BasePage {
  readonly usersListSide: Locator
  readonly usersListContent: Locator
  readonly usersListPageIntroductionHeader: Locator
  readonly usersListing: Locator

  constructor(page: Page) {
    super(page);
    this.usersListSide = page.locator('.main aside')
    this.usersListContent = page.getByRole('main')
    this.usersListPageIntroductionHeader = this.usersListContent.getByRole('heading', {name: 'Käyttäjät'})
    this.usersListing = this.usersListContent.locator('.user-list')
  }
  async goto(): Promise<UsersListPage> {
    await this.page.goto(URL.UsersList);
    return this;
  }

  async isAtPage(): Promise<boolean> {
    return await isVisible(this.usersListPageIntroductionHeader)
  }

  async gotoListedUserPage(name: string): Promise<UserProfilePage> {
    return await gotoNewPage(
      this.page,
      URL.User,
      async () => await this.usersListing
        .getByRole('link')
        .filter({has: this.page.locator(`a[href~="${pathParameterURL(URL.User, {name})}"]`)})
        .click(),
      name
    )
  }
}

setPom(URL.UsersList, UsersListPage)