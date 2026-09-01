import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import { navigationPage } from '../../support/page-objects/navigation.po';
import { heroPage } from '../../support/page-objects/hero.po';
import { aboutPage } from '../../support/page-objects/about.po';
import { experiencePage } from '../../support/page-objects/experience.po';
import { skillsPage } from '../../support/page-objects/skills.po';
import { educationPage } from '../../support/page-objects/education.po';
import { projectsPage } from '../../support/page-objects/projects.po';
import { hobbiesPage } from '../../support/page-objects/hobbies.po';
import { contactPage } from '../../support/page-objects/contact.po';
import { footerPage } from '../../support/page-objects/footer.po';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sylvain-chignaguet-a7534286/';
const GITHUB_URL = 'https://github.com/Sharogne';

/* ==========================================================================
   Background
   ========================================================================== */

Given('I visit the homepage', () => {
  cy.visit('/');
});

When('I navigate to the section {string}', (sectionId: string) => {
  cy.navigateToSection(sectionId);
});

/* ==========================================================================
   En-tête et navigation
   ========================================================================== */

Then('the header is visible', () => {
  navigationPage.header.should('be.visible');
});

Then('the logo {string} is displayed', (text: string) => {
  navigationPage.logo.should('be.visible').and('contain.text', text);
});

Then('the navigation links are present', () => {
  ['Profil', 'Parcours', 'Compétences', 'Projets'].forEach((label) => {
    navigationPage.getLinkByText(label).should('exist');
  });
});

// Le bouton burger est masqué au-delà de 900 px : à la résolution de test
// (1280×720) on vérifie sa présence dans le DOM, pas sa visibilité.
Then('the mobile menu button is present', () => {
  navigationPage.mobileMenuBtn.should('exist').and('have.attr', 'aria-expanded', 'false');
});

/* ==========================================================================
   Hero
   ========================================================================== */

Then('the main title is visible', () => {
  heroPage.title.should('be.visible').and('contain.text', 'Chignaguet');
});

Then('the subtitle mentions {string}', (text: string) => {
  heroPage.subtitle.should('be.visible').and('contain.text', text);
});

Then('the location {string} is displayed', (text: string) => {
  heroPage.location.should('be.visible').and('contain.text', text);
});

// naturalWidth > 0 prouve que le fichier a bien été chargé, là où un simple
// should('exist') passerait aussi sur une image cassée.
Then('the profile picture loads correctly', () => {
  heroPage.profileImage
    .should('be.visible')
    .and(($img) => {
      const img = $img[0] as HTMLImageElement;
      expect(img.naturalWidth, 'largeur naturelle de la photo').to.be.greaterThan(0);
    });
});

Then('the LinkedIn card links to the LinkedIn profile', () => {
  heroPage.linkedinCard
    .should('be.visible')
    .and('have.attr', 'href', LINKEDIN_URL)
    .and('contain.text', 'LinkedIn');
});

Then('the GitHub card links to the GitHub profile', () => {
  heroPage.githubCard
    .should('be.visible')
    .and('have.attr', 'href', GITHUB_URL)
    .and('contain.text', 'GitHub');
});

Then('the CV download button is visible', () => {
  heroPage.downloadCvButton.should('be.visible');
});

Then('the CV download button is labelled {string}', (label: string) => {
  heroPage.downloadCvButton.should('contain.text', label);
});

/* ==========================================================================
   Compteurs animés
   ========================================================================== */

// L'animation dure 1600 ms : le retry intégré de should() attend que la
// valeur affichée rejoigne data-target, sans cy.wait() arbitraire.
Then('each counter reaches its target value', () => {
  aboutPage.counters.should('have.length.greaterThan', 0);
  aboutPage.counters.each(($counter) => {
    cy.wrap($counter).should(($el) => {
      expect($el.text().trim()).to.equal($el.attr('data-target'));
    });
  });
});

/* ==========================================================================
   Parcours
   ========================================================================== */

Then('the experience section is visible', () => {
  experiencePage.section.scrollIntoView().should('be.visible');
});

Then('at least {int} experience entries are displayed', (count: number) => {
  experiencePage.items.should('have.length.at.least', count);
});

