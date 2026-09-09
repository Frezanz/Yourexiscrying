# PeopleOps — HR-tech frontend demo

A focused portfolio/demo frontend built around the requirements of a Freelancer HR-tech frontend brief.

## What this demonstrates

- Responsive desktop/mobile HR operations dashboard
- Employee directory with search/filter interaction
- Analytics view with headcount and engagement charts
- Settings and role/security-oriented controls
- Loading-free local demo state with predictable component structure
- Accessible semantic controls, responsive layouts and clear empty/error-style states
- React + TypeScript + Vite architecture
- Reusable UI components and a clean separation between presentation and demo data

## Important scope note

This repository is a **frontend demonstration**, not a claim that a real HR backend is already connected. The brief says the client's authentication, database and REST/GraphQL API already exist; this demo intentionally models the integration points with local data so the UI can be reviewed independently.

In a production handoff, the demo data layer would be replaced by typed REST/GraphQL services, protected routes would connect to the client's auth provider, and automated unit/component/e2e tests would be added to the agreed milestone scope.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Portfolio positioning

Use this demo as a **brief-specific capability sample**. Do not describe it as a previously deployed client production system unless it has actually been deployed and used that way.
