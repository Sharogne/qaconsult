// Page Object — centres d'intérêt.
export class HobbiesPage {
  get section() {
    return cy.get('[data-cy="hobbies-section"]');
  }

  get cards() {
    return cy.get('[data-cy="hobby-card"]');
  }
}

export const hobbiesPage = new HobbiesPage();
