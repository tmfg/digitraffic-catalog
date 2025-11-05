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
import { Parser } from 'n3';
import * as rdf from "../rdf-helpers";

const identitiesToUse = [Identity.OrganizationEditor, Identity.OrganizationMember] as const

export async function createDataset(
  organizationEditor: any,
  datasetInfo: DatasetInfo,
  resourceInfo?: ResourceInfo
) {
  const organizationView = await OrganizationEditorView.of(organizationEditor);
  let datasetId = "";
  let datasetUrl = "";
  let datasetView;

  // Create dataset
  await organizationView
    .browseToNewDatasetPage()
    .then(view => datasetView = view)
    .then(view => view.fillNewDatasetInfo(datasetInfo))
    .then(view => view.saveDataset())
    .then(async resourceView => {
      await test.expect(resourceView.getPOM()).toBeInstanceOf(NewResourcePage);
      const id = resourceView.getPOM<NewResourcePage>().datasetId;
      if (!id) throw new Error("Dataset ID is undefined");
      datasetId = id;
      if (resourceInfo) {
        const resourceInfoWithDatasetId = resourceInfo.cloneWith({
          datasetId: datasetId
        });
        return resourceView.fillNewResourceInfo(resourceInfoWithDatasetId)
          .then(view => view.saveResource());
      } else {
        return resourceView;
      }
    })
    .then(async view => {
      datasetView = view;
      datasetUrl = view.getPage().url();
      await test.expect(view.getPOM()).toBeInstanceOf(DatasetPage);
      await test.expect(datasetUrl).toMatch(/\/dataset\/[0-9a-fA-F-]+$/);
    });

  return {
    datasetId,
    datasetUrl,
    datasetView,
    datasetInfo
  };
}

