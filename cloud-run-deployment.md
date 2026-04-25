# Deploying to Google Cloud Run

Deploying your Smart Stadium System to Google Cloud Run is perfect because it scales automatically and you only pay when people use it. Since we built this using Next.js, the deployment process is very straightforward.

## Prerequisites

1. Create a [Google Cloud account](https://cloud.google.com/).
2. Install the [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install) on your computer.
3. Make sure you have [Docker](https://www.docker.com/) installed (optional but good for local testing).

## Step-by-Step Deployment Guide

### Step 1: Initialize Google Cloud
Open your terminal and log in to your Google Cloud account:
```bash
gcloud auth login
```

Create a new Google Cloud project (or use an existing one):
```bash
gcloud projects create smart-stadium-project
gcloud config set project smart-stadium-project
```

Enable the necessary APIs for Cloud Run and Container Registry:
```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### Step 2: Prepare your Next.js app for Docker
Next.js supports Docker out of the box. Create a `Dockerfile` in the root of your project:

**Create a file named `Dockerfile` (no extension) in your project root:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

**Next, update your `next.config.mjs` (or `.js`) to enable standalone output:**
Add `output: 'standalone'` to your configuration:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;
```

### Step 3: Deploy using Cloud Run
Google Cloud Run can automatically build your Docker container and deploy it in one command. Run this in your project root:

```bash
gcloud run deploy smart-stadium-service --source . --region us-central1 --allow-unauthenticated
```

1. It will ask if you want to enable Artifact Registry. Type `y` and press Enter.
2. It will build your container (this might take a few minutes).
3. Once finished, it will provide a **Service URL** (e.g., `https://smart-stadium-service-xxx-uc.a.run.app`).

### Step 4: Access Your Deployed App
Click the Service URL provided in the terminal. Your application is now live!
- **User Dashboard**: Go to the URL directly.
- **Admin Panel**: Append `/admin` to the URL.

## Summary
Google Cloud Run takes your code, packages it into a container, and runs it on Google's infrastructure. It will automatically scale up if thousands of fans check their phones at halftime, and scale down to zero when the stadium is empty!
