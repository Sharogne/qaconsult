Tu es un expert Cypress + Cucumber. Voici le guide de référence complet de ce projet. Utilise-le pour répondre à toute question sur l'architecture, les bonnes pratiques ou pour guider une implémentation.

---

## Architecture : 4 couches, 1 responsabilité chacune

```
portfolio.feature          ← QUOI tester  (lisible par tous)
        ↓
portfolio.steps.ts         ← COMMENT orchestrer (colle feature → PO)
        ↓
*.po.ts (Page Objects)     ← OÙ trouver les éléments (sélecteurs)
        ↓
index.html [data-cy="..."] ← CE QUI est testé (ancres stables)
```

**Règle absolue : chaque couche ne connaît que la couche immédiatement en dessous.**
- Les steps ne touchent jamais `index.html` directement
- Les page objects ne contiennent aucune assertion
- Les feature files ne contiennent aucune valeur technique

---

## Couche 1 — Feature file (Gherkin)

### Mots-clés et sémantique

| Mot-clé | Rôle | Quand l'utiliser |
|---------|------|-----------------|
| `Given` | Contexte initial | État de départ, navigation initiale |
| `When`  | Action utilisateur | Clic, saisie, soumission |
| `Then`  | Résultat attendu | Assertion visible dans l'UI |
| `And`   | Suite logique | Chaîner des Given/When/Then |
| `Background` | Contexte commun | Steps répétés dans tous les scénarios |

### Bonnes pratiques

- **1 scénario = 1 comportement** : ne pas tester plusieurs features dans un scénario
- **Pas de technique dans le Gherkin** : `Then the form is submitted` ✓ — `Then cy.get('.form').submit()` ✗
- **Paramètres `{string}`** pour les valeurs variables, jamais hardcodées dans le step text
- **Background** pour les préconditions communes (ex: `Given I visit the homepage`)
- **Titres de scénarios** : courts, descriptifs, sans verbe conjugué inutile

```gherkin
# ✓ Bon
Scenario: Contact form displays all required fields
  When I navigate to the contact section
  Then the field "Full name" is present
  And the submit button is visible

# ✗ Mauvais — trop technique, trop vague
Scenario: Test the form
  Then cy.get('#form') exists
  And there are inputs
```

---

## Couche 2 — Steps definitions (`portfolio.steps.ts`)

### Règles strictes

- **Jamais de `cy.get()` direct** dans les steps — toujours passer par un page object
- **1 step = 1 action ou 1 assertion** : ne pas chaîner plusieurs comportements
- **Réutilisation maximale** : vérifier les steps existants avant d'en créer un nouveau
- **Types TypeScript** : typer tous les paramètres Gherkin (`string`, `number`)

```ts
// ✓ Bon — délègue au page object
Then('the header is visible', () => {
  navigationPage.header.should('be.visible');
});

Then('the logo {string} is displayed', (text: string) => {
  navigationPage.logo.should('contain.text', text);
});

// ✗ Mauvais — cy.get() direct, pas de page object
Then('the header is visible', () => {
  cy.get('header').should('be.visible');
});
```

### Organisation des imports

```ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { navigationPage } from '../../support/page-objects/navigation.po';
import { heroPage }       from '../../support/page-objects/hero.po';
import { expertisePage }  from '../../support/page-objects/expertise.po';
import { contactPage }    from '../../support/page-objects/contact.po';
import { footerPage }     from '../../support/page-objects/footer.po';
```

---

## Couche 3 — Page Objects (`*.po.ts`)

### Pattern standard du projet

```ts
export class SectionPage {
  // Getter simple → propriété (pas de parenthèses à l'appel)
  get section() {
    return cy.get('[data-cy="section-name"]');
  }

  // Collection d'éléments similaires
  get cards() {
    return cy.get('[data-cy*="card-"]');
  }

  // Méthode dynamique → accepte un paramètre
  getLinkByText(text: string) {
    return this.section.contains('a', text);
  }
}

export const sectionPage = new SectionPage();
```

### Règles des sélecteurs

