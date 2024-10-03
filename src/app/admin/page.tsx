import { Separator } from "@/_core/components/fragments/separator";
import Each from "@/_shared/components/app-each";
import { ADMIN_MENU_GROUPS } from "./_constants/menu.contant";
import Link from "next/link";

export default function AdminRootPage() {
  return (
    <section>
      <h4>Portal do administrador</h4>

      <Separator className="my-6" />

      <Each
        data={ADMIN_MENU_GROUPS}
        render={(group) => (
          <section>
            <h5 className="font-medium mb-4">Configurações - {group.title}</h5>

            <section className="flex gap-4 items-center">
              <Each
                data={group.items}
                render={(item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      href={item.url}
                      className="transition-transform duration-500 hover:scale-95 gap-4 cursor-pointer rounded-md bg-secondary shadow-md h-36 w-36 flex flex-col items-center justify-center"
                    >
                      <ItemIcon className="scale-125" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                }}
              />
            </section>
          </section>
        )}
      />
    </section>
  );
}
