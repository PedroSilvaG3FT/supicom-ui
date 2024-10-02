import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/_core/components/fragments/sheet";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ReceiptText } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import QuoteBadgeStatus from "./quote-badge-status";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { IDrawerProps } from "@/_core/components/fragments/drawer";
import { QuoteService } from "@/_core/firebase/services/quote.service";
import { IQuoteDB, IQuoteItem } from "@/_shared/interface/quote.interface";

interface IProps extends IDrawerProps {
  data: IQuoteItem;
  onUpdated?: (data: IQuoteItem) => void;
}

const _quoteService = new QuoteService();

export default function QuoteDetailSheet(props: IProps) {
  const { isOpen, onOpenChange, onUpdated, data } = props;

  const customerData = [
    { title: `Nome`, text: data.customer?.name },
    { title: `e-mail`, text: data.customer?.email },
    { title: `Celular`, text: data.customer?.phoneNumber },
  ];

  const handleUpdateStatus = (status: EQuoteStatus) => {
    _quoteService
      .update<Partial<IQuoteDB>>(String(data.id), { status })
      .then(() => {
        data.status = status;
        onUpdated?.(data);
      });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-secondary mobile:w-screen">
        <SheetHeader className="mb-4">
          <section className="mb-2 flex items-center gap-2">
            <i className="bg-primary h-11 w-11 flex items-center justify-center rounded-lg">
              <ReceiptText className="h-5 w-5" />
            </i>

            <nav className="flex flex-col justify-center">
              <SheetTitle className="text-left truncate w-64">
                Cotação #{data.id}
              </SheetTitle>

              <SheetDescription className="text-left">
                {data?.creationDate && format(data?.creationDate, "dd/MM/yyyy")}
              </SheetDescription>
            </nav>
          </section>

          <h6>Marcar como:</h6>
          <nav className="grid gap-4 grid-cols-2">
            <Button
              size="xs"
              onClick={() => handleUpdateStatus(EQuoteStatus.SOLD)}
            >
              Vendido
            </Button>

            <Button
              size="xs"
              variant="destructive"
              onClick={() => handleUpdateStatus(EQuoteStatus.NOT_SOLD)}
            >
              Não vendido
            </Button>
          </nav>

          <Separator className="my-4" />
        </SheetHeader>

        <section
          className={cn(
            `w-full h-full max-h-[84dvh] pb-16 overflow-y-auto transition-all duration-500 scroll-smooth`
          )}
        >
          <h4 className="font-semibold my-4 flex items-center justify-between">
            Cliente
            <QuoteBadgeStatus status={data.status} />
          </h4>

          <Each
            data={customerData}
            render={(item) => (
              <div className="mb-2">
                <h5 className="font-semibold text-foreground/65">
                  {item.title}
                </h5>
                <p>{item.text}</p>
              </div>
            )}
          />

          <h4 className="font-semibold my-4">Observação</h4>
          <p>{data.observation}</p>

          <h4 className="font-semibold my-4">Produtos</h4>

          <section className="grid gap-2">
            <Each
              data={data.products}
              render={(item) => (
                <Link
                  target="_blank"
                  href={`/portal/produtos/${item.slug}`}
                  className="p-3 flex gap-4 items-center rounded-md bg-background shadow-md cursor-pointer transition-transform duration-500 hover:scale-95"
                >
                  <Image
                    width={200}
                    height={200}
                    alt={item.title}
                    src={item.bannerImage}
                    className="w-14 h-12 rounded-md object-contain object-center bg-black"
                  />
                  <h6 className="font-semibold text-sm">{item.title}</h6>
                </Link>
              )}
            />
          </section>
        </section>
      </SheetContent>
    </Sheet>
  );
}
