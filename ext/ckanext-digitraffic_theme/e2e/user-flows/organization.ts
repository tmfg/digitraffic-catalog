import {test} from '@playwright/test';
import {User} from "../users/user";
import {
  EditOrganizationPage,
  OrganizationPage,
  OrganizationStateError,
  HomePage,
  OrganizationsListPage,
  NewOrganizationPage,
  AddOrganizationMemberPage,
  Role
} from "../page-object-models";
import {Organization} from "../models/organization";
import type {Page} from "@playwright/test";
import {AuthorizationError} from "../models/error";
import {BasePage} from "../page-object-models/base";

export type UserFlowResponse = {
  isRunSuccessful: boolean,
  pom?: BasePage
  error?: Error,
}

export async function createOrganization(user: User, organization: Organization, page: Page | undefined = undefined): Promise<UserFlowResponse> {
  return await test.step(`Create organization ${organization.name} as user ${user.identity}`, async () => {
    if (!page) {
      page = await user.createNewPage('createOrganizationPage')
    }
    let pom: BasePage | undefined = undefined
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
  })
}

export async function addMemberToOrganization(user: User, organization: Organization, userToAdd: User, role: Role, page: Page) {
  return await test.step(`Add ${userToAdd.identity} to organization ${organization.name} as ${user.identity}`, async () => {
    let pom: BasePage | undefined = undefined
    try {
      pom = await user.gotoOrganizationPage(organization, page)
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
  })
}

export async function removeMemberFromOrganization(user: User, organization: Organization, userToRemove: User, page: Page) {
  return await test.step(`Remove ${userToRemove.identity} from organization ${organization.name} as ${user.identity}`, async () => {
    let pom: BasePage | undefined = undefined
    try {
      pom = await user.gotoOrganizationPage(organization, page)
      pom = await (pom as OrganizationPage).gotoEditOrganizationPage()
      await (pom as EditOrganizationPage).selectMembersTab()
      await (pom as EditOrganizationPage).removeMember(userToRemove.getUserAttribute("name"))
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
  })
}
