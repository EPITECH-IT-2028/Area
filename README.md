# Area Project

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Docker](https://www.docker.com/): Used to containerize and manage the database and other services.
- [Node.js](https://nodejs.org/) (v16 or higher recommended): A JavaScript runtime required for running the project.
- [pnpm](https://pnpm.io/) (v8 or higher recommended): A fast, disk space-efficient package manager for Node.js.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/EPITECH-IT-2028/Area.git
   cd Area
   ```
   This command clones the project repository from GitHub and navigates into the project directory.

2. Install dependencies:
   ```bash
   pnpm install
   ```
   This command installs all the required dependencies for the project using `pnpm`.

3. Launch the database:
   ```bash
   docker compose up -d
   ```
   This command starts the database in detached mode using Docker Compose. Ensure Docker is running before executing this command.

4. Set up Hasura:
   ```bash
   pnpm hasura:setup
   ```
   This command initializes the Hasura configuration for the project.

5. Start Hasura:
   ```bash
   pnpm hasura:console
   ```
   This command launches the Hasura console, allowing you to manage the GraphQL API and database schema.

## Project Architecture

The project is organized as a monorepo with the following structure:

- **apps/**: Contains the main applications.
  - **api/**: Backend application built with NestJS. It includes modules for authentication, user management, and GraphQL services.
  - **mobile/**: Mobile application developed entirely in Swift for iOS.
  - **web/**: Frontend application built with Next.js, providing the user interface for the project.
- **hasura/**: Contains Hasura configurations, metadata, migrations, and seeds for managing the database and GraphQL API.
- **packages/**: Shared configurations and utilities.
  - **eslint-config/**: Shared ESLint configurations for consistent code formatting.
  - **typescript-config/**: Shared TypeScript configurations for type checking and development.

## How to Launch the App

### Launch the Entire Project
To launch the entire project (backend and frontend):
```bash
pnpm dev
```
This command starts both the backend and frontend applications in development mode.

### Launch Specific Parts
- **Backend only**:
  ```bash
  pnpm --filter api dev
  ```
  This command starts only the backend application in development mode.

- **Frontend only**:
  ```bash
  pnpm --filter web dev
  ```
  This command starts only the frontend application in development mode.

## Technologies Used

### Backend
- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient and scalable server-side applications. It provides a modular architecture, dependency injection, and built-in support for WebSockets and GraphQL.
- [GraphQL](https://graphql.org/): A query language for APIs that allows clients to request only the data they need. It simplifies data fetching and improves performance.
- [Hasura](https://hasura.io/): A GraphQL engine that provides instant APIs over PostgreSQL databases, with built-in support for authentication, authorization, and event triggers.

### Frontend
- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and static web applications. It supports features like API routes, image optimization, and incremental static regeneration.

### Mobile
- [Swift](https://www.swift.org/): A powerful and intuitive programming language for iOS development. It offers modern features like type safety, memory management, and interoperability with Objective-C.

### Database
- [PostgreSQL](https://www.postgresql.org/): A powerful, open-source object-relational database system known for its reliability, feature robustness, and performance. It supports advanced data types, full-text search, and JSON/JSONB storage.

### Others
- [Docker](https://www.docker.com/): A platform for developing, shipping, and running applications in containers. It ensures consistency across development and production environments.
- [pnpm](https://pnpm.io/): A fast, disk space-efficient package manager for Node.js. It uses a unique symlink-based approach to save storage space and speed up installations.