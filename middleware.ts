import { NextRequest, NextResponse } from 'next/server'
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { JWTDecodeParams, decode } from 'next-auth/jwt';

const PUBLIC_FILE = /\.(.*)$/

const protectedPages = [
  {path: "/protected/", role: "CUSTOMER" }
];

const isProtected = (req: NextRequestWithAuth) : string | boolean => {
  for (const protectedPage of protectedPages) {
    if (protectedPage.path == req.nextUrl.pathname
        || (protectedPage.path.includes("**") && req.nextUrl.pathname.startsWith(protectedPage.path))) {
      
      return protectedPage.role;
    }
  }

  return false;
}

export async function middleware(req: NextRequestWithAuth) {

  const protectionRole = isProtected(req);

  if (protectionRole) {
    const tokenObject : JWTDecodeParams = {
      token: req.cookies.get("next-auth.session-token")?.value,
      secret: process.env.NEXTAUTH_SECRET ?? ""
    }

    if (!tokenObject.token) {
      return withAuth(req);
      
    } else {
      const token = await decode(tokenObject);

      if (protectionRole !== token.role) {
        return NextResponse.redirect(
          new URL('/auth/login', req.url)
        )
      }
    }

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