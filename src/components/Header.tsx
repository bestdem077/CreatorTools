import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Play, ChevronDown, Settings, Check, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { indexedDBManager } from '../utils/indexedDB';
import { geminiAPI } from '../utils/geminiApi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [savedGeminiKey, setSavedGeminiKey] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Load saved API key and theme on mount
  useEffect(() => {
    const loadKeys = async () => {
      const geminiKey = await indexedDBManager.getApiKey('gemini-api-key');
      setSavedGeminiKey(!!geminiKey);
    };
    loadKeys();
    
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const navigationItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Banner */}
      <div className="bg-orange-500 text-center py-2 text-sm">
        <p className="font-medium">
          50+ Free AI-powered Content Creator tools | Unlimited | No Credit Card Required
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Play className="h-6 w-6 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CreatorTools</h1>
                <p className="text-xs text-gray-400">Free Content Creator Tools</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`hover:text-orange-400 transition-colors duration-200 ${
                  item.active ? 'text-orange-400 font-medium' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="flex items-center space-x-1 hover:text-orange-400 transition-colors duration-200"
              >
                <span>Tools</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-xl py-4">
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <a href="#tag-generator" className="block p-2 hover:bg-gray-100 rounded">Tag Generator</a>
                    <a href="#title-generator" className="block p-2 hover:bg-gray-100 rounded">Title Generator</a>
                    <a href="#thumbnail-downloader" className="block p-2 hover:bg-gray-100 rounded">Thumbnail Downloader</a>
                    <a href="#channel-id-finder" className="block p-2 hover:bg-gray-100 rounded">Channel ID Finder</a>
                    <a href="#money-calculator" className="block p-2 hover:bg-gray-100 rounded">Money Calculator</a>
                    <a href="#comment-picker" className="block p-2 hover:bg-gray-100 rounded">Comment Picker</a>
                    <a href="#thumbnail-generator" className="block p-2 hover:bg-gray-100 rounded text-orange-500 font-medium">Thumbnail Generator ⭐</a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search and Settings */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
                <button 
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Settings
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Settings</h3>
                <button
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Theme Settings */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Theme</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose your preferred theme for the website
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500' : 'bg-gray-200'}`}>
                          <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">Dark</div>
                          <div className="text-xs text-gray-500">Default theme</div>
                        </div>
                      </div>
                      {theme === 'dark' && (
                        <div className="mt-2 flex items-center text-xs text-orange-600">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === 'light'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-orange-500' : 'bg-gray-200'}`}>
                          <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">Light</div>
                          <div className="text-xs text-gray-500">Bright theme</div>
                        </div>
                      </div>
                      {theme === 'light' && (
                        <div className="mt-2 flex items-center text-xs text-orange-600">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Google Gemini API Key */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Google Gemini API Key</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Configure your Google Gemini API key for AI-powered content creation tools (Tag Generator, Title Generator, etc.)
                  </p>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter your Google Gemini API key..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Get your free API key from:{' '}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-orange-500 hover:underline font-medium"
                    >
                      Google AI Studio
                    </a>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={async () => {
                        if (geminiApiKey.trim()) {
                          await indexedDBManager.saveApiKey('gemini-api-key', geminiApiKey.trim());
                          geminiAPI.setApiKey(geminiApiKey.trim());
                          setSavedGeminiKey(true);
                          setGeminiApiKey('');
                          alert('Google Gemini API Key saved successfully!');
                        }
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      Save API Key
                    </button>
                    {savedGeminiKey && (
                      <button
                        onClick={async () => {
                          await indexedDBManager.deleteApiKey('gemini-api-key');
                          setSavedGeminiKey(false);
                          alert('API Key cleared successfully!');
                        }}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  {savedGeminiKey && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">Google Gemini API Key configured</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your API key is stored locally in your browser and is never sent to our servers. All tools work without an API key using fallback algorithms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;