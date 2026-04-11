"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { useListQueryParams } from "@/hooks/useListQueryParams";
import type { ListQueryParams } from "../../lib/api";
import { usePandits } from "@/hooks/pandit/usePandit";
import { DataTable } from "@/components/DataTable";
import type { IListPanditResponse } from "@/lib/interface/IPandit";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TableActions } from "@/components/TableActions";

const columns: ColumnDef<IListPanditResponse>[] = [
  {
    accessorKey: "fullName",
    header: "Fullname",
    enableSorting: true,
  },
  {
    accessorKey: "languages",
    header: "Languages",
    enableSorting: true,
  },
  {
    accessorKey: "experienceInYears",
    header: "Experience",
    enableSorting: true,
  },
  {
    accessorKey: "verificationState",
    header: "Verification State",
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: "City",
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const pandit = row.original;
      return (
        <TableActions
          onView={() => console.log("View", pandit.panditId)}
          editUrl={`/pandit/edit/${pandit.panditId}`}
          onDelete={() => {
            console.log("Delete", pandit.panditId);
            // Implementation for delete API call
          }}
          deleteConfirmMessage="Are you sure you want to delete this pandit?"
        />
      );
    },
  },
];
export function Pandit() {
  const { query, setQuery } = useListQueryParams<ListQueryParams>({
    initial: {
      enabled: true,
      pageNumber: 1,
      pageSize: 20,
    },
  });
  const { data, isFetching } = usePandits(query);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pandit</CardTitle>
          <CardDescription>List of all listed pandit list</CardDescription>
        </div>
        <Button asChild>
          <Link to="/pandit/create">
            <Plus className="mr-2 size-4" />
            Add Pandit
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          listData={data}
          query={query}
          onQueryChange={setQuery}
          isLoading={isFetching}
          emptyText="No record found"
          searchPlaceholder="Search users by name or address"
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
export const panditsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pandit",
  component: Pandit,
});
