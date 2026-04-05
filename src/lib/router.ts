import { Router } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root";
import { indexRoute } from "@/routes/index";
import { settingsRoute } from "@/routes/settings";
import { usersRoute } from "@/routes/users";
import { panditsRoute } from "@/routes/pandit";

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  settingsRoute,
  usersRoute,
  panditsRoute,
]);

// Create the router instance
//This is the same router object that  pass to the <RouterProvider> in  App.tsx file.
export const router = new Router({ routeTree });

// Register router for maximum type safety
//It tells the TanStack Router library about the specific shape of your router, including all the routes you've defined.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
