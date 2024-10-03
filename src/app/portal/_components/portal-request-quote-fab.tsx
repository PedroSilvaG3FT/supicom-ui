import { ReceiptText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/_core/components/fragments/button";
import { RequestQuoteSheet } from "@/_shared/components/quote/sheet-request-quote";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/_core/components/fragments/tooltip";

export default function PortalRequestQuoteFab() {
  const t = useTranslations();

  return (
    <RequestQuoteSheet>
      <Button
        type="button"
        className="rounded-full z-20 h-16 w-16 fixed bottom-4 right-4 mobile:scale-75 mobile:bottom-2 mobile:right-2"
      >
        <Tooltip>
          <TooltipTrigger>
            <ReceiptText />
          </TooltipTrigger>

          <TooltipContent>{t("base.request_quote")}</TooltipContent>
        </Tooltip>
      </Button>
    </RequestQuoteSheet>
  );
}
