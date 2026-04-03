import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ListBase, ListQueryParams } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  listData?: ListBase<TData>;
  query: ListQueryParams;
  onQueryChange: (query: ListQueryParams) => void;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enablePageSize?: boolean;
  enablePagination?: boolean;
}

const defaultPageSizeOptions = [10, 20, 50, 100];

export function DataTable<TData, TValue>({
  columns,
  listData,
  query,
  onQueryChange,
  pageSizeOptions = defaultPageSizeOptions,
  isLoading = false,
  emptyText = "No results.",
  searchPlaceholder = "Search...",
  enableSearch = true,
  enablePageSize = true,
  enablePagination = true,
}: DataTableProps<TData, TValue>) {
  const records = listData?.records ?? [];
  const totalRecords = listData?.totalRecords ?? 0;

  const pageNumber = query.pageNumber ?? 1;
  const pageSize = query.pageSize ?? pageSizeOptions[0] ?? 10;
  const enabled = query.enabled ?? true;

  const sortingState: SortingState = query.sortBy
    ? [{ id: query.sortBy, desc: query.sortDirection === "desc" }]
    : [];

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const canGoPrevious = pageNumber > 1;
  const canGoNext = pageNumber < totalPages;

  const setPartial = (patch: Partial<ListQueryParams>) => {
    onQueryChange({ ...query, ...patch });
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingState,
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sortingState) : updater;
      const first = nextSorting[0];
      if (!first) {
        setPartial({
          sortBy: undefined,
          sortDirection: undefined,
          pageNumber: 1,
        });
        return;
      }

      setPartial({
        sortBy: first.id,
        sortDirection: first.desc ? "desc" : "asc",
        pageNumber: 1,
      });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {enableSearch ? (
          <Input
            placeholder={searchPlaceholder}
            value={query.search ?? ""}
            onChange={(event) =>
              setPartial({ search: event.target.value, pageNumber: 1 })
            }
            className="w-full md:max-w-sm"
            disabled={isLoading || !enabled}
          />
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <Button
            variant={enabled ? "outline" : "secondary"}
            onClick={() => setPartial({ enabled: !enabled })}
            disabled={isLoading}
          >
            {enabled ? "Query Enabled" : "Query Disabled"}
          </Button>

          {enablePageSize ? (
            <Select
              value={String(pageSize)}
              onValueChange={(value) =>
                setPartial({ pageSize: Number(value), pageNumber: 1 })
              }
              disabled={isLoading || !enabled}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Page size" />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className={
                          header.column.getCanSort()
                            ? "inline-flex items-center gap-1"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={
                          !header.column.getCanSort() || isLoading || !enabled
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination ? (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-muted-foreground text-sm">
            Page {pageNumber} of {totalPages} • Total {totalRecords}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setPartial({ pageNumber: Math.max(1, pageNumber - 1) })
              }
              disabled={isLoading || !enabled || !canGoPrevious}
            >
              <ChevronLeft className="mr-1 size-4" />
              Prev
            </Button>

            <Input
              type="number"
              min={1}
              max={totalPages}
              value={pageNumber}
              onChange={(event) => {
                const nextPage = Number(event.target.value);
                if (Number.isNaN(nextPage) || nextPage < 1) {
                  return;
                }
                setPartial({ pageNumber: Math.min(nextPage, totalPages) });
              }}
              className="w-24 text-center"
              disabled={isLoading || !enabled}
            />

            <Button
              variant="outline"
              onClick={() => setPartial({ pageNumber: pageNumber + 1 })}
              disabled={isLoading || !enabled || !canGoNext}
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
