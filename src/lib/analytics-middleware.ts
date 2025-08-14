import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsClient } from './analytics-client';
import { RequestData } from '@/types/analytics';

/**
 * Extract client IP address from request, considering proxies and load balancers
 */
function getClientIP(request: NextRequest): string {
  // Check various headers that might contain the real IP
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (xRealIP) {
    return xRealIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback - in Next.js 15, there's no direct IP property for middleware
  // Return empty string to keep payload valid and optional
  return '';
}

/**
 * Convert NextRequest headers to a plain object
 */
function headersToObject(headers: Headers): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Analytics middleware for Next.js App Router
 * This should be called in your middleware.ts file
 */
export async function analyticsMiddleware(request: NextRequest, response: NextResponse) {
  try {
    const analyticsClient = getAnalyticsClient();
    
    // Prepare request data
    const requestData: RequestData = {
      ip: getClientIP(request),
      headers: headersToObject(request.headers),
      originalUrl: request.nextUrl.pathname + request.nextUrl.search,
      method: request.method,
      statusCode: response.status,
      country: request.headers.get('cf-ipcountry') || undefined, // Cloudflare country code
    };
    
    // Send analytics asynchronously to avoid blocking the response
    Promise.resolve().then(() => {
      analyticsClient.sendAnalytics(requestData);
    });
    
  } catch (error) {
    console.error('Analytics middleware error:', error);
    // Don't let analytics errors affect the main application
  }
}

/**
 * Higher-order function to wrap API route handlers with analytics
 */
export function withAnalytics<T extends unknown[]>(
  handler: (...args: T) => Promise<Response> | Response
) {
  return async (...args: T): Promise<Response> => {
    const response = await handler(...args);
    
    // For API routes, we need to extract request info differently
    if (args.length > 0 && args[0] && typeof args[0] === 'object' && 'headers' in args[0]) {
      const request = args[0] as NextRequest;
      
      try {
        const analyticsClient = getAnalyticsClient();
        
        const requestData: RequestData = {
          ip: getClientIP(request),
          headers: headersToObject(request.headers),
          originalUrl: request.nextUrl.pathname + request.nextUrl.search,
          method: request.method,
          statusCode: response.status,
          country: request.headers.get('cf-ipcountry') || undefined,
        };
        
        // Send analytics asynchronously
        Promise.resolve().then(() => {
          analyticsClient.sendAnalytics(requestData);
        });
        
      } catch (error) {
        console.error('API analytics error:', error);
      }
    }
    
    return response;
  };
}