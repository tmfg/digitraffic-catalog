import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {browseToNewDatasetPage, setNewDatasetInfo, setNewResourceInfo} from "../user-flows/dataset";
import {assertIsSuccessfulResponse} from "../user-flows/util";
import {DatasetInfo} from "../models/dataset-info";
import {Frequency} from "../../src/ts/model/frequency";
import {RegionalCoverage} from "../../src/ts/model/regional-coverage";
import {TOP_MOBILITY_THEMES} from "../../src/ts/model/mobility-theme";
import {ResourceInfo} from "../models/resource-info";
import {FileFormat} from "../../src/ts/model/file-format";
import {MobilityDataStandard} from "../../src/ts/model/mobility-data-standard";
import {RightsType} from "../../src/ts/model/rights-type";

const identitiesToUse = [Identity.OrganizationEditor] as const

test.describe('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  test('Add dataset with minimal required info', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)

    const browseResponse = await browseToNewDatasetPage(organizationEditor)
    assertIsSuccessfulResponse(browseResponse)
    const {pom: newDatasetPagePOM} = browseResponse

    // Create dataset with minimal required info
    const newDatasetInfo = new DatasetInfo(
      'private',
      'Test Dataset',
      [Frequency.NEVER],
      RegionalCoverage.LAU_FI_005,
      Array.from(TOP_MOBILITY_THEMES)[0]!,
      'This is a test dataset description.'
    )

    const newDatasetResponse = await setNewDatasetInfo(organizationEditor, newDatasetInfo, {
      page: newDatasetPagePOM.page,
      navigate: false
    })
    assertIsSuccessfulResponse(newDatasetResponse)

    // Create resource with minimal required info
    const newResourceInfo = new ResourceInfo(
      'https://example.com/data.csv',
      FileFormat.FORMAT_CSV,
      MobilityDataStandard.DATEX_II,
      RightsType.LICENCE_PROVIDED,
      newDatasetResponse.pom.datasetId
    )

    const newResourceResponse = await setNewResourceInfo(organizationEditor, newResourceInfo, {
      page: newDatasetResponse.pom.page,
      navigate: false
    })
    assertIsSuccessfulResponse(newResourceResponse)

    // Verify we've been redirected to the dataset view page
    const datasetUrl = newResourceResponse.pom.page.url();
    await test.expect(datasetUrl).toMatch(/\/dataset\/[0-9a-fA-F-]+$/);
  })
})