// Page Object — timeline du parcours professionnel.
// Chaque expérience est un <article data-cy="experience-item"> : un seul
// sélecteur suffit pour compter les entrées, et .contains() permet de
// viser un employeur précis sans multiplier les data-cy.
//
// La colonne de gauche porte deux écritures de la même date. L'écran ne
// montre que l'année de changement, pour rester lisible dans une colonne
// étroite ; le CV imprimé rétablit la période complète et la durée. Les deux
// getters ci-dessous servent à vérifier que ce partage tient.
export class ExperiencePage {
  get section() {
    return cy.get('[data-cy="experience-section"]');
  }

  get items() {
    return cy.get('[data-cy="experience-item"]');
  }

  get annees() {
    return cy.get('[data-cy="experience-item"] .tl-year');
  }

  get periodes() {
    return cy.get('[data-cy="experience-item"] .tl-period');
  }

  get beforeTech() {
    return cy.get('[data-cy="before-tech"]');
  }

  get beforeTechToggle() {
    return cy.get('[data-cy="before-tech"] summary');
  }

  getItemContaining(text: string) {
    return cy.contains('[data-cy="experience-item"]', text);
  }
}

export const experiencePage = new ExperiencePage();
