# Desktop Application Package

This branch is configured to build Run Chart as a desktop application using Electron.

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup
```bash
npm install
```

### Development Mode
```bash
# Start the Vite dev server and Electron in development mode
npm run electron:dev
```

### Building Desktop App

#### Build for Current Platform
```bash
npm run electron:pack
```

#### Build for Distribution
```bash
npm run electron:dist
```

### Supported Platforms

#### Windows
- **NSIS Installer** (.exe) - Full installer with uninstaller
- **Portable** (.exe) - Standalone executable, no installation required

#### macOS  
- **DMG** (.dmg) - Standard macOS disk image
- Supports both Intel (x64) and Apple Silicon (arm64)

#### Linux
- **AppImage** (.AppImage) - Portable Linux application
- **Debian Package** (.deb) - For Debian/Ubuntu systems

### Distribution Files

Built applications will be located in `dist-electron/` directory:

```
dist-electron/
├── win-unpacked/           # Windows unpacked files
├── mac/                    # macOS app bundle  
├── linux-unpacked/         # Linux unpacked files
├── Run Chart Setup.exe     # Windows installer
├── Run Chart Portable.exe  # Windows portable
├── Run Chart.dmg          # macOS installer
├── Run Chart.AppImage     # Linux AppImage
└── Run Chart.deb          # Debian package
```

### Features

- **Native Desktop Integration**: System notifications, file associations
- **Offline Capability**: Works without internet connection
- **Auto-updater Ready**: Configured for automatic updates
- **Cross-platform**: Single codebase for Windows, macOS, and Linux
- **Menu Integration**: Native application menus with keyboard shortcuts
- **Security**: Sandboxed with context isolation enabled

### Building for Different Platforms

You can build for specific platforms even when developing on a different OS:

```bash
# Build for Windows (from any OS)
npx electron-builder --win

# Build for macOS (requires macOS or CI)
npx electron-builder --mac  

# Build for Linux (from any OS)
npx electron-builder --linux
```

### Code Signing (Optional)

For production releases, you'll want to code sign your applications:

1. **Windows**: Get a code signing certificate
2. **macOS**: Join Apple Developer Program  
3. **Linux**: Generally not required

Add signing configuration to the `build` section in package.json when ready.
