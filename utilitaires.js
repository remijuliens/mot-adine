const alphabet = "ABCDEFGHIJKLMOPQRSTUVWXYZ";

export function indexAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function activationDesTouches(partie)  {

    const touche = document.querySelectorAll('.touche');
    touche.forEach(bouton => { bouton.addEventListener('click', () => toucheActivee(event, partie))}
    );
};

export function toucheActivee(event, partie) {
    let lettre = event.target.textContent;
    console.log("touche pressée :", lettre);
    partie.affichageTest(lettre);
}

export function ecouteDesTouches(partie) {
    window.addEventListener('keydown', () => toucheAppuyee(event, partie));
}

export function toucheAppuyee(event, partie) {
    let lettre = event.key.toUpperCase();
    if (alphabet.includes(lettre) || lettre === "BACKSPACE" || lettre === "ENTER"){
        partie.affichageLettre(lettre);

      //Effet d'enfoncement de la touche sur la page.
        const bouton = document.querySelector(`button[data-key="${lettre}"]`);
        bouton.classList.add('active');
        setTimeout(() => {bouton.classList.remove('active');}, 150);
    }
    else if (lettre === "ARROWLEFT") {
        partie.precedenteTuileActive();
    }

    else if (lettre === "ARROWRIGHT") {
        partie.prochaineTuileActive();
        }
}
