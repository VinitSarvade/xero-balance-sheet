FROM oven/bun:1.1.12-alpine as base

FROM base AS install
WORKDIR /tmp/demyst

COPY package.json ./
COPY bun.lockb ./
RUN bun install --frozen-lockfile


FROM base AS prerelease
WORKDIR /tmp/demyst
COPY --from=install /tmp/demyst/node_modules node_modules
COPY . .
RUN bun next build
RUN bun test


FROM base AS release
WORKDIR /app/demyst
COPY --from=install /tmp/demyst/node_modules node_modules
COPY --from=prerelease /tmp/demyst/.next .next
COPY --from=prerelease /tmp/demyst/package.json package.json
COPY --from=prerelease /tmp/demyst/bun.lockb bun.lockb
CMD bun next start

EXPOSE 3000
