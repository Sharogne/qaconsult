import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { navigationPage } from '../../support/page-objects/navigation.po';
import { heroPage } from '../../support/page-objects/hero.po';
import { expertisePage } from '../../support/page-objects/expertise.po';
import { contactPage } from '../../support/page-objects/contact.po';
import { footerPage } from '../../support/page-objects/footer.po';
import { aboutPage } from '../../support/page-objects/about.po';

// ─── Background ───────────────────────────────────────────────────────────────

Given('I visit the homepage', () => {
  cy.visit('/');
});

// ─── Navigation ──────────────────────────────────────────────────────────────

Then('the header is visible', () => {
  navigationPage.header.should('be.visible');
});

Then('the logo {string} is displayed', (text: string) => {
  navigationPage.logo.should('contain.text', text);
});

Then('the navigation links are present', () => {
  navigationPage.navLinks.should('be.visible');
  navigationPage.getLinkByText('Expertise').should('exist');
  navigationPage.getLinkByText('Offres').should('exist');
  navigationPage.getLinkByText('Approche').should('exist');
  navigationPage.getLinkByText('À propos').should('exist');
});

Then('the mobile menu button is present', () => {
  navigationPage.mobileMenuBtn
    .should('exist')
    .and('have.attr', 'aria-label', 'Menu');
});

// ─── Hero ─────────────────────────────────────────────────────────────────────

Then('the main title is visible', () => {
  heroPage.title.should('be.visible');
});

Then('the subtitle mentions {string}', (text: string) => {
  heroPage.subtitle.should('contain.text', text);
});

Then('the location {string} is displayed', (text: string) => {
  heroPage.location.should('contain.text', text);
});

Then('the Cypress code block is present', () => {
  heroPage.codeBlock.should('be.visible');
  heroPage.typewriter.should('contain.text', 'cy.');
});

// ─── CTA ─────────────────────────────────────────────────────────────────────

When('I click on the CTA {string}', (text: string) => {
  heroPage.getCtaByText(text).click();
});

Then('the anchor points to section {string}', (href: string) => {
  heroPage.getCtaByText('Découvrir mes offres').should('have.attr', 'href', href);
});

// ─── Expertise ───────────────────────────────────────────────────────────────

Then('the expertise section is visible', () => {
  expertisePage.section.should('exist');
});

Then('at least one expertise card is displayed', () => {
  expertisePage.cards.should('have.length.gte', 1);
});

Then('the technology {string} is mentioned', (tech: string) => {
  expertisePage.section.should('contain.text', tech);
});

// ─── Offers ───────────────────────────────────────────────────────────────────

Then('the offers section is visible', () => {
  expertisePage.offresSection.should('exist');
});

Then('at least 4 offer cards are displayed', () => {
  expertisePage.offreCards.should('have.length.gte', 4);
});

Then('the card {string} has the badge {string}', (cardText: string, badgeText: string) => {
  expertisePage.iaCard.should('contain.text', cardText);
  expertisePage.badgeInnovation.should('contain.text', badgeText);
});

// ─── Contact ─────────────────────────────────────────────────────────────────

When('I navigate to the contact section', () => {
  cy.navigateToSection('contact');
});

Then('the field {string} is present', (label: string) => {
  contactPage.section.contains('label', label).should('exist');
});

Then('the need selector is present', () => {
  contactPage.subjectSelect.should('exist');
});

Then('the message field is present', () => {
  contactPage.messageTextarea.should('exist');
});

Then('the submit button is visible', () => {
  contactPage.submitButton.should('be.visible');
});

// ─── About ────────────────────────────────────────────────────────────────────

Then('the profile picture loads correctly', () => {
  aboutPage.profileImage
    .should('exist')
    .and(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
    });
});

// ─── Footer ──────────────────────────────────────────────────────────────────

Then('the footer mentions {string}', (text: string) => {
  footerPage.footer.should('contain.text', text);
});

Then('the LinkedIn link is present in the footer', () => {
  footerPage.linkedinLink
    .should('have.attr', 'href', 'https://www.linkedin.com/in/sylvain-chignaguet-a7534286/');
});

Then('the GitHub link is present in the footer', () => {
  footerPage.githubLink
    .should('have.attr', 'href', 'https://github.com/Sharogne');
});

Then('the Malt link is present in the footer', () => {
  footerPage.maltLink
    .should('have.attr', 'href', 'https://www.malt.fr/profile/sylvainchignaguet');
});
