/**
 * This module contains a fixture and other helpful tools relating to the fixture that makes it easier to write
 * tests with one or more users.
 */
import {test as base} from '@playwright/test';

import {User} from '../users/user'
// This import is here for the side effects.
import "../page-object-models";
import "../user-views/mixins";
import {IdentityUser, Identity} from "../users/identity-user"
import {KnownUser} from "../users/known-user";

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
    base.setTimeout(60000)
    let users: Map<Identity, User> = new Map()
    for (const identityToUse of identitiesToUse) {
      await base.step(`Creating user for identity ${identityToUse}`, async () => {
        if (identityToUse !== Identity.Anonymous) {
          const user = await (isUserInfoGathered ? KnownUser.of(identityToUse, browser) : IdentityUser.of(identityToUse, browser))
          users.set(identityToUse, user)
        } else {
          throw new Error(`Anonymous user is not supported in this fixture. Please use KnownUser or IdentityUser instead.`)
          /*const browserContext = await browser.newContext()
          const defaultPage = await browserContext.newPage();
          const anonymousUser = new User(browserContext, defaultPage)
          users.set(identityToUse, anonymousUser)*/
        }
      })
    }
    await use(users);
    // Cleanup
    console.log(`Cleaning up users: ${Array.from(users.keys()).join(', ')}`);
    for (const user of users.values()) {
      await user.exit();
    }
  },
});

export function getUserOrThrow(users: UserFixture["users"], identity: Identity): User {
  const user = users.get(identity)
  if (user !== undefined) {
    return user
  }
  throw Error(`${identity} is not found! Make sure you configured it included it in the identitiesToUse`)
}

export function getIdentityUserOrThrow(users: UserFixture["users"], identity: Identity): IdentityUser {
  const user = getUserOrThrow(users, identity)
  if (user instanceof IdentityUser) {
    return user
  }
  throw Error(`Tried to get an anonymous user when known user was neede`)
}

export function getKnownUserOrThrow(users: UserFixture["users"], identity: Identity): KnownUser {
  const user = getUserOrThrow(users, identity)
  if (user instanceof KnownUser) {
    return user
  }
  throw Error(`Tried to get an anonymous user when known user was neede`)
}
