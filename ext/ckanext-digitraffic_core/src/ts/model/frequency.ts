import { getObjectKeyByValue } from "../util"

export enum Frequency {
  BIDECENNIAL = "http://publications.europa.eu/resource/authority/frequency/BIDECENNIAL",
  TRIDECENNIAL = "http://publications.europa.eu/resource/authority/frequency/TRIDECENNIAL",
  BIHOURLY = "http://publications.europa.eu/resource/authority/frequency/BIHOURLY",
  TRIHOURLY = "http://publications.europa.eu/resource/authority/frequency/TRIHOURLY",
  MIN_5 = "http://publications.europa.eu/resource/authority/frequency/5MIN",
  OTHER = "http://publications.europa.eu/resource/authority/frequency/OTHER",
  MIN_30 = "http://publications.europa.eu/resource/authority/frequency/30MIN",
  WEEKLY = "http://publications.europa.eu/resource/authority/frequency/WEEKLY",
  MIN_1 = "http://publications.europa.eu/resource/authority/frequency/1MIN",
  MIN_15 = "http://publications.europa.eu/resource/authority/frequency/15MIN",
  HRS_12 = "http://publications.europa.eu/resource/authority/frequency/12HRS",
  MIN_10 = "http://publications.europa.eu/resource/authority/frequency/10MIN",
  HOURLY = "http://publications.europa.eu/resource/authority/frequency/HOURLY",
  QUADRENNIAL = "http://publications.europa.eu/resource/authority/frequency/QUADRENNIAL",
  QUINQUENNIAL = "http://publications.europa.eu/resource/authority/frequency/QUINQUENNIAL",
  DECENNIAL = "http://publications.europa.eu/resource/authority/frequency/DECENNIAL",
  WEEKLY_2 = "http://publications.europa.eu/resource/authority/frequency/WEEKLY_2",
  WEEKLY_3 = "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
  UNKNOWN = "http://publications.europa.eu/resource/authority/frequency/UNKNOWN",
  UPDATE_CONT = "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
  QUARTERLY = "http://publications.europa.eu/resource/authority/frequency/QUARTERLY",
  TRIENNIAL = "http://publications.europa.eu/resource/authority/frequency/TRIENNIAL",
  NEVER = "http://publications.europa.eu/resource/authority/frequency/NEVER",
  OP_DATPRO = "http://publications.europa.eu/resource/authority/frequency/OP_DATPRO",
  MONTHLY_2 = "http://publications.europa.eu/resource/authority/frequency/MONTHLY_2",
  MONTHLY_3 = "http://publications.europa.eu/resource/authority/frequency/MONTHLY_3",
  IRREG = "http://publications.europa.eu/resource/authority/frequency/IRREG",
  MONTHLY = "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
  DAILY = "http://publications.europa.eu/resource/authority/frequency/DAILY",
  DAILY_2 = "http://publications.europa.eu/resource/authority/frequency/DAILY_2",
  BIWEEKLY = "http://publications.europa.eu/resource/authority/frequency/BIWEEKLY",
  CONT = "http://publications.europa.eu/resource/authority/frequency/CONT",
  BIENNIAL = "http://publications.europa.eu/resource/authority/frequency/BIENNIAL",
  BIMONTHLY = "http://publications.europa.eu/resource/authority/frequency/BIMONTHLY",
  ANNUAL_2 = "http://publications.europa.eu/resource/authority/frequency/ANNUAL_2",
  ANNUAL_3 = "http://publications.europa.eu/resource/authority/frequency/ANNUAL_3",
  ANNUAL = "http://publications.europa.eu/resource/authority/frequency/ANNUAL",
  NOT_PLANNED = "http://publications.europa.eu/resource/authority/frequency/NOT_PLANNED",
  AS_NEEDED = "http://publications.europa.eu/resource/authority/frequency/AS_NEEDED",
}

