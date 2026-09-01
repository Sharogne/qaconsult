/**
 * Analyse du CV imprimable.
 *
 * Le bouton « Télécharger le CV » n'envoie pas de fichier : il appelle
 * `window.print()`, et c'est la feuille `@media print` qui transforme la page
 * en CV. Le livrable n'existe donc qu'au moment de l'impression, hors de
 * portée du navigateur piloté par Cypress.
 *
 * Ce module rejoue cette impression côté Node : il ouvre la page dans un
 * Chrome sans interface, force le média `print`, produit le PDF A4 réel et en
 * rapporte le nombre de pages.
 *
 * Le texte du rapport est lu dans le DOM, pas dans le PDF. Chrome n'embarque
 * que des sous-ensembles de polices dont l'encodage est propre au document :
 * relire les chaînes du PDF demanderait de reconstruire la table ToUnicode,
 * soit une centaine de lignes fragiles pour un résultat identique. Le DOM est
 * lu après passage en média `print`, donc ce qu'il affiche est exactement ce
 * que Chrome vient de dessiner dans le PDF.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

/** Format d'impression déclaré par la règle `@page` de la feuille de style. */
const A4 = { largeurMm: 210, hauteurMm: 297 };
const MARGES_MM = { haut: 12, bas: 14, gauche: 12, droite: 12 };
const PX_PAR_MM = 96 / 25.4;

const mmEnPx = (mm: number) => mm * PX_PAR_MM;

/**
 * Chrome n'est pas installé au même endroit selon la machine : image GitHub
 * Actions, poste de développement ou conteneur. On prend le premier qui
 * répond, et on échoue avec un message explicite si aucun n'est présent —
 * un test qui ne trouve pas de navigateur doit le dire, pas passer.
 */
function trouverChrome(cheminSuggere?: string): string {
  const candidats = [
    cheminSuggere,
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/opt/pw-browsers/chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter((chemin): chemin is string => Boolean(chemin));

  const trouve = candidats.find((chemin) => existsSync(chemin));
  if (trouve) return trouve;

  for (const nom of ['google-chrome', 'chromium', 'chromium-browser']) {
    try {
      const chemin = execFileSync('which', [nom], { encoding: 'utf8' }).trim();
      if (chemin) return chemin;
    } catch {
      // `which` sort en erreur quand la commande n'existe pas : on continue.
    }
  }

  throw new Error(
    `Aucun Chrome trouvé pour générer le CV imprimable. Chemins essayés :\n` +
      candidats.map((c) => `  - ${c}`).join('\n') +
      `\nDéfinissez CHROME_PATH vers un binaire Chrome ou Chromium.`
  );
}

export interface RapportCvImprime {
  /** Nombre de pages du PDF réellement produit. */
  pages: number;
  /** Texte visible une fois la feuille d'impression appliquée. */
  texte: string;
  /** Hauteur du contenu, en pixels CSS, à la largeur utile d'une page A4. */
  hauteurContenuPx: number;
  /** Hauteur utile d'une page, marges déduites. */
  hauteurPagePx: number;
}

export interface OptionsCvImprime {
  url: string;
  /** Chemin du navigateur utilisé par Cypress, essayé en premier. */
  cheminNavigateur?: string;
}

/**
 * Compte les pages d'un PDF produit par Chrome.
 *
 * L'arbre des pages porte un objet `/Type /Pages` avec un `/Count`. Le lire
 * évite d'avoir à décompresser les flux : c'est un entier en clair dans le
 * fichier. On garde le plus grand `/Count` rencontré, qui est celui de la
 * racine quand l'arbre a plusieurs niveaux.
 */
function compterPages(pdf: Buffer): number {
  const brut = pdf.toString('latin1');
  const comptes = [...brut.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/g)].map((m) =>
    Number(m[1])
  );
  const comptesInverses = [...brut.matchAll(/\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages\b/g)].map((m) =>
    Number(m[1])
  );
  const tous = [...comptes, ...comptesInverses];

  if (tous.length > 0) return Math.max(...tous);

  // Repli : compter les objets page eux-mêmes. `[^s]` évite d'attraper /Pages.
  const pages = brut.match(/\/Type\s*\/Page[^s]/g);
  if (pages) return pages.length;

  throw new Error("PDF illisible : impossible d'y compter les pages.");
}

/**
 * Générer le PDF coûte une dizaine de secondes : lancer un navigateur, charger
 * la page, la mettre en page au format A4. Les scénarios interrogent tous le
 * même document, donc le rapport est produit une fois par URL et réutilisé.
 * La page servie ne bouge pas pendant une exécution ; si elle bougeait, ce
 * serait au serveur de test d'être redémarré, pas à ce cache d'être invalidé.
 */
const rapports = new Map<string, Promise<RapportCvImprime>>();

export function analyserCvImprime(options: OptionsCvImprime): Promise<RapportCvImprime> {
  const enCours = rapports.get(options.url);
  if (enCours) return enCours;

  const rapport = genererRapport(options);
  rapports.set(options.url, rapport);
  // Un échec ne doit pas être mis en cache : la tentative suivante doit
  // pouvoir repartir d'un navigateur neuf.
  rapport.catch(() => rapports.delete(options.url));
  return rapport;
}

async function genererRapport(options: OptionsCvImprime): Promise<RapportCvImprime> {
  const navigateur = await puppeteer.launch({
    executablePath: trouverChrome(options.cheminNavigateur),
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  try {
    const page = await navigateur.newPage();

    // La largeur compte : le CSS du site a des points de rupture responsive,
    // et une page A4 fait 794 px de large. On se place à la largeur utile
    // réelle pour que la mesure de hauteur corresponde au PDF.
    const largeurUtilePx = Math.round(
      mmEnPx(A4.largeurMm - MARGES_MM.gauche - MARGES_MM.droite)
    );
    const hauteurPagePx = Math.round(
      mmEnPx(A4.hauteurMm - MARGES_MM.haut - MARGES_MM.bas)
    );
    await page.setViewport({ width: largeurUtilePx, height: hauteurPagePx });

    await page.goto(options.url, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');

    // Le site déplie le bloc « Avant la tech » sur `beforeprint` pour qu'il
    // figure au CV. Puppeteer ne déclenche pas cet évènement : on le simule,
    // sinon la mesure porterait sur une page plus courte que le vrai PDF.
    await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));

    const { texte, hauteurContenuPx } = await page.evaluate(() => ({
      texte: (document.body.innerText || '').replace(/\s+/g, ' ').trim(),
      hauteurContenuPx: document.documentElement.scrollHeight,
    }));

    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: {
        top: `${MARGES_MM.haut}mm`,
        bottom: `${MARGES_MM.bas}mm`,
        left: `${MARGES_MM.gauche}mm`,
        right: `${MARGES_MM.droite}mm`,
      },
    });

    return {
      pages: compterPages(Buffer.from(pdf)),
      texte,
      hauteurContenuPx,
      hauteurPagePx,
    };
  } finally {
    await navigateur.close();
  }
}
