import type {Browser, BrowserContext, Page} from "@playwright/test";
import {HomePage, EditUserPage} from "../page-object-models";
import {URL} from "../page-object-models/pages-controller";
import {gotoNewPage} from "../page-object-models/util";
import {UserInfo} from "../models/user-info";
import {IdentityUser, Identity} from "./identity-user";
import {UserStateError} from "./user";

/**
 * KnownUser is a user that has authenticated and some information about the user (@see {@link UserInfo}) is available.
 * Authentication part is handled by the super class {@link IdentityUser}
 */
export class KnownUser extends IdentityUser {
  readonly userInfo: UserInfo;

  /**
   * The constructor is made private as we want to create the KnownUser objects through {@link KnownUser.of}
   * static method. This is because we want to call some asynchronous code when initializing a User.
   * @param {BrowserContext} browserContext
   * @param {Page} defaultPage
   * @param {Identity} identity
   * @param {UserInfo} userInfo
   * @private
   */
  private constructor(browserContext: BrowserContext, defaultPage: Page, identity: Identity, userInfo: UserInfo) {
    super(browserContext, defaultPage, identity)
    this.userInfo = userInfo;
  }

  /**
   * First, creates an {@link IdentityUser} with the given {@link Identity} and after that, collect the necessary
   * information via UI. Returns an instance of {@link KnownUser}
   *
   * @param {Identity} identity – The identity to use with the user
   * @param {Browser} browser – Browser to use to create the browser context
   * @see {@link Identity}
   */
  static override async of(identity: Identity, browser: Browser): Promise<KnownUser> {
    const identityUser = await IdentityUser.of(identity, browser)

    KnownUser.checkSignedIn(identityUser)

    const page = identityUser.getPageFromContext()
    await page.goto(URL.Home)

    const userInfo = await KnownUser.gatherUserInfo(page)
    // TODO: Cache userInfo
    await identityUser.removeAllPages()

    const knownUser = new KnownUser(...(await IdentityUser.paramsForSuper(identityUser)), userInfo)

    knownUser.checkKnownUser()

    return knownUser
  }

  /**
   * This method is used to check that the user state and the UI matches.
   * @private
   */
  private checkKnownUser() {
    KnownUser.checkSignedIn(this)
    if (this.userInfo.fullName !== this.identity) {
      throw new UserStateError("Wrong identity signed in!")
    }
  }

  private static checkSignedIn(user: IdentityUser) {
    if (!user.isUserLoggedIn()) {
      throw new UserStateError(`KnownUser of identity ${user.identity} is not signed in!`)
    }
  }

  /**
   * Gather the signed-in user information from the UI
   * @param page
   * @private
   */
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

    const editUserPOM = new EditUserPage(page, username)
    await editUserPOM.goto()

    return await editUserPOM.getUserInfo()
  }

  /**
   * Returns the given property from the UserInfo
   * @param property
   */
  getUserAttribute<T extends keyof UserInfo>(property: T): UserInfo[T] {
    this.checkKnownUser()
    return this.userInfo[property]
  }
}
