// Page Object — section « Profil ».
// C'est le cœur du dossier : le récit QA vers gestion de projet et les
// preuves qui l'appuient. Le paragraphe condensé destiné au CV imprimé vit
// dans la même section, masqué à l'écran par la classe `print-only`.
export class ProfilPage {
  get section() {
    return cy.get('[data-cy="about-section"]');
  }

  get preuves() {
    return cy.get('[data-cy="proof-item"]');
  }
}

export const profilPage = new ProfilPage();
