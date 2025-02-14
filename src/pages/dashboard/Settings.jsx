import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Save, Edit2 } from 'lucide-react';

const SettingsSection = ({ title, children, icon: Icon }) => (
  <div className="bg-black border border-white/10 rounded-lg overflow-hidden mb-6 transform transition-all duration-300 hover:border-white/20">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Icon className="w-5 h-5 text-white/70" />
        </div>
        <h3 className="text-lg font-medium text-white font-mono">{title}</h3>
      </div>
      {children}
    </div>
  </div>
);

const CustomToggle = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-white/70">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        checked ? 'bg-green-500/20' : 'bg-white/10'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const Settings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold text-white font-mono">
          SYSTEM_SETTINGS
          <span className="animate-pulse">_</span>
        </h1>
      </div>

      <SettingsSection title="PROFILE_SETTINGS" icon={User}>
        <form onSubmit={handleGeneralSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Name
              </label>
              <input
                type="text"
                value={generalSettings.name}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <input
                type="email"
                value={generalSettings.email}
                onChange={(e) => setGeneralSettings(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300"
              />
            </div>

            <CustomToggle
              checked={generalSettings.emailNotifications}
              onChange={(checked) => setGeneralSettings(prev => ({
                ...prev,
                emailNotifications: checked
              }))}
              label="Email Notifications"
            />

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </SettingsSection>

      <SettingsSection title="EDITOR_SETTINGS" icon={Edit2}>
        <form onSubmit={handleEditorSubmit}>
          <div className="space-y-4">
            <CustomToggle
              checked={editorSettings.autoSave}
              onChange={(checked) => setEditorSettings(prev => ({
                ...prev,
                autoSave: checked
              }))}
              label="Auto-save"
            />

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Auto-save Interval (seconds)
              </label>
              <input
                type="number"
                value={editorSettings.autoSaveInterval}
                onChange={(e) => setEditorSettings(prev => ({
                  ...prev,
                  autoSaveInterval: parseInt(e.target.value)
                }))}
                disabled={!editorSettings.autoSave}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:border-white/30 focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </SettingsSection>
    </div>
  );
};

export default Settings;