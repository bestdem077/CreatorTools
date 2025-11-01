import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { allTools } from '../data/tools';
import ToolModal from '../components/ToolModal';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const tool = allTools.find(t => t.id === toolId);
  const scrollPositionRef = useRef<number>(0);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    // Save current scroll position from history state or current position
    const savedScrollY = (location.state as any)?.scrollY || window.scrollY;
    scrollPositionRef.current = savedScrollY;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    
    return () => {
      // Restore scroll on unmount
      const scrollY = scrollPositionRef.current;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    };
  }, [location.state]);

  const handleClose = () => {
    // Navigate back without forcing scroll
    navigate(-1);
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <p className="text-gray-600 mb-8">The requested tool could not be found.</p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <span>← Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          </div>

          {/* Tool Content */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ToolModal 
              toolId={tool.id}
              onClose={handleClose}
            />
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allTools
                .filter(t => t.category === tool.category && t.id !== tool.id)
                .slice(0, 3)
                .map((relatedTool) => (
                  <a
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedTool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedTool.description}
                    </p>
                    <span className="text-orange-500 text-sm font-medium">
                      Use Tool →
                    </span>
                  </a>
                ))}
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <span>← Back to All Tools</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;