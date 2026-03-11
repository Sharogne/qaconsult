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

  get codeBlock() {
    return cy.get('[data-cy="code-block"]');
  }

  get typewriter() {
    return cy.get('[data-cy="typewriter"]');
  }

  getCtaByText(text: string) {
    return this.ctaContainer.contains('a', text);
  }
}

export const heroPage = new HeroPage();
