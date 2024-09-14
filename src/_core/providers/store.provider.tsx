"use client";

import { ReactNode } from "react";
import { STORE_PROVIDERS } from "@/_store/_providers.store";

export function StoreProvider({ children }: { children: ReactNode }) {
  return STORE_PROVIDERS.reduce(
    (Content, Provider) => <Provider>{Content}</Provider>,
    children
  );
}
