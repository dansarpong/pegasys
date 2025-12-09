import { NextResponse } from 'next/server';
import { apps } from '@/data/apps';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { apps: selectedAppIds } = body;

        if (!selectedAppIds || !Array.isArray(selectedAppIds) || selectedAppIds.length === 0) {
            return NextResponse.json({ error: 'No apps selected' }, { status: 400 });
        }

        const selectedApps = apps.filter((app) => selectedAppIds.includes(app.id));

        if (selectedApps.length === 0) {
            return NextResponse.json({ error: 'Invalid apps selected' }, { status: 400 });
        }

        // Separate apps by installation type
        const wingetApps = selectedApps.filter(app => app.wingetId);
        const manualApps = selectedApps.filter(app => app.manualUrl);

        // Generate Batch script content
        let scriptContent = '@echo off\r\n';
        scriptContent += 'echo Pegasys Installer\r\n';
        scriptContent += 'echo ------------------\r\n';
        scriptContent += 'echo.\r\n';

        // List all selected apps
        if (wingetApps.length > 0) {
            scriptContent += 'echo Apps to install automatically:\r\n';
            wingetApps.forEach(app => {
                scriptContent += `echo - ${app.name}\r\n`;
            });
            scriptContent += 'echo.\r\n';
        }

        if (manualApps.length > 0) {
            scriptContent += 'echo Apps requiring manual download:\r\n';
            manualApps.forEach(app => {
                scriptContent += `echo - ${app.name}\r\n`;
            });
            scriptContent += 'echo.\r\n';
        }

        // Automated installations section
        if (wingetApps.length > 0) {
            scriptContent += 'echo Checking for winget...\r\n';
            scriptContent += 'where winget >nul 2>nul\r\n';
            scriptContent += 'if %errorlevel% neq 0 (\r\n';
            scriptContent += '    echo Winget is not installed or not in PATH. Please update Windows or install App Installer from the Microsoft Store.\r\n';
            scriptContent += '    pause\r\n';
            scriptContent += '    exit /b 1\r\n';
            scriptContent += ')\r\n\r\n';

            scriptContent += 'echo ====================================\r\n';
            scriptContent += 'echo AUTOMATED INSTALLATIONS\r\n';
            scriptContent += 'echo ====================================\r\n';
            scriptContent += 'echo.\r\n';

            wingetApps.forEach(app => {
                scriptContent += `echo Installing ${app.name}...\r\n`;
                scriptContent += `winget install -e --id ${app.wingetId} --accept-source-agreements --accept-package-agreements --source winget\r\n`;
                scriptContent += 'if %errorlevel% neq 0 echo Failed to install ' + app.name + '\r\n';
                scriptContent += 'echo.\r\n';
            });
        }

        // Manual downloads section
        if (manualApps.length > 0) {
            scriptContent += 'echo.\r\n';
            scriptContent += 'echo ====================================\r\n';
            scriptContent += 'echo MANUAL DOWNLOADS REQUIRED\r\n';
            scriptContent += 'echo ====================================\r\n';
            scriptContent += 'echo.\r\n';
            scriptContent += 'echo The following apps require manual download:\r\n';
            scriptContent += 'echo.\r\n';

            manualApps.forEach(app => {
                scriptContent += `echo ${app.name}\r\n`;
                scriptContent += `echo Download from: ${app.manualUrl}\r\n`;
                if (app.website) {
                    scriptContent += `echo Website: https://${app.website}\r\n`;
                }
                scriptContent += 'echo.\r\n';
            });

            scriptContent += 'echo Opening download links in your browser...\r\n';
            manualApps.forEach(app => {
                scriptContent += `start "" "${app.manualUrl}"\r\n`;
            });
        }

        scriptContent += 'echo.\r\n';
        scriptContent += 'echo Installation script complete!\r\n';
        scriptContent += 'pause\r\n';

        // Generate filename
        const appNames = selectedApps.map(app => app.id).slice(0, 5); // Limit to 5 to avoid too long filenames
        const filename = `PegasysInstaller-${appNames.join('-')}.bat`;

        // Return the script as a downloadable file
        return new NextResponse(scriptContent, {
            headers: {
                'Content-Type': 'application/x-bat',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Error generating installer:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
