import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, Share2, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const blogPosts = {
  'youtube-seo-best-practices-2025': {
    title: 'YouTube SEO Best Practices for 2025',
    excerpt: 'Master the latest YouTube SEO techniques to boost your video rankings and grow your channel organically with our comprehensive guide.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-lg text-gray-600 mb-8">YouTube SEO has evolved significantly, and staying ahead of the curve is crucial for content creators. This comprehensive guide covers the latest strategies and techniques to optimize your videos for maximum visibility and engagement.</p>

        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h3 class="text-lg font-semibold text-blue-900 mb-2">What's New in 2025?</h3>
          <p class="text-blue-800">YouTube's algorithm now prioritizes viewer satisfaction over pure watch time, making audience retention and engagement crucial for success.</p>
        </div>

        <h2>Understanding YouTube's Algorithm in 2025</h2>
        <p>YouTube's algorithm considers hundreds of ranking factors, but the core elements remain consistent. Focus on watch time, engagement metrics, and relevance to your target audience.</p>

        <h3>Key Ranking Factors:</h3>
        <ul>
          <li><strong>Watch Time:</strong> The total time viewers spend watching your content</li>
          <li><strong>Engagement:</strong> Likes, comments, shares, and subscribers gained</li>
          <li><strong>Relevance:</strong> How well your content matches viewer search intent</li>
          <li><strong>Click-through Rate:</strong> Percentage of impressions that result in views</li>
          <li><strong>Viewer Satisfaction:</strong> New factor in 2025 focusing on viewer happiness</li>
        </ul>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h4 class="font-semibold text-yellow-800 mb-2">Pro Tip</h4>
          <p class="text-yellow-700">Videos that make viewers smile, laugh, or learn something new consistently rank higher in 2025.</p>
        </div>

        <h2>Optimizing Your Video Titles for Maximum Impact</h2>
        <p>Your title is the first thing potential viewers see. It needs to be compelling, relevant, and include your target keywords naturally.</p>

        <h3>Best Practices for 2025:</h3>
        <ol>
          <li><strong>Keep titles under 60 characters</strong> when possible for better mobile display</li>
          <li><strong>Front-load important keywords</strong> to improve search ranking</li>
          <li><strong>Create curiosity without clickbait</strong> - honesty builds trust</li>
          <li><strong>Test different variations</strong> using YouTube's A/B testing features</li>
          <li><strong>Include numbers and power words</strong> for better CTR</li>
        </ol>

        <h2>Crafting Compelling Descriptions That Convert</h2>
        <p>Video descriptions provide context to YouTube's algorithm and potential viewers. They should include relevant keywords while providing value.</p>

        <h3>Description Structure That Works:</h3>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h4>Step 1: Hook (First 2 sentences)</h4>
          <p class="mb-4">Capture attention immediately with a compelling opening or question.</p>
          
          <h4>Step 2: Value Proposition</h4>
          <p class="mb-4">Clearly state what viewers will learn or gain from watching.</p>
          
          <h4>Step 3: Timestamps & Keywords</h4>
          <p class="mb-4">Include timestamps and relevant keywords naturally.</p>
          
          <h4>Step 4: Call to Action</h4>
          <p>End with a clear next step for viewers.</p>
        </div>

        <h2>Thumbnail Strategy That Drives Clicks</h2>
        <p>Custom thumbnails significantly impact your click-through rate. Create eye-catching, high-contrast images that clearly represent your video content.</p>

        <h3>2025 Thumbnail Best Practices:</h3>
        <ul>
          <li><strong>Use bright, contrasting colors</strong> - Red, yellow, and orange perform best</li>
          <li><strong>Include faces with expressions</strong> - People connect with emotions</li>
          <li><strong>Keep text minimal and readable</strong> - Maximum 4-6 words</li>
          <li><strong>Test different styles</strong> and monitor performance in YouTube Analytics</li>
          <li><strong>Create brand consistency</strong> across all your thumbnails</li>
        </ul>

        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 class="font-semibold text-green-800 mb-2">Quick Win</h3>
          <p class="text-green-700">Thumbnails with human faces get 30% more clicks than those without. Always include facial expressions when relevant to your content.</p>
        </div>

        <h2>Advanced SEO Techniques for 2025</h2>
        
        <h3>1. Topic Clustering</h3>
        <p>Create content clusters around specific topics to establish authority and improve search rankings.</p>

        <h3>2. Long-form Content Focus</h3>
        <p>Videos over 8 minutes now perform better in the algorithm due to higher engagement potential.</p>

        <h3>3. Community Engagement</h3>
        <p>Respond to comments within the first hour of publishing to boost engagement metrics.</p>

        <h2>Measuring Success and Iterating</h2>
        <p>Use these key metrics to track your SEO success:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 mb-3">Primary Metrics</h4>
            <ul class="space-y-2 text-sm">
              <li>• Click-through Rate (CTR)</li>
              <li>• Average View Duration</li>
              <li>• Watch Time</li>
              <li>• Engagement Rate</li>
            </ul>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 mb-3">Secondary Metrics</h4>
            <ul class="space-y-2 text-sm">
              <li>• Subscriber Conversion</li>
              <li>• Comment Rate</li>
              <li>• Share Rate</li>
              <li>• Traffic Source Distribution</li>
            </ul>
          </div>
        </div>

        <h2>Common SEO Mistakes to Avoid</h2>
        <p>Steer clear of these common pitfalls that hurt your YouTube SEO:</p>

        <ul>
          <li><strong>Keyword stuffing</strong> - Natural language performs better than keyword density</li>
          <li><strong>Misleading thumbnails</strong> - This can hurt your credibility and rankings</li>
          <li><strong>Ignoring mobile optimization</strong> - 70% of views come from mobile devices</li>
          <li><strong>Poor video quality</strong> - Low-resolution content gets lower priority</li>
          <li><strong>Inconsistent posting schedule</strong> - Regular uploads improve algorithm favor</li>
        </ul>

        <h2>Conclusion: Your 2025 SEO Action Plan</h2>
        <p>YouTube SEO in 2025 requires a holistic approach focusing on viewer satisfaction, engagement, and authentic content creation. By implementing these strategies consistently, you'll see improved rankings, higher engagement, and sustainable channel growth.</p>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8">
          <h3 class="font-semibold text-orange-800 mb-2">Next Steps</h3>
          <p class="text-orange-700 mb-4">Ready to implement these strategies? Start with our <strong>YouTube Title Generator</strong> to create compelling titles that drive clicks, and use our <strong>Tag Generator</strong> to optimize your video tags for maximum discoverability.</p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a href="/tools/title-generator" class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">Try Title Generator</a>
            <a href="/tools/tag-generator" class="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">Try Tag Generator</a>
          </div>
        </div>
      </div>
    `,
    author: 'YtubeTools Team',
    authorBio: 'Our team of YouTube experts and SEO specialists has helped thousands of creators optimize their content and grow their channels.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'SEO',
    tags: ['YouTube SEO', 'Video Marketing', 'Content Strategy', '2025', 'Algorithm', 'Thumbnails'],
    image: '/imgs/youtube_seo_optimization_checklist_blog_header.jpg',
    tableOfContents: [
      { id: 'algorithm', title: 'Understanding YouTube\'s Algorithm in 2025' },
      { id: 'titles', title: 'Optimizing Video Titles' },
      { id: 'descriptions', title: 'Crafting Compelling Descriptions' },
      { id: 'thumbnails', title: 'Thumbnail Strategy' },
      { id: 'advanced', title: 'Advanced SEO Techniques' },
      { id: 'metrics', title: 'Measuring Success' },
      { id: 'mistakes', title: 'Common Mistakes to Avoid' },
      { id: 'conclusion', title: 'Your 2025 SEO Action Plan' }
    ]
  }
  // Add other blog posts with similar structure...
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;
  const [showToc, setShowToc] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/blog"
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-64 md:h-80">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEzMEgxNzVWNzVaIiBmaWxsPSIjOTNBM0FGIi8+CjxwYXRoIGQ9Ik0xOTAgMTAwTDIxNSAxMjVIMTc1TDE5MCAxMDBaIiBmaWxsPSIjNjI3MjgwIi8+Cjwvc3ZnPgo=';
                }}
              />
              <div className="absolute top-6 left-6">
                <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Title and Meta */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Author and Date Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
                  <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{post.author}</div>
                        <div className="text-sm text-gray-500">{post.authorBio}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              {post.tableOfContents && (
                <div className="mb-8">
                  <button
                    onClick={() => setShowToc(!showToc)}
                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium mb-4"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Table of Contents</span>
                    <span className="text-xs">({showToc ? 'Hide' : 'Show'})</span>
                  </button>
                  
                  {showToc && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <nav className="space-y-2">
                        {post.tableOfContents.map((item, index) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                          >
                            {index + 1}. {item.title}
                          </a>
                        ))}
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:text-gray-800 prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium">
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to optimize your YouTube content?</h3>
            <p className="text-lg mb-6 opacity-90">Use our free tools to implement these strategies and grow your channel!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tools/thumbnail-generator" 
                className="bg-white text-orange-500 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Try Thumbnail Generator
              </Link>
              <Link 
                to="/tools/tag-generator" 
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Generate Tags
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/blog/engaging-youtube-titles-guide" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-2">How to Generate Engaging YouTube Titles</h4>
                <p className="text-gray-600 text-sm">Learn proven strategies to create click-worthy YouTube titles...</p>
              </Link>
              <Link to="/blog/youtube-thumbnail-design-tips" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-2">YouTube Thumbnail Design Tips</h4>
                <p className="text-gray-600 text-sm">Discover the secrets of creating eye-catching thumbnails...</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;