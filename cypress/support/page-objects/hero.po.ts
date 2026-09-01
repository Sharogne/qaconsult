// Page Object — bloc d'ouverture du CV.
// Le bouton « Télécharger le CV » déclenche window.print() : on ne teste
// que sa présence, l'ouverture d'une boîte de dialogue système étant hors
// de portée d'un test navigateur.
export class HeroPage {
  get section() {
    return cy.get('[data-cy="hero"]');
  }

  get title() {
    return cy.get('[data-cy="hero-title"]');
  }

  get subtitle() {
    return cy.get('[data-cy="hero-subtitle"]');
  }

  get location() {
    return cy.get('[data-cy="hero-location"]');
  }

  get ctaContainer() {
    return cy.get('[data-cy="hero-cta"]');
  }

  get downloadCvButton() {
    return cy.get('[data-cy="cv-download"]');
  }

  get profileImage() {
    return cy.get('[data-cy="profile-image"]');
  }

  get linkedinCard() {
    return cy.get('[data-cy="social-linkedin"]');
  }

  get githubCard() {
    return cy.get('[data-cy="social-github"]');
  }

  getCtaByText(text: string) {
    return this.ctaContainer.contains('a, button', text);
  }
}

export const heroPage = new HeroPage();
