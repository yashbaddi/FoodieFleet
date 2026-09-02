# FoodieFleet — Agent Guidelines & Repository Guide

This document provides essential architecture context, conventions, and operational workflows for AI coding agents working on the **FoodieFleet** repository.

---

## 1. Project Overview

**FoodieFleet** is a full-stack food delivery monorepo application supporting three primary user flows:

1. **Customers**: Browse restaurants & menus, manage shopping cart, place orders, and track delivery driver in real-time via live GPS map.
2. **Restaurant Owners**: Manage restaurant profiles, menu items, and accept/reject/update incoming orders.
3. **Delivery Drivers**: Accept delivery tasks, stream real-time GPS locations, and update delivery statuses.

### Tech Stack Summary

- **Monorepo Manager**: PNPM workspaces (`pnpm-workspace.yaml`) + Turborepo (`turbo.json`)
- **Backend (`apps/node-server`)**: Node.js (ESM), Express 4, `express-ws` (WebSockets), `pg` (PostgreSQL client), `ioredis` / `redis` (Redis client & Geospatial queries), `yaml` & `swagger-ui-express` (OpenAPI 3.0 via `openapi.yaml`), `bcryptjs`, `jsonwebtoken`
- **Frontend (`apps/web`)**: React 18, Vite 4, React Router v6, Redux (legacy `createStore` + `redux-thunk`), Tailwind CSS, Leaflet / `react-leaflet` / `leaflet-routing-machine`
- **Database & Caching**: PostgreSQL 16 (relational schema, custom ENUMs, UUID PKs, JSONB coordinates) and Redis 7 (driver geolocation indexing with `GEOADD`/`GEORADIUS`, caching)
- **Infrastructure & Deployment**: Docker, Docker Compose, Nginx (reverse proxy & static host), GitHub Actions (`deploy.yml` pushing to Docker Hub and deploying to AWS EC2)
- **Planned / Scaffold (`apps/go-server`)**: Go module scaffold (`go.mod`) reserved for future backend migration

---

## 2. Repository Structure

```
FoodieFleet/
├── AGENTS.md                     # This file (Agent guide)
├── README.md                     # High-level product and API documentation
├── package.json                  # Monorepo root scripts & dev engines
├── pnpm-workspace.yaml           # PNPM workspace definition (apps/*, packages/*)
├── pnpm-lock.yaml                # Lockfile
├── turbo.json                    # Turborepo task pipeline (dev, build, lint)
├── docker-compose.yml            # Multi-container orchestration (Postgres, Redis, Backend, Web)
├── .env.example                  # Environment variables template
├── migrations/
│   └── schema.sql                # PostgreSQL DDL, custom ENUMs, relations, & seed data
├── docs/
│   └── model.svg                 # Database entity-relationship diagram
├── .github/workflows/
│   └── deploy.yml                # CI/CD pipeline (Docker build/push + EC2 SSH deploy)
└── apps/
    ├── node-server/              # Express + WebSocket Backend API
    │   ├── Dockerfile            # Container build for Node.js API (node:20-alpine)
    │   ├── app.js                # App entry point, middleware, Swagger mount, graceful shutdown
    │   ├── config.js             # Environment configuration parser
    │   ├── openapi.yaml          # OpenAPI 3.0 specification definition
    │   ├── swagger.js            # Swagger UI / OpenAPI 3.0 specification loader (YAML parser)
    │   ├── utils.js              # Password hashing, JWT signing/verification, SQL helpers
    │   ├── middlewares/
    │   │   └── auth.js           # JWT verification (checks cookie `token` or `Bearer` header)
    │   ├── routes/
    │   │   ├── api.js            # Sub-router aggregating all /api endpoints
    │   │   ├── auth.js           # /api/auth (login, register, logout, me)
    │   │   ├── cart.js           # /api/cart (read, update)
    │   │   ├── drivers.js        # /api/driver (driver profile & WS stream)
    │   │   ├── health.js         # /health & /api/health (status of PG, Redis, uptime)
    │   │   ├── orders.js         # /api/orders (create, read, patch status)
    │   │   ├── restaurants.js    # /api/restaurants (CRUD, menu items, owner WS stream)
    │   │   └── users.js          # /api/user (user WS stream for driver tracking)
    │   ├── controller/           # Request extraction, parameter parsing, response dispatching
    │   │   ├── auth.js, cart.js, driver.js, orders.js, restaurants.js, users.js
    │   │   └── ws/               # WebSocket handlers (driver.js, restaurant.js, user.js)
    │   ├── services/             # Business logic layer & cross-service orchestration
    │   │   └── cart.js, drivers.js, orders.js, restaurants.js, users.js
    │   ├── model/                # Direct database access & query building
    │   │   ├── db-connection.js  # pg.Pool and ioredis client initialization
    │   │   └── cart.js, drivers.js, items.js, orders.js, restaurants.js, users.js
    │   └── test/models/          # Model test / execution scratch scripts
    ├── web/                      # React SPA Frontend
    │   ├── Dockerfile            # Multi-stage build (node:20-alpine -> nginx:alpine)
    │   ├── nginx.conf            # Nginx config (reverse proxies /api/ -> node-server:8001)
    │   ├── vite.config.js        # Vite config
    │   ├── tailwind.config.js    # Tailwind CSS config
    │   ├── postcss.config.js     # PostCSS config
    │   ├── index.html            # HTML root
    │   └── src/
    │       ├── main.jsx          # React DOM entrypoint
    │       ├── App.jsx           # Root component, routing, route auth check
    │       ├── config.js         # API (`/api/`) and WS URL resolver
    │       ├── components/       # Navigation, MapComponent, Order & Item cards, etc.
    │       ├── pages/            # Views for Home, Login, Cart, Orders, Dashboards, etc.
    │       ├── hooks/            # Custom hooks (`useGeoLocation.js`)
    │       ├── services/         # HTTP `requests.js` & WebSocket `ws-connection.js`
    │       └── store/            # Redux store, action creators, and reducers
    └── go-server/                # Scaffolded module for future Go migration
```

