import type { Locator, Page } from "@playwright/test";
import { BasePage, type JSLoadedInterface } from './base';
import { setPom, URL } from "./pages-controller";
import {
  type Assessment,
  type ContactPoint,
  type DatasetInfo,
  isPersonContactPoint,
  isPersonRightsHolder,
  type RightsHolder
} from '../models/dataset-info';
import { dateToDateAndTimeString, getNewestRepeatingFieldGroupIndex, getRepeatingFieldGropField, gotoNewPage } from "./util";
import { NewResourcePage } from "./new-resource-page";
import { transportModeLabels } from "../../src/ts/model/transport-mode";
import { regionalCoverageLabels } from "../../src/ts/model/regional-coverage";

export class NewDatasetPage extends BasePage implements JSLoadedInterface<NewDatasetPage> {
  readonly visibilityFields: Locator
  readonly visibilityFieldPublic: Locator
  readonly visibilityFieldPrivate: Locator
  readonly titleField: Locator
  readonly frequencyField: Locator
  readonly regionalCoverageField: Locator
  readonly dataContentCategoryField: Locator
  readonly descriptionField: Locator
  readonly saveButton: Locator
  readonly dataContentSubCategoryField: Locator
  readonly themeField: Locator
  readonly transportModeField: Locator
  readonly startDateField: Locator
  readonly startTimeField: Locator
  readonly endDateField: Locator
  readonly endTimeField: Locator
  readonly additionalInformationGroup: Locator
  readonly generallInformationGroup: Locator
  readonly ianaTimezoneField: Locator
  readonly addContactPointButton: Locator
  readonly versionField: Locator
  readonly versionNotesField: Locator
  readonly addAssessmentButton: Locator
  readonly languageField: Locator
  readonly georeferencingMethodField: Locator
  readonly networkCoverageField: Locator
  readonly spatialReferenceSystemField: Locator
  readonly intendedInformationServiceField: Locator
  readonly urlToQualityDescriptionField: Locator
  readonly relatedDatasetField: Locator
  readonly addRightsHolderButton: Locator
  readonly contactPointGroup: Locator;
  readonly assessmentGroup: Locator;
  readonly rightsHolderGroup: Locator;

  constructor(page: Page) {
    super(page, [page.getByRole('heading', { name: 'Yleiset' }), page.getByRole('heading', { name: 'Versiointi' })]);
    this.visibilityFields = page.locator('.control-group:has([for="field-private"])');
    this.visibilityFieldPublic = this.visibilityFields.getByLabel('Julkinen');
    this.visibilityFieldPrivate = this.visibilityFields.getByLabel('Organisaation jäsenille');
    this.titleField = page.getByLabel('Nimike englanniksi')
    this.frequencyField = page.getByLabel('* Päivitysten tiheys');
    this.regionalCoverageField = page.locator('#field-spatial').getByRole('combobox');
    this.dataContentCategoryField = page.getByLabel('* Kategoria');
    this.descriptionField = page.getByLabel('Kuvaus englanniksi');
    this.saveButton = page.getByRole('button', { name: 'Seuraava: Lisää dataa' });
    this.dataContentSubCategoryField = page.getByLabel('Alakategoria');
    this.themeField = page.getByLabel('Aihe');
    this.transportModeField = page.locator('#field-transport_mode').getByRole('combobox');
    this.startDateField = page.getByLabel('Alkamisaika');
    this.startTimeField = page.locator('.datetime-row', { has: this.startDateField }).getByLabel('Kellonaika');
    this.endDateField = page.getByLabel('Päättymisaika');
    this.endTimeField = page.locator('.datetime-row', { has: this.endDateField }).getByLabel('Kellonaika');
    this.ianaTimezoneField = page.getByLabel('Aikavyöhyke').filter({ visible: true });
    this.additionalInformationGroup = page.locator(
      '.field-group',
      { has: page.getByRole('heading', { name: 'Lisätiedot' }) })
    this.generallInformationGroup = page.locator(
      '.field-group',
      { has: page.getByRole('heading', { name: 'Yleiset' }) })
    this.contactPointGroup = page.locator('.field-group')
      .filter({ has: page.getByRole('heading', { name: 'Yhteyspisteet' }) })
    this.addContactPointButton = this.contactPointGroup.getByRole('link', { name: 'Lisää' });
    this.versionField = page.getByLabel('Tietoaineiston versio');
    this.versionNotesField = page.getByLabel('Version tiedot englanniksi');
    this.assessmentGroup = page.locator(
      '.field-group',
      { has: page.getByRole('heading', { name: 'Arvio' }) })
    this.addAssessmentButton = this.assessmentGroup
      .getByRole('link', { name: 'Lisää' });
    this.languageField = page.getByLabel('Kieli');
    this.georeferencingMethodField = page.getByLabel('Georeferointitapa');
    this.networkCoverageField = page.getByLabel('Liikenneverkko');
    this.spatialReferenceSystemField = page.getByLabel('Paikkaviittausjärjestelmä');
    this.intendedInformationServiceField = page.getByLabel('Hyödyntävä tietopalvelu');
    this.urlToQualityDescriptionField = page.getByLabel('Julkaisijan kuvaus laadusta');
    this.relatedDatasetField = page.locator('#field-related_resource').getByRole('combobox');
    this.rightsHolderGroup = page.locator(
      '.field-group',
      { has: page.getByRole('heading', { name: 'Oikeuksien haltijat' }) })
    this.addRightsHolderButton = this.rightsHolderGroup
      .getByRole('link', { name: 'Lisää' });
  }

