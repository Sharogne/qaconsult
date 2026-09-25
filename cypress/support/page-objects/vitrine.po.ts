// Page Object — la vitrine grand public, servie à la racine du site.
// L'en-tête, les cartes de réalisations, le formulaire et le pied de page
// reprennent les data-cy du CV : leurs Page Objects (navigation, projects,
// contact, footer) servent tels quels. Ne figure ici que ce qui n'existe
// que sur la vitrine.
export class VitrinePage {
  get heroTitle() {
    return cy.get('[data-cy="hero-title"]');
  }

  get heroCta() {
    return cy.get('[data-cy="hero-cta"]');
  }

  get sellingPoints() {
    return cy.get('[data-cy="atout-card"]');
  }

  // Les trois accès au CV : menu, carte « Qui suis-je ? » du hero, pied de page.
  get navCvLink() {
    return cy.get('[data-cy="nav-cv"]');
  }

  get heroCvLink() {
    return cy.get('[data-cy="hero-cv-link"]');
  }

  get footerCvLink() {
    return cy.get('[data-cy="footer-link-cv"]');
  }

  get pricingSection() {
    return cy.get('[data-cy="pricing-section"]');
  }

  get offers() {
    return cy.get('[data-cy="offer-card"]');
  }

  get maintenanceOffer() {
    return cy.get('[data-cy="maintenance-offer"]');
  }

  get offerSelect() {
    return cy.get('[data-cy="select-offer"]');
  }
}

export const vitrinePage = new VitrinePage();
