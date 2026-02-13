# Authentification et Gestion des Sessions avec Vue.js et Node.js

## Étudiants
- Aurélie AZONNOUDO

## Description du projet
Ce dépôt regroupe trois mini-projets destinés à explorer différentes stratégies d’authentification et de gestion des sessions :

1. **Mini-projet 1 – Passport-Local & Sessions** : authentification basée sur Passport.js (LocalStrategy) et sessions gérées via cookies.
2. **Mini-projet 2 – JWT** : authentification basée sur JSON Web Tokens, stockés côté client.
3. **Mini-projet 3 – OAuth2 & Chat** : authentification OAuth2 (Google + un autre fournisseur) et chat en temps réel avec Socket.io, optimisé avec Redis.

## Structure du dépôt
auth-vue-node-project/ 
├── mini-projet-1/ 
│ 
├── backend/ # Node.js + Express + Passport-Local + MySQL (Sequelize)
│
└── frontend/ # Vue.js 2 + Vuetify  + Axios
|
├── mini-projet-2/
│
├── backend/ # Node.js + Express + JWT + MySQL (Sequelize)
└── frontend/ # Vue.js 2 + Vuetify + Axios 
|
├── mini-projet-3/
│    
├── backend/ # Node.js + Express + Passport-OAuth2 + MongoDB + Redis │
└── frontend/ # Vue.js 2 + Vuetify + Socket.io 
|
├── README.md # Ce fichier └── .gitignore


## Prérequis
- **Node.js** (v14+) et **npm**
- **MySQL** (pour mini-projet 1 & 2)
- **MongoDB** (pour mini-projet 3)
- **Redis** (pour mini-projet 3)
- **Git**

## Variables d’environnement
Chaque backend contient un fichier `.env` à créer, par exemple pour `mini-projet-1/backend` :
```env
DB_NAME=bdd_node_1
DB_USER=root
DB_PASS=VOTRE_MDP
DB_HOST=localhost
SESSION_SECRET=supersecret

