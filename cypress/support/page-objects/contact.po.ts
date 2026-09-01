// Page Object — formulaire de contact.
// Le <select> « type de besoin » a été retiré avec le volet freelance :
// le formulaire se limite désormais à nom, email et message.
export class ContactPage {
  get form() {
    return cy.get('[data-cy="contact-form"]');
  }

  get nameInput() {
    return cy.get('[data-cy="input-name"]');
  }

  get emailInput() {
    return cy.get('[data-cy="input-email"]');
  }

  get messageTextarea() {
    return cy.get('[data-cy="textarea-message"]');
  }

  get submitButton() {
    return cy.get('[data-cy="submit-button"]');
  }
}

export const contactPage = new ContactPage();
