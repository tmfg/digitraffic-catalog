import {BasePage} from "./base";
import {URL, getPom} from "./pages-controller"
import {type Page, test} from "@playwright/test";
import {cancellableIsVisible, getForbiddenPageLocator} from "../util";
import {AuthorizationError} from "../models/error";

export async function gotoNewPage<T extends BasePage>(
  page: Page,
  url: URL,
  navigationFn: (newPagePOM: T) => Promise<void>,
  ...pomParameters: unknown[]
): Promise<T> {
  const newPageConstructor = getPom(url)
  const newPagePOM = new newPageConstructor(page, ...pomParameters) as T

  await navigationFn(newPagePOM)

  await test.step('Check new POM...', async () => {
    const forbiddenPageLocator = getForbiddenPageLocator(page)
    const forbiddenPageVisible = cancellableIsVisible(forbiddenPageLocator)
    const pomVisible = newPagePOM.cancellablePageCheck()
    const possiblePages = [forbiddenPageVisible, pomVisible]
    const visiblePageLocator = await Promise.race(possiblePages.map((pageVisibilityLocator) => {
      if ('locator' in pageVisibilityLocator) {
        return pageVisibilityLocator.locator
      }
      return pageVisibilityLocator.locators
    }))

    if (visiblePageLocator === forbiddenPageLocator) {
      throw new AuthorizationError("User is not authorized to access page")
    }
    for (const {cancel} of possiblePages) {
      cancel()
    }

    await newPagePOM.assertPage()
  })
  return newPagePOM
}

export function pathParameterURL(url: URL, parameters: {[name: string]: number|string}): string {
  return Object.entries(parameters).reduce(
    (resolvedUrl, [parameterName, parameterValue]) => resolvedUrl.replace(`{${parameterName}}`, parameterValue.toString()),
    url.toString()
  )
}

export function urlify(text: string) {
  return text.trim().toLowerCase().replaceAll(' ', '-')
}
