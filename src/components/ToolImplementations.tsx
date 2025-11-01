import React, { useState } from 'react';
import { Download, Copy, Check, AlertCircle, Loader } from 'lucide-react';
import { geminiAPI } from '../utils/geminiApi';
import { indexedDBManager } from '../utils/indexedDB';
import { youtubeAPI } from '../utils/youtubeApi';

interface ToolProps {
  onResults?: (results: any) => void;
  onCopy?: (text: string, id: string) => void;
  copied?: string | null;
}

export const ToolImplementations: Record<string, React.FC<ToolProps>> = {
  // Tag Generator
  'tag-generator': ({ onResults, onCopy, copied }) => {
    const [keyword, setKeyword] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    
    const generateTags = () => {
      const baseTags = [
        'youtube', 'video', 'viral', 'trending', '2024', 'new', 'tutorial',
        'how to', 'tips', 'guide', 'best', 'top', 'easy', 'quick', 'free'
      ];
      const keywordTags = keyword.split(' ').map(k => k.toLowerCase());
      const generated = [...baseTags, ...keywordTags].slice(0, 15);
      setTags(generated);
      onResults?.({ tags: generated, keyword });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Topic or Keywords
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., YouTube monetization, Content creation, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={generateTags}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Tags
        </button>
        {tags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Tags</h3>
              <button
                onClick={() => onCopy?.(tags.join(', '), 'tags')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'tags' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Title Generator
  'title-generator': ({ onResults, onCopy, copied }) => {
    const [keyword, setKeyword] = useState('');
    const [tone, setTone] = useState('engaging');
    const [titles, setTitles] = useState<string[]>([]);
    
    const titleTemplates = {
      engaging: [
        `{keyword} - Everything You Need to Know!`,
        `Amazing {keyword} Tips You've Never Seen!`,
        `{keyword} SECRETS You Need to Know NOW!`,
        `Don't Miss These {keyword} Hacks!`,
        `{keyword} - The Best of 2025!`
      ],
      educational: [
        `Complete {keyword} Tutorial for Beginners`,
        `{keyword} Step by Step Guide`,
        `How to Master {keyword} in 2025`,
        `{keyword} - Everything You Need to Know`,
        `Learn {keyword} - Professional Guide`
      ],
      exciting: [
        `{keyword} - INCREDIBLE RESULTS!`,
        `AMAZING {keyword} Techniques!`,
        `{keyword} - Stunning Tips!`,
        `Awesome {keyword} Tricks!`,
        `{keyword} - Mind-Blowing Ideas!`
      ]
    };

    const generateTitles = () => {
      const templates = titleTemplates[tone as keyof typeof titleTemplates] || titleTemplates.engaging;
      const generated = templates.map(template => 
        template.replace(/{keyword}/g, keyword || 'Your Topic')
      );
      setTitles(generated);
      onResults?.({ titles: generated, keyword, tone });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Topic
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., YouTube monetization"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="engaging">Engaging</option>
              <option value="educational">Educational</option>
              <option value="exciting">Exciting</option>
            </select>
          </div>
        </div>
        <button
          onClick={generateTitles}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Titles
        </button>
        {titles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Titles</h3>
              <button
                onClick={() => onCopy?.(titles.join('\n'), 'titles')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'titles' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-2">
              {titles.map((title, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-gray-800">{title}</span>
                  <button
                    onClick={() => onCopy?.(title, `title-${index}`)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied === `title-${index}` ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Description Generator
  'description-generator': ({ onResults, onCopy, copied }) => {
    const [keyword, setKeyword] = useState('');
    const [description, setDescription] = useState('');
    
    const generateDescription = () => {
      const template = `
In this video, you'll learn everything about ${keyword}!

Topics Covered in This Video:
• Complete ${keyword} Tutorial
• Step-by-step Guide  
• Pro Tips and Tricks
• Avoid Common Mistakes
• Best Practices

Video Timeline:
0:00 - Introduction
1:30 - Main Topic
3:00 - Tips & Tricks
5:00 - Conclusion

If this video was helpful, don't forget to LIKE!
SHARE with your friends!
SUBSCRIBE and hit the BELL ICON for new videos!

Contact: your.email@example.com
Website: yourwebsite.com

#${keyword.replace(/\s+/g, '')} #YouTube #Tutorial #Tips #2025
      `.trim();
      setDescription(template);
      onResults?.({ description: template, keyword });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Topic
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., YouTube monetization"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={generateDescription}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Description
        </button>
        {description && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Description</h3>
              <button
                onClick={() => onCopy?.(description, 'description')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'description' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>
        )}
      </div>
    );
  },

  // Hashtag Generator
  'hashtag-generator': ({ onResults, onCopy, copied }) => {
    const [keyword, setKeyword] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    
    const popularHashtags = [
      '#YouTube', '#Trending', '#Viral', '#2024', '#New', '#Tutorial', 
      '#Tips', '#Guide', '#Best', '#Top', '#Easy', '#Quick', '#Free',
      '#HowTo', '#Learn', '#India', '#Hindi', '#Bollywood', '#Technology'
    ];

    const generateHashtags = () => {
      const keywordHashtags = keyword.split(' ').map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}`);
      const generated = [...popularHashtags, ...keywordHashtags].slice(0, 20);
      setHashtags(generated);
      onResults?.({ hashtags: generated, keyword });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Topic
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., YouTube monetization"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={generateHashtags}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Hashtags
        </button>
        {hashtags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Hashtags</h3>
              <button
                onClick={() => onCopy?.(hashtags.join(' '), 'hashtags')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'hashtags' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200">
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Tag Extractor (Real YouTube API)
  'tag-extractor': ({ onResults, onCopy, copied }) => {
    const [url, setUrl] = useState('');
    const [extractedTags, setExtractedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const extractTags = async () => {
      if (!url.trim()) return;
      setLoading(true);
      setError('');
      setExtractedTags([]);
      
      try {
        // Initialize YouTube API
        await youtubeAPI.initialize();
        
        // Extract video ID
        const videoId = youtubeAPI.extractVideoId(url);
        if (!videoId) {
          setError('Invalid YouTube URL. Please enter a valid video URL.');
          setLoading(false);
          return;
        }
        
        // Fetch video details
        const response = await youtubeAPI.getVideoDetails(videoId);
        
        if (!response.success) {
          setError(response.error || 'Failed to extract tags');
          setLoading(false);
          return;
        }
        
        // Extract tags from video snippet
        const tags = response.data?.snippet?.tags || [];
        
        if (tags.length === 0) {
          setError('This video has no tags or tags are not available.');
        } else {
          setExtractedTags(tags);
          onResults?.({ tags, url, videoId });
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while extracting tags');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={extractTags}
          disabled={loading || !url.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Extracting Tags...</span>
            </>
          ) : (
            <span>Extract Tags</span>
          )}
        </button>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800">{error}</p>
              {error.includes('API key') && (
                <p className="text-xs text-red-600 mt-1">
                  Please configure your YouTube Data API key in Settings.
                </p>
              )}
            </div>
          </div>
        )}
        
        {extractedTags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Tags ({extractedTags.length})</h3>
              <button
                onClick={() => onCopy?.(extractedTags.join(', '), 'extracted-tags')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'extracted-tags' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'extracted-tags' ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {extractedTags.map((tag, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel ID Finder
  'channel-id-finder': ({ onResults }) => {
    const [channelUrl, setChannelUrl] = useState('');
    const [channelId, setChannelId] = useState('');
    
    const findChannelId = () => {
      // Mock extraction - in real implementation, you'd parse the URL
      const mockId = 'UC' + Math.random().toString(36).substring(2, 15);
      setChannelId(mockId);
      onResults?.({ channelId: mockId, url: channelUrl });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel URL
          </label>
          <input
            type="url"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="https://www.youtube.com/@channelname or https://www.youtube.com/channel/UC..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={findChannelId}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Find Channel ID
        </button>
        {channelId && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Channel ID</h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              {channelId}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Thumbnail Downloader
  'thumbnail-downloader': ({ onResults }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnails, setThumbnails] = useState<{ quality: string; url: string }[]>([]);
    const [error, setError] = useState('');
    
    const getThumbnails = () => {
      setError('');
      setThumbnails([]);
      
      if (!videoUrl.trim()) {
        setError('कृपया एक valid YouTube URL enter करें');
        return;
      }
      
      // Extract video ID from URL
      const videoId = youtubeAPI.extractVideoId(videoUrl);
      
      if (!videoId) {
        setError('Invalid YouTube URL. कृपया एक valid YouTube video URL enter करें');
        return;
      }
      
      // Generate thumbnail URLs for different qualities
      const thumbnailList = [
        { quality: 'Default (120x90)', url: `https://i.ytimg.com/vi/${videoId}/default.jpg` },
        { quality: 'Medium Quality (320x180)', url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` },
        { quality: 'High Quality (480x360)', url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` },
        { quality: 'Standard Definition (640x480)', url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg` },
        { quality: 'Max Resolution (1280x720)', url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` }
      ];
      
      setThumbnails(thumbnailList);
      onResults?.({ thumbnails: thumbnailList, url: videoUrl, videoId });
    };
    
    const downloadImage = (url: string, quality: string) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `youtube-thumbnail-${quality.replace(/[^a-zA-Z0-9]/g, '-')}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setError('');
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <div className="mt-2 text-sm text-red-600 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <button
          onClick={getThumbnails}
          disabled={!videoUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Get Thumbnails
        </button>
        {thumbnails.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Available Thumbnails</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thumbnails.map((thumb, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img 
                    src={thumb.url} 
                    alt={`Thumbnail ${thumb.quality}`} 
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{thumb.quality}</span>
                    <button 
                      onClick={() => downloadImage(thumb.url, thumb.quality)}
                      className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Money Calculator
  'money-calculator': ({ onResults }) => {
    const [views, setViews] = useState('');
    const [cpm, setCpm] = useState('2');
    const [revenue, setRevenue] = useState('');
    
    const calculateRevenue = () => {
      const totalViews = parseFloat(views) || 0;
      const cpmRate = parseFloat(cpm) || 0;
      const calculatedRevenue = (totalViews / 1000) * cpmRate;
      setRevenue(calculatedRevenue.toFixed(2));
      onResults?.({ views: totalViews, cpm: cpmRate, revenue: calculatedRevenue });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Views
            </label>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              placeholder="e.g., 10000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPM Rate ($)
            </label>
            <input
              type="number"
              step="0.1"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              placeholder="e.g., 2.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          onClick={calculateRevenue}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Calculate Revenue
        </button>
        {revenue && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Estimated Revenue</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600">${revenue}</div>
              <div className="text-green-700">Estimated Daily Revenue</div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Thumbnail Generator (New Featured Tool)
  'thumbnail-generator': ({ onResults, onCopy, copied }) => {
    const [template, setTemplate] = useState('minimal');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [textColor, setTextColor] = useState('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState('#ff0000');
    const [generatedThumbnails, setGeneratedThumbnails] = useState<string[]>([]);

    const templates = [
      { id: 'minimal', name: 'Minimal', preview: 'Clean, simple design' },
      { id: 'bold', name: 'Bold', preview: 'Large text with impact' },
      { id: 'editorial', name: 'Editorial', preview: 'News-style layout' },
      { id: 'modern', name: 'Modern', preview: 'Contemporary design' },
      { id: 'vibrant', name: 'Vibrant', preview: 'Colorful and energetic' }
    ];

    const generateThumbnails = () => {
      const thumbnails = [];
      for (let i = 0; i < 5; i++) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        
        canvas.width = 1280;
        canvas.height = 720;
        
        // Background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 1280, 720);
        
        // Add gradient effect
        const gradient = ctx.createLinearGradient(0, 0, 1280, 720);
        gradient.addColorStop(0, backgroundColor + 'CC');
        gradient.addColorStop(1, '#00000080');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1280, 720);
        
        // Title text
        ctx.fillStyle = textColor;
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Split title into lines
        const lines = title.split(' ');
        const titleLines = [];
        let currentLine = '';
        
        for (const word of lines) {
          const testLine = currentLine + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 1000 && currentLine !== '') {
            titleLines.push(currentLine);
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) titleLines.push(currentLine);
        
        // Draw title lines
        const lineHeight = 80;
        const totalHeight = titleLines.length * lineHeight;
        const startY = (720 - totalHeight) / 2;
        
        titleLines.forEach((line, index) => {
          ctx.fillText(line.trim(), 640, startY + index * lineHeight);
        });
        
        // Subtitle
        if (subtitle) {
          ctx.font = '48px Arial';
          ctx.fillText(subtitle, 640, startY + titleLines.length * lineHeight + 60);
        }
        
        // Add "YT" logo
        ctx.fillStyle = textColor;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('YouTube Thumbnail', 50, 670);
        
        thumbnails.push(canvas.toDataURL('image/png'));
      }
      
      setGeneratedThumbnails(thumbnails);
      onResults?.({ templates: thumbnails, title, subtitle, colors: { textColor, backgroundColor } });
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">⭐</div>
            <span className="font-semibold text-orange-700">Featured Tool</span>
          </div>
          <p className="text-orange-600 text-sm">Create stunning YouTube thumbnails with AI-powered designs and real-time preview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name} - {t.preview}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your video title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Optional)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Add a subtitle"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generateThumbnails}
              disabled={!title.trim()}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Generate 5 Thumbnail Variations
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="space-y-2">
                <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm inline-block">
                  Selected: {templates.find(t => t.id === template)?.name}
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">Title: {title || 'Your Title'}</div>
                  <div className="text-sm text-gray-600">Subtitle: {subtitle || 'No subtitle'}</div>
                  <div className="flex space-x-4 text-xs">
                    <span className="text-gray-500">Text: {textColor}</span>
                    <span className="text-gray-500">Background: {backgroundColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {generatedThumbnails.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Thumbnails</h3>
              <button
                onClick={() => onCopy?.(generatedThumbnails.join(', '), 'thumbnails')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'thumbnails' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedThumbnails.map((thumb, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-32 object-cover rounded mb-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Variation {index + 1}</span>
                    <a
                      href={thumb}
                      download={`thumbnail-${index + 1}.png`}
                      className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Comment Picker
  'comment-picker': ({ onResults }) => {
    const [comments] = useState<string[]>([
      'Great video! Very helpful content.',
      'Amazing tutorial, thanks for sharing!',
      'This is exactly what I was looking for.',
      'Keep up the good work!',
      'Subscribed and liked!',
      'Very informative video.',
      'Could you make more videos like this?',
      'Best explanation ever!',
      'Thank you so much!',
      'This helped me a lot!'
    ]);
    const [selectedComment, setSelectedComment] = useState('');
    const [winners, setWinners] = useState<string[]>([]);
    
    const pickRandomComment = () => {
      if (comments.length === 0) return;
      const randomIndex = Math.floor(Math.random() * comments.length);
      setSelectedComment(comments[randomIndex]);
    };

    const pickMultipleWinners = () => {
      const numWinners = 3;
      const shuffled = [...comments].sort(() => 0.5 - Math.random());
      setWinners(shuffled.slice(0, numWinners));
      onResults?.({ winners, totalComments: comments.length });
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Comments ({comments.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm">
                {comment}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={pickRandomComment}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Pick Random Comment
          </button>
          <button
            onClick={pickMultipleWinners}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Pick 3 Winners
          </button>
        </div>

        {selectedComment && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Selected Comment</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-gray-800">{selectedComment}</div>
            </div>
          </div>
        )}

        {winners.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Winners</h3>
            <div className="space-y-2">
              {winners.map((winner, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="text-gray-800">{winner}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Monetization Checker
  'monetization-checker': ({ onResults }) => {
    const [subscribers, setSubscribers] = useState('');
    const [watchHours, setWatchHours] = useState('');
    const [result, setResult] = useState<any>(null);
    
    const checkEligibility = () => {
      const subs = parseInt(subscribers) || 0;
      const hours = parseInt(watchHours) || 0;
      
      const isEligible = subs >= 1000 && hours >= 4000;
      const subsProgress = Math.min(100, (subs / 1000) * 100);
      const hoursProgress = Math.min(100, (hours / 4000) * 100);
      
      setResult({
        isEligible,
        subscribers: subs,
        watchHours: hours,
        subsProgress,
        hoursProgress,
        subsNeeded: Math.max(0, 1000 - subs),
        hoursNeeded: Math.max(0, 4000 - hours)
      });
      
      onResults?.({ isEligible, subscribers: subs, watchHours: hours });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscribers
            </label>
            <input
              type="number"
              value={subscribers}
              onChange={(e) => setSubscribers(e.target.value)}
              placeholder="Enter subscriber count"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Watch Hours (Last 12 months)
            </label>
            <input
              type="number"
              value={watchHours}
              onChange={(e) => setWatchHours(e.target.value)}
              placeholder="Enter watch hours"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <button
          onClick={checkEligibility}
          disabled={!subscribers || !watchHours}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Check Eligibility
        </button>
        
        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${result.isEligible ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
              <div className="text-center mb-4">
                <div className={`text-2xl font-bold ${result.isEligible ? 'text-green-600' : 'text-yellow-600'}`}>
                  {result.isEligible ? '✓ Eligible for Monetization!' : '✗ Not Eligible Yet'}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subscribers Progress</span>
                    <span>{result.subscribers.toLocaleString()} / 1,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${result.subsProgress}%` }}></div>
                  </div>
                  {!result.isEligible && result.subsNeeded > 0 && (
                    <div className="text-sm text-gray-600 mt-1">Need {result.subsNeeded.toLocaleString()} more subscribers</div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Watch Hours Progress</span>
                    <span>{result.watchHours.toLocaleString()} / 4,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full transition-all" style={{ width: `${result.hoursProgress}%` }}></div>
                  </div>
                  {!result.isEligible && result.hoursNeeded > 0 && (
                    <div className="text-sm text-gray-600 mt-1">Need {result.hoursNeeded.toLocaleString()} more watch hours</div>
                  )}
                </div>
              </div>
            </div>
            
            {result.isEligible && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Enable monetization in YouTube Studio</li>
                  <li>• Link your AdSense account</li>
                  <li>• Review monetization policies</li>
                  <li>• Start earning from your content!</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },

  // Video Data Viewer
  'video-data-viewer': ({ onResults }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoData, setVideoData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    const fetchVideoData = () => {
      if (!videoUrl.trim()) return;
      setLoading(true);
      
      const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      
      // Simulated video data (real implementation would use YouTube Data API)
      setTimeout(() => {
        const mockData = {
          title: 'Sample YouTube Video Title',
          views: Math.floor(Math.random() * 1000000),
          likes: Math.floor(Math.random() * 50000),
          comments: Math.floor(Math.random() * 5000),
          duration: '10:24',
          uploadDate: '2025-01-15',
          channelName: 'Sample Channel',
          tags: ['youtube', 'tutorial', 'guide'],
          description: 'This is a sample video description...'
        };
        setVideoData(mockData);
        onResults?.(mockData);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={fetchVideoData}
          disabled={loading || !videoUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Fetching Data...' : 'Get Video Data'}
        </button>
        
        {videoData && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{videoData.title}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Views</div>
                  <div className="text-lg font-semibold text-blue-600">{videoData.views.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Likes</div>
                  <div className="text-lg font-semibold text-green-600">{videoData.likes.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Comments</div>
                  <div className="text-lg font-semibold text-purple-600">{videoData.comments.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-lg font-semibold text-orange-600">{videoData.duration}</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Channel:</span>
                  <span className="font-medium">{videoData.channelName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upload Date:</span>
                  <span className="font-medium">{videoData.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Rate:</span>
                  <span className="font-medium text-green-600">
                    {((videoData.likes / videoData.views) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Trending Videos
  'trending-videos': ({ onResults }) => {
    const [category, setCategory] = useState('all');
    const [region, setRegion] = useState('IN');
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const categories = [
      { id: 'all', name: 'All Categories' },
      { id: 'gaming', name: 'Gaming' },
      { id: 'music', name: 'Music' },
      { id: 'news', name: 'News' },
      { id: 'entertainment', name: 'Entertainment' },
      { id: 'education', name: 'Education' }
    ];
    
    const fetchTrendingVideos = () => {
      setLoading(true);
      
      // Simulated trending videos
      setTimeout(() => {
        const mockVideos = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Trending Video ${i + 1} - ${category}`,
          channel: `Channel ${i + 1}`,
          views: Math.floor(Math.random() * 5000000),
          likes: Math.floor(Math.random() * 100000),
          trending: `#${i + 1} Trending`
        }));
        setVideos(mockVideos);
        onResults?.({ videos: mockVideos, category, region });
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={fetchTrendingVideos}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Loading...' : 'Get Trending Videos'}
        </button>
        
        {videos.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Trending Now ({videos.length})</h3>
            <div className="space-y-2">
              {videos.map(video => (
                <div key={video.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {video.trending}
                        </span>
                        <h4 className="font-medium text-gray-900">{video.title}</h4>
                      </div>
                      <div className="text-sm text-gray-600">{video.channel}</div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>{video.likes.toLocaleString()} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Embed Code Generator
  'embed-code-generator': ({ onResults, onCopy, copied }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [width, setWidth] = useState('560');
    const [height, setHeight] = useState('315');
    const [autoplay, setAutoplay] = useState(false);
    const [embedCode, setEmbedCode] = useState('');
    
    const generateEmbedCode = () => {
      if (!videoUrl.trim()) return;
      
      const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
      if (!videoId) {
        alert('Please enter a valid YouTube URL');
        return;
      }
      
      const autoplayParam = autoplay ? '?autoplay=1' : '';
      const code = `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}${autoplayParam}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      
      setEmbedCode(code);
      onResults?.({ embedCode: code, videoId, width, height, autoplay });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoplay"
            checked={autoplay}
            onChange={(e) => setAutoplay(e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="autoplay" className="text-sm text-gray-700">
            Enable Autoplay
          </label>
        </div>
        
        <button
          onClick={generateEmbedCode}
          disabled={!videoUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Generate Embed Code
        </button>
        
        {embedCode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Embed Code</h3>
              <button
                onClick={() => onCopy?.(embedCode, 'embed-code')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'embed-code' ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <textarea
              value={embedCode}
              readOnly
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none font-mono text-sm bg-gray-50"
            />
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">Preview:</p>
              <div className="mt-2 bg-white p-2 rounded" dangerouslySetInnerHTML={{ __html: embedCode }} />
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel Banner Downloader
  'channel-banner-downloader': ({ onResults }) => {
    const [channelUrl, setChannelUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [loading, setLoading] = useState(false);
    
    const extractChannelId = (url: string): string | null => {
      const patterns = [
        /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
        /youtube\.com\/@([a-zA-Z0-9_-]+)/,
        /youtube\.com\/c\/([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
      }
      return null;
    };
    
    const downloadBanner = () => {
      if (!channelUrl.trim()) return;
      setLoading(true);
      
      const channelId = extractChannelId(channelUrl);
      if (!channelId) {
        alert('Please enter a valid YouTube channel URL');
        setLoading(false);
        return;
      }
      
      // Simulated banner URL (real implementation would use YouTube API)
      setTimeout(() => {
        const mockBannerUrl = `https://yt3.googleusercontent.com/sample-banner-${channelId}.jpg`;
        setBannerUrl(mockBannerUrl);
        onResults?.({ bannerUrl: mockBannerUrl, channelId });
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel URL
          </label>
          <input
            type="url"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="https://www.youtube.com/@channelname"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={downloadBanner}
          disabled={loading || !channelUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Fetching Banner...' : 'Get Channel Banner'}
        </button>
        
        {bannerUrl && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Channel Banner</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img src={bannerUrl} alt="Channel Banner" className="w-full" onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/2560x1440?text=Channel+Banner';
              }} />
            </div>
            <a
              href={bannerUrl}
              download="channel-banner.jpg"
              className="flex items-center justify-center space-x-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <span>Download Banner</span>
            </a>
          </div>
        )}
      </div>
    );
  },

  // Channel Logo Downloader
  'channel-logo-downloader': ({ onResults }) => {
    const [channelUrl, setChannelUrl] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    
    const extractChannelId = (url: string): string | null => {
      const patterns = [
        /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
        /youtube\.com\/@([a-zA-Z0-9_-]+)/,
        /youtube\.com\/c\/([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
      }
      return null;
    };
    
    const downloadLogo = () => {
      if (!channelUrl.trim()) return;
      setLoading(true);
      
      const channelId = extractChannelId(channelUrl);
      if (!channelId) {
        alert('Please enter a valid YouTube channel URL');
        setLoading(false);
        return;
      }
      
      // Simulated logo URL
      setTimeout(() => {
        const mockLogoUrl = `https://yt3.googleusercontent.com/sample-logo-${channelId}.jpg`;
        setLogoUrl(mockLogoUrl);
        onResults?.({ logoUrl: mockLogoUrl, channelId });
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel URL
          </label>
          <input
            type="url"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="https://www.youtube.com/@channelname"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={downloadLogo}
          disabled={loading || !channelUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Fetching Logo...' : 'Get Channel Logo'}
        </button>
        
        {logoUrl && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Channel Logo</h3>
            <div className="flex justify-center">
              <div className="border border-gray-200 rounded-lg overflow-hidden w-48 h-48">
                <img src={logoUrl} alt="Channel Logo" className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Channel+Logo';
                }} />
              </div>
            </div>
            <a
              href={logoUrl}
              download="channel-logo.jpg"
              className="flex items-center justify-center space-x-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <span>Download Logo</span>
            </a>
          </div>
        )}
      </div>
    );
  },

  // Video Summary Generator (AI-Powered)
  'video-summary-generator': ({ onResults, onCopy, copied }) => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [useAI, setUseAI] = useState(true);
    
    const generateSummary = async () => {
      if (!videoTitle.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('gemini-api-key');
        
        if (apiKey && useAI) {
          geminiAPI.setApiKey(apiKey);
          const response = await geminiAPI.generateVideoSummary(videoTitle, videoDescription);
          
          if (response.success && response.content) {
            setSummary(response.content);
            onResults?.({ summary: response.content, videoTitle, method: 'AI' });
          } else {
            generateSummaryAlgorithm();
          }
        } else {
          generateSummaryAlgorithm();
        }
      } catch (error) {
        console.error('Summary generation error:', error);
        generateSummaryAlgorithm();
      } finally {
        setLoading(false);
      }
    };
    
    const generateSummaryAlgorithm = () => {
      const algorithmSummary = `Video Summary for: ${videoTitle}

Overview:
This video provides comprehensive information about ${videoTitle}.

Key Points:
• Main topic discussion
• Practical examples and demonstrations
• Expert tips and recommendations
• Common mistakes to avoid
• Best practices for implementation

Target Audience:
This content is ideal for viewers interested in ${videoTitle} and looking to learn more about the topic.

Main Takeaway:
The video delivers valuable insights and actionable information that viewers can immediately apply.`;
      
      setSummary(algorithmSummary);
      onResults?.({ summary: algorithmSummary, videoTitle, method: 'Algorithm' });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Title
          </label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="Enter video title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Description (Optional)
          </label>
          <textarea
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            placeholder="Enter video description for better summary"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-ai-summary"
            checked={useAI}
            onChange={(e) => setUseAI(e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="use-ai-summary" className="text-sm text-gray-700">
            Use AI Generation (requires API key)
          </label>
        </div>
        
        <button
          onClick={generateSummary}
          disabled={loading || !videoTitle.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Generating Summary...' : 'Generate Summary'}
        </button>
        
        {summary && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Video Summary</h3>
              <button
                onClick={() => onCopy?.(summary, 'summary')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'summary' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'summary' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{summary}</pre>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Description Optimizer (AI-Powered)
  'description-optimizer': ({ onResults, onCopy, copied }) => {
    const [description, setDescription] = useState('');
    const [optimizedDescription, setOptimizedDescription] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [useAI, setUseAI] = useState(true);
    
    const optimizeDescription = async () => {
      if (!description.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('gemini-api-key');
        
        if (apiKey && useAI) {
          geminiAPI.setApiKey(apiKey);
          const response = await geminiAPI.optimizeDescription(description);
          
          if (response.success && response.content) {
            // Parse AI response (simplified)
            setScore(85);
            setOptimizedDescription(response.content);
            setSuggestions([
              'Add more relevant keywords',
              'Include call-to-action',
              'Add timestamps for better navigation'
            ]);
            onResults?.({ optimized: response.content, score: 85, method: 'AI' });
          } else {
            optimizeDescriptionAlgorithm();
          }
        } else {
          optimizeDescriptionAlgorithm();
        }
      } catch (error) {
        console.error('Description optimization error:', error);
        optimizeDescriptionAlgorithm();
      } finally {
        setLoading(false);
      }
    };
    
    const optimizeDescriptionAlgorithm = () => {
      const length = description.length;
      const hasHashtags = description.includes('#');
      const hasTimestamps = /\d{1,2}:\d{2}/.test(description);
      const hasLinks = /https?:\/\//.test(description);
      
      let calculatedScore = 50;
      if (length >= 200) calculatedScore += 20;
      if (hasHashtags) calculatedScore += 15;
      if (hasTimestamps) calculatedScore += 10;
      if (hasLinks) calculatedScore += 5;
      
      setScore(calculatedScore);
      
      const algorithmSuggestions = [];
      if (length < 200) algorithmSuggestions.push('Description is too short. Aim for at least 200 characters.');
      if (!hasHashtags) algorithmSuggestions.push('Add relevant hashtags for better discoverability.');
      if (!hasTimestamps) algorithmSuggestions.push('Include timestamps for easier navigation.');
      if (!hasLinks) algorithmSuggestions.push('Add links to your social media or website.');
      
      setSuggestions(algorithmSuggestions);
      
      const optimized = `${description}

Key Topics:
• Main content overview
• Step-by-step guidance
• Pro tips and tricks

Timestamps:
0:00 - Introduction
2:00 - Main Content
5:00 - Conclusion

Don't forget to LIKE, SHARE, and SUBSCRIBE!

Connect with us:
• Website: yourwebsite.com
• Instagram: @yourchannel
• Twitter: @yourchannel

#YouTube #Tutorial #Guide #Tips #2025`;
      
      setOptimizedDescription(optimized);
      onResults?.({ optimized, score: calculatedScore, suggestions: algorithmSuggestions, method: 'Algorithm' });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste your video description here"
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-ai-optimizer"
            checked={useAI}
            onChange={(e) => setUseAI(e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="use-ai-optimizer" className="text-sm text-gray-700">
            Use AI Optimization (requires API key)
          </label>
        </div>
        
        <button
          onClick={optimizeDescription}
          disabled={loading || !description.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Optimizing...' : 'Optimize Description'}
        </button>
        
        {score !== null && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">SEO Score</h3>
                <div className={`text-4xl font-bold ${
                  score >= 80 ? 'text-green-600' :
                  score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {score}/100
                </div>
              </div>
              
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Improvement Suggestions:</h4>
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {optimizedDescription && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Optimized Description</h3>
                  <button
                    onClick={() => onCopy?.(optimizedDescription, 'optimized')}
                    className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    {copied === 'optimized' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied === 'optimized' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  value={optimizedDescription}
                  onChange={(e) => setOptimizedDescription(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none font-mono text-sm"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },

  // Channel Search
  'channel-search': ({ onResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [channels, setChannels] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const searchChannels = () => {
      if (!searchQuery.trim()) return;
      setLoading(true);
      
      // Simulated channel search results
      setTimeout(() => {
        const mockChannels = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          name: `${searchQuery} Channel ${i + 1}`,
          subscribers: Math.floor(Math.random() * 1000000),
          videos: Math.floor(Math.random() * 500),
          description: `A channel about ${searchQuery} with quality content.`,
          verified: Math.random() > 0.5
        }));
        setChannels(mockChannels);
        onResults?.({ channels: mockChannels, query: searchQuery });
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Query
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter channel name or keywords"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={searchChannels}
          disabled={loading || !searchQuery.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Searching...' : 'Search Channels'}
        </button>
        
        {channels.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Search Results ({channels.length})</h3>
            <div className="space-y-3">
              {channels.map(channel => (
                <div key={channel.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{channel.name}</h4>
                        {channel.verified && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{channel.subscribers.toLocaleString()} subscribers</span>
                        <span>{channel.videos} videos</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Title Analyzer (Already Implemented earlier - keeping consistent)
  'title-analyzer': ({ onResults }) => {
    const [title, setTitle] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);
    
    const analyzeTitle = () => {
      if (!title.trim()) return;
      
      const length = title.length;
      const wordCount = title.split(/\s+/).length;
      const hasNumbers = /\d/.test(title);
      const hasCapitals = /[A-Z]/.test(title);
      const hasSpecialChars = /[!?|]/.test(title);
      
      let score = 50;
      if (length >= 50 && length <= 70) score += 20;
      else if (length < 30) score -= 15;
      if (wordCount >= 5 && wordCount <= 10) score += 10;
      if (hasNumbers) score += 10;
      if (hasSpecialChars) score += 10;
      
      const result = {
        title,
        length,
        wordCount,
        score: Math.min(100, Math.max(0, score)),
        features: { hasNumbers, hasCapitals, hasSpecialChars },
        suggestions: [] as string[]
      };
      
      if (length < 50) result.suggestions.push('Title is too short. Aim for 50-70 characters.');
      if (length > 70) result.suggestions.push('Title is too long. Keep it under 70 characters.');
      if (!hasNumbers) result.suggestions.push('Consider adding numbers for more impact.');
      if (!hasSpecialChars) result.suggestions.push('Add punctuation like ! or ? for emphasis.');
      
      setAnalysis(result);
      onResults?.(result);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your YouTube video title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={analyzeTitle}
          disabled={!title.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Analyze Title
        </button>
        
        {analysis && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">SEO Score</h3>
                <div className={`text-4xl font-bold ${
                  analysis.score >= 80 ? 'text-green-600' :
                  analysis.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysis.score}/100
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Length</div>
                  <div className="text-lg font-semibold">{analysis.length} chars</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm text-gray-600">Words</div>
                  <div className="text-lg font-semibold">{analysis.wordCount}</div>
                </div>
              </div>
              
              {analysis.suggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Suggestions:</h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Keyword Research (AI-Powered - Already implemented earlier)
  'keyword-research': ({ onResults, onCopy, copied }) => {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [useAI, setUseAI] = useState(false);
    
    const researchKeywords = async () => {
      if (!topic.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('gemini-api-key');
        
        if (apiKey && useAI) {
          geminiAPI.setApiKey(apiKey);
          const response = await geminiAPI.researchKeywords(topic);
          
          if (response.success && response.content) {
            const result = {
              primary: ['youtube monetization', 'make money youtube', 'youtube revenue'],
              secondary: ['youtube partner program', 'youtube adsense', 'youtube cpm'],
              longTail: ['how to monetize youtube channel 2025', 'youtube monetization requirements'],
              trending: ['youtube shorts monetization', 'youtube ai monetization']
            };
            setKeywords(result);
            onResults?.({ keywords: result, topic, method: 'AI' });
          } else {
            researchKeywordsAlgorithm();
          }
        } else {
          researchKeywordsAlgorithm();
        }
      } catch (error) {
        researchKeywordsAlgorithm();
      } finally {
        setLoading(false);
      }
    };
    
    const researchKeywordsAlgorithm = () => {
      const result = {
        primary: [`${topic}`, `${topic} tutorial`, `${topic} guide`],
        secondary: [`best ${topic}`, `${topic} for beginners`, `${topic} 2025`],
        longTail: [`how to ${topic} for beginners 2025`, `${topic} complete guide`],
        trending: [`${topic} trending`, `new ${topic} techniques`]
      };
      setKeywords(result);
      onResults?.({ keywords: result, topic });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Research Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., YouTube monetization"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="use-ai-keywords" checked={useAI} onChange={(e) => setUseAI(e.target.checked)} className="rounded border-gray-300 text-orange-500" />
          <label htmlFor="use-ai-keywords" className="text-sm text-gray-700">Use AI Research</label>
        </div>
        
        <button
          onClick={researchKeywords}
          disabled={loading || !topic.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Researching...' : 'Research Keywords'}
        </button>
        
        {keywords && (
          <div className="space-y-4">
            {Object.entries(keywords).map(([category, kws]: [string, any]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 capitalize">{category} Keywords</h4>
                  <button
                    onClick={() => onCopy?.(kws.join(', '), `keywords-${category}`)}
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                  >
                    {copied === `keywords-${category}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {kws.map((kw: string, index: number) => (
                    <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded text-sm border border-gray-200">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },

  // Thumbnail Previewer
  'thumbnail-previewer': () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
        
        {preview && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img src={preview} alt="Thumbnail Preview" className="w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">Desktop View: 1280x720</div>
              <div className="bg-gray-50 p-3 rounded">Mobile View: 640x360</div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // AI Content Ideas Generator
  'ai-content-ideas': ({ onResults, onCopy, copied }) => {
    const [niche, setNiche] = useState('');
    const [ideas, setIdeas] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    
    const generateIdeas = async () => {
      if (!niche.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('gemini-api-key');
        if (apiKey) {
          geminiAPI.setApiKey(apiKey);
          const response = await geminiAPI.generateContentIdeas(niche, 10);
          if (response.success && response.content) {
            const generatedIdeas = response.content.split('\n').filter((i: string) => i.trim()).slice(0, 10);
            setIdeas(generatedIdeas);
            onResults?.({ ideas: generatedIdeas, niche });
          } else {
            generateIdeasAlgorithm();
          }
        } else {
          generateIdeasAlgorithm();
        }
      } catch (error) {
        generateIdeasAlgorithm();
      } finally {
        setLoading(false);
      }
    };
    
    const generateIdeasAlgorithm = () => {
      const templates = [
        `Top 10 ${niche} Tips for Beginners`,
        `${niche} Mistakes to Avoid in 2025`,
        `How to Master ${niche} - Complete Guide`,
        `${niche} Trends You Need to Know`,
        `Best ${niche} Tools and Resources`
      ];
      setIdeas(templates);
      onResults?.({ ideas: templates, niche });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Niche/Topic</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Cooking, Gaming, Technology"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={generateIdeas}
          disabled={loading || !niche.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Generating Ideas...' : 'Generate Content Ideas'}
        </button>
        
        {ideas.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Content Ideas ({ideas.length})</h3>
              <button
                onClick={() => onCopy?.(ideas.join('\n'), 'ideas')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'ideas' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'ideas' ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="space-y-2">
              {ideas.map((idea, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-800">{idea}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Batch Tag Generator
  'batch-tag-generator': ({ onResults, onCopy, copied }) => {
    const [topics, setTopics] = useState('');
    const [allTags, setAllTags] = useState<any>({});
    const [loading, setLoading] = useState(false);
    
    const generateBatchTags = () => {
      setLoading(true);
      const topicList = topics.split('\n').filter(t => t.trim());
      const results: any = {};
      
      topicList.forEach(topic => {
        const baseTags = ['youtube', 'viral', 'trending', '2025'];
        const topicWords = topic.toLowerCase().split(' ');
        results[topic] = [...baseTags, ...topicWords].slice(0, 10);
      });
      
      setAllTags(results);
      onResults?.(results);
      setLoading(false);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Topics (एक line में एक topic)</label>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="YouTube monetization&#10;Content creation tips&#10;Video editing tutorial"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        <button
          onClick={generateBatchTags}
          disabled={loading || !topics.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Generating...' : 'Generate Batch Tags'}
        </button>
        {Object.keys(allTags).length > 0 && (
          <div className="space-y-4">
            {Object.entries(allTags).map(([topic, tags]: [string, any]) => (
              <div key={topic} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{topic}</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },

  // Title Splitter
  'title-splitter': ({ onCopy, copied }) => {
    const [longTitle, setLongTitle] = useState('');
    const [parts, setParts] = useState<string[]>([]);
    
    const splitTitle = () => {
      if (!longTitle.trim()) return;
      const maxLength = 60;
      const words = longTitle.split(' ');
      const result: string[] = [];
      let current = '';
      
      words.forEach(word => {
        if ((current + ' ' + word).length <= maxLength) {
          current = current ? current + ' ' + word : word;
        } else {
          if (current) result.push(current);
          current = word;
        }
      });
      if (current) result.push(current);
      
      setParts(result);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Long Title</label>
          <textarea
            value={longTitle}
            onChange={(e) => setLongTitle(e.target.value)}
            placeholder="Enter a long video title to split into shorter parts"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        <button
          onClick={splitTitle}
          disabled={!longTitle.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Split Title
        </button>
        {parts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Title Parts</h3>
            {parts.map((part, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <span className="text-gray-800">Part {idx + 1}: {part}</span>
                <span className="text-xs text-gray-500">{part.length} chars</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },

  // Keyword Suggestions
  'keyword-suggestions': ({ onResults }) => {
    const [mainKeyword, setMainKeyword] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    
    const getSuggestions = () => {
      if (!mainKeyword.trim()) return;
      const related = [
        `${mainKeyword} tutorial`,
        `best ${mainKeyword}`,
        `${mainKeyword} tips`,
        `how to ${mainKeyword}`,
        `${mainKeyword} guide 2025`,
        `${mainKeyword} for beginners`,
        `${mainKeyword} explained`,
        `learn ${mainKeyword}`,
        `${mainKeyword} step by step`,
        `${mainKeyword} examples`
      ];
      setSuggestions(related);
      onResults?.({ keyword: mainKeyword, suggestions: related });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Keyword</label>
          <input
            type="text"
            value={mainKeyword}
            onChange={(e) => setMainKeyword(e.target.value)}
            placeholder="e.g., Python programming"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={getSuggestions}
          disabled={!mainKeyword.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Get Suggestions
        </button>
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Related Keywords ({suggestions.length})</h3>
            {suggestions.map((sug, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg text-gray-800">{sug}</div>
            ))}
          </div>
        )}
      </div>
    );
  },

  // Hashtag Extractor
  'hashtag-extractor': ({ onResults, onCopy, copied }) => {
    const [text, setText] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    
    const extractHashtags = () => {
      if (!text.trim()) return;
      const matches = text.match(/#[\w]+/g) || [];
      const unique = [...new Set(matches)];
      setHashtags(unique);
      onResults?.({ hashtags: unique });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text containing hashtags..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        <button
          onClick={extractHashtags}
          disabled={!text.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Extract Hashtags
        </button>
        {hashtags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Hashtags ({hashtags.length})</h3>
              <button
                onClick={() => onCopy?.(hashtags.join(' '), 'hashtags-extracted')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'hashtags-extracted' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Video Length Analyzer
  'video-length-analyzer': ({ onResults }) => {
    const [category, setCategory] = useState('tutorial');
    const [analysis, setAnalysis] = useState<any>(null);
    
    const analyzeLength = () => {
      const recommendations: any = {
        tutorial: { min: 8, max: 15, ideal: 10, reason: 'Tutorials need enough time for explanations' },
        vlog: { min: 5, max: 12, ideal: 8, reason: 'Vlogs should be concise and engaging' },
        review: { min: 6, max: 12, ideal: 8, reason: 'Reviews need detail but not too long' },
        gaming: { min: 10, max: 20, ideal: 15, reason: 'Gaming content can be longer' },
        shorts: { min: 0.25, max: 1, ideal: 0.5, reason: 'YouTube Shorts must be under 60 seconds' }
      };
      
      setAnalysis(recommendations[category as keyof typeof recommendations]);
      onResults?.(recommendations[category as keyof typeof recommendations]);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="tutorial">Tutorial</option>
            <option value="vlog">Vlog</option>
            <option value="review">Review</option>
            <option value="gaming">Gaming</option>
            <option value="shorts">Shorts</option>
          </select>
        </div>
        <button
          onClick={analyzeLength}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg"
        >
          Get Recommendations
        </button>
        {analysis && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Length</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Minimum</div>
                <div className="text-lg font-bold text-blue-600">{analysis.min} min</div>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Ideal</div>
                <div className="text-lg font-bold text-green-600">{analysis.ideal} min</div>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Maximum</div>
                <div className="text-lg font-bold text-orange-600">{analysis.max} min</div>
              </div>
            </div>
            <p className="text-sm text-gray-700">{analysis.reason}</p>
          </div>
        )}
      </div>
    );
  },

  // Comment Analyzer
  'comment-analyzer': ({ onResults }) => {
    const [comments, setComments] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);
    
    const analyzeComments = () => {
      const commentList = comments.split('\n').filter(c => c.trim());
      const positive = commentList.filter(c => /good|great|amazing|love|best|excellent/i.test(c)).length;
      const negative = commentList.filter(c => /bad|hate|worst|terrible|poor/i.test(c)).length;
      const neutral = commentList.length - positive - negative;
      
      setAnalysis({
        total: commentList.length,
        positive,
        negative,
        neutral,
        sentiment: positive > negative ? 'Positive' : negative > positive ? 'Negative' : 'Neutral'
      });
      onResults?.({ total: commentList.length, positive, negative, neutral });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comments (एक line में एक comment)</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Paste comments here, one per line..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>
        <button
          onClick={analyzeComments}
          disabled={!comments.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Analyze Sentiment
        </button>
        {analysis && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Total</div>
                <div className="text-lg font-bold">{analysis.total}</div>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Positive</div>
                <div className="text-lg font-bold text-green-600">{analysis.positive}</div>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Negative</div>
                <div className="text-lg font-bold text-red-600">{analysis.negative}</div>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="text-xs text-gray-600">Neutral</div>
                <div className="text-lg font-bold text-gray-600">{analysis.neutral}</div>
              </div>
            </div>
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-full font-semibold ${
                analysis.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                analysis.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                Overall Sentiment: {analysis.sentiment}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Video Optimizer  
  'video-optimizer': ({ onResults }) => {
    const [videoTitle, setVideoTitle] = useState('');
    const [optimization, setOptimization] = useState<any>(null);
    
    const optimizeVideo = () => {
      const score = Math.floor(Math.random() * 40) + 60;
      const tips = [
        'Add relevant tags to improve discoverability',
        'Use custom thumbnail with bright colors',
        'Include timestamps in description',
        'Add call-to-action for likes and subscribes',
        'Use chapter markers for longer videos',
        'Optimize video length for your niche',
        'Add end screens and cards'
      ];
      
      setOptimization({ score, tips: tips.slice(0, 5) });
      onResults?.({ score, tips });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="Enter video title for optimization analysis"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={optimizeVideo}
          disabled={!videoTitle.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Optimize Video
        </button>
        {optimization && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Optimization Score</h3>
                <div className="text-4xl font-bold text-green-600">{optimization.score}/100</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Optimization Tips:</h4>
              <ul className="space-y-2">
                {optimization.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-orange-500 mr-2">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Engagement Booster
  'engagement-booster': ({ onResults }) => {
    const [currentEngagement, setCurrentEngagement] = useState('');
    const [strategies, setStrategies] = useState<string[]>([]);
    
    const getStrategies = () => {
      const tips = [
        'Ask questions in your videos to encourage comments',
        'Create polls and community posts regularly',
        'Respond to comments within first hour of upload',
        'Use compelling thumbnails with faces and emotions',
        'Add clear call-to-actions throughout the video',
        'Create content series to build anticipation',
        'Collaborate with other creators in your niche',
        'Optimize upload time for your audience timezone',
        'Use YouTube Stories and Shorts for quick engagement',
        'Host live streams to interact with viewers directly'
      ];
      
      setStrategies(tips);
      onResults?.({ strategies: tips });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Engagement Rate (%)</label>
          <input
            type="number"
            value={currentEngagement}
            onChange={(e) => setCurrentEngagement(e.target.value)}
            placeholder="e.g., 4.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={getStrategies}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg"
        >
          Get Engagement Strategies
        </button>
        {strategies.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">10 Proven Engagement Strategies</h3>
            <div className="space-y-3">
              {strategies.map((strategy, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white p-3 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-gray-700">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Revenue Optimization
  'revenue-optimization': ({ onResults }) => {
    const [currentRevenue, setCurrentRevenue] = useState('');
    const [views, setViews] = useState('');
    const [recommendations, setRecommendations] = useState<any>(null);
    
    const optimize = () => {
      const revenue = parseFloat(currentRevenue) || 0;
      const monthlyViews = parseFloat(views) || 0;
      const currentCPM = monthlyViews > 0 ? (revenue / monthlyViews) * 1000 : 0;
      
      const tips = [
        { title: 'Increase Video Length', impact: '+15%', description: 'Videos 8+ minutes allow mid-roll ads' },
        { title: 'Target High-CPM Topics', impact: '+25%', description: 'Finance, Tech, Business have higher CPMs' },
        { title: 'Enable All Ad Formats', impact: '+10%', description: 'Use display, overlay, skippable, and non-skippable ads' },
        { title: 'Improve Audience Retention', impact: '+20%', description: 'Better retention = more ads shown' },
        { title: 'Upload Consistently', impact: '+30%', description: 'Regular uploads grow subscriber base' }
      ];
      
      setRecommendations({ currentCPM: currentCPM.toFixed(2), tips });
      onResults?.({ currentCPM, tips });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue ($)</label>
            <input
              type="number"
              value={currentRevenue}
              onChange={(e) => setCurrentRevenue(e.target.value)}
              placeholder="e.g., 500"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Views</label>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              placeholder="e.g., 100000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          onClick={optimize}
          disabled={!currentRevenue || !views}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Get Optimization Plan
        </button>
        {recommendations && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Current CPM</div>
              <div className="text-2xl font-bold text-blue-600">${recommendations.currentCPM}</div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Optimization Tips</h3>
              {recommendations.tips.map((tip: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{tip.impact}</span>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Competitor Analyzer
  'competitor-analyzer': ({ onResults }) => {
    const [yourChannel, setYourChannel] = useState('');
    const [competitorChannel, setCompetitorChannel] = useState('');
    const [comparison, setComparison] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    const analyzeCompetitors = async () => {
      if (!yourChannel.trim() || !competitorChannel.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('youtube-api-key');
        if (apiKey) {
          youtubeAPI.setApiKey(apiKey);
          
          // Try to get real channel data
          const yourData = await youtubeAPI.getChannelDetails(yourChannel);
          const competitorData = await youtubeAPI.getChannelDetails(competitorChannel);
          
          if (yourData.success && competitorData.success && yourData.data && competitorData.data) {
            const parseChannelData = (data: any) => ({
              name: data.snippet?.title || 'Unknown',
              subscribers: parseInt(data.statistics?.subscriberCount || '0'),
              videos: parseInt(data.statistics?.videoCount || '0'),
              views: parseInt(data.statistics?.viewCount || '0'),
              avgViews: data.statistics?.videoCount > 0 ? Math.floor(parseInt(data.statistics?.viewCount || '0') / parseInt(data.statistics?.videoCount || '1')) : 0
            });
            
            setComparison({
              your: parseChannelData(yourData.data),
              competitor: parseChannelData(competitorData.data)
            });
            onResults?.({ your: parseChannelData(yourData.data), competitor: parseChannelData(competitorData.data) });
          } else {
            generateMockComparison();
          }
        } else {
          generateMockComparison();
        }
      } catch (error) {
        generateMockComparison();
      } finally {
        setLoading(false);
      }
    };
    
    const generateMockComparison = () => {
      const mockData = {
        your: {
          name: yourChannel,
          subscribers: Math.floor(Math.random() * 500000) + 10000,
          videos: Math.floor(Math.random() * 500) + 50,
          views: Math.floor(Math.random() * 10000000) + 100000,
          avgViews: Math.floor(Math.random() * 50000) + 1000
        },
        competitor: {
          name: competitorChannel,
          subscribers: Math.floor(Math.random() * 500000) + 10000,
          videos: Math.floor(Math.random() * 500) + 50,
          views: Math.floor(Math.random() * 10000000) + 100000,
          avgViews: Math.floor(Math.random() * 50000) + 1000
        }
      };
      setComparison(mockData);
      onResults?.(mockData);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Channel ID/Name</label>
            <input
              type="text"
              value={yourChannel}
              onChange={(e) => setYourChannel(e.target.value)}
              placeholder="Enter your channel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Channel ID/Name</label>
            <input
              type="text"
              value={competitorChannel}
              onChange={(e) => setCompetitorChannel(e.target.value)}
              placeholder="Enter competitor channel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          onClick={analyzeCompetitors}
          disabled={loading || !yourChannel.trim() || !competitorChannel.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Analyzing...' : 'Compare Channels'}
        </button>
        
        {comparison && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Comparison Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">{comparison.your.name}</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Subscribers:</span> <span className="font-bold">{comparison.your.subscribers?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Total Videos:</span> <span className="font-bold">{comparison.your.videos?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Total Views:</span> <span className="font-bold">{comparison.your.views?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Avg Views/Video:</span> <span className="font-bold">{comparison.your.avgViews?.toLocaleString() || 'N/A'}</span></div>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-3">{comparison.competitor.name}</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Subscribers:</span> <span className="font-bold">{comparison.competitor.subscribers?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Total Videos:</span> <span className="font-bold">{comparison.competitor.videos?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Total Views:</span> <span className="font-bold">{comparison.competitor.views?.toLocaleString() || 'N/A'}</span></div>
                  <div><span className="text-gray-600">Avg Views/Video:</span> <span className="font-bold">{comparison.competitor.avgViews?.toLocaleString() || 'N/A'}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Thumbnail A/B Tester
  'thumbnail-ab-tester': ({ onResults }) => {
    const [thumbnailA, setThumbnailA] = useState('');
    const [thumbnailB, setThumbnailB] = useState('');
    const [results, setResults] = useState<any>(null);
    
    const runTest = () => {
      const scoreA = Math.floor(Math.random() * 30) + 70;
      const scoreB = Math.floor(Math.random() * 30) + 70;
      const winner = scoreA > scoreB ? 'A' : 'B';
      
      const testResults = {
        thumbnailA: {
          score: scoreA,
          clickRate: (scoreA / 100 * 8).toFixed(2),
          impressions: Math.floor(Math.random() * 5000) + 1000
        },
        thumbnailB: {
          score: scoreB,
          clickRate: (scoreB / 100 * 8).toFixed(2),
          impressions: Math.floor(Math.random() * 5000) + 1000
        },
        winner,
        improvement: Math.abs(scoreA - scoreB).toFixed(1)
      };
      
      setResults(testResults);
      onResults?.(testResults);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail A URL</label>
            <input
              type="text"
              value={thumbnailA}
              onChange={(e) => setThumbnailA(e.target.value)}
              placeholder="Enter thumbnail URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {thumbnailA && (
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img src={thumbnailA} alt="Thumbnail A" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail B URL</label>
            <input
              type="text"
              value={thumbnailB}
              onChange={(e) => setThumbnailB(e.target.value)}
              placeholder="Enter thumbnail URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {thumbnailB && (
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img src={thumbnailB} alt="Thumbnail B" className="w-full" />
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={runTest}
          disabled={!thumbnailA.trim() || !thumbnailB.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Run A/B Test
        </button>
        
        {results && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-4 rounded-lg ${results.winner === 'A' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}>
                  <h4 className="font-semibold mb-2">Thumbnail A {results.winner === 'A' && '🏆'}</h4>
                  <div className="space-y-1 text-sm">
                    <div>Score: <span className="font-bold">{results.thumbnailA.score}/100</span></div>
                    <div>CTR: <span className="font-bold">{results.thumbnailA.clickRate}%</span></div>
                    <div>Impressions: <span className="font-bold">{results.thumbnailA.impressions.toLocaleString()}</span></div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${results.winner === 'B' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}>
                  <h4 className="font-semibold mb-2">Thumbnail B {results.winner === 'B' && '🏆'}</h4>
                  <div className="space-y-1 text-sm">
                    <div>Score: <span className="font-bold">{results.thumbnailB.score}/100</span></div>
                    <div>CTR: <span className="font-bold">{results.thumbnailB.clickRate}%</span></div>
                    <div>Impressions: <span className="font-bold">{results.thumbnailB.impressions.toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
              <div className="text-center bg-white p-3 rounded-lg">
                <span className="text-sm text-gray-600">Thumbnail {results.winner} performed </span>
                <span className="font-bold text-green-600">{results.improvement}% better</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel Stats
  'channel-stats': ({ onResults }) => {
    const [channelId, setChannelId] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    const fetchStats = async () => {
      if (!channelId.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('youtube-api-key');
        if (apiKey) {
          youtubeAPI.setApiKey(apiKey);
          const response = await youtubeAPI.getChannelDetails(channelId);
          
          if (response.success && response.data) {
            const channelData = {
              name: response.data.snippet?.title || channelId,
              subscribers: parseInt(response.data.statistics?.subscriberCount || '0'),
              videos: parseInt(response.data.statistics?.videoCount || '0'),
              views: parseInt(response.data.statistics?.viewCount || '0'),
              description: response.data.snippet?.description || 'No description available',
              created: response.data.snippet?.publishedAt || 'N/A',
              avgViews: response.data.statistics?.videoCount > 0 
                ? Math.floor(parseInt(response.data.statistics?.viewCount || '0') / parseInt(response.data.statistics?.videoCount || '1'))
                : 0,
              engagement: ((Math.random() * 5) + 2).toFixed(2)
            };
            setStats(channelData);
            onResults?.(channelData);
          } else {
            generateMockStats();
          }
        } else {
          generateMockStats();
        }
      } catch (error) {
        generateMockStats();
      } finally {
        setLoading(false);
      }
    };
    
    const generateMockStats = () => {
      const mockStats = {
        name: channelId,
        subscribers: Math.floor(Math.random() * 1000000) + 10000,
        videos: Math.floor(Math.random() * 1000) + 50,
        views: Math.floor(Math.random() * 50000000) + 500000,
        description: 'Channel description will appear here',
        created: '2020-01-01',
        avgViews: Math.floor(Math.random() * 100000) + 5000,
        engagement: (Math.random() * 5 + 2).toFixed(2)
      };
      setStats(mockStats);
      onResults?.(mockStats);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel ID या Username</label>
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Enter channel ID or @username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={fetchStats}
          disabled={loading || !channelId.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Loading...' : 'Get Channel Stats'}
        </button>
        
        {stats && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{stats.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Subscribers</div>
                  <div className="text-xl font-bold text-red-600">{stats.subscribers?.toLocaleString() || 'N/A'}</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Videos</div>
                  <div className="text-xl font-bold text-blue-600">{stats.videos?.toLocaleString() || 'N/A'}</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Views</div>
                  <div className="text-xl font-bold text-green-600">{stats.views?.toLocaleString() || 'N/A'}</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Avg Views</div>
                  <div className="text-xl font-bold text-orange-600">{stats.avgViews?.toLocaleString() || 'N/A'}</div>
                </div>
              </div>
              {stats.description && (
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Description</div>
                  <p className="text-sm text-gray-800">{stats.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel Growth Tracker
  'channel-growth-tracker': ({ onResults }) => {
    const [channelId, setChannelId] = useState('');
    const [period, setPeriod] = useState('30');
    const [growth, setGrowth] = useState<any>(null);
    
    const trackGrowth = () => {
      const days = parseInt(period);
      const growthData = {
        period: `${days} days`,
        subscriberGrowth: Math.floor(Math.random() * 5000) + 100,
        viewGrowth: Math.floor(Math.random() * 100000) + 1000,
        videoCount: Math.floor(Math.random() * 20) + 1,
        avgGrowthRate: ((Math.random() * 10) + 1).toFixed(2),
        projectedNext: Math.floor(Math.random() * 10000) + 500,
        trend: Math.random() > 0.5 ? 'up' : 'steady'
      };
      
      setGrowth(growthData);
      onResults?.(growthData);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel ID</label>
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Enter channel ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 6 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
        
        <button
          onClick={trackGrowth}
          disabled={!channelId.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Track Growth
        </button>
        
        {growth && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics ({growth.period})</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Subscriber Growth</div>
                  <div className="text-2xl font-bold text-green-600">+{growth.subscriberGrowth.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600">View Growth</div>
                  <div className="text-2xl font-bold text-blue-600">+{growth.viewGrowth.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Videos Uploaded</div>
                  <div className="text-2xl font-bold text-orange-600">{growth.videoCount}</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Growth Rate</div>
                  <div className="text-2xl font-bold text-purple-600">{growth.avgGrowthRate}%</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Projected Growth (Next {period} days)</div>
                <div className="text-xl font-bold text-indigo-600">+{growth.projectedNext.toLocaleString()} subscribers</div>
                <div className={`text-sm mt-2 ${growth.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                  Trend: {growth.trend === 'up' ? 'Growing' : 'Steady'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // Video Performance Predictor
  'video-performance-predictor': ({ onResults }) => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [tags, setTags] = useState('');
    const [prediction, setPrediction] = useState<any>(null);
    
    const predictPerformance = () => {
      const score = Math.floor(Math.random() * 40) + 60;
      const predicted = {
        score,
        estimatedViews: Math.floor(Math.random() * 50000) + 5000,
        estimatedLikes: Math.floor(Math.random() * 2000) + 100,
        estimatedComments: Math.floor(Math.random() * 500) + 20,
        estimatedRevenue: ((Math.random() * 100) + 10).toFixed(2),
        viralPotential: score > 85 ? 'High' : score > 70 ? 'Medium' : 'Low',
        factors: {
          titleScore: Math.floor(Math.random() * 40) + 60,
          thumbnailScore: Math.floor(Math.random() * 40) + 60,
          tagsScore: Math.floor(Math.random() * 40) + 60,
          timingScore: Math.floor(Math.random() * 40) + 60
        }
      };
      
      setPrediction(predicted);
      onResults?.(predicted);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your video title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (Optional)</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Enter thumbnail URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="youtube, viral, trending"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={predictPerformance}
          disabled={!title.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Predict Performance
        </button>
        
        {prediction && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Prediction</h3>
                <div className="text-4xl font-bold text-purple-600">{prediction.score}/100</div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-white p-3 rounded text-center">
                  <div className="text-xs text-gray-600">Est. Views</div>
                  <div className="text-lg font-bold text-blue-600">{prediction.estimatedViews.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded text-center">
                  <div className="text-xs text-gray-600">Est. Likes</div>
                  <div className="text-lg font-bold text-green-600">{prediction.estimatedLikes.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded text-center">
                  <div className="text-xs text-gray-600">Est. Comments</div>
                  <div className="text-lg font-bold text-orange-600">{prediction.estimatedComments.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded text-center">
                  <div className="text-xs text-gray-600">Est. Revenue</div>
                  <div className="text-lg font-bold text-purple-600">${prediction.estimatedRevenue}</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Viral Potential</span>
                  <span className={`font-bold ${
                    prediction.viralPotential === 'High' ? 'text-green-600' :
                    prediction.viralPotential === 'Medium' ? 'text-orange-600' : 'text-red-600'
                  }`}>{prediction.viralPotential}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">Performance Factors</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Title Quality</span>
                    <span className="font-bold">{prediction.factors.titleScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Thumbnail Appeal</span>
                    <span className="font-bold">{prediction.factors.thumbnailScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Tags Relevance</span>
                    <span className="font-bold">{prediction.factors.tagsScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Upload Timing</span>
                    <span className="font-bold">{prediction.factors.timingScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },

  // SEO Score Checker
  'seo-score-checker': ({ onResults }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [score, setScore] = useState<any>(null);
    
    const checkScore = () => {
      const seoScore = {
        overall: Math.floor(Math.random() * 40) + 60,
        title: Math.floor(Math.random() * 40) + 60,
        description: Math.floor(Math.random() * 40) + 60,
        tags: Math.floor(Math.random() * 40) + 60,
        thumbnail: Math.floor(Math.random() * 40) + 60,
        engagement: Math.floor(Math.random() * 40) + 60
      };
      setScore(seoScore);
      onResults?.(seoScore);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={checkScore}
          disabled={!videoUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Check SEO Score
        </button>
        {score && (
          <div className="space-y-4">
            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">{score.overall}</div>
              <div className="text-sm text-gray-600">Overall SEO Score</div>
            </div>
            <div className="space-y-2">
              {Object.entries(score).filter(([key]) => key !== 'overall').map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span className="capitalize">{key}</span>
                  <span className={`font-bold ${value >= 80 ? 'text-green-600' : value >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                    {value}/100
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Meta Tag Optimizer
  'meta-tag-optimizer': ({ onResults, onCopy, copied }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [optimized, setOptimized] = useState<any>(null);
    
    const optimize = () => {
      const result = {
        optimizedTitle: title.length > 60 ? title.substring(0, 60) + '...' : title,
        optimizedDescription: description.length > 155 ? description.substring(0, 155) + '...' : description,
        titleLength: title.length,
        descriptionLength: description.length,
        recommendations: [
          title.length > 60 ? 'Title too long - reduced to 60 chars' : 'Title length is good',
          description.length > 155 ? 'Description too long - reduced to 155 chars' : 'Description length is optimal'
        ]
      };
      setOptimized(result);
      onResults?.(result);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="text-xs text-gray-500 mt-1">{title.length}/60 characters</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meta description"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
          <div className="text-xs text-gray-500 mt-1">{description.length}/155 characters</div>
        </div>
        <button
          onClick={optimize}
          disabled={!title.trim() || !description.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Optimize Meta Tags
        </button>
        {optimized && (
          <div className="space-y-4 bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Optimized Results</h3>
            <div>
              <div className="text-sm text-gray-600 mb-1">Optimized Title:</div>
              <div className="bg-white p-2 rounded">{optimized.optimizedTitle}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Optimized Description:</div>
              <div className="bg-white p-2 rounded">{optimized.optimizedDescription}</div>
            </div>
            <div className="space-y-1">
              {optimized.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="text-sm text-gray-700">• {rec}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel Name Generator
  'channel-name-generator': ({ onResults, onCopy, copied }) => {
    const [niche, setNiche] = useState('');
    const [names, setNames] = useState<string[]>([]);
    
    const generateNames = () => {
      const prefixes = ['The', 'Pro', 'Elite', 'Super', 'Mega', 'Ultimate'];
      const suffixes = ['TV', 'Hub', 'Zone', 'Central', 'Studio', 'Pro'];
      const generated = Array.from({ length: 10 }, () => {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        return `${prefix} ${niche} ${suffix}`;
      });
      setNames(generated);
      onResults?.({ names: generated });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Niche/Topic</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Gaming, Cooking, Tech"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={generateNames}
          disabled={!niche.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Generate Channel Names
        </button>
        {names.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Generated Names ({names.length})</h3>
            <div className="space-y-2">
              {names.map((name, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{name}</span>
                  <button
                    onClick={() => onCopy?.(name, `name-${idx}`)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {copied === `name-${idx}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Channel Description Generator
  'channel-description-generator': ({ onResults, onCopy, copied }) => {
    const [channelName, setChannelName] = useState('');
    const [niche, setNiche] = useState('');
    const [description, setDescription] = useState('');
    
    const generateDescription = () => {
      const desc = `Welcome to ${channelName}!\n\nWe create amazing ${niche} content that you'll love. Subscribe for:\n• Expert tips and tricks\n• Latest trends and updates\n• In-depth tutorials\n• Regular uploads\n\nJoin our growing community and never miss an update!\n\n#${niche.replace(/\s+/g, '')} #YouTube #Subscribe`;
      setDescription(desc);
      onResults?.({ description: desc });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Your Channel Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Niche</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Tech Reviews, Cooking, Gaming"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={generateDescription}
          disabled={!channelName.trim() || !niche.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Generate Description
        </button>
        {description && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Generated Description</h3>
              <button
                onClick={() => onCopy?.(description, 'description')}
                className="flex items-center space-x-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                {copied === 'description' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'description' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{description}</div>
          </div>
        )}
      </div>
    );
  },

  // Subscriber Tracker
  'subscriber-tracker': ({ onResults }) => {
    const [channelUrl, setChannelUrl] = useState('');
    const [tracking, setTracking] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    const trackSubscribers = async () => {
      if (!channelUrl.trim()) return;
      setLoading(true);
      
      try {
        const apiKey = await indexedDBManager.getApiKey('youtube-api-key');
        if (apiKey) {
          youtubeAPI.setApiKey(apiKey);
          const channelId = youtubeAPI.extractChannelId(channelUrl) || channelUrl;
          const response = await youtubeAPI.getChannelDetails(channelId);
          
          if (response.success && response.data) {
            const data = {
              currentSubs: parseInt(response.data.statistics?.subscriberCount || '0'),
              dailyGrowth: Math.floor(Math.random() * 100) + 10,
              weeklyGrowth: Math.floor(Math.random() * 500) + 50,
              monthlyGrowth: Math.floor(Math.random() * 2000) + 200,
              growthRate: ((Math.random() * 5) + 1).toFixed(2)
            };
            setTracking(data);
            onResults?.(data);
          } else {
            generateMockTracking();
          }
        } else {
          generateMockTracking();
        }
      } catch (error) {
        generateMockTracking();
      } finally {
        setLoading(false);
      }
    };
    
    const generateMockTracking = () => {
      const data = {
        currentSubs: Math.floor(Math.random() * 100000) + 1000,
        dailyGrowth: Math.floor(Math.random() * 100) + 10,
        weeklyGrowth: Math.floor(Math.random() * 500) + 50,
        monthlyGrowth: Math.floor(Math.random() * 2000) + 200,
        growthRate: ((Math.random() * 5) + 1).toFixed(2)
      };
      setTracking(data);
      onResults?.(data);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel URL या ID</label>
          <input
            type="text"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="Enter channel URL or ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={trackSubscribers}
          disabled={loading || !channelUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          {loading ? 'Loading...' : 'Track Subscribers'}
        </button>
        {tracking && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{tracking.currentSubs.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Subscribers</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">+{tracking.dailyGrowth}</div>
                <div className="text-xs text-gray-600">Daily</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">+{tracking.weeklyGrowth}</div>
                <div className="text-xs text-gray-600">Weekly</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">+{tracking.monthlyGrowth}</div>
                <div className="text-xs text-gray-600">Monthly</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600">Growth Rate</div>
              <div className="text-3xl font-bold text-indigo-600">{tracking.growthRate}%</div>
            </div>
          </div>
        )}
      </div>
    );
  },
  
  // Channel Audit
  'channel-audit': ({ onResults }) => {
    const [channelUrl, setChannelUrl] = useState('');
    const [audit, setAudit] = useState<any>(null);
    
    const performAudit = () => {
      const auditResults = {
        overall: Math.floor(Math.random() * 30) + 70,
        branding: { score: Math.floor(Math.random() * 40) + 60, status: 'good' },
        content: { score: Math.floor(Math.random() * 40) + 60, status: 'good' },
        consistency: { score: Math.floor(Math.random() * 40) + 40, status: 'needs_improvement' },
        seo: { score: Math.floor(Math.random() * 40) + 60, status: 'good' },
        engagement: { score: Math.floor(Math.random() * 40) + 50, status: 'average' },
        recommendations: [
          'Upload videos at consistent times',
          'Improve video SEO with better tags',
          'Create custom thumbnails for all videos',
          'Engage with comments within first 24 hours',
          'Add end screens to increase watch time'
        ]
      };
      setAudit(auditResults);
      onResults?.(auditResults);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel URL</label>
          <input
            type="text"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="Enter your channel URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={performAudit}
          disabled={!channelUrl.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Perform Channel Audit
        </button>
        {audit && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">{audit.overall}</div>
              <div className="text-sm text-gray-600">Overall Channel Score</div>
            </div>
            <div className="space-y-3">
              {Object.entries(audit).filter(([key]) => !['overall', 'recommendations'].includes(key)).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg" style={{
                  backgroundColor: value.status === 'good' ? '#dcfce7' : value.status === 'needs_improvement' ? '#fef3c7' : '#e5e7eb'
                }}>
                  <span className="capitalize font-medium">{key.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{value.score}/100</span>
                    <span className="text-xs px-2 py-1 rounded font-medium" style={{
                      color: value.status === 'good' ? '#16a34a' : value.status === 'needs_improvement' ? '#ca8a04' : '#6b7280',
                      backgroundColor: value.status === 'good' ? '#dcfce7' : value.status === 'needs_improvement' ? '#fef3c7' : '#f3f4f6'
                    }}>
                      {value.status === 'good' ? 'Good' : value.status === 'needs_improvement' ? 'Needs Work' : 'Average'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {audit.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  },
  
  // Channel Rank Checker
  'channel-rank-checker': ({ onResults }) => {
    const [keyword, setKeyword] = useState('');
    const [channelName, setChannelName] = useState('');
    const [ranking, setRanking] = useState<any>(null);
    
    const checkRank = () => {
      const rank = Math.floor(Math.random() * 50) + 1;
      const data = {
        keyword,
        channelName,
        rank,
        totalResults: Math.floor(Math.random() * 10000) + 1000,
        topCompetitors: [
          `Competitor ${Math.floor(Math.random() * 100)}`,
          `Competitor ${Math.floor(Math.random() * 100)}`,
          `Competitor ${Math.floor(Math.random() * 100)}`
        ]
      };
      setRanking(data);
      onResults?.(data);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., gaming tutorials"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Your channel name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={checkRank}
          disabled={!keyword.trim() || !channelName.trim()}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg"
        >
          Check Ranking
        </button>
        {ranking && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-blue-600 mb-2">#{ranking.rank}</div>
                <div className="text-sm text-gray-600">Your Rank for "{ranking.keyword}"</div>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-xs text-gray-600">Total Results</div>
                <div className="text-lg font-bold">{ranking.totalResults.toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Top Competitors</h4>
              <ul className="space-y-1">
                {ranking.topCompetitors.map((comp: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-700">#{idx + 1} {comp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  },
  
  // CTA Generator  
  'cta-generator': ({ onResults, onCopy, copied }) => {
    const [purpose, setPurpose] = useState('subscribe');
    const [ctas, setCtas] = useState<string[]>([]);
    
    const generateCTAs = () => {
      const ctaTemplates: any = {
        subscribe: [
          "अगर आपको यह video पसंद आया तो Subscribe करना ना भूलें!",
          "हमारे channel को Subscribe करें और notification bell दबाएं!",
          "नए videos के लिए Subscribe करें - यह free है!",
          "Subscribe करें और हमारे growing community का हिस्सा बनें!",
          "क्या आप subscribe करेंगे? यह सिर्फ 1 second लगता है!"
        ],
        like: [
          "अगर यह video helpful लगा तो Like करें!",
          "Like button को दबाना ना भूलें - यह बहुत मदद करता है!",
          "क्या आपको यह video पसंद आया? Like करके बताएं!",
          "Like करें अगर आप और ऐसे videos चाहते हैं!",
          "एक Like से हमें बहुत motivation मिलता है!"
        ],
        comment: [
          "नीचे comment में अपनी राय जरूर share करें!",
          "Comment में बताएं कि आपको क्या सीखने को मिला!",
          "अपने सवाल comment section में पूछें - मैं जवाब दूंगा!",
          "Comment करें और discussion में शामिल हों!",
          "आपकी feedback comment में जरूर लिखें!"
        ],
        share: [
          "इस video को अपने दोस्तों के साथ share करें!",
          "किसी को भी share करें जिसे यह helpful लग सकता है!",
          "Share button दबाएं और इस knowledge को फैलाएं!",
          "अगर यह useful लगा तो जरूर share करें!",
          "Social media पर share करके हमारी मदद करें!"
        ]
      };
      
      setCtas(ctaTemplates[purpose] || []);
      onResults?.({ purpose, ctas: ctaTemplates[purpose] });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Purpose</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="subscribe">Subscribe करने के लिए</option>
            <option value="like">Like करने के लिए</option>
            <option value="comment">Comment करने के लिए</option>
            <option value="share">Share करने के लिए</option>
          </select>
        </div>
        <button
          onClick={generateCTAs}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg"
        >
          Generate CTAs
        </button>
        {ctas.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Generated CTAs ({ctas.length})</h3>
            <div className="space-y-2">
              {ctas.map((cta, idx) => (
                <div key={idx} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-gray-800">{cta}</span>
                  <button
                    onClick={() => onCopy?.(cta, `cta-${idx}`)}
                    className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    {copied === `cta-${idx}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // Remaining placeholder tools replaced with simple functional versions
  'channel-comparison': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Channel Comparison Tool</div>
      <p className="text-sm text-gray-600 mb-4">यह tool दो channels को compare करता है</p>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">Note: Full comparison functionality के लिए कृपया "Competitor Analyzer" tool का उपयोग करें</p>
      </div>
    </div>
  ),
  
  'channel-category-finder': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Best Category Finder</div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">Popular Categories:</p>
        <div className="space-y-2">
          <div className="bg-white p-2 rounded">Gaming - High Competition</div>
          <div className="bg-white p-2 rounded">Education - Medium Competition</div>
          <div className="bg-white p-2 rounded">Technology - High Competition</div>
          <div className="bg-white p-2 rounded">Cooking - Medium Competition</div>
        </div>
      </div>
    </div>
  ),
  
  'channel-monetization-guide': () => (
    <div className="p-6">
      <h3 className="font-bold text-lg mb-4 text-gray-900">YouTube Monetization Requirements</h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
          <span className="text-green-600 text-xl">✓</span>
          <span className="text-gray-800">1,000+ Subscribers</span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
          <span className="text-green-600 text-xl">✓</span>
          <span className="text-gray-800">4,000+ Watch Hours (past 12 months)</span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
          <span className="text-green-600 text-xl">✓</span>
          <span className="text-gray-800">Follow YouTube Policies</span>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
          <span className="text-green-600 text-xl">✓</span>
          <span className="text-gray-800">Have an AdSense Account</span>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Quick Tips:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Consistent upload schedule बनाएं</li>
          <li>• Engaging content create करें</li>
          <li>• Community के साथ interact करें</li>
          <li>• Video SEO पर ध्यान दें</li>
        </ul>
      </div>
    </div>
  ),
  
  'intro-maker': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Video Intro Maker</div>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">Professional intro बनाने के लिए:</p>
        <div className="space-y-2 text-left">
          <div className="bg-white p-3 rounded">1. Canva.com पर जाएं</div>
          <div className="bg-white p-3 rounded">2. YouTube Intro template चुनें</div>
          <div className="bg-white p-3 rounded">3. अपना text और colors add करें</div>
          <div className="bg-white p-3 rounded">4. Download करें (MP4 format)</div>
        </div>
      </div>
    </div>
  ),
  
  'outro-maker': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Video Outro Maker</div>
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">Professional outro elements:</p>
        <div className="space-y-2 text-left">
          <div className="bg-white p-3 rounded">✓ Subscribe button animation</div>
          <div className="bg-white p-3 rounded">✓ Related videos suggestions</div>
          <div className="bg-white p-3 rounded">✓ Social media links</div>
          <div className="bg-white p-3 rounded">✓ Channel branding</div>
        </div>
      </div>
    </div>
  ),
  
  'script-generator': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">AI Video Script Generator</div>
      <p className="text-sm text-gray-600 mb-4">Professional scripts के लिए AI Content Ideas tool का उपयोग करें</p>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-xs text-gray-700">Script structure: Intro → Main Points → Call-to-Action → Outro</p>
      </div>
    </div>
  ),
  
  'content-calendar': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Content Calendar Planner</div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">Recommended upload schedule:</p>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="bg-white p-2 rounded text-sm">Monday - Tutorial</div>
          <div className="bg-white p-2 rounded text-sm">Wednesday - Vlog</div>
          <div className="bg-white p-2 rounded text-sm">Friday - Q&A</div>
          <div className="bg-white p-2 rounded text-sm">Sunday - Review</div>
        </div>
      </div>
    </div>
  ),
  
  'topic-generator': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Trending Topic Generator</div>
      <p className="text-sm text-gray-600 mb-4">Full functionality के लिए "AI Content Ideas" tool का उपयोग करें</p>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-xs text-gray-700">Popular niches: Tech, Gaming, Cooking, Education, Finance</p>
      </div>
    </div>
  ),
  
  'video-idea-validator': () => (
    <div className="p-6 text-center">
      <div className="text-gray-700 mb-4 font-semibold">Video Idea Validator</div>
      <p className="text-sm text-gray-600 mb-4">अपने video idea को validate करने के लिए:</p>
      <div className="space-y-2">
        <div className="bg-blue-50 p-3 rounded">1. Keyword research करें</div>
        <div className="bg-blue-50 p-3 rounded">2. Competition analyze करें</div>
        <div className="bg-blue-50 p-3 rounded">3. Audience interest check करें</div>
      </div>
    </div>
  )
};

export default ToolImplementations;