export const frequencyLabels = {
  "http://publications.europa.eu/resource/authority/frequency/BIDECENNIAL": "joka kahdeskymmenes vuosi",
    "http://publications.europa.eu/resource/authority/frequency/TRIDECENNIAL": "joka kolmaskymmenes vuosi",
    "http://publications.europa.eu/resource/authority/frequency/BIHOURLY": "joka toinen tunti",
    "http://publications.europa.eu/resource/authority/frequency/TRIHOURLY": "joka kolmas tunti",
    "http://publications.europa.eu/resource/authority/frequency/5MIN": "joka viides minuutti",
    "http://publications.europa.eu/resource/authority/frequency/OTHER": "muut",
    "http://publications.europa.eu/resource/authority/frequency/30MIN": "kerran puolessa tunnissa",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY": "viikoittainen",
    "http://publications.europa.eu/resource/authority/frequency/1MIN": "joka minuutti",
    "http://publications.europa.eu/resource/authority/frequency/15MIN": "joka viidestoista minuutti",
    "http://publications.europa.eu/resource/authority/frequency/12HRS": "joka kahdestoista tunti",
    "http://publications.europa.eu/resource/authority/frequency/10MIN": "joka kymmenes minuutti",
    "http://publications.europa.eu/resource/authority/frequency/HOURLY": "joka tunti",
    "http://publications.europa.eu/resource/authority/frequency/QUADRENNIAL": "joka neljäs vuosi",
    "http://publications.europa.eu/resource/authority/frequency/QUINQUENNIAL": "joka viides vuosi",
    "http://publications.europa.eu/resource/authority/frequency/DECENNIAL": "joka kymmenes vuosi",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_2": "kaksi kertaa viikossa",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3": "kolme kertaa viikossa",
    "http://publications.europa.eu/resource/authority/frequency/UNKNOWN": "tuntematon",
    "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT": "päivitetään jatkuvasti",
    "http://publications.europa.eu/resource/authority/frequency/QUARTERLY": "vuosineljänsittäin",
    "http://publications.europa.eu/resource/authority/frequency/TRIENNIAL": "kolmivuotinen",
    "http://publications.europa.eu/resource/authority/frequency/NEVER": "ei koskaan",
    "http://publications.europa.eu/resource/authority/frequency/OP_DATPRO": "Alustavat tiedot",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_2": "kaksi kertaa kuukaudessa",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_3": "kolme kertaa kuukaudessa",
    "http://publications.europa.eu/resource/authority/frequency/IRREG": "epäsäännöllinen",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY": "kuukausittainen",
    "http://publications.europa.eu/resource/authority/frequency/DAILY": "päivittäin",
    "http://publications.europa.eu/resource/authority/frequency/DAILY_2": "kahdesti päivässä",
    "http://publications.europa.eu/resource/authority/frequency/BIWEEKLY": "joka toinen viikko",
    "http://publications.europa.eu/resource/authority/frequency/CONT": "jatkuva",
    "http://publications.europa.eu/resource/authority/frequency/BIENNIAL": "kaksivuotinen",
    "http://publications.europa.eu/resource/authority/frequency/BIMONTHLY": "kahdesti kuussa",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_2": "puolivuotinen",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_3": "kolme kertaa vuodessa",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL": "vuotuinen",
    "http://publications.europa.eu/resource/authority/frequency/NOT_PLANNED": "ei suunnitteilla",
    "http://publications.europa.eu/resource/authority/frequency/AS_NEEDED": "tarvittaessa",
}

export function labelToFrequency(label: string): Frequency {
  const frequency = getObjectKeyByValue(frequencyLabels, label) as Frequency | undefined;
  if (frequency) {
    return frequency;
  } else {
    throw new Error(`Unknown frequency label: ${label}`);
  }
}

export class FrequencyOption {
  readonly label: string;
  readonly value: Frequency;

  constructor(label: string, value: Frequency) {
    this.label = label;
    this.value = value;
  }

  static fromFrequency(frequency: Frequency): FrequencyOption {
    return new FrequencyOption(frequencyLabels[frequency], frequency);
  }
}