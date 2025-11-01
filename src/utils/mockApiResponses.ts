// Mock API Response for testing when Google Gemini API key is not available
export const mockApiResponses = {
  'tag-generator': {
    topic: 'YouTube monetization',
    response: 'youtube, monetization, how to make money on youtube, youtube earning, content creator, viral videos, youtube channel growth, passive income, digital marketing, online business'
  },
  'title-generator': {
    topic: 'YouTube monetization',
    response: `1. How to Make Money on YouTube - Complete Monetization Guide 2025
2. YouTube Monetization Secrets: Start Earning from Your Channel Today!
3. Transform Your YouTube Channel into a Money-Making Machine
4. YouTube Monetization for Beginners: From Zero to Income
5. The Ultimate YouTube Monetization Strategy That Actually Works`
  },
  'description-generator': {
    topic: 'YouTube monetization',
    response: `🎬 Welcome to the ultimate guide on YouTube monetization!

📋 In this video, you'll learn:
✅ Complete YouTube monetization requirements
✅ Step-by-step setup process  
✅ Advanced monetization strategies
✅ Common mistakes to avoid
✅ Pro tips to maximize earnings

⏰ Video Timeline:
0:00 - Introduction & Overview
2:30 - YouTube Partner Program Requirements
5:00 - Setting up monetization
8:00 - Advanced strategies
12:00 - Tips & tricks
15:00 - Conclusion & next steps

🔔 If this video helped you monetize your channel, don't forget to LIKE and SUBSCRIBE!
📢 Share with fellow creators who need this!
🔔 Hit the BELL for more monetization tutorials!

📞 Business inquiries: your.email@example.com
🌐 Website: yourwebsite.com

#YouTubeMonetization #ContentCreator #YouTubeTips #MakeMoneyOnline #DigitalMarketing`
  },
  'hashtag-generator': {
    topic: 'YouTube monetization',
    response: '#YouTube #Monetization #ContentCreator #MakeMoneyOnline #YouTubeTips #DigitalMarketing #OnlineBusiness #PassiveIncome #ViralVideo #Tutorial #HowTo #2025 #Trending #CreatorEconomy'
  }
};

export const getMockResponse = (toolType: string, topic: string): string => {
  const mockResponse = mockApiResponses[toolType as keyof typeof mockApiResponses];
  if (mockResponse) {
    return `${mockResponse.response}\n\n*This is a mock response. To get real AI-generated content, please configure your Google AI Studio API key in the settings above.*`;
  }
  return `Mock content for ${toolType} with topic: ${topic}\n\n*This is a mock response. Please configure Google AI Studio API key for real content generation.*`;
};