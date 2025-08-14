import Link from "next/link";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Analytics Dashboard",
      description: "Real-time analytics visualization and reporting",
      price: "$29/month"
    },
    {
      id: 2,
      name: "AI Content Generator",
      description: "Generate high-quality content with AI assistance",
      price: "$49/month"
    },
    {
      id: 3,
      name: "SEO Optimizer",
      description: "Optimize your content for search engines",
      price: "$39/month"
    }
  ];

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            ← Back to Home
          </Link>
        </nav>

        <div className="space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our suite of AI-powered tools designed to enhance your digital presence and analytics.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {product.price}
                  </span>
                  <Link 
                    href={`/products/${product.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold mb-4 text-center">Analytics in Action</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Every page visit, including this one, is being tracked and sent to Writesonic Analytics.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Real-time</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Data Collection</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">Server-side</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tracking</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">AI-powered</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Analytics</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}