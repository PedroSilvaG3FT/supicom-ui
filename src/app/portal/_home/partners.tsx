import Link from "next/link";
import Image from "next/image";
import Each from "@/_shared/components/app-each";
import { InfiniteMovingCards } from "@/_core/components/fragments/ui/infinite-moving-cards";

export default function PortalPartners() {
  const partners = [
    { name: `Parceiro`, imageURL: `/images/logo.svg`, link: `#` },
    { name: `Parceiro`, imageURL: `/images/logo.svg`, link: `#` },
    { name: `Parceiro`, imageURL: `/images/logo.svg`, link: `#` },
    { name: `Parceiro`, imageURL: `/images/logo.svg`, link: `#` },
    { name: `Parceiro`, imageURL: `/images/logo.svg`, link: `#` },
  ];

  return (
    <section className="app-container">
      <InfiniteMovingCards direction="right" speed="slow">
        <Each
          data={partners}
          render={(item) => (
            <Link
              href={item.link}
              target="_blank"
              className="w-[240px] mobile:w-[140px] max-w-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105"
            >
              <Image
                width={120}
                height={120}
                alt={item.name}
                src={"/images/logo.svg"}
              />
            </Link>
          )}
        />
      </InfiniteMovingCards>
    </section>
  );
}
