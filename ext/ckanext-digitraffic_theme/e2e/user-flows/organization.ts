import {User} from "../users/user";
import {
  EditOrganizationPage, HomePage,
  NewOrganizationPage,
  OrganizationPage,
  OrganizationsListPage, OrganizationStateError
} from "../page-object-models";
import {Organization} from "../models/organization";
import {Page} from "@playwright/test";
import {AuthorizationError} from "../models/error";
import {BasePage} from "../page-object-models/base";
import {AddOrganizationMemberPage, Role} from "../page-object-models/add-organization-member-page";

export type UserFlowResponse = {
  isRunSuccessful: boolean,
  pom?: BasePage
  error?: Error,
}
export async function createOrganization(user: User, organization: Organization, page: Page = undefined):Promise<UserFlowResponse> {
  if (!page) {
    page = await user.createNewPage('createOrganizationPage')
  }
  let pom: BasePage
  pom = await user.gotoHomePage(page)
  pom = await (pom as HomePage).gotoOrganizationsListPage()
  try {
    pom = await (pom as OrganizationsListPage).gotoNewOrganizationPage()
    pom = await (pom as NewOrganizationPage).createOrganization(organization)
    return {
      isRunSuccessful: true,
      pom
    }
  } catch (e) {
    if (e instanceof AuthorizationError ||
      e instanceof OrganizationStateError) {
      return {
        isRunSuccessful: false,
        error: e,
        pom
      }
    }
    throw e
  }
}

export async function addMemberToOrganization(user: User, organization: Organization, userToAdd: User, role: Role, page: Page) {
  let pom: BasePage
  try {
    pom = await user.gotoOrganizationPage(page, organization)
    pom = await (pom as OrganizationPage).gotoEditOrganizationPage()
    pom = await (pom as EditOrganizationPage).gotoAddMemberPage()
    pom = await (pom as AddOrganizationMemberPage).addUserToOrganization(userToAdd, role)
    return {
      isRunSuccessful: true,
      pom
    }
  } catch (e) {
    if (e instanceof AuthorizationError) {
      return {
        isRunSuccessful: false,
        error: e,
        pom
      }
    }
    throw e
  }
}

export async function removeMemberFromOrganization(user: User, organization: Organization, userToRemove: User, page: Page) {
  let pom: BasePage
  try {
    pom = await user.gotoOrganizationPage(page, organization)
    pom = await (pom as OrganizationPage).gotoEditOrganizationPage()
    await (pom as EditOrganizationPage).selectMembersTab()
    await (pom as EditOrganizationPage).removeMember(userToRemove.userInfo)
    return {
      isRunSuccessful: true,
      pom
    }
  } catch (e) {
    if (e instanceof AuthorizationError) {
      return {
        isRunSuccessful: false,
        error: e,
        pom
      }
    }
    throw e
  }
}
