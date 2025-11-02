import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geminiAPI } from './geminiApi';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the @google/generative-ai module
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn(() => ({
  generateContent: mockGenerateContent,
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  })),
}));

describe('GeminiAPIManager', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockGenerateContent.mockReset();

    // Reset the singleton's state for test isolation
    (geminiAPI as any).apiKey = null;
    (geminiAPI as any).genAI = null;

    // Provide a default successful implementation for most tests
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => 'mocked content',
      },
    });
  });

  it('should return an error if API key is not configured', async () => {
    const response = await geminiAPI.generateContent('test prompt');
    expect(response.success).toBe(false);
    expect(response.error).toBe('API key not configured');
  });

  it('should set the API key and initialize the AI model', () => {
    geminiAPI.setApiKey('test-api-key');
    expect(GoogleGenerativeAI).toHaveBeenCalledWith('test-api-key');
  });

  it('should generate content successfully', async () => {
    geminiAPI.setApiKey('test-api-key');
    // Override default mock for this specific test
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => 'test content',
      },
    });
    const response = await geminiAPI.generateContent('test prompt');
    expect(response.success).toBe(true);
    expect(response.content).toBe('test content');
  });

  it('should handle API errors gracefully', async () => {
    geminiAPI.setApiKey('test-api-key');
    // Override default mock for this specific test
    mockGenerateContent.mockRejectedValue(new Error('API error'));
    const response = await geminiAPI.generateContent('test prompt');
    expect(response.success).toBe(false);
    expect(response.error).toBe('API error');
  });

  it('should generate tags with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateTags('test topic');
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-2.0-flash-exp' });
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test topic'));
  });

  it('should generate titles with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateTitles('test topic', 'engaging');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test topic'));
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('engaging'));
  });

  it('should generate a description with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateDescription('test topic');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test topic'));
  });

  it('should generate hashtags with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateHashtags('test topic');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test topic'));
  });

  it('should research keywords with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.researchKeywords('test topic');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test topic'));
  });

  it('should generate a video summary with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateVideoSummary('test title', 'test description');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test title'));
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test description'));
  });

  it('should optimize a description with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.optimizeDescription('test description');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test description'));
  });

  it('should generate content ideas with the correct prompt', async () => {
    geminiAPI.setApiKey('test-api-key');
    await geminiAPI.generateContentIdeas('test niche');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.stringContaining('test niche'));
  });
});
