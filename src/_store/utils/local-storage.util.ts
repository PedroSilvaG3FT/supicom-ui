import { isClient } from "@/_shared/utils/client.util";

export class LocalStorageUtil {
  public static get(key: string) {
    return isClient && localStorage?.getItem(key);
  }

  public static set(key: string, value: any) {
    if (isClient) localStorage?.setItem(key, value);
  }

  public static remove(key: string) {
    if (isClient) localStorage?.removeItem(key);
  }
}
