import {BasePage} from "./base";
import {expect, Locator, Page} from "@playwright/test";
import {setPom, URL} from "./pages-controller";
import {gotoNewPage, pathParameterURL} from "./util";
import {Organization} from "../models/organization";

export class UserProfilePage extends BasePage {
  readonly pageUrl: string
  readonly organization: Organization

  constructor(page: Page, organization: Organization) {
    super(page);
    this.organization = organization
    this.pageUrl = pathParameterURL(URL.Organization, {'name': organization.name})

  }
  async goto(): Promise<UserProfilePage> {
    await this.page.goto(this.pageUrl);
    return this;
  }

  async isAtPage(): Promise<boolean> {
  }
}

setPom(URL.User, UserProfilePage)