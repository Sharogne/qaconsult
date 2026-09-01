// Page Object — section « Façon de travailler ».
export class MethodePage {
  get section() {
    return cy.get('[data-cy="methode-section"]');
  }

  get convictions() {
    return cy.get('[data-cy="methode-item"]');
  }
}

export const methodePage = new MethodePage();
