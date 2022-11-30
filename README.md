# Projet soutenance

## Prérequis Back-end 
Installer un serveur mysql et créer un DB avec le nom que vous voulez 
Dans le dossier backend créer un fichier .env.local et copie le contenu du .env 
Dans ce fichier remplir les variables 'DB_HOST' 'DB_USER' 'DB_NAME'
Lancer le server mySQL 


## Back-end
Se placer dans le dossier back-end : `cd backend`\
Installer les dépandences : `npm install`\
Lancer Express en local : `npm start`\
Lancer Express en production : `npm run deployed`

### Sequelize
Créer un model et sa migration associée : `npx sequelize-cli model:generate --name NomDuModel --attributes label:string`\
Lancer les migrations en local : `npx dotenv -e .env.local sequelize db:migrate`\
Lancer les migrations en test : `npx dotenv -e .env.test sequelize db:migrate`\
Lancer les migrations en prod : `npx dotenv -e .env sequelize db:migrate`

## Front-end
Se placer dans le dossier back-end : `cd frontend`\
Installer les dépandences : `npm install`\
Lancer Angular : `ng serve`\
Lancer le watcher d'assets (JS, SCSS) : `ng build --watch`
