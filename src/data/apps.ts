export interface AppDefinition {
    id: string;
    name: string;
    wingetId: string;
    category: string;
    description?: string;
    website?: string;
    manualUrl?: string;
}

export const apps: AppDefinition[] = [
    // Web Browsers
    { id: 'chrome', name: 'Google Chrome', wingetId: 'Google.Chrome', category: 'Web Browsers', website: 'google.com' },
    { id: 'firefox', name: 'Mozilla Firefox', wingetId: 'Mozilla.Firefox', category: 'Web Browsers', website: 'mozilla.org' },

    // Messaging
    { id: 'discord', name: 'Discord', wingetId: 'Discord.Discord', category: 'Messaging', website: 'discord.com' },
    { id: 'slack', name: 'Slack', wingetId: 'SlackTechnologies.Slack', category: 'Messaging', website: 'slack.com' },
    { id: 'telegram', name: 'Telegram', wingetId: 'Telegram.TelegramDesktop', category: 'Messaging', website: 'telegram.org' },

    // Media
    { id: 'potplayer', name: 'PotPlayer', wingetId: 'Daum.PotPlayer', category: 'Media', website: 'potplayer.daum.net' },
    { id: 'spotify', name: 'Spotify', wingetId: 'Spotify.Spotify', category: 'Media', website: 'spotify.com' },
    { id: 'obs', name: 'OBS Studio', wingetId: 'OBSProject.OBSStudio', category: 'Media', website: 'obsproject.com' },

    // Runtimes
    { id: 'python3', name: 'Python 3', wingetId: 'Python.Python.3.12', category: 'Runtimes', website: 'python.org' },
    { id: 'vcredist2005', name: 'VC++ 2005 (x64)', wingetId: 'Microsoft.VCRedist.2005.x64', category: 'Runtimes', website: 'microsoft.com' },
    { id: 'vcredist2008', name: 'VC++ 2008 (x64)', wingetId: 'Microsoft.VCRedist.2008.x64', category: 'Runtimes', website: 'microsoft.com' },
    { id: 'vcredist2010', name: 'VC++ 2010 (x64)', wingetId: 'Microsoft.VCRedist.2010.x64', category: 'Runtimes', website: 'microsoft.com' },
    { id: 'vcredist2012', name: 'VC++ 2012 (x64)', wingetId: 'Microsoft.VCRedist.2012.x64', category: 'Runtimes', website: 'microsoft.com' },
    { id: 'vcredist2013', name: 'VC++ 2013 (x64)', wingetId: 'Microsoft.VCRedist.2013.x64', category: 'Runtimes', website: 'microsoft.com' },
    { id: 'vcredist2015', name: 'VC++ 2015+ (x64)', wingetId: 'Microsoft.VCRedist.2015+.x64', category: 'Runtimes', website: 'microsoft.com' },

    // Developer Tools
    { id: 'vscode', name: 'VS Code', wingetId: 'Microsoft.VisualStudioCode', category: 'Developer Tools', website: 'code.visualstudio.com' },
    { id: 'arduino', name: 'Arduino IDE', wingetId: 'ArduinoSA.IDE.stable', category: 'Developer Tools', website: 'arduino.cc' },
    { id: 'git', name: 'Git', wingetId: 'Git.Git', category: 'Developer Tools', website: 'git-scm.com' },
    { id: 'docker', name: 'Docker Desktop', wingetId: 'Docker.DockerDesktop', category: 'Developer Tools', website: 'docker.com' },
    { id: 'postman', name: 'Postman', wingetId: 'Postman.Postman', category: 'Developer Tools', website: 'postman.com' },

    // Education
    { id: 'anki', name: 'Anki', wingetId: 'Anki.Anki', category: 'Education', website: 'apps.ankiweb.net' },
    { id: 'grammarly', name: 'Grammarly', wingetId: 'Grammarly.Grammarly', category: 'Education', website: 'grammarly.com' },

    // Gaming
    { id: 'epic', name: 'Epic Games Launcher', wingetId: 'EpicGames.EpicGamesLauncher', category: 'Gaming', website: 'epicgames.com' },
    { id: 'ubisoft', name: 'Ubisoft Connect', wingetId: 'Ubisoft.Connect', category: 'Gaming', website: 'ubisoftconnect.com' },
    { id: 'gog', name: 'GOG GALAXY', wingetId: 'GOG.Galaxy', category: 'Gaming', website: 'gog.com/galaxy' },
    { id: 'playnite', name: 'Playnite', wingetId: 'Playnite.Playnite', category: 'Gaming', website: 'playnite.link' },
    { id: 'steam', name: 'Steam', wingetId: 'Valve.Steam', category: 'Gaming', website: 'store.steampowered.com' },

    // Utilities
    { id: '7zip', name: '7-Zip', wingetId: '7zip.7zip', category: 'Utilities', website: '7-zip.org' },
    { id: 'balenaetcher', name: 'balenaEtcher', wingetId: 'Balena.Etcher', category: 'Utilities', website: 'balena.io' },
    { id: 'bcuninstaller', name: 'BCUninstaller', wingetId: 'Klocman.BulkCrapUninstaller', category: 'Utilities', website: 'bcuninstaller.com' },
    { id: 'rustdesk', name: 'RustDesk', wingetId: 'RustDesk.RustDesk', category: 'Utilities', website: 'rustdesk.com' },
    { id: 'cloudflare', name: 'Cloudflare WARP', wingetId: 'Cloudflare.Warp', category: 'Utilities', website: 'one.one.one.one' },
    { id: 'virtualbox', name: 'Oracle VM VirtualBox', wingetId: 'Oracle.VirtualBox', category: 'Utilities', website: 'virtualbox.org' },
    { id: 'windirstat', name: 'WinDirStat', wingetId: 'WinDirStat.WinDirStat', category: 'Utilities', website: 'windirstat.net' },
    { id: 'everything', name: 'Everything', wingetId: 'voidtools.Everything', category: 'Utilities', website: 'voidtools.com' },
    { id: 'localsend', name: 'LocalSend', wingetId: 'LocalSend.LocalSend', category: 'Utilities', website: 'localsend.org' },
    { id: 'qbittorrent', name: 'qBittorrent', wingetId: 'qBittorrent.qBittorrent', category: 'Utilities', website: 'qbittorrent.org' },
];

export const categories = Array.from(new Set(apps.map(app => app.category)));
