export class FooterPage {
  get footer() {
    return cy.get('[data-cy="footer"]');
  }

  get links() {
    return cy.get('[data-cy="footer-links"]');
  }

  getLinkByText(text: string) {
    return this.links.contains('a', text);
  }
}

export const footerPage = new FooterPage();
