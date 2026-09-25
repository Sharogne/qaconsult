Feature: Vitrine de création de sites web

  La racine du site s'adresse au grand public : artisans, commerçants,
  associations, indépendants. Elle présente l'offre, les réalisations et les
  tarifs. Le CV, lui, vit sous /cv/ ; la vitrine doit y mener en un clic,
  sans que les deux publics se marchent dessus.

  Background:
    Given I visit the showcase page

  Scenario: The showcase presents the web design offer
    Then the header is visible
    And the logo "Sylvain Chignaguet" is displayed
    And the showcase title speaks about websites
    And the showcase hero leads to a quote request
    And 4 selling points are displayed

  # Trois portes vers le CV : le menu, la carte « Qui suis-je ? » et le pied
  # de page. Le lien vise /cv/ avec la barre finale, l'adresse que GitHub
  # Pages sert sans redirection.
  Scenario: The CV is one click away from the showcase
    Then the menu links to the CV
    And the hero links to the CV
    And the footer links to the CV
    When I follow the hero link to the CV
    Then I land on the CV page

  Scenario: The mobile menu leads to the pricing
    When I switch to a mobile viewport
    And I open the mobile menu
    Then the mobile menu is open
    When I follow the navigation link "Tarifs"
    Then the mobile menu is closed
    And the section "tarifs" is in view

  Scenario: Pricing shows three offers and the maintenance option
    When I navigate to the section "tarifs"
    Then 3 offers are displayed
    And every offer shows a starting price in euros
    And every offer leads to the contact form
    And the maintenance option shows a monthly price
    And the pricing states the VAT exemption

  # Même garde-fou que sur le CV : un projet pas encore public ne doit pas
  # envoyer le visiteur sur une 404.
  Scenario: Showcase projects have no dead links
    Then the projects section is visible
    And 4 project cards are displayed
    And only 2 project cards expose a link
    And the card "Affirmatif ! éditions" links to "https://affirmatif-editions.fr/"
    And the card "chignaguet.fr" links to "https://github.com/Sharogne/qaconsult"
    And the card "Pile of Fame" exposes no link
    And the card "CarCare" exposes no link

  Scenario: Quote request form
    When I navigate to the section "contact"
    Then the field "Nom ou entreprise" is present
    And the name and email fields are required
    And the message field is present
    And the quote form lets the visitor pick an offer
    And the quote form is sent with the subject "Demande de devis depuis chignaguet.fr"
    And the submit button is visible

  # Obligatoires pour une micro-entreprise : identité de l'éditeur, SIRET,
  # régime de TVA, hébergeur. La page n'est pas indexée par les moteurs.
  Scenario: The legal notice is one click away and complete
    Then the footer links to the legal notice
    When I follow the footer link to the legal notice
    Then I land on the legal notice
    And the legal notice names the publisher "Sylvain Chignaguet"
    And the legal notice shows the SIRET "101 817 237 00015"
    And the legal notice states the VAT exemption
    And the legal notice names the host "GitHub"
    And the legal notice explains what happens to form data
    And the legal notice is kept out of search engines
    And the phone number is nowhere in the showcase

  # Le téléphone n'existe que sur le CV imprimé : la vitrine ne doit même pas
  # l'avoir dans son code source.
  Scenario: No personal data on the showcase
    Then the phone number is nowhere in the showcase
    And the postal address is nowhere on the page
