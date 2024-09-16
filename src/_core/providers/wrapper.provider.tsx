import { ReactNode, Suspense } from "react";
import { StoreProvider } from "./store.provider";
import { ThemeProvider } from "./theme.provider";
import { TooltipProvider } from "../components/fragments/tooltip";
import { AuthProvider } from "../contexts/auth.context";

export default function WrapperProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <StoreProvider>
        <AuthProvider>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </AuthProvider>
      </StoreProvider>
    </Suspense>
  );
}
