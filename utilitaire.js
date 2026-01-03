const alphabet = "ABCDEFGHIJKLMOPQRSTUVWXYZ";


export function indexAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function activationDesTouches()  {

    const touche = document.querySelectorAll('.touche');
    touche.forEach(bouton => { bouton.addEventListener('click', toucheActivee)}
    );
};

export function toucheActivee(event) {
    console.log("touche pressée :", event.target.textContent);
}

export function ecouteDesTouches() {
    window.addEventListener('keydown', toucheAppuyee);
}

export function toucheAppuyee(event) {
    let lettre = event.key.toUpperCase();
    if (alphabet.includes(lettre) || lettre === "BACKSPACE" || lettre === "ENTER"){
        console.log("la touche est : ", lettre);
        const bouton = document.querySelector(`button[data-key="${lettre}"]`);
        bouton.classList.add('active');
        setTimeout(() => {bouton.classList.remove('active');}, 150);
    }
}