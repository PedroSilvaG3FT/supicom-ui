import { ReceiptText } from "lucide-react";
import { Button } from "@/_core/components/fragments/button";
import { RequestQuoteSheet } from "@/_shared/components/quote/sheet-request-quote";

export default function PortalRequestQuoteFab() {
  return (
    <RequestQuoteSheet>
      <Button
        type="button"
        className="rounded-full z-20 h-16 w-16 fixed bottom-4 right-4 mobile:scale-75 mobile:bottom-2 mobile:right-2"
      >
        <ReceiptText />
      </Button>
    </RequestQuoteSheet>
  );
}
