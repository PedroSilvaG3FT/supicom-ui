"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import NewsRegisterForm from "../../_register-form";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";

const _newsService = new NewsService();

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

        console.log(data);
        _loadingStore.setShow(false);
      })
      .catch(() => {
        router.push("/admin/noticias");
        ToastUtil.info("Ocorreu uma falha ao consultar detalhes da noticia");
        _loadingStore.setShow(false);
      });
  };

  const handleSubmit = (data: INewsItem, file?: Blob) => {
    console.log("DATA : ", data);
    console.log("FILE : ", file);
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
