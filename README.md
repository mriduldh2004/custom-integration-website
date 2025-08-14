# Writesonic Analytics Integration - Next.js Demo

A Next.js application demonstrating server-side analytics integration with [Writesonic's AI Traffic Analytics](https://writesonic.com) ingestion API. This implementation provides comprehensive tracking of page visits, API calls, and user interactions.

## ✨ Features

- **Server-side Analytics**: Automatic tracking of all page visits and API calls
- **Middleware Integration**: Seamless request/response interception
- **Error Handling**: Graceful failure handling that doesn't affect app performance
- **Environment Configuration**: Easy setup with environment variables
- **TypeScript Support**: Full type safety for analytics data
- **Demo Pages**: Interactive examples to test the integration

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Copy the environment example file and configure your Writesonic API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Writesonic credentials:

```env
# Get these from Writesonic AI Traffic Analytics > Custom Integration
WRITESONIC_API_KEY=your_api_key_here
WRITESONIC_INGESTION_URL=https://ingestion.writesonic.com/api/v1/analytics/ingest/

# Optional: Enable analytics in development (default: false)
ENABLE_ANALYTICS_IN_DEV=false
```

### 3. Get Your Writesonic API Key

1. Go to [Writesonic AI Traffic Analytics](https://writesonic.com)
2. Click on **"Custom Integration"**
3. Enter your website domain and click **"Continue"**
4. Copy the provided API key and endpoint URL
5. Update your `.env.local` file with the credentials

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 How It Works

### Analytics Data Collection

The application automatically tracks:

- **Page Views**: All route navigation and page loads
- **API Calls**: Server-side API endpoint interactions
- **Request Data**: IP addresses, user agents, referrers
- **Response Data**: HTTP status codes, response times
- **Geographic Data**: Country codes (when available)
- **Headers**: X-Real-IP, X-Forwarded-For, etc.

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   User Request  │───▶│   Middleware     │───▶│  Analytics Client   │
│                 │    │   (middleware.ts)│    │                     │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                │                         │
                                ▼                         ▼
                       ┌──────────────────┐    ┌─────────────────────┐
                       │   Next.js App    │    │  Writesonic API     │
                       │   (pages/api)    │    │   (ingestion)       │
                       └──────────────────┘    └─────────────────────┘
```

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page with integration status
│   ├── about/                    # Demo about page
│   ├── products/                 # Demo products listing
│   │   └── [id]/                 # Dynamic product detail pages
│   ├── api-test/                 # API testing interface
│   └── api/
│       └── test/                 # Demo API endpoints
├── lib/
│   ├── analytics-client.ts       # Writesonic API client
│   └── analytics-middleware.ts   # Request tracking logic
├── types/
│   └── analytics.ts              # TypeScript type definitions
└── middleware.ts                 # Next.js middleware integration
```

## 🧪 Testing the Integration

### 1. Page Navigation Testing

Visit these demo pages to test analytics tracking:

- **Home**: [http://localhost:3000](http://localhost:3000) - Main dashboard
- **About**: [http://localhost:3000/about](http://localhost:3000/about) - Integration details
- **Products**: [http://localhost:3000/products](http://localhost:3000/products) - Product listing
- **Product Details**: [http://localhost:3000/products/1](http://localhost:3000/products/1) - Dynamic routes

### 2. API Endpoint Testing

Use the built-in API testing interface:

- **API Test Page**: [http://localhost:3000/api-test](http://localhost:3000/api-test)
- Test both GET and POST requests to `/api/test`
- View real-time response data and status codes

### 3. Verify Analytics Data

1. Check your browser's developer console for analytics logs
2. Monitor your Writesonic dashboard for incoming data
3. Use the "Verify Connection" feature in Writesonic

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `WRITESONIC_API_KEY` | Your Writesonic API key | - | Yes |
| `WRITESONIC_INGESTION_URL` | Analytics ingestion endpoint | `https://ingestion.writesonic.com/api/v1/analytics/ingest/` | No |
| `ENABLE_ANALYTICS_IN_DEV` | Enable tracking in development | `false` | No |

### Middleware Configuration

The middleware is configured to track most routes while excluding:

- Static files (`_next/static`, images)
- Analytics API endpoints (to avoid self-tracking)
- Favicon and public assets

Modify `src/middleware.ts` to customize which routes are tracked.

## 🛠️ Customization

### Adding Custom Analytics Data

Extend the analytics payload by modifying the `transformRequestData` method in `analytics-client.ts`:

```typescript
private transformRequestData(requestData: RequestData): AnalyticsPayload {
  return {
    // ... existing fields
    custom_field: 'your_custom_data',
    user_id: this.extractUserId(requestData),
  };
}
```

### API Route Integration

Wrap your API routes with analytics tracking:

```typescript
import { withAnalytics } from '@/lib/analytics-middleware';

async function GET(request: NextRequest) {
  // Your API logic here
  return NextResponse.json({ data: 'example' });
}

export { withAnalytics(GET) as GET };
```

## 🚀 Deployment

### Environment Setup

1. **Production Environment Variables**: Ensure all required environment variables are set in your deployment platform
2. **API Key Security**: Never expose your Writesonic API key in client-side code
3. **Analytics Enablement**: Set `ENABLE_ANALYTICS_IN_DEV=false` for production unless testing

### Deployment Platforms

#### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/writesonic-analytics-nextjs)

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically

#### Other Platforms

- **Netlify**: Use `npm run build` and deploy the `dist` folder
- **Railway**: Connect repository and set environment variables
- **AWS/Google Cloud**: Use containerization with proper environment configuration

## 🔍 Troubleshooting

### Common Issues

1. **No Analytics Data**
   - Verify API key is correctly set in `.env.local`
   - Check console for error messages
   - Ensure `ENABLE_ANALYTICS_IN_DEV=true` for local testing

2. **401 Unauthorized**
   - Double-check your Writesonic API key
   - Verify the API key is active in your Writesonic account

3. **Network Errors**
   - Ensure your server can make outbound HTTPS requests
   - Check firewall settings for the ingestion endpoint

### Debug Mode

Enable detailed logging by checking the browser console and server logs. All analytics errors are logged without affecting application performance.

## 📝 API Reference

### Analytics Payload Format

```typescript
interface AnalyticsPayload {
  ip: string;                    // Client IP address
  x_real_ip: string;            // X-Real-IP header
  ua: string;                   // User agent
  referrer: string;             // Referrer URL
  country_code: string;         // ISO country code
  url: string;                  // Request URL
  method: string;               // HTTP method
  x_forwarded_for: string;      // X-Forwarded-For header
  response_status: string;      // HTTP status code
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Writesonic Documentation](https://writesonic.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📞 Support

For questions or issues:

- Create an issue in this repository
- Contact Writesonic support: support@writesonic.com
- Check the [Troubleshooting and FAQs](https://writesonic.com/docs/troubleshooting) page
