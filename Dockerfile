############################################
# STAGE 1 – BUILD (Node + Python)
############################################
FROM node:19-alpine AS builder
WORKDIR /app

# 1) Installer python3 & pip
RUN apk add --no-cache python3 py3-pip

# 2) Copier tout le contexte (index.html, vite.config.js, public/, src/, requirements.txt…)
COPY . .

# 3) Installer les dépendances Python
RUN pip3 install --no-cache-dir -r requirements.txt

# 4) Installer les dépendances Node
#    npm ci supprime d'abord node_modules s'il existe, puis installe d'après package-lock.json
RUN npm ci

# 5) Builder l'application Vite
RUN npm run build


############################################
# STAGE 2 – RUNTIME (NGINX)
############################################
FROM nginx:alpine

# 6) Copier le dossier 'dist' issu du build
COPY --from=builder /app/dist /usr/share/nginx/html

# 7) (Optionnel) ta config nginx perso
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
