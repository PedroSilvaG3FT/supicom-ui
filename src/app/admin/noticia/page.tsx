"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { ArrayUtil } from "@/_shared/utils/array.util";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";
import { usePagination } from "@/_core/components/hooks/pagination.hook";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";

const _newsService = new NewsService();

export default function NewsPage() {
  const _loadingStore = loadingStore((state) => state);
  const [items, setItems] = useState<INewsItem[]>([]);

  const pagination = usePagination({ pageIndex: 0, pageSize: 5 });
  const filteredItems = pagination.filter(items);

  const getItems = () => {
    _loadingStore.setShow(true);

    _newsService
      .getAll<INewsDB[]>()
      .then((response) => {
        const data = _newsService._model.buildList(response);

        setItems(data);
        pagination.setTotalItems(data.length);

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  };

  const handleDelete = (id: string, index: number) => {
    _loadingStore.setShow(true);

    _newsService
      .delete(id)
      .then(() => {
        setItems(ArrayUtil.removeByIndex(items, index));
        ToastUtil.success("Item removido com sucesso");

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const columns: ColumnDef<INewsItem>[] = [
    {
      accessorKey: "author",
      header: ({ column }) => <DataTableHeader column={column} title="Autor" />,
      cell: ({ row }) => row.original.author,
    },
    {
      accessorKey: "title.pt",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Titulo" />
      ),
      cell: ({ row }) => row.original.title.pt,
    },
    {
      accessorKey: "createdDate",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Data Criação" />
      ),
      cell: ({ row }) =>
        format(new Date(row.original.creationDate), "dd/MM/yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <section className="flex gap-2 items-center justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDelete(String(row.original.id), row.index)}
            >
              <Trash2 className="text-red-400" />
            </Button>

            <Button size="icon" variant="ghost" asChild>
              <Link href={`/admin/noticia/cadastro/${row.original.id}`}>
                <Eye />
              </Link>
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <section>
      <nav className="flex items-center justify-between">
        <h4>Notícias</h4>

        <Button asChild>
          <Link href="/admin/noticia/cadastro">
            Nova notícia
            <Plus className="ml-4" />
          </Link>
        </Button>
      </nav>

      <Separator className="my-4" />

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination={pagination.state}
        totalItems={pagination.totalItems}
        onPaginationChange={pagination.onPaginationChange}
      />
    </section>
  );
}
