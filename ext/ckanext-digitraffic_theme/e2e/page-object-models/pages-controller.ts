import type {Page} from "@playwright/test"

export enum URL {
  Home = '/',
  OrganizationsList = '/organization',
  NewOrganization = '/organization/new',
  Organization = '/organization/{name}',
  EditOrganization = '/organization/edit/{name}',
  AddOrganizationMember = '/organization/member_new/{name}',
  User = '/user/{name}'
}
export interface POMConstructor {
  new(page: Page, ...args: any[]): Object;
}

const poms = new Map<URL, POMConstructor>()

export function getPom(relativeURL: URL): POMConstructor {
  const pom = poms.get(relativeURL)
  if (pom === undefined) {
    throw new Error(`POM at "${relativeURL}" is not set`)
  }
  return pom
}

export function setPom(relativeURL: URL, pomConstructor: POMConstructor) {
  if (poms.has(relativeURL)) {
    return
  }
  poms.set(relativeURL, pomConstructor)
}