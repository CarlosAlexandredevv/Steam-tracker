import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { env } from '@/env';

async function isTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = env.JWT_SECRET;
  if (!secret) {
    return false;
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute =  pathname.startsWith('/auth');
  const token = request.cookies.get('access_token')?.value;
  const valid = await isTokenValid(token);

  if (!isPublicRoute) {
    if (!valid) {
      const res = NextResponse.redirect(new URL('/auth', request.url));
      if (token) res.cookies.delete('access_token');
      return res;
    }
  } else {
    if (valid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (token && !valid) {
      const res = NextResponse.next();
      res.cookies.delete('access_token');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};