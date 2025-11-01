import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Help & Support': [
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'User Guide', href: '/guide' },
      { name: 'Video Tutorials', href: '/tutorials' },
      { name: 'Community Forum', href: '/forum' }
    ],
    'Content Creation Tools': [
      { name: 'Tag Generator', href: '/tools/tag-generator' },
      { name: 'Title Generator', href: '/tools/title-generator' },
      { name: 'Thumbnail Generator', href: '/tools/thumbnail-generator' },
      { name: 'Thumbnail Downloader', href: '/tools/thumbnail-downloader' },
      { name: 'Money Calculator', href: '/tools/money-calculator' },
      { name: 'Comment Picker', href: '/tools/comment-picker' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Privacy Policy', href: '/privacy' }
    ],
    'Resources': [
      { name: 'YouTube Blog', href: '/blog' },
      { name: 'Creator Resources', href: '/resources' },
      { name: 'SEO Guide', href: '/seo-guide' },
      { name: 'Monetization Tips', href: '/monetization' },
      { name: 'Best Practices', href: '/best-practices' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <span className="text-white font-bold text-lg">CT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CreatorTools</h3>
                  <p className="text-sm text-gray-400">Free Content Creator Tools</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                44 free AI-powered content creation tools to grow on YouTube, TikTok, Instagram and more.
                No hidden costs, completely free.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-3 text-orange-400 text-sm">{category}</h4>
                <ul className="space-y-1.5">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
              <span className="mb-2 md:mb-0">© {currentYear} CreatorTools. All rights reserved.</span>
              
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>by MiniMax Agent</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;