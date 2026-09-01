// Page Object — projets personnels.
// Point d'attention métier : trois des quatre projets ne sont pas publics.
// Leur carte ne doit donc exposer aucun lien — d'où le getter `links`, qui
// sert à vérifier qu'il n'y en a qu'un seul dans toute la section.
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
}

export const projectsPage = new ProjectsPage();
