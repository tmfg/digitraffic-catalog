import {type Frequency} from "../../src/ts/model/frequency"
import type {RegionalCoverage} from "../../src/ts/model/regional-coverage";
import type {TOP_MOBILITY_THEMES_T} from "../../src/ts/model/mobility-theme";

export type Visibility = 'public' | 'private';

export class DatasetInfo {
  id?: string
  visibility: Visibility;
  title: string;
  frequency: Frequency;
  regionalCoverage: RegionalCoverage;
  dataContentCategory: TOP_MOBILITY_THEMES_T;
  description: string;

  constructor(
    visibility: Visibility,
    title: string,
    frequency: Frequency,
    regionalCoverage: RegionalCoverage,
    dataContentCategory: TOP_MOBILITY_THEMES_T,
    description: string,
    id?: string,
    //optionalValues?: {}
  ) {
    this.visibility = visibility
    this.title = title
    this.frequency = frequency
    this.regionalCoverage = regionalCoverage
    this.dataContentCategory = dataContentCategory
    this.description = description
    this.id = id;
  }

  cloneWith(partialDatasetInfo: Partial<DatasetInfo>): DatasetInfo {
    return new DatasetInfo(
      partialDatasetInfo.visibility ?? this.visibility,
      partialDatasetInfo.title ?? this.title,
      partialDatasetInfo.frequency?? this.frequency,
      partialDatasetInfo.regionalCoverage ?? this.regionalCoverage,
      partialDatasetInfo.dataContentCategory ?? this.dataContentCategory,
      partialDatasetInfo.description ?? this.description,
      partialDatasetInfo.id ?? this.id
    );
  }
}