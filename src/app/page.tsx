'use client';

import { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { categories, getWingetApps, getManualDownloadApps } from '@/data/apps';

export default function Home() {
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme from localStorage or system preference (before paint)
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
      let filename = 'PegasysInstaller.bat';
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
      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button className="info-btn" onClick={() => setShowInfoModal(true)} aria-label="About">
          i
        </button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a
          href="https://www.buymeacoffee.com/dansarpong"
          target="_blank"
          rel="noopener noreferrer"
          className="pizza-btn"
        >
          🍕
        </a>
      </div>

      <div className="header">
        <h1>Pegasys</h1>
        <p>Your custom Windows app installer generator. Select your favorite apps and get a ready-to-run installer script.</p>
      </div>

      {/* Instructions Section */}
      <div className="instructions">
        <div className="instructions-title">📋 How to Use</div>
        <ol className="instructions-list">
          <li>Browse the categories below and select your desired apps by checking the boxes</li>
          <li>Click &ldquo;Get Your Installer&rdquo; to download a custom .bat installer file</li>
          <li>Run the downloaded installer on your Windows machine (requires winget)</li>
          <li>For apps in the &ldquo;Manual Downloads&rdquo; section, click to visit their download sites</li>
        </ol>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
                      <Image
                        src={`https://www.google.com/s2/favicons?domain=${app.website}&sz=32`}
                        alt=""
                        width={32}
                        height={32}
                        className="app-icon"
                        unoptimized
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
          <p className="manual-description">
            These apps require manual download.
          </p>
          <div className="category-grid">
            {Array.from(new Set(manualApps.map(app => app.category))).map((category) => (
              <div key={category} className="category-card manual-category">
                <div className="category-title">{category}</div>
                <div className="app-list">
                  {manualApps
                    .filter((app) => app.category === category)
                    .map((app) => (
                      <a
                        key={app.id}
                        href={app.manualUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manual-app-item"
                      >
                        {app.website && (
                          <Image
                            src={`https://www.google.com/s2/favicons?domain=${app.website}&sz=32`}
                            alt=""
                            width={32}
                            height={32}
                            className="app-icon"
                            unoptimized
                          />
                        )}
                        <span className="app-label">{app.name}</span>
                        <span className="manual-arrow">→</span>
                      </a>
                    ))}
                </div>
              </div>
            ))}
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

      {/* Info Modal */}
      {showInfoModal && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">About Pegasys</div>
              <button className="modal-close" onClick={() => setShowInfoModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                This project was made for personal use to simplify app installations on fresh Windows setups (x64).
              </p>
              <p style={{ marginTop: '1rem' }}>
                Feel free to fork, modify, and use it however you like!
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
