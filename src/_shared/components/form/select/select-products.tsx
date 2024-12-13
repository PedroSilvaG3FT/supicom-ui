"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/_core/components/fragments/select";

import { useTranslations } from "next-intl";
import { FormLabel } from "@/_core/components/fragments/form";
import useProductData from "@/_shared/hooks/data/product.hook";

interface IProps {
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectProducts(props: IProps) {
  const t = useTranslations();

  const {
    value,
    label,
    onChange,
    className,
    placeholder = t("base.select"),
  } = props;

  const { products } = useProductData();

  return (
    <article className={className}>
      <FormLabel>{label}</FormLabel>

      <Select defaultValue={value} onValueChange={(value) => onChange?.(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} className="!bg-red-200" />
        </SelectTrigger>

        <SelectContent>
          {products.map((item, index) => (
            <SelectItem key={index} value={item.slug}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </article>
  );
}
