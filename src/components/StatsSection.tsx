import React from 'react';
import { Users, Zap, Shield, Globe, Star, TrendingUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '100K+',
      label: 'Global Users',
      description: 'Millions of creators are using our tools',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      value: '50+',
      label: 'AI-Powered Tools',
      description: 'Modern AI technology powered tools',
      color: 'text-orange-500'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Forever Free',
      description: 'No hidden costs or premium subscriptions',
      color: 'text-green-500'
    },
    {
      icon: Globe,
      value: '30+',
      label: 'Languages Available',
      description: 'Use tools in your native language',
      color: 'text-purple-500'
    }
  ];

  const features = [
    {
      icon: Star,
      title: 'No Registration Required',
      description: 'Start using tools immediately'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Results',
      description: 'Instant processing and quick results'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is completely secure'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  <IconComponent className="h-12 w-12" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI YouTube Tools That Work For You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exceptionally Useful, Completely Free – No Hidden Costs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Get Started Now and Grow Your YouTube Channel
            </h3>
            <p className="text-orange-100 mb-6">
              Thousands of creators are already using our tools
            </p>
            <button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
              View Free Tools
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;