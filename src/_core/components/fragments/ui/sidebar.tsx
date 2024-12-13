import { cn } from "../../lib/utils";
import Link, { LinkProps } from "next/link";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import React, { useState, createContext, useContext } from "react";

interface Links {
  href: string;
  label: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

interface ISidebarBodyProps extends React.ComponentProps<typeof motion.div> {
  containerClassName?: string;
}
export const SidebarBody = (props: ISidebarBodyProps) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar
        containerClassName={props.containerClassName}
        {...(props as IMobileSideBarProps)}
      />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  const maxSize = "200px";
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden relative md:flex md:flex-col bg-neutral-100 dark:bg-secondary w-[60px] flex-shrink-0",
          className,
          !open && "px-1.5"
        )}
        animate={{
          width: animate ? (open ? maxSize : "60px") : maxSize,
        }}
        {...props}
      >
        <>
          <button
            className={cn(
              "absolute bg-muted shadow-lg p-1 scale-75 hover:scale-90 opacity-70 hover:opacity-100 hover:text-primary transition-all duration-500 rounded-full right-[-14px] top-40 flex items-center justify-center",
              open && "rotate-180"
            )}
            onClick={() => setOpen(!open)}
          >
            <ChevronRight className={cn("h-5 w-5")} />
          </button>
          {children}
        </>
      </motion.div>
    </>
  );
};

interface IMobileSideBarProps extends React.ComponentProps<"div"> {
  containerClassName?: string;
}

export const MobileSidebar = ({
  className,
  children,
  containerClassName,
  ...props
}: IMobileSideBarProps) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "h-12 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
          containerClassName
        )}
        {...props}
      >
        <div className="flex z-20 justify-between w-full">
          <LayoutDashboard
            className="cursor-pointer text-primary"
            onClick={() => setOpen(!open)}
          />

          <h5 className="font-semibold">Supicom</h5>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  isMobile = false,
  isForceOpen = false,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
  isMobile?: boolean;
  isForceOpen?: boolean;
}) => {
  const { open, animate, setOpen } = useSidebar();

  const isOpen = isForceOpen || open;

  return (
    <Link
      href={link.href}
      onClick={() => isMobile && setOpen(false)}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate
            ? isOpen
              ? "inline-block"
              : "none"
            : "inline-block",
          opacity: animate ? (isOpen ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
