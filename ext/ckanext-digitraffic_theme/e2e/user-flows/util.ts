import type {BasePage} from "../page-object-models/base";
import type {Page} from "@playwright/test";

export interface SuccessfulUserFlowResponse<T extends BasePage> {
  pom: T
}

export interface UnsuccessfulUserFlowResponse {
  pom?: BasePage,
  error: Error
}

export type UserFlowResponse<T extends BasePage> = SuccessfulUserFlowResponse<T> | UnsuccessfulUserFlowResponse

export function isSuccessfulResponse<T extends BasePage>(response: UserFlowResponse<T>): response is SuccessfulUserFlowResponse<T> {
  return (response as UnsuccessfulUserFlowResponse)?.error === undefined
}

export function assertIsSuccessfulResponse<T extends BasePage>(response: UserFlowResponse<T>): asserts response is SuccessfulUserFlowResponse<T> {
  if (!isSuccessfulResponse<T>(response)) {
    throw new Error('Is not a successfull response')
  }
}


export type UserFlowOptions = {
  page?: Page
  navigate?: false | undefined
} | {
  page: Page,
  navigate: true
}