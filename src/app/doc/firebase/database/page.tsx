"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { Separator } from "@/_core/components/fragments/separator";
import { ExampleService } from "@/_core/firebase/services/example.service";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";

import { CircleMinus, Eye, Pen, Plus } from "lucide-react";
import { Button } from "@/_core/components/fragments/button";

export interface ICollectionExample {
  id?: number | string;
  age: number;
  name: string;
  email: string;
}

const _exampleService = new ExampleService();

export default function DatabasePage() {
  const _loadingStore = loadingStore((state) => state);
  const [items, setItems] = useState<ICollectionExample[]>([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    _loadingStore.setShow(true);

    _exampleService
      .getAll<ICollectionExample[]>()
      .then((response) => setItems(response))
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const getById = (id: string) => {
    _loadingStore.setShow(true);

    _exampleService
      .getById<ICollectionExample>(id)
      .then((response) => ToastUtil.info(response.email))
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleCreate = () => {
    _loadingStore.setShow(true);

    const names = ["Alice", "Bob", "Charlie", "Diana", "Eva", "Frank", "Grace"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@example.com`;
    const randomAge = Math.floor(Math.random() * 100);

    _exampleService
      .create<ICollectionExample>({
        age: randomAge,
        name: randomName,
        email: randomEmail,
      })
      .then(() => getAll())
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleUpdate = (item: ICollectionExample) => {
    _loadingStore.setShow(true);

    const editRandom = Math.floor(Math.random() * 100);
    const currentName = item.name.split("-")[1] || item.name;

    const name = `(Edit ${editRandom}) - ${currentName}`;

    _exampleService
      .update<Partial<ICollectionExample>>(String(item.id), { name })
      .then(() => getAll())
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleDelete = (id: string) => {
    _exampleService
      .delete(id)
      .then(() => getAll())
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const columns: ColumnDef<ICollectionExample>[] = [
    {
      enableSorting: true,
      accessorKey: "name",
      header: ({ column }) => <DataTableHeader column={column} title="Name" />,
      cell: ({ row }) => row.original.name,
    },
    {
      enableSorting: true,
      accessorKey: "email",
      header: ({ column }) => <DataTableHeader column={column} title="Email" />,
      cell: ({ row }) => row.original.email,
    },
    {
      enableSorting: true,
      accessorKey: "age",
      header: ({ column }) => <DataTableHeader column={column} title="Age" />,
      cell: ({ row }) => row.original.age,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const itemId = String(row.original.id);

        return (
          <section className="flex gap-2 items-center justify-end">
            <Button
              size={"xs"}
              variant={"ghost"}
              onClick={() => getById(itemId)}
            >
              <Eye className="w-4 mr-2" />
              Detail
            </Button>

            <Button
              size={"xs"}
              variant={"ghost"}
              onClick={() => handleUpdate(row.original)}
            >
              <Pen className="w-4 mr-2" />
              Update
            </Button>

            <Button
              size={"xs"}
              variant={"ghost"}
              className="text-red-400"
              onClick={() => handleDelete(itemId)}
            >
              <CircleMinus className="w-4 mr-2" />
              Remove
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <section>
      <h1 className="page-title">Database</h1>
      <Separator className="my-4" />

      <nav className="flex justify-end">
        <Button className="mb-4" onClick={handleCreate}>
          Create Random
          <Plus className="ml-2" />
        </Button>
      </nav>

      <DataTable data={items} columns={columns} />
    </section>
  );
}
