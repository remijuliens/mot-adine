"""
Un petit programme pour retirer les accents de mes listes de mots
"""
from sys import argv
import unicodedata

with open(argv[1]) as fichier:
    lignes = fichier.readlines()

with open(argv[2], "w") as nouveau_fichier:
    for ligne in lignes:

        mot = "".join(lettre for lettre in unicodedata.normalize("NFD", ligne)
                      if unicodedata.category(lettre) != "Mn" and lettre !=" "
                      )
        nouveau_fichier.write(f"{mot}")




