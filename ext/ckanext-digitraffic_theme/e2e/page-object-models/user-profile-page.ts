import {BasePage} from "./base";
import type {Page, Locator} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import type {EditUserPage} from './edit-user-page'
import {UserInfo} from "../models/userInfo";
import {AuthorizationError} from "../models/error";
import {isVisible} from "../util";

export class UserProfilePage extends BasePage {
  readonly pageUrl: string
  readonly userInfo: UserInfo
  readonly userProfileSide: Locator
  readonly userProfileContent: Locator
  readonly userFullName: Locator
  readonly editUserButton: Locator

  constructor(page: Page, userInfo: UserInfo) {
    super(page);
    this.userInfo = userInfo
    this.pageUrl = pathParameterURL(URL.User, {'name': userInfo.name})
    this.userProfileSide = page.locator('.main aside')
    this.userProfileContent = page.getByRole('main')
    this.userFullName = this.userProfileSide.getByRole('heading', {name: userInfo.fullName})
    this.editUserButton = this.userProfileContent.getByRole('link', {name: 'Hallinnoi'})

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
      this.userInfo
    )
  }

  async isAtPage(): Promise<boolean> {
    return await isVisible(this.userFullName)
  }
}

setPom(URL.User, UserProfilePage)