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
│   │   ├── portfolio/
│   │   │   ├── portfolio.feature  # Scénarios Gherkin — le site à l'écran
│   │   │   └── portfolio.steps.ts # Step definitions → Page Objects
│   │   └── cv-imprime/
│   │       ├── cv-imprime.feature # Scénarios Gherkin — le CV téléchargeable
│   │       └── cv-imprime.steps.ts
│   ├── plugins/
│   │   └── print-cv.ts            # Génère le PDF réel et le mesure (Node)
│   └── support/
│       ├── page-objects/
│       │   ├── index.ts           # Barrel : un seul chemin d'import
│       │   ├── navigation.po.ts   # Header / navigation       [data-cy]
│       │   ├── hero.po.ts         # Hero, photo, bouton CV    [data-cy]
│       │   ├── profil.po.ts       # Profil et ses preuves     [data-cy]
│       │   ├── chiffres.po.ts     # Compteurs animés          [data-cy]
│       │   ├── experience.po.ts   # Timeline du parcours      [data-cy]
│       │   ├── skills.po.ts       # Compétences & savoir-faire [data-cy]
│       │   ├── education.po.ts    # Certifications, formation [data-cy]
│       │   ├── projects.po.ts     # Projets personnels        [data-cy]
│       │   ├── methode.po.ts      # Façon de travailler       [data-cy]
│       │   ├── terrain.po.ts      # Photos de terrain         [data-cy]
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

## Modifier les textes

Le site tient dans un seul fichier, `index.html`. Pour changer une phrase, un poste ou une date sans toucher au reste : **[CONTENU.md](CONTENU.md)** dit où chercher et quels sont les sept pièges (textes en double écran/impression, compteurs pilotés par attribut, `data-cy` à ne pas supprimer).

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
*.feature               ← Scénarios lisibles par tous (PO, QA, dev)
      ↓
*.steps.ts              ← Step definitions : orchestrent les page objects
      ↓
*.po.ts                 ← Page Objects : sélecteurs via [data-cy="..."]
      ↓
index.html              ← Attributs data-cy sur chaque élément testé
```

Le CV téléchargeable ajoute une cinquième pièce, à côté et non au-dessus :
`cypress/plugins/print-cv.ts` tourne côté Node, pas dans le navigateur de
test. Voir « Tester un CV qui n'existe qu'à l'impression » plus bas.

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

Une exception, assumée : quand le sujet du test **est** une règle CSS, le test
nomme la classe qui l'implémente. Les dates du parcours existent en deux
écritures dans le même bloc, `.tl-year` pour l'écran et `.tl-period` pour le CV
imprimé ; vérifier que ce partage tient suppose de désigner ces classes. Poser
un `data-cy` par-dessus ajouterait un alias sans rien découpler.

### Scénarios couverts

**`portfolio.feature`** — 17 scénarios sur le site tel qu'il s'affiche.

| Scénario | Page Object(s) |
|---|---|
| Header et navigation | `navigation.po.ts` |
| Ouverture et fermeture du menu mobile | `navigation.po.ts` |
| Section Hero (titre, sous-titre, localisation, photo) | `hero.po.ts` |
| LinkedIn et GitHub mis en avant | `hero.po.ts` |
| Profil orienté gestion de projet et ses quatre preuves | `profil.po.ts` |
| Compteurs animés | `chiffres.po.ts` |
| Timeline du parcours (poste actuel, rôles Asobo) | `experience.po.ts` |
| **Repères de dates lus comme des charnières** | `experience.po.ts` |
| Bloc « Avant la tech » replié puis déplié | `experience.po.ts` |
| Compétences techniques et savoir-faire | `skills.po.ts` |
| Certifications et formation | `education.po.ts` |
| **Projets personnels sans lien mort** | `projects.po.ts` |
| Façon de travailler et photos de terrain | `methode.po.ts`, `terrain.po.ts` |
| Centres d'intérêt | `hobbies.po.ts` |
| Formulaire de contact | `contact.po.ts` |
| **Absence de résidus freelance et de données personnelles** | — |
| Footer et liens sociaux | `footer.po.ts` |

**`cv-imprime.feature`** — 6 scénarios sur le CV téléchargeable (voir plus bas).

Quatre scénarios méritent un mot, parce qu'ils testent une règle et pas seulement un affichage :

- **« Personal projects have no dead links »** — trois des quatre projets présentés sont privés ou pas encore livrés. Le test vérifie qu'un seul lien de dépôt existe dans toute la section, pour qu'aucun recruteur ne tombe sur une 404.
- **« No freelance leftovers and no personal data on screen »** — le numéro de téléphone reste dans le DOM pour le CV imprimé (`@media print`) mais ne doit jamais être visible à l'écran ; le test l'affirme avec `should('not.be.visible')`. L'adresse postale complète, elle, n'existe nulle part dans la page.
- **« Timeline dates read as change markers »** — le repère de date est posé en haut de chaque carte, donc à la charnière entre deux postes : il porte la fin de la période, pas son début. Le test lit la colonne entière et attend `aujourd'hui, 2024, 2020, 2017`, ce qui échouerait au premier repère remis à l'envers.
- **« The printable CV still fits on two A4 pages »** — un CV qui déborde sur une troisième page se fait lire en diagonale.

### Tester un CV qui n'existe qu'à l'impression

Le bouton « Télécharger le CV » n'envoie aucun fichier : il appelle
`window.print()`, et c'est la feuille `@media print` qui remet la page en forme.
Le livrable n'existe donc qu'au moment de l'impression, hors de portée du
navigateur piloté par Cypress. La suite le teste en deux temps.

**Le déclenchement**, côté navigateur : `window.print()` ouvre une boîte de
dialogue système. On la remplace par un espion, et le test vérifie que le clic
la sollicite.

```ts
cy.window().then((fenetre) => cy.stub(fenetre, 'print').as('print'));
heroPage.downloadCvButton.click();
cy.get('@print').should('have.been.calledOnce');
```

**Le PDF**, côté Node : la tâche `analyserCvImprime` (`cypress/plugins/print-cv.ts`)
rejoue l'impression dans un Chrome sans interface, produit le PDF A4 réel et en
rapporte le nombre de pages, la hauteur du contenu et le texte affiché.

```gherkin
When I generate the printable CV
Then the printable CV is 2 pages long
And the printable CV keeps at least 120 px of slack before a third page
```

Deux détails d'implémentation valent la peine d'être connus :

- **Le texte est lu dans le DOM, pas dans le PDF.** Chrome n'embarque que des
  sous-ensembles de polices dont l'encodage est propre au document : relire les
  chaînes du PDF demanderait de reconstruire la table `ToUnicode`, soit une
  centaine de lignes fragiles. Le DOM est lu après passage en média `print`,
  donc ce qu'il affiche est exactement ce que Chrome vient de dessiner.
- **La marge résiduelle est vérifiée à part.** Firefox et Chromium n'arrondissent
  pas les métriques de police de la même façon, d'une centaine de pixels sur
  l'ensemble du document. Un CV qui tient tout juste sur deux pages sous
  Chromium en occupe trois sous Firefox : le test exige donc de la place en
  réserve, pas seulement le bon nombre de pages.

Le navigateur est cherché dans cet ordre : celui que Cypress utilise déjà s'il
est de la famille Chromium, puis `CHROME_PATH`, puis les emplacements habituels
d'un Chrome ou Chromium système. Aucun trouvé, le test échoue en le disant.

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
