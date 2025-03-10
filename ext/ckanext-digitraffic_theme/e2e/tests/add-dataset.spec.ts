import {test} from '../fixtures/users'

test.use({
  identitiesToUse: [new Set([Identity.OrganizationAdmin]), {scope: 'test'}]
});

test('Add dataset', async ({ users }) => {
  // TODO
})