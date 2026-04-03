# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## API Setup

This project uses a shared axios client in `src/lib/axios.ts` and domain-based API modules in `src/lib/api.ts`.

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Available API modules:

- `navigationApi` for navigation/menu endpoints
- `usersApi` for user-related endpoints
- `bookingsApi` for booking-related endpoints

Existing code can continue using `fetchNavigation` and `defaultMenu` from `src/lib/api.ts`.
