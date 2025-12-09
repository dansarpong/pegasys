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
    const wingetAppIds = getWingetApps().map(app => app.id);
    setSelectedApps(new Set(wingetAppIds));
  };

  const unselectAll = () => {
    setSelectedApps(new Set());
  };

  const isAllSelected = () => {
    const wingetAppIds = getWingetApps().map(app => app.id);
    return selectedApps.size === wingetAppIds.length && wingetAppIds.length > 0;
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

  // Sort categories by number of apps (descending) for inverted staircase effect
  const sortedCategories = [...categories].sort((a, b) => {
    const countA = wingetApps.filter(app => app.category === a).length;
    const countB = wingetApps.filter(app => app.category === b).length;
    return countB - countA;
  });

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

      {/* Category Grid - sorted by app count for staircase effect */}
      <div className="category-grid">
        {sortedCategories.map((category) => (
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
              These apps require manual download from their official websites.
            </p>
            <div className="manual-apps-grid">
              {manualApps.map((app) => (
                <a
                  key={app.id}
                  href={app.manualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manual-app-card"
                >
                  {app.website && (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${app.website}&sz=32`}
                      alt=""
                      className="app-icon"
                    />
                  )}
                  <div className="manual-app-info">
                    <span className="manual-app-name">{app.name}</span>
                    <span className="manual-app-action">Download →</span>
                  </div>
                </a>
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
