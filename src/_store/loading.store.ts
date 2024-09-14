"use client";

import { buildStoreProvider } from "./factories/provider.factory";
import { StoreConfig, buildStore } from "./factories/store.factory";

interface IState {
  show: boolean;
  message: string;
}

export interface IActions {
  setMessage: (value: string) => void;
  setShow: (value: boolean, message?: string) => void;
}

const config: StoreConfig<IState, IActions> = {
  initialState: { show: false, message: "" },
  actions: (set) => ({
    setMessage: (message) => set(() => ({ message })),
    setShow: (show, message = "") => set(() => ({ show, message })),
  }),
};

interface IStoreData extends IState, IActions {}
const builder = buildStoreProvider<IStoreData>(() => buildStore(config));

export const loadingStore = builder.useStoreApi;
export const LoadingStoreProvider = builder.StoreProvider;
