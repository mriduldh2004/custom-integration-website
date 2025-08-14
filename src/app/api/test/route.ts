import { NextRequest, NextResponse } from 'next/server';
import { withAnalytics } from '@/lib/analytics-middleware';

async function GET() {
  // Simulate some processing time
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    message: 'API endpoint test successful',
    timestamp: new Date().toISOString(),
    method: 'GET',
    tracked: true,
    note: 'This API call is being tracked by Writesonic Analytics'
  });
}

async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return NextResponse.json({
      message: 'POST request processed successfully',
      receivedData: body,
      timestamp: new Date().toISOString(),
      method: 'POST',
      tracked: true
    });
  } catch {
    return NextResponse.json(
      { 
        error: 'Invalid JSON in request body',
        tracked: true 
      },
      { status: 400 }
    );
  }
}

// Wrap the handlers with analytics tracking
const wrappedGET = withAnalytics(GET);
const wrappedPOST = withAnalytics(POST);

export { wrappedGET as GET, wrappedPOST as POST };