// Page Object — certifications et formation.
export class EducationPage {
  get section() {
    return cy.get('[data-cy="education-section"]');
  }

  get certifications() {
    return cy.get('[data-cy="certification-card"]');
  }
}

export const educationPage = new EducationPage();
