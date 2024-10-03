import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TokenUtil } from "./_shared/utils/token.util";

const handlerRouteGuard = (req: NextRequest) => {
  const protectedRoutes = ["/admin"];

  const rootPath = "/";
  const currentPathName = req.nextUrl.pathname;
  const accessToken = req.cookies.get(TokenUtil.ACCESS_TOKEN_KEY)?.value || "";

  const isRootPath = currentPathName === rootPath;
  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPathName.startsWith(route)
  );

  if (!isRootPath && !accessToken && isProtectedRoute) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
};

export default function middleware(req: NextRequest) {
  return handlerRouteGuard(req);
}
