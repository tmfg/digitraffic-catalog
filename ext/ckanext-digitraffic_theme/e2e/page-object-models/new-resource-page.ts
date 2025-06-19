import type {Locator, Page} from "@playwright/test";
import {BasePage, type JSLoadedInterface} from './base';
import {setPom, URL} from "./pages-controller";
import {type DataService, ResourceInfo} from '../models/resource-info';
import {
  dateToDateAndTimeString,
  getNewestRepeatingFieldGroupIndex,
  getRepeatingFieldGropField,
  gotoNewPage,
  pathParameterURL,
  urlify
} from "./util";
import type {DatasetPage} from "./dataset-page";

export class NewResourcePage extends BasePage implements JSLoadedInterface<NewResourcePage> {
  readonly urlField: Locator;
  readonly formatField: Locator;
  readonly mobilityDataStandardField: Locator;
  readonly rightsTypeField: Locator;
  readonly downloadUrlField: Locator;
  readonly addDataServiceButton: Locator;
  readonly dataServiceGroup: Locator;
  readonly nameField: Locator;
  readonly descriptionField: Locator;
  readonly communicationMethodField: Locator;
  readonly sampleField: Locator;
  readonly applicationLayerProtocolField: Locator;
  readonly dataGrammarField: Locator;
  readonly dataFormatNotesField: Locator;
  readonly characterEncodingField: Locator;
  readonly licenceIdField: Locator;
  readonly licenseTextField: Locator;
  readonly startDateField: Locator
  readonly startTimeField: Locator
  readonly endDateField: Locator
  readonly endTimeField: Locator
  readonly ianaTimezoneField: Locator
  readonly saveButton: Locator;
  datasetId?: string;
  pageUrl?: string;

  constructor(page: Page) {
    super(page, [page.getByRole('heading', {name: 'Verkko-osoitteet'})]);
    this.urlField = page.getByLabel('* URL');
    this.formatField = page.getByLabel('* Formaatti');
    this.mobilityDataStandardField = page.getByLabel('* Liikenteen tietostandardi');
    this.rightsTypeField = page.getByLabel('* Pääsy- ja käyttöehdot');
    this.saveButton = page.getByRole('button', {name: 'Valmis'});
    this.downloadUrlField = page.getByLabel('URL (tiedosto)');
    this.dataServiceGroup = page.locator('.field-group').filter({has: page.getByRole('heading', { name: 'Tietopalvelu'})})
    this.addDataServiceButton = this.dataServiceGroup.getByRole('link', {name: 'Lisää'});
    this.nameField = page.getByLabel('Nimike englanniksi');
    this.descriptionField = page.getByLabel('Kuvaus englanniksi', {exact: true});
    this.communicationMethodField = page.getByLabel('Rajapinnan käyttötapa');
    this.sampleField = page.getByLabel('Näyte');
    this.applicationLayerProtocolField = page.getByLabel('Sovelluskerroksen protokolla');
    this.dataGrammarField = page.getByLabel('Tietoskeema');
    this.dataFormatNotesField = page.getByLabel('Huomioita formaatista englanniksi');
    this.characterEncodingField = page.getByLabel('Merkistö');
    this.licenceIdField = page.getByLabel('Lisenssi', {exact: true});
    this.licenseTextField = page.getByLabel('Lisenssiteksti');
    this.startDateField = page.getByLabel('Alkamisaika');
    this.startTimeField = page.locator('.datetime-row', {has: this.startDateField}).getByLabel('Kellonaika');
    this.endDateField = page.getByLabel('Päättymisaika');
    this.endTimeField = page.locator('.datetime-row', {has: this.endDateField}).getByLabel('Kellonaika');
    this.ianaTimezoneField = page.getByLabel('Aikavyöhyke').filter({visible: true});
  }

  setDatasetId(datasetId: string): NewResourcePage {
    console.log('Setting dataset ID:', datasetId);
    this.datasetId = datasetId;
    this.pageUrl = urlify(pathParameterURL(URL.NewResource, {'datasetId': datasetId}));
    return this;
  }

  async goto(): Promise<NewResourcePage> {
    if (!this.datasetId || !this.pageUrl) {
      throw new Error('Dataset ID is required to navigate to the new resource page');
    }
    await this.page.goto(this.pageUrl);
    await this.assertPage();
    return this;
  }

  async ensurePageJsLoaded<NewResourcePage>(): Promise<NewResourcePage> {
    await this.page.waitForLoadState('networkidle');
    return this as unknown as NewResourcePage;
  }

