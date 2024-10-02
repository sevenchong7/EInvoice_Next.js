import { AuthError, NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { decryptAES, encryptAES } from './lib/api';
import { login } from './lib/services/authService';

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
        }

        return loginUser.data
        // const data = await response.json();
        // console.log("response ", data)

        // const a ={
        //   loginId: 'merchant3@gmail.com',
        //   accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXJjaGFudDNAZ21haWwuY29tIiwiaWF0IjoxNzE3NjU2NjU5LCJleHAiOjE3MTc2NTY3MTl9.T8fjdVydmO8Deph70JPwL4nRkjh3GGuDRr4VJ-uSHuo',
        //   accessTokenExpiry: '60000',
        //   refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXJjaGFudDNAZ21haWwuY29tIiwiaWF0IjoxNzE3NjU2NjU5LCJleHAiOjE3MTc2NTY3NDZ9.a-8kgb6ix6MvJhqw4YbxfaVgGvVcqskqnuYmBCDdfak',
        //   refreshTokenExpiry: '86400',
        //   merchantResponse: {
        //     belongToMerchant: 3,
        //     packageName: 'packageC',
        //     permissionSet: [
        //       'dashboard.access',
        //       'dashboard.all',
        //       'dashboard.download',
        //       'employee.access',
        //       'employee.all',
        //       'profile.access',
        //       'profile.all',
        //       'user.access',
        //       'user.all'
        //     ],
        //     permissionSet2: '["dashboard.all", "dashboard.access", "dashboard.download", "employee.all", "employee.access", "user.all", "user.access", "profile.all", "profile.access"]',
        //     role: 'ADMIN'
        //   }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  callbacks: {
    jwt({ token, user }) {
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
        merchantId: token.merchantResponse.merchantId
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
