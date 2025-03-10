/**
 * This module defines the constructs that can be used in E2E-tests to take up some known [identity]{@link Identity} as
 * a {@link User}
 */
import type {Browser, BrowserContext, Page} from "@playwright/test";
import {HomePage, EditUserPage} from "../page-object-models";
import {URL} from "../page-object-models/pages-controller";
import {gotoNewPage} from "../page-object-models/util";
import {UserInfo} from "../models/userInfo";
import {User} from "./user";
import {IdentityUser, Identity} from "./identity-user";

/**
 * User object is used to take up an [identity]{@Identity} and to provide some useful methods for the user to perform
 * with a browser.
 */
export class KnownUser extends IdentityUser {
  readonly userInfo: UserInfo;

  /**
   * The constructor is made private as we want to create the User objects through {@link User.of} static method. This is
   * because we want to call some asynchronous code when initializing a User.
   * @param identity
   * @param browserContext
   * @param userInfo
   * @private
   */
  private constructor(browserContext: BrowserContext, identity: Identity, userInfo: UserInfo) {
    super(browserContext, identity)
    this.userInfo = userInfo;
  }

  /**
   * Creates a {@link User} which has the given {@link Identity}. Note that the identities are meant to represent some
   * known test user. Therefore, the user objects are also representing this identity. However, when creating a user
   * object with some identity, a new [browser context]{@link https://playwright.dev/docs/api/class-browsercontext}
   * is always created. This means that if you create two user objects with the same {@link Identity}, you'll end up
   * having two objects that have their own browser state but the state is initialized with the same authentication
   * state. With this in mind, when running tests, the server state might be different each time depending on the order
   * in which tests are run. Say, you first run a test that creates a private dataset with some identity. Now, all
   * the subsequent tests with the same user will have access to this dataset if it was not deleted at the end of
   * the first test. And if you run the tests in parallel, then you might, or you might not, have this extra dataset
   * visible even if it was deleted at the end of the first test.
   *
   * We do not support a case where new users are created. This would require that it would be possible to dynamically
   * create a user at Azure AD with all the correct settings for a test user.
   *
   * The idea of this object is that the User object would own the {@link BrowserContext} it uses and all the actions
   * done with the said context would go via this object. Like opening a new page or saving the authentication state
   * into a cache. Of course, the browser context is owned by the browser object that is given as
   * an argument to this factory method and the context is modified by the actions taken inside the browser. However,
   * one should not use the context outside the user object methods even though it is possible to do so.
   * This way we can ensure that the browser state is consistent with the intended {@link Identity}.
   *
   * @param {Identity} identity – The identity to use with the user
   * @param {Browser} browser – Browser to use to create the browser context
   * @see {@link Identity}
   */
  static override async of(identity: Identity, browser: Browser): Promise<KnownUser> {
    const identityUser = await IdentityUser.of(identity, browser)

    KnownUser.checkSignedIn(identityUser)

    const pageName = "userInfo"

    const page = await identityUser.createNewPage(pageName)
    await page.goto(URL.Home)

    const userInfo = await KnownUser.gatherUserInfo(page)
    if (userInfo.fullName !== identity) {
      throw new UserStateError("Wrong identity signed in!")
    }
    await identityUser.removePage(pageName)

    return new KnownUser(...IdentityUser.paramsForSuper(identityUser), userInfo)
  }

  private _checkSignedIn() {
    KnownUser.checkSignedIn(this)
  }

  private static checkSignedIn(user: IdentityUser) {
    if (!user.isUserLoggedIn()) {
      throw new UserStateError(`KnownUser of identity ${user.identity} is not signed in!`)
    }
  }


  private static async gatherUserInfo(page: Page): Promise<UserInfo> {
    const homePage = await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {await homePagePOM.goto()}
    )
    await homePage.makeAccountNavigationOpen()
    let profileUrl = await homePage.userProfileNavigator.getAttribute('href')
    if (profileUrl === null) {
      throw new UserStateError("Is user signed in?")
    }
    const usernameMatch = profileUrl.match(/user\/([^/]+)/)
    if (usernameMatch === null) {
      throw new Error("Couldn't find the username")
    }
    const username = usernameMatch[1] as string
    //profileUrl = profileUrl.replace("/user/", "/user/edit/")

    const editUserPOM = new EditUserPage(page, username)
    await editUserPOM.goto()

    return await editUserPOM.getUserInfo()

    //await page.goto(profileUrl)

    /*const username = await page.getByLabel('Käyttäjänimi').getAttribute('value')
    const fullName = await page.getByLabel('Koko nimi').getAttribute('value')
    if (username === null) {
      throw new UserStateError("Username cannot be null")
    }
    if (fullName === null) {
      throw new UserStateError("fullName cannot be null")
    }
    return new UserInfo(username, fullName)*/
  }

  getUserAttribute<T extends keyof UserInfo>(property: T): UserInfo[T] {
    this._checkSignedIn()
    return this.userInfo[property]
  }

}

export class UserStateError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'UserStateError'
  }
}
