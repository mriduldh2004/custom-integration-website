// Types for Writesonic Analytics Integration

export interface AnalyticsPayload {
  ip: string;                    // IP address of the request
  x_real_ip: string;            // X-Real-IP header value
  ua: string;                   // User agent of the request
  referrer: string;             // Referrer header value of the request
  country_code: string;         // Country code of the request
  url: string;                  // URL of the request
  method: string;               // HTTP method of the request
  x_forwarded_for: string;      // X-Forwarded-For header value
  response_status: string;      // HTTP status code of the response
}

export interface RequestData {
  ip: string;
  headers: Record<string, string | string[] | undefined>;
  originalUrl: string;
  method: string;
  statusCode: number;
  country?: string;
}

export interface AnalyticsConfig {
  apiKey: string;
  ingestionUrl: string;
  enableInDev: boolean;
}