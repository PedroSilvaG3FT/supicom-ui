import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/_core/components/fragments/tooltip";

import Each from "../app-each";
import { useTranslations } from "next-intl";
import AppLocaleFlag from "./app-locale-flag";
import { cn } from "@/_core/components/lib/utils";
import { ELocale } from "@/_shared/enums/locale.enum";
import { locales, LOCALES_LABEL } from "@/i18n/config";
import { Button } from "@/_core/components/fragments/button";

interface IProps {
  className?: string;
  onSelect: (data: ELocale) => void;
}

export default function AppLocaleInline({ onSelect, className = "" }: IProps) {
  const t = useTranslations();

  return (
    <article className={cn("flex gap-2.5", className)}>
      <Each
        data={locales}
        render={(item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => onSelect(item)}
                className="p-0 h-auto transition-all duration-500 hover:scale-125 hover:bg-transparent"
              >
                <AppLocaleFlag locale={item} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t(LOCALES_LABEL[item])}</TooltipContent>
          </Tooltip>
        )}
      />
    </article>
  );
}