  async goto(): Promise<NewDatasetPage> {
    await this.page.goto(URL.NewDataset);
    await this.assertPage();
    return this;
  }

  async getDatasetInfo(): Promise<DatasetInfo> {
    throw new Error("Method not implemented");
  }

  async ensurePageJsLoaded<NewDatasetPage>(): Promise<NewDatasetPage> {
    await this.page.waitForLoadState("networkidle");

    await this.page.waitForFunction(() => {
      return customElements.get("fds-dropdown") !== undefined;
    });

    const count = await this.page.locator("fds-dropdown").count();
    await Promise.all(
      Array.from({ length: count }, (_, i) =>
        this.page.locator("fds-dropdown").nth(i).waitFor({ state: "attached" })
      )
    );

    return this as unknown as NewDatasetPage;
  }

  async fillForm(datasetInfo: DatasetInfo) {
    if (datasetInfo.visibility === "public") {
      await this.visibilityFieldPublic.check();
    }
    if (datasetInfo.visibility === "private") {
      await this.visibilityFieldPrivate.check();
    }
    await this.titleField.fill(datasetInfo.title)
    await this.frequencyField.selectOption(datasetInfo.frequency)
    for (const iri of datasetInfo.regionalCoverage) {
      await this.addRegionalCoverage(regionalCoverageLabels[iri]);
    }
    await this.dataContentCategoryField.selectOption(datasetInfo.dataContentCategory)
    await this.descriptionField.fill(datasetInfo.description)
    if (datasetInfo.optionalValues?.dataContentSubCategory) {
      await this.dataContentSubCategoryField.selectOption(datasetInfo.optionalValues.dataContentSubCategory);
    }
    if (datasetInfo.optionalValues?.theme) {
      await this.themeField.selectOption(datasetInfo.optionalValues.theme);
    }
    if (datasetInfo.optionalValues?.transportMode) {
      for (const transportMode of datasetInfo.optionalValues.transportMode) {
        await this.addTransportMode(transportModeLabels[transportMode]);
      }
    }
    if (datasetInfo.optionalValues?.startTimestamp) {
      const { date, time } = dateToDateAndTimeString(datasetInfo.optionalValues.startTimestamp);
      await this.startDateField.fill(date);
      await this.startTimeField.fill(time);
    }
    if (datasetInfo.optionalValues?.endTimestamp) {
      const { date, time } = dateToDateAndTimeString(datasetInfo.optionalValues.endTimestamp);
      await this.endDateField.fill(date);
      await this.endTimeField.fill(time);
    }
    if (datasetInfo.optionalValues?.ianaTimezone) {
      await this.ianaTimezoneField.selectOption(datasetInfo.optionalValues.ianaTimezone);
    }
    if (datasetInfo.optionalValues?.contactPoints) {
      for (const contactPoint of datasetInfo.optionalValues.contactPoints) {
        await this.addContactPoint(contactPoint);
      }
    }
    if (datasetInfo.optionalValues?.version) {
      await this.versionField.fill(datasetInfo.optionalValues.version);
    }
    if (datasetInfo.optionalValues?.versionNotes) {
      await this.versionNotesField.fill(datasetInfo.optionalValues.versionNotes);
    }
    if (datasetInfo.optionalValues?.assessments) {
      for (const assessment of datasetInfo.optionalValues.assessments) {
        await this.addAssessment(assessment);
      }
    }
    if (datasetInfo.optionalValues?.language) {
      await this.languageField.selectOption(datasetInfo.optionalValues.language);
    }
    if (datasetInfo.optionalValues?.georeferencingMethod) {
      await this.georeferencingMethodField.selectOption(datasetInfo.optionalValues.georeferencingMethod);
    }
    if (datasetInfo.optionalValues?.networkCoverage) {
      await this.networkCoverageField.selectOption(datasetInfo.optionalValues.networkCoverage);
    }
    if (datasetInfo.optionalValues?.spatialReferenceSystem) {
      await this.spatialReferenceSystemField.fill(datasetInfo.optionalValues.spatialReferenceSystem.toString());
    }
    if (datasetInfo.optionalValues?.intendedInformationService) {
      await this.intendedInformationServiceField.selectOption(datasetInfo.optionalValues.intendedInformationService);
    }
    if (datasetInfo.optionalValues?.urlToQualityDescription) {
      await this.urlToQualityDescriptionField.fill(datasetInfo.optionalValues.urlToQualityDescription);
    }
    if (datasetInfo.optionalValues?.relatedDatasets) {
      for (const relatedDataset of datasetInfo.optionalValues.relatedDatasets) {
        await this.addRelatedDataset(relatedDataset);
      }
    }
    if (datasetInfo.optionalValues?.rightsHolders) {
      for (const rightsHolder of datasetInfo.optionalValues.rightsHolders) {
        await this.addRightsHolder(rightsHolder);
      }
    }
  }

