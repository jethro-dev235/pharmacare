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

### Étapes

1. Cloner le dépôt
```bash
git clone https://github.com/jethro-dev235/pharmacare.git
cd pharmacare
```

2. Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | admin@pharmacare.com | admin123 |

## 🐳 Docker

```bash
docker-compose up -d
```

## 👨‍💻 Auteur

Projet académique - L2 DAWM - ENASTIC 2025-2026