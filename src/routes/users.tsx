import { createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rootRoute } from "./__root";
import { useListQueryParams } from "@/hooks/useListQueryParams";
import {
  usersApi,
  type ListBase,
  type ListQueryFilters,
  type ListQueryParams,
  type User,
} from "@/lib/api";

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

interface UserFiltersProps {
  query: UserListQueryParams;
  setPartial: (patch: Partial<UserListQueryParams>) => void;
  isLoading: boolean;
}

interface UserFilters extends ListQueryFilters {
  status?: "active" | "inactive";
  minId?: number;
}

type UserListQueryParams = ListQueryParams<UserFilters>;

function UserTableFilters({ query, setPartial, isLoading }: UserFiltersProps) {
  const currentFilters = query.filters ?? {};
  const status = currentFilters.status ?? "all";
  const minId =
    typeof currentFilters.minId === "number"
      ? String(currentFilters.minId)
      : "";

  return (
    <>
      <Select
        value={status}
        onValueChange={(value) => {
          const nextFilters = { ...currentFilters };
          if (value === "all") {
            delete nextFilters.status;
          } else {
            nextFilters.status = value as UserFilters["status"];
          }

          setPartial({
            filters: nextFilters,
            pageNumber: 1,
          });
        }}
        disabled={isLoading}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        min={1}
        value={minId}
        placeholder="Min ID"
        className="w-28"
        onChange={(event) => {
          const rawValue = event.target.value;
          const nextFilters = { ...currentFilters };

          if (!rawValue) {
            delete nextFilters.minId;
          } else {
            nextFilters.minId = Number(rawValue);
          }

          setPartial({
            filters: nextFilters,
            pageNumber: 1,
          });
        }}
        disabled={isLoading}
      />
    </>
  );
}

function UsersPage() {
  const { query, setQuery, queryOptions } =
    useListQueryParams<UserListQueryParams>({
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
          renderFilters={(context) => <UserTableFilters {...context} />}
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