---

## 3. Build, Run, Test, & Lint Commands

### Monorepo (Root) Commands

- **Install Dependencies**: `pnpm install`
- **Run All in Dev Mode**: `pnpm dev` (executes `turbo dev`, starting Vite dev server and Node nodemon)
- **Build All**: `pnpm build` (executes `turbo build`, compiling frontend to `apps/web/dist`)
- **Lint All**: `pnpm lint` (executes `turbo lint`, running ESLint in `apps/web`)

### Backend (`apps/node-server`)

- **Start Development**: `npm run dev` (starts `nodemon app.js` on port `8001`)
- **Start Production**: `npm start` (runs `node app.js`)
- **Build**: `npm run build` (no compile step needed; Node ESM runtime)

### Frontend (`apps/web`)

- **Start Development**: `npm run dev` (starts Vite dev server on port `5173`)
- **Build Production**: `npm run build` (outputs compiled SPA assets to `apps/web/dist`)
- **Lint**: `npm run lint` (`eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0`)
- **Preview Production Build**: `npm run preview`

### Docker Compose (Full Environment)

- **Start all services**: `docker compose up -d`
  - Postgres: `localhost:5433` (maps to internal `5432`)
  - Redis: `localhost:6380` (maps to internal `6379`)
  - Node API Server: `localhost:8001`
  - Web UI (Nginx): `localhost:80` and `localhost:5173`
- **Stop all services**: `docker compose down`
- **Rebuild containers**: `docker compose up -d --build`

---

## 4. Architecture & Key Patterns

### 1. Backend 3-Tier Layered Architecture

- **`routes/`**: Define HTTP methods, paths, and middleware (`authMiddleware`, `bodyParser`). Delegate handling immediately to a controller. (API documentation is maintained centrally in `apps/node-server/openapi.yaml`).
- **`controller/`**: Extract params (`req.params`, `req.body`, `req.query`, `res.locals.userID`), call appropriate service method(s), and format/return the HTTP response (`res.json(...)`, `res.status(...)`).
- **`services/`**: Execute business logic, cross-domain coordination (e.g. creating an order, deducting cart items, notifying restaurant and driver), and trigger WebSocket events.
- **`model/`**: Execute raw parameterized SQL queries on `pg.Pool` or Redis commands on `redisClient`.

### 2. WebSocket Subsystem (`express-ws`)

Real-time bi-directional streaming is handled via three distinct WebSocket endpoints under `/api`:

