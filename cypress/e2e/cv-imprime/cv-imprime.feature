Feature: CV téléchargeable

  Le bouton « Télécharger le CV » n'envoie pas de fichier : il appelle
  window.print(), et c'est la feuille @media print qui remet la page en forme.
  Ces scénarios vérifient les deux moitiés de cette mécanique : le
  déclenchement côté navigateur, puis le PDF réellement produit.

  Le PDF est généré par une tâche Node qui rejoue l'impression dans un Chrome
  sans interface. Sans elle, la seule chose testable serait le clic.

  Background:
    Given I visit the homepage

  Scenario: The download button triggers printing
    Then the CV download button is visible
    And the CV download button is labelled "Télécharger le CV"
    When I click the CV download button
    Then the browser is asked to print the page

  # Deux pages, c'est la contrainte de fond : un CV qui déborde sur une
  # troisième page se fait lire en diagonale. La marge résiduelle est vérifiée
  # séparément parce que Firefox arrondit les métriques de police autrement que
  # Chromium, d'une centaine de pixels sur l'ensemble du document.
  Scenario: The printable CV still fits on two A4 pages
    When I generate the printable CV
    Then the printable CV is 2 pages long
    And the printable CV keeps at least 120 px of slack before a third page

  Scenario: The printable CV carries the contact details reserved for it
    When I generate the printable CV
    Then the printable CV shows "sylvain.chignaguet@gmail.com"
    And the printable CV shows "06 45 13 01 82"
    And the printable CV shows "linkedin.com/in/sylvain-chignaguet-a7534286"
    And the printable CV shows "github.com/Sharogne"

  Scenario: The printable CV carries the whole career
    When I generate the printable CV
    Then the printable CV shows "Phenix"
    And the printable CV shows "Asobo Studio"
    And the printable CV shows "QA Lead"
    And the printable CV shows "Marine Nationale"
    And the printable CV shows "Professional Scrum Product Owner I"
    And the printable CV shows "Crossthink"
    And the printable CV shows "Estran"
    And the printable CV shows "Peinture"

  # Les compteurs mettent 1,6 s à rejoindre leur valeur et ne démarrent qu'au
  # défilement. Imprimer trop tôt figerait des zéros, ou un chiffre attrapé en
  # cours d'animation.
  Scenario: The printable CV carries the counters at their final value
    When I generate the printable CV
    Then the printable CV shows "8+ Années d'expérience QA"
    And the printable CV shows "30+ Projets livrés, du grand public au B2B"
    And the printable CV shows "2 Équipes QA montées et recrutées"
    And the printable CV shows "4 Certifications agile & produit"

  # Ce qui n'a pas sa place sur un CV papier : la navigation, les appels à
  # l'action, le formulaire, et le paragraphe de profil long réservé à l'écran.
  Scenario: The printable CV drops what belongs to the screen
    When I generate the printable CV
    Then the printable CV omits "Télécharger le CV"
    And the printable CV omits "Me contacter"
    And the printable CV omits "Envoyer le message"
    And the printable CV omits "Aller au contenu"
