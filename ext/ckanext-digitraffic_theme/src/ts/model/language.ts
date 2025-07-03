import {getObjectKeyByValue} from "../util";

export enum Language {
  DAN = 'http://publications.europa.eu/resource/authority/language/DAN',
  NLD = 'http://publications.europa.eu/resource/authority/language/NLD',
  ENG = 'http://publications.europa.eu/resource/authority/language/ENG',
  EST = 'http://publications.europa.eu/resource/authority/language/EST',
  FIN = 'http://publications.europa.eu/resource/authority/language/FIN',
  FRA = 'http://publications.europa.eu/resource/authority/language/FRA',
  DEU = 'http://publications.europa.eu/resource/authority/language/DEU',
  ISL = 'http://publications.europa.eu/resource/authority/language/ISL',
  LAV = 'http://publications.europa.eu/resource/authority/language/LAV',
  LIT = 'http://publications.europa.eu/resource/authority/language/LIT',
  NOR = 'http://publications.europa.eu/resource/authority/language/NOR',
  POL = 'http://publications.europa.eu/resource/authority/language/POL',
  SPA = 'http://publications.europa.eu/resource/authority/language/SPA',
  SWE = 'http://publications.europa.eu/resource/authority/language/SWE',
}

export const languageLabels: Record<Language, string> = {
  [Language.DAN]: 'tanska',
  [Language.NLD]: 'hollanti',
  [Language.ENG]: 'englanti',
  [Language.EST]: 'viro',
  [Language.FIN]: 'suomi',
  [Language.FRA]: 'ranska',
  [Language.DEU]: 'saksa',
  [Language.ISL]: 'islanti',
  [Language.LAV]: 'latvia',
  [Language.LIT]: 'liettua',
  [Language.NOR]: 'norja',
  [Language.POL]: 'puola',
  [Language.SPA]: 'espanja',
  [Language.SWE]: 'ruotsi',
};

export function labelToLanguage(label: string): Language {
  const language = getObjectKeyByValue(languageLabels, label) as Language | undefined;
  if (language) {
    return language;
  } else {
    throw new Error(`Unknown language label: ${label}`);
  }
}