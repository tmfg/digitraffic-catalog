import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {browseToNewDatasetPage/*, setNewDatasetInfo*/} from "../user-flows/dataset";
import {assertIsSuccessfulResponse} from "../user-flows/util";

const identitiesToUse = [Identity.OrganizationAdmin] as const

test.describe('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Add dataset info', async ({users}) => {
    const organizationAdmin = getKnownUserOrThrow(users, Identity.OrganizationAdmin)

    const browseResponse = await browseToNewDatasetPage(organizationAdmin)
    assertIsSuccessfulResponse(browseResponse)
    /*const {pom: newDatasetPagePOM } = browseResponse
    const newDatasetResponse = await setNewDatasetInfo(organizationAdmin, newDatasetInfo, {
      page: newDatasetPagePOM.page,
      navigate: false
    })
    assertIsSuccessfulResponse(newDatasetResponse)*/
  })
})