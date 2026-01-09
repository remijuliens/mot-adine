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
        this.tuileActive = "10";
        this.activerTuile();
    }

    //vérifie si le mot à deviner contient la lettre
    contient(lettre){
        return this.motADeviner.includes(lettre);
    }

    longueur(){
        return this.nbLettres;
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

            if (contenu === "") {
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

    //Supprimer la lettre dans la tuile active
    supprimerLettre() {
        let t = document.getElementById(this.tuileActive);
        t.innerText = "";
    }

    //Valider un essai. Met à jour les couleurs et passe à la ligne suivante. 
    // Averti si le mot n'existe pas.
    //TODO ajuster selon qu'il y a plusieurs lettre identiques
    validerEssai(p_essai){
        //Vérifier si toutes les lettres sont là
        if (p_essai.length != this.longueur()) {
            this.afficherMauvaiseLongueur()
        }
        else if (!utilitaires.validerMot(p_essai)) {
            this.afficherMotInvalide();
        }

        else {
            console.log("motADeviner : ", this.motADeviner);
            let validationParCouleur = [];
            console.log("Longueur:", this.longueur()); // Affichez la longueur

            for (let i=0; i < this.longueur(); i++){
                console.log("La longueur : ",this.longueur());
                if (p_essai[i] === this.motADeviner[i]) {validationParCouleur.push("V");}
                else if (this.motADeviner.includes(p_essai[i])) {validationParCouleur.push("J");}
                else {validationParCouleur.push("G");};
            }
            //Incrémenter le nombre d'essai et passer à la ligne suivante
            this.affichageDesCouleursTuiles(validationParCouleur);
            this.affichageDesCouleursClavier(validationParCouleur, p_essai.toUpperCase());
            this.validationVictoire(p_essai);
            if (this.nbEssais < 6){this.prochainEssai();}
            console.log("Nombre d'essai après incrément : ", this.nbEssais);
        }
    }
    
    //change le nombre d'essai et met à jour la tuile active
    prochainEssai() {
        let ancienneTuile = document.getElementById(this.tuileActive);
        ancienneTuile.classList.remove('tuileActive');
        this.nbEssais ++;
        this.tuileActive = String(this.nbEssais*10);
        this.activerTuile();
    }

    /*
    Gère l'action à prendre après la validation d'un essai
    1. Si le mot est trouvé
    2. Si le nombre max de tentatives est atteint.
    */
    validationVictoire(p_essai) {
        let victoire = false;
        //le mot est trouvé : VICTOIRE

        if (this.motADeviner === p_essai) {
            victoire = true;
            this.afficherVictoire();
        }

        //le nombre max est atteint : défaite
        if (this.nbEssais === 6 && !victoire){
            console.log("Vous avez échoué");
            this.afficherDefaite();
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

    //Récupère les lettres des tuiles pour former le mot
    recupererMot() {
        let essai = "";
        for (let i = 0; i < this.nbLettres; i++) {
            let index = String(this.nbEssais * 10 + i);            
            essai += document.getElementById(index).innerText;
        }
        return essai;
    }

    //Affiche les couleurs sur les tuiles
    affichageDesCouleursTuiles(validationParCouleur){
        let indexEnCours = this.nbEssais * 10;
        for (let i = 0; i<this.nbLettres; i++){
            let tuileEnCours = document.getElementById(String(indexEnCours));
            if (validationParCouleur[i] === "G"){tuileEnCours.classList.add('absent');}
            else if (validationParCouleur[i] === "J"){tuileEnCours.classList.add('mauvaiseEndroit');}
            else if (validationParCouleur[i] === "V"){tuileEnCours.classList.add('present');}
            indexEnCours ++;
        }
    }

    //met-à-jour les couleurs du clavier
    affichageDesCouleursClavier(validationParCouleur, p_essai) {

        for (let i = 0; i<this.nbLettres; i++){
            let query = `button[data-key="${p_essai[i]}"]`;            
            let touche = document.querySelector(query);
            
            if (touche.classList.contains('present') || touche.classList.contains('absent')){continue;}
            else if (touche.classList.contains('mauvaiseEndroit') && validationParCouleur[i] === "V"){
                touche.classList.remove('mauvaisEndroit');
                touche.classList.add('present');
            }
            else {
                if (validationParCouleur[i] === "G"){touche.classList.add('absent');}
                else if (validationParCouleur[i] === "J"){touche.classList.add('mauvaiseEndroit');}
                else if (validationParCouleur[i] === "V"){touche.classList.add('present');} 
            }
        }
    }

//débute une nouvelle partie
resetPartie() {
    
    //Remet les cases vides
    let grille = document.getElementById("grille");
    for (let rangee of grille.children) {
        for (let tuile of rangee.children) {
            tuile.textContent = "";
            tuile.classList = "tuile";
        }
    }
    //Remet le clavier vide
    let clavier = document.getElementById("clavier");
    for (let touche of clavier.children) {
        touche.classList = "touche";
    }
    document.querySelector('button[data-key="ENTER"]').classList.add("large");

    this.nbEssais = 1;
    let i = utilitaires.indexAleatoire(0, this.listeDeMots.length);
    this.motADeviner = this.listeDeMots.at(i);
    this.tuileActive = "10";
    this.activerTuile();
}

//============Les pops-up=============


afficherVictoire() {
    console.log("Entré dans 'afficherVictoire'");
    
    let popUpVictoire = document.getElementById("victoire");
    let boutonVictoire = document.getElementById("boutonVictoire");
    boutonVictoire.disabled = true;
    popUpVictoire.showModal();
    
    setTimeout(() => {
        boutonVictoire.disabled = false;
        boutonVictoire.focus();
    }, 200);
    
    popUpVictoire.addEventListener("close", () => {
        this.resetPartie();
        }, { once: true });
    popUpVictoire.addEventListener("keydown", (e) => {
        if (e.key === "Enter"){
            this.resetPartie();
            e.stopPropagation();
        }
        }, { once: true });
    
}

afficherDefaite() {
    console.log("Entré dans 'afficherDefaite'");
    
    let popUpDefaite = document.getElementById("defaite");
    let boutonDefaite = document.getElementById("boutonDefaite");
    boutonDefaite.disabled = true;
    document.getElementById("motADeviner").innerText = this.motADeviner;
    popUpDefaite.showModal();
    setTimeout(() => {
        boutonDefaite.disabled = false;
        boutonDefaite.focus();
    }, 150);

    popUpDefaite.addEventListener("close", () => {
        this.resetPartie();
        }, { once: true });
    popUpDefaite.addEventListener("keydown", (e) => {
        if (e.key === "Enter"){
            this.resetPartie();
            e.stopPropagation();
        }
        }, { once: true });
}

afficherMotInvalide() {
    let popUpInvalide = document.getElementById('motInvalide');
    console.log('=== OUVERTURE ===');
    popUpInvalide.showModal();
    setTimeout(() => {
        popUpInvalide.close();
    }, 700);
}

afficherMauvaiseLongueur() {
    let popUpMauvaiseLongueur = document.getElementById('motMauvaiseLongueur');
    document.getElementById('nbLettres').innerText = this.nbLettres;
    popUpMauvaiseLongueur.showModal();
    setTimeout (() => {
        popUpMauvaiseLongueur.close();
    }, 750);
}


};
