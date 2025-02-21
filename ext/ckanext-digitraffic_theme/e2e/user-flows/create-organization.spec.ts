import {IdentitysOptions, test} from '../fixtures/users'
import {Identity, User} from "../users/user";
import {OrganizationsListPage, NewOrganizationPage, OrganizationPage} from "../page-object-models";
import {Organization} from "../models/organization";

test.use({
  identitiesToUse: [[Identity.OrganizationAdmin], {scope: 'test'}]
} as IdentitysOptions);

test('Create organization as Organization admin', async ({ users }: {users: Map<Identity, User>}) => {
  const organizationAdmin = users.get(Identity.OrganizationAdmin);
  const organizationAdminPage = await organizationAdmin.createNewPage('orgAdmin')
  const homePageModel = await organizationAdmin.goToHomePage(organizationAdminPage)
  const organizationPageModel = await homePageModel.gotoOrganizationsListPage() as OrganizationsListPage
  const addOrganizationPageModel = await organizationPageModel.gotoNewOrganizationPage() as NewOrganizationPage
  const organizationModel = new Organization(
    "Test organization",
    "Description for the Test organization"
  )
  const newOrganizationPageModel = await addOrganizationPageModel.createOrganization(organizationModel) as OrganizationPage
})