# Étape 1 : build
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install --production

COPY . .

# Étape 2 : runtime
FROM node:18-alpine

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=build /app /app

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
