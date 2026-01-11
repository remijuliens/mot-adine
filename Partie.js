import {ListeMots5Lettres, ListeMots6Lettres, ListeVerification} from './listeMots.js';
import * as utilitaires from './utilitaires.js';

export class Partie {

    constructor(p_nbLettres) {
        this.nbLettres = p_nbLettres;
        this.nbEssais = 1;
        this.listeDeMots = ListeMots5Lettres;
        let i = utilitaires.indexAleatoire(0, this.listeDeMots.length);
        this.motADeviner = this.listeDeMots.at(i);
        this.tuileActive = "10";
        this.activerTuile();
    }

    longueur(){
        return this.nbLettres;
    }

    //déplace la tuile active à droite
    prochaineTuileActive(){
        if (!(this.tuileActive.endsWith(String(this.nbLettres - 1)))) {
            this.tuileActive = String(+this.tuileActive + 1);
            this.activerTuile();
        }
    }

    //Déplace la tuile active à la prochaine tuile libre
    prochaineTuileLibre() {
        let tuileSuivante = String(+this.tuileActive + 1);
        let trouve = false; 
        while(!(tuileSuivante.endsWith(String(this.nbLettres))) && !trouve) {
            const contenu = document.getElementById(tuileSuivante).innerHTML;

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
        const t = document.getElementById(this.tuileActive);
        t.innerText = lettre;
        if (!(this.tuileActive.endsWith(this.nbLettres-1))) {
            this.prochaineTuileLibre();
        }
    }

    //Supprimer la lettre dans la tuile active
    supprimerLettre() {
        const t = document.getElementById(this.tuileActive);
        t.innerText = "";
    }

    //Compare un essai et le mot à trouver.
    //Retourne un liste
    comparer(p_essai) {

        let validationParCouleur = new Array(this.nbLettres).fill("");
        for (let i=0; i < this.nbLettres; i++)
        {
            let essaiContientTant = utilitaires.contientTantDe(p_essai, p_essai[i]);
            let motADevinerContientTant = utilitaires.contientTantDe(this.motADeviner, p_essai[i]);
            //Si la lettre n'est pas là
            if (motADevinerContientTant === 0){
                validationParCouleur[i] = "G";
            }
            //Si les deux contiennent même nombre de lettres (1 ou +)
            else if (motADevinerContientTant === essaiContientTant) {
                if (this.motADeviner[i] === p_essai[i]) {validationParCouleur[i] = "V";}
                else {validationParCouleur[i] = "J";}
            }
            
            //plusieurs lettres identique dans l'essai
            //et plus que dans le mot à trouver
            else if (essaiContientTant > motADevinerContientTant) {
               let indexsMotADeviner = utilitaires.listerIndex(this.motADeviner, p_essai[i]);
               let indexsEssai = utilitaires.listerIndex(p_essai, p_essai[i]);
               let nbLettresDansMotsADeviner = indexsMotADeviner.length;
            
               while (nbLettresDansMotsADeviner > 0) {
                for (let indexMot of indexsMotADeviner) {
                    let j;
                    if ((j = indexsEssai.indexOf(indexMot)) != -1)
                    {
                        validationParCouleur[indexsEssai[j]] = "V";
                        nbLettresDansMotsADeviner --;
                        indexsEssai.splice(j, 1);
                    }
                }
                if (nbLettresDansMotsADeviner === 0) {break;}
                validationParCouleur[indexsEssai[0]] = "J";
                indexsEssai.splice(0, 1)
                nbLettresDansMotsADeviner --;
               }
               for (let index of indexsEssai){
                validationParCouleur[index] = "G";
               }
            }
            //plusieurs lettres identiques dans le mot à trouver
            //et plus que dans la tentative
            else if (motADevinerContientTant > essaiContientTant)
            {
                let indexsEssai = utilitaires.listerIndex(p_essai, p_essai[i]);
                let nbLettresDansEssai = indexsEssai.length;

                while (nbLettresDansEssai > 0) {
                    for (let indexEssai of indexsEssai) {
                        
                        if (this.motADeviner[indexEssai] === p_essai[indexEssai])
                        {
                            validationParCouleur[indexEssai] = "V";
                            nbLettresDansEssai --;
                        }
                        if (nbLettresDansEssai === 0) {break;}
                        validationParCouleur[indexEssai] = "J";
                        nbLettresDansEssai --;
                    }   
                }
            }

        }
        return validationParCouleur;
    }


    //Valider un essai. Met à jour les couleurs et passe à la ligne suivante. 
    // Averti si le mot n'existe pas.
    validerEssai(p_essai){
        //Vérifier si toutes les lettres sont là
        if (p_essai.length != this.longueur()) {
            this.afficherMauvaiseLongueur()
        }
        else if (!utilitaires.validerMot(p_essai)) {
            this.afficherMotInvalide();
        }

        else {            
            let validationParCouleur = this.comparer(p_essai);
            /*
            for (let i=0; i < this.longueur(); i++){
                if (p_essai[i] === this.motADeviner[i]) {validationParCouleur.push("V");}
                else if (this.motADeviner.includes(p_essai[i])) {validationParCouleur.push("J");}
                else {validationParCouleur.push("G");};
            }
            */
            //Incrémenter le nombre d'essai et passer à la ligne suivante
            this.affichageDesCouleursTuiles(validationParCouleur);
            this.affichageDesCouleursClavier(validationParCouleur, p_essai.toUpperCase());
            this.validationVictoire(p_essai);
            if (this.nbEssais < 6){this.prochainEssai();}
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
        
        //le mot est trouvé : victoire
        if (this.motADeviner === p_essai) {
            victoire = true;
            this.afficherVictoire();
        }

        //le nombre max est atteint : défaite
        if (this.nbEssais === 6 && !victoire){
            this.afficherDefaite();
        }
    }

    activerTuile(){
        const rangee = document.getElementById(this.nbEssais);
        const tuile = document.getElementById(this.tuileActive);
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
            const tuileEnCours = document.getElementById(String(indexEnCours));
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
    const grille = document.getElementById("grille");
    for (let rangee of grille.children) {
        for (let tuile of rangee.children) {
            tuile.textContent = "";
            tuile.classList = "tuile";
        }
    }

    //Ajuste le nombre de tuiles
    if (this.nbLettres === 5){
        for (let i = 1; i<=6; i++){
            let id = String(i) + "5";
            document.getElementById(id).classList.add('inactive');}
        }

    //Remet le clavier vide
    const clavier = document.getElementById("clavier");
    for (let touche of clavier.children) {
        touche.classList = "touche";
    }
    document.querySelector('button[data-key="ENTER"]').classList.add("large");
    
    //Reset les valeurs
    this.nbEssais = 1;
    let i = utilitaires.indexAleatoire(0, this.listeDeMots.length);
    this.motADeviner = this.listeDeMots.at(i);
    this.tuileActive = "10";
    this.activerTuile();
}

//============Les pops-up=============

afficherVictoire() {    
    const popUpVictoire = document.getElementById("victoire");
    const boutonVictoire = document.getElementById("boutonVictoire");
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
    const popUpDefaite = document.getElementById("defaite");
    const boutonDefaite = document.getElementById("boutonDefaite");
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
    const popUpInvalide = document.getElementById('motInvalide');
    popUpInvalide.showModal();
    setTimeout(() => {
        popUpInvalide.close();
    }, 700);
}

afficherMauvaiseLongueur() {
    const popUpMauvaiseLongueur = document.getElementById('motMauvaiseLongueur');
    document.getElementById('nbLettres').innerText = this.nbLettres;
    popUpMauvaiseLongueur.showModal();
    setTimeout (() => {
        popUpMauvaiseLongueur.close();
    }, 750);
}

//========Gestion bouton du nb de lettres==============
clickBouton5Lettres() {
    if (this.nbLettres!=5){
        document.getElementById('btn6Lettres').classList.toggle('active');
        document.getElementById('btn5Lettres').classList.toggle('active');
        this.nbLettres = 5;
        this.listeDeMots = ListeMots5Lettres;
        this.resetPartie();

    }
}
clickBouton6Lettres() {
    if (this.nbLettres!=6){
        document.getElementById('btn6Lettres').classList.toggle('active');
        document.getElementById('btn5Lettres').classList.toggle('active');
        this.nbLettres = 6;
        this.listeDeMots = ListeMots6Lettres;
        this.resetPartie();
    }
}


};
