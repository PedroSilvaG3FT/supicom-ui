export class CookieUtil {
  public static set(name: string, value: string, days?: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  }

  public static get<Data>(name: string): Data | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift() || "";

      try {
        return JSON.parse(cookieValue) as Data;
      } catch (e) {
        return cookieValue as Data;
      }
    }

    return null;
  }

  public static delete(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public static list() {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
    return cookies;
  }
}
