Feature: Portfolio Sylvain Chignaguet — Senior QA Consultant

  Background:
    Given I visit the homepage

  Scenario: Header and navigation display
    Then the header is visible
    And the logo "Sylvain" is displayed
    And the navigation links are present
    And the mobile menu button is present

  Scenario: Hero section display
    Then the main title is visible
    And the subtitle mentions "J'aide les équipes tech"
    And the location "Bordeaux" is displayed
    And the Cypress code block is present

  Scenario: Hero CTA usage
    When I click on the CTA "Découvrir mes offres"
    Then the anchor points to section "#offres"

  Scenario: Expertise cards display
    Then the expertise section is visible
    And at least one expertise card is displayed
    And the technology "Cypress" is mentioned

  Scenario: Service offers display
    Then the offers section is visible
    And at least 4 offer cards are displayed
    And the card "IA au Service de la Qualité" has the badge "Innovation"

  Scenario: Contact form verification
    When I navigate to the contact section
    Then the field "Nom complet" is present
    And the field "Adresse email" is present
    And the need selector is present
    And the message field is present
    And the submit button is visible

  Scenario: Profile picture loading
    Then the profile picture loads correctly

  Scenario: Footer display
    Then the footer mentions "Sylvain Chignaguet"
    And the LinkedIn link is present in the footer
    And the GitHub link is present in the footer
    And the Malt link is present in the footer
