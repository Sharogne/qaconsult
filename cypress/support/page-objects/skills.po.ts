// Page Object — compétences techniques et savoir-faire.
// Remplace l'ancien expertise.po.ts : la section « offres » commerciales a
// disparu avec le repositionnement du site en CV.
export class SkillsPage {
  get section() {
    return cy.get('[data-cy="skills-section"]');
  }

  get cards() {
    return cy.get('[data-cy="skill-card"]');
  }

  get savoirFaireCards() {
    return cy.get('[data-cy="savoirfaire-card"]');
  }
}

export const skillsPage = new SkillsPage();
