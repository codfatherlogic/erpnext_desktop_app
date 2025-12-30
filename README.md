# ERPNext Desktop App

[![Build Status](https://github.com/codfatherlogic/erpnext_desktop_app/workflows/Test%20Build/badge.svg)](https://github.com/codfatherlogic/erpnext_desktop_app/actions)
[![Release](https://img.shields.io/github/v/release/codfatherlogic/erpnext_desktop_app)](https://github.com/codfatherlogic/erpnext_desktop_app/releases)
[![License](https://img.shields.io/github/license/codfatherlogic/erpnext_desktop_app)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)](https://github.com/codfatherlogic/erpnext_desktop_app/releases)

A production-ready Electron.js wrapper for ERPNext with secure authentication and native printing support.

## Features

- ✅ Secure session-based login
- ✅ Native OS printing support
- ✅ Multi-tenant support
- ✅ Encrypted credential storage (OS keychain)
- ✅ Auto-update functionality
- ✅ Offline detection
- ✅ Deep linking support
- ✅ Custom printer integration (thermal, label, A4)

## Installation

### macOS

⚠️ **Important**: Apps are unsigned. You'll see a security warning.

**Quick Fix**:
```bash
xattr -cr /Applications/ERPNext\ Desktop.app
```

See [MACOS_SECURITY_FIX.md](MACOS_SECURITY_FIX.md) for detailed instructions.

**Steps**:
1. Download appropriate DMG from [releases](https://github.com/codfatherlogic/erpnext_desktop_app/releases)
2. Open DMG and drag to Applications
3. Run the command above to remove quarantine flag
4. Launch from Applications

### Windows
1. Download `ERPNext Desktop Setup 1.0.0.exe` from [releases](https://github.com/codfatherlogic/erpnext_desktop_app/releases)
2. Run installer and follow wizard
3. If SmartScreen appears, click "More info" → "Run anyway"

### Linux
**AppImage**:
```bash
chmod +x ERPNext-Desktop-*.AppImage
./ERPNext-Desktop-*.AppImage
```

**Debian/Ubuntu**:
```bash
sudo dpkg -i erpnext-desktop_*.deb
```

## Development

```bash
npm install
npm start
```

## Build

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

## Security

- ✅ HTTPS enforced
- ✅ Node integration disabled in renderer
- ✅ Context isolation enabled
- ✅ Credentials stored in OS keychain
- ✅ CSRF protection via session cookies

## Configuration

Edit `config.json` to set default ERPNext URL or leave blank for user input.

## Architecture

```
Electron (Chromium)
 ├── Main Process (main.js)
 ├── Login Window (login.html)
 └── ERP Window (BrowserView)
      └── ERPNext (HTTPS)
```

## Requirements

- Node.js 18+
- ERPNext hosted with valid HTTPS certificate
- macOS 10.13+ / Windows 10+ / Linux (Ubuntu 18.04+)
