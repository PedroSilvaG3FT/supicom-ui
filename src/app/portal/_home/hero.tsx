import { useTranslations } from "next-intl";
import { ChartNoAxesCombined, Medal, Users } from "lucide-react";
import { PORTAL_SECTION_ID } from "./_data";
import RequestQuoteButton from "../_components/request-quote-button";
import { FlipWords } from "@/_core/components/fragments/ui/flip-words";
import { AuroraBackground } from "@/_core/components/fragments/ui/aurora-background";

export default function PortalHero() {
  const t = useTranslations();

  const words = [
    t("phrases.industrial_innovation"),
    t("phrases.superior_quality"),
    t("phrases.advanced_technology"),
    t("phrases.customized_solutions"),
    t("phrases.operational_efficiency"),
    t("phrases.specific_equipment"),
    t("phrases.specialized_maintenance"),
    t("phrases.reliable_performance"),
    t("phrases.parts_accessories"),
    t("phrases.excellence_services"),
    t("phrases.commitment_quality"),
    t("phrases.personalized_service"),
    t("phrases.sustainability_innovation"),
    t("phrases.high_performance_machines"),
  ];

  return (
    <AuroraBackground className="shadow-md p-4 bg-black text-white border-zinc-200 h-[40rem] mobile:h-[92dvh] overflow-hidden">
      <section
        id={PORTAL_SECTION_ID.hero}
        className="app-container app-container-pt mobile:px-0"
      >
        <section className="h-full w-full flex flex-col">
          <h1 className="font-semibold whitespace-pre-line text-6xl mobile:text-4xl mobile:text-center">
            {t("portal.hero.title")}
          </h1>

          <p className="whitespace-pre-line my-4 mobile:text-center">
            {t("portal.hero.description")}
          </p>

          <RequestQuoteButton />

          <article className="w-full mobile:flex items-center justify-center">
            <FlipWords
              words={words}
              className="text-xl text-white my-4 mobile:text-center mobile:my-6"
            />
          </article>

          <section className="mt-12 flex gap-12 mobile:justify-center">
            <article className="flex gap-3 items-center mobile:flex-col mobile:justify-center">
              <ChartNoAxesCombined className="w-8 h-8 text-primary" />

              <div>
                <h2 className="font-semibold mobile:text-center">+1.000</h2>
                <h5 className="text-primary mobile:text-center">
                  {t("portal.hero.machines_sold")}
                </h5>
              </div>
            </article>

            <article className="flex gap-3 items-center mobile:flex-col mobile:justify-center mobile:hidden">
              <Medal className="w-8 h-8 text-primary" />

              <div>
                <h2 className="font-semibold mobile:text-center">100%</h2>
                <h5 className="text-primary mobile:text-center">
                  {t("portal.hero.satisfaction")}
                </h5>
              </div>
            </article>

            <article className="flex gap-3 items-center mobile:flex-col mobile:justify-center">
              <Medal className="w-8 h-8 text-primary" />

              <div>
                <h2 className="font-semibold mobile:text-center">
                  +30 {t("base.years")}
                </h2>
                <h5 className="text-primary mobile:text-center">
                  {t("base.on_the_market")}
                </h5>
              </div>
            </article>
          </section>
        </section>
      </section>
    </AuroraBackground>
  );
}
