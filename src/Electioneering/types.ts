export interface FecElectioneeringTotalsResults {
  candidate_id: string;
  cycle: number;
  total: number;
}

export interface ElectioneeringTotals {
  candidateId: string;
  cycle: number;
  total: number;
}

export interface CyclesAndTotals {
  cycles: Array<number>;
  totals: Array<number>;
}
