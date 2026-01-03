
import * as utilitaires from './utilitaire.js';
import {ListeMots5Lettres, ListeMots6Lettres, ListeVerification} from './listeMots.js';


function nouvellePartie(nombreLettres) {
    let essai = 0;

    //Si erreur dans le paramètre, donne 5 lettres par défaut
    let listeDeMots = ListeMots5Lettres;
    //if (nombreLettres === 6) {listeDeMots = ListeMots6Lettres;} 
    let i = utilitaires.indexAleatoire(0, listeDeMots.length);
    let motADeviner = listeDeMots.at(i);
    console.log(listeDeMots.length);
    console.log(motADeviner);
}

function main() {

    utilitaires.activationDesTouches();
    utilitaires.ecouteDesTouches();
    
    //TODO, proposer à 5 ou 6 lettres par mots.
    //Piour l'instant, juste 5
    nouvellePartie(5);
};

document.addEventListener('DOMContentLoaded', main);


