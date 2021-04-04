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

describe("Search pagination", () => {
  const PAGING_DISABLED_CLASS = "page-disabled";

  before(() => {
    cy.goToSearch();
  });

  function getPaginationContainer() {
    return cy.get(".paging_controller-container");
  }

  function getPageLeft() {
    return cy.get(".page-left").eq(0);
  }

  function getPageRight() {
    return cy.get(".page-right").eq(0);
  }

  it("Paginates search results", () => {
    getPaginationContainer().should("be.visible");
    getPageLeft().should("have.class", PAGING_DISABLED_CLASS);
    getPageRight().should("not.have.class", PAGING_DISABLED_CLASS);
  });

  it("Moves through pages with pagination controls", () => {
    cy.getCandidateTableRows().then((firstPageChildren) => {
      getPageRight().click();

      cy.getCandidateTableRows().then((secondPageChildren) => {
        expect(firstPageChildren).not.deep.equal(secondPageChildren);
      });
    });
  });
});

describe("Candidate results rows", () => {
  before(() => {
    cy.goToSearch();
  });

  function getFirstRow() {
    return cy.getCandidateTableRows().eq(0);
  }

  function toggleFirstRow() {
    getFirstRow().find(".dropdown_container_masthead").click();
  }

  function assertDropdown(open: boolean) {
    let classSelector = ".dropdown-closed";
    if (open) {
      classSelector = ".dropdown-open";
    }

    getFirstRow().find(classSelector).should("exist");
  }

  it("Toggles open/closed with a click", () => {
    assertDropdown(false);
    toggleFirstRow();
    assertDropdown(true);
    toggleFirstRow();
    assertDropdown(false);
    toggleFirstRow();
    assertDropdown(true);
    toggleFirstRow();
    assertDropdown(false);
  });

  it("Displays state, district, office and party summary information when open", () => {
    toggleFirstRow();
    getFirstRow()
      .should("contain", "Office")
      .should("contain", "District")
      .should("contain", "State")
      .should("contain", "Party");
  });
});
