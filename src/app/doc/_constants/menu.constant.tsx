import {
  User,
  Flame,
  Table,
  Shapes,
  Rotate3D,
  Database,
  LayoutPanelTop,
  FileChartColumn,
  TextCursorInput,
} from "lucide-react";
import { IMenuGroup } from "../_interfaces/menu.interface";

export const DOC_MENU_GROUPS: IMenuGroup[] = [
  {
    icon: Shapes,
    title: "Features",
    items: [
      { url: `/doc/features/form`, icon: TextCursorInput, title: `Form` },
      { url: `/doc/features/datatable`, icon: Table, title: `Datatable` },
      { url: `/doc/features/aceternity`, icon: Rotate3D, title: `Aceternity` },
      {
        url: `/doc/features/shadcn-ui`,
        icon: LayoutPanelTop,
        title: `Shadcn/ui`,
      },
    ],
  },
  {
    icon: Flame,
    title: "Firebase",
    items: [
      {
        url: `/doc/firebase/authentication`,
        icon: User,
        title: `Authentication`,
      },
      { url: `/doc/firebase/database`, icon: Database, title: `Database` },
      { url: `/doc/firebase/storage`, icon: FileChartColumn, title: `Storage` },
    ],
  },
];
