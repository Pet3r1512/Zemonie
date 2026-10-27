# This image installs devDependencies because tsx and the Prisma CLI are devDependencies.
# A production-only install would remove the runtime used by pnpm start


# Use node 22 for this image
FROM node:22-alpine

# Install openssl (Prisma needs this on Alpine)
# Install pnpm v10
WORKDIR /src
RUN apk add --no-cache openssl
RUN npm install -g pnpm@10.11.1 \
# Change ownership of /src to non-root node user
# This is crucial because WORKDIR creates /src as root
# and the install runs as node
  && chown node:node /src

COPY --chown=node:node package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY --chown=node:node server/package.json ./server/
COPY --chown=node:node server/prisma ./server/prisma
COPY --chown=node:node server/prisma.config.ts ./server/

# Switch to non-root user-
USER node
# Prevent husky hook and install lockfile
RUN HUSKY=0 pnpm install --frozen-lockfile --filter server

COPY --chown=node:node server ./server

WORKDIR /src/server
ENV NODE_ENV=production
ENV PORT=9999
EXPOSE 9999

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-9999}/" >/dev/null || exit 1

CMD ["pnpm", "start"]
