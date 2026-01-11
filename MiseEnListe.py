# Petit script pour mettre une liste de mot txt --> prêt pour un array en js

from sys import argv

with open(argv[1]) as fichier:
    lignes = fichier.readlines()

with open(argv[2], "w") as nouveauFichier:
    for ligne in lignes:
        ligne = ligne.strip()
        mot = '\"' + ligne + '\",\n'
        nouveauFichier.write(mot)


