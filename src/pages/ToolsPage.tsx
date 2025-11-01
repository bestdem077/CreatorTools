import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { allTools, categories } from '../data/tools';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ToolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <Grid className="h-6 w-6" />;
  };

  const renderToolCard = (tool: any) => (
    <div key={tool.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              {getIconComponent(tool.icon)}
            </div>
            {tool.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">New</span>
            )}
            {tool.isPopular && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">Popular</span>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {categories.find(c => c.id === tool.category)?.name || tool.category}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {tool.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {tool.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-6">
          {tool.features.slice(0, 3).map((feature: string, index: number) => (
            <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={tool.url}
          state={{ scrollY: window.scrollY }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Use Tool</span>
          <Grid className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  const renderToolListItem = (tool: any) => (
    <div key={tool.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-center space-x-6">
        {/* Icon */}
        <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
          {getIconComponent(tool.icon)}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
            {tool.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">New</span>
            )}
            {tool.isPopular && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">Popular</span>
            )}
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {categories.find(c => c.id === tool.category)?.name || tool.category}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3 text-sm">{tool.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature: string, index: number) => (
                <span key={index} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
            </div>
            
            <Link
              to={tool.url}
              state={{ scrollY: window.scrollY }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Use Tool</span>
              <Grid className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All YouTube Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our complete collection of {allTools.length} free AI-powered YouTube tools designed to help you grow your channel and boost your content.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              <span className="text-sm text-gray-500">
                {filteredTools.length} tools found
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid/List */}
        {filteredTools.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredTools.map(tool => 
              viewMode === 'grid' ? renderToolCard(tool) : renderToolListItem(tool)
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tools found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Featured Tools Highlight */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to grow your YouTube channel?</h2>
          <p className="text-lg mb-6 opacity-90">
            Start with our most popular tools and see immediate results in your content strategy.
          </p>
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
      </div>
    </div>
  );
};

export default ToolsPage;