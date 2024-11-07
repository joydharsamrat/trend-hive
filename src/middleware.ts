import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./actions/registerUser";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof RoleBasedRoutes;

const RoleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && RoleBasedRoutes[user?.role as Role]) {
    const routes = RoleBasedRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin",
    "/admin/:page*",
    "/user",
    "/user/:page*",
    "/login",
    "/register",
  ],
};
