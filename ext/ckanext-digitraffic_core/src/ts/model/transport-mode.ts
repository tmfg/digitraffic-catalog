import {getObjectKeyByValue} from "../util";

export enum TransportMode {
  AIR = 'https://w3id.org/mobilitydcat-ap/transport-mode/air',
  BICYCLE = 'https://w3id.org/mobilitydcat-ap/transport-mode/bicycle',
  BIKE_HIRE = 'https://w3id.org/mobilitydcat-ap/transport-mode/bike-hire',
  BIKE_SHARING = 'https://w3id.org/mobilitydcat-ap/transport-mode/bike-sharing',
  BUS = 'https://w3id.org/mobilitydcat-ap/transport-mode/bus',
  CAR = 'https://w3id.org/mobilitydcat-ap/transport-mode/car',
  CAR_HIRE = 'https://w3id.org/mobilitydcat-ap/transport-mode/car-hire',
  CAR_POOLING = 'https://w3id.org/mobilitydcat-ap/transport-mode/car-pooling',
  CAR_SHARING = 'https://w3id.org/mobilitydcat-ap/transport-mode/car-sharing',
  E_SCOOTER = 'https://w3id.org/mobilitydcat-ap/transport-mode/e-scooter',
  LONG_DISTANCE_COACH = 'https://w3id.org/mobilitydcat-ap/transport-mode/long-distance-coach',
  LONG_DISTANCE_RAIL = 'https://w3id.org/mobilitydcat-ap/transport-mode/long-distance-rail',
  MARITIME = 'https://w3id.org/mobilitydcat-ap/transport-mode/maritime',
  METRO_SUBWAY_TRAIN = 'https://w3id.org/mobilitydcat-ap/transport-mode/metro-subway-train',
  MOTORCYCLE = 'https://w3id.org/mobilitydcat-ap/transport-mode/motorcycle',
  OTHER = 'https://w3id.org/mobilitydcat-ap/transport-mode/other',
  PEDESTRIAN = 'https://w3id.org/mobilitydcat-ap/transport-mode/pedestrian',
  REGIONAL_AND_LOCAL_RAIL = 'https://w3id.org/mobilitydcat-ap/transport-mode/regional-and-local-rail',
  RIDE_POOLING = 'https://w3id.org/mobilitydcat-ap/transport-mode/ride-pooling',
  SHUTTLE_BUS = 'https://w3id.org/mobilitydcat-ap/transport-mode/shuttle-bus',
  SHUTTLE_FERRY = 'https://w3id.org/mobilitydcat-ap/transport-mode/shuttle-ferry',
  TAXI = 'https://w3id.org/mobilitydcat-ap/transport-mode/taxi',
  TRAM_LIGHT_RAIL = 'https://w3id.org/mobilitydcat-ap/transport-mode/tram-light-rail',
  TRUCK = 'https://w3id.org/mobilitydcat-ap/transport-mode/truck',
}

export const transportModeLabels: Record<TransportMode, string> = {
  [TransportMode.AIR]: 'Ilmailu',
  [TransportMode.BICYCLE]: 'Polkupyörä',
  [TransportMode.BIKE_HIRE]: 'Vuokrapyörä',
  [TransportMode.BIKE_SHARING]: 'Kaupunkipyörä',
  [TransportMode.BUS]: 'Bussi',
  [TransportMode.CAR]: 'Auto',
  [TransportMode.CAR_HIRE]: 'Vuokra-auto',
  [TransportMode.CAR_POOLING]: 'Kimppakyyti, auto',
  [TransportMode.CAR_SHARING]: 'Yhteiskäyttöauto',
  [TransportMode.E_SCOOTER]: 'Sähköpotkulauta',
  [TransportMode.LONG_DISTANCE_COACH]: 'Pitkän matkan bussi',
  [TransportMode.LONG_DISTANCE_RAIL]: 'Pitkän matkan juna',
  [TransportMode.MARITIME]: 'Merenkulku',
  [TransportMode.METRO_SUBWAY_TRAIN]: 'Metro',
  [TransportMode.MOTORCYCLE]: 'Moottoripyörä',
  [TransportMode.OTHER]: 'Muu',
  [TransportMode.PEDESTRIAN]: 'Jalankulku',
  [TransportMode.REGIONAL_AND_LOCAL_RAIL]: 'Alueellinen ja paikallinen raideliikenne',
  [TransportMode.RIDE_POOLING]: 'Kimppakyyti, muu',
  [TransportMode.SHUTTLE_BUS]: 'Liityntäbussi',
  [TransportMode.SHUTTLE_FERRY]: 'Liityntälautta',
  [TransportMode.TAXI]: 'Taksi',
  [TransportMode.TRAM_LIGHT_RAIL]: 'Raitiovaunu, kevyt raideliikenne',
  [TransportMode.TRUCK]: 'Kuorma-auto',
}

export function labelToTransportMode(label: string): TransportMode {
  const transportMode = getObjectKeyByValue(transportModeLabels, label) as TransportMode | undefined;
  if (transportMode) {
    return transportMode;
  } else {
    throw new Error(`Unknown transportMode label: ${label}`);
  }
}