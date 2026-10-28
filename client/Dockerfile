# Use node 22 for this container
FROM node:22-alpine AS builder

# Install dependencies for src folder with pnpm v10
WORKDIR /src
RUN npm install -g pnpm@10.11.1

# Copy workspace manifests and lockfile -> Docker can cache the dependency-install layer
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY client/package.json ./client/

# Prevent husky hook and install only client workspace dependencies
RUN HUSKY=0 pnpm install --frozen-lockfile --filter client

# Copy client source after installing dependencies and run the build from the client package directory
COPY client ./client
WORKDIR /src/client

# Define run-time env variables
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

# Test if env variables are valid => Prevent creating a client without needed variables
RUN test -n "$VITE_SERVER_URL" || (echo "VITE_SERVER_URL build arg is required" && exit 1)

# Start the build
RUN pnpm run build


# Final run time stage
FROM nginxinc/nginx-unprivileged:1.31-alpine

# Replace Nginx's default sever with project's SPA configs
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Copy bult static files from the previous build stage into Nginx's web root
COPY --from=builder /src/client/dist/ /usr/share/nginx/html/

# Run Nginx as the non-root user
USER nginx

# Container listens on port 8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
