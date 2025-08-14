import { NextRequest, NextResponse } from 'next/server';
import { analyticsMiddleware } from '@/lib/analytics-middleware';

export async function middleware(request: NextRequest) {
  // Let the request proceed normally
  const response = NextResponse.next();
  
  // Track analytics after the response is ready
  try {
    await analyticsMiddleware(request, response);
  } catch (error) {
    console.error('Middleware analytics error:', error);
    // Don't let analytics errors affect the request
  }
  
  return response;
}

// Configure which paths should be tracked
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/analytics (avoid tracking our own analytics endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api/analytics|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};