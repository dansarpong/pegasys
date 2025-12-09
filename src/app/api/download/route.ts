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

        // Generate Batch script content
        let scriptContent = '@echo off\r\n';
        scriptContent += 'echo Pegasis Installer\r\n';
        scriptContent += 'echo ------------------\r\n';
        scriptContent += 'echo This script will install the following applications:\r\n';

        selectedApps.forEach(app => {
            scriptContent += `echo - ${app.name}\r\n`;
        });

        scriptContent += 'echo.\r\n';
        scriptContent += 'echo Checking for winget...\r\n';
        scriptContent += 'where winget >nul 2>nul\r\n';
        scriptContent += 'if %errorlevel% neq 0 (\r\n';
        scriptContent += '    echo Winget is not installed or not in PATH. Please update Windows or install App Installer from the Microsoft Store.\r\n';
        scriptContent += '    pause\r\n';
        scriptContent += '    exit /b 1\r\n';
        scriptContent += ')\r\n\r\n';

        selectedApps.forEach(app => {
            scriptContent += `echo Installing ${app.name}...\r\n`;
            // -e: exact match, --id: specify ID, --accept-source-agreements: auto accept agreements, --accept-package-agreements: auto accept package agreements, --source winget: force winget source
            scriptContent += `winget install -e --id ${app.wingetId} --accept-source-agreements --accept-package-agreements --source winget\r\n`;
            scriptContent += 'if %errorlevel% neq 0 echo Failed to install ' + app.name + '\r\n';
            scriptContent += 'echo.\r\n';
        });

        scriptContent += 'echo.\r\n';
        scriptContent += 'echo Installation complete!\r\n';
        scriptContent += 'pause\r\n';

        // Generate filename
        const appNames = selectedApps.map(app => app.id);
        const filename = `PegasisInstaller-${appNames.join('-')}.bat`;

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
