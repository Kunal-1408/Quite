import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  
  if (req.nextUrl.pathname.startsWith('/CMS')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};
