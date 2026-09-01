Feature: CV en ligne de Sylvain Chignaguet — QA Automation Engineer

  Background:
    Given I visit the homepage

  Scenario: Header and navigation display
    Then the header is visible
    And the logo "Sylvain Chignaguet" is displayed
    And the navigation links are present
    And the mobile menu button is present

  Scenario: Hero section display
    Then the main title is visible
    And the subtitle mentions "gestion de projet"
    And the location "Bordeaux" is displayed
    And the profile picture loads correctly

  Scenario: LinkedIn and GitHub are prominent in the hero
    Then the LinkedIn card links to the LinkedIn profile
    And the GitHub card links to the GitHub profile

  Scenario: CV download button
    Then the CV download button is visible
    And the CV download button is labelled "Télécharger le CV"

  Scenario: Animated counters
    When I navigate to the section "chiffres"
    Then each counter reaches its target value

  Scenario: Career timeline display
    Then the experience section is visible
    And at least 4 experience entries are displayed
    And the entry for "Phenix" is marked as the current position
    And the entry for "Asobo Studio" lists the role "QA Lead"
    And the pre-tech block is collapsed by default

  Scenario: Skills display
    Then the skills section is visible
    And at least 8 skill cards are displayed
    And the technology "Cypress" is mentioned

  Scenario: Certifications and education
    Then the education section is visible
    And 4 certifications are displayed
    And the certification "Professional Scrum Master I" is present
    And the project management training at "Crossthink" is mentioned

  Scenario: Personal projects have no dead links
    Then the projects section is visible
    And 4 project cards are displayed
    And only 1 project card exposes a repository link
    And that link points to "https://github.com/Sharogne/qaconsult"
    And the card "Estran" exposes no link

  Scenario: Hobbies display
    Then the hobbies section is visible
    And 4 hobby cards are displayed

  Scenario: Contact form verification
    When I navigate to the section "contact"
    Then the field "Nom complet" is present
    And the field "Adresse email" is present
    And the message field is present
    And the submit button is visible
    And the form has no need selector

  Scenario: No freelance leftovers and no phone number on screen
    Then the page does not mention "Malt"
    And the page does not mention "Calendly"
    And the phone number is not visible on screen
    And the print-only CV blocks are hidden on screen

  Scenario: Footer display
    Then the footer mentions "Sylvain Chignaguet"
    And the LinkedIn link is present in the footer
    And the GitHub link is present in the footer
    And the footer has no Malt link
