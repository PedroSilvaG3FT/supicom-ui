"use client";

import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetFooter,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/_core/components/fragments/sheet";

import { z } from "zod";
import Show from "../app-show";
import Each from "../app-each";
import { useForm } from "react-hook-form";
import AppEmptyList from "../app-empty-list";
import { useTranslations } from "next-intl";
import SelectProducts from "../select-products";
import { ToastUtil } from "../../utils/toast.util";
import { ArrayUtil } from "../../utils/array.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadingStore } from "@/_store/loading.store";
import { EQuoteStatus } from "../../enums/quote.enum";
import { Plus, SquareChartGantt, X } from "lucide-react";
import { IQuoteDB } from "../../interface/quote.interface";
import { Button } from "@/_core/components/fragments/button";
import { ReactNode, useEffect, useRef, useState } from "react";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import AppFormTextarea from "@/_shared/components/form/form-textarea";
import { QuoteService } from "@/_core/firebase/services/quote.service";

const formSchema = z.object({
  observation: z.string(),
  name: z.string().min(1, ""),
  email: z.string().min(1, ""),
  phoneNumber: z.string().min(1, ""),
});

interface IFormData extends z.infer<typeof formSchema> {}

interface IProps {
  children: ReactNode;
  isPortalMode?: boolean;
  onCreated?: () => void;
  initialProductsSlug?: string[];
}

const _quoteService = new QuoteService();

export function RequestQuoteSheet(props: IProps) {
  const {
    children,
    onCreated,
    initialProductsSlug,
    isPortalMode = true,
  } = props;

  const t = useTranslations();
  const _loadingStore = loadingStore((state) => state);

  const closeRef = useRef<HTMLButtonElement>(null);

  const [products, setProducts] = useState<string[]>([]);

  const descriptions = {
    submitButton: isPortalMode ? t("base.send") : "Salvar",
    title: isPortalMode ? t("portal.request_quote.title") : "Criar cotação",
    subtitle: isPortalMode
      ? t("portal.request_quote.subtitle")
      : "Insira os dados da cotação",
  };

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      observation: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (initialProductsSlug) {
      setProducts(initialProductsSlug);
      console.log("INITIAL PRODUCTS :", initialProductsSlug);
    }
  }, []);

  function onSubmit(values: IFormData) {
    _loadingStore.setShow(true);

    const productsSlug = products.filter((item) => !!item);
    const registerDTO = _quoteService._model.buildRegisterDTO({
      id: "",
      products: [],
      productsSlug,
      updateDate: new Date(),
      creationDate: new Date(),
      status: EQuoteStatus.CREATED,
      observation: values.observation,
      customer: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
    });

    _quoteService
      .create<IQuoteDB>(registerDTO)
      .then(() => {
        onCreated?.();
        closeRef.current?.click();
        ToastUtil.success("Cotação criada com sucesso!");

        form.reset();
        setProducts([]);

        _loadingStore.setShow(false);
      })
      .catch(() => {
        ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
        _loadingStore.setShow(false);
      });
  }

  const handleAddProduct = () => setProducts([...products, ""]);
  const handleRemoveProduct = (index: number) =>
    setProducts(ArrayUtil.removeByIndex(products, index));

  const handleUpdate = (data: string, index: number) => {
    const updated = [...products];
    updated[index] = data;
    setProducts(updated);
  };

  const isSubmitDisabled = () => {
    const hasProduct = products.some((product) => product.trim() !== "");
    return !form.formState.isValid || !hasProduct;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-secondary mobile:w-screen">
        <SheetHeader>
          <SheetTitle>{descriptions.title}</SheetTitle>
          <SheetDescription>{descriptions.subtitle}</SheetDescription>
        </SheetHeader>

        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex flex-col mt-8 h-[86svh]"
          >
            <section className="pb-14 h-full space-y-4 overflow-y-auto">
              <Show>
                <Show.When condition={!isPortalMode}>
                  <h5 className="font-semibold">Dados do cliente</h5>
                </Show.When>
              </Show>

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

              <h5 className="font-semibold flex items-center justify-between">
                Produtos
                <Button type="button" size="icon" onClick={handleAddProduct}>
                  <Plus />
                </Button>
              </h5>

              <Each
                data={products}
                empty={
                  <AppEmptyList
                    icon={SquareChartGantt}
                    message="Adicione produtos a cotação"
                  />
                }
                render={(item, index) => (
                  <article className="flex gap-4 items-center">
                    <SelectProducts
                      value={item}
                      className="flex-1"
                      onChange={(data) => handleUpdate(data, index)}
                    />

                    <Button
                      size="icon"
                      type="button"
                      variant={"destructive"}
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <X />
                    </Button>
                  </article>
                )}
              />
            </section>

            <SheetFooter className="w-full py-2 mt-auto sticky bottom-0 bg-background">
              <Button disabled={isSubmitDisabled()} className="w-full">
                {descriptions.submitButton}
              </Button>
            </SheetFooter>
          </form>
        </FormContainer>

        <SheetClose ref={closeRef} className="hidden" />
      </SheetContent>
    </Sheet>
  );
}