Then('the entry for {string} is marked as the current position', (employer: string) => {
  experiencePage.getItemContaining(employer).should('contain.text', 'Poste actuel');
});

Then('the entry for {string} lists the role {string}', (employer: string, role: string) => {
  experiencePage.getItemContaining(employer).should('contain.text', role);
});

Then('the pre-tech block is collapsed by default', () => {
  experiencePage.beforeTech.should('exist').and('not.have.attr', 'open');
});

/* ==========================================================================
   Compétences
   ========================================================================== */

Then('the skills section is visible', () => {
  skillsPage.section.scrollIntoView().should('be.visible');
});

Then('at least {int} skill cards are displayed', (count: number) => {
  skillsPage.cards.should('have.length.at.least', count);
});

Then('the technology {string} is mentioned', (tech: string) => {
  skillsPage.section.should('contain.text', tech);
});

/* ==========================================================================
   Certifications et formation
   ========================================================================== */

Then('the education section is visible', () => {
  educationPage.section.scrollIntoView().should('be.visible');
});

Then('{int} certifications are displayed', (count: number) => {
  educationPage.certifications.should('have.length', count);
});

Then('the certification {string} is present', (name: string) => {
  educationPage.certifications.should('contain.text', name);
});

Then('the project management training at {string} is mentioned', (school: string) => {
  educationPage.section.should('contain.text', school).and('contain.text', 'Gestion de projet');
});

/* ==========================================================================
   Projets personnels
   Trois des quatre projets ne sont pas publics : leur carte ne doit exposer
   aucun lien, sous peine d'envoyer un recruteur sur une 404.
   ========================================================================== */

Then('the projects section is visible', () => {
  projectsPage.section.scrollIntoView().should('be.visible');
});

Then('{int} project cards are displayed', (count: number) => {
  projectsPage.cards.should('have.length', count);
});

Then('only {int} project card exposes a repository link', (count: number) => {
  projectsPage.links.should('have.length', count);
});

Then('that link points to {string}', (url: string) => {
  projectsPage.links.should('have.attr', 'href', url);
});

Then('the card {string} exposes no link', (name: string) => {
  projectsPage.getCardByName(name).find('a').should('not.exist');
});

/* ==========================================================================
   Centres d'intérêt
   ========================================================================== */

Then('the hobbies section is visible', () => {
  hobbiesPage.section.scrollIntoView().should('be.visible');
});

Then('{int} hobby cards are displayed', (count: number) => {
  hobbiesPage.cards.should('have.length', count);
});

/* ==========================================================================
   Contact
   ========================================================================== */

Then('the field {string} is present', (label: string) => {
  contactPage.form.contains('label', label).should('be.visible');
});

Then('the message field is present', () => {
  contactPage.messageTextarea.should('be.visible');
});

Then('the submit button is visible', () => {
  contactPage.submitButton.should('be.visible');
});

// Le sélecteur « type de besoin » appartenait au positionnement freelance.
Then('the form has no need selector', () => {
  contactPage.form.find('select').should('not.exist');
});

/* ==========================================================================
   Garde-fous du repositionnement
   ========================================================================== */

Then('the page does not mention {string}', (term: string) => {
  cy.get('body').invoke('text').should('not.include', term);
  cy.get(`a[href*="${term.toLowerCase()}"]`).should('not.exist');
});

// Le numéro reste dans le DOM pour le CV imprimé (@media print) mais ne doit
// jamais apparaître à l'écran.
Then('the phone number is not visible on screen', () => {
  cy.contains('06 45 13 01 82').should('not.be.visible');
});

/* ==========================================================================
   Pied de page
   ========================================================================== */

Then('the footer mentions {string}', (text: string) => {
  footerPage.footer.scrollIntoView().should('be.visible').and('contain.text', text);
});

Then('the LinkedIn link is present in the footer', () => {
  footerPage.linkedinLink.should('have.attr', 'href', LINKEDIN_URL);
});

Then('the GitHub link is present in the footer', () => {
  footerPage.githubLink.should('have.attr', 'href', GITHUB_URL);
});

Then('the footer has no Malt link', () => {
  footerPage.links.find('a[href*="malt"]').should('not.exist');
});
