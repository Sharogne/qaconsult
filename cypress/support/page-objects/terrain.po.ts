// Page Object — section « En terrain ».
// Les deux photos sont chargées en différé : le test doit les faire entrer
// dans le viewport avant de juger de leur chargement.
export class TerrainPage {
  get section() {
    return cy.get('[data-cy="terrain-section"]');
  }

  get photos() {
    return cy.get('[data-cy="terrain-photo"] img');
  }
}

export const terrainPage = new TerrainPage();
