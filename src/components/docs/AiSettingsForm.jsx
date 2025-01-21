// src/components/docs/AiSettingsForm.jsx
import React from 'react';
import { Sliders } from 'lucide-react';
import FormInput from '../common/FormInput';

const AiSettingsForm = ({ settings, onSettingsChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Sliders size={20} className="text-indigo-600" />
        <h3 className="text-lg font-medium">Documentation Preferences</h3>
      </div>
      
      <div className="space-y-4">
        <FormInput
          label="Number of Pages"
          type="number"
          name="pageCount"
          value={settings.pageCount}
          onChange={(e) => onSettingsChange({
            ...settings,
            pageCount: parseInt(e.target.value)
          })}
          min="1"
          max="50"
        />

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
            <option value="technical">Technical</option>
            <option value="user-friendly">User-Friendly</option>
            <option value="comprehensive">Comprehensive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Instructions
          </label>
          <textarea
            value={settings.instructions}
            onChange={(e) => onSettingsChange({
              ...settings,
              instructions: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            placeholder="Enter any specific instructions for the AI..."
          />
        </div>
      </div>
    </div>
  );
};

export default AiSettingsForm;