import {test} from '../fixtures/users'
import {Identity, User} from '../users/user';

test.use({
  identitiesToUse: [new Set([Identity.OrganizationAdmin]), {scope: 'test'}]
});

test('Add dataset', async ({ users }: {users: Map<Identity, User>}) => {
  // TODO
})