  async addContactPoint(contactPoint: ContactPoint): Promise<void> {
    await this.addContactPointButton.click();
    const newContactPointIndex = await getNewestRepeatingFieldGroupIndex(this.contactPointGroup)
    await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Yhteyspisteen tyyppi')).selectOption(contactPoint.type);
    await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Koko nimi')).fill(contactPoint.fullName);
    await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Sähköposti')).fill(contactPoint.email);
    if (contactPoint.telephone) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Puhelinnumero')).fill(contactPoint.telephone);
    }
    if (contactPoint.url) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Verkkosivu')).fill(contactPoint.url);
    }
    if (contactPoint.streetAddress) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Katuosoite')).fill(contactPoint.streetAddress);
    }
    if (contactPoint.locality) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Kaupunki')).fill(contactPoint.locality);
    }
    if (contactPoint.postalCode) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Postinumero')).fill(contactPoint.postalCode);
    }
    if (contactPoint.region) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Alue')).fill(contactPoint.region);
    }
    if (contactPoint.countryName) {
      await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Maa')).selectOption(contactPoint.countryName);
    }
    if (isPersonContactPoint(contactPoint)) {
      if (contactPoint.organizationName) {
        await (await getRepeatingFieldGropField(this.contactPointGroup, newContactPointIndex, 'Organisaation nimi')).fill(contactPoint.organizationName);
      }
    }
  }

  async addAssessment(assessment: Assessment): Promise<void> {
    await this.addAssessmentButton.click();
    const newAssessmentIndex = await getNewestRepeatingFieldGroupIndex(this.assessmentGroup);
    if (assessment.date) {
      const { date } = dateToDateAndTimeString(assessment.date);
      await (await getRepeatingFieldGropField(this.assessmentGroup, newAssessmentIndex, 'Arvion päivämäärä')).fill(date);
    }
    if (assessment.urlToResult) {
      await (await getRepeatingFieldGropField(this.assessmentGroup, newAssessmentIndex, 'Arvion tulos')).fill(assessment.urlToResult);
    }
  }

  async addRightsHolder(rightsHolder: RightsHolder): Promise<void> {
    await this.addRightsHolderButton.click();
    const newRightsHolderIndex = await getNewestRepeatingFieldGroupIndex(this.rightsHolderGroup);
    await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Toimijan tyyppi')).selectOption(rightsHolder.type);
    await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, '* Nimi')).fill(rightsHolder.name);
    if (rightsHolder.email) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Sähköposti')).fill(rightsHolder.email);
    }
    if (rightsHolder.phone) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Puhelinnumero')).fill(rightsHolder.phone);
    }
    if (rightsHolder.streetAddress) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Katuosoite')).fill(rightsHolder.streetAddress);
    }
    if (rightsHolder.city) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Kaupunki')).fill(rightsHolder.city);
    }
    if (rightsHolder.postalCode) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Postinumero')).fill(rightsHolder.postalCode);
    }
    if (rightsHolder.region) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Alue')).fill(rightsHolder.region);
    }
    if (rightsHolder.countryName) {
      await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Maa')).selectOption(rightsHolder.countryName);
    }
    if (isPersonRightsHolder(rightsHolder)) {
      if (rightsHolder.firstName) {
        await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Etunimi')).fill(rightsHolder.firstName);
      }
      if (rightsHolder.surname) {
        await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Sukunimi')).fill(rightsHolder.surname);
      }
      if (rightsHolder.workplaceHomepage) {
        await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Työpaikan kotisivu')).fill(rightsHolder.workplaceHomepage);
      }
      if (rightsHolder.organizationName) {
        await (await getRepeatingFieldGropField(this.rightsHolderGroup, newRightsHolderIndex, 'Jäsenyydet')).fill(rightsHolder.organizationName);
      }
    }
  }

  async addRelatedDataset(relatedDataset: string): Promise<void> {
    await this.relatedDatasetField.click();
    // Might have more than just one option with the same name
    for (const datasetOption of await this.additionalInformationGroup.locator("span.label").filter({ hasText: relatedDataset }).all()) {
      await datasetOption.click();
    }
    await this.relatedDatasetField.click();
  }

  async addTransportMode(transportMode: string): Promise<void> {
    await this.transportModeField.click();
    const transportModeOption = await this.generallInformationGroup.locator("span.label").filter({ hasText: new RegExp(`^${transportMode}$`) })
    await transportModeOption.click();
    await this.transportModeField.click();
  }

  async addRegionalCoverage(location: string): Promise<void> {
    await this.regionalCoverageField.click();
    const locationOption = await this.generallInformationGroup.locator("span.label").filter({ hasText: new RegExp(`^${location}$`) })
    await locationOption.click();
    await this.regionalCoverageField.click();
  }


  async setDatasetInfo(datasetInfo: DatasetInfo): Promise<NewResourcePage> {
    await this.fillForm(datasetInfo);
    return await this.saveDataset();
  }

  async saveDataset(): Promise<NewResourcePage> {
    return await gotoNewPage<NewResourcePage>(
      this.page,
      URL.NewResource,
      async (newResourcePOM) => {
        await this.saveButton.click();
        const isSaveSuccessful = await newResourcePOM.isAtPage();
        if (!isSaveSuccessful) {
          throw new Error("Couldn't save the dataset information");
        }
        const url = this.page.url();
        const datasetIdMatch = url.match(/dataset\/([0-9a-fA-F-]+)/);
        if (!datasetIdMatch || datasetIdMatch.length < 2) {
          throw new Error("Couldn't extract dataset ID from the URL");
        }
        console.log(`Dataset ID: ${datasetIdMatch[1]}`);
        newResourcePOM.setDatasetId(datasetIdMatch[1] as string);
      },
    );
  }

}

setPom(URL.NewDataset, NewDatasetPage);
