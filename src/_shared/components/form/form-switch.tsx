import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_core/components/fragments/form";
import { Control } from "react-hook-form";
import { SwitchProps } from "@radix-ui/react-switch";
import { Switch } from "@/_core/components/fragments/switch";
import { cn } from "@/_core/components/lib/utils";

interface IAppFormSwitchProps extends SwitchProps {
  name: string;
  label: string;
  control: Control<any>;
  containerClassName?: string;
}
export default function AppFormSwitch(props: IAppFormSwitchProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <>
          <FormItem
            className={cn(
              props.containerClassName,
              "flex items-center space-x-3 space-y-0"
            )}
          >
            <FormControl>
              <Switch
                {...field}
                {...props}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{props.label}</FormLabel>
          </FormItem>

          <FormMessage />
        </>
      )}
    />
  );
}
