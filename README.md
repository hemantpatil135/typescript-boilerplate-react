# React + TypeScript + Redux Toolkit Starter

A small, typed starting point for React apps that need login and a REST-backed CRUD screen. It shows a **Redux Toolkit** setup I'd use on a real project: `configureStore`, typed hooks, `createAsyncThunk` with loading and error state, a thin typed API layer and protected routes. It runs against a local mock REST API.

## Features

- **Login with a protected area.** A simulated login sets auth state. `/users`, `/user/add` and `/user/edit/:id` sit behind a `RequireAuth` guard.
- **Users CRUD against a REST API.** Create, read, update and delete through `createAsyncThunk`, with `idle / loading / succeeded / failed` status and error messages in the store.
- **Typed end to end.** `RootState` and `AppDispatch` are inferred from the store, `useAppSelector` and `useAppDispatch` are typed, and the codebase has no `any`.
- **Config-driven routing.** Routes are declared in one array, with a `protected` flag.
- **Mock backend.** `json-server` serves `db.json` at `http://localhost:8080`.
- **Tests.** Reducer tests for the async lifecycle and CRUD, plus routing tests for the login page and the auth redirect.

## Tech stack

React 18 · TypeScript · Redux Toolkit · React Router 6 · Material UI 5 · Axios · json-server · Jest + React Testing Library · Create React App

## Getting started

```bash
git clone https://github.com/hemantpatil135/typescript-boilerplate-react.git
cd typescript-boilerplate-react
npm install
cp .env.example .env     # optional, defaults to http://localhost:8080

npm run api              # terminal 1: mock REST API on :8080
npm start                # terminal 2: app on http://localhost:3000
```

**Demo login:** `admin@gmail.com` / `admin@123`. The login call is simulated in `src/apis/authAPI.ts`.

| Script | What it does |
|---|---|
| `npm start` | Dev server |
| `npm run api` | json-server on port 8080, watching `db.json` |
| `npm test` | Jest + React Testing Library |
| `npm run build` | Production build |

### Environment variables

| Name | Default | Purpose |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:8080` | Base URL of the users API |

## Project structure

```
src/
├── apis/
│   ├── authAPI.ts          # simulated login
│   └── userApi.ts          # typed axios client for /users
├── components/
│   ├── Login/Login.tsx
│   └── UserDetails/
│       ├── UserDetails.tsx # list with loading/error states
│       └── UserForm.tsx    # add / edit
├── models/                 # User, UserState, auth types
├── reducers/reducers.ts    # combineReducers
├── routes/
│   ├── routes.ts           # route table with `protected` flags
│   ├── routerConfig.ts     # RouteConfig type
│   └── RequireAuth.tsx     # redirects to / when logged out
├── slices/
│   ├── authSlice.ts
│   ├── userSlice.ts        # CRUD thunks + reducers
│   └── userSlice.test.ts
├── store/
│   ├── store.ts            # configureStore, RootState, AppDispatch
│   └── hooks.ts            # useAppDispatch, useAppSelector
└── App.tsx
```

## How data flows

```
Component ──dispatch(thunk)──▶ createAsyncThunk ──▶ userApi (axios) ──▶ REST API
    ▲                                 │
    └──── useAppSelector ◀── slice reducers (pending / fulfilled / rejected)
```

Components never call axios directly. They dispatch thunks and read `users`, `status` and `error` from the slice.

## Possible improvements

- Swap the hand-written thunks for **RTK Query** to get caching and invalidation
- Replace the simulated login with a real token flow and persist the session
- Add form validation (React Hook Form + Zod) to `UserForm`
- Migrate from Create React App to Vite
