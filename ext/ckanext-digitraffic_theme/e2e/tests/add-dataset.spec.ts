import {test} from '../fixtures/users'
import {Identity} from "../users/identity-user";

test.use({
  identitiesToUse: [new Set([Identity.OrganizationAdmin]), {scope: 'test'}]
});

test('Add dataset', async ({ users }) => {
  // TODO
})