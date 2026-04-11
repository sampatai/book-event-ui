import { CreateEditPandit } from "@/components/pandit/create-update-pandit";
import type { IPanditCreateUpdate } from "@/lib/interface/IPandit";
import { createRoute, useNavigate } from "@tanstack/react-router";
import type { SubmitHandler } from "react-hook-form";
import { rootRoute } from "../__root";
import { useCreatePandit } from "@/hooks/pandit/usePandit";
import { toast } from "sonner";

export function CreatePandit() {
  const navigate = useNavigate();
  const createPanditMutation = useCreatePandit();

  const handleSubmit: SubmitHandler<IPanditCreateUpdate> = (values) => {
    createPanditMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Pandit created successfully!");
        // Redirect back to pandits list on success
        navigate({ to: "/pandit" });
      },
      onError: (error) => {
        toast.error("Failed to create pandit!");
        console.error("Failed to create pandit:", error);
      },
    });
  };

  return <CreateEditPandit onSubmit={handleSubmit} />;
}
export const createPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pandit/create",
  component: CreatePandit,
});
