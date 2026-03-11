export class ContactPage {
  get section() {
    return cy.get('[data-cy="contact-section"]');
  }

  get form() {
    return cy.get('[data-cy="contact-form"]');
  }

  get nameInput() {
    return cy.get('[data-cy="input-name"]');
  }

  get emailInput() {
    return cy.get('[data-cy="input-email"]');
  }

  get subjectSelect() {
    return cy.get('[data-cy="select-subject"]');
  }

  get messageTextarea() {
    return cy.get('[data-cy="textarea-message"]');
  }

  get submitButton() {
    return cy.get('[data-cy="submit-button"]');
  }
}

export const contactPage = new ContactPage();
