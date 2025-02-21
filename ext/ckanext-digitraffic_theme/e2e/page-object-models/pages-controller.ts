import {Page} from "@playwright/test";

export enum URL {
  Home = '/',
  OrganizationsList = '/organization/',
  NewOrganization = '/organization/new',
  Organization = '/organization/{name}'
}
export interface POMConstructor {
  new(page: Page, ...args): Object;
}
const poms = new Map<URL, POMConstructor>()

export function getPom(relativeURL: URL): POMConstructor {
  return poms.get(relativeURL)
}

export function setPom(relativeURL: URL, pomConstructor: POMConstructor) {
  if (poms.has(relativeURL)) {
    return
  }
  poms.set(relativeURL, pomConstructor)
}