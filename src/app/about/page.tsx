import Link from "next/link";

export default function About() {
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
            <h1 className="text-4xl font-bold mb-4">About This Analytics Demo</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Learn about the Writesonic Analytics integration implementation
            </p>
          </header>

          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <p>
                              This Next.js application automatically tracks all page visits and sends analytics data to 
              Writesonic&apos;s ingestion endpoint. Here&apos;s what gets tracked:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>IP Address:</strong> Client IP (respecting proxies and load balancers)</li>
                <li><strong>User Agent:</strong> Browser and device information</li>
                <li><strong>Referrer:</strong> Previous page or external site</li>
                <li><strong>URL:</strong> Current page path and query parameters</li>
                <li><strong>HTTP Method:</strong> GET, POST, etc.</li>
                <li><strong>Response Status:</strong> 200, 404, 500, etc.</li>
                <li><strong>Country Code:</strong> Geographic location (if available)</li>
                <li><strong>Headers:</strong> X-Real-IP, X-Forwarded-For, etc.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Middleware</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically intercepts all requests and responses to collect analytics data.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Analytics Client</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handles data transformation and HTTP requests to Writesonic&apos;s API.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Error Handling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gracefully handles failures without affecting your application&apos;s performance.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Environment Config</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configurable through environment variables for different deployment environments.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              Setup Required
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              To enable analytics tracking, you need to configure your Writesonic API key:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
              <li>Go to the AI Traffic Analytics page on Writesonic</li>
              <li>Click on &quot;Custom Integration&quot;</li>
              <li>Enter your website domain</li>
              <li>Copy the provided API key</li>
              <li>Set <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">WRITESONIC_API_KEY</code> in your .env.local file</li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}