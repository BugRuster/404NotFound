// src/components/docs/AiSettingsForm.jsx
import React from 'react';
import { Sliders } from 'lucide-react';
import FormInput from '../common/FormInput';

const AiSettingsForm = ({ settings, onSettingsChange }) => {
  const programmingLanguages = [
    'javascript', 'python', 'java', 'c++', 'ruby', 'go', 
    'rust', 'typescript', 'php', 'swift', 'kotlin'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Sliders size={20} className="text-indigo-600" />
        <h3 className="text-lg font-medium">Documentation Settings</h3>
      </div>
      
      <div className="space-y-4">
        {/* Documentation Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Documentation Style
          </label>
          <select
            value={settings.style}
            onChange={(e) => onSettingsChange({
              ...settings,
              style: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="formal">Formal</option>
            <option value="normal">Normal</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {/* Programming Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Programming Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => onSettingsChange({
              ...settings,
              language: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {programmingLanguages.map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Page Count */}
        <FormInput
          label="Number of Pages"
          type="number"
          value={settings.pageCount}
          onChange={(e) => onSettingsChange({
            ...settings,
            pageCount: parseInt(e.target.value)
          })}
          min="1"
          max="50"
        />

        {/* Output Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Output Format
          </label>
          <select
            value={settings.outputFormat}
            onChange={(e) => onSettingsChange({
              ...settings,
              outputFormat: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="markdown">Markdown</option>
            <option value="text">Plain Text</option>
          </select>
        </div>

        {/* Additional Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Instructions
          </label>
          <textarea
            value={settings.userPrompt}
            onChange={(e) => onSettingsChange({
              ...settings,
              userPrompt: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            placeholder="Any specific focus areas or requirements..."
          />
        </div>
      </div>
    </div>
  );
};

export default AiSettingsForm;