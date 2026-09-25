// Page Object — mentions légales, servies sous /mentions-legales/.
// Le pied de page qui y mène est le même sur la vitrine et sur le CV : son
// lien est ciblé ici plutôt que dupliqué dans footer.po.ts et vitrine.po.ts.
export class MentionsLegalesPage {
  get footerLink() {
    return cy.get('[data-cy="footer-link-legal"]');
  }

  get page() {
    return cy.get('[data-cy="legal-page"]');
  }

  get publisher() {
    return cy.get('[data-cy="legal-publisher"]');
  }

  get siret() {
    return cy.get('[data-cy="legal-siret"]');
  }

  get vat() {
    return cy.get('[data-cy="legal-vat"]');
  }

  get host() {
    return cy.get('[data-cy="legal-host"]');
  }

  get privacy() {
    return cy.get('[data-cy="legal-privacy"]');
  }
}

export const mentionsLegalesPage = new MentionsLegalesPage();
