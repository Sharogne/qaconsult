// Point d'entrée unique des Page Objects.
// Les fichiers de steps importent d'ici plutôt que de lister dix chemins
// relatifs : un Page Object qui se renomme ne casse qu'une ligne.
export { navigationPage } from './navigation.po';
export { heroPage } from './hero.po';
export { profilPage } from './profil.po';
export { chiffresPage } from './chiffres.po';
export { experiencePage } from './experience.po';
export { skillsPage } from './skills.po';
export { educationPage } from './education.po';
export { projectsPage } from './projects.po';
export { methodePage } from './methode.po';
export { terrainPage } from './terrain.po';
export { hobbiesPage } from './hobbies.po';
export { contactPage } from './contact.po';
export { footerPage } from './footer.po';
