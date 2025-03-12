import {type Locator, type Page, test} from "@playwright/test";

export type CancellableLocatorCheck = {
  locator: Promise<Locator>,
  cancel: () => void
}

export class CancellationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CancellationError"
  }
}

function cancellableWaitFor(locator: Locator): {cancel: () => void, locatorToBeVisible: Promise<Locator>} {
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
  }
  const locatorToBeVisible = new Promise<Locator>(async (resolve, reject) => {
    let totalTimeWaited = 0
    while (totalTimeWaited < 1000) {
      if (isCancelled) {
        reject(new CancellationError("Waiting for locator was cancelled"))
        break
      }
      const isVisible = await locator.isVisible()
      if (isVisible) {
        resolve(locator)
        break
      }
      setTimeout(() => {
      }, 50)
      totalTimeWaited += 50
    }
    reject("Locator is not visible")
  })
  return {
    cancel,
    locatorToBeVisible
  }
}

export async function isVisible(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({timeout: 1000})
    return true
  } catch (e) {
    return false
  }
}

export function cancellableIsVisible(locator: Locator): CancellableLocatorCheck {
  const {cancel, locatorToBeVisible} = cancellableWaitFor(locator)
  return {
    cancel,
    locator: locatorToBeVisible.then(() => locator)
  }
}

export async function findVisibleLocator(...locators: Locator[]):Promise<Locator | undefined> {
  return await test.step('Find Visible Locator', async () => {
    const inspectLocatorsVisible = locators.map(locator => cancellableWaitFor(locator))
    const cancelAll = () => {
      for (const {cancel} of inspectLocatorsVisible) {
        cancel()
      }
    }
    const visibleLocator = await Promise.race(inspectLocatorsVisible
      .map(({ locatorToBeVisible }) => locatorToBeVisible))
    cancelAll()
    return visibleLocator
  })
}

export async function getVisibleLocator(...locators: Locator[]):Promise<Locator> {
  const foundLocator = await findVisibleLocator(...locators)

  if (foundLocator === undefined) {
    throw Error("Couldn't find any Locators")
  }
  return foundLocator
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

export function getForbiddenPageLocator(page: Page):Locator {
  return page.getByRole('heading', {name: '403 Forbidden'})
}

export async function isAtForbiddenPage(page: Page): Promise<boolean> {
  return await isVisible(getForbiddenPageLocator(page))
}

/**
 * Given a type (class with properties) returns a type with the optional properties removed
 */
export type CompulsoryProperties<Type> = {
  [Property in keyof Type as undefined extends Type[Property] ? never : Property]: Type[Property]
};