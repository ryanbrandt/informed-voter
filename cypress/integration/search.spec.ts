export {};

describe("Candidate search inputs", () => {
  const BADGE_REMOVE_SELECTOR = ".removable_badge-remove-btn";

  const MOCK_QUERY = "Bernie Sanders";
  const MOCK_PARTY = "Democrat";
  const MOCK_OFFICE = "President";

  function getSearchBadge(content: string) {
    return cy
      .get(".candidate_search-status-container")
      .find(".badge_badge")
      .contains(content);
  }

  function getSelectAtIndex(index: number) {
    return cy.get(".select_container").eq(index).find("select");
  }

  before(() => {
    cy.goToSearch();
  });

  it("Displays name input", () => {
    cy.candidateSearchName(MOCK_QUERY);

    getSearchBadge(MOCK_QUERY).should("exist");
  });

  it("Allows removing of name input via display badge", () => {
    getSearchBadge(MOCK_QUERY).get(BADGE_REMOVE_SELECTOR).click();

    cy.get(".candidate_search-query-input").find("input").should("be.empty");
  });

  it("Displays party affiliation selection", () => {
    cy.candidateSearchParty(MOCK_PARTY);

    getSearchBadge(MOCK_PARTY).should("exist");
  });

  it("Allows removing of party affiliation selection via display badge", () => {
    getSearchBadge(MOCK_PARTY).get(BADGE_REMOVE_SELECTOR).click();

    getSelectAtIndex(0).should("have.value", "");
  });

  it("Displays office selection", () => {
    cy.candidateSearchOffice(MOCK_OFFICE);

    getSearchBadge(MOCK_OFFICE).should("exist");
  });

  it("Allows removing of office selection via display badge", () => {
    getSearchBadge(MOCK_OFFICE).get(BADGE_REMOVE_SELECTOR).click();

    getSelectAtIndex(1).should("have.value", "");
  });
});
