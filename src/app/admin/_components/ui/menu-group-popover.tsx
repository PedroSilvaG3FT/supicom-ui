import MenuGroup from "./menu-group";
import { IMenuGroup } from "../../_interfaces/menu.interface";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/_core/components/fragments/hover-card";

interface IProps {
  data: IMenuGroup;
}

export default function MenuGroupPopover({ data }: IProps) {
  const Icon = data.icon;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <figure className="h-10 mb-2 rounded-lg border flex items-center justify-center cursor-pointer group hover:bg-background">
          <Icon className="group-hover:scale-90 transition-all duration-500" />
        </figure>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 !relative !top-[-36px] !right-[-70px]">
        <MenuGroup data={data} isForceLabelOpen />
      </HoverCardContent>
    </HoverCard>
  );
}
