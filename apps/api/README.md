# AREA API

The backend for the AREA project, built with NestJS.

## 🚀 Technologies

- **Framework**: [NestJS 11](https://nestjs.com/)
- **API**: GraphQL via [Hasura](https://hasura.io/)
- **Auth**: [Passport.js](https://www.passportjs.org/) with multiple strategies:
  - JWT
  - Google OAuth2
  - GitHub
  - Discord
  - Microsoft
  - Spotify
  - Twitter
- **Validation**: `class-validator` & `class-transformer`
- **Documentation**: Swagger (available in dev mode)

## 🛠️ Getting Started

First, ensure the root dependencies are installed and the infrastructure (Postgres/Hasura) is running.

From the root directory, run the development server:

```bash
pnpm --filter api dev
```

Or run everything:

```bash
pnpm dev
```

The API will be available at [http://localhost:8080](http://localhost:8080).

## 📁 Structure

- `src/`: Core logic, controllers, services, and modules.
- `test/`: Unit and E2E tests.

## 💻 Development Commands

- `pnpm dev`: Start development server with watch mode.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm test`: Run tests.
- `pnpm codegen`: Generate GraphQL types from Hasura schema.
- `pnpm lint`: Run ESLint checks.

## 🔐 Authentication

The API uses Passport.js for authentication. It supports local JWT-based auth as well as various OAuth2 providers. Make sure to configure the corresponding environment variables in the root `.env` file.
