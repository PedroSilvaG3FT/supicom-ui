import { cn } from "@/_core/components/lib/utils";
import { Copy } from "lucide-react";

interface IProps {
  title?: string;
  content: string;
  className?: string;
  hidePrefix?: boolean;
}
export default function DocOutput(props: IProps) {
  const { title, content, className = "", hidePrefix } = props;

  return (
    <section className={cn("w-full", className)}>
      {!!title && <h5>{title}</h5>}

      <article className="rounded-xl w-full shadow-lg border ">
        <nav className="h-6 w-full px-4 rounded-t-xl flex items-center gap-1.5 justify-start bg-secondary border-zinc-700">
          <span className="bg-red-400 w-2.5 h-2.5 rounded-full"></span>
          <span className="bg-yellow-400 w-2.5 h-2.5 rounded-full"></span>
          <span className="bg-green-400 w-2.5 h-2.5 rounded-full"></span>

          <a className="text-sm ml-auto flex gap-2 items-center cursor-pointer hover:text-green-400">
            <Copy className="w-2.5 h-2.5 " />
            copy
          </a>
        </nav>

        <section className="p-4 w-full rounded-b-xl bg-black border-zinc-700">
          <p className="w-full break-words text-white">
            {!hidePrefix && <span className="text-sm">~ %:</span>}
            {content}
          </p>
        </section>
      </article>
    </section>
  );
}
