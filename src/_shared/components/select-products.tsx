import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/_core/components/fragments/select";
import useProductData from "../hooks/data/product.hook";
import { FormLabel } from "@/_core/components/fragments/form";

interface IProps {
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectProducts(props: IProps) {
  const {
    value,
    label,
    onChange,
    className,
    placeholder = "Selecione um produto...",
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
