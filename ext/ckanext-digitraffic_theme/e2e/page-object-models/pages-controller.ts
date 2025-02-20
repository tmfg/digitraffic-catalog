import {Page} from "@playwright/test";

export enum URL {
  Home = '/',
  Organization = '/organization/'
}
export interface POMConstructor {
  new(page: Page): Object;
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