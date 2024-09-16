"use client";

import { useState } from "react";
import Each from "@/_shared/components/app-each";
import Show from "@/_shared/components/app-show";
import { cn } from "@/_core/components/lib/utils";
import MenuGroup from "./_components/ui/menu-group";
import { DOC_MENU_GROUPS } from "./_constants/menu.constant";
import MenuGroupPopover from "./_components/ui/menu-group-popover";
import { IBaseLayoutProps } from "@/_shared/interface/layout.interface";
import { Sidebar, SidebarBody } from "@/_core/components/fragments/ui/sidebar";

export default function DocLayout({ children }: IBaseLayoutProps) {
  const [open, setOpen] = useState(true);

  return (
    <section
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto border bg-secondary mobile:bg-background border-neutral-200 dark:border-neutral-700 overflow-hidden mobile:border-none",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className={cn("justify-between gap-10")}
          containerClassName="tablet:hidden mobile:hidden"
        >
          <section className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Each
              data={DOC_MENU_GROUPS}
              render={(data) => (
                <Show>
                  <Show.When condition={open}>
                    <MenuGroup data={data} />
                  </Show.When>
                  <Show.Else>
                    <MenuGroupPopover data={data} />
                  </Show.Else>
                </Show>
              )}
            />

            <Show>
              <Show.When condition={open}>
                <footer className="mt-auto">Documentation</footer>
              </Show.When>
            </Show>
          </section>
        </SidebarBody>
      </Sidebar>

      <section className="w-full p-4 overflow-auto rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background mobile:border-none">
        <main className="py-5 ">{children}</main>
      </section>
    </section>
  );
}
