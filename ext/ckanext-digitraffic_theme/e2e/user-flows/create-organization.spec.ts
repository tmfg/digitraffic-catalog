import {IdentitysOptions, test} from '../fixtures/users'
import {Identity, User} from "../users/user";

test.use({
  identitiesToUse: [[Identity.OrganizationAdmin], {scope: 'test'}]
} as IdentitysOptions);

test('Create organization as Organization admin', async ({ users }: {users: Map<Identity, User>}) => {
  const organizationAdmin = users.get(Identity.OrganizationAdmin);
  const organizationAdminPage = await organizationAdmin.createNewPage('orgAdmin')
  const homePageModel = await organizationAdmin.goToHomePage(organizationAdminPage);
  const organizationPageModel = await homePageModel.gotoOrganizationPage();
  //homePageModel.

})