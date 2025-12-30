# Building ERPNext Desktop for Multiple Platforms

## 🚀 Quick Build Commands

### Using Build Script (Recommended)
```bash
# macOS Intel (x64)
./build-app.sh mac-intel

# macOS Apple Silicon (arm64)
./build-app.sh mac-silicon

# macOS Universal (Intel + Silicon)
./build-app.sh mac

# Windows (x64 + x86)
./build-app.sh win

# Linux (x64 + arm64)
./build-app.sh linux

# Build for ALL platforms
./build-app.sh all
```

### Using NPM Scripts Directly
```bash
# macOS builds
npm run build:mac-intel      # Intel only
npm run build:mac-silicon    # Apple Silicon only
npm run build:mac-universal  # Universal binary
npm run build:mac            # Both architectures

# Windows build
npm run build:win            # x64 + x86 installers

# Linux build
npm run build:linux          # x64 + arm64 packages

# All platforms
npm run build:all
```

## 📦 Output Files

After building, find installers in the `dist/` folder:

### macOS
- `ERPNext Desktop-1.0.0-arm64.dmg` - Apple Silicon installer
- `ERPNext Desktop-1.0.0-x64.dmg` - Intel installer
- `ERPNext Desktop-1.0.0-universal.dmg` - Universal installer
- `.zip` files - Portable versions

### Windows
- `ERPNext Desktop Setup 1.0.0.exe` - x64 installer
- `ERPNext Desktop Setup 1.0.0-ia32.exe` - x86 (32-bit) installer
- `ERPNext Desktop 1.0.0.exe` - Portable version

### Linux
- `ERPNext Desktop-1.0.0-x86_64.AppImage` - Universal Linux binary
- `ERPNext Desktop-1.0.0-arm64.AppImage` - ARM64 binary
- `erpnext-desktop_1.0.0_amd64.deb` - Debian/Ubuntu package
- `erpnext-desktop_1.0.0_arm64.deb` - ARM Debian package

## 📋 Build Requirements

### All Platforms
- Node.js 18+
- npm or yarn

### macOS Builds
**On macOS:**
- Xcode Command Line Tools: `xcode-select --install`
- For code signing: Apple Developer ID certificate

**On Linux/Windows (cross-compile):**
- Not recommended - use CI/CD or macOS machine

### Windows Builds
**On Windows:**
- Visual Studio Build Tools or Visual Studio

**On macOS/Linux (recommended):**
- wine: `brew install wine-stable` (macOS)
- Can build unsigned Windows installers

### Linux Builds
**Any platform:**
- Can build on macOS, Windows, or Linux
- No special requirements

## 🔐 Code Signing (Production)

### macOS
```bash
# Set environment variables
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password

# For notarization (macOS 10.15+)
export APPLE_ID=your.email@example.com
export APPLE_ID_PASSWORD=app-specific-password
export APPLE_TEAM_ID=your_team_id

npm run build:mac
```

### Windows
```bash
# Set certificate path
export CSC_LINK=/path/to/certificate.pfx
export CSC_KEY_PASSWORD=your_password

npm run build:win
```

## 📊 Build Sizes (Approximate)

| Platform | Architecture | Size |
|----------|-------------|------|
| macOS    | Intel (x64) | ~150 MB |
| macOS    | Silicon (arm64) | ~140 MB |
| macOS    | Universal | ~280 MB |
| Windows  | x64 | ~130 MB |
| Windows  | x86 | ~120 MB |
| Linux    | x64 | ~140 MB |
| Linux    | arm64 | ~135 MB |

## 🎯 Recommended Build Strategy

### For Development/Testing
```bash
# Build only for your current platform
npm run build:mac-silicon  # On Apple Silicon Mac
npm run build:mac-intel    # On Intel Mac
npm run build:win          # On Windows
npm run build:linux        # On Linux
```

### For Release/Distribution
```bash
# Use CI/CD (GitHub Actions, etc.) to build all platforms
# Or build manually:
./build-app.sh all
```

## 🔧 Troubleshooting

### Build Fails on macOS
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build:mac-intel
```

### Windows Build Fails (NSIS)
```bash
# Install wine on macOS
brew install wine-stable

# Or disable Windows build
npm run build:mac  # macOS only
npm run build:linux  # Linux only
```

### Icon Not Showing
```bash
# Rebuild icons first
./build-icon.sh

# Then build app
npm run build:mac
```

### "Code signing required" Error
```bash
# For development/testing, disable signing temporarily
# Edit package.json and add to mac config:
"mac": {
  "identity": null
}
```

## 📚 CI/CD Example (GitHub Actions)

Create `.github/workflows/build.yml`:
```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      
      - name: Build
        run: |
          npm run build:mac
        if: matrix.os == 'macos-latest'
      
      - name: Build
        run: npm run build:win
        if: matrix.os == 'windows-latest'
      
      - name: Build
        run: npm run build:linux
        if: matrix.os == 'ubuntu-latest'
      
      - uses: actions/upload-artifact@v3
        with:
          name: dist-${{ matrix.os }}
          path: dist/
```

## 🚀 Distribution

After building:

1. **Test the installers** on target platforms
2. **Upload to distribution channel:**
   - GitHub Releases
   - Your own server
   - App stores (macOS App Store, Windows Store)
3. **Enable auto-updates** (see DEPLOYMENT.md)

## 📝 Build Checklist

Before releasing:

- [ ] Update version in package.json
- [ ] Test on all target platforms
- [ ] Code sign for macOS and Windows
- [ ] Notarize macOS build
- [ ] Create release notes
- [ ] Upload to distribution channel
- [ ] Update auto-update server
- [ ] Announce release to users

## 💡 Tips

- **Universal macOS builds** are larger but provide best user experience
- **Separate architecture builds** reduce download size
- **Use CI/CD** for consistent, reproducible builds
- **Always test installers** before distributing
- **Keep electron-builder updated** for latest features

## 🆘 Need Help?

- [Electron Builder Docs](https://www.electron.build/)
- [Electron Docs](https://www.electronjs.org/docs)
- Check logs in `dist/builder-*.log` if build fails
