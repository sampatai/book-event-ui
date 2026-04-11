import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Edit, Eye, Trash2 } from "lucide-react";

export interface TableActionsProps {
  /** URL or path to navigate to for the View action */
  viewUrl?: string;
  /** URL or path to navigate to for the Edit action */
  editUrl?: string;
  /** Callback when the View button is clicked (used if viewUrl is not provided) */
  onView?: () => void;
  /** Callback when the Edit button is clicked (used if editUrl is not provided) */
  onEdit?: () => void;
  /** Callback when the Delete button is clicked */
  onDelete?: () => void;
  /** Custom confirm message for delete action */
  deleteConfirmMessage?: string;
}

export function TableActions({
  viewUrl,
  editUrl,
  onView,
  onEdit,
  onDelete,
  deleteConfirmMessage = "Are you sure you want to delete this item?",
}: Readonly<TableActionsProps>) {
  return (
    <div className="flex items-center gap-2">
      {(viewUrl || onView) && (
        <Button
          variant="outline"
          size="icon"
          title="View details"
          asChild={!!viewUrl}
          onClick={viewUrl ? undefined : onView}
        >
          {viewUrl ? (
            <Link to={viewUrl}>
              <Eye className="size-4" />
            </Link>
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      )}

      {(editUrl || onEdit) && (
        <Button
          variant="outline"
          size="icon"
          title="Edit"
          asChild={!!editUrl}
          onClick={!editUrl ? onEdit : undefined}
        >
          {editUrl ? (
            <Link to={editUrl}>
              <Edit className="size-4" />
            </Link>
          ) : (
            <Edit className="size-4" />
          )}
        </Button>
      )}

      {onDelete && (
        <Button
          variant="destructive"
          size="icon"
          title="Delete"
          onClick={() => {
            if (confirm(deleteConfirmMessage)) {
              onDelete();
            }
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  );
}
