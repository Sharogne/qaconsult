export class NavigationPage {
  get header() {
    return cy.get('[data-cy="header"]');
  }

  get logo() {
    return cy.get('[data-cy="logo"]');
  }

  get navLinks() {
    return cy.get('[data-cy="nav-links"]');
  }

  get mobileMenuBtn() {
    return cy.get('[data-cy="mobile-menu-btn"]');
  }

  getLinkByText(text: string) {
    return this.navLinks.contains('a', text);
  }
}

export const navigationPage = new NavigationPage();
