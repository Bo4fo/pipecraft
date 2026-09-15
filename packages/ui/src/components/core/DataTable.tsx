import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "./Skeleton";

export interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  loadingRows?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T>({
  data,
  columns,
  getRowId,
  onRowClick,
  loading = false,
  loadingRows = 5,
  emptyTitle = "No results",
  emptyDescription = "There's nothing to show yet.",
  className,
}: DataTableProps<T>) {
  const [sortId, setSortId] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const toggleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;
    if (sortId !== column.id) {
      setSortId(column.id);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortId(null);
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortId || !sortDirection) return data;
    const column = columns.find((c) => c.id === sortId);
    if (!column?.sortValue) return data;
    const sorted = [...data].sort((a, b) => {
      const av = column.sortValue!(a);
      const bv = column.sortValue!(b);
      if (av < bv) return sortDirection === "asc" ? -1 : 1;
      if (av > bv) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortId, sortDirection, columns]);

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className={cn(column.sortable && "cursor-pointer select-none", column.headerClassName)}
              onClick={() => toggleSort(column)}
            >
              <span className="inline-flex items-center gap-1">
                {column.header}
                {column.sortable &&
                  (sortId === column.id ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )
                  ) : (
                    <ChevronsUpDown className="size-3 opacity-40" />
                  ))}
              </span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: loadingRows }).map((_, i) => (
            <TableRow key={`skeleton-${i}`}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton className="h-4 w-full max-w-[10rem]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        {!loading && sortedData.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10">
              <EmptyState title={emptyTitle} description={emptyDescription} />
            </TableCell>
          </TableRow>
        )}
        {!loading &&
          sortedData.map((row) => (
            <TableRow
              key={getRowId(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {columns.map((column) => (
                <TableCell key={column.id} className={column.className}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
