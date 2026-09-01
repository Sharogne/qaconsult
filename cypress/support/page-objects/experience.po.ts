// Page Object — timeline du parcours professionnel.
// Chaque expérience est un <article data-cy="experience-item"> : un seul
// sélecteur suffit pour compter les entrées, et .contains() permet de
// viser un employeur précis sans multiplier les data-cy.
export class ExperiencePage {
  get section() {
    return cy.get('[data-cy="experience-section"]');
  }

  get items() {
    return cy.get('[data-cy="experience-item"]');
  }

  get beforeTech() {
    return cy.get('[data-cy="before-tech"]');
  }

  getItemContaining(text: string) {
    return cy.contains('[data-cy="experience-item"]', text);
  }
}

export const experiencePage = new ExperiencePage();
