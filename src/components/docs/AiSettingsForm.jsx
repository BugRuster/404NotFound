import React from 'react';
import { BookOpen, MessageSquare, Settings2, Code2 } from 'lucide-react';

const AiSettingsForm = ({ settings, onSettingsChange, onGenerate, generating }) => {
  const handleLanguageChange = (e) => {
    const newSettings = { 
      ...settings, 
      programmingLanguage: e.target.value 
    };
    console.log('Settings after language change:', newSettings);
    onSettingsChange(newSettings);
  };
  const handleStyleChange = (e) => {
    onSettingsChange({
      ...settings,
      style: e.target.value
    });
  };

  const handlePageCountChange = (e) => {
    onSettingsChange({
      ...settings,
      pageCount: parseInt(e.target.value)
    });
  };

  const handlePromptChange = (e) => {
    onSettingsChange({
      ...settings,
      userPrompt: e.target.value
    });
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold">Generation Settings</h3>
      </div>

      <div className="space-y-4">
        {/* Documentation Style */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Documentation Style
            </div>
          </label>
          <select
            value={settings.style}
            onChange={handleStyleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="formal">Formal</option>
            <option value="technical">Technical</option>
            <option value="casual">Casual</option>
            <option value="tutorial">Tutorial-style</option>
          </select>
        </div>

        {/* Programming Language */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Programming Language
            </div>
          </label>
          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="swift">Swift</option>
            <option value="rust">Rust</option>
          </select>
        </div>

        {/* Documentation Length */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Documentation Length
            </div>
          </label>
          <select
            value={settings.pageCount}
            onChange={handlePageCountChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value={2}>Brief (2 pages)</option>
            <option value={4}>Medium (4 pages)</option>
            <option value={6}>Detailed (6 pages)</option>
            <option value={8}>Comprehensive (8 pages)</option>
          </select>
        </div>

        {/* Custom Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Custom Instructions (Optional)
            </div>
          </label>
          <textarea
            value={settings.userPrompt}
            onChange={handlePromptChange}
            placeholder="Add any specific requirements or focus areas for the documentation..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={generating}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Documentation...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-5 h-5" />
              <span>Generate Documentation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiSettingsForm;