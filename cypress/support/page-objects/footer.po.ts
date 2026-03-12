export class FooterPage {
  get footer() {
    return cy.get('[data-cy="footer"]');
  }

  get linkedinLink() {
    return cy.get('[data-cy="footer-link-linkedin"]');
  }

  get githubLink() {
    return cy.get('[data-cy="footer-link-github"]');
  }

  get maltLink() {
    return cy.get('[data-cy="footer-link-malt"]');
  }
}

export const footerPage = new FooterPage();