test.describe.serial('Add new dataset', () => {
  test.use({
    identitiesToUse: [new Set(identitiesToUse), { scope: 'test' }],
    isUserInfoGathered: true
  });

  let firstDatasetName: string | undefined = undefined;
  let secondDatasetInfo: DatasetInfo | undefined = undefined;

  test('Add dataset with minimal required info', async ({ users }) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)
    const newDatasetInfo = new DatasetInfo(
      'public', // Tests after this will depend on this dataset being 'public'
      'Test Dataset',
      Frequency.NEVER,
      new Set([RegionalCoverage.LAU_FI_005]),
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

    const result = await createDataset(
      organizationEditor,
      newDatasetInfo,
      newResourceInfo
    );

  })

  test('Add dataset with all info', async ({ users }) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor)

    const topMobilityTheme = "https://w3id.org/mobilitydcat-ap/mobility-theme/dynamic-traffic-signs-and-regulations";
    if (firstDatasetName === undefined) {
      throw new Error('First dataset ID is not set. Ensure the previous test has run successfully.');
    }
    const newDatasetInfo = new DatasetInfo(
      'public',
      'Test Dataset Full Info',
      Frequency.DAILY,
      new Set([RegionalCoverage.LAU_FI_005, RegionalCoverage.LAU_FI_009]),
      topMobilityTheme,
      'This is a test dataset description with all fields.',
      undefined,
      {
        dataContentSubCategory: MOBILITY_THEME_TREE[topMobilityTheme][0],
        theme: Theme.TRAN,
        transportMode: [TransportMode.CAR, TransportMode.BIKE_HIRE],
        startTimestamp: new Date('2023-01-01T00:00:00+0200'),
        endTimestamp: new Date('2023-12-31T23:59:00+0200'),
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
        isReferencedBy: [],
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
        startTimestamp: new Date('2023-01-01T00:00:00+0200'),
        endTimestamp: new Date('2023-12-31T23:59:00+0200'),
        ianaTimezone: 'Europe/Helsinki',
      }
    )

    const result = await createDataset(
      organizationEditor,
      newDatasetInfo,
      newResourceInfo
    );
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


  test('View the first created dataset for is_referenced_by value', async ({ users }) => {
    const organizationMember = getKnownUserOrThrow(users, Identity.OrganizationMember)
    const organizationView = await OrganizationMemberView.of(organizationMember)

    if (firstDatasetName === undefined) {
      throw new Error('First dataset name is not set. Ensure the previous tests have run successfully.');
    }
    if (secondDatasetInfo === undefined) {
      throw new Error('Second dataset info is not set. Ensure the previous tests have run successfully.');
    }

    await organizationView.browseToDatasetPage(firstDatasetName)
      .then(async datasetView => {
        const referencedBy = await datasetView.getPOM<DatasetPage>().isReferencedBy.textContent()
        test.expect(referencedBy?.trim()).toContain(secondDatasetInfo!.id);
      })
  })

  test('Edit dataset and verify all properties persist', async ({ users }) => {
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor);
    const organizationView = await OrganizationEditorView.of(organizationEditor);

    if (!secondDatasetInfo) {
      throw new Error('Second dataset info is not set. Ensure the previous test has run successfully.');
    }
    if (!secondDatasetInfo.id) {
      throw new Error('Dataset ID not set.');
    }
    await organizationView
      .gotoDatasetEditPage(secondDatasetInfo.id)
      .then(datasetView => {
        return datasetView.saveDatasetChanges();
      })

    await organizationView.browseToDatasetPage(secondDatasetInfo.title).then(datasetView => {
      secondDatasetInfo!.id = datasetView.getPOM<DatasetPage>().datasetId
      return datasetView.checkDatasetInfo(secondDatasetInfo!)
    });
  });

  test('Metadata completeness check', async ({ users }) => {
    if (secondDatasetInfo === undefined) {
      throw new Error('Second dataset info is not set. Ensure the previous test has run successfully.');
    }
    const organizationEditor = getKnownUserOrThrow(users, Identity.OrganizationEditor);
    const organizationView = await OrganizationEditorView.of(organizationEditor);
    await organizationView.browseToDatasetPage(secondDatasetInfo.title).then(async datasetView => {
      const pom = datasetView.getPOM<DatasetPage>();
      await pom.openRDFTurtleToNewPage();
      const [rdfPageName, rdfPage] = await datasetView.getUser().getRecentlyOpenedPage();
      await rdfPage.bringToFront()
      const serializedRDF = await rdfPage.textContent('body pre');
      const rdfQuads = (new Parser()).parse(serializedRDF!)

      // All Dataset properties according to mobilityDCAT-AP specification
      const datasetProperties = new Set<string>([
        // Mandatory properties
        rdf.RDF.type,
        rdf.DCT.description,
        rdf.DCAT.distribution,
        rdf.DCT.accrualPeriodicity,
        rdf.MOBILITYDCATAP.mobilityTheme,
        rdf.DCT.spatial,
        rdf.DCT.title,
        rdf.DCT.publisher,

        // Recommended properties
        rdf.MOBILITYDCATAP.georeferencingMethod,
        rdf.DCAT.contactPoint,
        // rdf.DCAT.keyword, According to the spec keywords should not be used
        rdf.MOBILITYDCATAP.networkCoverage,
        rdf.DCT.conformsTo,
        rdf.DCT.rightsHolder,
        rdf.DCAT.theme,
        rdf.DCT.temporal,
        rdf.MOBILITYDCATAP.transportMode,

        // Optional properties
        // rdf.DCATAP.applicableLegislation, Applicable legislation is not used
        rdf.MOBILITYDCATAP.assessmentResult,
        //rdf.DCT.hasVersion, Version info is collected but there is no linking between versions, yet.
        rdf.DCT.identifier,
        // rdf.DCT.isReferencedBy, This is included in the dataset as well in the metadata, but this particular dataset is not referenced by any other dataset.
        //rdf.DCT.isVersionOf, , Version info is collected but there is no linking between versions, yet.
        rdf.MOBILITYDCATAP.intendedInformationService,
        rdf.DCT.language,
        // rdf.ADMS.identifier, Datasets don't have additional identifiers
        rdf.DCT.relation,
        //rdf.DCT.issued, According to the spec issued date should not be used. Instead, Catalogue Record's "created" date is used.
        //rdf.DCT.modified, This refers to the modification date of the actual data. Cases where the data is changing constantly, this metadata is redundant. We are not asking for it in the dataset metadata.
        rdf.OWL.versionInfo,
        rdf.ADMS.versionNotes,
        rdf.DQV.hasQualityAnnotation,
      ]);

      const datasetSubject = rdfQuads.find(quad => quad.predicate.value === rdf.RDF.type && quad.object.value === rdf.DCAT.Dataset)?.subject.value;
      test.expect(datasetSubject, 'Dataset subject not found in RDF data').toBeDefined();

      for (const property of datasetProperties) {
        const hasProperty = rdfQuads.some(quad => quad.subject.value === datasetSubject && quad.predicate.value === property);
        test.expect(hasProperty, `Dataset is missing property: ${property}`).toBeTruthy();
      }

      // All Distribution properties according to mobilityDCAT-AP specification
      const distributionProperties = new Set<string>([
        // Mandatory properties
        rdf.RDF.type,
        rdf.DCAT.accessURL,
        rdf.MOBILITYDCATAP.mobilityDataStandard,
        rdf.DCT.format,
        rdf.DCT.rights,

        // Recommended properties
        rdf.MOBILITYDCATAP.applicationLayerProtocol,
        rdf.DCT.description,
        rdf.DCT.license,

        // Optional properties
        rdf.DCAT.accessService,
        rdf.CNT.characterEncoding,
        rdf.MOBILITYDCATAP.communicationMethod,
        rdf.MOBILITYDCATAP.dataFormatNotes,
        rdf.DCAT.downloadURL,
        rdf.MOBILITYDCATAP.grammar,
        rdf.ADMS.sample,
        rdf.DCT.temporal,
        rdf.DCT.title,
      ]);

      const distributionSubjects = rdfQuads
        .filter(quad => quad.predicate.value === rdf.RDF.type && quad.object.value === rdf.DCAT.Distribution)
        .map(quad => quad.subject.value);

      test.expect(distributionSubjects.length, 'No Distribution found in RDF data').toBeGreaterThan(0);

      for (const distributionSubject of distributionSubjects) {
        for (const property of distributionProperties) {
          const hasProperty = rdfQuads.some(quad => quad.subject.value === distributionSubject && quad.predicate.value === property);
          test.expect(hasProperty, `Distribution ${distributionSubject} is missing property: ${property}`).toBeTruthy();
        }
      }

      await datasetView.getPage().bringToFront()
      await datasetView.getUser().removePage(rdfPageName)
    });
  })
})
