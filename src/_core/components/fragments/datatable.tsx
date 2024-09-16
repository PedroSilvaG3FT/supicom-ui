"use client";

import {
  Column,
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "./table";

import { useState } from "react";
import { Button } from "@/_core/components/fragments/button";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface IDataTablePagination extends PaginationState {}

type PaginationUpdater = React.Dispatch<React.SetStateAction<PaginationState>>;

interface DataTableProps<TData, TValue> {
  data: TData[];
  totalItems?: number;
  noContentText?: string;
  pagination?: IDataTablePagination;
  columns: ColumnDef<TData, TValue>[];
  onPaginationChange?: PaginationUpdater;

  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    data,
    columns,
    totalItems = 0,
    onPaginationChange,
    noContentText = "Sem resultados",
    pagination = { totalItems: 0, pageIndex: 0, pageSize: 5 },
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onPaginationChange,
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalItems / pagination.pageSize),
  });

  return (
    <section>
      <article className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  {noContentText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </article>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}

interface IDataTableHeaderProps<Data> {
  title: string;
  column: Column<Data, unknown>;
}
export function DataTableHeader<IData>(props: IDataTableHeaderProps<IData>) {
  const { column, title } = props;
  const isSortMode = column?.columnDef?.enableSorting || false;

  const handleToggleSort = () => {
    if (!isSortMode) return;
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  return (
    <span className="flex items-center" onClick={handleToggleSort}>
      {title}
      {isSortMode && (
        <Button variant="ghost" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )}
    </span>
  );
}
