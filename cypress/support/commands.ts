// Commandes Cypress personnalisées pour le portfolio QA
// Ajouter ici les commandes réutilisables au fil du projet

Cypress.Commands.add('navigateToSection', (sectionId: string) => {
  cy.get(`#${sectionId}`).scrollIntoView();
  cy.get(`#${sectionId}`).should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Scrolle et attend qu'une section soit visible
       * @example cy.navigateToSection('contact')
       */
      navigateToSection(sectionId: string): Chainable<void>;
    }
  }
}
