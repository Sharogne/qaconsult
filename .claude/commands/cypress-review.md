Effectue une revue qualité complète des tests Cypress de ce projet.

## 1. Sélecteurs (priorité haute)

- [ ] Tous les `cy.get()` utilisent `[data-cy="..."]`
- [ ] Aucun sélecteur CSS fragile (classes, IDs, tags, attributs HTML)
- [ ] Les sélecteurs `data-cy` dans les page objects correspondent aux attributs dans `index.html`
- [ ] `[data-cy*="..."]` utilisé uniquement quand nécessaire (double identité)

## 2. Page Object Model

- [ ] Aucun `cy.get()` direct dans les steps — tout passe par les page objects
- [ ] Chaque section testée a son propre page object dédié
- [ ] Les getters sont des propriétés (pas de méthodes sans paramètres)
- [ ] Les méthodes dynamiques ont des paramètres typés TypeScript

## 3. Feature files (Gherkin)

- [ ] Scénarios en Anglais, cohérents avec le style existant
- [ ] Chaque scénario teste un comportement précis, pas plusieurs à la fois
- [ ] Given/When/Then/And utilisés sémantiquement
- [ ] Pas de logique technique dans les scénarios (valeurs hardcodées dans les steps, pas dans le feature)

## 4. Steps definitions

- [ ] Chaque step fait une seule chose
- [ ] Tous les imports de page objects sont utilisés
- [ ] Pas de duplication de steps (réutilisation maximale)
- [ ] Types TypeScript corrects (`string`, `number`, etc.)

## 5. Robustesse

- [ ] `.should('be.visible')` vs `.should('exist')` utilisés à bon escient
- [ ] Éléments conditionnels testés correctement
- [ ] Pas de `cy.wait()` hardcodés — utiliser des assertions à la place

## Rapport attendu

Pour chaque problème trouvé :
- Fichier et ligne concernés
- Description du problème
- Correction proposée avec code

Fichiers à analyser :
- `cypress/e2e/portfolio/portfolio.feature`
- `cypress/e2e/portfolio/portfolio.steps.ts`
- `cypress/support/page-objects/*.po.ts`
- `cypress/support/commands.ts`
- `index.html` (pour la correspondance `data-cy`)
