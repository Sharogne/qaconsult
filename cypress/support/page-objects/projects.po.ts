// Page Object — projets personnels.
// Point d'attention métier : deux des quatre projets ne sont pas publics.
// Leur carte ne doit donc exposer aucun lien — d'où le getter `links`, qui
// sert à compter ceux de toute la section, et `getCardLink`, qui rattache
// chaque lien à sa carte.
export class ProjectsPage {
  get section() {
    return cy.get('[data-cy="projects-section"]');
  }

  get cards() {
    return cy.get('[data-cy="project-card"]');
  }

  get links() {
    return cy.get('[data-cy="project-link"]');
  }

  get allReposLink() {
    return cy.get('[data-cy="all-repos-link"]');
  }

  getCardByName(name: string) {
    return cy.contains('[data-cy="project-card"]', name);
  }

  getCardLink(name: string) {
    return this.getCardByName(name).find('[data-cy="project-link"]');
  }
}

export const projectsPage = new ProjectsPage();
