import { cn } from "@/_core/components/lib/utils";
import { DirectionAwareHover } from "@/_core/components/fragments/ui/direction-aware-hover";

interface IProps {
  title: string;
  imageURL: string;
  className: string;
  description: string;
}
export default function PortalHistoryCard(props: IProps) {
  return (
    <article
      className={cn(
        "p-4 mobile:px-0 relative overflow-hidden",
        props.className
      )}
    >
      <h5 className="max-w-5xl mx-auto text-left tracking-tight text-xl md:text-2xl md:leading-snug">
        {props.title}
      </h5>

      <p
        className={cn(
          "text-sm md:text-base max-w-4xl text-left mx-auto",
          "text-neutral-500 text-center font-normal",
          "text-left max-w-sm mx-0 md:text-sm my-2"
        )}
      >
        {props.description}
      </p>

      <DirectionAwareHover
        imageUrl={props.imageURL}
        className="!w-full rounded-3xl"
      >
        <></>
      </DirectionAwareHover>
    </article>
  );
}
