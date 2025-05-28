import {type Frequency, FrequencyOption} from "../../src/ts/model/frequency"
import type {RegionalCoverage} from "../../src/ts/model/regional-coverage";
import type {TOP_MOBILITY_THEMES_T} from "../../src/ts/model/mobility-theme";

export type Visibility = 'public' | 'private';

export class DatasetInfo {
  visibility: Visibility;
  title: string;
  frequencies: FrequencyOption[];
  regionalCoverage: RegionalCoverage;
  dataContentCategory: TOP_MOBILITY_THEMES_T;
  description: string;

  constructor(
    visibility: Visibility,
    title: string,
    frequencies: Frequency[],
    regionalCoverage: RegionalCoverage,
    dataContentCategory: TOP_MOBILITY_THEMES_T,
    description: string
  ) {
    this.visibility = visibility
    this.title = title
    this.frequencies = frequencies.map(frequency => FrequencyOption.fromFrequency(frequency))
    this.regionalCoverage = regionalCoverage
    this.dataContentCategory = dataContentCategory
    this.description = description
  }

  cloneWith(partialDatasetInfo: Partial<DatasetInfo>): DatasetInfo {
    return new DatasetInfo(
      partialDatasetInfo.visibility ?? this.visibility,
      partialDatasetInfo.title ?? this.title,
      partialDatasetInfo.frequencies?.map(frequencyOption => frequencyOption.value) ?? this.frequencies.map(frequencyOption => frequencyOption.value),
      partialDatasetInfo.regionalCoverage ?? this.regionalCoverage,
      partialDatasetInfo.dataContentCategory ?? this.dataContentCategory,
      partialDatasetInfo.description ?? this.description
    );
  }
}