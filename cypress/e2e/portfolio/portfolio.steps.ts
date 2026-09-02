import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import {
  navigationPage,
  heroPage,
  profilPage,
  chiffresPage,
  experiencePage,
  skillsPage,
  educationPage,
  projectsPage,
  methodePage,
  terrainPage,
  hobbiesPage,
  contactPage,
  footerPage,
} from '../../support/page-objects';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sylvain-chignaguet-a7534286/';
const GITHUB_URL = 'https://github.com/Sharogne';
const SITE_URL = 'https://www.chignaguet.fr';

/* ==========================================================================
   Background et navigation
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

When('I switch to a mobile viewport', () => {
  cy.viewport('iphone-x');
});

When('I open the mobile menu', () => {
  navigationPage.mobileMenuBtn.click();
});

When('I follow the navigation link {string}', (label: string) => {
  navigationPage.getLinkByText(label).click();
});

Then('the mobile menu is open', () => {
  navigationPage.mobileMenuBtn.should('have.attr', 'aria-expanded', 'true');
  navigationPage.navLinks.should('have.class', 'is-open');
});

Then('the mobile menu is closed', () => {
  navigationPage.mobileMenuBtn.should('have.attr', 'aria-expanded', 'false');
  navigationPage.navLinks.should('not.have.class', 'is-open');
});

Then('the section {string} is in view', (sectionId: string) => {
  cy.get(`#${sectionId}`).should('be.visible');
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

Then('the hero offers a link to the contact section', () => {
  heroPage.getCtaByText('Me contacter').should('have.attr', 'href', '#contact');
});

/* ==========================================================================
   Profil et chiffres
   ========================================================================== */

Then('the profile section is visible', () => {
  profilPage.section.scrollIntoView().should('be.visible');
});

Then('the profile tells the move towards product', () => {
  profilPage.section
    .should('contain.text', 'pilotage')
    .and('contain.text', 'product owner, product manager');
});

Then('{int} proof items back the profile', (count: number) => {
  profilPage.preuves.should('have.length', count);
});

// L'animation dure 1600 ms : le retry intégré de should() attend que la
// valeur affichée rejoigne data-target, sans cy.wait() arbitraire.
Then('each counter reaches its target value', () => {
  chiffresPage.counters.should('have.length.greaterThan', 0);
  chiffresPage.counters.each(($counter) => {
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

// Le repère de date est posé en haut de chaque carte, donc à la charnière
// entre deux postes : il porte la date de fin de la période. La colonne se lit
// « aujourd'hui » puis les années, en ordre décroissant. La période complète et
// la durée existent dans le DOM mais sont réservées au CV imprimé.
Then('each entry carries a single date marker', () => {
  experiencePage.annees.should('have.length.at.least', 4);
  experiencePage.annees.each(($annee) => {
    expect($annee.text().trim(), 'repère de date à l\'écran').to.match(
      /^(\d{4}|aujourd'hui)$/
    );
  });
});

Then('the date column reads {string} from the top down', (attendu: string) => {
  const reperes = attendu.split(', ');
  experiencePage.annees.should(($annees) => {
    const lus = [...$annees].map((el) => el.textContent?.trim());
    expect(lus, 'colonne de dates').to.deep.equal(reperes);
  });
});

Then('the full periods stay hidden on screen', () => {
  experiencePage.periodes.should('have.length.at.least', 4);
  experiencePage.periodes.each(($periode) => {
    cy.wrap($periode).should('not.be.visible');
  });
});

Then('the pre-tech block is collapsed by default', () => {
  experiencePage.beforeTech.should('exist').and('not.have.attr', 'open');
});

When('I expand the pre-tech block', () => {
  experiencePage.beforeTechToggle.click();
});

// `should('have.attr', 'open')` renvoie la valeur de l'attribut comme nouveau
// sujet : enchaîner un `.and('contain.text')` derrière porterait sur une
// chaîne, pas sur l'élément. D'où deux assertions séparées.
Then('the pre-tech block reveals {string}', (employer: string) => {
  experiencePage.beforeTech.should('have.attr', 'open');
  experiencePage.beforeTech.should('contain.text', employer);
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

Then('{int} know-how cards are displayed', (count: number) => {
  skillsPage.savoirFaireCards.should('have.length', count);
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

Then('the section links to all public repositories', () => {
  projectsPage.allReposLink.should('have.attr', 'href', GITHUB_URL);
});

/* ==========================================================================
   Façon de travailler et terrain
   ========================================================================== */

Then('the working style section lists {int} convictions', (count: number) => {
  methodePage.section.scrollIntoView().should('be.visible');
  methodePage.convictions.should('have.length', count);
});

Then('the field photos load correctly', () => {
  terrainPage.section.scrollIntoView().should('be.visible');
  terrainPage.photos.should('have.length', 2);
  terrainPage.photos.each(($img) => {
    const img = $img[0] as HTMLImageElement;
    cy.wrap($img).should(() => {
      expect(img.naturalWidth, `chargement de ${img.getAttribute('src')}`).to.be.greaterThan(0);
    });
    expect(img.getAttribute('alt'), 'texte alternatif').to.not.be.empty;
  });
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

Then('the name and email fields are required', () => {
  contactPage.nameInput.should('have.attr', 'required');
  contactPage.emailInput.should('have.attr', 'required');
  contactPage.emailInput.should('have.attr', 'type', 'email');
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

// Le CV imprimé s'appuie sur des blocs présents dans le DOM mais masqués à
// l'écran (coordonnées complètes, profil condensé). S'ils devenaient visibles,
// la page afficherait deux fois le même profil et exposerait le téléphone.
Then('the print-only CV blocks are hidden on screen', () => {
  cy.get('.print-only').should('have.length.at.least', 2);
  cy.get('.print-only').each(($el) => {
    cy.wrap($el).should('not.be.visible');
  });
});

// L'adresse postale complète n'est publiée nulle part : la page se limite à
// la commune.
Then('the postal address is nowhere on the page', () => {
  cy.get('body').invoke('text').should('not.include', 'route de Créon');
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

Then('the website link is present in the footer', () => {
  footerPage.websiteLink.should('have.attr', 'href', SITE_URL);
});

Then('the footer has no Malt link', () => {
  footerPage.links.find('a[href*="malt"]').should('not.exist');
});
