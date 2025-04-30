
---

### `mini-projet-2/README.md`

```markdown
# Mini-projet 2 – Authentification avec JWT

## Étudiant·e
- Azonnoudo dènadi aurélie

## Description
Ce mini-projet utilise **JSON Web Tokens (JWT)** pour l’authentification. Le token est généré côté serveur et stocké côté client.

## Technologies
- **Backend** : Node.js, Express.js, jsonwebtoken, Sequelize ORM (MySQL)  
- **Frontend** : Vue 2, Axios, Vuetify (optionnel)  
- **Stockage du token** : LocalStorage ou SessionStorage  

## Fonctionnalités
- Inscription des utilisateurs  
- Connexion → génération d’un JWT  
- Page protégée vérifiant le token dans l’en-tête `Authorization`  
- Déconnexion (suppression du token)  

## Structura# Mini‑projet 2 : JWT Authentication

**Noms des étudiants :** `[À compléter]`

## Description
Authentification basée sur **JSON Web Token (JWT)**, avec stockage du token côté client.

## Prérequis
- Node.js >= 14
- npm ou yarn
- PostgreSQL ou MySQL

## Installation
```bash
git clone <URL_DU_REPO>/mini-projet-2.git
cd mini-projet-2/backend
cp .env.example .env   # compléter MONGO_URI, JWT_SECRET, PORT
npm install
npm run migrate

cd ../frontend
cp .env.example .env   # renseigner VUE_APP_API_URL
npm install
```

## Configuration
Copiez `.env.example` → `.env` :
```env
MONGO_URI=mongodb://mp2_user:un_mot_de_passe_tres_secure@localhost:27017/mini_projet_2
JWT_SECRET=secret
PORT=3000
```  

## Lancement
- **Backend :** `npm run dev` depuis `backend/`
- **Frontend :** `npm run serve` depuis `frontend/`

## Fonctionnalités
- Inscription / connexion
- Génération et validation de JWT
- Stockage du token en LocalStorage ou SessionStorage
- Accès à une route sécurisée retournant les infos utilisateur
- (Optionnel) Documentation Swagger

## Démonstration vidéo
`videos/mp2_jwt_auth.mp4`

e
