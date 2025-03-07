/**
 * This module contains a fixture and other helpful tools relating to the fixture that makes it easier to write
 * tests with one or more users.
 */
import {test as base} from '@playwright/test';

import {User, Identity} from '../users/user'
// This import is here for the side effects.
import "../page-object-models";

export * from '@playwright/test';

type UserFixture = {
  users: Map<Identity, User>
}

export type IdentitysOptions = {
  identitiesToUse: Set<Identity>
  isUserInfoGathered: boolean
}

/**
 * Creates {@link User} objects that have the given {@link Identity} set.
 *
 * In order to use this fixture set the `identitiesToUse` before running the tests like so:
 * test.use({
 *   identitiesToUse: [[IDENTITY ...], {scope: 'test'}]
 * } as IdentitysOptions);
 *
 * @see User
 */
export const test = base.extend<UserFixture & IdentitysOptions>({
  identitiesToUse: [new Set([Identity.Anonymous]), {option: true}],
  isUserInfoGathered: true,
  users: async ({ browser, identitiesToUse , isUserInfoGathered}, use) => {
    let users: Map<Identity, User> = new Map()
    for (const identityToUse of identitiesToUse) {
      await base.step(`Creating user for identity ${identityToUse}`, async () => {
        const user = await User.of(identityToUse, browser, isUserInfoGathered)
        users.set(identityToUse, user)
      })
    }
    await use(users);
  },
});

export function getUserOrThrow(users: UserFixture["users"], identity: Identity): User {
  const user = users.get(identity)
  if (user !== undefined) {
    return user
  }
  throw Error(`${identity} is not found! Make sure you configured it included it in the identitiesToUse`)
}