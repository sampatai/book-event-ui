import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  type ColumnDef,
  type SortingState,
  type Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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
import { cn } from "@/lib/utils";

type QueryPatch<TQuery extends ListQueryParams> =
  | Partial<ListQueryParams>
  | Partial<TQuery>;

export interface DataTableProps<
  TData,
  TValue,
  TQuery extends ListQueryParams = ListQueryParams,
> {
  columns: ColumnDef<TData, TValue>[];
  listData?: ListBase<TData>;
  query: TQuery;
  onQueryChange: (query: TQuery) => void;
  renderFilters?: (context: {
    query: TQuery;
    setPartial: (patch: QueryPatch<TQuery>) => void;
    isLoading: boolean;
  }) => React.ReactNode;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enablePageSize?: boolean;
  enablePagination?: boolean;
  enableClearSorting?: boolean;
}

const defaultPageSizeOptions = [10, 20, 50, 100];

export function DataTable<
  TData,
  TValue,
  TQuery extends ListQueryParams = ListQueryParams,
>({
  columns,
  listData,
  query,
  onQueryChange,
  renderFilters,
  pageSizeOptions = defaultPageSizeOptions,
  isLoading = false,
  emptyText = "No results.",
  searchPlaceholder = "Search...",
  enableSearch = true,
  enablePageSize = true,
  enablePagination = true,
  enableClearSorting = true,
}: DataTableProps<TData, TValue, TQuery>) {
  const records = listData?.records ?? [];
  const totalRecords = listData?.totalRecords ?? 0;
  const [searchInput, setSearchInput] = useState(query.search ?? "");

  const pageNumber = query.pageNumber ?? 1;
  const pageSize = query.pageSize ?? pageSizeOptions[0] ?? 10;

  const sortingState: SortingState = query.sortBy
    ? [{ id: query.sortBy, desc: query.sortDirection === "desc" }]
    : [];

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const canGoPrevious = pageNumber > 1;
  const canGoNext = pageNumber < totalPages;
  const hasSorting = Boolean(query.sortBy);

  const setPartial = (patch: QueryPatch<TQuery>) => {
    onQueryChange({ ...query, ...patch } as TQuery);
  };

  const debouncedSearchChange = useDebouncedCallback(
    (nextSearch: string, currentQuery: TQuery) => {
      onQueryChange({ ...currentQuery, search: nextSearch, pageNumber: 1 });
    },
    400,
  );

  useEffect(() => {
    setSearchInput(query.search ?? "");
  }, [query.search]);

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
    onSortingChange: (updater: Updater<SortingState>) => {
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
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-full">
        {enableSearch && (
          <div className="flex-1 w-full min-w-0 md:pr-4">
            <Input
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={(event) => {
                const nextSearch = event.target.value;
                setSearchInput(nextSearch);

                if (!enableSearch) {
                  return;
                }

                if (nextSearch === (query.search ?? "")) {
                  return;
                }

                debouncedSearchChange(nextSearch, query);
              }}
              className="w-full"
              disabled={isLoading}
            />
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {renderFilters?.({ query, setPartial, isLoading })}

          {enableClearSorting ? (
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                setPartial({
                  sortBy: undefined,
                  sortDirection: undefined,
                  pageNumber: 1,
                })
              }
              disabled={isLoading || !hasSorting}
            >
              Clear sorting
            </Button>
          ) : null}

          {enablePageSize ? (
            <Select
              value={String(pageSize)}
              onValueChange={(value) =>
                setPartial({ pageSize: Number(value), pageNumber: 1 })
              }
              disabled={isLoading}
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

      <div className="rounded-md border border-border overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border border-border p-2 align-middle"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className={cn(
                          "flex group w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                          header.column.getCanSort()
                            ? "hover:bg-muted hover:text-accent-foreground cursor-pointer"
                            : "cursor-default cursor-auto text-muted-foreground",
                          header.column.getIsSorted() &&
                            "bg-accent/50 text-accent-foreground font-semibold shadow-sm",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort() || isLoading}
                      >
                        <span className="truncate text-left flex-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <span className="flex items-center shrink-0 ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="size-3.5" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="size-3.5" />
                            ) : (
                              <ArrowUpDown className="size-3.5 opacity-40 group-hover:opacity-100" />
                            )}
                          </span>
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
                  className="h-24 text-center border border-border"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border border-border p-4 align-middle"
                    >
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
                  className="h-24 text-center border border-border text-muted-foreground"
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
              disabled={isLoading || !canGoPrevious}
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
              disabled={isLoading}
            />

            <Button
              variant="outline"
              onClick={() => setPartial({ pageNumber: pageNumber + 1 })}
              disabled={isLoading || !canGoNext}
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
