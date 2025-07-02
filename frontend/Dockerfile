# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ---- Serve Stage ----
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose NGINX port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]