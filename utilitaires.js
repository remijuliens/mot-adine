const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
import {ListeVerification} from './listeMots.js';


//vérifie si le mot à deviner contient la lettre
export function contient(p_mot, p_lettre){
    return p_mot.includes(p_lettre);
}

//retourne le nombre de fois que la lettre apparait dans le mot
export function contientTantDe(p_mot, p_lettre){
    let cmpt = 0;
    for (let i = 0; i<p_mot.length; i++) {
        if (p_mot[i] === p_lettre) {cmpt += 1;}
    }
    return cmpt;
}

    //Donne une liste d'index où se trouve la lettre
export function listerIndex(p_mot, p_lettre){
        let indexsDeLaLettre = [];
        for (let i=0; i < p_mot.length; i++){
            if (p_mot[i] === p_lettre){
                indexsDeLaLettre.push(i);
            }
        }
        return indexsDeLaLettre;
    }

//valide si le mot passé appartient à la liste de mots valide
export function validerMot(p_mot) {
        return ListeVerification.has(p_mot);
    }

export function indexAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function activationDesTouches(partie)  {

    const touche = document.querySelectorAll('.touche');
    touche.forEach(bouton => 
        {bouton.addEventListener('click', (event) => {
            toucheActivee(event, partie);
            bouton.blur();});
        });
    }

export function toucheActivee(event, partie) {
    let lettre = event.target.textContent;

    switch (lettre) {
        case '⌫':
            lettre = 'BACKSPACE';
            break;
        case '⏎':
            lettre = 'ENTER';
            break;
        default:
            break;
    }
    gestionDesTouches(partie, lettre);
}

export function ecouteDesTouches(partie) {
    window.addEventListener('keydown', () => toucheAppuyee(event, partie));
}

export function toucheAppuyee(event, partie) {
    const lettre = event.key.toUpperCase();
    gestionDesTouches(partie, lettre);
}

    //Passe la lettre à gérer (en majuscule)
export function gestionDesTouches(partie, lettre) {
    if (alphabet.includes(lettre)){
        partie.affichageLettre(lettre);
      //Effet d'enfoncement de la touche sur la page.
        const bouton = document.querySelector(`button[data-key="${lettre}"]`);
        bouton.classList.add('active');
        setTimeout(() => {bouton.classList.remove('active');}, 150);
    }
    else if (lettre === "BACKSPACE") {
        const t = document.getElementById(partie.tuileActive);
        if (t.innerText === "") {partie.precedenteTuileActive();};
        partie.supprimerLettre();

        //Effet d'enfoncement de la touche sur la page.
        const bouton = document.querySelector(`button[data-key="BACKSPACE"]`);
        bouton.classList.add('active');
        setTimeout(() => {bouton.classList.remove('active');}, 150);
    }
    else if (lettre === "ENTER") {
        //Effet d'enfoncement de la touche sur la page.
        const bouton = document.querySelector(`button[data-key="ENTER"]`);
        bouton.classList.add('active');
        setTimeout(() => {bouton.classList.remove('active');}, 150);
        
        //Récupérer toutes les lettres
        const essai = partie.recupererMot().toLowerCase();
        //Valider l'essai
        partie.validerEssai(essai);

    }
    else if (lettre === "ARROWLEFT") {
        partie.precedenteTuileActive();
    }

    else if (lettre === "ARROWRIGHT") {
        partie.prochaineTuileActive();
        }
}

export function ecouteNbLettres(partie) {
    const btn5 = document.getElementById('btn5Lettres');
    btn5.addEventListener('click', ()=> partie.clickBouton5Lettres());
    const btn6 = document.getElementById('btn6Lettres');
    btn6.addEventListener('click', ()=> partie.clickBouton6Lettres());
}