import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token'); // Sesuaikan dengan auth Anda
  
  // Jika akses dashboard tapi belum login
  if (request.nextUrl.pathname.startsWith('/') && 
      !request.nextUrl.pathname.startsWith('/login') && 
      !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Jika sudah login tapi akses /login, redirect ke dashboard
  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};