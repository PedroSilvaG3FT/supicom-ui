"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FileUtil } from "@/_shared/utils/file.util";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";
import { FirebaseStorageService } from "@/_core/firebase/base/firebase-storage.service";

const NewsRegisterForm = dynamic(() => import("../_register-form"), {
  ssr: false,
});

const _newsService = new NewsService();
const _firebaseStorageService = new FirebaseStorageService();

export default function NewsRegisterPage() {
  const router = useRouter();
  const _loadingStore = loadingStore((state) => state);

  const handleSubmit = async (
    data: INewsItem,
    file?: Blob,
    galleryImages?: Blob[]
  ) => {
    try {
      _loadingStore.setShow(true);

      if (!!file) {
        const fileDTO = FileUtil.blobToFile(file);
        const fileResponse = await _firebaseStorageService.upload(
          fileDTO,
          "news"
        );

        const fileURL = await _firebaseStorageService.download(
          fileResponse.metadata.fullPath,
          true
        );

        data.imageBannerURL = fileURL;
      }

      const existingImages = data.imagesURL || [];
      const updatedImages = data.imagesURL || [];

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

      data.imagesURL = [...imagesToKeep, ...newImageUrls];

      const modelDTO = _newsService._model.buildRegisterDTO(data);

      const response = await _newsService.create<INewsDB>(modelDTO);
      router.push(`/admin/noticia/cadastro/${response.id}`);

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      ToastUtil.error("Ocorreu uma falha ao processar a solicitação");
    }
  };

  return (
    <section>
      <h3></h3>
      <nav className="flex gap-2 items-center">
        <Button asChild variant="link">
          <Link href="/admin/noticia" className="flex gap-2 items-center">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>

        <h3>Cadastro</h3>
      </nav>

      <Separator className="my-6" />
      <NewsRegisterForm onSubmit={handleSubmit} />
    </section>
  );
}
