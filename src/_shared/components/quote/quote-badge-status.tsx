import {
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_CLASS,
} from "@/_shared/constants/quote.constant";
import { cn } from "@/_core/components/lib/utils";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";
interface IProps {
  status: string | EQuoteStatus;
}
export default function QuoteBadgeStatus(props: IProps) {
  const { status } = props;

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-md text-xs font-semibold text-center text-nowrap",
        QUOTE_STATUS_CLASS[status as EQuoteStatus]
      )}
    >
      {QUOTE_STATUS_LABEL[status as EQuoteStatus]}
    </span>
  );
}
