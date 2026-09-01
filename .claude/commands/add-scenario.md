Ajoute un ou plusieurs scénarios Gherkin dans `portfolio.feature` et implémente les steps manquants.

## Étape 1 — Écriture du scénario Gherkin

Dans `cypress/e2e/portfolio/portfolio.feature`, ajoute le scénario en respectant :
- Langue française, style cohérent avec les scénarios existants
- Réutilisation maximale des steps existants (vérifier `portfolio.steps.ts` avant d'en créer)
- Format :

```gherkin
  Scenario: Description courte et précise
    Given je visite la page d'accueil
    When [action optionnelle]
    Then [assertion principale]
    And [assertions complémentaires]
```

## Étape 2 — Identification des steps manquants

Compare les steps du nouveau scénario avec ceux déjà implémentés dans `portfolio.steps.ts`.
Liste uniquement les steps **nouveaux** à implémenter.

## Étape 3 — Vérification des `data-cy` nécessaires

Pour chaque élément ciblé par les nouveaux steps :
- Vérifier que l'attribut `data-cy` existe dans `index.html`
- Si manquant, l'ajouter en suivant les conventions du projet

## Étape 4 — Implémentation des steps

Dans `portfolio.steps.ts`, ajoute les steps manquants :
- Utiliser les page objects existants, jamais de `cy.get()` direct
- Créer un nouveau page object si nécessaire, avant l'implémentation
- Respecter les sections de commentaires existantes (`// ─── Section ───`)

## Conventions `data-cy`

| Type | Format | Exemple |
|------|--------|---------|
| Section | `[nom]-section` | `data-cy="contact-section"` |
| Input | `input-[nom]` | `data-cy="input-name"` |
| Textarea | `textarea-[nom]` | `data-cy="textarea-message"` |
| Bouton | `[action]-button` | `data-cy="submit-button"` |
| Lien footer | `footer-link-[réseau]` | `data-cy="footer-link-linkedin"` |
| Carte | `[type]-card` | `data-cy="project-card"` |
| Image | `[nom]-image` | `data-cy="profile-image"` |

---

## Demande

Scénario(s) à ajouter : $ARGUMENTS
