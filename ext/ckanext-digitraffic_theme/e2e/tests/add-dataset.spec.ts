import {IdentitysOptions, test} from '../fixtures/users'
import {Identity, User} from '../users/user';

test.use({
  identitiesToUse: [[Identity.OrganizationAdmin], {scope: 'test'}]
} as IdentitysOptions);

test('Add dataset', async ({ users }: {users: Map<Identity, User>}) => {
  // TODO
})