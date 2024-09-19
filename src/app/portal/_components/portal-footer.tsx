import Each from "@/_shared/components/app-each";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function PortalFooter() {
  const t = useTranslations();

  const groups = [
    {
      title: `Mapa do site`,
      links: [
        { title: "Home", url: "/portal" },
        { title: t("base.products"), url: "/portal/produtos" },
        { title: "FAQ", url: "/portal/faq" },
        { title: t("base.contact"), url: "/portal/contato" },
      ],
    },
    {
      title: `Institucional`,
      links: [
        { title: `Nossa história`, url: `/portal` },
        { title: `FAQ`, url: `/portal/faq` },
      ],
    },
    {
      title: `Atendimento`,
      links: [{ title: t("base.contact"), url: "/portal/contato" }],
    },
  ];

  return (
    <footer>
      <section className="app-container bg-black text-white flex flex-col pt-12">
        <section className="mb-12 grid gap-8 grid-cols-[30%_1fr_1fr_1fr_1fr] tablet:grid-cols-1 mobile:grid-cols-1">
          <article className="flex gap-4 flex-col">
            <Image
              src="/images/logo-white.svg"
              alt="Supicom"
              height={60}
              width={100}
            />

            <p className="text-[0.85rem] mb-0">{t("portal.hero.title")}</p>
          </article>

          <Each
            data={groups}
            render={(item) => (
              <div className="flex flex-col">
                <h5 className="text-[0.85rem] mb-3">{item.title}</h5>

                <Each
                  data={item.links}
                  render={(link) => (
                    <Link
                      href={link.url}
                      className="mb-2 font-semibold transition-all duration-300"
                    >
                      {link.title}
                    </Link>
                  )}
                />
              </div>
            )}
          />
        </section>
      </section>

      <div className="mt-auto bg-zinc-900 text-white text-sm flex gap-1 items-center justify-center">
        <small className="text-xs">Desenvolvido por</small>

        <Link
          href="https://www.linkedin.com/in/pedro-silva-65996a181/"
          target="_blank"
          className="text-xs"
        >
          Pedro Silva
        </Link>
      </div>
    </footer>
  );
}
