<div align="center">
  <img src="public/images/banner.webp" alt="Sylvain Chignaguet — Consultant QA Senior Freelance" width="1200" />
</div>

<h1 align="center">Sylvain Chignaguet · Consultant QA Senior Freelance</h1>

<p align="center">
  <strong>Bordeaux · Remote France & World</strong><br>
  Automatisation Cypress &amp; Appium &nbsp;·&nbsp; Stratégie de test &nbsp;·&nbsp; IA appliquée au QA
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/sylvain-chignaguet-a7534286/">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Sharogne">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://calendly.com/sylvain-chignaguet">Calendly</a>
</p>

---

## À propos de ce dépôt

Ce dépôt remplit deux fonctions :

1. **Site vitrine professionnel** — le code source du portfolio de Sylvain Chignaguet, consultant QA senior freelance à Bordeaux. Site statique HTML/CSS/JS pur, servi par Vite.

2. **Démonstration QA assistée par IA** — une suite de tests Cypress E2E structurée en **Gherkin/Cucumber** avec **Page Objects**, conçue avec l'assistance de [Claude Code](https://claude.ai/claude-code) (Anthropic). Ce projet illustre comment l'IA peut accélérer la mise en place d'une stratégie de test sans sacrifier la qualité ni la lisibilité.

---

## Stack technique

