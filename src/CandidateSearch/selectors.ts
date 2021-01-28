import { Office, PoliticalParty } from "../common/types";
import { RootState } from "../store/rootReducer";

export const getQuery = (state: RootState): string | null => state.search.query;
export const getPartyAffiliation = (state: RootState): PoliticalParty | null =>
  state.search.party;
export const getOffice = (state: RootState): Office | null =>
  state.search.office;
