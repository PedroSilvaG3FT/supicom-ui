"use client";

import { format } from "date-fns";
import { Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { QuoteService } from "@/_core/firebase/services/quote.service";
import { usePagination } from "@/_core/components/hooks/pagination.hook";
import { IQuoteDB, IQuoteItem } from "@/_shared/interface/quote.interface";
import QuoteBadgeStatus from "@/_shared/components/quote/quote-badge-status";
import QuoteDetailSheet from "../../../_shared/components/quote/sheet-quote-detail";
import { RequestQuoteSheet } from "@/_shared/components/quote/sheet-request-quote";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";

const _quoteService = new QuoteService();

export default function QuotePage() {
  const _loadingStore = loadingStore((state) => state);
  const [items, setItems] = useState<IQuoteItem[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState({} as IQuoteItem);

  const pagination = usePagination({ pageIndex: 0, pageSize: 5 });

  const filteredItems = pagination.filter(items);

  const getItems = () => {
    _loadingStore.setShow(true);

    _quoteService
      .getAll<IQuoteDB[]>()
      .then((response) => {
        const data = _quoteService._model.buildList(response);

        setItems(data);
        pagination.setTotalItems(data.length);

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  };

  const handleOpenDetail = (data: IQuoteItem) => {
    setDetailData(data);
    setIsDetailOpen(true);

    if (data.status === EQuoteStatus.CREATED) {
      _quoteService
        .update<Partial<IQuoteDB>>(String(data.id), {
          status: EQuoteStatus.VIEWED,
        })
        .then(() => (data.status = EQuoteStatus.VIEWED));
    }
  };

  const onUpdated = (updatedData: IQuoteItem) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );

    setDetailData((prevData) => ({ ...prevData, ...updatedData }));
  };

  useEffect(() => {
    getItems();
  }, []);

  const columns: ColumnDef<IQuoteItem>[] = [
    {
      accessorKey: "customer.name",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Cliente" />
      ),
      cell: ({ row }) => row.original.customer.name,
    },
    {
      accessorKey: "customer.phoneNumber",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Celular" />
      ),
      cell: ({ row }) => row.original.customer.phoneNumber,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <QuoteBadgeStatus status={row.original.status} />,
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
          <h4>Cotações</h4>

          <RequestQuoteSheet isPortalMode={false} onCreated={() => getItems()}>
            <Button>
              Nova cotação
              <Plus className="ml-4" />
            </Button>
          </RequestQuoteSheet>
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

      <QuoteDetailSheet
        data={detailData}
        isOpen={isDetailOpen}
        onUpdated={onUpdated}
        onOpenChange={(data) => setIsDetailOpen(data)}
      />
    </>
  );
}