| Cas | Sélecteur | Exemple |
|-----|-----------|---------|
| Élément unique | `cy.get('[data-cy="nom"]')` | `cy.get('[data-cy="submit-button"]')` |
| Collection | `cy.get('[data-cy*="prefix-"]')` | `cy.get('[data-cy*="offre-card"]')` |
| Sous-élément textuel | `.contains('tag', 'texte')` scopé | `this.section.contains('label', text)` |

**Interdit dans les page objects :**
- Sélecteurs CSS (`.class`, `#id`, `div > span`)
- Assertions (`.should(...)`) — elles appartiennent aux steps
- `cy.visit()` — appartient aux steps Given

### `.should('be.visible')` vs `.should('exist')`

- `be.visible` : l'élément est rendu et visible à l'écran (taille, display, opacity)
- `exist` : l'élément est dans le DOM, même caché (hors viewport, `display:none`)

---

## Couche 4 — Attributs `data-cy` dans `index.html`

### Conventions de nommage

| Type d'élément | Format | Exemple |
|----------------|--------|---------|
| Section | `[nom]-section` | `data-cy="contact-section"` |
| Carte / item répété | `[type]-card` | `data-cy="offre-card"` |
| Carte avec identité double | `[type]-card [type]-card-[id]` | `data-cy="offre-card offre-card-ia"` |
| Input | `input-[nom]` | `data-cy="input-name"` |
| Select | `select-[nom]` | `data-cy="select-subject"` |
| Textarea | `textarea-[nom]` | `data-cy="textarea-message"` |
| Bouton | `[action]-button` | `data-cy="submit-button"` |
| Lien footer | `footer-link-[réseau]` | `data-cy="footer-link-linkedin"` |
| Image | `[nom]-image` | `data-cy="profile-image"` |
| Logo | `[nom]-logo` | `data-cy="site-logo"` |
| Navigation | `[nom]-nav` | `data-cy="main-nav"` |

### Double identité (collection + ciblage individuel)

```html
<!-- Permet de cibler toutes les cartes OU une carte spécifique -->
<div data-cy="offre-card offre-card-ia">...</div>
<div data-cy="offre-card offre-card-audit">...</div>
```

```ts
get offreCards() { return cy.get('[data-cy*="offre-card"]');    } // toutes
get iaCard()     { return cy.get('[data-cy*="offre-card-ia"]'); } // 1 seule
```

---

## Commandes personnalisées (`commands.ts`)

Les commandes Cypress custom (`Cypress.Commands.add`) sont réservées aux **actions transversales réutilisables** non liées à une section spécifique.

```ts
// ✓ Bon — action générique réutilisable partout
Cypress.Commands.add('navigateToSection', (sectionId: string) => {
  cy.get(`#${sectionId}`).scrollIntoView();
  cy.get(`#${sectionId}`).should('be.visible');
});

// ✗ Mauvais — trop spécifique, doit aller dans un page object
Cypress.Commands.add('checkContactForm', () => { ... });
```

**Déclarer le typage dans le même fichier :**

```ts
declare global {
  namespace Cypress {
    interface Chainable {
      navigateToSection(sectionId: string): Chainable<void>;
    }
  }
}
```

---

## Anti-patterns à éviter

| Anti-pattern | Pourquoi | Alternative |
|---|---|---|
| `cy.wait(2000)` | Flaky, ralentit la suite | `.should('be.visible')` ou `.should('exist')` |
| `cy.get('.btn-primary')` | Fragile aux refactorisations CSS | `cy.get('[data-cy="submit-button"]')` |
| Assertions dans les PO | Couplage logique/sélection | Assertions dans les steps |
| `cy.get()` dans les steps | Contourne le POM | Toujours passer par un page object |
| Scénarios trop longs | Difficile à débugger | 1 scénario = 1 comportement |
| Steps trop génériques | Masquent l'intention | Nommage précis et descriptif |

---

## Flux d'ajout d'une nouvelle feature

1. **`index.html`** — ajouter les attributs `data-cy` manquants
2. **`*.po.ts`** — créer ou mettre à jour le page object
3. **`portfolio.feature`** — écrire les scénarios Gherkin
4. **`portfolio.steps.ts`** — implémenter les steps manquants

**Ne jamais commencer par les steps.** Toujours partir du besoin (feature) et des éléments (data-cy).

---

## Question / contexte

$ARGUMENTS
