import Image from "next/image";
import { cn } from "@/_core/components/lib/utils";
import { ELocale } from "@/_shared/enums/locale.enum";
import { defaultLocale, LOCALES_FLAGS } from "@/i18n/config";

interface IProps {
  locale: ELocale;
  className?: string;
}

export default function AppLocaleFlag(props: IProps) {
  const { locale = defaultLocale, className = "" } = props;

  return (
    <Image
      width={24}
      height={24}
      alt={locale}
      src={LOCALES_FLAGS[locale]}
      className={cn("object-contain w-6", className)}
    />
  );
}
