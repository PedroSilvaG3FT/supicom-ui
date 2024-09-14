"use client";

import { LocalStorageUtil } from "./local-storage.util";
import { SessionStorageUtil } from "./session-storage.util";
import {
  STORE_NAME_PREFIX,
  StoreConfig,
  StoreStorage,
} from "../factories/store.factory";

export class StoreStateUtil {
  public static getStorage(name?: StoreStorage) {
    if (!name) return null;

    const storegeDisct = {
      local: LocalStorageUtil,
      session: SessionStorageUtil,
    };

    return storegeDisct[name];
  }

  public static getState<State>(config: StoreConfig<State, any>) {
    const _defaultData = config.initialState as State;
    const _storage = StoreStateUtil.getStorage(config.storage);

    if (!_storage || !config.name) return _defaultData;

    const storaged = _storage.get(`${STORE_NAME_PREFIX}:${config.name}`);

    if (storaged) {
      try {
        return JSON.parse(storaged) as State;
      } catch (error) {
        console.error(
          `[app]: an error occurred while converting to object ${config}`
        );
        return _defaultData;
      }
    } else return _defaultData;
  }
}
