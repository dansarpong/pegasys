export interface AppDefinition {
    id: string;
    name: string;
    category: string;
    wingetId?: string;
    manualUrl?: string;
    website?: string;
}

export const apps: AppDefinition[] = [
    // Web Browsers
    { id: 'chrome', name: 'Google Chrome', category: 'Web Browsers', wingetId: 'Google.Chrome', website: 'google.com' },
    { id: 'firefox', name: 'Mozilla Firefox', category: 'Web Browsers', wingetId: 'Mozilla.Firefox', website: 'mozilla.org' },

    // Messaging
    { id: 'discord', name: 'Discord', category: 'Messaging', wingetId: 'Discord.Discord', website: 'discord.com' },
    { id: 'slack', name: 'Slack', category: 'Messaging', wingetId: 'SlackTechnologies.Slack', website: 'slack.com' },
    { id: 'telegram', name: 'Telegram', category: 'Messaging', wingetId: 'Telegram.TelegramDesktop', website: 'telegram.org' },

    // Media
    { id: 'potplayer', name: 'PotPlayer', category: 'Media', wingetId: 'Daum.PotPlayer', website: 'potplayer.daum.net' },
    { id: 'spotify', name: 'Spotify', category: 'Media', wingetId: 'Spotify.Spotify', website: 'spotify.com' },
    { id: 'obs', name: 'OBS Studio', category: 'Media', wingetId: 'OBSProject.OBSStudio', website: 'obsproject.com' },

    // Runtimes
    { id: 'python3', name: 'Python 3', category: 'Runtimes', wingetId: 'Python.Python.3.12', website: 'python.org' },
    { id: 'vcredist2005', name: 'VC++ 2005 (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2005.x64', website: 'microsoft.com' },
    { id: 'vcredist2008', name: 'VC++ 2008 (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2008.x64', website: 'microsoft.com' },
    { id: 'vcredist2010', name: 'VC++ 2010 (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2010.x64', website: 'microsoft.com' },
    { id: 'vcredist2012', name: 'VC++ 2012 (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2012.x64', website: 'microsoft.com' },
    { id: 'vcredist2013', name: 'VC++ 2013 (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2013.x64', website: 'microsoft.com' },
    { id: 'vcredist2015', name: 'VC++ 2015+ (x64)', category: 'Runtimes', wingetId: 'Microsoft.VCRedist.2015+.x64', website: 'microsoft.com' },

    // Developer Tools
    { id: 'vscode', name: 'VS Code', category: 'Developer Tools', wingetId: 'Microsoft.VisualStudioCode', website: 'code.visualstudio.com' },
    { id: 'arduino', name: 'Arduino IDE', category: 'Developer Tools', wingetId: 'ArduinoSA.IDE.stable', website: 'arduino.cc' },
    { id: 'git', name: 'Git', category: 'Developer Tools', wingetId: 'Git.Git', website: 'git-scm.com' },
    { id: 'docker', name: 'Docker Desktop', category: 'Developer Tools', wingetId: 'Docker.DockerDesktop', website: 'docker.com' },
    { id: 'postman', name: 'Postman', category: 'Developer Tools', wingetId: 'Postman.Postman', website: 'postman.com' },

    // Education
    { id: 'anki', name: 'Anki', category: 'Education', wingetId: 'Anki.Anki', website: 'apps.ankiweb.net' },
    { id: 'grammarly', name: 'Grammarly', category: 'Education', wingetId: 'Grammarly.Grammarly', website: 'grammarly.com' },

    // Gaming
    { id: 'epic', name: 'Epic Games Launcher', category: 'Gaming', wingetId: 'EpicGames.EpicGamesLauncher', website: 'epicgames.com' },
    { id: 'ubisoft', name: 'Ubisoft Connect', category: 'Gaming', wingetId: 'Ubisoft.Connect', website: 'ubisoftconnect.com' },
    { id: 'gog', name: 'GOG GALAXY', category: 'Gaming', wingetId: 'GOG.Galaxy', website: 'gog.com/galaxy' },
    { id: 'playnite', name: 'Playnite', category: 'Gaming', wingetId: 'Playnite.Playnite', website: 'playnite.link' },
    { id: 'steam', name: 'Steam', category: 'Gaming', wingetId: 'Valve.Steam', website: 'store.steampowered.com' },

    // Utilities
    { id: '7zip', name: '7-Zip', category: 'Utilities', wingetId: '7zip.7zip', website: '7-zip.org' },
    { id: 'balenaetcher', name: 'balenaEtcher', category: 'Utilities', wingetId: 'Balena.Etcher', website: 'balena.io' },
    { id: 'bcuninstaller', name: 'BCUninstaller', category: 'Utilities', wingetId: 'Klocman.BulkCrapUninstaller', website: 'bcuninstaller.com' },
    { id: 'rustdesk', name: 'RustDesk', category: 'Utilities', wingetId: 'RustDesk.RustDesk', website: 'rustdesk.com' },
    { id: 'cloudflare', name: 'Cloudflare WARP', category: 'Utilities', wingetId: 'Cloudflare.Warp', website: 'one.one.one.one' },
    { id: 'virtualbox', name: 'Oracle VM VirtualBox', category: 'Utilities', wingetId: 'Oracle.VirtualBox', website: 'virtualbox.org' },
    { id: 'windirstat', name: 'WinDirStat', category: 'Utilities', wingetId: 'WinDirStat.WinDirStat', website: 'windirstat.net' },
    { id: 'everything', name: 'Everything', category: 'Utilities', wingetId: 'voidtools.Everything', website: 'voidtools.com' },
    { id: 'localsend', name: 'LocalSend', category: 'Utilities', wingetId: 'LocalSend.LocalSend', website: 'localsend.org' },
    { id: 'qbittorrent', name: 'qBittorrent', category: 'Utilities', wingetId: 'qBittorrent.qBittorrent', website: 'qbittorrent.org' },
    { id: 'aomei', name: 'AOMEI Partition Assistant', category: 'Utilities', wingetId: 'AOMEI.PartitionAssistant', website: 'aomeitech.com/aomei-partition-assistant.html' },
    { id: 'ditto', name: 'Ditto', category: 'Utilities', wingetId: 'Ditto.Ditto', website: 'ditto-cp.sourceforge.io' },

    // Manual Downloads
    { id: 'pdfgear', name: 'PDFgear', category: 'Documents', manualUrl: 'https://www.pdfgear.com/download/', website: 'pdfgear.com' },
    { id: 'msoffice', name: 'Microsoft Office Suite', category: 'Documents', manualUrl: 'https://gravesoft.dev/office_c2r_links', website: 'microsoft365.com' },
    { id: 'icloud', name: 'iCloud', category: 'Documents', manualUrl: 'https://www.microsoft.com/store/apps/9PKTQ5699M62', website: 'icloud.com' },
];

// Helper functions to separate apps by installation type
export const getWingetApps = () => apps.filter(app => app.wingetId);
export const getManualDownloadApps = () => apps.filter(app => app.manualUrl);

// Categories only from winget apps (automated install)
export const categories = Array.from(new Set(getWingetApps().map(app => app.category)));
