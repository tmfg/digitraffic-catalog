import {Locator, Page} from "@playwright/test";

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