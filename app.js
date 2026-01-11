import {Partie} from './Partie.js';
import {ListeMots5Lettres, ListeMots6Lettres, ListeVerification} from './listeMots.js';
import * as utilitaires from './utilitaires.js';

function main() {
    
    let partie = new Partie(5);
    
    utilitaires.activationDesTouches(partie);
    utilitaires.ecouteDesTouches(partie);
    utilitaires.ecouteNbLettres(partie);
};

document.addEventListener('DOMContentLoaded', main);


