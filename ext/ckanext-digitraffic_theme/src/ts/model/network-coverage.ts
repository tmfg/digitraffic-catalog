import {getObjectKeyByValue} from "../util";

export enum NetworkCoverage {
  AIR_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/air-network',
  METRO_SUBWAY_TRAM_OR_LIGHT_RAIL_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/metro-subway-tram-or-light-rail-network',
  MOTORWAYS = 'https://w3id.org/mobilitydcat-ap/network-coverage/motorways',
  OTHER = 'https://w3id.org/mobilitydcat-ap/network-coverage/other',
  OTHER_PUBLIC_TRANSPORT_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/other-public-transport-network',
  RAIL_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/rail-network',
  REGIONAL_ROADS = 'https://w3id.org/mobilitydcat-ap/network-coverage/regional-roads',
  STATE_ROADS_OR_FEDERAL_ROADS = 'https://w3id.org/mobilitydcat-ap/network-coverage/state-roads-or-federal-roads',
  TEN_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/ten-network',
  TERN_NETWORK = 'https://w3id.org/mobilitydcat-ap/network-coverage/tern-network',
  URBAN_AND_LOCAL_ROADS = 'https://w3id.org/mobilitydcat-ap/network-coverage/urban-and-local-roads',
  WATERWAYS = 'https://w3id.org/mobilitydcat-ap/network-coverage/waterways',
}

export const networkCoverageLabels: Record<NetworkCoverage, string> = {
  [NetworkCoverage.AIR_NETWORK]: 'Ilmailuverkko',
  [NetworkCoverage.METRO_SUBWAY_TRAM_OR_LIGHT_RAIL_NETWORK]: 'Metro, raitiovaunu tai kevyt raideliikenneverkko',
  [NetworkCoverage.MOTORWAYS]: 'Moottoritiet',
  [NetworkCoverage.OTHER]: 'Muu',
  [NetworkCoverage.OTHER_PUBLIC_TRANSPORT_NETWORK]: 'Muu joukkoliikenneverkko',
  [NetworkCoverage.RAIL_NETWORK]: 'Rautatieverkko',
  [NetworkCoverage.REGIONAL_ROADS]: 'Alueelliset tiet',
  [NetworkCoverage.STATE_ROADS_OR_FEDERAL_ROADS]: 'Valtion tai liittovaltion tiet',
  [NetworkCoverage.TEN_NETWORK]: 'TEN-verkko',
  [NetworkCoverage.TERN_NETWORK]: 'TERN-verkko',
    [NetworkCoverage.URBAN_AND_LOCAL_ROADS]: 'Kaupunkien tiet ja paikalliset tiet',
    [NetworkCoverage.WATERWAYS]: 'Vesiväylät',
};

export function labelToNetworkCoverage(label: string): NetworkCoverage {
  const networkCoverage = getObjectKeyByValue(networkCoverageLabels, label) as NetworkCoverage | undefined;
  if (networkCoverage) {
    return networkCoverage;
  } else {
    throw new Error(`Unknown networkCoverage label: ${label}`);
  }
}