import { cn } from "@/_core/components/lib/utils";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";

interface IProps {
  status: string | EQuoteStatus;
}
export default function QuoteBadgeStatus(props: IProps) {
  const { status } = props;

  const disctTitle = {
    [EQuoteStatus.SOLD]: "Vendido",
    [EQuoteStatus.CREATED]: "Criado",
    [EQuoteStatus.VIEWED]: "Visualizado",
    [EQuoteStatus.NOT_SOLD]: "Não vendida",
  };

  const disctClassName = {
    [EQuoteStatus.SOLD]: "bg-primary text-white",
    [EQuoteStatus.VIEWED]: "bg-blue-400 text-white",
    [EQuoteStatus.NOT_SOLD]: "bg-red-400 text-white",
    [EQuoteStatus.CREATED]: "bg-yellow-400",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-md text-xs font-semibold text-center text-nowrap",
        disctClassName[status as EQuoteStatus]
      )}
    >
      {disctTitle[status as EQuoteStatus]}
    </span>
  );
}
