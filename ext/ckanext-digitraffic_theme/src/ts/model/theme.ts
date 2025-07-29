import {getObjectKeyByValue} from "../util";

export enum Theme {
  AGRI = 'http://publications.europa.eu/resource/authority/data-theme/AGRI',
  ECON = 'http://publications.europa.eu/resource/authority/data-theme/ECON',
  EDUC = 'http://publications.europa.eu/resource/authority/data-theme/EDUC',
  ENER = 'http://publications.europa.eu/resource/authority/data-theme/ENER',
  ENVI = 'http://publications.europa.eu/resource/authority/data-theme/ENVI',
  GOVE = 'http://publications.europa.eu/resource/authority/data-theme/GOVE',
  HEAL = 'http://publications.europa.eu/resource/authority/data-theme/HEAL',
  INTR = 'http://publications.europa.eu/resource/authority/data-theme/INTR',
  JUST = 'http://publications.europa.eu/resource/authority/data-theme/JUST',
  SOCI = 'http://publications.europa.eu/resource/authority/data-theme/SOCI',
  OP_DATPRO = 'http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO',
  REGI = 'http://publications.europa.eu/resource/authority/data-theme/REGI',
  TECH = 'http://publications.europa.eu/resource/authority/data-theme/TECH',
  TRAN = 'http://publications.europa.eu/resource/authority/data-theme/TRAN',
}

export const themeLabels: Record<Theme, string> = {
  [Theme.AGRI]: 'Maatalous, kalastus, metsätalous ja elintarvikkeet',
  [Theme.ECON]: 'Talous ja raha-asiat',
  [Theme.EDUC]: 'Koulutus, kulttuuri ja urheilu',
  [Theme.ENER]: 'Energia',
  [Theme.ENVI]: 'Ympäristö',
  [Theme.GOVE]: 'Valtioneuvosto ja julkinen sektori',
  [Theme.HEAL]: 'Terveys',
  [Theme.INTR]: 'Kansainväliset kysymykset',
  [Theme.JUST]: 'Oikeus, oikeusjärjestelmä ja yleinen turvallisuus',
  [Theme.SOCI]: 'Väestö ja yhteiskunta',
  [Theme.OP_DATPRO]: 'Alustavat tiedot',
  [Theme.REGI]: 'Alueet ja kaupungit',
  [Theme.TECH]: 'Tiede ja teknologia',
  [Theme.TRAN]: 'Liikenne',
}

export function labelToTheme(label: string): Theme {
  const theme = getObjectKeyByValue(themeLabels, label) as Theme | undefined;
  if (theme) {
    return theme;
  } else {
    throw new Error(`Unknown theme label: ${label}`);
  }
}