| Catégorie | Outil |
|---|---|
| Site | HTML5 · CSS3 · JavaScript ES2022 |
| Dev server / Build | [Vite](https://vitejs.dev/) |
| Tests E2E | [Cypress](https://www.cypress.io/) |
| Langage de tests | [Gherkin / Cucumber](https://github.com/badeball/cypress-cucumber-preprocessor) |
| Pattern | Page Objects + `data-cy` |
| Typage | TypeScript |
| Formulaire contact | [FormSubmit.co](https://formsubmit.co/) |

---

## Structure du projet

```
qaconsult/
├── public/
│   └── images/                    # Assets statiques (servis à /images/*)
│       ├── profile.jpg
│       ├── background.webp
│       ├── banner.webp
│       ├── illu1.webp
│       └── illu2.webp
├── cypress/
│   ├── e2e/
│   │   └── portfolio/
│   │       ├── portfolio.feature  # Scénarios Gherkin (en français)
│   │       └── portfolio.steps.ts # Step definitions → Page Objects
│   └── support/
│       ├── page-objects/
│       │   ├── navigation.po.ts   # Sélecteurs header / nav  [data-cy]
│       │   ├── hero.po.ts         # Sélecteurs hero           [data-cy]
│       │   ├── expertise.po.ts    # Sélecteurs expertise & offres [data-cy]
│       │   ├── contact.po.ts      # Sélecteurs formulaire     [data-cy]
│       │   └── footer.po.ts       # Sélecteurs footer         [data-cy]
│       ├── commands.ts            # Commandes Cypress personnalisées
│       └── e2e.ts                 # Support global
├── .claude/
│   └── commands/
│       ├── add-feature.md         # /add-feature  — crée feature complète
│       ├── add-scenario.md        # /add-scenario — ajoute un scénario BDD
│       ├── new-page-object.md     # /new-page-object — crée un page object
│       ├── audit-cy.md            # /audit-cy     — audit couverture data-cy
│       └── cypress-review.md     # /cypress-review — revue qualité tests
├── index.html                     # Site complet (HTML/CSS/JS + attributs data-cy)
├── cypress.config.ts              # Configuration Cypress + Cucumber
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Démarrage rapide

### Prérequis

- Node.js ≥ 18

### Installation

```bash
git clone https://github.com/Sharogne/qaconsult.git
cd qaconsult
npm install
```

### Développement

```bash
npm run dev
# → http://localhost:5173
```

### Tests E2E

```bash
# Lancer les tests en mode headless (CI)
npm run test:e2e

# Ouvrir l'interface Cypress pour le développement interactif
npm run test:e2e:open
```

> **Note :** Le dev server doit être démarré avant de lancer les tests (`npm run dev` dans un terminal séparé).

---

## Architecture des tests

Les tests sont organisés en **4 couches** :

```
portfolio.feature       ← Scénarios lisibles par tous (PO, QA, dev)
      ↓
portfolio.steps.ts      ← Step definitions : orchestrent les page objects
      ↓
*.po.ts                 ← Page Objects : sélecteurs via [data-cy="..."] uniquement
      ↓
index.html              ← Attributs data-cy sur chaque élément testé
```

### Convention de sélection : `data-cy`

Tous les sélecteurs Cypress utilisent exclusivement des attributs `data-cy`. Aucun sélecteur CSS fragile (classe, ID, tag) n'est utilisé dans les page objects ou les steps.

```html
<!-- index.html -->
<section data-cy="contact-section">
  <form data-cy="contact-form">
    <input data-cy="input-name">
    <button data-cy="submit-button">Envoyer</button>
  </form>
</section>
```

```ts
// contact.po.ts
get nameInput() { return cy.get('[data-cy="input-name"]'); }
get submitButton() { return cy.get('[data-cy="submit-button"]'); }
```

Pour les éléments à double identité (collection + ciblage individuel), la valeur `data-cy` contient les deux identifiants et le sélecteur utilise `[data-cy*="..."]` (CSS contains) :

```html
<div data-cy="offre-card offre-card-ia">...</div>
```

```ts
get offreCards() { return cy.get('[data-cy*="offre-card"]');    } // 5 cartes
get iaCard()     { return cy.get('[data-cy*="offre-card-ia"]'); } // 1 carte
```

### Scénarios couverts

| Scénario | Page Object(s) |
|---|---|
| Header et navigation | `navigation.po.ts` |
| Section Hero (titre, CTA, code Cypress) | `hero.po.ts` |
| Cartes d'expertise | `expertise.po.ts` |
| Offres de service + badge Innovation | `expertise.po.ts` |
| Formulaire de contact | `contact.po.ts` |
| Chargement de la photo de profil | — |
| Footer et liens sociaux | `footer.po.ts` |

### Commandes Claude Code (`.claude/commands/`)

Ce projet inclut des commandes Claude Code pour maintenir la qualité au fil des évolutions :

| Commande | Description |
|---|---|
| `/add-feature` | Crée une feature complète : `data-cy` + page object + scénario Gherkin + steps |
| `/add-scenario [description]` | Ajoute un scénario BDD avec steps et `data-cy` si manquants |
| `/new-page-object [section]` | Crée un page object aux normes `data-cy` du projet |
| `/audit-cy` | Audit de couverture : orphelins, sélecteurs cassés, non-`data-cy` |
| `/cypress-review` | Revue qualité complète des tests (sélecteurs, POM, Gherkin, robustesse) |

---

## Philosophie QA

> *"L'automatisation ne remplace pas le jugement humain — elle libère le temps de l'ingénieur QA pour ce qui compte vraiment : la réflexion critique, la stratégie et l'exploration des zones de risque non couvertes."*

Ce projet applique les principes défendus dans le portfolio :

- **Shift-Left** : les tests font partie du cycle de développement, pas une étape finale
- **ROI maximal** : on cible les parcours critiques (navigation, formulaire, images)
- **Lisibilité** : les fichiers `.feature` servent de documentation vivante, compréhensible sans connaissance technique
- **Séparation des responsabilités** : Gherkin / Steps / Page Objects / `data-cy` = chaque couche a un seul rôle
- **Sélecteurs stables** : les attributs `data-cy` découplent les tests des classes CSS et de la structure HTML, rendant les tests insensibles aux refactorisations visuelles

---

## Contact

Disponible pour des missions de consulting à Bordeaux et en remote dans toute la France.

- **Email :** sylvain.chignaguet@gmail.com
- **Calendly :** https://calendly.com/sylvain-chignaguet
- **LinkedIn :** https://www.linkedin.com/in/sylvain-chignaguet-a7534286/

---

<p align="center">
  <sub>© 2026 Sylvain Chignaguet — Consultant QA Senior Freelance · Bordeaux</sub>
</p>
