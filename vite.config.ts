import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/* Mesure d'audience Umami : sans cookie, sans donnée personnelle.
   Le script n'est injecté qu'au build, et seulement si UMAMI_WEBSITE_ID est
   défini : le serveur de dev et les runs Cypress ne remontent donc jamais de
   visites parasites. `data-domains` verrouille en plus le suivi sur le
   domaine de production, au cas où un build tournerait en local. */
function umami(env: Record<string, string>): Plugin {
  const websiteId = env.UMAMI_WEBSITE_ID;
  const src = env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  return {
    name: 'umami',
    apply: 'build',
    transformIndexHtml() {
      if (!websiteId) return;
      return [{
        tag: 'script',
        attrs: {
          defer: true,
          src,
          'data-website-id': websiteId,
          'data-domains': 'chignaguet.fr,www.chignaguet.fr',
          'data-do-not-track': 'true',
        },
        injectTo: 'head',
      }];
    },
  };
}

// Trois pages indépendantes : la vitrine à la racine, le CV sous /cv/ et
// les mentions légales sous /mentions-legales/.
// `mpa` évite le repli « application monopage » du serveur de dev, qui
// servirait la vitrine à la place d'une URL inconnue au lieu d'une 404.
export default defineConfig(({ mode }) => ({
  base: '/',
  appType: 'mpa',
  plugins: [umami({ ...loadEnv(mode, process.cwd(), ''), ...process.env } as Record<string, string>)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        vitrine: path.resolve(__dirname, 'index.html'),
        cv: path.resolve(__dirname, 'cv/index.html'),
        mentionsLegales: path.resolve(__dirname, 'mentions-legales/index.html'),
      },
    },
  },
}));
