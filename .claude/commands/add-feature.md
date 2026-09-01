Ajoute une nouvelle fonctionnalité testée de bout en bout dans ce projet Cypress BDD.

## 1. Attributs `data-cy` dans `index.html`

Ajoute les attributs `data-cy` manquants sur les éléments HTML concernés par la fonctionnalité.

Conventions :
- Sections : `data-cy="[nom]-section"` (ex: `contact-section`)
- Cartes/items répétés : `data-cy="[nom]-card"` ou `data-cy="[nom]-item"`
- Inputs : `data-cy="input-[nom]"`
- Selects : `data-cy="select-[nom]"`
- Textareas : `data-cy="textarea-[nom]"`
- Boutons : `data-cy="[action]-button"`
- Liens footer : `data-cy="footer-link-[réseau]"`
- Images : `data-cy="[nom]-image"`

## 2. Page Object dans `cypress/support/page-objects/`

Crée ou mets à jour le fichier `[nom].po.ts` en suivant exactement ce pattern :

```ts
export class NomPage {
  get nomElement() {
    return cy.get('[data-cy="nom-element"]');
  }
}
export const nomPage = new NomPage();
```

Règles :
- Utiliser **uniquement** `cy.get('[data-cy="..."]')` comme sélecteur de base
- Pour les collections : `cy.get('[data-cy="nom-item"]')`
- Pour les sous-éléments avec double identité : `cy.get('[data-cy*="nom-partiel"]')`
- Les méthodes dynamiques peuvent utiliser `.contains()` scopé dans un conteneur `data-cy`

## 3. Scénarios Gherkin dans `cypress/e2e/portfolio/portfolio.feature`

Ajoute les scénarios en français en respectant le style existant :

```gherkin
  Scenario: Description courte et précise
    Given je visite la page d'accueil
    Then [assertion principale]
    And [assertions complémentaires]
```

## 4. Steps dans `cypress/e2e/portfolio/portfolio.steps.ts`

Implémente les steps manquants en utilisant les page objects. Jamais de `cy.get()` direct dans les steps.

Imports disponibles :
- `navigationPage` → `navigation.po.ts`
- `heroPage` → `hero.po.ts`
- `aboutPage` → `about.po.ts` (section Profil + compteurs animés)
- `experiencePage` → `experience.po.ts` (timeline du parcours)
- `skillsPage` → `skills.po.ts` (compétences + savoir-faire)
- `educationPage` → `education.po.ts` (certifications + formation)
- `projectsPage` → `projects.po.ts` (projets personnels)
- `hobbiesPage` → `hobbies.po.ts`
- `contactPage` → `contact.po.ts`
- `footerPage` → `footer.po.ts`

---

## Demande

Fonctionnalité à ajouter : $ARGUMENTS
