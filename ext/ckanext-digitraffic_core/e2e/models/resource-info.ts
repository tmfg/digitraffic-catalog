import {type FileFormat, FileFormatOption} from "../../src/ts/model/file-format";
import type {MobilityDataStandard} from "../../src/ts/model/mobility-data-standard";
import type {RightsType} from "../../src/ts/model/rights-type";
import type {ApplicationLayerProtocol} from "../../src/ts/model/application-layer-protocol";
import type {DataGrammar} from "../../src/ts/model/data-grammar";
import type {CharacterEncoding} from "../../src/ts/model/character-encoding";
import type {CommunicationMethod} from "../../src/ts/model/communication-method";
import type {LicenseId} from "../../src/ts/model/license-id";

export type DataService = {
  title: string;
  endpointUrl: string;
  description?: string;
  endpointDescription?: string;
}

export type OptionalResourceInfoValues = {
  downloadUrl?: string;
  dataServices?: DataService[];
  name?: string;
  description?: string;
  applicationLayerProtocol?: ApplicationLayerProtocol;
  dataGrammar?: DataGrammar;
  dataFormatNotes?: string;
  characterEncoding?: CharacterEncoding;
  communicationMethod?: CommunicationMethod;
  sample?: string;
  licenceId?: LicenseId;
  licenseText?: string;
  startTimestamp?: Date,
  endTimestamp?: Date,
  ianaTimezone?: 'Europe/Helsinki' | 'UTC',
}

export class ResourceInfo {
  url: string;
  format: FileFormatOption;
  mobilityDataStandard: MobilityDataStandard;
  rightsType: RightsType;
  datasetId?: string;
  optionalValues?: OptionalResourceInfoValues;

  constructor(
    url: string,
    format: FileFormat,
    mobilityDataStandard: MobilityDataStandard,
    rightsType: RightsType,
    datasetId?: string,
    optionalValues?: OptionalResourceInfoValues
  ) {
    this.url = url;
    this.format = FileFormatOption.fromFileFormat(format);
    this.mobilityDataStandard = mobilityDataStandard;
    this.rightsType = rightsType;
    this.datasetId = datasetId;
    this.optionalValues = optionalValues;
  }

  cloneWith(partialResourceInfo: Partial<ResourceInfo>): ResourceInfo {
    return new ResourceInfo(
      partialResourceInfo.url ?? this.url,
      partialResourceInfo.format?.value ?? this.format.value,
      partialResourceInfo.mobilityDataStandard ?? this.mobilityDataStandard,
      partialResourceInfo.rightsType ?? this.rightsType,
      partialResourceInfo.datasetId ?? this.datasetId,
      partialResourceInfo?.optionalValues ?? this.optionalValues
    );
  }
}