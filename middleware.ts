// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import path from 'path';

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
    console.log("user ", user)
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
      userPermissions.includes(p)
    );

    if (!hasPermission) {
      return NextResponse.redirect(new URL("/permission-denied", req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/|access-denied|permission-denied|register|forgetPassword|resetPassword|activeAccount|close|not-found|$).*)",
  ]
};


const paths = [
  {
    path: "/dashboard",
    permission: ['dashboard.read'],
  },
  {
    path: "/dashboard/user",
    permission: ['userList.read', 'roleList.read', 'userList.su.read', 'merchantList.su.read', 'roleList.su.read', 'merchantCreate.su.create'],
  },
  {
    path: "/dashboard/document",
    permission: ['docCreate.create'],
  },
  {
    path: "/dashboard/document/createDocument",
    permission: ['docCreate.create', 'docCreate.createMyFav'],
  },
  {
    path: "/dashboard/document/createDocument/documentDownload",
    permission: ['docCreate.create', 'docCreate.createMyFav'],
  },
  {
    path: "/dashboard/profile",
    permission: ['profile.read'],
  },
  {
    path: "/dashboard/user/createMerchant",
    permission: ['merchantCreate.su.create'],
  },
  {
    path: "/dashboard/user/userListing",
    permission: ['userList.read', 'userList.create', 'userList.updateStatus', 'userList.update', 'userList.delete', 'userList.su.read'],
  },
  {
    path: "/dashboard/user/merchantListing",
    permission: ['merchantList.read', 'merchantList.update', 'merchantList.su.read', 'merchantList.su.update'],
  },
  {
    path: "/dashboard/user/roleListing",
    permission: ['roleList.read', 'roleList.create', 'roleList.update', 'roleList.su.read', 'roleList.su.create'],
  },
  {
    path: "/dashboard/user/userListing/[id]",
    permission: ['roleList.read', 'roleList.create', 'roleList.update', 'userList.su.read'],
  },
  {
    path: "/dashboard/profile/subscription",
    permission: ['subscription.read'],
  },
  {
    path: "/dashboard/profile/subscription/information",
    permission: ['subscription.update'],
  },
  {
    path: "/dashboard/profile/subscription/payment",
    permission: ['subscription.update'],
  },
  {
    path: "/dashboard/profile/subscription/payment/information",
    permission: ['subscription.update'],
  },
  {
    path: "/dashboard/updatePassword",
    permission: ["updatePassword.update"],
  },
  {
    path: "/dashboard/subscriptionList",
    permission: ["subscriptionList.read"]
  }
];