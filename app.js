import {Partie} from './Partie.js';
import {ListeMots5Lettres, ListeMots6Lettres, ListeVerification} from './listeMots.js';
import * as utilitaires from './utilitaires.js';

function main() {

    //TODO, proposer à 5 ou 6 lettres par mots.
    //Pour l'instant, juste 5
   
    
    //TODO utiliser la classe Partie pour démarrer la partie
    let partie = new Partie(5);
    
    utilitaires.activationDesTouches(partie);
    utilitaires.ecouteDesTouches(partie);
    utilitaires.ecouteNbLettres(partie);
    


};

document.addEventListener('DOMContentLoaded', main);


