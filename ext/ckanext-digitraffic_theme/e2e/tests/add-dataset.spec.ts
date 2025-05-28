import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {browseToNewDatasetPage, setNewDatasetInfo} from "../user-flows/dataset";
import {assertIsSuccessfulResponse} from "../user-flows/util";
import {DatasetInfo} from "../models/dataset-info";
import {Frequency} from "../../src/ts/model/frequency";
import {RegionalCoverage} from "../../src/ts/model/regional-coverage";
import {TOP_MOBILITY_THEMES} from "../../src/ts/model/mobility-theme";

const identitiesToUse = [Identity.SysAdmin] as const

test.describe('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Add dataset info', async ({users}) => {
    const organizationAdmin = getKnownUserOrThrow(users, Identity.SysAdmin)

    const browseResponse = await browseToNewDatasetPage(organizationAdmin)
    assertIsSuccessfulResponse(browseResponse)
    const {pom: newDatasetPagePOM} = browseResponse
    const newDatasetInfo = new DatasetInfo(
      'private',
      'Test Dataset',
      [Frequency.ANNUAL, Frequency.AS_NEEDED],
      RegionalCoverage.LAU_FI_005,
      Array.from(TOP_MOBILITY_THEMES)[0]!,
      'This is a test dataset description.'
    )
    /*const newDatasetResponse = */
    await setNewDatasetInfo(organizationAdmin, newDatasetInfo, {
      page: newDatasetPagePOM.page,
      navigate: false
    })
    //assertIsSuccessfulResponse(newDatasetResponse)
  })
})