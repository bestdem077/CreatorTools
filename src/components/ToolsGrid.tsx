import React from 'react';
import { Tool } from '../data/tools';
import { 
  ExternalLink, 
  Star, 
  Tag, 
  Type, 
  FileText, 
  Hash, 
  Search,
  BarChart3, 
  User, 
  Image, 
  Camera, 
  Users, 
  Eye, 
  Code, 
  Calculator, 
  DollarSign, 
  BarChart, 
  TrendingUp, 
  MessageCircle, 
  Settings, 
  Tags, 
  Target, 
  TestTube, 
  Scissors, 
  Lightbulb, 
  Activity, 
  Zap, 
  Clock, 
  MessageSquare,
  Download,
  CheckCircle,
  Brain,
  Sparkles,
  ClipboardCheck,
  Award,
  GitCompare,
  List,
  BookOpen,
  Film,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolsGridProps {
  tools: Tool[];
  onToolSelect: (toolId: string) => void;
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Tag: Tag,
  Type: Type,
  FileText: FileText,
  Hash: Hash,
  Extract: Search,
  BarChart3: BarChart3,
  Search: Search,
  User: User,
  Image: Image,
  Camera: Camera,
  Users: Users,
  ImageIcon: Image,
  Eye: Eye,
  Code: Code,
  Calculator: Calculator,
  DollarSign: DollarSign,
  BarChart: BarChart,
  TrendingUp: TrendingUp,
  MessageCircle: MessageCircle,
  Settings: Settings,
  Tags: Tags,
  Target: Target,
  TestTube: TestTube,
  Split: Scissors,
  Lightbulb: Lightbulb,
  Activity: Activity,
  Zap: Zap,
  Clock: Clock,
  MessageSquare: MessageSquare,
  Download: Download,
  CheckCircle: CheckCircle,
  Brain: Brain,
  Sparkles: Sparkles,
  ClipboardCheck: ClipboardCheck,
  Award: Award,
  GitCompare: GitCompare,
  List: List,
  BookOpen: BookOpen,
  Film: Film,
  Calendar: Calendar
};

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, onToolSelect }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      seo: 'bg-green-100 text-green-800',
      channel: 'bg-blue-100 text-blue-800',
      content: 'bg-purple-100 text-purple-800',
      analytics: 'bg-orange-100 text-orange-800',
      engagement: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryName = (category: string) => {
    const names = {
      seo: 'SEO',
      channel: 'Channel',
      content: 'Content',
      analytics: 'Analytics',
      engagement: 'Engagement'
    };
    return names[category as keyof typeof names] || category;
  };

  // Add safety check for tools array
  if (!tools || tools.length === 0) {
    return (
      <section id="tools-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              Please try a different search term or category
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tools-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Content Creator Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {tools.length} tools found - Choose the best one for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const IconComponent = iconComponents[tool.icon];
            
            return (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                state={{ scrollY: window.scrollY }}
                className="tool-card p-6 cursor-pointer group block"
              >
                {/* Tool Icon and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {IconComponent ? (
                      <div className="text-2xl">
                        <IconComponent className="h-8 w-8 text-orange-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {tool.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(tool.category)}`}>
                        {getCategoryName(tool.category)}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
                </div>

                {/* Tool Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                  {tool.name}
                </h3>

                {/* Tool Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {tool.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">{feature}</span>
                    </div>
                  ))}
                  {tool.features.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{tool.features.length - 2} more features
                    </div>
                  )}
                </div>

                {/* Use Tool Button */}
                <button className="w-full bg-gray-50 hover:bg-orange-500 hover:text-white text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 group">
                  <span className="group-hover:hidden">Use Tool</span>
                  <span className="hidden group-hover:inline">Open Tool</span>
                </button>
              </Link>
            );
          })}
        </div>

        {/* No Results */}
        {tools.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              Please try a different search term or category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsGrid;