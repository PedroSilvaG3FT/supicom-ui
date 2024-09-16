import { LucideIcon } from "lucide-react";

export interface IMenuItem {
  url: string;
  title: string;
  icon: LucideIcon;
}

export interface IMenuGroup {
  title: string;
  icon: LucideIcon;
  items: IMenuItem[];
}
