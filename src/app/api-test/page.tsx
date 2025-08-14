'use client';

import Link from "next/link";
import { useState } from "react";

export default function ApiTest() {
  const [getResponse, setGetResponse] = useState<{ status?: number; data?: unknown; error?: string } | null>(null);
  const [postResponse, setPostResponse] = useState<{ status?: number; data?: unknown; error?: string } | null>(null);
  const [loading, setLoading] = useState<{ get: boolean; post: boolean }>({
    get: false,
    post: false
  });

  const testGetEndpoint = async () => {
    setLoading(prev => ({ ...prev, get: true }));
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setGetResponse({ status: response.status, data });
    } catch (error) {
      setGetResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(prev => ({ ...prev, get: false }));
    }
  };

  const testPostEndpoint = async () => {
    setLoading(prev => ({ ...prev, post: true }));
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          message: 'Hello from client',
          timestamp: new Date().toISOString()
        })
      });
      const data = await response.json();
      setPostResponse({ status: response.status, data });
    } catch (error) {
      setPostResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(prev => ({ ...prev, post: false }));
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            ← Back to Home
          </Link>
        </nav>

        <div className="space-y-8">
          <header>
            <h1 className="text-4xl font-bold mb-4">API Analytics Testing</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Test API endpoint tracking with Writesonic Analytics
            </p>
          </header>

          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
              How API Tracking Works
            </h2>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              API routes wrapped with the <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">withAnalytics</code> higher-order function 
              automatically send analytics data to Writesonic, including request method, response status, and timing information.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GET Request Test */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">GET Request Test</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Test a simple GET request to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/api/test</code>
              </p>
              
              <button
                onClick={testGetEndpoint}
                disabled={loading.get}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors mb-4"
              >
                {loading.get ? 'Testing...' : 'Test GET Endpoint'}
              </button>

              {getResponse && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(getResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* POST Request Test */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">POST Request Test</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Test a POST request with JSON data to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/api/test</code>
              </p>
              
              <button
                onClick={testPostEndpoint}
                disabled={loading.post}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors mb-4"
              >
                {loading.post ? 'Testing...' : 'Test POST Endpoint'}
              </button>

              {postResponse && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(postResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              What Gets Tracked
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              Each API call generates analytics data including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>Request IP address and headers</li>
              <li>HTTP method (GET, POST, etc.)</li>
              <li>API endpoint URL</li>
              <li>Response status code</li>
              <li>Geographic information (if available)</li>
              <li>User agent and referrer</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}