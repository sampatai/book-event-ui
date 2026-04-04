import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/lib/router";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
