Effectue un audit complet de la couverture `data-cy` dans ce projet.

## 1. Vérification `index.html` → Page Objects

Pour chaque `data-cy` présent dans `index.html`, vérifie qu'il est utilisé dans au moins un page object de `cypress/support/page-objects/`.
Liste les `data-cy` orphelins (présents dans le HTML mais jamais ciblés dans les tests).

## 2. Vérification Page Objects → `index.html`

Pour chaque sélecteur `[data-cy="..."]` dans les page objects, vérifie que l'attribut correspondant existe bien dans `index.html`.
Liste les sélecteurs qui ciblent un `data-cy` absent du HTML (sélecteurs cassés).

## 3. Vérification des sélecteurs non-`data-cy`

Recherche dans tous les fichiers `cypress/` les `cy.get()` qui n'utilisent **pas** `data-cy` :
- Sélecteurs CSS (`.classe`, `#id`, `tag`)
- Attributs HTML (`[type="submit"]`, `[src="..."]`)
- `.contains()` sans scope dans un conteneur `data-cy`

Propose les corrections avec les `data-cy` appropriés.

## 4. Vérification des page object methods inutilisées

Pour chaque getter/méthode dans les page objects, vérifie qu'il est utilisé dans `portfolio.steps.ts`.
Liste les methods inutilisées.

## 5. Rapport final

```
✅ data-cy bien couverts : X
⚠️  data-cy orphelins (HTML mais pas dans PO) : liste
❌ Sélecteurs cassés (PO mais pas dans HTML) : liste
🔧 Sélecteurs non-data-cy à corriger : liste
💤 Page object methods inutilisées : liste
```

Fichiers à analyser :
- `index.html`
- `cypress/support/page-objects/*.po.ts`
- `cypress/e2e/portfolio/portfolio.steps.ts`
- `cypress/e2e/portfolio/portfolio.feature`
