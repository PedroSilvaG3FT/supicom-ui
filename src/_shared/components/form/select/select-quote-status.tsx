import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/_core/components/fragments/select";
import { FormLabel } from "@/_core/components/fragments/form";
import { IFormOption } from "../../_interfaces/form-option.interface";
import {
  QUOTE_STATUS_CLASS,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TEXT_CLASS,
} from "@/_shared/constants/quote.constant";
import { EQuoteStatus } from "@/_shared/enums/quote.enum";
import { cn } from "@/_core/components/lib/utils";

interface IProps {
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectQuoteStatus(props: IProps) {
  const {
    value,
    label,
    onChange,
    className,
    placeholder = "Selecione uma opção...",
  } = props;

  const options: IFormOption[] = Object.entries(QUOTE_STATUS_LABEL).map(
    ([value, label]) => ({
      label,
      value,
    })
  );

  return (
    <article className={className}>
      <label className="font-medium">{label}</label>

      <Select defaultValue={value} onValueChange={(value) => onChange?.(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {options.map((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
              className={cn(
                "font-semibold",
                QUOTE_STATUS_TEXT_CLASS[item.value as EQuoteStatus]
              )}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </article>
  );
}
