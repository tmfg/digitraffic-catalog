import {URL} from "../page-object-models/pages-controller";

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError"
  }
}

export class UnexpectedPageError extends Error {
  constructor(expectedPage: URL, actualPage: string, hint: string = '') {
    super(`Expected page to be ${expectedPage}, but it was ${actualPage}. ${hint}`);
    this.name = "UnexpectedPageError"
  }
}