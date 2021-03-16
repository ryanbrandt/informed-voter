import { FecSupportOpposeIndicator } from "../common/types";

export interface FecIndependentExpendituresTotalsResults {
  support_oppose_indicator: FecSupportOpposeIndicator;
  total: number;
  cycle: number;
  candidate_id: string;
}

export interface IndependentExpendituresTotals {
  oppose: boolean;
  total: number;
  cycle: number;
  candidateId: string;
}
