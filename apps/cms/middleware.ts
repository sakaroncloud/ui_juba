import { NextRequest } from "next/server";
import { getSession } from "./lib/actions/session";
import { ALLOWED_ROLES } from "./lib/constant";
import { DEFAULT_LOGIN_REDIRECT, LOGGED_OUT_REDIRECT } from "@repo/ui/lib/routes";

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const session = await getSession()

  const isLoggedIn = session && ALLOWED_ROLES.CMS.includes(session.user.role)

  const isAuthRoute = nextUrl.pathname.includes("/auth")

  const isProfileRoute = nextUrl.pathname.includes("/profile/edit")


  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
  else {
    if (!isLoggedIn) {
      return Response.redirect(new URL(LOGGED_OUT_REDIRECT, nextUrl));
    }
    else {
      if (!session.user?.profile && !isProfileRoute) {
        return Response.redirect(new URL("/profile/edit", nextUrl));
      }
    }

  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
