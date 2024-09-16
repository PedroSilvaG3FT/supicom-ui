import { LucideIcon } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";
import { Button } from "@/_core/components/fragments/button";

interface IAppEmptyListProps {
  message: string;
  icon: LucideIcon;
  className?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  callback?: () => void;
}

export default function AppEmptyList(props: IAppEmptyListProps) {
  const {
    message,
    className,
    buttonText,
    callback,
    icon: Icon,
    buttonIcon: ButtonIcon,
  } = props;

  return (
    <section className={cn("flex flex-col items-center", className)}>
      <Icon className="h-8 w-8 mb-4" />

      <p className="text-center text-sm ">{message}</p>

      {callback && buttonText && (
        <Button variant="link" onClick={callback} className="text-foreground">
          {buttonText}
          {ButtonIcon && <ButtonIcon className="h-3 w-3 ml-2" />}
        </Button>
      )}
    </section>
  );
}
