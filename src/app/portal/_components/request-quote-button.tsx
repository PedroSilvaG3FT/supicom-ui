import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/_core/components/lib/utils";
import { RequestQuoteSheet } from "../../../_shared/components/quote/sheet-request-quote";
import { Button, ButtonProps } from "@/_core/components/fragments/button";

interface IProps extends ButtonProps {
  text?: string;
  className?: string;
  initialProductsSlug?: string[];
}
export default function RequestQuoteButton(props: IProps) {
  const t = useTranslations();

  const {
    size = "lg",
    className = "",
    variant = "default",
    initialProductsSlug = [],
    text = t("base.request_quote"),
  } = props;

  return (
    <RequestQuoteSheet initialProductsSlug={initialProductsSlug}>
      <Button
        size={size}
        variant={variant}
        className={cn(
          "self-start group rounded-full cursor-pointer z-10 mobile:self-center",
          className
        )}
        {...props}
      >
        {text}
        <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
      </Button>
    </RequestQuoteSheet>
  );
}
