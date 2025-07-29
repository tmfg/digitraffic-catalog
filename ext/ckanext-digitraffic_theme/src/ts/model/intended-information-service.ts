import {getObjectKeyByValue} from "../util";

export enum IntendedInformationService {
  DYNAMIC_INFORMATION_SERVICE = 'https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-information-service',
  DYNAMIC_PASSING_TIMES_TRIP_PLANS_AND_AUXILARY_INFORMATION = 'https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-passing-times-trip-plans-and-auxiliary-information',
  DYNAMIC_AVAILABILITY_CHECK = 'https://w3id.org/mobilitydcat-ap/intended-information-service/dynamic-availability-check',
  INFORMATION_SERVICE = 'https://w3id.org/mobilitydcat-ap/intended-information-service/information-service',
  LOCATION_SEARCH = 'https://w3id.org/mobilitydcat-ap/intended-information-service/location-search',
  OTHER = 'https://w3id.org/mobilitydcat-ap/intended-information-service/other',
  TRIP_PLAN_COMPUTATION_SCHEDULED_MODES_TRANSPORT = 'https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plan-computation-scheduled-modes-transport',
  TRIP_PLANS = 'https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plans',
  TRIP_PLANS_AUXILIARY_INFORMATION_AVAILABILITY_CHECK = 'https://w3id.org/mobilitydcat-ap/intended-information-service/trip-plans-auxiliary-information-availability-check',
}

export const intendedInformationServiceLabels: Record<IntendedInformationService, string> = {
  [IntendedInformationService.DYNAMIC_INFORMATION_SERVICE]: 'Dynaaminen tietopalvelu',
  [IntendedInformationService.DYNAMIC_PASSING_TIMES_TRIP_PLANS_AND_AUXILARY_INFORMATION]: 'Dynaamiset ohitusajat, reittisuunnitelmat ja lisätiedot',
  [IntendedInformationService.DYNAMIC_AVAILABILITY_CHECK]: 'Dynaaminen saatavuuden tarkistus',
  [IntendedInformationService.INFORMATION_SERVICE]: 'Tietopalvelu',
  [IntendedInformationService.LOCATION_SEARCH]: 'Sijaintihaku',
  [IntendedInformationService.OTHER]: 'Muu',
  [IntendedInformationService.TRIP_PLAN_COMPUTATION_SCHEDULED_MODES_TRANSPORT]: 'Reittisuunnitelman laskenta aikataulutetuilla kuljetusmuodoilla',
  [IntendedInformationService.TRIP_PLANS]: 'Reittisuunnitelmat',
  [IntendedInformationService.TRIP_PLANS_AUXILIARY_INFORMATION_AVAILABILITY_CHECK]: 'Reittisuunnitelmat, lisätiedot, saatavuuden tarkistus',
}

export function labelToIntendedInformationService(label: string): IntendedInformationService {
  const intendedInformationService = getObjectKeyByValue(intendedInformationServiceLabels, label) as IntendedInformationService | undefined;
  if (intendedInformationService) {
    return intendedInformationService;
  } else {
    throw new Error(`Unknown intendedInformationService label: ${label}`);
  }
}