import type {BasePage} from "../page-object-models/base";
import type {Page} from "@playwright/test";

export interface SuccessfulUserFlowResponse<T extends BasePage> {
  pom: T
}

export interface FailedUserFlowResponse<T extends BasePage> {
  pom?: T,
  error: Error
}

export type UserFlowResponse<T extends BasePage> = SuccessfulUserFlowResponse<T> | FailedUserFlowResponse<T>

export function isSuccessfulResponse<T extends BasePage>(response: UserFlowResponse<T>): response is SuccessfulUserFlowResponse<T> {
  return (response as FailedUserFlowResponse<T>)?.error === undefined
}

export function assertIsSuccessfulResponse<T extends BasePage>(response: UserFlowResponse<T>): asserts response is SuccessfulUserFlowResponse<T> {
  if (!isSuccessfulResponse<T>(response)) {
    throw new Error('Is not a successful response')
  }
}

export function assertIsFailedResponse<T extends BasePage>(response: UserFlowResponse<T>): asserts response is FailedUserFlowResponse<T> {
  if (isSuccessfulResponse<T>(response)) {
    throw new Error('Is not a failed response')
  }
}


export type UserFlowOptions = {
  page?: Page
  navigate?: false | undefined
} | {
  page: Page,
  navigate: true
}