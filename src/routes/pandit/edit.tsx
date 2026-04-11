import { CreateEditPandit } from "@/components/pandit/create-update-pandit";
import type { IPanditCreateUpdate } from "@/lib/interface/IPandit";
import { createRoute, useNavigate } from "@tanstack/react-router";
import type { SubmitHandler } from "react-hook-form";
import { rootRoute } from "../__root";
import { usePandit, useUpdatePandit } from "@/hooks/pandit/usePandit";
import { toast } from "sonner";

export function EditPandit() {
  const navigate = useNavigate();
  const { id } = editPanditRoute.useParams();

  const { data: pandit, isLoading } = usePandit(id);
  const updatePanditMutation = useUpdatePandit();

  const handleSubmit: SubmitHandler<IPanditCreateUpdate> = (values) => {
    updatePanditMutation.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          toast.success("Pandit updated successfully!");
          navigate({ to: "/pandit" });
        },
        onError: (error) => {
          toast.error("Failed to update pandit!");
          console.error("Failed to update pandit:", error);
        },
      },
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the API returns a nested structure or flat, make sure it matches defaultValues shape.
  // Assuming pandit.value or pandit directly gives the object details matching IPanditCreateUpdate:
  const defaultValues = pandit;

  return (
    <CreateEditPandit
      onSubmit={handleSubmit}
      defaultValues={defaultValues as IPanditCreateUpdate | undefined}
    />
  );
}

export const editPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pandit/edit/$id",
  component: EditPandit,
});
