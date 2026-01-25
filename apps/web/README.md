# AREA Web App

The frontend for the AREA project, built with Next.js and React.

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Theming**: `next-themes`
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🛠️ Getting Started

First, ensure the root dependencies are installed and the backend/Hasura are running.

From the root directory, run the development server:

```bash
pnpm --filter web dev
```

Or run everything:

```bash
pnpm dev
```

Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.

## 📁 Structure

- `app/`: Next.js App Router (pages, layouts, and components).
- `public/`: Static assets.
- `styles/`: Global styles and Tailwind configuration.

## 💻 Development Commands

- `pnpm dev`: Start development server on port 8081.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint checks.
