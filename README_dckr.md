# 🥷 Eveil du Code — Node.js Container App

![Docker CI](https://github.com/ferdinand-sondeck/Eveil_du_code/actions/workflows/docker.yml/badge.svg?branch=feature/workflows)
[![Docker Image](https://img.shields.io/badge/docker-ghcr.io%2Fferdinand--sondeck%2Feveil__du__code-blue)](https://github.com/users/ferdinand-sondeck/packages/container/package/eveil_du_code)

Application Node.js containerisée, monitorée et sécurisée, construite pour le parcours DevOps Ninja 🥷  
Ce projet inclut une API REST minimale, des métriques Prometheus, et un pipeline CI/CD complet via GitHub Actions.

---

## 🚀 Fonctionnalités

- API REST avec Express
- Middleware de logging (`morgan`)
- Validation des entrées (`express-validator`)
- Métriques Prometheus exposées (`/metrics`)
- Container Docker optimisé (Alpine + Multi-stage)
- Pipeline CI/CD avec :
  - Build + Push vers GHCR
  - Scan de sécurité avec Trivy
- Compatible avec Kubernetes (prochaine étape)

---

## 🧪 Endpoints disponibles

| Méthode | Route             | Description                         |
|--------:|------------------:|-------------------------------------|
| `GET`   | `/api/status`     | Vérifie l'état de l'application     |
| `GET`   | `/api/services`   | Renvoie une liste de services       |
| `GET`   | `/api/echo?message=xxx` | Valide et renvoie le message |
| `GET`   | `/metrics`        | Métriques Prometheus (monitoring)   |

---

## 🐳 Docker

### 🔧 Build localement :
```bash
docker build -t eveil_du_code .


▶️ Exécuter :
bash
Copier
Modifier
docker run -p 3000:3000 eveil_du_code
🧩 Docker Compose
Pour le développement local :
bash
Copier
Modifier
docker-compose up --build
Cela monte le volume du code local avec hot-reload (nodemon requis dans le conteneur).

🔐 Sécurité
L'image est scannée automatiquement avec Trivy

Résultats visibles dans l’onglet Actions > Docker CI

📦 Publication
L'image est automatiquement poussée vers GitHub Container Registry (GHCR) :

bash
Copier
Modifier
ghcr.io/ferdinand-sondeck/eveil_du_code:latest
🛠 À venir
Déploiement Kubernetes (Quête 5)

Helm chart de déploiement

Observabilité complète avec Grafana

Authentification (JWT)

🤝 Contribuer
bash
Copier
Modifier
git clone https://github.com/ferdinand-sondeck/Eveil_du_code.git
cd Eveil_du_code
npm install
npm run dev
Les contributions sont bienvenues ! 🙌

🧠 Licence
MIT © Ferdinand Sondeck – Formation DevOps Ninja


