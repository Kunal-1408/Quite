import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }) {
      const isLoggedIn = !!auth?.user
      const isCMSRoute = nextUrl.pathname.startsWith('/CMS')
      
      if (isCMSRoute) {
        if (isLoggedIn) return true
        return false
      }
      
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig

