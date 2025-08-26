import { getKnownUserOrThrow, test } from '../fixtures/users'
import { Identity } from '../users/identity-user';
import { DatasetInfo, type PersonContactPoint, type PersonRightsHolder } from "../models/dataset-info";
import { Frequency } from "../../src/ts/model/frequency";
import { RegionalCoverage } from "../../src/ts/model/regional-coverage";
import { MOBILITY_THEME_TREE, TOP_MOBILITY_THEMES } from "../../src/ts/model/mobility-theme";
import { ResourceInfo } from "../models/resource-info";
import { FileFormat } from "../../src/ts/model/file-format";
import { MobilityDataStandard } from "../../src/ts/model/mobility-data-standard";
import { RightsType } from "../../src/ts/model/rights-type";
import { Theme } from "../../src/ts/model/theme";
import { TransportMode } from "../../src/ts/model/transport-mode";
import { Language } from "../../src/ts/model/language";
import { GeoreferencingMethod } from "../../src/ts/model/georeferencing-method";
import { NetworkCoverage } from "../../src/ts/model/network-coverage";
import { IntendedInformationService } from "../../src/ts/model/intended-information-service";
import { OrganizationEditorView } from "../user-views/organization-editor-view";
import { DatasetPage, NewResourcePage } from "../page-object-models";
import { ApplicationLayerProtocol } from "../../src/ts/model/application-layer-protocol";
import { DataGrammar } from "../../src/ts/model/data-grammar";
import { CharacterEncoding } from "../../src/ts/model/character-encoding";
import { CommunicationMethod } from "../../src/ts/model/communication-method";
import { LicenseId } from "../../src/ts/model/license-id";
import { OrganizationMemberView } from "../user-views/organization-member-view";

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationMember] as const

test.describe.serial('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), { scope: 'test' }],
    isUserInfoGathered: true
  });

  let firstDatasetName: string | undefined = undefined;
  let secondDatasetInfo: DatasetInfo | undefined = undefined;

  test('Add dataset with minimal required info', async ({ users }) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const organizationView = await OrganizationEditorView.of(organizationEditor)
    const newDatasetInfo = new DatasetInfo(
      'public', // Tests after this will depend on this dataset being 'public'
      'Test Dataset',
      Frequency.NEVER,
      RegionalCoverage.LAU_FI_005,
      Array.from(TOP_MOBILITY_THEMES)[0]!,
      'This is a test dataset description.'
    )
    const newResourceInfo = new ResourceInfo(
      'https://example.com/data.csv',
      FileFormat.FORMAT_CSV,
      MobilityDataStandard.DATEX_II,
      RightsType.LICENCE_PROVIDED,
    )
    firstDatasetName = newDatasetInfo.title;

    await organizationView
      .browseToNewDatasetPage()
      .then(datasetView => datasetView.fillNewDatasetInfo(newDatasetInfo))
      .then(datasetView => datasetView.saveDataset())
      .then(async resourceView => {
        await test.expect(resourceView.getPOM()).toBeInstanceOf(NewResourcePage)
        const newResourceInfoWithDatasetId = newResourceInfo.cloneWith({
          datasetId: resourceView.getPOM<NewResourcePage>().datasetId
        })
        return resourceView.fillNewResourceInfo(newResourceInfoWithDatasetId)
      })
      .then(resourceView => resourceView.saveResource())
      .then(async datasetView => {
        const datasetUrl = datasetView.getPage().url();
        await test.expect(datasetView.getPOM()).toBeInstanceOf(DatasetPage)
        await test.expect(datasetUrl).toMatch(/\/dataset\/[0-9a-fA-F-]+$/);
      })
  })

  test('Add dataset with all info', async ({ users }) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const organizationView = await OrganizationEditorView.of(organizationEditor)

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
        transportMode: [TransportMode.CAR, TransportMode.BIKE_HIRE],
        startTimestamp: new Date('2023-01-01T00:00:00Z'),
        endTimestamp: new Date('2023-12-31T23:59:00Z'),
        ianaTimezone: 'UTC',
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
        rightsHolders: [
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

    secondDatasetInfo = newDatasetInfo;

    const newResourceInfo = new ResourceInfo(
      'https://example.com/data.csv',
      FileFormat.FORMAT_CSV,
      MobilityDataStandard.DATEX_II,
      RightsType.LICENCE_PROVIDED,
      undefined, // datasetId will be set later
      {
        downloadUrl: 'https://example.com/download.csv',
        dataServices: [
          {
            title: 'Test Data Service',
            endpointUrl: 'https://example.com/service',
            description: 'This is a test data service.',
            endpointDescription: 'https://example.com/service-description'
          }
        ],
        name: 'Test Resource Name',
        description: 'This is a test resource description with all fields.',
        applicationLayerProtocol: ApplicationLayerProtocol.HTTPS,
        dataGrammar: DataGrammar.XSD,
        dataFormatNotes: 'No specific notes.',
        characterEncoding: CharacterEncoding.UTF_8,
        communicationMethod: CommunicationMethod.PULL,
        sample: 'https://example.com/sample.csv',
        licenceId: LicenseId.AGPL_3_0,
        startTimestamp: new Date('2023-01-01T00:00:00Z'),
        endTimestamp: new Date('2023-12-31T23:59:00Z'),
        ianaTimezone: 'UTC',
      }
    )

    await organizationView
      .browseToNewDatasetPage()
      .then(datasetView => datasetView.fillNewDatasetInfo(newDatasetInfo))
      .then(datasetView => datasetView.saveDataset())
      .then(async resourceView => {
        await test.expect(resourceView.getPOM()).toBeInstanceOf(NewResourcePage)
        const newResourceInfoWithDatasetId = newResourceInfo.cloneWith({
          datasetId: resourceView.getPOM<NewResourcePage>().datasetId
        })
        return resourceView.fillNewResourceInfo(newResourceInfoWithDatasetId)
      })
      .then(resourceView => resourceView.saveResource())
      .then(datasetView => {
        const datasetUrl = datasetView.getPage().url();
        test.expect(datasetView.getPOM()).toBeInstanceOf(DatasetPage)
        test.expect(datasetUrl).toMatch(/\/dataset\/[0-9a-fA-F-]+$/);
      })
  })

  test('View the created dataset', async ({ users }) => {
    const organizationMember = getKnownUserOrThrow(users, Identity.OrganizationMember)
    const organizationView = await OrganizationMemberView.of(organizationMember)

    if (secondDatasetInfo === undefined) {
      throw new Error('Second dataset info is not set. Ensure the previous test has run successfully.');
    }

    await organizationView.browseToDatasetPage(secondDatasetInfo.title)
      .then(datasetView => {
        secondDatasetInfo!.id = datasetView.getPOM<DatasetPage>().datasetId
        return datasetView.checkDatasetInfo(secondDatasetInfo!)
      }).then(datasetView => datasetView.checkRDFTurtleWorks())
  })
})