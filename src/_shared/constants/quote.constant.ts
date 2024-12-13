import { EQuoteStatus } from "../enums/quote.enum";

export const QUOTE_STATUS_LABEL = {
  [EQuoteStatus.SOLD]: "Vendido",
  [EQuoteStatus.CREATED]: "Novo",
  [EQuoteStatus.VIEWED]: "Visualizado",
  [EQuoteStatus.NOT_SOLD]: "Não vendida",
};

export const QUOTE_STATUS_CLASS = {
  [EQuoteStatus.SOLD]: "bg-primary text-white",
  [EQuoteStatus.VIEWED]: "bg-blue-400 text-white",
  [EQuoteStatus.NOT_SOLD]: "bg-red-400 text-white",
  [EQuoteStatus.CREATED]: "bg-yellow-400",
};

export const QUOTE_STATUS_TEXT_CLASS = {
  [EQuoteStatus.SOLD]: "text-green-400",
  [EQuoteStatus.VIEWED]: "text-blue-400",
  [EQuoteStatus.NOT_SOLD]: "text-red-400",
  [EQuoteStatus.CREATED]: "text-yellow-400",
};
