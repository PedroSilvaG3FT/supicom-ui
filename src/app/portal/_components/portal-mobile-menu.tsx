import Link from "next/link";
import { X } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { IPortalMenuLink } from "./portal-header";
import { Separator } from "@/_core/components/fragments/separator";
import AppToggleLocale from "@/_shared/components/locale/app-toggle-locale";
import { BackgroundGradientAnimation } from "@/_core/components/fragments/ui/background-gradient-animation";

interface IProps {
  onClose: Function;
  links: IPortalMenuLink[];
}

export default function PortalMobileMenu(props: IProps) {
  const { onClose, links } = props;

  return (
    <section className="animate__animated animate__fadeIn fixed top-0 left-0 h-dvh z-50 w-full bg-secondary/60 backdrop-blur-md">
      <button className="absolute top-5 right-8" onClick={() => onClose()}>
        <X />
      </button>

      <section className="h-full flex gap-2 flex-col items-center justify-center">
        <Each
          data={links}
          render={(item) => (
            <Link
              href={item.url}
              className="font-medium text-2xl"
              onClick={() => onClose()}
            >
              {item.title}
            </Link>
          )}
        />

        <Separator className="my-4 w-1/4 bg-foreground" />
        <AppToggleLocale />
      </section>
    </section>
  );
}
