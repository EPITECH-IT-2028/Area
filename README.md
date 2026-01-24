# AREA Project

A powerful automation platform inspired by IFTTT and Zapier, built with a modern tech stack.

## 🚀 Project Overview

The project is organized as a monorepo using **TurboRepo** and **pnpm**, providing a seamless development experience across the backend, frontend, and mobile applications.

- **Backend (`apps/api`)**: Built with **NestJS 11**, leveraging **GraphQL** and **Hasura** for a robust and scalable API.
- **Frontend (`apps/web`)**: Developed with **Next.js 16** and **React 19**, styled with **Tailwind CSS 4** and **Radix UI**.
- **Mobile (`apps/mobile`)**: A native iOS application built with **Swift** and **SwiftUI**.

## 🛠️ Installation and Setup

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [pnpm](https://pnpm.io/) (v9 or higher recommended)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EPITECH-IT-2028/Area.git
   cd Area
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Environment Variables:**
   Copy the `.env.example` file to `.env` and fill in the required values.

4. **Launch the infrastructure:**

   ```bash
   docker compose up -d postgres graphql-engine data-connector-agent
   ```

   _Starts the PostgreSQL database and Hasura engine._

5. **Initialize Hasura:**
   ```bash
   pnpm hasura:setup
   ```
   _Applies migrations, metadata, and seeds._

## 💻 Development

### Launch Locally (Recommended for Development)

To start the API and Web apps in development mode:

```bash
pnpm dev
```

- **Web App**: [http://localhost:8081](http://localhost:8081)
- **API**: [http://localhost:8080](http://localhost:8080)
- **Hasura Console**: `pnpm hasura:console` (at [http://localhost:9695](http://localhost:9695))

### Launch with Docker

Alternatively, you can run the entire stack (including apps) via Docker:

```bash
docker compose up -d
```

### Other Commands

- **Build all**: `pnpm build`
- **Lint all**: `pnpm lint`
- **Format all**: `pnpm format`
- **Type check**: `pnpm check-types`
- **Generate GraphQL types**: `pnpm codegen`

## 🏗️ Architecture

- **`apps/`**: Main applications.
  - `api/`: NestJS backend.
  - `web/`: Next.js web application.
  - `mobile/`: Swift/SwiftUI mobile app.
- **`hasura/`**: Hasura GraphQL engine configuration, migrations, and metadata.
- **`packages/`**: Shared configurations (ESLint, TypeScript).
- **`docker/`**: Docker-related configuration files.

## 🧰 Tech Stack

- **Backend**: NestJS, Passport (OAuth2 integrations), GraphQL, Hasura.
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Radix UI, Sonner.
- **Mobile**: Swift, SwiftUI (MVVM architecture).
- **Database**: PostgreSQL.
- **Tooling**: TurboRepo, pnpm, Prettier, ESLint.
