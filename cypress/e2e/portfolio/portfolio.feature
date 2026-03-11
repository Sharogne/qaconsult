# language: fr
Fonctionnalité: Portfolio Sylvain Chignaguet — Consultant QA Senior
  En tant que visiteur du site
  Je veux naviguer dans le portfolio
  Afin de découvrir les offres et contacter Sylvain

  Contexte:
    Étant donné que je visite la page d'accueil

  Scénario: Affichage du header et de la navigation
    Alors le header est visible
    Et le logo "Sylvain" est affiché
    Et les liens de navigation sont présents
    Et le bouton menu mobile est présent

  Scénario: Affichage du hero
    Alors le titre principal est visible
    Et le sous-titre mentionne "J'aide les équipes tech"
    Et la localisation "Bordeaux" est affichée
    Et le bloc de code Cypress est présent

  Scénario: Utilisation des CTA du hero
    Quand je clique sur le CTA "Découvrir mes offres"
    Alors l'ancre pointe vers la section "#offres"

  Scénario: Affichage des cartes d'expertise
    Alors la section expertise est visible
    Et au moins une carte d'expertise est affichée
    Et la technologie "Cypress" est mentionnée

  Scénario: Affichage des offres de service
    Alors la section offres est visible
    Et au moins 4 cartes d'offre sont affichées
    Et la carte "IA au Service de la Qualité" a le badge "Innovation"

  Scénario: Vérification du formulaire de contact
    Quand je navigue vers la section contact
    Alors le champ "Nom complet" est présent
    Et le champ "Adresse email" est présent
    Et le sélecteur de besoin est présent
    Et le champ message est présent
    Et le bouton d'envoi est visible

  Scénario: Chargement de la photo de profil
    Alors la photo de profil se charge correctement

  Scénario: Affichage du footer
    Alors le footer mentionne "Sylvain Chignaguet"
    Et le lien LinkedIn est présent dans le footer
    Et le lien GitHub est présent dans le footer
