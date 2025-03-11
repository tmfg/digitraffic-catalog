import {BasePage} from "./base";
import type {Page, Locator} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import type {
  EditUserPage,
  UsersListPage
} from '.'
import {AuthorizationError} from "../models/error";
import {isVisible} from "../util";

export class UserProfilePage extends BasePage {
  readonly pageUrl: string
  readonly name: string
  readonly userProfileSide: Locator
  readonly userProfileContent: Locator
  readonly userName: Locator
  readonly editUserButton: Locator
  readonly userDescription: Locator
  readonly usersListingBreadcrumb: Locator

  constructor(page: Page, name: string) {
    super(page);
    this.name = name
    this.pageUrl = pathParameterURL(URL.User, {'name': name})
    this.userProfileSide = page.locator('.main aside')
    this.userProfileContent = page.getByRole('main')
    this.userName = this.userProfileSide.getByText(name)
    this.editUserButton = this.userProfileContent.getByRole('link', {name: 'Hallinnoi'})
    this.userDescription = this.userProfileSide.locator('p:has(+ div.nums)')
    this.usersListingBreadcrumb = page.locator('.breadcrumb').getByRole('link', {name: 'Käyttäjät'})
  }

  async goto(): Promise<UserProfilePage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async gotoEditUserPage(): Promise<EditUserPage> {
    return await gotoNewPage(
      this.page,
      URL.EditUser,
      async () => await this.editUserButton
        .click()
        .catch(err => {
          console.log(err)
          throw new AuthorizationError("Is not allowed to edit the User")
        }),
      this.name
    )
  }

  async gotoUsersListingPage(): Promise<UsersListPage> {
    return await gotoNewPage(
      this.page,
      URL.UsersList,
      async () => await this.usersListingBreadcrumb.click()
    )
  }

  async isAtPage(): Promise<boolean> {
    return await isVisible(this.userName)
  }
}

setPom(URL.User, UserProfilePage)