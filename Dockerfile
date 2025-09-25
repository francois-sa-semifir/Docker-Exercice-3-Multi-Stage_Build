###################################################################
#                 STAGE 1 : BUILD DU FRONT (REACT + VITE)         #
###################################################################
# On choisit l'image officielle Node.
# "slim" est un compromis entre "full" (buster, bullseye) et "alpine".
FROM node:slim


###################################################################
#     STAGE 2 : BACK-END + COPIE DES FICHIERS STATIQUES FRONT     #
###################################################################
# idem STAGE 1
FROM node:slim