- **`/api/user/ws`** (`controller/ws/user.js`): Customers listen for driver location updates (`partner_location`) and order status changes (`notification`).
- **`/api/restaurants/ws`** (`controller/ws/restaurant.js`): Restaurant owners receive incoming order notifications and can query driver positions.
- **`/api/driver/ws`** (`controller/ws/driver.js`): Active drivers send live GPS coordinates (`location`), update status (`partner_status`), and receive order dispatch assignments (`order`).
- **Heartbeat**: All WebSocket connections run a 2-second PingPong interval (`{ type: "PingPong", data: "ping" }`) to maintain socket liveness.

### 3. Geospatial Driver Matching

- Driver GPS locations are stored in Redis using Geospatial primitives: `GEOADD driverLocations <longitude> <latitude> <driverId>`.
- Proximity queries are performed using `GEORADIUS driverLocations <longitude> <latitude> <radius> m`.
- The matching algorithm (`driversService.getNearestDriver`) expands search radius incrementally (from 100m up to 10,000m) and intersects results with active drivers having `AVAILABLE` status in PostgreSQL and an active WebSocket session in `driverWsController`.

### 4. Database Schema & Models

- PostgreSQL schema is defined in `migrations/schema.sql`.
- **Primary Keys**: Entities (`users`, `sessions`, `restaurants`, `items`, `orders`) use native UUIDs (`id UUID DEFAULT gen_random_uuid() PRIMARY KEY`). `address` and `ratings` use `SERIAL PRIMARY KEY`.
- **Junction Tables**: `cart_items` (PK `(user_id, item_id)`) and `ordered_items` (PK `(order_id, item_id)`).
- **Custom ENUM Types**:
  - `order_status`: `'PLACED'`, `'PREPARING'`, `'PARTNER_ASSIGNED'`, `'DELIVERING'`, `'DELIVERED'`, `'REJECTED'`
  - `driver_status`: `'AVAILABLE'`, `'BUSY'`, `'ON_DELIVERY'`, `'UNAVAILABLE'`
- **JSONB Columns**: Storing structured coordinates and address objects (`location`, `delivery_location`).

### 5. Frontend State & Navigation

- State management uses Redux (`apps/web/src/store/`) with sub-reducers for `cart`, `orders`, `restaurants`, and `DriverLocation`.
- Client-side routing is handled via `react-router-dom` v6 (`App.jsx`).
- Global auth guard in `App.jsx` verifies the current session via `getCurrentUser()` (`/api/auth/me`); on 401 Unauthorized, unauthenticated users on protected routes are redirected to `/login`.

---

## 5. Coding & API Conventions

### Node.js ESM Modules

- Both `apps/node-server` and `apps/web` use native ES modules (`"type": "module"` in `package.json`).
- **Backend Import Requirement**: You **must** include the `.js` file extension in relative imports (e.g. `import orderService from "../services/orders.js";`).

### File & Symbol Naming

- **Backend**: camelCase for files (`db-connection.js`, `cart.js`, `orders.js`), functions, and object keys.
- **Frontend Components / Pages**: PascalCase for JSX files (`RestaurantDashboard.jsx`, `MapComponent.jsx`, `Navigation.jsx`).
- **Redux Files**: Feature-suffixed filenames (`orders.reducer.js`, `driverLocation.action.js`).

### Authentication & Authorization

- Auth utilizes JSON Web Tokens (JWT).
- The token is transmitted via HTTP-only cookie named `token` and optionally in the `Authorization: Bearer <token>` header.
- `authMiddleware` in `apps/node-server/middlewares/auth.js` decodes the token and attaches `res.locals.userID` (UUID string).
- In controllers and services, always use `res.locals.userID` to identify the authenticated user.

#### API Documentation (OpenAPI / Swagger)

- The OpenAPI 3.0 specification is maintained in `apps/node-server/openapi.yaml`.
- Swagger UI is mounted at `/api/docs` and `/api-docs` (spec at `/api/docs/swagger.json`).

### Error Handling & Graceful Shutdown

- Route handlers should pass errors to `next(err)` or let the centralized Express error handler in `app.js` handle them (returning HTTP 500 JSON).
- `app.js` listens to `SIGTERM`, `SIGINT`, `uncaughtException`, and `unhandledRejection`, gracefully shutting down the HTTP/WS server, Redis client, and PostgreSQL pool with a 10s fallback timeout.

---

## 6. Configuration & Environment Variables

