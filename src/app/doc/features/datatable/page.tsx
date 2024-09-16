"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Separator } from "@/_core/components/fragments/separator";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";
import Link from "next/link";
import { LinkPreview } from "@/_core/components/fragments/ui/link-preview";

interface IExampleDataTable {
  id: number;
  date: string;
  title: string | Date;
}

const _buildItem = (index: number): IExampleDataTable => ({
  id: index + 1,
  date: new Date().toISOString(),
  title: `Example Item ${index + 1}`,
});

export default function DatatablePage() {
  const items = Array.from({ length: 5 }).map((_, index) => _buildItem(index));

  const columns: ColumnDef<IExampleDataTable>[] = [
    {
      enableSorting: true,
      accessorKey: "id",
      header: ({ column }) => <DataTableHeader column={column} title="#" />,
      cell: ({ row }) => row.original.id,
    },
    {
      enableSorting: true,
      accessorKey: "title",
      header: ({ column }) => <DataTableHeader column={column} title="Title" />,
      cell: ({ row }) => row.original.title,
    },
    {
      enableSorting: true,
      accessorKey: "createdDate",
      header: ({ column }) => <DataTableHeader column={column} title="Data" />,
      cell: ({ row }) => format(new Date(row.original.date), "dd/MM/yyyy"),
    },
  ];

  return (
    <section>
      <h1 className="page-title">Datatable</h1>
      <Separator className="my-4" />

      <p className="mb-4">
        Work with data tables in a simplified way, leveraging native features
        and Shadcn/Ui such as sorting and pagination, in addition to freely
        customizing columns.
      </p>

      <LinkPreview
        url="https://ui.shadcn.com/docs/components/data-table"
        className="font-semibold underline"
      >
        Complete guide
      </LinkPreview>

      <h5 className="mt-4 font-semibold">Example:</h5>
      <DataTable data={items} columns={columns} />
    </section>
  );
}
