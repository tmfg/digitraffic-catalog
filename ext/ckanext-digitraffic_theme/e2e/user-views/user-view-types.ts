import {Organization} from "../models/organization";
import {BasePage} from "../page-object-models/base";
import {KnownUser} from "../users/known-user";
import type {Page} from "@playwright/test";
import type {URL} from "../page-object-models/pages-controller";

export interface IUserView {
    gotoHomePage: () => Promise<IUserView>;
    gotoOrganizationsListPage: () => Promise<IUserView>;
    gotoEditUserPage: (name: string) => Promise<IUserView>;
    gotoOrganizationPage: (organization: Organization) => Promise<IUserView>;
    getPage: () => Page;
    getPOM:<T extends BasePage> () => T;
    getAndValidatePOM:<T extends BasePage> (url: URL) => T;
    user: KnownUser;
    pom: BasePage;
    copy: () => IUserView;
}