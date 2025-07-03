import {getObjectKeyByValue} from "../util";

export enum GeoreferencingMethod {
  ALERT_C = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/alert-c',
  GML = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/gml',
  GEOCOORDINATES = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/geocoordinates',
  ISO_19148 = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/iso-19148',
  OPEN_LR = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/openlr',
  OTHER = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/other',
  TPEG_LOC = 'https://w3id.org/mobilitydcat-ap/georeferencing-method/tpeg-loc',
}

export const georeferencingMethodLabels: Record<GeoreferencingMethod, string> = {
  [GeoreferencingMethod.ALERT_C]: 'LERT-C',
  [GeoreferencingMethod.GML]: 'GML',
  [GeoreferencingMethod.GEOCOORDINATES]: 'Geocoordinates',
  [GeoreferencingMethod.ISO_19148]: 'ISO 19148',
  [GeoreferencingMethod.OPEN_LR]: 'OpenLR',
  [GeoreferencingMethod.OTHER]: 'Muu',
  [GeoreferencingMethod.TPEG_LOC]: 'TPEG-LOC',
};

export function labelToGeoreferencingMethod(label: string): GeoreferencingMethod {
  const georeferencingMethod = getObjectKeyByValue(georeferencingMethodLabels, label) as GeoreferencingMethod | undefined;
  if (georeferencingMethod) {
    return georeferencingMethod;
  } else {
    throw new Error(`Unknown georeferencingMethod label: ${label}`);
  }
}