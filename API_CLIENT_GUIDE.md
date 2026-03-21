# API Client Usage Guide

## Setup

The project now uses a centralized **API Client** with environment-based configuration.

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Or for production:

```env
VITE_API_BASE_URL=https://api.example.com
```

## File Structure

```
src/
  lib/
    apiClient.ts        # API Client class (singleton)
    api.ts              # API service functions
    constants.ts        # API endpoint constants
```

## Using the API Client

### Basic Usage - Navigation Menu

```typescript
import { fetchNavigation } from "@/lib/api";
import { useNavigation } from "@/hooks/useNavigation";

// Automatically fetches from API_ENDPOINTS.MENU
const { navItems, loading, error } = useNavigation();
```

### Direct API Client Usage

```typescript
import { apiClient } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";

// GET request
const menu = await apiClient.get("/menu");

// GET with query parameters
const users = await apiClient.get("/users", { page: 1, limit: 10 });

// POST request
const user = await apiClient.post("/users", { name: "John" });

// PUT request
await apiClient.put("/users/123", { name: "John Updated" });

// DELETE request
await apiClient.delete("/users/123");
```

### Setting Authentication Token

```typescript
import { apiClient } from "@/lib/apiClient";

// After login, set the auth token
apiClient.setAuthToken("your-jwt-token");

// All subsequent requests will include Authorization header
```

### Custom API Client Instance

```typescript
import { APIClient } from "@/lib/apiClient";

// Create with custom config
const customClient = new APIClient({
  baseURL: "https://api.example.com",
  timeout: 15000,
  headers: {
    "X-Custom-Header": "value",
  },
});

const data = await customClient.get("/endpoint");
```

## Available Endpoints

All endpoints are defined in `src/lib/constants.ts`:

```typescript
import { API_ENDPOINTS } from "@/lib/constants";

API_ENDPOINTS.MENU; // "/menu"
API_ENDPOINTS.USERS; // "/users"
API_ENDPOINTS.TEAMS; // "/teams"
API_ENDPOINTS.SETTINGS; // "/settings"
API_ENDPOINTS.AUTH; // "/auth"
```

Add more endpoints in `constants.ts`:

```typescript
export const API_ENDPOINTS = {
  MENU: "/menu",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  // ... add more
} as const;
```

## Error Handling

```typescript
import { apiClient } from "@/lib/apiClient";

try {
  const data = await apiClient.get("/menu");
} catch (error) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);

    // Check HTTP status if available
    if ((error as any).status === 401) {
      console.error("Unauthorized");
    }
  }
}
```

## Features

✅ **Environment-based configuration** — Base URL from env vars  
✅ **Request timeout** — Default 10s, configurable  
✅ **Query parameters** — Automatic URL encoding  
✅ **JSON serialization** — Automatic JSON stringify/parse  
✅ **Authorization** — Easy token management  
✅ **Error handling** — Consistent error messages  
✅ **Type-safe** — Full TypeScript support  
✅ **Singleton** — One client instance for entire app

## Example API Response

All endpoints should return JSON:

```json
{
  "success": true,
  "data": {
    "navMain": [...]
  }
}
```

Or for errors:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Adding New API Calls

1. Add endpoint constant to `constants.ts`
2. Create service function in `api.ts`
3. Use in components via the service function or directly with `apiClient`

Example:

**constants.ts:**

```typescript
export const API_ENDPOINTS = {
  // ... existing
  PRODUCTS: "/products",
};
```

**api.ts:**

```typescript
export async function fetchProducts(): Promise<Product[]> {
  try {
    return await apiClient.get(API_ENDPOINTS.PRODUCTS);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
```

**Component:**

```typescript
import { fetchProducts } from "@/lib/api";

const products = await fetchProducts();
```
