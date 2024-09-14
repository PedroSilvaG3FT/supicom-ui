"use client";

import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type StoreStorage = "local" | "session";

export const STORE_NAME_PREFIX = "@app";

export type StoreConfig<TState, TActions> = {
  name?: string;
  initialState: TState;
  storage?: StoreStorage;
  actions: (
    set: (
      partial:
        | Partial<TState & TActions>
        | ((state: TState & TActions) => Partial<TState & TActions>),
      replace?: boolean
    ) => void
  ) => TActions;
};

export function buildStore<TState, TActions>(
  config: StoreConfig<TState, TActions>
) {
  const { initialState, actions, storage = "local", name } = config;

  if (!name) {
    return createStore<TState & TActions>()((set) => ({
      ...config.initialState,
      ...config.actions(set),
    }));
  }

  return createStore<TState & TActions>()(
    persist(
      (set) => ({
        ...initialState,
        ...actions(set),
      }),
      {
        name: `${STORE_NAME_PREFIX}:${name}`,
        storage: createJSONStorage(() =>
          storage === "local" ? localStorage : sessionStorage
        ),
      }
    )
  );
}
