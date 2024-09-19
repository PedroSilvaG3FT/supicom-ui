import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/_core/components/lib/utils";
import { Button } from "@/_core/components/fragments/button";

interface IProps {
  text?: string;
  className?: string;
}
export default function RequestQuoteButton(props: IProps) {
  const t = useTranslations();
  const { className = "", text = t("base.request_quote") } = props;

  return (
    <Button
      size="lg"
      variant="default"
      className={cn(
        "self-start group rounded-full cursor-pointer z-10 mobile:self-center",
        className
      )}
    >
      {text}
      <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
    </Button>
  );
}
