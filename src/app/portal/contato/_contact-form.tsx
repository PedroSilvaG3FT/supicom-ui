"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadingStore } from "@/_store/loading.store";
import { Button } from "@/_core/components/fragments/button";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import { Separator } from "@/_core/components/fragments/separator";
import AppFormTextarea from "@/_shared/components/form/form-textarea";
import { ContactService } from "@/_core/firebase/services/contact.service";
import { IContactDB } from "@/_shared/interface/contact.interface";
import { ToastUtil } from "@/_shared/utils/toast.util";

const formSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  email: z.string().min(1, "Campo obrigatório"),
  phoneNumber: z.string().min(1, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório"),
});

interface IFormData extends z.infer<typeof formSchema> {}

const _contactService = new ContactService();

export default function ContactForm() {
  const t = useTranslations();
  const _loadingStore = loadingStore((state) => state);

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      description: "",
    },
  });

  function onSubmit(values: IFormData) {
    _loadingStore.setShow(true);
    const modelDTO = _contactService._model.buildRegisterDTO({
      id: "",
      status: "",
      name: values.name,
      email: values.email,
      description: values.description,
      phoneNumber: values.phoneNumber,

      updateDate: new Date(),
      creationDate: new Date(),
    });

    _contactService
      .create<IContactDB>(modelDTO)
      .then(() => {
        form.reset();
        ToastUtil.success("Contato enviado com sucesso!");

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  }

  return (
    <FormContainer {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-3xl p-5 px-8 shadow-md bg-background lg:scale-90"
      >
        <h4 className="font-semibold">{t("portal.contact.form.title")}</h4>

        <small className="text-foreground/60">
          {t("portal.contact.form.subtitle")}
        </small>

        <Separator className="my-4" />

        <AppFormInput
          required
          name="name"
          label={t("base.name")}
          control={form.control}
        />

        <section className="my-2 w-full grid gap-4 grid-cols-1">
          <AppFormInput
            required
            type="email"
            name="email"
            label="e-mail"
            control={form.control}
          />

          <AppFormInput
            required
            name="phoneNumber"
            control={form.control}
            label={t("base.smart_phone")}
          />
        </section>

        <AppFormTextarea
          required
          name="description"
          control={form.control}
          label={t("base.description")}
        />

        <Button disabled={!form.formState.isValid} className="w-full mt-8">
          {t("base.send")}
        </Button>
      </form>
    </FormContainer>
  );
}
