import { AnalyticsPayload, RequestData, AnalyticsConfig } from '@/types/analytics';

export class WritesonicAnalyticsClient {
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Send analytics data to Writesonic ingestion endpoint
   */
  async sendAnalytics(requestData: RequestData): Promise<void> {
    // Skip analytics in development unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && !this.config.enableInDev) {
      console.log('Analytics disabled in development mode');
      return;
    }

    if (!this.config.apiKey || this.config.apiKey === 'your_api_key_here') {
      console.warn('Writesonic API key not configured');
      return;
    }

    try {
      const payload = this.transformRequestData(requestData);

      // Optional debug logging (no secrets)
      if (process.env.WRITESONIC_LOG_DEBUG === 'true') {
        console.log('Writesonic analytics payload', {
          ip: payload.ip,
          ua: payload.ua,
          url: payload.url,
          method: payload.method,
          response_status: payload.response_status,
        });
      }

      const response = await fetch(this.config.ingestionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch {}
        console.error('Writesonic ingestion failed', {
          status: response.status,
          body: errorBody,
        });

        // Retry once with only required fields on 5xx
        if (response.status >= 500) {
          const minimalPayload = this.buildMinimalPayload(payload);
          if (process.env.WRITESONIC_LOG_DEBUG === 'true') {
            console.log('Retrying with minimal payload', minimalPayload);
          }
          try {
            const retryResponse = await fetch(this.config.ingestionUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
              },
              body: JSON.stringify(minimalPayload),
            });
            if (!retryResponse.ok) {
              let retryBody = '';
              try {
                retryBody = await retryResponse.text();
              } catch {}
              console.error('Writesonic minimal ingestion failed', {
                status: retryResponse.status,
                body: retryBody,
              });
            }
          } catch (retryError) {
            console.error('Writesonic minimal ingestion network error', retryError);
          }
        }
        return;
      }

      console.log('Analytics sent successfully');
    } catch (error) {
      console.error('Error sending analytics:', error);
      // Don't throw the error to avoid disrupting the main application flow
    }
  }

  /**
   * Transform request data into the format expected by Writesonic
   */
  private transformRequestData(requestData: RequestData): AnalyticsPayload {
    const headers = requestData.headers;
    const xForwardedFor = this.getHeaderValue(headers['x-forwarded-for']);
    const firstForwardedIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '';
    const xRealIp = this.getHeaderValue(headers['x-real-ip']);
    const inferredIp = requestData.ip || firstForwardedIp || xRealIp || '';

    const userAgent = this.getHeaderValue(headers['user-agent']) || 'unknown';
    const originalUrl = requestData.originalUrl || '/';
    const method = requestData.method || 'GET';

    return {
      ip: inferredIp || '0.0.0.0',
      x_real_ip: xRealIp || '',
      ua: userAgent,
      referrer: this.getHeaderValue(headers['referer']) || this.getHeaderValue(headers['referrer']) || '',
      country_code: requestData.country || this.getHeaderValue(headers['cf-ipcountry']) || '',
      url: originalUrl,
      method,
      x_forwarded_for: xForwardedFor || '',
      response_status: requestData.statusCode.toString(),
    };
  }

  /**
   * Helper to extract string value from header (which can be string, string[], or undefined)
   */
  private getHeaderValue(header: string | string[] | undefined): string {
    if (typeof header === 'string') {
      return header;
    }
    if (Array.isArray(header) && header.length > 0) {
      return header[0];
    }
    return '';
  }

  private buildMinimalPayload(payload: AnalyticsPayload): Pick<
    AnalyticsPayload,
    'ip' | 'ua' | 'url' | 'method' | 'response_status'
  > {
    return {
      ip: payload.ip,
      ua: payload.ua,
      url: payload.url,
      method: payload.method,
      response_status: payload.response_status,
    };
  }
}

// Singleton instance
let analyticsClient: WritesonicAnalyticsClient | null = null;

export function getAnalyticsClient(): WritesonicAnalyticsClient {
  if (!analyticsClient) {
    const config: AnalyticsConfig = {
      apiKey: process.env.WRITESONIC_API_KEY || '',
      ingestionUrl: process.env.WRITESONIC_INGESTION_URL || '',
      enableInDev: true,
    };
    
    analyticsClient = new WritesonicAnalyticsClient(config);
  }
  
  return analyticsClient;
}