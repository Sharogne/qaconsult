# Modifier les textes du CV

Tout le site tient dans **un seul fichier : `index.html`**. Pas de base de données, pas de CMS, pas d'étape de génération. Vous ouvrez le fichier, vous changez le texte entre les balises, vous enregistrez.

Ce guide dit où chercher, et surtout ce qu'il ne faut pas casser en passant.

---

## La méthode en trois étapes

1. Ouvrez `index.html` dans n'importe quel éditeur de texte.
2. Cherchez (`Ctrl+F`) la phrase à modifier **telle qu'elle s'affiche sur le site**. Elle apparaît une seule fois, sauf exception signalée plus bas.
3. Changez le texte **entre** les chevrons, jamais les chevrons eux-mêmes.

```html
<h3>Automatisation web</h3>
     ↑ on modifie ici ↑
```

Pour voir le résultat avant de publier :

```bash
npm run dev     # http://localhost:5173
```

---

## Où se trouve quoi

Le fichier est découpé par des commentaires en gros blocs. Cherchez le commentaire, vous êtes au bon endroit.

| Section du site | Commentaire à chercher | Ce qu'on y trouve |
|---|---|---|
| Barre de navigation | `<!-- En-tête` | Logo, libellés des liens |
| Bandeau d'accueil | `<!-- Hero` | Nom, titre, paragraphe d'accroche, localisation, boutons |
| Chiffres animés | `<!-- Chiffres` | Les quatre compteurs et leurs libellés |
| Profil | `<!-- Profil` | Les paragraphes de présentation et les quatre encarts de preuves |
| Parcours | `<!-- Parcours` | Toutes les expériences professionnelles |
| Compétences | `<!-- Compétences` | Les neuf cartes techniques et les six savoir-faire |
| Certifications, formation | `<!-- Certifications` | Les quatre certifications et les trois diplômes |
| Projets personnels | `<!-- Projets personnels` | Les quatre projets |
| Façon de travailler | `<!-- Façon de travailler` | Les quatre convictions |
| En terrain | `<!-- Terrain` | Les légendes des deux photos |
| Centres d'intérêt | `<!-- Hobbies` | Les quatre loisirs |
| Contact | `<!-- Contact` | Email, LinkedIn, localisation, formulaire |
| Pied de page | `<!-- Pied de page` | Copyright et liens |

---

## Les sept pièges

### 1. Certains textes existent en double : un pour l'écran, un pour le CV imprimé

Le bouton « Télécharger le CV » réutilise la même page, remise en forme par une feuille de style d'impression. Quelques blocs ont donc **deux versions**, et modifier l'une sans l'autre crée une incohérence entre le site et le CV papier.

**Le paragraphe de profil.** L'écran affiche quatre paragraphes ; le CV imprimé n'en affiche qu'un, plus condensé. Cherchez `class="print-only profil-print"` : c'est la version imprimée. Si vous retouchez votre présentation, pensez aux deux.

**Les coordonnées complètes.** Cherchez `class="print-only"` juste après les liens LinkedIn et GitHub. Ce bloc contient **votre numéro de téléphone et votre adresse**. Il est invisible sur le site et n'apparaît que sur le CV imprimé. C'est voulu : le numéro ne doit pas être aspiré par les robots. Ne retirez pas la classe `print-only`.

### 2. Les dates du parcours ont aussi deux versions

```html
<div class="tl-date">
    <b class="tl-year">2024</b>                                   <!-- écran -->
    <span class="tl-period">févr. 2024 - aujourd'hui</span>       <!-- CV imprimé -->
    <em class="tl-duration">6 ans 9 mois</em>                     <!-- CV imprimé -->
</div>
```

L'écran n'affiche que l'année de changement, pour rester lisible dans une colonne étroite. Le CV imprimé rétablit la période complète et la durée. Si vous changez une date, changez les deux lignes.

### 3. Les compteurs animés se pilotent par un attribut, pas par le texte

```html
<span class="counter" data-target="8">0</span>
```

C'est `data-target` qui compte, pas le `0`. Pour passer à neuf ans, écrivez `data-target="9"` et laissez le `0` tranquille : il sert d'affichage de départ avant l'animation.

### 4. Les listes de technologies

```html
<div class="chip-row">
    <span class="chip">Cypress</span>
    <span class="chip">Playwright</span>
</div>
```

Pour ajouter une techno, dupliquez une ligne `<span class="chip">…</span>`. Pour en retirer une, supprimez la ligne entière. L'espacement se fait tout seul.

### 5. Les attributs `data-cy` servent aux tests, pas à l'affichage

```html
<h1 class="hero-name" data-cy="hero-title">Sylvain Chignaguet</h1>
```

`data-cy="hero-title"` est un point d'accroche pour la suite de tests automatisés. **Ne le supprimez pas** : la CI refuserait de publier le site. Le texte, lui, se modifie librement.

### 6. Le titre de la page et les métadonnées de partage

Tout en haut du fichier, entre `<head>` et `</head>` :

- `<title>` : ce qui s'affiche dans l'onglet du navigateur et dans Google.
- `<meta name="description">` : le résumé sous le lien dans les résultats de recherche.
- Les balises `og:` et `twitter:` : ce qui s'affiche quand quelqu'un partage le lien sur LinkedIn.

Ces quatre textes se répètent partiellement. Si vous changez votre titre professionnel, faites une recherche globale sur l'ancien libellé pour n'en oublier aucun.

Plus bas se trouve un bloc `application/ld+json`. C'est une fiche structurée lue par les moteurs de recherche et les outils de recrutement. Elle reprend votre poste, votre employeur et vos certifications : pensez à la mettre à jour en même temps que le reste, en respectant les guillemets et les virgules du format JSON.

### 7. Les caractères accentués et les apostrophes

Le fichier est en UTF-8. Tapez normalement : `é`, `à`, `ç`, `œ`, `«  »` passent sans encodage particulier.

Deux exceptions, à écrire sous forme d'entité pour ne pas casser le HTML :

| Vous voulez écrire | Tapez |
|---|---|
| `&` (esperluette) | `&amp;` |
| `<` ou `>` | `&lt;` et `&gt;` |

---

## Publier

```bash
npm run lint     # vérifie le code des tests
npm run cy:run   # exécute les 13 scénarios
npm run build    # génère dist/
```

Puis un commit sur `main`. La CI reconstruit, rejoue les tests et publie sur `chignaguet.fr`. **Si un test échoue, rien n'est publié** : c'est le garde-fou.

Les tests vérifient certains textes littéralement. Si vous changez une phrase qu'ils surveillent, ils passeront au rouge et le message d'erreur vous dira laquelle. Les phrases concernées se trouvent dans `cypress/e2e/portfolio/portfolio.feature`.

---

## Changer autre chose que le texte

| Envie | Où |
|---|---|
| Les couleurs | Bloc `:root` en haut du `<style>`, chaque couleur est nommée |
| Les polices | Variables `--font-display`, `--font-body`, `--font-code`, plus le `<link>` Google Fonts en haut |
| La photo | Remplacez `public/images/profile.jpg`, gardez le nom |
| La mise en page du CV imprimé | Bloc `@media print` en bas du `<style>` |
