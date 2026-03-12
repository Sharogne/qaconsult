# language: fr
# ─────────────────────────────────────────────────────────────────────────────
# Fichier Feature (Gherkin)
#
# C'est le cœur du BDD (Behavior-Driven Development).
# Il décrit le comportement attendu de l'application en langage naturel,
# compréhensible par les développeurs, testeurs ET les non-techniciens.
#
# Structure d'une fonctionnalité :
#   Fonctionnalité → titre de la fonctionnalité testée
#   En tant que    → qui est l'utilisateur concerné
#   Je veux        → ce qu'il veut faire
#   Afin de        → la valeur métier obtenue (le "pourquoi")
# ─────────────────────────────────────────────────────────────────────────────
Fonctionnalité: Portfolio Sylvain Chignaguet — Consultant QA Senior
  En tant que visiteur du site
  Je veux naviguer dans le portfolio
  Afin de découvrir les offres et contacter Sylvain

  # ── Contexte ────────────────────────────────────────────────────────────────
  # Le Contexte (Background) s'exécute AVANT chaque scénario de ce fichier.
  # Évite de répéter le même "Given" dans chaque scénario.
  Contexte:
    Étant donné que je visite la page d'accueil

  # ── Scénarios ───────────────────────────────────────────────────────────────
  # Un scénario = un comportement précis à tester.
  # Structure : Given (contexte) → When (action) → Then (résultat attendu)
  # "Et" est un alias de Given/When/Then pour améliorer la lisibilité.

  Scénario: Affichage du header et de la navigation
    # Pas de When ici : c'est une vérification passive, sans action utilisateur
    Alors le header est visible
    Et le logo "Sylvain" est affiché
    Et les liens de navigation sont présents
    Et le bouton menu mobile est présent

  Scénario: Affichage du hero
    Alors le titre principal est visible
    # {string} est un paramètre Gherkin : la valeur entre guillemets est injectée
    # dans la step definition TypeScript correspondante
    Et le sous-titre mentionne "J'aide les équipes tech"
    Et la localisation "Bordeaux" est affichée
    Et le bloc de code Cypress est présent

  Scénario: Utilisation des CTA du hero
    # When déclenche une action utilisateur (clic, saisie, navigation...)
    Quand je clique sur le CTA "Découvrir mes offres"
    # Then vérifie le résultat observable dans l'interface
    Alors l'ancre pointe vers la section "#offres"

  Scénario: Affichage des cartes d'expertise
    Alors la section expertise est visible
    Et au moins une carte d'expertise est affichée
    Et la technologie "Cypress" est mentionnée

  Scénario: Affichage des offres de service
    Alors la section offres est visible
    Et au moins 4 cartes d'offre sont affichées
    # Deux paramètres {string} → deux arguments injectés dans le step TypeScript
    Et la carte "IA au Service de la Qualité" a le badge "Innovation"

  Scénario: Vérification du formulaire de contact
    Quand je navigue vers la section contact
    Alors le champ "Nom complet" est présent
    Et le champ "Adresse email" est présent
    Et le sélecteur de besoin est présent
    Et le champ message est présent
    Et le bouton d'envoi est visible

  Scénario: Chargement de la photo de profil
    # Vérifie que l'image est réellement chargée (naturalWidth > 0),
    # pas seulement que la balise <img> est présente dans le DOM
    Alors la photo de profil se charge correctement

  Scénario: Affichage du footer
    Alors le footer mentionne "Sylvain Chignaguet"
    Et le lien LinkedIn est présent dans le footer
    Et le lien GitHub est présent dans le footer
    Et le lien Malt est présent dans le footer
