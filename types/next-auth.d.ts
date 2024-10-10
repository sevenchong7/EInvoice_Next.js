import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: {
      loginId: string,
      permissions: string[]
      accessToken: string
      accessTokenExpiry: string
      refreshToken: string
      refreshTokenExpiry: string
      merchantId: number
      xAcceptLanguage: string
    } & UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // role: { id: number, name: string, permissions: string[] };
    loginId: string;
    accessToken: string;
    accessTokenExpiry: string;
    refreshToken: string;
    refreshTokenExpiry: string;
    merchantResponse: {
      merchantId: number;
      registrationNo: number;
    };
    merchantPermissResponse: {
      packageName: string;
      permission: string[];
      role: string;
    },
    xAcceptLanguage: string

  }
}