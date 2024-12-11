"use client";

import { z } from "zod";
import { Save, X } from "lucide-react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocaleShorted } from "@/_shared/enums/locale.enum";
import { Button } from "@/_core/components/fragments/button";
import { INewsItem } from "@/_shared/interface/news.interface";
import AppImageCrop from "@/_shared/components/app-image-crop";
import AppFormInput from "@/_shared/components/form/form-input";
import { FormContainer } from "@/_core/components/fragments/form";
import AppFormSwitch from "@/_shared/components/form/form-switch";
import { Separator } from "@/_core/components/fragments/separator";
import { IBaseLocaleDB } from "@/_shared/interface/locale.interface";
import { FileUpload } from "@/_core/components/fragments/ui/file-upload";
import Each from "@/_shared/components/app-each";
import Image from "next/image";

const formSchema = z.object({
  active: z.boolean(),
  author: z.string().min(1, ""),
  titlePT: z.string().min(1, ""),
  titleES: z.string().min(1, ""),
  titleEN: z.string().min(1, ""),
});

interface IFormData extends z.infer<typeof formSchema> {}

interface IProps {
  initialData?: INewsItem;
  onSubmit: (data: INewsItem, file?: Blob, galleryFiles?: Blob[]) => void;
}

export default function NewsRegisterForm(props: IProps) {
  const { onSubmit, initialData } = props;

  const [bannerImage, setBannerFile] = useState<Blob | undefined>(undefined);
  const [galleryImages, setGalleryImages] = useState<Blob[]>([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>(
    []
  );
  const [content, setContent] = useState<IBaseLocaleDB>({
    pt: "",
    en: "",
    es: "",
  });

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      titlePT: "",
      titleES: "",
      titleEN: "",
      active: true,
    },
  });

  const handleContentChange = (value: string, locale: LocaleShorted) => {
    setContent((prevContent) => ({
      ...prevContent,
      [locale]: value,
    }));
  };

  function onLocalSubmit(values: IFormData) {
    onSubmit(
      {
        content,
        title: {
          pt: values.titlePT,
          en: values.titleEN,
          es: values.titleES,
        },
        author: values.author,
        active: values.active,
        updateDate: new Date(),
        creationDate: new Date(),
        id: initialData?.id ?? "",
        imagesURL: existingGalleryImages,
        imageBannerURL: initialData?.imageBannerURL ?? "",
      },
      bannerImage,
      galleryImages
    );
  }

  const handleInit = () => {
    form.setValue("active", !!initialData?.active);
    form.setValue("author", initialData?.author || "");
    form.setValue("titlePT", initialData?.title.pt || "");
    form.setValue("titleEN", initialData?.title.en || "");
    form.setValue("titleES", initialData?.title.es || "");

    setContent((prevContent) => ({
      pt: initialData?.content?.pt || prevContent.pt || "",
      en: initialData?.content?.en || prevContent.en || "",
      es: initialData?.content?.es || prevContent.es || "",
    }));

    if (initialData?.imagesURL) {
      setExistingGalleryImages(initialData.imagesURL);
    }

    form.setFocus("author");
  };

  useEffect(() => {
    if (Object.keys(initialData ?? {}).length) handleInit();
  }, [initialData]);

  const isDisabledSubmit = () => {
    const isImageValid = initialData
      ? !!initialData.imageBannerURL
      : !!bannerImage;

    const isContentValid = Object.entries(content).every(
      ([_, value]) => !!value
    );

    return !form.formState.isValid || !isImageValid || !isContentValid;
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FormContainer {...form}>
      <form className="pb-24" onSubmit={form.handleSubmit(onLocalSubmit)}>
        <nav className="flex justify-end mobile:mb-4">
          <Button
            type="submit"
            className="mobile:w-full"
            disabled={isDisabledSubmit()}
          >
            Salvar
            <Save className="ml-4 h-5 w-5" />
          </Button>
        </nav>

        <section className="grid gap-6 items-end grid-cols-[1fr_40%] mobile:grid-cols-1">
          <section className="space-y-4">
            <section className="mb-4 w- grid gap-6 items-center grid-cols-[1fr_100px]">
              <AppFormInput
                name="author"
                label="Autor"
                control={form.control}
              />
              <AppFormSwitch
                name="active"
                label="Ativo"
                control={form.control}
                containerClassName="mt-8"
              />
            </section>

            <AppFormInput
              name="titlePT"
              control={form.control}
              label="Titulo (Português)"
            />

            <AppFormInput
              name="titleEN"
              control={form.control}
              label="Titulo (Inglês)"
            />

            <AppFormInput
              name="titleES"
              control={form.control}
              label="Titulo (Espanhol)"
            />
          </section>

          <AppImageCrop
            className="h-[296px]"
            config={{ aspect: 1.3 / 1 }}
            initialSrc={initialData?.imageBannerURL}
            onChange={(data) => setBannerFile(data)}
          />
        </section>

        <Separator className="my-4" />

        <section className="grid grid-cols-1 mobile:gap-24 tablet:gap-14 lg:grid-cols-3 lg:gap-4">
          <article>
            <h5 className="mb-2 text-sm font-medium">Conteúdo (Português)</h5>
            <ReactQuill
              theme="snow"
              className="h-52"
              value={content.pt}
              onChange={(data) => handleContentChange(data, "pt")}
            />
          </article>

          <article>
            <h5 className="mb-2 text-sm font-medium">Conteúdo (Inglês)</h5>
            <ReactQuill
              theme="snow"
              className="h-52"
              value={content.en}
              onChange={(data) => handleContentChange(data, "en")}
            />
          </article>

          <article>
            <h5 className="mb-2 text-sm font-medium">Conteúdo (Espanhol)</h5>
            <ReactQuill
              theme="snow"
              className="h-52"
              value={content.es}
              onChange={(data) => handleContentChange(data, "es")}
            />
          </article>
        </section>

        <Separator className="mb-7 mt-24" />

        <section>
          <h5 className="mb-2 text-sm font-medium">Galeria</h5>

          <section className="mt-6 grid gap-6 grid-cols-1">
            <article className="grid gap-4 grid-cols-6 ">
              <Each
                data={existingGalleryImages}
                render={(item, index) => (
                  <figure key={`existing-${index}`} className="relative border">
                    <Button
                      size="icon"
                      type="button"
                      variant="destructive"
                      className="absolute -top-4 -left-4 rounded-full scale-90"
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      <X />
                    </Button>

                    <Image
                      src={item}
                      width={200}
                      height={200}
                      alt={`noticia_galeria_${index + 1}`}
                      className="rounded-lg w-full h-full bg-black object-contain"
                    />
                  </figure>
                )}
              />

              <Each
                data={galleryImages}
                render={(item, index) => (
                  <figure key={`new-${index}`} className="relative">
                    <Button
                      size="icon"
                      type="button"
                      variant="destructive"
                      className="absolute -top-4 -left-4 rounded-full scale-90"
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <X />
                    </Button>

                    <Image
                      src={URL.createObjectURL(item)}
                      width={200}
                      height={200}
                      alt={`nova_imagem_${index + 1}`}
                      className="rounded-lg bg-black object-contain"
                    />
                  </figure>
                )}
              />
            </article>

            <FileUpload
              maxFiles={6}
              title="Fotos"
              accept="image/*"
              onChange={(files) => setGalleryImages(files)}
              description="Insira fotos para a galeria de imagens"
            />
          </section>
        </section>
      </form>
    </FormContainer>
  );
}
