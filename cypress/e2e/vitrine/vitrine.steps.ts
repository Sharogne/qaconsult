import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import { contactPage, heroPage, vitrinePage } from '../../support/page-objects';

// Les step definitions sont globales (voir cypress-cucumber-preprocessor dans
// package.json) : l'en-tête, le menu mobile, les cartes de projets et le
// formulaire réutilisent ceux de portfolio.steps.ts. Ce fichier ne définit que
// ce qui est propre à la vitrine.

const CV_PATH = '/cv/';

/* ==========================================================================
   Background
   ========================================================================== */

Given('I visit the showcase page', () => {
  cy.visit('/');
});

/* ==========================================================================
   Hero et atouts
   ========================================================================== */

Then('the showcase title speaks about websites', () => {
  vitrinePage.heroTitle.should('be.visible').and('contain.text', 'site web');
});

Then('the showcase hero leads to a quote request', () => {
  vitrinePage.heroCta.contains('a', 'Demander un devis').should('have.attr', 'href', '#contact');
});

Then('{int} selling points are displayed', (count: number) => {
  vitrinePage.sellingPoints.should('have.length', count);
});

/* ==========================================================================
   Passerelle vers le CV
   ========================================================================== */

Then('the menu links to the CV', () => {
  vitrinePage.navCvLink.should('have.attr', 'href', CV_PATH);
});

Then('the hero links to the CV', () => {
  vitrinePage.heroCvLink.should('be.visible').and('have.attr', 'href', CV_PATH);
});

Then('the footer links to the CV', () => {
  vitrinePage.footerCvLink.should('have.attr', 'href', CV_PATH);
});

When('I follow the hero link to the CV', () => {
  vitrinePage.heroCvLink.click();
});

// Le bouton de téléchargement n'existe que sur le CV : le trouver prouve
// qu'on a atterri sur la bonne page, pas seulement sur la bonne URL.
Then('I land on the CV page', () => {
  cy.location('pathname').should('equal', CV_PATH);
  heroPage.downloadCvButton.should('be.visible');
});

/* ==========================================================================
   Tarifs
   ========================================================================== */

Then('{int} offers are displayed', (count: number) => {
  vitrinePage.offers.should('have.length', count);
});

// « 800 € », « 1 200 € » : un montant, puis le symbole euro. Un prix laissé
// vide ou remplacé par un « XX » de maquette ferait échouer ce step.
Then('every offer shows a starting price in euros', () => {
  vitrinePage.offers.each(($offer) => {
    cy.wrap($offer).should('contain.text', 'à partir de');
    cy.wrap($offer)
      .find('[data-cy="offer-price"]')
      .invoke('text')
      .should('match', /^\d{1,3}( \d{3})* €$/);
  });
});

Then('every offer leads to the contact form', () => {
  vitrinePage.offers.each(($offer) => {
    cy.wrap($offer).find('[data-cy="offer-cta"]').should('have.attr', 'href', '#contact');
  });
});

// Le bloc apparaît en fondu au défilement : on le fait défiler jusqu'à
// l'écran avant de juger de sa visibilité.
Then('the maintenance option shows a monthly price', () => {
  vitrinePage.maintenanceOffer.scrollIntoView().should('be.visible').and('contain.text', '€').and('contain.text', '/ mois');
});

/* ==========================================================================
   Formulaire de devis
   ========================================================================== */

// Chaque formule affichée doit pouvoir être choisie dans le formulaire :
// renommer une offre sans mettre à jour la liste ferait échouer ce step.
Then('the quote form lets the visitor pick an offer', () => {
  vitrinePage.offerSelect.should('be.visible').and('not.have.attr', 'required');
  vitrinePage.offers.find('h3').each(($name) => {
    vitrinePage.offerSelect.find(`option[value="${$name.text().trim()}"]`).should('exist');
  });
});

Then('the quote form is sent with the subject {string}', (subject: string) => {
  contactPage.form.find('input[name="_subject"]').should('have.value', subject);
});

/* ==========================================================================
   Données personnelles
   ========================================================================== */

// Contrairement au CV, qui garde le numéro dans un bloc réservé à
// l'impression, la vitrine ne doit pas l'avoir du tout dans son code.
Then('the phone number is nowhere in the showcase', () => {
  cy.document().then((doc) => {
    const html = doc.documentElement.outerHTML.replace(/[\s.]/g, '');
    expect(html, 'code source de la vitrine').to.not.include('0645130182');
  });
});
