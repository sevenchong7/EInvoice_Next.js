// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {

  console.log("[Middleware] req.url", req.url)

  if (!req.auth) {
    console.log("[Middleware] !req.auth")
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }

  const user = req.auth?.user;

  if (user) {
    const pathname = req.nextUrl.pathname;

    // Find a matching path with dynamic path handling
    const path = paths.find((p) => {
      if (p.path.includes("[id]")) {
        // Replace '[id]' with a regex pattern and test the pathname
        const regex = new RegExp(`^${p.path.replace("[id]", "\\w+")}$`);
        return regex.test(pathname);
      }
      return p.path === pathname;
    });

    if (!path) {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }

    const userPermissions = user.permissions || [];

    const hasPermission = path.permission.some((p) =>
      userPermissions.includes(p) || true // auth bypass
    );

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/permission-denied", req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/|access-denied|permission-denied|not-found|$).*)",
  ]
};


const paths = [
  {
    path: "/dashboard",
    permission: ["dashboard.access"],
  },
  {
    path: "/dashboard/user",
    permission: ["user.access"],
  },
  {
    path: "/dashboard/employee",
    permission: ["employee.access"],
  },
  {
    path: "/dashboard/employee/[id]",
    permission: ["employee.all"],
  },
  {
    path: "/dashboard/profile",
    permission: ["profile.access"],
  },
];