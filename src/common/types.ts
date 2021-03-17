/**
 * FEC APIs support/oppose indicators
 */
export type FecSupportOpposeIndicator = "S" | "O";

/**
 * Political party abbreviations supported by the FEC API
 */
export type FecPoliticalParty = "DEM" | "REP" | "LIB" | "SOC";

/**
 * Political party full names supported by informed-voter
 */
export type PoliticalParty =
  | "Democrat"
  | "Republican"
  | "Libertarian"
  | "Socialist"
  | "None";

/**
 * Office abbreviations supported by the FEC API
 */
export type FecOffice = "H" | "S" | "P";

/**
 * Office full names supported by informed-voter
 */
export type Office = "House" | "Senate" | "President";

/**
 * @interface FecPaginationResponse
 * Models FEC API's pagination object
 * Included in paginated GET requests
 */
export interface FecPaginationResponse {
  page: number;
  count: number;
  per_page: number;
  pages: number;
}

/**
 * @interface BaseFecResponse
 * Models FEC API's basic response shape
 */
export interface BaseFecResponse<T> {
  api_version: string;
  pagination: FecPaginationResponse;
  results: Array<T>;
}

/**
 * @interface ByCycleData
 * Models the base structure for FEC data which is by the cycle
 */
export interface ByCycleData {
  [key: string]: any;
  cycle: number;
}
