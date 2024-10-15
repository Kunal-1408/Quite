import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  console.log('Middleware called for path:', request.nextUrl.pathname)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  console.log('Token:', token ? 'exists' : 'does not exist')

  if (request.nextUrl.pathname.startsWith('/CMS')) {
    if (!token) {
      console.log('Redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    console.log('Allowing access to CMS')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/CMS/:path*'],
}