## Launch the database

To launch the database, follow these steps:
```bash
docker compose up -d
```

Then setup hasura:
```bash
pnpm hasura:setup
```

Then start hasura:
```bash
pnpm hasura:console
```

## Launch the project

To launch the project, follow these steps:

```bash
pnpm dev
```

If you want to launch the backend only:

```bash
pnpm --filter api dev
```

or if you want to launch the frontend only:

```bash
pnpm --filter web dev
```
