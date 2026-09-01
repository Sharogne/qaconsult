Feature: CV en ligne de Sylvain Chignaguet

  Le site est un CV une page destiné à des recruteurs. Ces scénarios couvrent
  ce qui doit rester vrai à l'écran : le contenu affiché, les interactions, et
  les garde-fous hérités du repositionnement (aucune trace de l'ancien site de
  consulting, aucune donnée personnelle de trop).

  Background:
    Given I visit the homepage

  Scenario: Header and navigation display
    Then the header is visible
    And the logo "Sylvain Chignaguet" is displayed
    And the navigation links are present
    And the mobile menu button is present

  Scenario: Mobile menu opens and closes on navigation
    When I switch to a mobile viewport
    And I open the mobile menu
    Then the mobile menu is open
    When I follow the navigation link "Parcours"
    Then the mobile menu is closed
    And the section "parcours" is in view

  Scenario: Hero section display
    Then the main title is visible
    And the subtitle mentions "gestion de projet"
    And the location "Bordeaux" is displayed
    And the profile picture loads correctly
    And the hero offers a link to the contact section

  Scenario: LinkedIn and GitHub are prominent in the hero
    Then the LinkedIn card links to the LinkedIn profile
    And the GitHub card links to the GitHub profile

  Scenario: The profile states the move towards project management
    Then the profile section is visible
    And the profile tells the move towards project management
    And 4 proof items back the profile

  Scenario: Animated counters
    When I navigate to the section "chiffres"
    Then each counter reaches its target value

  Scenario: Career timeline display
    Then the experience section is visible
    And at least 4 experience entries are displayed
    And the entry for "Phenix" is marked as the current position
    And the entry for "Asobo Studio" lists the role "QA Lead"

  # Le repère est posé à la charnière entre deux postes : il porte la fin de la
  # période, pas son début. La colonne doit donc décroître de haut en bas.
  Scenario: Timeline dates read as change markers
    Then each entry carries a single date marker
    And the date column reads "aujourd'hui, 2024, 2020, 2017" from the top down
    And the full periods stay hidden on screen

  Scenario: The pre-tech years stay folded until asked for
    Then the pre-tech block is collapsed by default
    When I expand the pre-tech block
    Then the pre-tech block reveals "Marine Nationale"

  Scenario: Skills display
    Then the skills section is visible
    And at least 8 skill cards are displayed
    And 6 know-how cards are displayed
    And the technology "Cypress" is mentioned

  Scenario: Certifications and education
    Then the education section is visible
    And 4 certifications are displayed
    And the certification "Professional Scrum Master I" is present
    And the project management training at "Crossthink" is mentioned

  # Trois des quatre projets sont privés ou pas encore livrés : leur carte ne
  # doit exposer aucun lien, sous peine d'envoyer un recruteur sur une 404.
  Scenario: Personal projects have no dead links
    Then the projects section is visible
    And 4 project cards are displayed
    And only 1 project card exposes a repository link
    And that link points to "https://github.com/Sharogne/qaconsult"
    And the card "Estran" exposes no link
    And the section links to all public repositories

  Scenario: Working style and field photos
    Then the working style section lists 4 convictions
    And the field photos load correctly

  Scenario: Hobbies display
    Then the hobbies section is visible
    And 4 hobby cards are displayed

  Scenario: Contact form verification
    When I navigate to the section "contact"
    Then the field "Nom complet" is present
    And the field "Adresse email" is present
    And the name and email fields are required
    And the message field is present
    And the submit button is visible
    And the form has no need selector

  Scenario: No freelance leftovers and no personal data on screen
    Then the page does not mention "Malt"
    And the page does not mention "Calendly"
    And the phone number is not visible on screen
    And the postal address is nowhere on the page
    And the print-only CV blocks are hidden on screen

  Scenario: Footer display
    Then the footer mentions "Sylvain Chignaguet"
    And the LinkedIn link is present in the footer
    And the GitHub link is present in the footer
    And the website link is present in the footer
    And the footer has no Malt link