The application is configured using environment variables defined in `.env` (copy from `.env.example`):

| Variable      | Description                          | Default / Example                                                                  |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `SERVER_PORT` | Backend port                         | `8001`                                                                             |
| `CORS_URLS`   | Space-separated allowed CORS origins | `http://localhost http://localhost:80 http://localhost:5173 http://localhost:8001` |
| `DB_HOST`     | PostgreSQL hostname                  | `postgres` (docker) or `localhost`                                                 |
| `DB_PORT`     | PostgreSQL port                      | `5432` (or `5433` if connecting from host to Docker)                               |
| `DB_NAME`     | PostgreSQL database name             | `foodiefleet`                                                                      |
| `DB_USER`     | PostgreSQL username                  | `yashbaddi`                                                                        |
| `DB_PASSWORD` | PostgreSQL password                  | `postgres_password`                                                                |
| `REDIS_URL`   | Redis connection URL                 | `redis://redis:6379` (or `redis://localhost:6380`)                                 |
| `JWT_SECRET`  | Secret key for signing JWT tokens    | `supersecretkey_foodiefleet_monolith`                                              |

---

## 7. Important Do's and Don'ts for Agents

### DO:

- **DO** use ES module syntax with explicit `.js` extensions for backend local imports.
- **DO** keep SQL queries inside `apps/node-server/model/` and business workflows inside `apps/node-server/services/`.
- **DO** update `apps/node-server/openapi.yaml` when modifying or creating endpoints.
- **DO** use parameterized queries (`$1, $2, ...`) when interacting with `pg.Pool` to prevent SQL injection.
- **DO** adhere to the ENUM values in PostgreSQL for order status (`'PLACED'`, `'PREPARING'`, `'PARTNER_ASSIGNED'`, `'DELIVERING'`, `'DELIVERED'`, `'REJECTED'`) and driver status (`'AVAILABLE'`, `'BUSY'`, `'ON_DELIVERY'`, `'UNAVAILABLE'`).
- **DO** use `res.locals.userID` for user-scoped actions in authenticated controllers.

### DON'T:

- **DON'T** write raw SQL queries or Redis commands directly inside route handlers or controllers.
- **DON'T** manually modify build outputs (`apps/web/dist/`) or lockfiles (`pnpm-lock.yaml`) directly.
- **DON'T** invent non-standard routes outside the `/api` prefix (except `/health` which is mirrored).
- **DON'T** modify `apps/go-server/` unless explicitly tasked with Go backend migration work.
- **DON'T** bypass `authMiddleware` on routes requiring user context.

---

## 8. Common Agent Workflows

### Adding a New API Endpoint

1. Define the SQL query in `apps/node-server/model/<entity>.js`.
2. Add the business logic / data transformations in `apps/node-server/services/<entity>.js`.
3. Create controller function in `apps/node-server/controller/<entity>.js` to parse params and return JSON.
4. Add route in `apps/node-server/routes/<entity>.js` and update `apps/node-server/openapi.yaml`.
5. Mount route on `apiRouter` in `apps/node-server/routes/api.js` if introducing a new resource router.

### Adding a New Frontend Feature / View

1. Add API request helpers in `apps/web/src/services/requests.js` (and handle 401 via `isAuthenticated`).
2. Add Redux action types, creators, and reducers in `apps/web/src/store/` if state needs to be shared.
3. Create new page component in `apps/web/src/pages/<PageName>.jsx` and supporting UI components in `apps/web/src/components/`.
4. Register the route in `apps/web/src/App.jsx`.
5. Verify build and lint with `pnpm build` and `pnpm lint`.

### Modifying the Database Schema

1. Update `migrations/schema.sql` with new tables, columns, or constraints.
2. Update corresponding model queries in `apps/node-server/model/`.
3. If running in Docker, recreate the postgres container volume or execute the DDL inside PostgreSQL to apply changes.

---

## 9. Recommendations for Nested AGENTS.md Files

For targeted sub-agent work within specific subsystems, the following nested `AGENTS.md` files are recommended:

- **`apps/node-server/AGENTS.md`**: Deep dive into Express controllers, services, database models, WebSocket event schemas, and Redis geospatial logic.
- **`apps/web/AGENTS.md`**: Deep dive into React components, Redux state hierarchy, Leaflet map tracking integration, and UI styling with Tailwind CSS.
