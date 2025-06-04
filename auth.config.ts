// 'use server'
import { AuthError, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { decryptAES, encryptAES } from './lib/api';
import { login } from './lib/services/authService';
import { redirect } from 'next/navigation';
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
        // const bodyData = {
        //   loginId: credentials.email,
        //   password: credentials.password
        // };

        // const loginUser = await login(bodyData);

        // console.log("loginUser ", loginUser)
        // if (!loginUser.status) {
        //   console.error("Invalid Cred");
        //   throw new AuthErrorWithMsg(JSON.stringify({ errors: loginUser.error.errors[0], status: false }))
        // } else {
        //   // console.log('login User = ', loginUser)
        //   return loginUser.data

        // }

        const validEmail = "test@gmail.com";
        const validPassword = "abc123";

        if (credentials.email === validEmail && credentials.password === validPassword) {

          const loginUser = {
            status: true,
            error: {
              errors: []
            },
            data: {
              loginId: "test@gmail.com",
              permissions: ["*"],
              accessToken: "abc",
              accessTokenExpiry: "abc",
              refreshToken: "abc",
              refreshTokenExpiry: "abc",
              merchantId: 1,
              xAcceptLanguage: "en",
              emailDisplay: "test@gmail.com",
            }
          };

          return loginUser
        } else {
          throw new AuthErrorWithMsg(
            JSON.stringify({ errors: ["Invalid credentials"], status: false })
          );
        }
      }

    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const currentDate = new Date();

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
            // merchantId: session.merchantId ?? token.merchantResponse.merchantId, // Update merchantId or keep the existing value
          },
          merchantPermissResponse: {
            ...token.merchantPermissResponse, // Preserve the rest of the merchantPermissResponse object
            // permission: session.permissions ?? token.merchantPermissResponse.permission, // Update permissions or keep the existing value
          },
          emailDisplay: session.emailDisplay ?? token.emailDisplay
        };

        return token; // Return the updated token after all updates
      }

      if (user) {
        token = { ...token, ...user }
        console.log("First token ", token)
      }

      const accessTokenExpiryDate = new Date(token.accessTokenExpiry);
      const refreshTokenExpiryDate = new Date(token.refreshTokenExpiry);

      if (currentDate > accessTokenExpiryDate) {
        console.log('[CheckTokenExpiry] Access token expired, attempting to refresh.');
        if (currentDate > refreshTokenExpiryDate) {
          console.log('[CheckTokenExpiry] Refresh token also expired.');
          return token;
        } else {
          try {
            const refreshTokenParam = { "refreshToken": token.refreshToken }
            const refreshedToken = await postRegenerateToken(refreshTokenParam);
            console.log('[CheckTokenExpiry] Refresh token is valid. Updating session.');
            token = {
              ...token,
              accessToken: refreshedToken.accessToken,
              accessTokenExpiry: refreshedToken.accessTokenExpiry,
              refreshToken: refreshedToken.refreshToken,
              refreshTokenExpiry: refreshedToken.refreshTokenExpiry,
            }
            console.log('[CheckTokenExpiry] Updated session tokens successfully.');
            return token;
          } catch (error) {
            console.log('[CheckTokenExpiry] refresh Access Token error = .', error);
          }
        }
      } else {
        console.log('[CheckTokenExpiry] Access token is still valid.');
      }

      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        permissions: ["*"],
        // permissions: token.merchantPermissResponse.permission,
        accessToken: token.accessToken,
        accessTokenExpiry: token.accessTokenExpiry,
        refreshToken: token.refreshToken,
        refreshTokenExpiry: token.refreshTokenExpiry,
        merchantId: 1,
        // merchantId: token.merchantResponse.merchantId,
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
