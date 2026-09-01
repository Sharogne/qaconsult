// Page Object — en-tête et navigation principale.
// Les liens de nav ne portent pas de data-cy individuel : on les cible par
// leur libellé, ce qui garde le test lisible et proche de ce que voit
// l'utilisateur. Le conteneur, lui, a un data-cy pour la portée.
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
