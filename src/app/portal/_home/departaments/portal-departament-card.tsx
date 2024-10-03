import { cn } from "@/_core/components/lib/utils";

export interface IPortalDepartamentCardProps {
  title: string;
  imageURL?: string;
  className?: string;
  description: string;
  imageClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
}

export default function PortalDepartamentCard(
  props: IPortalDepartamentCardProps
) {
  return (
    <article
      className={cn(
        "p-4 mobile:px-0 relative overflow-hidden light",
        props.className
      )}
    >
      <h5 className="mb-4 font-medium text-left tracking-tight md:leading-snug">
        {props.title}
      </h5>

      <section className={props.contentClassName}>
        <p
          className={cn(
            "text-sm text-left whitespace-pre-line",
            props.descriptionClassName
          )}
        >
          {props.description}
        </p>

        {!!props.imageURL && (
          <img
            alt="header"
            width={800}
            height={800}
            src={props.imageURL}
            className={cn(
              "h-full w-full aspect-square object-cover object-left-top rounded-sm",
              props.imageClassName
            )}
          />
        )}
      </section>
    </article>
  );
}
