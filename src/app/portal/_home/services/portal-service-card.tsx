import { LucideIcon } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";
import RequestQuoteButton from "../../_components/request-quote-button";

interface IProps {
  title: string;
  index: number;
  icon: LucideIcon;
  description: string;
}
export default function PortalServiceCard(props: IProps) {
  const { title, description, icon: Icon, index } = props;

  return (
    <article
      className={cn(
        "light flex flex-col lg:border-r py-10 relative group/feature ",
        (index === 0 || index === 4) && "lg:border-l ",
        index < 4 && "lg:border-b "
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}

      <figure className="mb-4 relative z-10 px-10 text-neutral-600 group-hover/feature:text-primary">
        <Icon />
      </figure>

      <section className="text-lg font-bold mb-2 relative z-10 px-10">
        <span className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </section>

      <p className="text-sm text-neutral-600 max-w-xs mobile:max-w-full relative z-10 px-10 mb-4">
        {description}
      </p>

      <footer className="mt-auto max-w-full relative z-10 px-10">
        <RequestQuoteButton variant={"link"} className="pl-0" />
      </footer>
    </article>
  );
}
