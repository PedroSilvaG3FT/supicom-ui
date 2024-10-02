"use client";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/_core/components/fragments/sheet";

import { z } from "zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import AppFormTextarea from "@/_shared/components/form/form-textarea";

const formSchema = z.object({
  obervation: z.string(),
  name: z.string().min(1, "Required field"),
  email: z.string().min(1, "Required field"),
  phoneNumber: z.string().min(1, "Required field"),
});

interface IFormData extends z.infer<typeof formSchema> {}

interface IProps {
  children: ReactNode;
}

export function RequestQuoteSheet(props: IProps) {
  const { children } = props;
  const t = useTranslations();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      obervation: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: IFormData) {
    console.log("[request quote submit]: ", values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("portal.request_quote.title")}</SheetTitle>
          <SheetDescription>
            {t("portal.request_quote.subtitle")}
          </SheetDescription>
        </SheetHeader>

        <FormContainer {...form}>
          <form
            className="space-y-4 mt-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="name"
              label={t("base.name")}
              control={form.control}
            />

            <AppFormInput
              type="email"
              name="email"
              label="e-mail"
              control={form.control}
            />

            <AppFormInput
              name="phoneNumber"
              control={form.control}
              label={t("base.smart_phone")}
            />

            <AppFormTextarea
              name="observation"
              control={form.control}
              label={t("base.observation")}
            />

            <Button className="mt-5 w-full">{t("base.send")}</Button>
          </form>
        </FormContainer>
      </SheetContent>
    </Sheet>
  );
}
