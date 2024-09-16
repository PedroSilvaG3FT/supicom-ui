import { CookieUtil } from "./cookie.utl";

export class TokenUtil {
  public static readonly USER_ID_KEY = "@app:user_id";
  public static readonly ACCESS_TOKEN_KEY = "@app:access_token";
  public static readonly REFRESH_TOKEN_KEY = "@app:refresh_token";

  public static isExpired(timestamp: number): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= timestamp;
  }

  public static setAccessToken(value: string) {
    CookieUtil.set(TokenUtil.ACCESS_TOKEN_KEY, value);
  }

  public static setRefreshToken(value: string) {
    CookieUtil.set(TokenUtil.REFRESH_TOKEN_KEY, value);
  }

  public static setUserId(value: string) {
    CookieUtil.set(TokenUtil.USER_ID_KEY, value);
  }

  public static getAccessToken(): string {
    const token = CookieUtil.get<string>(TokenUtil.ACCESS_TOKEN_KEY);
    return token || "";
  }

  public static getRefreshToken(): string {
    const token = CookieUtil.get<string>(TokenUtil.REFRESH_TOKEN_KEY);
    return token || "";
  }

  public static getUserId(): string {
    const token = CookieUtil.get<string>(TokenUtil.USER_ID_KEY);
    return token || "";
  }

  public static decodeJWT(token: string): object | null {
    const parts = token.split(".");

    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decodedPayload;
  }
}
