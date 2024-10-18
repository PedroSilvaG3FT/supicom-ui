"use client";

import { format } from "date-fns";
import { Eye, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { usePagination } from "@/_core/components/hooks/pagination.hook";
import { ContactService } from "@/_core/firebase/services/contact.service";
import {
  IContactDB,
  IContactItem,
} from "@/_shared/interface/contact.interface";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";
import SheetContactDetail from "@/_shared/components/contact/sheet-contact-detail";
import Link from "next/link";

const _contactService = new ContactService();

export default function ContactPage() {
  const _loadingStore = loadingStore((state) => state);
  const [items, setItems] = useState<IContactItem[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState({} as IContactItem);

  const pagination = usePagination({ pageIndex: 0, pageSize: 5 });
  const filteredItems = pagination.filter(items);

  const getItems = () => {
    _loadingStore.setShow(true);

    _contactService
      .getAll<IContactDB[]>()
      .then((response) => {
        const data = _contactService._model.buildList(response);

        setItems(data);
        pagination.setTotalItems(data.length);

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  };

  const handleOpenDetail = (data: IContactItem) => {
    setDetailData(data);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    getItems();
  }, []);

  const columns: ColumnDef<IContactItem>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Cliente" />
      ),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Celular" />
      ),
      cell: ({ row }) => {
        const data = row.original.phoneNumber;

        return (
          <Link
            href={`tel:${data}`}
            className="hover:underline flex gap-2.5 items-center"
          >
            {data}
            <Phone className="w-4 h-4" />
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableHeader column={column} title="e-mail" />
      ),
      cell: ({ row }) => {
        const data = row.original.email;

        return (
          <Link
            href={`mailto:${data}`}
            className="hover:underline flex gap-2.5 items-center"
          >
            {data}
            <Mail className="w-4 h-4" />
          </Link>
        );
      },
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
          <section className="flex items-center justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleOpenDetail(row.original)}
            >
              <Eye />
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <>
      <section>
        <nav className="flex items-center justify-between">
          <h4>Solicitações de contato</h4>
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

      <SheetContactDetail
        data={detailData}
        isOpen={isDetailOpen}
        onOpenChange={(data) => setIsDetailOpen(data)}
      />
    </>
  );
}
