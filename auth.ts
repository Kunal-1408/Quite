import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getUser, verifyPassword } from '@/lib/auth'
import { authConfig } from './auth.config'

const credentialsSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            console.log('No credentials provided')
            return null
          }

          const parsedCredentials = credentialsSchema.safeParse(credentials)

          if (!parsedCredentials.success) {
            console.log('Invalid credentials format:', parsedCredentials.error)
            return null
          }

          const { email, password } = parsedCredentials.data
          
          const user = await getUser(email)
          
          if (!user) {
            console.log('User not found:', email)
            return null
          }
          
          const isValidPassword = await verifyPassword(password, user.password)
          
          if (!isValidPassword) {
            console.log('Invalid password for user:', email)
            return null
          }

          return {
            id: user.id,
            email: user.email,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
})

