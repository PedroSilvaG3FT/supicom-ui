"use client";

import useWindowSize from "@/_shared/hooks/window-size.hook";
import { IMenuGroup } from "../../_interfaces/menu.interface";
import { SidebarLink } from "@/_core/components/fragments/ui/sidebar";

interface IProps {
  data: IMenuGroup;
  isForceLabelOpen?: boolean;
}

export default function MenuGroup({ data, isForceLabelOpen }: IProps) {
  const { isMobile } = useWindowSize();

  return (
    <section>
      <small className="uppercase opacity-30">{data.title}</small>

      <article className="mb-4 flex flex-col gap-2">
        {data.items.map((item, idx) => (
          <SidebarLink
            isMobile={isMobile}
            isForceOpen={!!isForceLabelOpen}
            key={idx}
            link={{
              label: item.title,
              href: item.url,
              icon: <item.icon />,
            }}
          />
        ))}
      </article>
    </section>
  );
}
