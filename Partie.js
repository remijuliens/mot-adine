import {ListeMots5Lettres, ListeMots6Lettres, ListeVerification} from './listeMots.js';
import * as utilitaires from './utilitaires.js';

export class Partie {

    constructor(p_nbLettres) {
        this.nbLettres = p_nbLettres;
        this.nbEssais = 1;
        //Si erreur dans le paramètre, donne 5 lettres par défaut
        this.listeDeMots = ListeMots5Lettres;
        //if (nombreLettres === 6) {listeDeMots = ListeMots6Lettres;} 
        let i = utilitaires.indexAleatoire(0, this.listeDeMots.length);
        this.motADeviner = this.listeDeMots.at(i);
        this.essai = "";
        this.tuileActive = "10";
        this.activerTuile();
    }

    //vérifie si le mot à deviner contient la lettre
    contient(lettre){
        return this.motADeviner.includes(lettre);
    }

    longueur(){
        return this.motADeviner.lenght;
    }

    //Donne une liste d'index où se trouve la lettre
    listerIndex(lettre){
        let indexDeLaLettre = [];
        for (let i=0; i < this.longueur(); i++){
            if (this.motADeviner[i] === lettre){
                indexDeLaLettre.push(i);
            }
        }
        return indexDeLaLettre;
    }

    //déplace la tuile active à droite
    prochaineTuileActive(){
        if (!(this.tuileActive.endsWith("4"))) {
            this.tuileActive = String(+this.tuileActive + 1);
            this.activerTuile();
        }
    }

    //Déplace la tuile active à la prochaine tuile libre
    prochaineTuileLibre() {
        let tuileSuivante = String(+this.tuileActive + 1);
        let trouve = false; 
        while(!(tuileSuivante.endsWith("5")) && !trouve) {
            let contenu = document.getElementById(tuileSuivante).innerHTML;
                    console.log("Élément trouvé:", contenu);

            if (contenu === " ") {
                this.tuileActive = tuileSuivante;
                this.activerTuile();
                trouve = true;
                return;
            }
            tuileSuivante = String(+tuileSuivante + 1);
        }
    }

    precedenteTuileActive(){
        if (!(this.tuileActive.endsWith("0"))) {
            this.tuileActive = String(+this.tuileActive - 1);
            this.activerTuile();
        }
    }

    affichageLettre(lettre) {
        let t = document.getElementById(this.tuileActive);
        t.innerText = lettre;
        if (!(this.tuileActive.endsWith(4))) {
            this.prochaineTuileLibre();
        }
    }

    //Valider un essai. Met à jour les couleurs et passe à la ligne suivante. 
    // Averti si le mot n'existe pas.
    //TODO ajuster selon qu'il y a plusieurs lettre identiques
    validerEssai(){
        if (this.essai.length === this.longueur()){
            if (ListeVerification.includes(this.essai))
                { console.log("le mot ${essai} n'est pas valide");
                    return;
                }
            let validationParCouleur = [];
            for (let i=0; i < this.longueur(); i++){
                //indexDeLEssai = this.listerIndex(this.essai[i]);
                if (essai[i] === this.motADeviner[i]) {validationParCouleur[i] = "V"}
                else if (this.motADeviner.includes(this.essai[i])) {validationParCouleur[i] = "J"}
                else {validationParCouleur[i] = "G"};

            //Incrémenter le nombre d'essai et passer à la ligne suivante
            
            this.nbEssais ++;
            affichageDesCouleurs(validationParCouleur);
            }
        }
    }
    
    activerTuile(){
        let rangee = document.getElementById(this.nbEssais);
        let tuile = document.getElementById(this.tuileActive);
        for (let t of rangee.children){
            t.classList.remove('tuileActive');
        }
        tuile.classList.add('tuileActive');
    }

    affichageDesCouleurs(validationParCouleur){
        //TODO
        console.log(validationParCouleur);
    }
        affichageTest(lettre){
        //TODO
        console.log("De la partie : ", lettre);
    }
};
