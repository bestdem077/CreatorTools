// YouTube Data API v3 Integration
// Requires YouTube Data API key to be stored in IndexedDB

import { indexedDBManager } from './indexedDB';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class YouTubeAPIManager {
  private apiKey: string | null = null;

  async initialize(): Promise<boolean> {
    try {
      const key = await indexedDBManager.getApiKey('youtube-api-key');
      if (key) {
        this.apiKey = key;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize YouTube API:', error);
      return false;
    }
  }

  setApiKey(key: string): void {
    this.apiKey = key;
  }

  // Extract Video ID from various YouTube URL formats
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  }

  // Extract Channel ID from various YouTube URL formats
  extractChannelId(url: string): string | null {
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  }

  // Get video details including tags, title, description, statistics
  async getVideoDetails(videoId: string): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured. Please add your API key in Settings.'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return {
          success: false,
          error: 'Video not found or is private/deleted'
        };
      }

      return {
        success: true,
        data: data.items[0]
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch video details'
      };
    }
  }

  // Get channel details
  async getChannelDetails(channelId: string): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return {
          success: false,
          error: 'Channel not found'
        };
      }

      return {
        success: true,
        data: data.items[0]
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch channel details'
      };
    }
  }

  // Search channels by keyword
  async searchChannels(query: string, maxResults: number = 10): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.items || []
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to search channels'
      };
    }
  }

  // Get trending videos
  async getTrendingVideos(regionCode: string = 'IN', categoryId?: string, maxResults: number = 10): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      let url = `${YOUTUBE_API_BASE}/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${this.apiKey}`;
      
      if (categoryId && categoryId !== 'all') {
        url += `&videoCategoryId=${categoryId}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.items || []
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch trending videos'
      };
    }
  }

  // Get video comments
  async getVideoComments(videoId: string, maxResults: number = 100): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.items || []
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch comments'
      };
    }
  }

  // Get channel by username (for @username URLs)
  async getChannelByUsername(username: string): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&forUsername=${username}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        // Try searching instead
        return this.searchChannels(username, 1);
      }

      return {
        success: true,
        data: data.items[0]
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch channel'
      };
    }
  }

  // Get video categories
  async getVideoCategories(regionCode: string = 'IN'): Promise<YouTubeAPIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'YouTube API key not configured'
      };
    }

    try {
      const url = `${YOUTUBE_API_BASE}/videoCategories?part=snippet&regionCode=${regionCode}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.items || []
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch categories'
      };
    }
  }
}

export const youtubeAPI = new YouTubeAPIManager();
