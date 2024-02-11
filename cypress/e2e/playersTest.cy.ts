describe('Test pages/PlayerList', () => {
    it('should render the title', () => {
        cy.visit('/');

        cy.get('[data-cy="title"]')
            .should('exist')
            .should('have.text', 'Unattended Test');
    });

    it('should display player link container', () => {
        cy.interceptGql('GetPlayers', 'getPlayers');

        cy.visit('/');

        cy.wait('@GetPlayers');

        cy.get('[data-cy="player-link-container"]')
            .should('exist')
            .should('have.length', 1);
    });
});
