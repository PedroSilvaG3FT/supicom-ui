"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import {
  useStore as useZustandStore,
  type StoreApi as ZustandStoreApi,
} from "zustand";

export function buildStoreProvider<
  Store,
  StoreApi extends ZustandStoreApi<Store> = ZustandStoreApi<Store>,
  CreateStore extends () => StoreApi = () => StoreApi
>(createStore: CreateStore, config: string = "") {
  const StoreContext = createContext<StoreApi | undefined>(undefined);

  interface StoreProviderProps {
    children: ReactNode;
  }

  const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi>();
    if (!storeRef.current) {
      storeRef.current = createStore();
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useStoreApi = <T,>(selector: (store: Store) => T): T => {
    const storeContext = useContext(StoreContext);

    if (!storeContext) throw new Error("[useStoreApi]");

    return useZustandStore(storeContext, selector);
  };

  return { StoreProvider, useStoreApi };
}
