import {
  FecPoliticalParty,
  FecOffice,
  PoliticalParty,
  Office,
  BaseFecResponse,
} from "./types";

export const ONE_SECOND_MS = 1000;

export const DEFAULT_FEC_API_RESPONSE: BaseFecResponse<any> = {
  api_version: "-1",
  pagination: {
    page: 1,
    pages: 1,
    count: 0,
    per_page: 0,
  },
  results: [],
};

export const API_RESPONSE_DELAY = 500;

export const PARTY_API_MAP: { [key: string]: FecPoliticalParty } = {
  Socialist: "SOC",
  Democrat: "DEM",
  Republican: "REP",
  Libertarian: "LIB",
};

export const OFFICE_API_MAP: { [key: string]: FecOffice } = {
  House: "H",
  Senate: "S",
  President: "P",
};

export const PARTY_OPTIONS: Array<PoliticalParty> = [
  "Democrat",
  "Libertarian",
  "Republican",
  "Socialist",
];

export const OFFICE_OPTIONS: Array<Office> = ["House", "President", "Senate"];
