describe('Test pages/WinDetailList', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-cy="player-link-container"]').first().click();
    });

    it('should render the title', () => {
        cy.get('[data-cy="windetail-title"]')
            .should('exist')
            .should('have.text', 'Details of winning matches:');
    });

    it('should redirect to correct url', () => {
        cy.url().should('match', /\/players\//);
    });

    it("should display player's winning details", () => {
        cy.interceptGql('GetPlayers', 'getPlayers');
        cy.interceptGql('GetMatches', 'getMatches');

        cy.visit('/players/p-1');

        cy.wait('@GetPlayers');
        cy.wait('@GetMatches');

        cy.get('[data-cy="windetail"]')
            .should('exist')
            .should('have.length', 2);
    });
});
