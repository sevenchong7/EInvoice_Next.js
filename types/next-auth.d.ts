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
    } & UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: { id: number, name: string, permissions: string[] };
    loginId: number;
    accessToken: string;
    accessTokenExpiry: string;
    refreshToken: string;
    refreshTokenExpiry: string;
    merchantResponse: {
      belongToMerchant: number;
      packageName: string;
      permissionSet: string[];
    }
  }
}