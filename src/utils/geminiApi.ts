// Google Gemini AI API utility
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiResponse {
  success: boolean;
  content?: string;
  error?: string;
}

class GeminiAPIManager {
  private apiKey: string | null = null;
  private genAI: GoogleGenerativeAI | null = null;

  setApiKey(key: string): void {
    this.apiKey = key;
    this.genAI = new GoogleGenerativeAI(key);
  }

  async generateContent(prompt: string): Promise<GeminiResponse> {
    if (!this.apiKey || !this.genAI) {
      return {
        success: false,
        error: 'API key not configured'
      };
    }

    try {
      // Use gemini-2.0-flash-exp model (latest fast model)
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp'
      });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        content: text
      };
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate content'
      };
    }
  }

  // SEO Tools - Tag Generation
  async generateTags(topic: string, count: number = 15): Promise<GeminiResponse> {
    const prompt = `Generate ${count} highly relevant and SEO-optimized YouTube tags for a video about: "${topic}". 
Return ONLY the tags separated by commas, no additional text or explanation. Include a mix of:
- Broad keywords
- Specific keywords
- Long-tail keywords
- Trending terms related to the topic`;
    
    return this.generateContent(prompt);
  }

  // SEO Tools - Title Generation
  async generateTitles(topic: string, tone: string = 'engaging', count: number = 5): Promise<GeminiResponse> {
    const prompt = `Generate ${count} ${tone} YouTube video titles for: "${topic}".
Requirements:
- Make them click-worthy and SEO-friendly
- Include relevant keywords naturally
- Keep length between 50-70 characters
- Match ${tone} tone
- Return ONLY the titles, one per line, no numbering or extra text`;
    
    return this.generateContent(prompt);
  }

  // SEO Tools - Description Generation
  async generateDescription(topic: string): Promise<GeminiResponse> {
    const prompt = `Write a comprehensive YouTube video description for: "${topic}".
Include:
- Engaging introduction (2-3 sentences)
- Video content breakdown with timestamps (00:00, 02:30, etc.)
- Relevant hashtags (8-10)
- Call-to-action for likes, shares, and subscriptions
- Format professionally with emojis for visual appeal
Return ONLY the description, no extra text`;
    
    return this.generateContent(prompt);
  }

  // SEO Tools - Hashtag Generation
  async generateHashtags(topic: string, count: number = 15): Promise<GeminiResponse> {
    const prompt = `Generate ${count} relevant hashtags for a YouTube video about: "${topic}".
Include a mix of:
- Popular general hashtags
- Niche-specific hashtags
- Trending hashtags
Return ONLY the hashtags separated by spaces, starting each with #`;
    
    return this.generateContent(prompt);
  }

  // SEO Tools - Keyword Research
  async researchKeywords(topic: string): Promise<GeminiResponse> {
    const prompt = `Perform keyword research for YouTube content about: "${topic}".
Provide:
1. Primary Keywords (5-7 high-volume keywords)
2. Secondary Keywords (8-10 medium-volume keywords)
3. Long-tail Keywords (10-12 specific phrases)
4. Trending Keywords (5 currently trending terms)
Format as a structured list with categories clearly labeled`;
    
    return this.generateContent(prompt);
  }

  // Content Tools - Video Summary Generation
  async generateVideoSummary(videoTitle: string, videoDescription?: string): Promise<GeminiResponse> {
    const context = videoDescription 
      ? `Title: "${videoTitle}"\nDescription: "${videoDescription}"`
      : `Title: "${videoTitle}"`;
    
    const prompt = `Create a concise video summary for this YouTube video:
${context}

Provide:
- 2-3 sentence overview
- 5-7 key points covered
- Target audience
- Main takeaway
Format professionally and concisely`;
    
    return this.generateContent(prompt);
  }

  // Engagement Tools - Description Optimization
  async optimizeDescription(description: string): Promise<GeminiResponse> {
    const prompt = `Optimize this YouTube video description for better SEO and engagement:
"${description}"

Provide:
1. SEO Score (0-100)
2. Specific improvements needed
3. Optimized version of the description
4. Additional hashtags recommendations
Format clearly with sections`;
    
    return this.generateContent(prompt);
  }

  // Content Tools - Content Ideas Generation
  async generateContentIdeas(niche: string, count: number = 10): Promise<GeminiResponse> {
    const prompt = `Generate ${count} creative YouTube video content ideas for the niche: "${niche}".
For each idea provide:
- Video Title
- Brief description (1 sentence)
- Target audience appeal

Format as a numbered list`;
    
    return this.generateContent(prompt);
  }
}

export const geminiAPI = new GeminiAPIManager();
