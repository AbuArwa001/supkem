import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const isArabicEnabled = process.env.NEXT_PUBLIC_ENABLE_ARABIC_API === 'true';
  const pathname = request.nextUrl.pathname;
  
  // Paywall: If Arabic is disabled, bounce /ar traffic back to /en
  if (!isArabicEnabled && pathname.startsWith('/ar')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/ar/, '/en');
    return NextResponse.redirect(newUrl);
  }
  
  // Forward to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for API, static assets, and internal files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
