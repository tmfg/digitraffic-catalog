import {BasePage} from "./base";
import {URL, getPom} from "./pages-controller"
import {Page} from "@playwright/test";
import {param} from "jquery";

export async function gotoNewPage<T extends BasePage>(
  page: Page,
  url: URL,
  navigationFn: (newPagePOM: T) => Promise<void>,
  ...pomParameters
): Promise<T> {
  const newPageConstructor = getPom(url)
  const newPagePOM = new newPageConstructor(page, ...pomParameters) as T

  await navigationFn(newPagePOM)

  await newPagePOM.assertPage()
  return newPagePOM
}

export function pathParameterURL(url: URL, parameters: {[name: string]: number|string}): string {
  console.log("PARAMETERS")
  console.log(parameters)
  return Object.entries(parameters).reduce(
    (resolvedUrl, [parameterName, parameterValue]) => resolvedUrl.replace(`{${parameterName}}`, parameterValue.toString()),
    url
  )
}
