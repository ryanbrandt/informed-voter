export {};
Cypress.Commands.add("goToSearch", () => {
  cy.visit("/");
  cy.get("div").contains("Get Informed").click();
});

Cypress.Commands.add("candidateSearchName", (query: string) => {
  cy.get(".candidate_search-query-input").find("input").type(query);
});

Cypress.Commands.add("candidateSearchParty", (party: string) => {
  cy.get(".select_container").eq(0).find("select").select(party);
});

Cypress.Commands.add("candidateSearchOffice", (party: string) => {
  cy.get(".select_container").eq(1).find("select").select(party);
});
