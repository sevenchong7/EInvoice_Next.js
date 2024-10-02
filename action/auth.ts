"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth"
// import { signIn } from "next-auth/react"

const DEFAULT_LOGIN_REDIRECT = '/dashboard';

export const login = async (email: string, password: string, callbackUrl?: string | null) => {
    try {
        await signIn('credentials', {
            email: email,
            password: password,
            redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
            // redirect: false
        })
        // await signIn("phone", { email, password, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT })
    } catch (error) {
        console.error("Cred login: ", error)
        if (error instanceof AuthError) {
            return { error: "error", message: error.message, status: 401 }
        }

        throw error
    }
}