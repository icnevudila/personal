import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development, design, and technology',
}

// Mock blog posts - in a real app, these would be loaded from MDX files
const blogPosts = [
  {
    title: 'Building Modern Web Applications with Next.js 15',
    excerpt: 'Explore the latest features in Next.js 15 and how they can improve your development workflow and application performance.',
    date: '2024-01-15',
    readTime: '5 min read',
    slug: 'nextjs-15-modern-web-applications',
    category: 'Development',
  },
  {
    title: 'The Art of UI/UX Design: Creating User-Centered Experiences',
    excerpt: 'Learn the fundamental principles of user experience design and how to create interfaces that users love.',
    date: '2024-01-10',
    readTime: '8 min read',
    slug: 'ui-ux-design-user-centered-experiences',
    category: 'Design',
  },
  {
    title: 'TypeScript Best Practices for React Developers',
    excerpt: 'Discover advanced TypeScript patterns and best practices that will make your React code more maintainable and type-safe.',
    date: '2024-01-05',
    readTime: '6 min read',
    slug: 'typescript-best-practices-react',
    category: 'Development',
  },
  {
    title: 'Optimizing Web Performance: A Complete Guide',
    excerpt: 'Comprehensive strategies for improving your website\'s performance, from Core Web Vitals to advanced optimization techniques.',
    date: '2024-01-01',
    readTime: '10 min read',
    slug: 'web-performance-optimization-guide',
    category: 'Performance',
  },
]

const getCategoryColor = (category: string) => {
  const colors = {
    Development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Performance: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container-custom py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            My <span className="text-primary-500">Blog</span>
          </h1>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 group cursor-pointer"
            >
              {/* Post Image Placeholder */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">Blog Post Image</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-400 transition-colors">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 hover:text-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}


