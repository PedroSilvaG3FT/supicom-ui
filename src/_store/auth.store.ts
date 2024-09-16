"use client";

import { StoreStateUtil } from "./utils/state.util";
import { TokenUtil } from "@/_shared/utils/token.util";
import { IUser } from "@/_shared/interface/user.interface";
import { buildStoreProvider } from "./factories/provider.factory";
import { StoreConfig, buildStore } from "./factories/store.factory";

interface IState {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface IActions {
  reset: () => void;
  setUser: (data: IUser) => void;
  setAccessToken: (data: string) => void;
  setRefreshToken: (data: string) => void;
}

const initialState: IState = {
  accessToken: "",
  refreshToken: "",
  user: {} as IUser,
};

const config: StoreConfig<IState, IActions> = {
  name: "auth",
  storage: "local",
  initialState,
  actions: (set) => ({
    setAccessToken: (accessToken) => {
      set(() => ({ accessToken }));
      TokenUtil.setAccessToken(accessToken || "");
    },
    setRefreshToken: (refreshToken) => {
      set(() => ({ refreshToken }));
      TokenUtil.setRefreshToken(refreshToken || "");
    },
    setUser: (user) => {
      set(() => ({ user }));
      TokenUtil.setUserId(user.id || "");
    },
    reset: () => {
      set(() => initialState);
      TokenUtil.setAccessToken("");
    },
  }),
};

interface IStoreData extends IState, IActions {}
const builder = buildStoreProvider<IStoreData>(() => buildStore(config));

export const authStore = builder.useStoreApi;
export const AuthStoreProvider = builder.StoreProvider;
export const authStoragedData = StoreStateUtil.getState<IState>(config);
