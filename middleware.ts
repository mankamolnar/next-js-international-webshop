import { NextRequest, NextResponse } from 'next/server'
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const PUBLIC_FILE = /\.(.*)$/

const protectedPages = [
  "/protected/",
  "/dashboard",
  "/admin/"
];

export async function middleware(req: NextRequestWithAuth) {
  console.log(req.cookies.get("next-auth.session-token"));

  if (protectedPages.includes(req.nextUrl.pathname)
        && !req.cookies.get("next-auth.session-token")) {
    
    return withAuth(req);
  }
  
  if (req.nextUrl.pathname.startsWith('/_next') 
      || req.nextUrl.pathname.includes('/api/') 
      || PUBLIC_FILE.test(req.nextUrl.pathname)
      || req.nextUrl.pathname.includes(".ico")) {

    return;
  }

  // console.log(req);
  // console.log(req.path);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en-EN'

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}