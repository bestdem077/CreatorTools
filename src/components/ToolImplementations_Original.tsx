import React, { useState } from 'react';
import { Download } from 'lucide-react';

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
🎬 In this video, you'll learn everything about ${keyword}!

📋 Topics Covered in This Video:
✅ Complete ${keyword} Tutorial
✅ Step-by-step Guide  
✅ Pro Tips and Tricks
✅ Avoid Common Mistakes
✅ Best Practices

⏰ Video Timeline:
0:00 - Introduction
1:30 - Main Topic
3:00 - Tips & Tricks
5:00 - Conclusion

🔔 If this video was helpful, don't forget to LIKE!
📢 SHARE with your friends!
🔔 SUBSCRIBE and hit the BELL ICON for new videos!

📞 Contact: your.email@example.com
🌐 Website: yourwebsite.com

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

  // Tag Extractor
  'tag-extractor': ({ onResults }) => {
    const [url, setUrl] = useState('');
    const [extractedTags, setExtractedTags] = useState<string[]>([]);
    
    const extractTags = () => {
      // Mock extraction - in real implementation, you'd parse the YouTube URL
      const mockTags = [
        'youtube', 'tutorial', 'hindi', '2024', 'new', 'trending', 'viral',
        'tips', 'guide', 'how to', 'best', 'easy', 'quick', 'free', 'amazing'
      ];
      setExtractedTags(mockTags);
      onResults?.({ tags: mockTags, url });
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
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Extract Tags
        </button>
        {extractedTags.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Extracted Tags</h3>
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
    
    const getThumbnails = () => {
      // Mock extraction
      const mockThumbnails = [
        { quality: 'Default (120x90)', url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg' },
        { quality: 'Medium (320x180)', url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
        { quality: 'High (480x360)', url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
        { quality: 'Standard (640x480)', url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/sddefault.jpg' },
        { quality: 'Max (1280x720)', url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' }
      ];
      setThumbnails(mockThumbnails);
      onResults?.({ thumbnails: mockThumbnails, url: videoUrl });
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
          onClick={getThumbnails}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Get Thumbnails
        </button>
        {thumbnails.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Available Thumbnails</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thumbnails.map((thumb, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <img src={thumb.url} alt="Thumbnail" className="w-full h-32 object-cover rounded mb-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{thumb.quality}</span>
                    <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm">
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
  }
};

export default ToolImplementations;