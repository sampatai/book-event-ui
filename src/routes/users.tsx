import { createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { rootRoute } from "./__root";
import { useListQueryParams } from "@/hooks/useListQueryParams";
import { usersApi, type ListBase, type User } from "@/lib/api";

const fallbackUsers: ListBase<User> = {
  records: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alex Brown", email: "alex@example.com" },
  ],
  totalRecords: 3,
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
    enableSorting: true,
  },
];

function UsersPage() {
  const { query, setQuery, queryOptions } = useListQueryParams({
    initial: {
      enabled: true,
      pageNumber: 1,
      pageSize: 10,
      sortBy: "name",
      sortDirection: "asc",
    },
  });

  const usersQuery = useQuery({
    queryKey: ["users", query],
    queryFn: () => usersApi.getAll(query),
    placeholderData: fallbackUsers,
    ...queryOptions,
  });

  return (
    <div className="flex flex-col gap-6 w-full p-2 h-full">
      <div className="flex flex-col gap-1.5 pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Users Management
        </h1>
        <p className="text-muted-foreground text-base">
          View, manage, and search your platform users. Demo built with shadcn
          DataTable & TanStack Query.
        </p>
      </div>

      <div className="flex-1 w-full bg-card rounded-xl border shadow-sm p-4 h-full">
        <DataTable
          columns={columns}
          listData={usersQuery.data}
          query={query}
          onQueryChange={setQuery}
          isLoading={usersQuery.isFetching}
          searchPlaceholder="Search users by name or email"
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </div>
    </div>
  );
}

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UsersPage,
});
