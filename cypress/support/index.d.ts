declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to navigate to the candidate search page
     * @example cy.goToSearch()
     */
    goToSearch(): Chainable<Element>;

    /**
     * Custom command to type into the candidate search by-name input
     * @example cy.candidateSearchName('Bernie Sanders')
     */
    candidateSearchName(query: string): Chainable<Element>;

    /**
     * Custom command to select a candidate party affiliation
     * @example cy.candidateSearchParty('Democrat')
     */
    candidateSearchParty(party: string): Chainable<Element>;

    /**
     * Custom command to select a candidate office
     * @example cy.candidateSearchOffice('Congress')
     */
    candidateSearchOffice(office: string): Chainable<Element>;

    /**
     * Custom command to grab collection of table rows (tr's) from the
     * candidate results table
     * @example cy.getCandidateTableRows().eq(0).should("contain", "something")
     */
    getCandidateTableRows(): Chainable<Element>;
  }
}
