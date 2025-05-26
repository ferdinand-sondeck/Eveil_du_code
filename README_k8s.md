# ☸️ Déploiement Kubernetes – Eveil du Code

Ce document décrit le déploiement de l’application Node.js **Eveil_du_Code** sur un cluster Kubernetes local avec Minikube. Il couvre la configuration des objets K8s, les sondes, la haute disponibilité et les secrets.

---

## 🧱 Structure des manifestes (dossier `k8s/`)

- `deployment.yaml` : Déploiement avec 3 réplicas, sondes liveness/readiness
- `service.yaml` : Service NodePort exposant l’application
- `configmap.yaml` : Variables d’environnement (ex : `NODE_ENV`)
- `secret.yaml` : Variables sensibles encodées (ex : `API_KEY`)

---

## 🚀 Déploiement avec Minikube

### 1. Démarrer le cluster

```bash
minikube start
