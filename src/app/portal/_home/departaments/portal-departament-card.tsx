import { cn } from "@/_core/components/lib/utils";
import Each from "@/_shared/components/app-each";

export interface IPortalDepartamentCardProps {
  title: string;
  images?: string[];
  className?: string;
  description: string;
  imageClassName?: string;
  figureClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
}

export default function PortalDepartamentCard(
  props: IPortalDepartamentCardProps
) {
  return (
    <article
      className={cn(
        "p-4 mobile:px-0 relative overflow-hidden light group",
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

        {!!props.images?.length && (
          <figure
            className={cn(
              "h-full w-full aspect-square overflow-hidden relative",
              props.figureClassName
            )}
          >
            <Each
              data={props.images}
              render={(item, index) => (
                <img
                  alt="header"
                  src={item}
                  width={800}
                  height={800}
                  className={cn(
                    "h-full w-full absolute top-0 right-0 object-cover object-left-top rounded-sm transition-all duration-500",
                    props.imageClassName,
                    index === 0
                      ? "opacity-100 group-hover:opacity-0"
                      : "opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  )}
                />
              )}
            />
          </figure>
        )}
      </section>
    </article>
  );
}
