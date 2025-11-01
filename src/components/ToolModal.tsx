import React, { useState, useRef } from 'react';
import { X, Copy, Download, Check, ExternalLink } from 'lucide-react';
import { allTools } from '../data/tools';
import GoogleGeminiPanel from './GoogleGeminiPanel';
import ToolImplementations from './ToolImplementations';

interface ToolModalProps {
  toolId: string;
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ toolId, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const tool = allTools.find(t => t.id === toolId);
  
  if (!tool) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const ToolComponent = ToolImplementations[tool.id as keyof typeof ToolImplementations];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Tool Implementation */}
        <div className="p-6">
          {ToolComponent ? (
            <ToolComponent onResults={setResults} onCopy={copyToClipboard} copied={copied} />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tool Coming Soon
              </h3>
              <p className="text-gray-600 mb-6">
                This tool is currently in development and will be available soon.
              </p>
            </div>
          )}
        </div>

        {/* Google Gemini Integration */}
        {['tag-generator', 'title-generator', 'description-generator', 'hashtag-generator'].includes(tool.id) && (
          <div className="border-t border-gray-200">
            <GoogleGeminiPanel 
              toolType={tool.id}
              onGenerate={(content) => {
                // Handle AI generated content
                console.log('Generated content:', content);
              }}
            />
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Results</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(results, null, 2), 'results')}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {copied === 'results' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span>Copy JSON</span>
                </button>
                <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Features:</span>
              {tool.features.map((feature, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                <ExternalLink className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;