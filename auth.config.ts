import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
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

        const response = await fetch("https://c385-121-121-106-195.ngrok-free.app/api/loginuser/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            loginId: credentials.email,
            password: "123qwe"
          })
        })
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

        const data = {
          "loginId": "ben@admin.com",
          "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXJjaGFudDNAZ21haWwuY29tIiwiaWF0IjoxNzIwMTQ0NjE5LCJleHAiOjE3MjAxNDQ2Nzl9.sc_9p3bxxtdLYToq9WneDcH1fRWIf5DYEZTMa9U4qew",
          "accessTokenExpiry": "60000",
          "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXJjaGFudDNAZ21haWwuY29tIiwiaWF0IjoxNzIwMTQ0NjE5LCJleHAiOjE3MjAxNDQ3MDZ9.ZSZHBYgbRcVkhIQ4cUtBqa0UI5kgzzeQIqYeG_43XT8",
          "refreshTokenExpiry": "86400",
          "merchantResponse": {
            "belongToMerchant": 3,
            "packageName": "packageC",
            "permissionSet": [
              "dashboard.access",
              "dashboard.all",
              "dashboard.download",
              "employee.access",
              "employee.all",
              "profile.access",
              "profile.all",
              "user.access",
              "user.all",
              "createMerchant.all",
              "document.access",
              "document.all",
              "subscription.all",
            ],
            "role": "ADMIN"
          }
        };
        if (data) {
          // Any object returned will be saved in `user` property of the JWT
          return data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
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
        permissions: token.merchantResponse.permissionSet,
        accessToken: token.accessToken,
        accessTokenExpiry: token.accessTokenExpiry,
        // refreshToken: token.refreshToken,
        // refreshTokenExpiry: token.refreshTokenExpiry,
      }

      // console.log("Session ", session)
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
