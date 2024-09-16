import {
  Database,
  FileChartColumn,
  Flame,
  LayoutGrid,
  LayoutPanelTop,
  Rotate3D,
  Shapes,
  Table,
  TextCursorInput,
  User,
} from "lucide-react";
import { IMenuGroup, IMenuItem } from "../_interfaces/menu.interface";

export const MAIN_MENU_ITEMS: IMenuItem[] = [
  { url: `/`, icon: LayoutGrid, title: `Casos` },
];

export const DOC_MENU_GROUPS: IMenuGroup[] = [
  {
    icon: Shapes,
    title: "Features",
    items: [
      { url: `/`, icon: TextCursorInput, title: `Form` },
      { url: `/`, icon: Table, title: `Datatable` },
      { url: `/`, icon: Rotate3D, title: `Aceternity` },
      { url: `/`, icon: LayoutPanelTop, title: `Shadcn/ui` },
    ],
  },
  {
    icon: Flame,
    title: "Firebase",
    items: [
      { url: `/`, icon: User, title: `Authentication` },
      { url: `/`, icon: Database, title: `Database` },
      { url: `/`, icon: FileChartColumn, title: `Storage` },
    ],
  },
];
