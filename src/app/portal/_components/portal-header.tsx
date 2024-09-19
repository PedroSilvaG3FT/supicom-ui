"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";
import useWindowScroll from "@/_shared/hooks/window-scroll.hook";
import AppToggleLocale from "@/_shared/components/locale/app-toggle-locale";

export default function PortalHeader() {
  const t = useTranslations();
  const pathName = usePathname();

  const isHome = pathName === "/portal";
  const isScrolled = useWindowScroll(600);
  const isApplyStyles = isHome ? isScrolled : true;

  const links = [
    { title: "Home", url: "/portal" },
    { title: t("base.products"), url: "/portal/produtos" },
    { title: "FAQ", url: "/portal/faq" },
    { title: t("base.contact"), url: "/portal/contato" },
  ];

  return (
    <section className="w-full fixed top-0 left-0 z-50">
      <header className="app-container pb-0 mobile:p-0">
        <nav
          className={cn(
            "mx-auto w-full h-16 px-4 pr-8 rounded-2xl backdrop-blur flex gap-12 items-center",
            isApplyStyles &&
              "bg-background/75 border border-zinc-200 shadow-md",
            "mobile:rounded-none px-8"
          )}
        >
          <Image
            width={120}
            height={120}
            alt="Supicom"
            src={isApplyStyles ? "/images/logo.svg" : "/images/logo-white.svg"}
          />

          <article
            className={cn(
              "ml-auto flex items-center gap-4 mobile:hidden tablet:hidden",
              !isApplyStyles && "text-white"
            )}
          >
            <Each
              data={links}
              render={(item) => (
                <Link
                  href={item.url}
                  className="transition-all duration-500 hover:text-primary"
                >
                  {item.title}
                </Link>
              )}
            />
          </article>

          <AppToggleLocale className="mobile:hidden tablet:hidden" />
        </nav>
      </header>
    </section>
  );
}
