import {type Locator, type Page, test} from "@playwright/test";

export async function isVisible(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({timeout: 1000})
    return true
  } catch (e) {
    return false
  }
}

export async function findVisibleLocator(...locators: Locator[]):Promise<Locator | undefined> {
  return await test.step('Find Visible Locator', async () => {
    let isCancelled = false
    const cancelAll = () => {
      isCancelled = true
    }
    const inspectLocatorsVisible = locators.map(async locator => {
      return new Promise<Locator>(async (resolve, reject) => {
        let totalTimeWaited = 0
        while (totalTimeWaited < 1000) {
          if (isCancelled) {
            reject("Cancelled")
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
      /*if (await isVisible(locator)) {
        return locator
      }
      return undefined*/
    })
    const visibleLocator = await Promise.race(inspectLocatorsVisible)
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

/**
 * Given a type (class with properties) returns a type with the optional properties removed
 */
export type CompulsoryProperties<Type> = {
  [Property in keyof Type as undefined extends Type[Property] ? never : Property]: Type[Property]
};