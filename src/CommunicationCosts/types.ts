import { FecSupportOpposeIndicator } from "../common/types";

export interface FecCommunicationCostsResults {
  candidate_id: string;
  cycle: number;
  total: number;
  support_oppose_indicator: FecSupportOpposeIndicator;
}

export interface CommunicationCosts {
  candidateId: string;
  cycle: number;
  total: number;
  oppose: boolean;
}
