import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {pathParameterURL} from "./util";
import {isVisible} from "../util";
import {UserInfo} from "../models/userInfo";

export class EditUserPage extends BasePage {
  readonly pageUrl: string
  readonly userInfo: UserInfo
  readonly editUserProfileSide: Locator
  readonly editUserProfileContent: Locator
  readonly editUserSideHeader: Locator
  readonly editUserMainHeader: Locator
  readonly userFullName: Locator
  readonly userInfoBox: Locator
  readonly userFirstName: Locator
  readonly userPhoneNumber: Locator
  
  /*readonly userEditPageNameHeader: Locator
  readonly userEditFormSection: Locator*/

  constructor(page: Page, userInfo: UserInfo) {
    super(page);
    this.userInfo = userInfo
    this.pageUrl = pathParameterURL(URL.EditUser, {'name': userInfo.name})
    this.editUserProfileSide = page.locator('.main aside')
    this.editUserProfileContent = page.getByRole('main')
    this.editUserSideHeader = this.editUserProfileSide.getByRole('heading', {'name': 'Käyttäjätilin tiedot'})
    this.editUserMainHeader = this.editUserProfileContent.getByRole('heading', {'name': 'Muuta tietoja'})
    this.userFullName = this.editUserProfileContent.getByLabel('Koko nimi')
    this.userInfoBox = this.editUserProfileContent.getByLabel('Tietoa')
    this.userFirstName = this.editUserProfileContent.getByLabel('Etunimi')
    this.userPhoneNumber = this.editUserProfileContent.getByLabel('Puhelinnumero')
  }
  async goto(): Promise<EditUserPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async isAtPage(): Promise<boolean> {
      return await isVisible(this.editUserSideHeader) && isVisible(this.editUserMainHeader)
  }

  async fillForm(userInfo: UserInfo) {

  }

  async
}

setPom(URL.EditUser, EditUserPage)