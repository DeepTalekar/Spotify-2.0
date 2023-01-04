import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(
  request: NextRequest
): NextResponse | null | undefined {
  // * Token exist if user is logged in
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });

  // const url = request.nextUrl.clone();
  const url = request.nextUrl.clone();

  /**
   * * Allow the requests if the following is true
   * *  1 - The token exists
   * *  2 - Its a request for next-auth session & provider fetching
   */

  if (url.pathname.startsWith('/_next/') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  if (url.pathname.includes('/api/auth') || token !== null) {
    return NextResponse.next();
  }

  // * Redirect them to login if they don't have token AND are requesting a protected route
  if (token === null && url.pathname !== '/login') {
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  }
}
