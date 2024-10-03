"use client";

import { format } from "date-fns";
import { Eye, Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { QuoteService } from "@/_core/firebase/services/quote.service";
import SelectMonth from "@/_shared/components/form/select/select-month";
import { usePagination } from "@/_core/components/hooks/pagination.hook";
import { IQuoteDB, IQuoteItem } from "@/_shared/interface/quote.interface";
import QuoteBadgeStatus from "@/_shared/components/quote/quote-badge-status";
import { RequestQuoteSheet } from "@/_shared/components/quote/sheet-request-quote";
import QuoteDetailSheet from "../../../_shared/components/quote/sheet-quote-detail";
import SelectQuoteStatus from "@/_shared/components/form/select/select-quote-status";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";
import {
  orderBy,
  QueryConstraint,
  QueryFieldFilterConstraint,
} from "firebase/firestore";

const _quoteService = new QuoteService();

export default function QuotePage() {
  const _loadingStore = loadingStore((state) => state);
  const [items, setItems] = useState<IQuoteItem[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState({} as IQuoteItem);
  const [filter, setFilter] = useState({
    month: "",
    status: "",
  });

  const pagination = usePagination({ pageIndex: 0, pageSize: 10 });

  const pageFilterItems = [...items].filter((item) => {
    const itemDate = new Date(item.creationDate);
    const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");

    const isMonthMatch =
      filter.month === "" ||
      filter.month === "all" ||
      itemMonth === filter.month;

    const isStatusMatch =
      filter.status === "" ||
      filter.status === "all" ||
      item.status === filter.status;

    return isMonthMatch && isStatusMatch;
  });

  const filteredItems = pagination.filter(pageFilterItems);

  const getItems = () => {
    _loadingStore.setShow(true);

    const constraints: QueryConstraint[] = [orderBy("creationDate", "desc")];

    _quoteService
      .getAll<IQuoteDB[]>(constraints)
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

  const handleFilterChanged = (value: string, key: keyof typeof filter) => {
    setFilter((prevContent) => ({
      ...prevContent,
      [key]: value,
    }));
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
      accessorKey: "customer.email",
      header: ({ column }) => (
        <DataTableHeader column={column} title="e-mail" />
      ),
      cell: ({ row }) => row.original.customer.email,
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
        <nav className="flex gap-4 items-center mobile:flex-col">
          <h4 className="mr-auto">Cotações</h4>

          <RequestQuoteSheet isPortalMode={false} onCreated={() => getItems()}>
            <Button className="mobile:w-full">
              Nova cotação
              <Plus className="ml-4" />
            </Button>
          </RequestQuoteSheet>

          <Button
            variant="blue"
            className="mobile:w-full"
            onClick={() => getItems()}
          >
            <RotateCcw />
          </Button>
        </nav>

        <Separator className="my-4" />

        <section className="mb-8 flex gap-4 items-end justify-end mobile:flex-col">
          <SelectMonth
            label="Mês"
            value={filter.month}
            className="w-60 mobile:w-full"
            onChange={(data) => handleFilterChanged(data, "month")}
          />

          <SelectQuoteStatus
            label="Status"
            value={filter.status}
            className="w-60 mobile:w-full"
            onChange={(data) => handleFilterChanged(data, "status")}
          />
        </section>

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
