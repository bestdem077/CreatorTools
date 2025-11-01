import React from 'react';
import { Zap, Shield, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              CreatorTools
            </span>
            <br />
            <span className="text-white">
              Free Tools For Content Creators, 
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                100% Free
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
            50+ free AI-powered tools to grow your content creation on YouTube, TikTok, Instagram and more
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-orange-400 mb-2">
                <Zap className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white">100K+</div>
              <div className="text-sm text-gray-300">Global Users</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-orange-400 mb-2">
                <Zap className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">AI-Powered Tools</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-orange-400 mb-2">
                <Shield className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-300">Forever Free</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-orange-400 mb-2">
                <Globe className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-white">30+</div>
              <div className="text-sm text-gray-300">Languages Available</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/tools"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/blog"
              className="border-2 border-white/30 hover:border-white/50 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-300 backdrop-blur-sm text-center"
            >
              Read Blog
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-4">Trusted by creators worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">100K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;