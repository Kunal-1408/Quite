'use server'

import { signIn } from "@/auth"
import AuthError  from "next-auth"
import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type State = {
  error?: string;
  success?: boolean;
} | null

// Modified to accept both state and formData
export async function authenticate(
  prevState: State,
  formData: FormData
): Promise<State> {
  const parsedCredentials = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsedCredentials.success) {
    return { error: 'Invalid credentials' }
  }

  try {
    await signIn('credentials', {
      ...parsedCredentials.data,
      redirect: false,
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

