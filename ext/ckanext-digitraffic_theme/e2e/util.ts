import type {Locator, Page} from "@playwright/test";

export async function isVisible(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({timeout: 1000})
    return true
  } catch (e) {
    return false
  }
}

export async function isAtUrl(page: Page, url: string):Promise<boolean> {
  try {
    await page.waitForURL(url, {timeout: 5000})
    return true
  } catch (e) {
    return false
  }
}

export function getEnv(variableName: string): string {
  if (typeof variableName !== "string") {
    throw new Error("Must give a string as parameter")
  }
  const value = process.env[variableName]

  if (value === undefined) {
    throw new Error(`Environment variable "${variableName}" is not set`)
  }

  return value
}

/**
 * Given a type (class with properties) returns a type with the optional properties removed
 */
export type CompulsoryProperties<Type> = {
  [Property in keyof Type as undefined extends Type[Property] ? never : Property]: Type[Property]
};