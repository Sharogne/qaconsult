// Page Object — bandeau de chiffres animés.
// Chaque compteur part de 0 et rejoint la valeur de son attribut
// `data-target` : c'est cet attribut qui fait foi, jamais le texte initial.
export class ChiffresPage {
  get counters() {
    return cy.get('[data-cy="chiffres"] .counter');
  }
}

export const chiffresPage = new ChiffresPage();
