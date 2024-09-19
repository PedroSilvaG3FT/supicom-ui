import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import RequestQuoteButton from "../_components/request-quote-button";

export default function PortalServices() {
  const items = [
    {
      icon: "",
      title: `Fabricação`,
      imageURL: `/images/services/manufacturing.jpg`,
      description: `Fornecemos máquinas e equipamentos especializados para diversos setores industriais, como madeireiras, indústria gráfica, e refino de petróleo.`,
    },
    {
      icon: "",
      title: `Aluguel`,
      imageURL: `/images/services/rent.jpg`,
      description: `Oferecemos locação de máquinas e equipamentos comerciais e industriais sem operador, adequados para diversas necessidades.`,
    },
    {
      icon: "",
      title: `Manutenção`,
      imageURL: `/images/services/maintenance.jpg`,
      description: `Prestamos serviços de manutenção e reparação de máquinas industriais, garantindo a máxima eficiência e longevidade dos equipamentos.`,
    },
  ];

  return (
    <section className="app-container">
      <h2 className="mt-4">Serviços</h2>
      <h5 className="mb-6">
        Soluções Industriais Personalizadas para o Seu Negócio
      </h5>

      <section className="grid gap-8 grid-cols-3 mobile:grid-cols-1">
        <Each
          data={items}
          render={(item) => (
            <article className="w-full group/card">
              <section
                className={cn(
                  "cursor-pointer overflow-hidden relative card h-96 rounded-3xl shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
                )}
              >
                <Image
                  layout="fill"
                  alt={item.title}
                  objectFit="cover"
                  src={item.imageURL}
                  className="rounded-md"
                />

                <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-60 group-hover/card:opacity-70"></div>

                <article className="text mt-auto content text-white relative z-10">
                  <h1 className="font-bold text-xl md:text-2xl ">
                    {item.title}
                  </h1>
                  <p className="font-normal text-sm my-4 relative left-0 transition-all duration-500 group-hover/card:left-2">
                    {item.description}
                  </p>
                  <Link
                    href="#"
                    className="flex items-center font-semibold opacity-0 group-hover/card:opacity-100 transition-all duration-500 mobile:!opacity-100"
                  >
                    Solicite uma cotação
                    <ArrowRight className="ml-2 group-hover/card:ml-4 group-hover/card:transition-all group-hover/card:duration-500" />
                  </Link>
                </article>
              </section>
            </article>
          )}
        />
      </section>

      <nav className="mt-8 flex items-center justify-center">
        <RequestQuoteButton />
      </nav>
    </section>
  );
}
