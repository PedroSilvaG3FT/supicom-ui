import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_core/components/fragments/form";
import { Control } from "react-hook-form";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { IFormOption } from "../_interfaces/form-option.interface";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/_core/components/fragments/radio-group";

interface IAppFormRadioGroupProps extends RadioGroupProps {
  name: string;
  label: string;
  control: Control<any>;
  options: IFormOption[];
}
export default function AppFormRadioGroup(props: IAppFormRadioGroupProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <RadioGroup
              {...field}
              value={field.value}
              defaultValue={field.value}
              onValueChange={field.onChange}
              className="flex flex-col space-y-1"
            >
              {props.options.map((item, index) => (
                <FormItem
                  key={index}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
