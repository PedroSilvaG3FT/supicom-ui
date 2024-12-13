"use client";
import * as React from "react";
import InputMask from "react-input-mask";
import { cn } from "@/_core/components/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maxLength?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", mask, maxLength, ...props }, ref) => {
    const InputComponent = mask ? InputMask : "input";
    const [isShowPass, setIsShowPass] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (maxLength) value = value.slice(0, maxLength);

      if (props.onChange) {
        const event = { ...e, target: { ...e.target, value } };
        props.onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const _renderIcon = () => {
      return (
        <figure
          className="cursor-pointer absolute top-4 right-4 transition-all duration-500 hover:scale-95"
          onClick={() => setIsShowPass(!isShowPass)}
        >
          {isShowPass ? <EyeOff /> : <Eye />}
        </figure>
      );
    };

    return (
      <article className="w-full relative">
        <InputComponent
          type={isShowPass ? "text" : type}
          mask={mask || ""}
          className={cn(
            "flex h-14 w-full rounded-2xl border border-input dark:bg-muted/40 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />

        {type === "password" && _renderIcon()}
      </article>
    );
  }
);
Input.displayName = "Input";

export { Input };
