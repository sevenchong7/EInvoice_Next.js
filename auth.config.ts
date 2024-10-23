// 'use server'
import { AuthError, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { decryptAES, encryptAES } from './lib/api';
import { login } from './lib/services/authService';
import { postRegenerateToken } from './lib/services/generalService';

class AuthErrorWithMsg extends AuthError {
  constructor(message: string) {
    super()
    this.message = message
  }
}

const authConfig = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? ''
    // }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {

        // call auth service and call login api
        // get user data
        const bodyData = {
          loginId: credentials.email,
          password: credentials.password
        };

        const loginUser = await login(bodyData);

        console.log("loginUser ", loginUser)
        if (!loginUser.status) {
          console.error("Invalid Cred");
          throw new AuthErrorWithMsg(JSON.stringify({ errors: loginUser.error.errors[0], status: false }))
        } else {
          // console.log('login User = ', loginUser)
          return loginUser.data

        }
      }

    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        // Merge multiple updates at once into the token
        token = {
          ...token, // Keep existing token values
          // accessToken: session.accessToken ?? token.accessToken,
          // accessTokenExpiry: session.accessTokenExpiry ?? token.accessTokenExpiry,
          // refreshToken: session.refreshToken ?? token.refreshToken,
          // refreshTokenExpiry: session.refreshTokenExpiry ?? token.refreshTokenExpiry,
          xAcceptLanguage: session.xAcceptLanguage ?? token.xAcceptLanguage, // Update xAcceptLanguage or keep the existing value
          merchantResponse: {
            ...token.merchantResponse, // Preserve the rest of the merchantResponse object
            merchantId: session.merchantId ?? token.merchantResponse.merchantId, // Update merchantId or keep the existing value
          },
          merchantPermissResponse: {
            ...token.merchantPermissResponse, // Preserve the rest of the merchantPermissResponse object
            permission: session.permissions ?? token.merchantPermissResponse.permission, // Update permissions or keep the existing value
          }
        };

        return token; // Return the updated token after all updates
      }

      if (user) {
        token = { ...token, ...user }
        console.log("First token ", token)
      }

      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        permissions: token.merchantPermissResponse.permission,
        accessToken: token.accessToken,
        accessTokenExpiry: token.accessTokenExpiry,
        refreshToken: token.refreshToken,
        refreshTokenExpiry: token.refreshTokenExpiry,
        merchantId: token.merchantResponse.merchantId,
        xAcceptLanguage: token.xAcceptLanguage,
        emailDisplay: token.emailDisplay
      }

      // console.log("Session ", session)
      return session;
    },
    // async signIn({ user }) {
    //   console.log(user)
    //   if (user?.error) {
    //     throw new Error(user?.error)
    //   }
    //   return true;
    // },
  },
  // secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
