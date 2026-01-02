---
title: "Optimizing Docker Images for Production"
description: "Techniques for reducing Docker image size and improving build times using multi-stage builds, layer caching, and minimal base images."
date: 2025-11-15
tags: ["docker", "devops", "performance"]
---

## Why Image Size Matters

Smaller Docker images mean faster deployments, reduced storage costs, and improved security surface.

## Multi-Stage Builds

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

## Layer Caching Best Practices

1. Order instructions from least to most frequently changing
2. Combine RUN commands where possible
3. Use .dockerignore to exclude unnecessary files

## Alpine vs Distroless

Compare base image options:

| Base Image | Size  | Security  | Use Case        |
| ---------- | ----- | --------- | --------------- |
| Alpine     | ~5MB  | Good      | General purpose |
| Distroless | ~20MB | Excellent | Production apps |
| Scratch    | <1MB  | Minimal   | Static binaries |
