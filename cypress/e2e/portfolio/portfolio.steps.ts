import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
import { navigationPage } from '../../support/page-objects/navigation.po';
import { heroPage } from '../../support/page-objects/hero.po';
import { expertisePage } from '../../support/page-objects/expertise.po';
import { contactPage } from '../../support/page-objects/contact.po';
import { footerPage } from '../../support/page-objects/footer.po';

// ─── Contexte ────────────────────────────────────────────────────────────────

Given('je visite la page d\'accueil', () => {
  cy.visit('/');
});

// ─── Navigation ──────────────────────────────────────────────────────────────

Then('le header est visible', () => {
  navigationPage.header.should('be.visible');
});

And('le logo {string} est affiché', (text: string) => {
  navigationPage.logo.should('contain.text', text);
});

And('les liens de navigation sont présents', () => {
  navigationPage.navLinks.should('be.visible');
  navigationPage.getLinkByText('Expertise').should('exist');
  navigationPage.getLinkByText('Offres').should('exist');
  navigationPage.getLinkByText('Approche').should('exist');
  navigationPage.getLinkByText('À propos').should('exist');
});

And('le bouton menu mobile est présent', () => {
  navigationPage.mobileMenuBtn
    .should('exist')
    .and('have.attr', 'aria-label', 'Menu');
});

// ─── Hero ─────────────────────────────────────────────────────────────────────

Then('le titre principal est visible', () => {
  heroPage.title.should('be.visible');
});

And('le sous-titre mentionne {string}', (text: string) => {
  heroPage.subtitle.should('contain.text', text);
});

And('la localisation {string} est affichée', (text: string) => {
  heroPage.location.should('contain.text', text);
});

And('le bloc de code Cypress est présent', () => {
  heroPage.codeBlock.should('be.visible');
  heroPage.typewriter.should('contain.text', 'cy.');
});

// ─── CTA ─────────────────────────────────────────────────────────────────────

When('je clique sur le CTA {string}', (text: string) => {
  heroPage.getCtaByText(text).click();
});

Then('l\'ancre pointe vers la section {string}', (href: string) => {
  heroPage.getCtaByText('Découvrir mes offres').should('have.attr', 'href', href);
});

// ─── Expertise ───────────────────────────────────────────────────────────────

Then('la section expertise est visible', () => {
  expertisePage.section.should('exist');
});

And('au moins une carte d\'expertise est affichée', () => {
  expertisePage.cards.should('have.length.gte', 1);
});

And('la technologie {string} est mentionnée', (tech: string) => {
  expertisePage.section.should('contain.text', tech);
});

// ─── Offres ───────────────────────────────────────────────────────────────────

Then('la section offres est visible', () => {
  expertisePage.offresSection.should('exist');
});

And('au moins 4 cartes d\'offre sont affichées', () => {
  expertisePage.offreCards.should('have.length.gte', 4);
});

And('la carte {string} a le badge {string}', (cardText: string, badgeText: string) => {
  expertisePage.iaCard.should('contain.text', cardText);
  expertisePage.badgeInnovation.should('contain.text', badgeText);
});

// ─── Contact ─────────────────────────────────────────────────────────────────

When('je navigue vers la section contact', () => {
  cy.navigateToSection('contact');
});

Then('le champ {string} est présent', (label: string) => {
  contactPage.section.contains('label', label).should('exist');
});

And('le sélecteur de besoin est présent', () => {
  contactPage.subjectSelect.should('exist');
});

And('le champ message est présent', () => {
  contactPage.messageTextarea.should('exist');
});

And('le bouton d\'envoi est visible', () => {
  contactPage.submitButton.should('be.visible');
});

// ─── Images ──────────────────────────────────────────────────────────────────

Then('la photo de profil se charge correctement', () => {
  cy.get('[data-cy="profile-image"]')
    .should('be.visible')
    .and(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
    });
});

// ─── Footer ──────────────────────────────────────────────────────────────────

Then('le footer mentionne {string}', (text: string) => {
  footerPage.footer.should('contain.text', text);
});

And('le lien LinkedIn est présent dans le footer', () => {
  footerPage
    .getLinkByText('LinkedIn')
    .should('have.attr', 'href', 'https://www.linkedin.com/in/sylvain-chignaguet-a7534286/');
});

And('le lien GitHub est présent dans le footer', () => {
  footerPage
    .getLinkByText('GitHub')
    .should('have.attr', 'href', 'https://github.com/Sharogne');
});

And('le lien Malt est présent dans le footer', () => {
  footerPage
    .getLinkByText('Malt')
    .should('have.attr', 'href', 'https://www.malt.fr/profile/sylvainchignaguet');
});
