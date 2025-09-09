import { BasePage, implementsJSLoadedInterface } from "./base";
import { URL, getPom } from "./pages-controller"
import { type Locator, type Page, test } from "@playwright/test";
import { cancellableIsVisible, getForbiddenPageLocator, hideDevTools } from "../util";
import { AuthorizationError } from "../models/error";

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

    await Promise.all(possiblePages.map(({ cancel }) => cancel()))

    if (visiblePageLocator === forbiddenPageLocator) {
      throw new AuthorizationError("User is not authorized to access page")
    }

    if (implementsJSLoadedInterface(newPagePOM)) {
      await newPagePOM.ensurePageJsLoaded()
    }

    await hideDevTools(newPagePOM.page)

    await newPagePOM.assertPage()
  })
  return newPagePOM
}

export function pathParameterURL(url: URL, parameters: { [name: string]: number | string }): string {
  return Object.entries(parameters).reduce(
    (resolvedUrl, [parameterName, parameterValue]) => resolvedUrl.replace(`{${parameterName}}`, parameterValue.toString()),
    url.toString()
  )
}

export function urlify(text: string) {
  return text.trim().toLowerCase().replaceAll(' ', '-')
}

export function dateToDateAndTimeString(date: Date): { date: string, time: string } {
  // Get date parts in local timezone instead of converting to UTC
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format as YYYY-MM-DD and HH:MM
  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}`;

  return { date: dateString, time: timeString };
}

export async function getNewestRepeatingFieldGroupIndex(groupLocator: Locator): Promise<number> {
  const groupIndex = await groupLocator.locator('[data-group-index]').last().getAttribute('data-group-index');
  if (!groupIndex) {
    throw new Error('No repeating field group found');
  }
  return parseInt(groupIndex);
}

export async function getRepeatingFieldGropField(groupLocator: Locator, index: number, label: string): Promise<Locator> {
  const fieldLocator = await groupLocator.locator(`[data-group-index="${index}"]`).getByLabel(label);
  if (!fieldLocator) {
    throw new Error(`Field ${label} not found in group index ${index}`);
  }
  return fieldLocator;
}