  async addDataService(dataService: DataService): Promise<void> {
    this.addDataServiceButton.click()
    const newDataServiceIndex = await getNewestRepeatingFieldGroupIndex(this.dataServiceGroup)
    await (await getRepeatingFieldGropField(this.dataServiceGroup, newDataServiceIndex, 'Tietopalvelun nimi englanniksi')).fill(dataService.title);
    await (await getRepeatingFieldGropField(this.dataServiceGroup, newDataServiceIndex, 'Rajapinnan URL')).fill(dataService.endpointUrl);
    if (dataService.description) {
      await (await getRepeatingFieldGropField(this.dataServiceGroup, newDataServiceIndex, 'Tietopalvelun kuvaus englanniksi')).fill(dataService.description);
    }
    if (dataService.endpointDescription) {
      await (await getRepeatingFieldGropField(this.dataServiceGroup, newDataServiceIndex, 'Rajapinnan kuvaus')).fill(dataService.endpointDescription);
    }
  }

  async fillForm(resourceInfo: ResourceInfo) {
    await this.urlField.fill(resourceInfo.url);
    await this.formatField.selectOption(resourceInfo.format.label);
    await this.mobilityDataStandardField.selectOption(resourceInfo.mobilityDataStandard);
    await this.rightsTypeField.selectOption(resourceInfo.rightsType);

    if (resourceInfo.optionalValues?.downloadUrl) {
        await this.downloadUrlField.fill(resourceInfo.optionalValues.downloadUrl);
    }
    if (resourceInfo.optionalValues?.dataServices) {
      for (const dataService of resourceInfo.optionalValues.dataServices) {
        await this.addDataService(dataService);
      }
    }
    if (resourceInfo.optionalValues?.name) {
      await this.nameField.fill(resourceInfo.optionalValues.name);
    }
    if (resourceInfo.optionalValues?.description) {
      await this.descriptionField.fill(resourceInfo.optionalValues.description);
    }
    if (resourceInfo.optionalValues?.communicationMethod) {
      await this.communicationMethodField.selectOption(resourceInfo.optionalValues.communicationMethod);
    }
    if (resourceInfo.optionalValues?.sample) {
      await this.sampleField.fill(resourceInfo.optionalValues.sample);
    }
    if (resourceInfo.optionalValues?.applicationLayerProtocol) {
      await this.applicationLayerProtocolField.selectOption(resourceInfo.optionalValues.applicationLayerProtocol);
    }
    if (resourceInfo.optionalValues?.dataGrammar) {
      await this.dataGrammarField.selectOption(resourceInfo.optionalValues.dataGrammar);
    }
    if (resourceInfo.optionalValues?.dataFormatNotes) {
      await this.dataFormatNotesField.fill(resourceInfo.optionalValues.dataFormatNotes);
    }
    if (resourceInfo.optionalValues?.characterEncoding) {
      await this.characterEncodingField.selectOption(resourceInfo.optionalValues.characterEncoding);
    }
    if (resourceInfo.optionalValues?.licenceId) {
      await this.licenceIdField.selectOption(resourceInfo.optionalValues.licenceId);
    }
    if (resourceInfo.optionalValues?.licenseText) {
      await this.licenseTextField.fill(resourceInfo.optionalValues.licenseText);
    }
    if (resourceInfo.optionalValues?.startTimestamp) {
      const {date, time} = dateToDateAndTimeString(resourceInfo.optionalValues.startTimestamp);
      await this.startDateField.fill(date);
      await this.startTimeField.fill(time);
    }
    if (resourceInfo.optionalValues?.endTimestamp) {
      const {date, time} = dateToDateAndTimeString(resourceInfo.optionalValues.endTimestamp);
      await this.endDateField.fill(date);
      await this.endTimeField.fill(time);
    }
    if (resourceInfo.optionalValues?.ianaTimezone) {
      await this.ianaTimezoneField.selectOption(resourceInfo.optionalValues.ianaTimezone);
    }
  }

  async saveResource(): Promise<DatasetPage> {
    if (!this.datasetId) {
      throw new Error('Dataset ID is required to save the resource info');
    }
    return await gotoNewPage<DatasetPage>(
      this.page,
      URL.Dataset,
      async (datasetPOM) => {
        await this.saveButton.click()
        const isSaveSuccessful = await datasetPOM.isAtPage()
        if (!isSaveSuccessful) {
          throw new Error("Couldn't save the resource information");
        }
      },
      this.datasetId
    )
  }
}

setPom(URL.NewResource, NewResourcePage);