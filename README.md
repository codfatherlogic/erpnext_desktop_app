# ERPNext Desktop App

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

```bash
npm install
```

## Development

```bash
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
