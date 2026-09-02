import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { heroPage } from '../../support/page-objects';
import type { RapportCvImprime } from '../../plugins/print-cv';

/**
 * Le rapport est produit une fois par scénario et rangé dans un alias :
 * Cypress les vide entre les tests, donc pas de variable de module à remettre
 * à zéro à la main.
 */
const ALIAS = 'cvImprime';

/** Lancer un Chrome, charger la page et produire le PDF prend une poignée de
 *  secondes : le délai par défaut de cy.task (60 s) est trop juste sur un
 *  runner chargé. */
const DELAI_GENERATION = 120_000;

const rapport = () => cy.get<RapportCvImprime>(`@${ALIAS}`);

/* ==========================================================================
   Déclenchement de l'impression
   ========================================================================== */

// window.print() ouvre une boîte de dialogue système, hors de portée d'un
// test navigateur : on remplace la fonction par un espion pour vérifier que le
// bouton la sollicite bien.
When('I click the CV download button', () => {
  cy.window().then((fenetre) => {
    cy.stub(fenetre, 'print').as('print');
  });
  heroPage.downloadCvButton.click();
});

Then('the browser is asked to print the page', () => {
  cy.get('@print').should('have.been.calledOnce');
});

// Cypress ne peut pas ouvrir la boîte de dialogue système : on déclenche les
// évènements que le navigateur émettrait de part et d'autre de l'impression.
When('the browser prepares the print', () => {
  cy.window().then((fenetre) => {
    fenetre.dispatchEvent(new Event('beforeprint'));
  });
});

When('the print is over', () => {
  cy.window().then((fenetre) => {
    fenetre.dispatchEvent(new Event('afterprint'));
  });
});

Then('the document title is {string}', (titre: string) => {
  cy.title().should('equal', titre);
});

/* ==========================================================================
   PDF réellement produit
   ========================================================================== */

When('I generate the printable CV', () => {
  cy.task<RapportCvImprime>(
    'analyserCvImprime',
    { url: `${Cypress.config('baseUrl')}/`, cheminNavigateur: cheminNavigateurCypress() },
    { timeout: DELAI_GENERATION }
  ).as(ALIAS);
});

Then('the printable CV is {int} pages long', (pages: number) => {
  rapport().should((cv) => {
    expect(cv.pages, 'nombre de pages du PDF généré').to.equal(pages);
  });
});

Then('the printable CV keeps at least {int} px of slack before a third page', (marge: number) => {
  rapport().should((cv) => {
    const restant = cv.pages * cv.hauteurPagePx - cv.hauteurContenuPx;
    expect(restant, 'pixels libres en bas de la dernière page').to.be.at.least(marge);
  });
});

Then('the printable CV shows {string}', (texte: string) => {
  rapport().should((cv) => {
    expect(cv.texte, `« ${texte} » sur le CV imprimé`).to.include(texte);
  });
});

Then('the printable CV omits {string}', (texte: string) => {
  rapport().should((cv) => {
    expect(cv.texte, `« ${texte} » ne doit pas figurer sur le CV imprimé`).to.not.include(texte);
  });
});

/* ==========================================================================
   Utilitaires
   ========================================================================== */

// Quand la suite tourne dans Chrome, autant réutiliser ce binaire plutôt que
// d'en chercher un autre sur la machine. Electron, lui, ne sait pas produire
// de PDF via Puppeteer : la tâche retombera sur sa propre détection.
function cheminNavigateurCypress(): string | undefined {
  const navigateur = Cypress.browser;
  if (navigateur.family === 'chromium' && navigateur.name !== 'electron') {
    return navigateur.path || undefined;
  }
  return undefined;
}

/* ==========================================================================
   Bouton de téléchargement
   ========================================================================== */

Then('the CV download button is visible', () => {
  heroPage.downloadCvButton.should('be.visible');
});

Then('the CV download button is labelled {string}', (label: string) => {
  heroPage.downloadCvButton.should('contain.text', label);
});
