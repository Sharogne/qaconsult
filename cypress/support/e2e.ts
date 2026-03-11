import './commands';

Cypress.on('uncaught:exception', (err) => {
  // Ne pas faire échouer les tests pour des erreurs d'outils tiers
  if (err.message.includes('ResizeObserver') || err.message.includes('Non-Error')) {
    return false;
  }
});
