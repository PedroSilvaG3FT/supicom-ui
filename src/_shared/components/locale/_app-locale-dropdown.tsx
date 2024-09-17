"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_core/components/fragments/dropdown-menu";

import Show from "../app-show";
import Each from "../app-each";
import { useTranslations } from "next-intl";
import AppLocaleFlag from "./app-locale-flag";
import { cn } from "@/_core/components/lib/utils";
import { ELocale } from "../../enums/locale.enum";
import { locales, LOCALES_LABEL } from "@/i18n/config";
import { Button } from "@/_core/components/fragments/button";
import AppLoadingIndicator from "../loading/app-loading-indicator";

interface IProps {
  locale: ELocale;
  isLoading: boolean;
  className?: string;
  onSelect: (data: ELocale) => void;
}

export default function AppLocaleDropdown(props: IProps) {
  const { onSelect, isLoading, locale, className = "" } = props;
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("mb-4", className)}>
          <Show>
            <Show.When condition={isLoading}>
              <AppLocaleFlag locale={locale} className="w-8" />
            </Show.When>
            <Show.Else>
              <AppLoadingIndicator className="w-8" />
            </Show.Else>
          </Show>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-12">
        <Each
          data={locales}
          render={(item) => (
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => onSelect(item)}
            >
              <AppLocaleFlag locale={item} />
              <span>{t(LOCALES_LABEL[item])}</span>
            </DropdownMenuItem>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
