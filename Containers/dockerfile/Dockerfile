# image de base
FROM node:16-alpine3.15

# copie de la liste des dependances
COPY package.json /app/package.json

# installation
RUN cd /app && npm i

# copie du code (aprés l'étape d'installation pour optimiser l'utilisation du cache)
COPY ../../Dockerfile/exercice_1 /app/

WORKDIR /app

EXPOSE 80

# commande à lancer
CMD ["npm", "start"]

