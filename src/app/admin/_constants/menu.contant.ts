import { IMenuGroup } from "../_interfaces/menu.interface";
import { Shapes, ContactRound, ReceiptText, Newspaper } from "lucide-react";

export const ADMIN_MENU_GROUPS: IMenuGroup[] = [
  {
    icon: Shapes,
    title: "Portal",
    items: [
      { url: `/admin/contato`, title: `Contatos`, icon: ContactRound },
      { url: `/admin/cotacao`, title: `Cotações`, icon: ReceiptText },
      { url: `/admin/noticia`, title: `Notícias`, icon: Newspaper },
    ],
  },
];
