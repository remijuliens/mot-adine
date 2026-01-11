# Mot-adine
Un jeu de mot de type wordle en ligne, complètement en français

English version will follow

## Description générale
Mot-adine est une version francophone du jeu Wordle (aussi appelé Lingo ou « le mot »). Ce jeu consiste à trouver un mot proposé au hasard par le programme dans un nombre limité d’essais. Lorsque l'utilisateur propose une tentative, le programme lui rend chacune des lettres colorées en vert, jaune ou gris, selon que la lettre est présente dans le mot et au bon endroit, est présente dans le mot mais au mauvais endroit, ou n'est pas présente dans le mot.

Dans ce programme, l'utilisateur a le choix entre deviner un mot de 5 ou 6 lettres. Tous les mots sont au singulier et les verbes sont à l'infinitif. L'utilisateur a 6 tentatives pour y arriver. Le programme est conçu de manière à ce qu'il soit facile d'ajouter d'autres niveaux dans le futur, permettant ainsi de proposer des mots de 3, 4, 7, 8 lettres, par exemple.

## Fonctionnement général
Le programme fonctionne de la façon suivante : le programme choisit au hasard un mot de la longueur désirée parmi une liste de mots simples. L'utilisateur propose un essai, qui doit avoir la bonne longueur et être valide (un mot français, au singulier, et à l’infinitif dans le cas d’un verbe). Le programme compare ensuite les deux mots et affiche les résultats

## Précision sur la fonction de comparaison

Le programme gère les différents cas de figure lors de la comparaison entre le mot à trouver et la tentative de l'utilisateur. Si cela n'est pas un enjeu pour les mots dont toutes les lettres sont différentes (ex. « POIRE »), cela devient crucial pour le joueur dans les autres cas de connaître ces précisions.

Lorsque l’une des lettres est présente dans les deux mots, plusieurs cas de figure sont possibles. En effet, la lettre identique peut être :

1. Présente un nombre égal de fois (1 ou plus) ;
3. Présente plus de fois dans le mot à trouver que dans la tentative ;
4. Présente plus de fois dans la tentative que dans le mot à trouver.

### Exemple pour la lettre « E »

| Mot à trouver | Tentative de l'utilisateur |
| -------------- | -------------------------- |
| 1) POIRE       | CHIEN                      |
| 2) TERRE       | TETER                       |
| 3) ÉLÈVE       | TETER                       |
| 4) CHIEN       | TERRE                       |

Si l'on considère en plus la position des lettres dans le mot, et le moment où elles sont comparées (le programme compare les lettres une à une, de gauche à droite), cela oblige à gérer la validation (l'affichage des couleurs) en fonction de plusieurs situations possibles. Le programme affiche les bonnes couleurs de lettre, peu importe leur nombre et leur place dans les mots.

### Exemples de gestion des couleurs :

- Si le mot à trouver est **CHIEN** et la tentative **TETER** :
  Le premier « E » doit être **gris** (indiquant qu’il n'y a pas deux « E ») et le second « E » doit être **vert** (indiquant que celui-ci est à la bonne place).

- Si le mot à trouver est **TREVE** et la tentative **TETER** :
  Les deux « E » doivent être **jaunes** (indiquant qu'il y a deux « E » dans la mot, mais pas à ces endroits).

- Si le mot (fictif) est **XEEXX** et la tentative **EXEXX** :
  Le premier « E » doit être **jaune** (présent mais mal placé) et le second « E» doit être **vert** (présent à la bonne place).

## Liste de mots
Les listes de mots utilisés proviennent de la ressource Lexique 3.83, une base de données lexicales du français gratuite contenant plus de 140 000 mots. Afin de proposer des mots relativement faciles, seuls ceux dont le pourcentage de connaissances est supérieur à 30 % et qui figurent fréquemment la littérature (deux données disponibles dans Lexique 3.83) ont été conservés. Cela a permis de créer une liste de 1500 à 2500 mots pour chacun des niveaux. La validation des essais de l'utilisateur utilise quant à elle une liste complète incluant tous les mots, même les mots plus rares ou complexes, pour ne pas donner comme « invalide » un mot qui existe pourtant.

## Dédicaces
Ce jeu est dédiée à ma mère et mes tantes, toutes de grandes amatrices de jeux de mots.
