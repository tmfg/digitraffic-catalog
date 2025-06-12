import {getKnownUserOrThrow, test} from '../fixtures/users'
import {Identity} from '../users/identity-user';
import {browseToNewDatasetPage, setNewDatasetInfo, setNewResourceInfo} from "../user-flows/dataset";
import {assertIsSuccessfulResponse} from "../user-flows/util";
import {DatasetInfo, type PersonContactPoint, type PersonRightsHolder} from "../models/dataset-info";
import {Frequency} from "../../src/ts/model/frequency";
import {RegionalCoverage} from "../../src/ts/model/regional-coverage";
import {MOBILITY_THEME_TREE, TOP_MOBILITY_THEMES} from "../../src/ts/model/mobility-theme";
import {ResourceInfo} from "../models/resource-info";
import {FileFormat} from "../../src/ts/model/file-format";
import {MobilityDataStandard} from "../../src/ts/model/mobility-data-standard";
import {RightsType} from "../../src/ts/model/rights-type";
import {Theme} from "../../src/ts/model/theme";
import {TransportMode} from "../../src/ts/model/transport-mode";
import {Language} from "../../src/ts/model/language";
import {GeoreferencingMethod} from "../../src/ts/model/georeferencing-method";
import {NetworkCoverage} from "../../src/ts/model/network-coverage";
import {IntendedInformationService} from "../../src/ts/model/intended-information-service";

const identitiesToUse = [Identity.OrganizationEditor] as const

test.describe.serial('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), {scope: 'test'}],
    isUserInfoGathered: true
  });

  let firstDatasetName: string | undefined = undefined;

  test('Add dataset with minimal required info', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)

    const browseResponse = await browseToNewDatasetPage(organizationEditor)
    assertIsSuccessfulResponse(browseResponse)
    const {pom: newDatasetPagePOM} = browseResponse

    // Create dataset with minimal required info
    const newDatasetInfo = new DatasetInfo(
      'public', // Tests after this will depend on this dataset being 'public'
      'Test Dataset',
      Frequency.NEVER,
      RegionalCoverage.LAU_FI_005,
      Array.from(TOP_MOBILITY_THEMES)[0]!,
      'This is a test dataset description.'
    )

    firstDatasetName = newDatasetInfo.title;

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

  test('Add dataset with all info', async ({users}) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)

    const newDatasetPagePOM = await organizationEditor.gotoNewDatasetPage()

    const topMobilityTheme = "https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations";
    if (firstDatasetName === undefined) {
        throw new Error('First dataset ID is not set. Ensure the previous test has run successfully.');
    }
    const newDatasetInfo = new DatasetInfo(
      'public',
      'Test Dataset Full Info',
      Frequency.DAILY,
      RegionalCoverage.LAU_FI_005,
      topMobilityTheme,
      'This is a test dataset description with all fields.',
      undefined,
      {
        dataContentSubCategory: MOBILITY_THEME_TREE[topMobilityTheme][0],
        theme: Theme.TRAN,
        transportMode: TransportMode.CAR,
        startTimestamp: new Date('2023-01-01T00:00:00Z'),
        endTimestamp: new Date('2023-12-31T23:59:59Z'),
        ianaTimezone: 'Europe/Helsinki',
        contactPoints: [
          {
            type: 'http://www.w3.org/2006/vcard/ns#Organization',
            fullName: 'Test Organization',
            email: 'org@example.com',
            telephone: '+358401234567',
            url: 'https://org.example.com',
            streetAddress: 'Testikatu 1',
            locality: 'Helsinki',
            postalCode: '00100',
            region: 'Uusimaa',
            countryName: 'Suomi'
          },
          {
            type: 'http://www.w3.org/2006/vcard/ns#Individual',
            fullName: 'Test Person',
            email: 'person@example.com',
            telephone: '+358402345678',
            url: 'https://person.example.com',
            streetAddress: 'Henkilökatu 2',
            locality: 'Espoo',
            postalCode: '02100',
            region: 'Uusimaa',
            countryName: 'Suomi',
            organizationName: 'Test Organization'
          } as PersonContactPoint
        ],
        version: '1.0.0',
        versionNotes: 'Initial version.',
        assessments: [
          {
            date: new Date('2023-06-01'),
            urlToResult: 'https://example.com/assessment-result'
          }
        ],
        language: Language.ENG,
        georeferencingMethod: GeoreferencingMethod.OTHER,
        networkCoverage: NetworkCoverage.MOTORWAYS,
        spatialReferenceSystem: 4326,
        intendedInformationService: IntendedInformationService.LOCATION_SEARCH,
        urlToQualityDescription: 'https://example.com/quality-description',
        relatedDatasets: [firstDatasetName],
        rights_holders: [
          {
            type: 'http://purl.org/adms/publishertype/Company',
            name: 'Test Company',
            email: 'company@example.com',
            phone: '+358403456789',
            streetAddress: 'Yrityskatu 3',
            city: 'Vantaa',
            postalCode: '01300',
            region: 'Uusimaa',
            countryName: 'Suomi'
          },
          {
            type: 'http://purl.org/adms/publishertype/PrivateIndividual(s)',
            name: 'Test Individual',
            email: 'individual@example.com',
            phone: '+358404567890',
            streetAddress: 'Yksilökatu 4',
            city: 'Tampere',
            postalCode: '33100',
            region: 'Pirkanmaa',
            countryName: 'Suomi',
            firstName: 'Test',
            surname: 'Individual',
            workplaceHomepage: 'https://workplace.example.com',
            organizationName: 'Test Org'
          } as PersonRightsHolder
        ]
      }
    );

    const newDatasetResponse = await setNewDatasetInfo(organizationEditor, newDatasetInfo, {
      page: newDatasetPagePOM.page,
      navigate: false
    })
    assertIsSuccessfulResponse(newDatasetResponse)


  })
})