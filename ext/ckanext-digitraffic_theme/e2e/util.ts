import {type Locator, type Page, test} from "@playwright/test";

export type CancellableLocatorCheck = {
  locator: Promise<Locator>,
  cancel: () => Promise<void>
}

export type CancellableLocatorsChecks = {
  locators: Promise<Locator[]>,
  cancel: () => Promise<void>
}

export class CancellationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CancellationError"
  }
}

/**
 * Similar to [Playwright locator's waitFor](https://playwright.dev/docs/api/class-locator#locator-wait-for but
 * here, the waiting can be cancelled with the returned `cancel` function
 * @param locator
 */
function cancellableWaitFor(locator: Locator): {cancel: () => Promise<void>, locatorToBeVisible: Promise<Locator>} {
  let isCancelled = false
  let cancelResolve: () => void
  const cancelPromise = new Promise<void>((resolve) => {
    cancelResolve = resolve
  })

  const cancel = () => {
    isCancelled = true
    return cancelPromise
  }

  const locatorToBeVisible = new Promise<Locator>(async (resolve, reject) => {
    let totalTimeWaited = 0
    const increment = 50
    while (totalTimeWaited < 2000) {
      if (isCancelled) {
        reject(new CancellationError("Waiting for locator was cancelled"))
        break
      }
      const isVisible = await locator.isVisible()
      if (isVisible) {
        resolve(locator)
        break
      }
      await new Promise(r => setTimeout(r, increment))
      totalTimeWaited += increment
    }
    cancelResolve()
    reject(`Locator is not visible ${locator.toString()}`)
  })

  return {
    cancel,
    locatorToBeVisible
  }
}

/**
 * Checks if the element specified by the locator is visible. Waits for maximum of one second for the element to become
 * visible before returning
 * @param locator
 */
export async function isVisible(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({timeout: 2000})
    return true
  } catch (e) {
    return false
  }
}

/**
 * Same as {@link isVisible} but the checking can be cancelled
 *
 * @param locator
 */
export function cancellableIsVisible(locator: Locator): CancellableLocatorCheck {
  const {cancel, locatorToBeVisible} = cancellableWaitFor(locator)
  return {
    cancel,
    locator: locatorToBeVisible.then(() => locator)
  }
}

/**
 * Given multiple locators, returns the first locator to become visible or undefined if timeout is reached
 *
 * @param locators - varargs of {@link Locator}s
 */
export async function findVisibleLocator(...locators: Locator[]):Promise<Locator | undefined> {
  return await test.step('Find Visible Locator', async () => {
    const inspectLocatorsVisible = locators.map(locator => cancellableWaitFor(locator))
    const cancelAll = async () => {
      await Promise.all(inspectLocatorsVisible.map(({cancel}) => cancel()))
    }
    const visibleLocator = await Promise.race(inspectLocatorsVisible
      .map(({ locatorToBeVisible }) => locatorToBeVisible))
    await cancelAll()
    return visibleLocator
  })
}

/**
 * Same as {@link findVisibleLocator} but throws an Error if no locator is found
 * @param locators
 */
export async function getVisibleLocator(...locators: Locator[]):Promise<Locator> {
  const foundLocator = await findVisibleLocator(...locators)

  if (foundLocator === undefined) {
    throw Error("Couldn't find any Locators")
  }
  return foundLocator
}

/**
 * Checks if the page is at the given URL
 *
 * @param {Page} page - Page to check for the given URL
 * @param {string} url
 */
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
 * Returns a {@link Locator} for a unique element found in the page that is returned when 403 Forbidden response is
 * returned from the server.
 *
 * @param {Page} page - Page to use for the locator
 */
export function getForbiddenPageLocator(page: Page):Locator {
  return page.getByRole('heading', {name: '403 Forbidden'})
}

export async function isAtForbiddenPage(page: Page): Promise<boolean> {
  return await isVisible(getForbiddenPageLocator(page))
}

export async function hideDevTools(page: Page): Promise<void> {
  await test.step(`Hide dev tool if necessary`, async () => {

    const hideDevToolLocator = page.getByRole('link', {name: 'Hide »'})
    const showDevToolLocator = page.getByRole('link', { name: '«' })

    const devToolLocator = await getVisibleLocator(hideDevToolLocator, showDevToolLocator)

    if (devToolLocator === hideDevToolLocator) {
      await hideDevToolLocator.click();
    }
  })
}
