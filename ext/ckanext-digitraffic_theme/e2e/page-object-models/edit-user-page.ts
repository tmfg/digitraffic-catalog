import {BasePage} from "./base";
import type {Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {UserInfo} from "../models/user-info";
import {UserProfilePage} from "./user-profile-page";

export class EditUserPage extends BasePage {
  readonly pageUrl: string
  readonly name: string
  readonly editUserProfileSide: Locator
  readonly editUserProfileContent: Locator
  readonly editUserSideHeader: Locator
  readonly editUserMainHeader: Locator
  readonly userName: Locator
  readonly fullName: Locator
  readonly email: Locator
  readonly descriptionBox: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly phoneNumber: Locator
  readonly saveButton: Locator

  constructor(page: Page, name: string) {
    super(page, [page.locator("Will-be-overridden")]);
    this.name = name
    this.pageUrl = pathParameterURL(URL.EditUser, {'name': name})
    this.editUserProfileSide = page.locator('.main aside')
    this.editUserProfileContent = page.getByRole('main')
    this.editUserSideHeader = this.editUserProfileSide.getByRole('heading', {'name': 'Käyttäjätilin tiedot'})
    this.editUserMainHeader = this.editUserProfileContent.getByText('Muuta tietoja')
    this.userName = this.editUserProfileContent.getByLabel('Käyttäjänimi')
    this.fullName = this.editUserProfileContent.getByLabel('Koko nimi')
    this.email = this.editUserProfileContent.getByLabel('Sähköposti')
    this.descriptionBox = this.editUserProfileContent.getByLabel('Tietoa')
    this.firstName = this.editUserProfileContent.getByLabel('Etunimi')
    this.lastName = this.editUserProfileContent.getByLabel('Sukunimi')
    this.phoneNumber = this.editUserProfileContent.getByLabel('Puhelinnumero')
    this.saveButton = this.mainContent.getByRole('button', { name: 'Päivitä profiili' })
    this.isAtPageLocators = [this.editUserSideHeader, this.editUserMainHeader]
  }
  async goto(): Promise<EditUserPage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async getUserInfo(): Promise<UserInfo> {
    return new UserInfo(await this.userName.inputValue(),
      await this.fullName.inputValue(),
      await this.email.inputValue(),
      {
        description: await this.descriptionBox.inputValue(),
        firstName: await this.firstName.inputValue(),
        lastName: await this.lastName.inputValue(),
        phoneNumber: await this.phoneNumber.inputValue()
      })
  }

  async fillForm(userInfo: UserInfo) {
    const isUserNameSame = (await this.userName.inputValue()) === userInfo.name
    const isEmailSame = (await this.email.inputValue()) === userInfo.email
    if (!(isUserNameSame && isEmailSame)) {
      throw new Error('Cannot modify user name or email address')
    }
    if (userInfo.description) {
      await this.descriptionBox.fill(userInfo.description)
    }
  }

  async saveUserInfo(): Promise<UserProfilePage> {
    return await gotoNewPage(
      this.page,
      URL.User,
      async (userProfilePagePOM) => {
        await this.saveButton.click()
        const isUpdateSuccessful = await userProfilePagePOM.isAtPage()
        if (!isUpdateSuccessful) {
          throw new Error("Couldn't update the user information")
        }
      },
      this.name
    )
  }
}

setPom(URL.EditUser, EditUserPage)