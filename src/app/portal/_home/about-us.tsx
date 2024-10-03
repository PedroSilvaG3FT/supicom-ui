import { useTranslations } from "next-intl";

export default function PortalAboutUs() {
  const t = useTranslations();

  return (
    <section className="app-container mt-6">
      <h2 className="mb-4">{t("portal.about_us")}</h2>

      <section className="grid gap-4 grid-cols-2 mobile:grid-cols-1">
        <p className="whitespace-pre-line">
          Somos uma empresa comprometida em fornecer soluções completas para o
          setor industrial, com produtos e serviços que garantem a eficiência e
          a continuidade das suas operações.
          <br />
          <br />
          Com décadas de experiência no mercado, fabricamos equipamentos de alta
          performance para segmentos como madeireiras, indústria gráfica, refino
          de petróleo e muitos outros.
          <br />
          <br />
          Nosso compromisso vai além da fabricação. Oferecemos locação flexível
          e manutenção especializada, garantindo que seus equipamentos estejam
          sempre em pleno funcionamento, minimizando paradas e maximizando a
          produtividade do seu negócio. Sabemos que cada indústria possui
          desafios únicos, e por isso desenvolvemos soluções personalizadas que
          atendem às necessidades específicas de cada cliente.
        </p>

        <video
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-md"
        >
          <source src="/video/drone-company.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </section>
    </section>
  );
}
