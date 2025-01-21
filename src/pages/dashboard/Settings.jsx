// src/pages/dashboard/Settings.jsx
import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    emailNotifications: true,
  });

  const [editorSettings, setEditorSettings] = useState({
    autoSave: true,
    autoSaveInterval: 30,
    defaultTemplate: 'blank',
  });

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Updating general settings:', generalSettings);
  };

  const handleEditorSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement editor settings update
    console.log('Updating editor settings:', editorSettings);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* General Settings */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <form onSubmit={handleGeneralSubmit}>
            <div className="space-y-4">
              <FormInput
                label="Name"
                value={generalSettings.name}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
              
              <FormInput
                label="Email"
                type="email"
                value={generalSettings.email}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
              />

              <div className="flex items-center">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded"
                  checked={generalSettings.emailNotifications}
                  onChange={(e) => setGeneralSettings(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                  Receive email notifications
                </label>
              </div>

              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Editor Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Editor Settings</h3>
          <form onSubmit={handleEditorSubmit}>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="autoSave"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded"
                  checked={editorSettings.autoSave}
                  onChange={(e) => setEditorSettings(prev => ({
                    ...prev,
                    autoSave: e.target.checked
                  }))}
                />
                <label htmlFor="autoSave" className="ml-2 text-sm text-gray-700">
                  Enable auto-save
                </label>
              </div>

              <FormInput
                label="Auto-save interval (seconds)"
                type="number"
                value={editorSettings.autoSaveInterval}
                onChange={(e) => setEditorSettings(prev => ({
                  ...prev,
                  autoSaveInterval: parseInt(e.target.value)
                }))}
                disabled={!editorSettings.autoSave}
              />

              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;