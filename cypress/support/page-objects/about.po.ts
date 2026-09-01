// Page Object — section « Profil ».
// Le sélecteur pointe vers data-cy="about-section", posé sur <section id="profil">.
export class AboutPage {
  get section() {
    return cy.get('[data-cy="about-section"]').scrollIntoView();
  }

  get chiffres() {
    return cy.get('[data-cy="chiffres"]');
  }

  get counters() {
    return cy.get('[data-cy="chiffres"] .counter');
  }
}

export const aboutPage = new AboutPage();
