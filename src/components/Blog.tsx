import React from 'react';
import { Calendar, User, ArrowRight, Tag, Search, BookOpen, TrendingUp, DollarSign } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'youtube-seo-best-practices-2025',
    title: 'YouTube SEO Best Practices for 2025',
    excerpt: 'Master the latest YouTube SEO techniques to boost your video rankings and grow your channel organically with our comprehensive guide.',
    content: '',
    author: 'MiniMax Agent',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Free YouTube Resources',
    tags: ['YouTube SEO', 'Video Marketing', 'Content Strategy', '2025']
  },
  {
    id: 'engaging-youtube-titles-guide',
    title: 'How to Generate Engaging YouTube Titles',
    excerpt: 'Learn proven strategies to create click-worthy YouTube titles that attract viewers and increase your video click-through rates.',
    content: '',
    author: 'MiniMax Agent',
    date: '2025-01-12',
    readTime: '6 min read',
    category: 'YouTube Growth & Optimization',
    tags: ['YouTube Titles', 'Video Marketing', 'CTR Optimization']
  },
  {
    id: 'youtube-monetization-complete-guide',
    title: 'Understanding YouTube Monetization',
    excerpt: 'Everything you need to know about YouTube monetization, from eligibility requirements to maximizing your revenue potential.',
    content: '',
    author: 'MiniMax Agent',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'YouTube Earners',
    tags: ['YouTube Money', 'Monetization', 'Revenue', 'Creator Economy']
  },
  {
    id: 'youtube-thumbnail-design-tips',
    title: 'YouTube Thumbnail Design Tips',
    excerpt: 'Discover the secrets of creating eye-catching thumbnails that increase your video views and attract more subscribers.',
    content: '',
    author: 'MiniMax Agent',
    date: '2025-01-08',
    readTime: '7 min read',
    category: 'YouTube Growth & Optimization',
    tags: ['Thumbnails', 'Video Design', 'Click-through Rate', 'Visual Content']
  },
  {
    id: 'grow-youtube-channel-organically',
    title: 'Growing Your YouTube Channel Organically',
    excerpt: 'Proven strategies and techniques to grow your YouTube channel organically without spending money on ads or fake engagement.',
    content: '',
    author: 'MiniMax Agent',
    date: '2025-01-05',
    readTime: '12 min read',
    category: 'YouTube Growth & Optimization',
    tags: ['Channel Growth', 'Organic Growth', 'YouTube Strategy', 'Subscriber Growth']
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Read Blog
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Expert insights, tips, and strategies to help you succeed on YouTube
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300">
            Start Reading
          </button>
        </div>

        {/* Latest Blog Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Latest Blog</h3>
            <button className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 font-medium">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors duration-300">
                {post.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center relative">
                    <div className="text-orange-400">
                      {post.category === 'Free YouTube Resources' ? <BookOpen className="h-16 w-16" /> : 
                       post.category === 'YouTube Growth & Optimization' ? <TrendingUp className="h-16 w-16" /> : <DollarSign className="h-16 w-16" />}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h6 className="text-lg font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h6>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* All Blog Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">All Blog</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Search className="h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search blog posts..." 
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors duration-300">
                {post.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center relative">
                    <div className="text-orange-400">
                      {post.category === 'Free YouTube Resources' ? <BookOpen className="h-16 w-16" /> : 
                       post.category === 'YouTube Growth & Optimization' ? <TrendingUp className="h-16 w-16" /> : <DollarSign className="h-16 w-16" />}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h6 className="text-lg font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h6>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center space-x-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        <Tag className="h-2 w-2" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 font-medium text-sm">
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with YouTube Tips
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest YouTube strategies, tools, and creator insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;