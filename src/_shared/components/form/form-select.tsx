import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_core/components/fragments/form";
import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_core/components/fragments/select";
import { SelectProps } from "@radix-ui/react-select";
import { IFormOption } from "../_interfaces/form-option.interface";

interface IAppFormSelectProps extends SelectProps {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  options: IFormOption[];
}
export default function AppFormSelect(props: IAppFormSelectProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Select
              {...props}
              defaultValue={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (props.onValueChange) {
                  props.onValueChange(value);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {props.options.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
