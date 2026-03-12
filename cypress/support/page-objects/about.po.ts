export class AboutPage {
  get section() {
    return cy.get('[data-cy="about-section"]');
  }

  get profileImage() {
    return cy.get('[data-cy="profile-image"]').scrollIntoView();
  }
}

export const aboutPage = new AboutPage();
