import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
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