export class ExpertisePage {
  get section() {
    return cy.get('[data-cy="expertise-section"]');
  }

  get cards() {
    return cy.get('[data-cy="expertise-card"]');
  }

  get offresSection() {
    return cy.get('[data-cy="offres-section"]');
  }

  get offreCards() {
    return cy.get('[data-cy*="offre-card"]');
  }

  get iaCard() {
    return cy.get('[data-cy*="offre-card-ia"]');
  }

  get badgeInnovation() {
    return cy.get('[data-cy="badge-innovation"]');
  }
}

export const expertisePage = new ExpertisePage();
