"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FileUtil } from "@/_shared/utils/file.util";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";
import { FirebaseStorageService } from "@/_core/firebase/base/firebase-storage.service";

const NewsRegisterForm = dynamic(() => import("../../_register-form"), {
  ssr: false,
});

const _newsService = new NewsService();
const _firebaseStorageService = new FirebaseStorageService();

export default function NewsUpdatePage() {
  const router = useRouter();
  const params = useParams();
  const _loadingStore = loadingStore((state) => state);

  const [data, setData] = useState({} as INewsItem);

  const getData = () => {
    _loadingStore.setShow(true);

    _newsService
      .getById<INewsDB>(String(params.id))
      .then((response) => {
        const data = _newsService._model.buildItem(response);
        setData(data);
        console.log("NEWS : ", data);
        _loadingStore.setShow(false);
      })
      .catch(() => {
        router.push("/admin/noticias");
        ToastUtil.info("Ocorreu uma falha ao consultar detalhes da noticia");
        _loadingStore.setShow(false);
      });
  };

  const handleSubmit = async (
    updatedData: INewsItem,
    file?: Blob,
    galleryImages?: Blob[]
  ) => {
    try {
      _loadingStore.setShow(true);

      if (file) {
        const fileDTO = FileUtil.blobToFile(file);
        const fileResponse = await _firebaseStorageService.upload(
          fileDTO,
          "news"
        );

        const fileURL = await _firebaseStorageService.download(
          fileResponse.metadata.fullPath,
          true
        );

        updatedData.imageBannerURL = fileURL;
      }

      const existingImages = data.imagesURL || [];
      const updatedImages = updatedData.imagesURL || [];

      const imagesToKeep = existingImages.filter((url) =>
        updatedImages.includes(url)
      );
      const imagesToDelete = existingImages.filter(
        (url) => !updatedImages.includes(url)
      );
      const imagesToCreate = galleryImages || [];

      for (const imageUrl of imagesToDelete) {
        await _firebaseStorageService.delete(imageUrl);
      }

      const newImageUrls: string[] = [];
      for (const image of imagesToCreate) {
        const imageDTO = FileUtil.blobToFile(image);
        const imageResponse = await _firebaseStorageService.upload(
          imageDTO,
          "news/gallery"
        );

        const imageURL = await _firebaseStorageService.download(
          imageResponse.metadata.fullPath,
          true
        );

        newImageUrls.push(imageURL);
      }

      updatedData.imagesURL = [...imagesToKeep, ...newImageUrls];

      const modelDTO = _newsService._model.buildRegisterDTO(updatedData);

      await _newsService.update<INewsDB>(String(updatedData.id), modelDTO);
      ToastUtil.success("Item atualizado com sucesso");

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <nav className="flex gap-2 items-center">
        <Button asChild variant="link">
          <Link href="/admin/noticia" className="flex gap-2 items-center">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>

        <h3>Atualização</h3>
      </nav>

      <Separator className="my-6" />
      <NewsRegisterForm initialData={data} onSubmit={handleSubmit} />
    </section>
  );
}
