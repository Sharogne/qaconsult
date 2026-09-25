import path from 'path';
import { defineConfig } from 'vite';

// Deux pages indépendantes : la vitrine à la racine, le CV sous /cv/.
// `mpa` évite le repli « application monopage » du serveur de dev, qui
// servirait la vitrine à la place d'une URL inconnue au lieu d'une 404.
export default defineConfig({
  base: '/',
  appType: 'mpa',
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
      },
    },
  },
});
