# 💊 PharmaCare - Système de Gestion de Pharmacie

Application web full-stack de gestion de pharmacie développée avec React, Express.js, Prisma et PostgreSQL.

## 🚀 Technologies utilisées

- **Frontend** : React + Vite + React Router
- **Backend** : Express.js + Node.js
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : JWT
- **Conteneurisation** : Docker

## 📋 Fonctionnalités

- ✅ Authentification (Login/Logout) avec rôles
- ✅ Gestion des médicaments (CRUD)
- ✅ Gestion du stock (entrées/sorties/alertes)
- ✅ Gestion des ventes et factures
- ✅ Gestion des fournisseurs
- ✅ Gestion des clients
- ✅ Tableau de bord avec statistiques

## ⚙️ Installation locale

### Prérequis
- Node.js v18+
- PostgreSQL 16
- Docker (optionnel)

### Étapes

1. Cloner le dépôt
\```bash
git clone https://github.com/votre-username/pharmacare.git
cd pharmacare
\```

2. Installer les dépendances backend
\```bash
cd backend
npm install
\```

3. Installer les dépendances frontend
\```bash
cd frontend
npm install
\```

4. Configurer les variables d'environnement
\```bash
# backend/.env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/pharmacie"
JWT_SECRET="pharmacare_secret_key_2025"
PORT=5000
\```

5. Lancer les migrations
\```bash
cd backend
npx prisma migrate dev
\```

6. Démarrer le backend
\```bash
cd backend
npm run dev
\```

7. Démarrer le frontend
\```bash
cd frontend
npm run dev
\```

## 🐳 Lancer avec Docker

\```bash
docker-compose up -d
\```

## 🔑 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | admin@pharmacare.com | admin123 |

## 🌐 Déploiement

- **Frontend** : Vercel
- **Backend** : Railway
- **Base de données** : Railway PostgreSQL

## 👨‍💻 Auteur

Projet académique - L2 DAWM - ENASTIC 2025-2026