import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/server"
import { signIn } from "next-auth/react"

export const authOptions = {
    // Configure one or more authentication providers
    pages: {
      signIn: '/signin'
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {

        },
        async authorize(credentials, req): Promise<any> {
          return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
            .then(userCredential => {
              if (userCredential.user) {
                return userCredential.user;
              } 
              return null;
            })
            .catch(error => (console.log(error)))
          }
        })
      ],
    secret: process.env.NEXTAUTH_SECRET,
    // callbacks: {
    //   async signIn({user, account, profile, email, credentials}) {
    //     return true
    //   }
    // }
      // ...add more providers here 
  }
  

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }