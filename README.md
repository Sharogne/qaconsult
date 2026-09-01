<div align="center">
  <img src="public/images/banner.webp" alt="Sylvain Chignaguet — QA Automation Engineer" width="1200" />
</div>

<h1 align="center">Sylvain Chignaguet · QA Automation Engineer</h1>

<p align="center">
  <strong>Bordeaux Métropole · Remote &amp; hybride</strong><br>
  Automatisation Cypress &amp; Appium &nbsp;·&nbsp; Stratégie de test &nbsp;·&nbsp; Cap sur la gestion de projet
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/sylvain-chignaguet-a7534286/">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Sharogne">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://www.chignaguet.fr">www.chignaguet.fr</a>
</p>

---

## À propos de ce dépôt

Ce dépôt remplit trois fonctions :

1. **CV en ligne** — le code source de [chignaguet.fr](https://www.chignaguet.fr), le CV one-page de Sylvain Chignaguet, QA Automation Engineer à Bordeaux. Page unique statique en HTML/CSS/JS pur, servie par Vite, avec une feuille `@media print` qui la transforme en CV imprimable de trois pages.

2. **Démonstration QA assistée par IA** — une suite de tests Cypress E2E structurée en **Gherkin/Cucumber** avec **Page Objects**, conçue avec l'assistance de [Claude Code](https://claude.ai/claude-code) (Anthropic). Ce projet illustre comment l'IA peut accélérer la mise en place d'une stratégie de test sans sacrifier la qualité ni la lisibilité.

3. **Support de formation** — tous les fichiers Cypress (feature, steps, page objects, commands, support) sont **annotés de commentaires pédagogiques** expliquant les concepts, les choix d'architecture et les bonnes pratiques. Le dossier `.claude/commands/` est versionné et lisible directement : il documente les prompts utilisés pour générer et maintenir les tests.

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
| Hébergement | GitHub Pages (domaine `chignaguet.fr`) |

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
│   │       ├── portfolio.feature  # Scénarios Gherkin
│   │       └── portfolio.steps.ts # Step definitions → Page Objects
│   └── support/
│       ├── page-objects/
│       │   ├── navigation.po.ts   # Header / navigation       [data-cy]
│       │   ├── hero.po.ts         # Hero, photo, bouton CV    [data-cy]
│       │   ├── about.po.ts        # Profil + compteurs        [data-cy]
│       │   ├── experience.po.ts   # Timeline du parcours      [data-cy]
│       │   ├── skills.po.ts       # Compétences & savoir-faire [data-cy]
│       │   ├── education.po.ts    # Certifications, formation [data-cy]
│       │   ├── projects.po.ts     # Projets personnels        [data-cy]
│       │   ├── hobbies.po.ts      # Centres d'intérêt         [data-cy]
│       │   ├── contact.po.ts      # Formulaire de contact     [data-cy]
│       │   └── footer.po.ts       # Pied de page              [data-cy]
│       ├── commands.ts            # Commandes Cypress personnalisées
│       └── e2e.ts                 # Support global
├── .claude/                       # Versionné (settings.json exclus du git)
│   └── commands/
│       ├── add-feature.md         # /add-feature      — crée feature complète
│       ├── add-scenario.md        # /add-scenario      — ajoute un scénario BDD
│       ├── new-page-object.md     # /new-page-object   — crée un page object
│       ├── audit-cy.md            # /audit-cy          — audit couverture data-cy
│       └── cypress-review.md      # /cypress-review    — revue qualité tests
├── index.html                     # CV one-page complet (HTML/CSS/JS + attributs data-cy)
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
# Démarrer Vite + ouvrir Cypress en une seule commande (recommandé)
npm run cy:open

# Lancer les tests en mode headless (CI) — dev server requis au préalable
npm run test:e2e

# Ouvrir Cypress sans démarrer le serveur (si Vite tourne déjà)
npm run test:e2e:open
```

> **Note :** `npm run cy:open` démarre automatiquement le dev server et attend qu'il soit prêt avant d'ouvrir Cypress. Les commandes `test:e2e` et `test:e2e:open` nécessitent que `npm run dev` soit déjà lancé dans un terminal séparé.

---

## Architecture des tests

> Chaque fichier contient des **commentaires pédagogiques** expliquant les concepts Cypress, BDD et POM au fil du code. Ils sont conservés dans le dépôt pour servir de référence lors de formations ou d'onboarding.

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

Quand un élément doit être atteint par son libellé plutôt que par un identifiant — un lien de navigation, un intitulé de poste — le `data-cy` est posé sur le conteneur et le ciblage se fait par `cy.contains()`. Cela garde le test proche de ce que lit l'utilisateur :

```ts
// navigation.po.ts
getLinkByText(text: string) { return this.navLinks.contains('a', text); }
```

### Scénarios couverts

| Scénario | Page Object(s) |
|---|---|
| Header et navigation | `navigation.po.ts` |
| Section Hero (titre, sous-titre, localisation, photo) | `hero.po.ts` |
| LinkedIn et GitHub mis en avant | `hero.po.ts` |
| Bouton de téléchargement du CV | `hero.po.ts` |
| Compteurs animés | `about.po.ts` |
| Timeline du parcours (poste actuel, rôles Asobo, bloc replié) | `experience.po.ts` |
| Compétences techniques | `skills.po.ts` |
| Certifications et formation | `education.po.ts` |
| **Projets personnels sans lien mort** | `projects.po.ts` |
| Centres d'intérêt | `hobbies.po.ts` |
| Formulaire de contact | `contact.po.ts` |
| Absence de résidus freelance et du téléphone à l'écran | — |
| Footer et liens sociaux | `footer.po.ts` |

Deux scénarios méritent un mot, parce qu'ils testent une règle métier et pas seulement un affichage :

- **« Personal projects have no dead links »** — trois des quatre projets présentés sont privés ou pas encore livrés. Le test vérifie qu'un seul lien de dépôt existe dans toute la section, pour qu'aucun recruteur ne tombe sur une 404.
- **« No freelance leftovers and no phone number on screen »** — le numéro de téléphone reste dans le DOM pour le CV imprimé (`@media print`) mais ne doit jamais être visible à l'écran ; le test l'affirme avec `should('not.be.visible')`.

### Commandes Claude Code (`.claude/commands/`)

Ce projet inclut des commandes Claude Code versionnées pour maintenir la qualité au fil des évolutions. Chaque fichier `.md` est un prompt structuré invocable depuis Claude Code avec `/nom-commande` :

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
- **ROI maximal** : on cible les parcours critiques et les règles métier qui coûtent cher si elles cassent (liens morts, données personnelles exposées)
- **Lisibilité** : les fichiers `.feature` servent de documentation vivante, compréhensible sans connaissance technique
- **Séparation des responsabilités** : Gherkin / Steps / Page Objects / `data-cy` = chaque couche a un seul rôle
- **Sélecteurs stables** : les attributs `data-cy` découplent les tests des classes CSS et de la structure HTML, rendant les tests insensibles aux refactorisations visuelles

---

## Contact

À l'écoute d'opportunités en CDI sur Bordeaux, en remote ou en hybride.

- **Email :** sylvain.chignaguet@gmail.com
- **LinkedIn :** https://www.linkedin.com/in/sylvain-chignaguet-a7534286/

---

<p align="center">
  <sub>© 2026 Sylvain Chignaguet — QA Automation Engineer · Bordeaux</sub>
</p>
