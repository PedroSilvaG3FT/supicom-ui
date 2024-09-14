import Image from "next/image";
import { cn } from "@/_core/components/lib/utils";

interface IAppLoadingIndicatorProps {
  className?: string;
  contanerClassName?: string;
}
export default function AppLoadingIndicator(props: IAppLoadingIndicatorProps) {
  const { className, contanerClassName } = props;

  return (
    <section className={cn(contanerClassName)}>
      <Image
        priority
        width={24}
        height={24}
        alt="Loading..."
        src="/loading.svg"
        className={cn("w-24", className)}
      />
    </section>
  );
}
