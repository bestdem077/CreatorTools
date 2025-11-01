import React from 'react';
import { Users, Target, Heart, Award, Globe, Zap } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '100K+', label: 'Active Users', description: 'Content creators worldwide trust our tools' },
    { icon: Zap, value: '50+', label: 'Free Tools', description: 'AI-powered content creation utilities' },
    { icon: Globe, value: '30+', label: 'Languages', description: 'Available in multiple languages' },
    { icon: Award, value: '100%', label: 'Free Forever', description: 'No hidden costs or subscriptions' }
  ];

  const teamMembers = [
    {
      name: 'MiniMax Agent',
      role: 'Founder & Lead Developer',
      description: 'Passionate about helping content creators succeed across all platforms with innovative tools and AI technology.',
      image: '/images/team/minimax-agent.jpg'
    },
    {
      name: 'AI Development Team',
      role: 'AI & Machine Learning',
      description: 'Expert team focused on creating intelligent content optimization tools and features for all platforms.',
      image: '/images/team/ai-team.jpg'
    },
    {
      name: 'Creator Community',
      role: 'User Experience & Feedback',
      description: 'Our amazing community of creators who help us improve and build better tools.',
      image: '/images/team/community.jpg'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Creator First',
      description: 'We put creators at the heart of everything we do, building tools that truly help them succeed.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible with AI and modern technology.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making professional YouTube tools accessible to everyone, regardless of their budget.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, reliable tools that creators can trust.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About CreatorTools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering content creators worldwide with free, AI-powered tools to grow on YouTube, TikTok, Instagram and all platforms.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 md:p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl md:text-2xl leading-relaxed">
              To democratize content creation success by providing every creator with access to professional-grade tools 
              and AI-powered insights that were once available only to major influencers and agencies. We believe in a level 
              playing field where talent and creativity, not budget, determine success across all platforms.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                CreatorTools was born from a simple observation: the content creation ecosystem was becoming 
                increasingly complex, and small creators were being left behind. While major influencers 
                had access to expensive tools and services, emerging creators struggled to compete 
                with limited resources.
              </p>
              <p>
                We realized that what was needed wasn't another expensive platform, but a comprehensive 
                suite of free, powerful tools that could level the playing field. That's why we built 
                CreatorTools – to democratize content creation success through accessible, AI-powered technology.
              </p>
              <p>
                Today, we're proud to serve over 100,000 creators worldwide, offering 50+ tools that 
                help with everything from SEO optimization to revenue calculation, all completely free 
                for YouTube, TikTok, Instagram and all platforms.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">What Sets Us Apart</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>100% Free forever – no hidden costs or premium tiers</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>AI-powered tools that learn and improve over time</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Multi-language support for global creators</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Community-driven development and feature requests</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Privacy-first approach – your data stays with you</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-orange-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-4xl font-bold text-orange-600">
                      {index === 0 ? 'MA' : index === 1 ? 'AI' : 'CC'}
                    </div>
                  </div>
                )}
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you. 
            Our team is always working to improve our tools based on creator feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@creatortools.com"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="mailto:feedback@creatortools.com"
              className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;