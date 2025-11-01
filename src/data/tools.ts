export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  url: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export const categories = [
  { id: 'all', name: 'All Tools', count: 44 },
  { id: 'seo', name: 'SEO Tools', count: 14 },
  { id: 'channel', name: 'Channel Tools', count: 8 },
  { id: 'content', name: 'Content Tools', count: 10 },
  { id: 'analytics', name: 'Analytics Tools', count: 3 },
  { id: 'engagement', name: 'Engagement Tools', count: 5 },
  { id: 'thumbnail', name: 'Thumbnail Tools', count: 4 },
];

const tools: Tool[] = [
  // Featured Thumbnail Tool (Most Prominent)
  {
    id: 'thumbnail-generator',
    name: 'YouTube Thumbnail Generator',
    description: 'Create stunning YouTube thumbnails with AI-powered designs, drag-drop editor, and real-time preview. Perfect for growing your channel!',
    category: 'thumbnail',
    icon: 'ImageIcon',
    features: ['AI-Powered Design', 'Drag-Drop Editor', 'Real-time Preview', 'HD Export', 'Multiple Templates'],
    url: '/tools/thumbnail-generator',
    isPopular: true,
    isNew: true
  },

  // SEO Tools (AI-Powered, No YouTube API)
  {
    id: 'tag-generator',
    name: 'YouTube Tag Generator',
    description: 'Generate compelling tags for your videos with our AI-powered tag generator',
    category: 'seo',
    icon: 'Tag',
    features: ['AI-powered', 'Real-time Generation', 'SEO Optimized'],
    url: '/tools/tag-generator',
    isPopular: true
  },
  {
    id: 'title-generator',
    name: 'YouTube Title Generator',
    description: 'Create engaging and click-worthy titles with our AI-powered tool',
    category: 'seo',
    icon: 'Type',
    features: ['AI-powered', 'Multiple Languages', 'Click-worthy'],
    url: '/tools/title-generator',
    isPopular: true
  },
  {
    id: 'description-generator',
    name: 'YouTube Description Generator',
    description: 'Write engaging descriptions for your videos',
    category: 'seo',
    icon: 'FileText',
    features: ['SEO Optimized', 'Multiple Formats', 'Keywords'],
    url: '/tools/description-generator'
  },
  {
    id: 'hashtag-generator',
    name: 'YouTube Hashtag Generator',
    description: 'Generate relevant hashtags for better video visibility',
    category: 'seo',
    icon: 'Hash',
    features: ['Trending Hashtags', 'Category-wise', 'Performance Based'],
    url: '/tools/hashtag-generator'
  },
  {
    id: 'title-analyzer',
    name: 'YouTube Title Analyzer',
    description: 'Check title effectiveness and SEO score',
    category: 'seo',
    icon: 'BarChart3',
    features: ['SEO Score', 'Performance Prediction', 'Suggestions'],
    url: '/tools/title-analyzer'
  },
  {
    id: 'keyword-research',
    name: 'YouTube Keyword Research',
    description: 'Find high-ranking keywords for your content',
    category: 'seo',
    icon: 'Search',
    features: ['Search Volume', 'Competition Analysis', 'Trending'],
    url: '/tools/keyword-research'
  },
  {
    id: 'batch-tag-generator',
    name: 'Batch Tag Generator',
    description: 'Generate tags for multiple videos at once',
    category: 'seo',
    icon: 'Tags',
    features: ['Bulk Processing', 'CSV Import', 'Export Options'],
    url: '/tools/batch-tag-generator'
  },
  {
    id: 'title-splitter',
    name: 'Title Splitter',
    description: 'Split long titles into short parts',
    category: 'seo',
    icon: 'Split',
    features: ['Title Optimization', 'Length Management', 'SEO Friendly'],
    url: '/tools/title-splitter'
  },
  {
    id: 'keyword-suggestions',
    name: 'Keyword Suggestions',
    description: 'Get suggestions for related keywords',
    category: 'seo',
    icon: 'Lightbulb',
    features: ['Related Keywords', 'Long-tail Suggestions', 'Volume Data'],
    url: '/tools/keyword-suggestions'
  },
  {
    id: 'video-optimizer',
    name: 'Video Optimizer',
    description: 'Overall video optimization recommendations',
    category: 'seo',
    icon: 'Zap',
    features: ['Complete Optimization', 'SEO Audit', 'Performance Tips'],
    url: '/tools/video-optimizer'
  },
  {
    id: 'hashtag-extractor',
    name: 'Hashtag Extractor',
    description: 'Extract hashtags from videos or text',
    category: 'seo',
    icon: 'Hash',
    features: ['Text Analysis', 'Hashtag Extraction', 'Trending Analysis'],
    url: '/tools/hashtag-extractor'
  },
  {
    id: 'seo-score-checker',
    name: 'SEO Score Checker',
    description: 'Check complete SEO score of your video',
    category: 'seo',
    icon: 'CheckCircle',
    features: ['SEO Analysis', 'Score Calculation', 'Improvement Tips'],
    url: '/tools/seo-score-checker'
  },
  {
    id: 'meta-tag-optimizer',
    name: 'Meta Tag Optimizer',
    description: 'Optimize meta tags for better ranking',
    category: 'seo',
    icon: 'Code',
    features: ['Meta Tags', 'SEO Optimization', 'Best Practices'],
    url: '/tools/meta-tag-optimizer'
  },

  // Content Creation Tools
  {
    id: 'thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    description: 'Download video thumbnails in HD quality',
    category: 'thumbnail',
    icon: 'Download',
    features: ['Multiple Quality', 'Batch Download', 'Custom Sizes'],
    url: '/tools/thumbnail-downloader'
  },
  {
    id: 'thumbnail-previewer',
    name: 'YouTube Thumbnail Previewer',
    description: 'Design thumbnails with drag-drop and preview in real-time',
    category: 'thumbnail',
    icon: 'Eye',
    features: ['Drag-Drop Editor', 'Real-time Preview', 'Custom Templates'],
    url: '/tools/thumbnail-previewer'
  },
  {
    id: 'thumbnail-ab-tester',
    name: 'Thumbnail A/B Tester',
    description: 'Test performance of different thumbnails',
    category: 'thumbnail',
    icon: 'TestTube',
    features: ['A/B Testing', 'Performance Metrics', 'Optimization'],
    url: '/tools/thumbnail-ab-tester'
  },
  {
    id: 'embed-code-generator',
    name: 'YouTube Embed Code Generator',
    description: 'Create embed codes for websites or blogs',
    category: 'content',
    icon: 'Code',
    features: ['Customizable Options', 'Multiple Formats', 'Responsive'],
    url: '/tools/embed-code-generator'
  },
  {
    id: 'video-summary-generator',
    name: 'YouTube Video Summary Generator',
    description: 'Create concise summaries of video content',
    category: 'content',
    icon: 'FileText',
    features: ['AI Summarization', 'Multiple Languages', 'Key Points'],
    url: '/tools/video-summary-generator'
  },
  {
    id: 'video-length-analyzer',
    name: 'Video Length Analyzer',
    description: 'Get recommendations for optimal video length',
    category: 'content',
    icon: 'Clock',
    features: ['Length Optimization', 'Engagement Analysis', 'Best Practices'],
    url: '/tools/video-length-analyzer'
  },
  {
    id: 'ai-content-ideas',
    name: 'AI Content Ideas Generator',
    description: 'Get AI-powered content ideas for your channel',
    category: 'content',
    icon: 'Brain',
    features: ['AI-Powered Ideas', 'Trending Topics', 'Content Planning'],
    url: '/tools/ai-content-ideas'
  },
  {
    id: 'intro-maker',
    name: 'Video Intro Maker',
    description: 'Create professional video intros',
    category: 'content',
    icon: 'Film',
    features: ['Templates', 'Customization', 'HD Export'],
    url: '/tools/intro-maker'
  },
  {
    id: 'outro-maker',
    name: 'Video Outro Maker',
    description: 'Design custom video outros',
    category: 'content',
    icon: 'Film',
    features: ['Professional Outros', 'Subscribe Button', 'Templates'],
    url: '/tools/outro-maker'
  },
  {
    id: 'script-generator',
    name: 'Video Script Generator',
    description: 'Generate video scripts with AI',
    category: 'content',
    icon: 'FileText',
    features: ['AI-Powered', 'Multiple Styles', 'Structure'],
    url: '/tools/script-generator'
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'Plan your content schedule',
    category: 'content',
    icon: 'Calendar',
    features: ['Planning', 'Scheduling', 'Reminders'],
    url: '/tools/content-calendar'
  },
  {
    id: 'topic-generator',
    name: 'Video Topic Generator',
    description: 'Generate trending video topics',
    category: 'content',
    icon: 'Lightbulb',
    features: ['Trending Topics', 'Niche-based', 'AI Suggestions'],
    url: '/tools/topic-generator'
  },
  {
    id: 'video-idea-validator',
    name: 'Video Idea Validator',
    description: 'Validate if your video idea will work',
    category: 'content',
    icon: 'CheckCircle',
    features: ['Idea Analysis', 'Success Prediction', 'Recommendations'],
    url: '/tools/video-idea-validator'
  },

  // Channel Tools (No YouTube API)
  {
    id: 'channel-name-generator',
    name: 'Channel Name Generator',
    description: 'Generate creative channel names',
    category: 'channel',
    icon: 'Sparkles',
    features: ['AI-Powered', 'Unique Names', 'Availability Check'],
    url: '/tools/channel-name-generator'
  },
  {
    id: 'channel-description-generator',
    name: 'Channel Description Generator',
    description: 'Create compelling channel descriptions',
    category: 'channel',
    icon: 'FileText',
    features: ['SEO Optimized', 'Professional', 'Multiple Styles'],
    url: '/tools/channel-description-generator'
  },
  {
    id: 'channel-audit',
    name: 'Channel Audit Tool',
    description: 'Complete channel audit and recommendations',
    category: 'channel',
    icon: 'ClipboardCheck',
    features: ['Full Audit', 'Recommendations', 'Action Plan'],
    url: '/tools/channel-audit'
  },
  {
    id: 'channel-rank-checker',
    name: 'Channel Rank Checker',
    description: 'Check your channel ranking for keywords',
    category: 'channel',
    icon: 'Award',
    features: ['Keyword Ranking', 'Competition Analysis', 'Tracking'],
    url: '/tools/channel-rank-checker'
  },
  {
    id: 'channel-comparison',
    name: 'Channel Comparison Tool',
    description: 'Compare multiple channels side by side',
    category: 'channel',
    icon: 'GitCompare',
    features: ['Multi-Channel Compare', 'Metrics Analysis', 'Reports'],
    url: '/tools/channel-comparison'
  },
  {
    id: 'channel-category-finder',
    name: 'Channel Category Finder',
    description: 'Find best category for your channel',
    category: 'channel',
    icon: 'List',
    features: ['Category Analysis', 'Recommendations', 'Niche Finding'],
    url: '/tools/channel-category-finder'
  },
  {
    id: 'channel-monetization-guide',
    name: 'Monetization Guide',
    description: 'Step-by-step monetization guide',
    category: 'channel',
    icon: 'BookOpen',
    features: ['Step-by-Step', 'Requirements', 'Tips & Tricks'],
    url: '/tools/channel-monetization-guide'
  },
  {
    id: 'cta-generator',
    name: 'CTA Generator',
    description: 'Generate compelling call-to-action messages',
    category: 'channel',
    icon: 'MessageSquare',
    features: ['Multiple CTAs', 'Conversion Focused', 'Templates'],
    url: '/tools/cta-generator'
  },

  // Analytics Tools (Non-YouTube API)
  {
    id: 'money-calculator',
    name: 'YouTube Money Calculator',
    description: 'Calculate potential earnings from video views',
    category: 'analytics',
    icon: 'Calculator',
    features: ['CPM/RPM Calculation', 'Revenue Estimation', 'Analytics'],
    url: '/tools/money-calculator'
  },
  {
    id: 'revenue-optimization',
    name: 'Revenue Optimization Tool',
    description: 'Maximize your YouTube revenue potential',
    category: 'analytics',
    icon: 'DollarSign',
    features: ['Revenue Analysis', 'Optimization Strategies', 'Growth Tips'],
    url: '/tools/revenue-optimization'
  },

  // Engagement Tools
  {
    id: 'comment-picker',
    name: 'YouTube Comment Picker',
    description: 'Random comment picker for giveaways and contests',
    category: 'engagement',
    icon: 'MessageCircle',
    features: ['Random Selection', 'Fair Algorithm', 'Export Results'],
    url: '/tools/comment-picker'
  },
  {
    id: 'description-optimizer',
    name: 'YouTube Description Optimizer',
    description: 'Optimize video descriptions for better engagement',
    category: 'engagement',
    icon: 'Settings',
    features: ['SEO Optimization', 'Readability Score', 'Engagement Tips'],
    url: '/tools/description-optimizer'
  },
  {
    id: 'comment-analyzer',
    name: 'Comment Analyzer',
    description: 'Analyze sentiment in comments',
    category: 'engagement',
    icon: 'MessageSquare',
    features: ['Sentiment Analysis', 'Engagement Insights', 'Feedback Analysis'],
    url: '/tools/comment-analyzer'
  },
  {
    id: 'engagement-booster',
    name: 'Engagement Booster',
    description: 'Tips and strategies to boost video engagement',
    category: 'engagement',
    icon: 'Zap',
    features: ['Engagement Strategies', 'Audience Interaction', 'Growth Tactics'],
    url: '/tools/engagement-booster'
  }
];

export const allTools = tools;
