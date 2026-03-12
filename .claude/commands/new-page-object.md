Crée un nouveau Page Object pour une section ou fonctionnalité du portfolio.

## Structure du fichier

Créer dans `cypress/support/page-objects/[nom].po.ts` en respectant exactement ce pattern :

```ts
export class NomPage {
  // Élément unique
  get nomElement() {
    return cy.get('[data-cy="nom-element"]');
  }

  // Collection d'éléments répétés
  get nomItems() {
    return cy.get('[data-cy="nom-item"]');
  }

  // Élément avec double identité (ex: carte spéciale dans une liste)
  get nomSpecial() {
    return cy.get('[data-cy*="nom-special"]');
  }

  // Méthode dynamique (uniquement si recherche par texte nécessaire)
  getNomByText(text: string) {
    return this.conteneur.contains('a', text);
  }
}

export const nomPage = new NomPage();
```

## Règles impératives

1. **Jamais** de sélecteur CSS direct (`.classe`, `#id`, `tag`, `[type="..."]`)
2. **Toujours** `cy.get('[data-cy="..."]')` comme sélecteur de base
3. Collections : `[data-cy="nom-item"]` (valeur exacte) ou `[data-cy*="nom-partiel"]` (contains)
4. Les méthodes dynamiques scopent leur recherche dans un conteneur `data-cy`
5. Exporter l'instance en bas de fichier : `export const nomPage = new NomPage();`

## Après création

1. Ajouter les `data-cy` correspondants dans `index.html` si absents
2. Importer le page object dans `cypress/e2e/portfolio/portfolio.steps.ts`
3. Utiliser le page object dans les steps, jamais de `cy.get()` direct

---

## Demande

Page Object à créer pour : $ARGUMENTS
