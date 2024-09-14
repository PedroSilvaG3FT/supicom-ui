import { isClient } from "@/_shared/utils/client.util";

export class SessionStorageUtil {
  public static get(key: string) {
    return isClient && sessionStorage?.getItem(key);
  }

  public static set(key: string, value: any) {
    if (isClient) sessionStorage?.setItem(key, value);
  }

  public static remove(key: string) {
    if (isClient) sessionStorage?.removeItem(key);
  }
}
