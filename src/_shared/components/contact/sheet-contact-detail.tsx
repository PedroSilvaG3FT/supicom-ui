import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/_core/components/fragments/sheet";

import { format } from "date-fns";
import { ReceiptText } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import { Separator } from "@/_core/components/fragments/separator";
import { IDrawerProps } from "@/_core/components/fragments/drawer";
import { IContactItem } from "@/_shared/interface/contact.interface";

interface IProps extends IDrawerProps {
  data: IContactItem;
}

export default function SheetContactDetail(props: IProps) {
  const { isOpen, onOpenChange, data } = props;

  const customerData = [
    { title: `Nome`, text: data?.name },
    { title: `e-mail`, text: data?.email },
    { title: `Celular`, text: data?.phoneNumber },
  ];

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
                Contato
              </SheetTitle>

              <SheetDescription className="text-left">
                #{data.id}
              </SheetDescription>
            </nav>
          </section>

          <div className="mb-2 text-sm flex gap-2 items-center">
            <h5 className="font-semibold text-foreground/65">
              Data de solicitação
            </h5>
            <p>
              {data?.creationDate && format(data?.creationDate, "dd/MM/yyyy")}
            </p>
          </div>

          <Separator className="my-4" />
        </SheetHeader>

        <section
          className={cn(
            `w-full h-full max-h-[84dvh] pb-16 overflow-y-auto transition-all duration-500 scroll-smooth`
          )}
        >
          <h4 className="font-semibold my-4">Cliente</h4>

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

          <h4 className="font-semibold my-4">Descrição</h4>
          <p>{data.description}</p>
        </section>
      </SheetContent>
    </Sheet>
  );
}
