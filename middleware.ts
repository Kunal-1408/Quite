import NextAuth from 'next-auth'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    '/CMS/:path*',
    '/api/cms/:path*',
  ]
}

