# Mini‑projet 3 : OAuth2 & Chat en temps réel

**Noms des étudiants :** `[À compléter]`

## Description
Authentification via **OAuth2** (Google, GitHub) et mise en place d’un **chat en temps réel** avec Socket.io.

## Prérequis
- Node.js >= 14
- npm ou yarn
- MongoDB
- Redis

## Installation
```bash
git clone <URL_DU_REPO>/mini-projet-3.git
cd mini-projet-3/backend
cp .env.example .env   # compléter MONGO_URI, JWT_SECRET, PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, REDIS_PASSWORD, CALLBACK_URLs, FRONTEND_URL
npm install

cd ../frontend
cp .env.example .env   # renseigner VUE_APP_API_URL
npm install
```

## Configuration
Copiez `.env.example` → `.env` :
```env
MONGO_URI=mongodb://mp3_user:password@localhost:27017/mini_projet_3
JWT_SECRET=secret
PORT=3000
GOOGLE_CLIENT_ID=<ID>
GOOGLE_CLIENT_SECRET=<SECRET>
GITHUB_CLIENT_ID=<ID>
GITHUB_CLIENT_SECRET=<SECRET>
REDIS_PASSWORD=<PASSWORD>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
FRONTEND_URL=http://localhost:8081
```  

## Lancement
- **Backend :** `npm run dev` depuis `backend/`
- **Frontend :** `npm run serve` depuis `frontend/`

## Fonctionnalités
- Authentification OAuth2 Google et GitHub
- Stockage des sessions et tokens dans MongoDB
- Caching des sessions avec Redis
- Chat en temps réel entre utilisateurs
- Persistance de l’historique des messages

## Démonstration vidéo
`videos/mp3_oauth_chat.mp4`

