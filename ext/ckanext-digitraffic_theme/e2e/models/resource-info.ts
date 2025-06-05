import {type FileFormat, FileFormatOption} from "../../src/ts/model/file-format";
import type {MobilityDataStandard} from "../../src/ts/model/mobility-data-standard";
import type {RightsType} from "../../src/ts/model/rights-type";

export class ResourceInfo {
  url: string;
  format: FileFormatOption;
  mobilityDataStandard: MobilityDataStandard;
  rightsType: RightsType;
  datasetId?: string;

  constructor(
    url: string,
    format: FileFormat,
    mobilityDataStandard: MobilityDataStandard,
    rightsType: RightsType,
    datasetId?: string,
  ) {
    this.url = url;
    this.format = FileFormatOption.fromFileFormat(format);
    this.mobilityDataStandard = mobilityDataStandard;
    this.rightsType = rightsType;
    this.datasetId = datasetId;
  }

  cloneWith(partialResourceInfo: Partial<ResourceInfo>): ResourceInfo {
    return new ResourceInfo(
      partialResourceInfo.url ?? this.url,
      partialResourceInfo.format?.value ?? this.format.value,
      partialResourceInfo.mobilityDataStandard ?? this.mobilityDataStandard,
      partialResourceInfo.rightsType ?? this.rightsType,
      partialResourceInfo.datasetId ?? this.datasetId
    );
  }
}