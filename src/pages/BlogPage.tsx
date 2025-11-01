import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
  isFeatured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'content-creator-seo-best-practices-2025',
    title: 'Content Creator SEO Best Practices for 2025',
    excerpt: 'Master the latest SEO techniques for YouTube, TikTok, and Instagram to boost your content rankings and grow organically.',
    image: '/imgs/youtube_seo_optimization_checklist_blog_header.jpg',
    author: 'CreatorTools Team',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'SEO',
    url: '/blog/content-creator-seo-best-practices-2025',
    isFeatured: true
  },
  {
    id: 'engaging-content-titles-guide',
    title: 'How to Generate Engaging Content Titles',
    excerpt: 'Learn proven strategies to create click-worthy titles that attract viewers and increase your content engagement across all platforms.',
    image: '/imgs/youtube_title_generator_ai_content_creation.jpg',
    author: 'CreatorTools Team',
    date: '2025-01-12',
    readTime: '6 min read',
    category: 'Content',
    url: '/blog/engaging-content-titles-guide'
  },
  {
    id: 'content-monetization-complete-guide',
    title: 'Understanding Content Monetization',
    excerpt: 'Everything you need to know about monetizing your content on YouTube, TikTok, Instagram and other platforms.',
    image: '/imgs/youtube_channel_monetization_revenue_analytics.jpg',
    author: 'CreatorTools Team',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'Monetization',
    url: '/blog/content-monetization-complete-guide'
  },
  {
    id: 'content-thumbnail-design-tips',
    title: 'Content Thumbnail Design Tips',
    excerpt: 'Discover the secrets of creating eye-catching thumbnails that increase your content views and attract more followers.',
    image: '/imgs/youtube_thumbnail_design_graphics_tutorial.jpg',
    author: 'CreatorTools Team',
    date: '2025-01-08',
    readTime: '7 min read',
    category: 'Design',
    url: '/blog/content-thumbnail-design-tips'
  },
  {
    id: 'grow-content-organically',
    title: 'Growing Your Content Organically',
    excerpt: 'Proven strategies and techniques to grow your presence organically across YouTube, TikTok, Instagram without spending money on ads.',
    image: '/imgs/youtube_channel_organic_growth_promotion_success.jpg',
    author: 'CreatorTools Team',
    date: '2025-01-05',
    readTime: '12 min read',
    category: 'Growth',
    url: '/blog/grow-content-organically'
  }
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'SEO', 'Content', 'Monetization', 'Design', 'Growth'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.isFeatured).slice(0, 1);
  const latestPosts = filteredPosts.filter(post => !post.isFeatured).slice(0, 3);
  const allPosts = filteredPosts.filter(post => !post.isFeatured).slice(3);

  const renderPostCard = (post: BlogPost, size: 'large' | 'medium' | 'small' = 'medium') => (
    <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full object-cover ${size === 'large' ? 'h-64' : size === 'medium' ? 'h-48' : 'h-40'}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEzMEgxNzVWNzVaIiBmaWxsPSIjOTNBM0FGIi8+CjxwYXRoIGQ9Ik0xOTAgMTAwTDIxNSAxMjVIMTc1TDE5MCAxMDBaIiBmaWxsPSIjNjI3MjgwIi8+Cjwvc3ZnPgo=';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            {post.category}
          </span>
        </div>
        {post.isFeatured && (
          <div className="absolute top-4 right-4">
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Featured</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className={`font-bold text-blue-600 mb-3 leading-tight ${
          size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
        <p className={`text-gray-600 mb-4 leading-relaxed ${
          size === 'large' ? 'text-base' : 'text-sm'
        }`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.readTime}</span>
          <Link 
            to={post.url}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center space-x-1"
          >
            <span>Read More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your Online 
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {" "}Earning Potential
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Expert insights, strategies, and tools to help you succeed on YouTube and grow your online income
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Start Reading
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Blog Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Blog</h2>
              <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Post (Large) */}
              <div className="lg:col-span-2">
                {renderPostCard(featuredPosts[0], 'large')}
              </div>
              
              {/* Latest Posts */}
              <div className="space-y-6">
                {latestPosts.map(post => renderPostCard(post, 'small'))}
              </div>
            </div>
          </section>
        )}

        {/* All Blog Section */}
        {allPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Blog Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map(post => renderPostCard(post, 'medium'))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <section className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with YouTube Tips
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest YouTube tips, strategies, and updates delivered to your inbox weekly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Join 10,000+ creators who get our weekly newsletter. Unsubscribe anytime.
          </p>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;