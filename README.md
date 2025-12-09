# Pegasis

A web application that simplifies installing Windows applications by generating custom batch installers.

## Features

- **Select Multiple Apps**: Choose from a curated list of popular Windows applications across categories (browsers, messaging, media, developer tools, etc.)
- **Custom Batch Installer**: Generates a `.bat` file that installs all selected apps using `winget`
- **Always Up-to-Date**: Uses `winget` with the `--source winget` flag to fetch the latest versions from the community repository
- **Dynamic Filenames**: The installer filename includes all selected app names for easy identification

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building

```bash
npm run build
```

## Package ID Validation

To ensure all winget package IDs are correct, run the validation script on a Windows machine:

```bash
# On Windows with winget installed
bash scripts/validate-winget-ids.sh
```

This script checks each package ID against the live winget repository.

## How It Works

1. User selects applications from the web interface
2. Clicks "Get Your Installer"
3. A custom `.bat` file is generated with commands like:
   ```batch
   winget install -e --id Google.Chrome --accept-source-agreements --accept-package-agreements --source winget
   ```
4. User runs the `.bat` file on their Windows machine to install all selected apps

## Notes

- All apps are installed from the winget community repository, **not** the Microsoft Store
- The installer requires Windows 10 or later with winget installed
- Internet connection required during installation
