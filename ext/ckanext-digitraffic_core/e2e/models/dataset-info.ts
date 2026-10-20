import { type Frequency } from "../../src/ts/model/frequency";
import type { GeoreferencingMethod } from "../../src/ts/model/georeferencing-method";
import type { IntendedInformationService } from "../../src/ts/model/intended-information-service";
import type { Language } from "../../src/ts/model/language";
import type { SUB_MOBILITY_THEMES_T, TOP_MOBILITY_THEMES_T } from "../../src/ts/model/mobility-theme";
import type { NetworkCoverage } from "../../src/ts/model/network-coverage";
import type { RegionalCoverage } from "../../src/ts/model/regional-coverage";
import type { Theme } from "../../src/ts/model/theme";
import type { TransportMode } from "../../src/ts/model/transport-mode";

export type Visibility = 'public' | 'private';

export interface ContactPoint {
  type: string
  fullName: string
  email: string
  telephone?: string
  url?: string
  streetAddress?: string
  locality?: string
  postalCode?: string
  region?: string
  countryName?: string
}

export interface OrganizationContactPoint extends ContactPoint {
  type: 'http://www.w3.org/2006/vcard/ns#Organization'
}

export interface PersonContactPoint extends ContactPoint {
  type: 'http://www.w3.org/2006/vcard/ns#Individual'
  organizationName?: string
}

export function isPersonContactPoint(contactPoint: ContactPoint): contactPoint is PersonContactPoint {
  return contactPoint.type === 'http://www.w3.org/2006/vcard/ns#Individual';
}

export interface RightsHolder {
  organization: string
}

export type Assessment = {
  date?: Date,
  urlToResult?: string,
}

export type OptionalDatasetInfoValues = {
  dataContentSubCategory?: SUB_MOBILITY_THEMES_T,
  theme?: Theme,
  transportMode?: TransportMode[],
  startTimestamp?: Date,
  endTimestamp?: Date,
  ianaTimezone?: 'Europe/Helsinki' | 'UTC',
  contactPoints?: ContactPoint[],
  version?: string,
  versionNotes?: string,
  assessments?: Assessment[],
  language?: Language,
  georeferencingMethod?: GeoreferencingMethod,
  networkCoverage?: NetworkCoverage,
  spatialReferenceSystem?: number,
  intendedInformationService?: IntendedInformationService,
  urlToQualityDescription?: string,
  relatedDatasets?: string[],
  isReferencedBy?: string[],
  rightsHolders?: RightsHolder[],
}

export class DatasetInfo {
  id?: string
  visibility: Visibility;
  title: string;
  frequency: Frequency;
  regionalCoverage: Set<RegionalCoverage>;
  dataContentCategory: TOP_MOBILITY_THEMES_T;
  description: string;
  optionalValues?: OptionalDatasetInfoValues;

  constructor(
    visibility: Visibility,
    title: string,
    frequency: Frequency,
    regionalCoverage: Set<RegionalCoverage>,
    dataContentCategory: TOP_MOBILITY_THEMES_T,
    description: string,
    id?: string,
    optionalValues?: OptionalDatasetInfoValues
  ) {
    this.visibility = visibility
    this.title = title
    this.frequency = frequency
    this.regionalCoverage = regionalCoverage
    this.dataContentCategory = dataContentCategory
    this.description = description
    this.id = id;
    this.optionalValues = optionalValues;
  }

  cloneWith(partialDatasetInfo: Partial<DatasetInfo>): DatasetInfo {
    return new DatasetInfo(
      partialDatasetInfo.visibility ?? this.visibility,
      partialDatasetInfo.title ?? this.title,
      partialDatasetInfo.frequency ?? this.frequency,
      partialDatasetInfo.regionalCoverage ?? this.regionalCoverage,
      partialDatasetInfo.dataContentCategory ?? this.dataContentCategory,
      partialDatasetInfo.description ?? this.description,
      partialDatasetInfo.id ?? this.id,
      partialDatasetInfo?.optionalValues ?? this.optionalValues
    );
  }
}