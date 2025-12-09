'use client';

import { useState } from 'react';
import { apps, categories, getWingetApps, getManualDownloadApps } from '@/data/apps';

export default function Home() {
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleApp = (appId: string) => {
    const newSelected = new Set(selectedApps);
    if (newSelected.has(appId)) {
      newSelected.delete(appId);
    } else {
      newSelected.add(appId);
    }
    setSelectedApps(newSelected);
  };

  const selectAll = () => {
    const allAppIds = apps.map(app => app.id);
    setSelectedApps(new Set(allAppIds));
  };

  const unselectAll = () => {
    setSelectedApps(new Set());
  };

  const isAllSelected = () => {
    return selectedApps.size === apps.length;
  };

  const handleDownload = async () => {
    if (selectedApps.size === 0) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apps: Array.from(selectedApps) }),
      });

      if (!response.ok) throw new Error('Failed to generate installer');

      // Try to get filename from header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'PegasisInstaller.bat';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading installer:', error);
      alert('Failed to generate installer. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const wingetApps = getWingetApps();
  const manualApps = getManualDownloadApps();

  return (
    <main className="container">
      <div className="header">
        <h1>Pegasys</h1>
        <p>Select your apps and get a custom installer.</p>
        <button
          className="select-all-btn"
          onClick={isAllSelected() ? unselectAll : selectAll}
        >
          {isAllSelected() ? 'Unselect All' : 'Select All'}
        </button>
      </div>

      {/* Automated Install Section */}
      <div className="section-header">Automated Install</div>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <div className="category-title">{category}</div>
            <div className="app-list">
              {wingetApps
                .filter((app) => app.category === category)
                .map((app) => (
                  <label key={app.id} className="app-item">
                    <input
                      type="checkbox"
                      className="app-checkbox"
                      checked={selectedApps.has(app.id)}
                      onChange={() => toggleApp(app.id)}
                    />
                    {app.website && (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${app.website}&sz=32`}
                        alt=""
                        className="app-icon"
                      />
                    )}
                    <span className="app-label">{app.name}</span>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Manual Downloads Section */}
      {manualApps.length > 0 && (
        <>
          <div className="section-header">Manual Downloads</div>
          <div className="manual-section">
            <p className="manual-description">
              These apps require manual download. The installer will provide links and instructions.
            </p>
            <div className="app-list">
              {manualApps.map((app) => (
                <label key={app.id} className="app-item">
                  <input
                    type="checkbox"
                    className="app-checkbox"
                    checked={selectedApps.has(app.id)}
                    onChange={() => toggleApp(app.id)}
                  />
                  {app.website && (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${app.website}&sz=32`}
                      alt=""
                      className="app-icon"
                    />
                  )}
                  <span className="app-label">{app.name}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className={`download-bar ${selectedApps.size > 0 ? 'visible' : ''}`}>
        <div className="download-content">
          <div className="selected-count">
            {selectedApps.size} app{selectedApps.size !== 1 ? 's' : ''} selected
          </div>
          <button
            className="download-btn"
            onClick={handleDownload}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Get Your Installer'}
          </button>
        </div>
      </div>
    </main>
  );
}
