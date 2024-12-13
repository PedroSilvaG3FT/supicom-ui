"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/_core/components/fragments/select";

import { ptBR } from "date-fns/locale";
import { format, eachMonthOfInterval } from "date-fns";
import { FormLabel } from "@/_core/components/fragments/form";
import { IFormOption } from "../../_interfaces/form-option.interface";

interface IProps {
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectMonth(props: IProps) {
  const {
    value,
    label,
    onChange,
    className,
    placeholder = "Selecione um mês...",
  } = props;

  const options: IFormOption[] = eachMonthOfInterval({
    start: new Date(2023, 0, 1),
    end: new Date(2023, 11, 31),
  }).map((date) => ({
    label: format(date, "MMMM", { locale: ptBR }),
    value: String(date.getMonth() + 1).padStart(2, "0"),
  }));

  return (
    <article className={className}>
      <label className="font-medium">{label}</label>

      <Select defaultValue={value} onValueChange={(value) => onChange?.(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} className="capitalize" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {options.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="capitalize"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </article>
  );
}
