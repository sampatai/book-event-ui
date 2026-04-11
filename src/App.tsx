import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/lib/router";
import { Toaster } from "sonner";
import { AuthGuard } from "@/components/AuthGuard";

export function App() {
  return (
    <AuthGuard>
      <RouterProvider router={router} />
      <Toaster />
    </AuthGuard>
  );
}

export default App;
