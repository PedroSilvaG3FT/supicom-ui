"use client";

import Show from "../app-show";
import { defaultLocale } from "@/i18n/config";
import { ELocale } from "../../enums/locale.enum";
import AppLocaleInline from "./_app-locale-inline";
import { getLocale, setLocale } from "@/i18n/service";
import { loadingStore } from "@/_store/loading.store";
import AppLocaleDropdown from "./_app-locale-dropdown";
import { useEffect, useState, useTransition } from "react";

interface IProps {
  mode?: "dropdown" | "inline";
  className?: string;
}

export default function AppToggleLocale(props: IProps) {
  const { mode = "inline", className = "" } = props;

  const _loadingStore = loadingStore((state) => state);

  const [isPending, startTransition] = useTransition();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedLocale, setSelectedLocale] = useState<ELocale>(defaultLocale);

  useEffect(() => {
    _loadingStore.setShow(isPending);
  }, [isPending]);

  useEffect(() => {
    getLocale().then((locale) => {
      setSelectedLocale(locale as ELocale);
      setIsLoaded(true);
    });
  }, []);

  const handleSelect = (value: ELocale) => {
    startTransition(() => {
      setLocale(value);
      setSelectedLocale(value);
    });
  };

  return (
    <Show>
      <Show.When condition={mode === "inline"}>
        <AppLocaleInline className={className} onSelect={handleSelect} />
      </Show.When>

      <Show.When condition={mode === "dropdown"}>
        <AppLocaleDropdown
          isLoading={isLoaded}
          className={className}
          locale={selectedLocale}
          onSelect={handleSelect}
        />
      </Show.When>
    </Show>
  );
}
