// Page Object — pied de page.
// Le lien Malt a disparu du site avec le repositionnement en CV.
export class FooterPage {
  get footer() {
    return cy.get('[data-cy="footer"]');
  }

  get links() {
    return cy.get('[data-cy="footer-links"]');
  }

  get linkedinLink() {
    return cy.get('[data-cy="footer-link-linkedin"]');
  }

  get githubLink() {
    return cy.get('[data-cy="footer-link-github"]');
  }

  get websiteLink() {
    return cy.get('[data-cy="footer-link-website"]');
  }
}

export const footerPage = new FooterPage();
