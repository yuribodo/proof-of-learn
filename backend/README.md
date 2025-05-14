
## Getting Started 💻

_you must have `docker` installed_

### Step 0:
- Move to `/api` folder

```bash
cd api
```

### Step 1:

- Copy ".env.example" file and create a ".env"

```bash
cp .env.example .env
```

### Step 2:

- With docker running on your machine, following commands:

> it will compose the docker file
```bash
pnpm services:up
```

> run pending migrations
```bash
pnpx prisma migrate dev
```

> run development server
```bash
pnpm dev
```

- Or, just run this command:

```bash
pnpm dev:all
```

### Step 3:

- Server is running at http://localhost:3000