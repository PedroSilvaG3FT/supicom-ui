import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/_core/components/fragments/dialog";

import Image from "next/image";
import { ReactNode } from "react";
import Each from "@/_shared/components/app-each";
import { IPortalDepartamentCardProps } from "./portal-departament-card";

interface IProps {
  children: ReactNode;
  data: IPortalDepartamentCardProps;
}

export default function PortalDepartamentModal(props: IProps) {
  const { data, children } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-2xl mobile:text-sm">
        <DialogHeader>
          <DialogTitle className="text-left">{data.title}</DialogTitle>
        </DialogHeader>

        <section className="grid gap-4 py-4 overflow-y-auto max-h-[70dvh]">
          <p>{data.description}</p>

          <h5 className="font-medium">Confira o nosso espaço:</h5>
          <section className="grid gap-4 grid-cols-2 items-stretch mobile:grid-cols-1">
            <Each
              data={data.images}
              render={(item) => (
                <Image
                  src={item}
                  width={200}
                  height={150}
                  loading="lazy"
                  alt={data.title}
                  className="w-full rounded-md bg-black"
                />
              )}
            />
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
