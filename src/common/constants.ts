import { FecPoliticalParty, FecOffice, PoliticalParty, Office } from "./types";

export const PARTY_API_MAP: { [key: string]: FecPoliticalParty } = {
  Socialist: "SOC",
  Democrat: "DEM",
  Republican: "REP",
  Libertarian: "LIB",
};

export const OFFICE_API_MAP: { [key: string]: FecOffice } = {
  House: "H",
  Sentate: "S",
  President: "P",
};

export const PARTY_OPTIONS: Array<PoliticalParty> = [
  "Democrat",
  "Libertarian",
  "Republican",
  "Socialist",
];

export const OFFICE_OPTIONS: Array<Office> = ["House", "President", "Senate"];
