import {BasePage} from "../page-object-models/base";
import {KnownUser} from "../users/known-user";
import {URL} from "../page-object-models/pages-controller";
import {UnexpectedPageError} from "../models/error";
import {gotoNewPage} from "../page-object-models/util";
import {EditUserPage, HomePage, OrganizationPage, OrganizationsListPage} from "../page-object-models";
import {Organization} from "../models/organization";
import {Page, test} from "@playwright/test";
import type {IUserView} from "./user-view-types"
import {addMixinForUserView, MixinName} from "./mixins/mixins-controller";
import {DatasetViewMixin} from "./mixins/mixin-types";

export class UserView implements IUserView {
  readonly user: KnownUser
  pom: BasePage

  constructor(user: KnownUser, pom: BasePage) {
    this.user = user;
    this.pom = pom;
  }

  copy(): UserView {
    return new UserView(this.user, this.pom);
  }

  async gotoHomePage(): Promise<UserView> {
    const page = this.getPage()
    const pom = await gotoNewPage(
      page,
      URL.Home,
      async (homePagePOM: HomePage) => {
        await homePagePOM.goto()
      }
    )
    this.pom = pom
    return this
  }

  async gotoOrganizationsListPage(): Promise<UserView> {
    const page = this.getPage()
    const pom = await gotoNewPage(
      page,
      URL.OrganizationsList,
      async (organizationsListPOM: OrganizationsListPage) => {
        await organizationsListPOM.goto()
      }
    )
    this.pom = pom;
    return this
  }

  async gotoEditUserPage(name: string): Promise<UserView> {
    const page = this.getPage()
    const pom = await gotoNewPage(
      page,
      URL.EditUser,
      async (editUserPOM: EditUserPage) => {
        await editUserPOM.goto()
      },
      name
    )
    this.pom = pom;
    return this
  }

  async gotoOrganizationPage(organization: Organization): Promise<UserView> {
    const page = this.getPage()
    const pom = await gotoNewPage(
      page,
      URL.Organization,
      async (organizationPOM: OrganizationPage) => {
        await organizationPOM.goto()
      },
      organization
    )
    this.pom = pom;
    return this
  }

  async browseToDatasetPage(datasetName: string): Promise<UserView> {
    return await test.step(`Browsing to dataset ${datasetName} page`, async () => {

      const homePage = (await this.gotoHomePage()).getPOM();
      const datasetPage = await homePage.gotoDatasetsListPage()
        .then(datasetListPage => datasetListPage.gotoDatasetPage(datasetName))

      this.pom = datasetPage;
      return addMixinForUserView<DatasetViewMixin, typeof this>(this, MixinName.DatasetView);
    });
  }

  getAndValidatePOM<T extends BasePage>(url: URL): T {
    const pom = this.pom as T
    const pomUrl = pom.page.url()
    const urlPathRegexPattern = url.replace(/\{[^}]+\}/g, '([^/]+)')
    const regex = new RegExp(`^https?://([^/]+)${urlPathRegexPattern}$`)

    if (regex.test(pomUrl)) {
      return pom
    } else {
      throw new UnexpectedPageError(url, pomUrl)
    }
  }
  getPOM<T extends BasePage>():T {
    return this.pom as T
  }
  getPage():Page {
    return this.pom.page
  }
  getUser():KnownUser {
    return this.user
  }
}