import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  features: string[];
}

const productData: Record<string, Product> = {
  "1": {
    id: 1,
    name: "Analytics Dashboard",
    description: "Real-time analytics visualization and reporting",
    longDescription: "Get comprehensive insights into your website traffic with our advanced analytics dashboard. Track user behavior, monitor performance metrics, and make data-driven decisions with beautiful visualizations and automated reports.",
    price: "$29/month",
    features: [
      "Real-time traffic monitoring",
      "Custom dashboard builder",
      "Advanced filtering and segmentation",
      "Automated report generation",
      "API access for custom integrations"
    ]
  },
  "2": {
    id: 2,
    name: "AI Content Generator",
    description: "Generate high-quality content with AI assistance",
    longDescription: "Leverage the power of AI to create engaging content for your website, blog, or marketing campaigns. Our advanced language models can help you write articles, product descriptions, social media posts, and more.",
    price: "$49/month",
    features: [
      "Multiple content types supported",
      "SEO-optimized content generation",
      "Brand voice customization",
      "Bulk content creation",
      "Multi-language support"
    ]
  },
  "3": {
    id: 3,
    name: "SEO Optimizer",
    description: "Optimize your content for search engines",
    longDescription: "Improve your search engine rankings with our comprehensive SEO optimization tools. Analyze your content, get actionable recommendations, and track your progress over time.",
    price: "$39/month",
    features: [
      "Keyword research and analysis",
      "On-page SEO recommendations",
      "Competitor analysis",
      "Rank tracking",
      "Technical SEO audits"
    ]
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const product = productData[id];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            Home
          </Link>
          <span className="text-gray-400">→</span>
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            Products
          </Link>
          <span className="text-gray-400">→</span>
          <span className="text-gray-600 dark:text-gray-400">{product.name}</span>
        </nav>

        <div className="space-y-8">
          <header>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {product.price}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
            </div>
          </header>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.longDescription}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Analytics Tracking Demo</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This page visit is being tracked with the following analytics data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>URL:</strong> /products/{id}
              </div>
              <div>
                <strong>Method:</strong> GET
              </div>
              <div>
                <strong>Page Type:</strong> Dynamic Route
              </div>
              <div>
                <strong>Product ID:</strong> {id}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}