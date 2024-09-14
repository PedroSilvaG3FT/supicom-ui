"use client";

import { ReactNode, Suspense } from "react";
import { StoreProvider } from "./store.provider";
import { ThemeProvider } from "./theme.provider";
import { TooltipProvider } from "../components/ui/tooltip";

export default function WrapperProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <StoreProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </StoreProvider>
    </Suspense>
  );
}
