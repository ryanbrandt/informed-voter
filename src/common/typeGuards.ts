import { Office, PoliticalParty } from "./types";

export function isPoliticalParty(object: any): object is PoliticalParty {
  const politicalParties = [
    "Democrat",
    "Republican",
    "Libertarian",
    "Socialist",
    "None",
  ] as const;

  return politicalParties.includes(object);
}

export function isOffice(object: any): object is Office {
  const offices = ["House", "Senate", "President"] as const;

  return offices.includes(object);
}
