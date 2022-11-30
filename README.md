# Projet soutenance
## Back-end
Se placer dans le dossier back-end : `cd backend`\
Lancer Express en local : `npm start`\
Lancer Express en production : `npm run deployed`

### Sequelize
Créer un model et sa migration associée : `npx sequelize-cli model:generate --name NomDuModel --attributes label:string`\
Lancer les migrations en local : `npx dotenv -e .env.local sequelize db:migrate`\
Lancer les migrations en test : `npx dotenv -e .env.test sequelize db:migrate`\
Lancer les migrations en prod : `npx dotenv -e .env sequelize db:migrate`

## Front-end
Se placer dans le dossier back-end : `cd frontend`\
Lancer Angular : `ng serve`\
Lancer le watcher d'assets (JS, SCSS) : `ng build --watch`
