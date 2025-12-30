# ERPNext Desktop App Release Notes

## Version 1.0.0

### 🎉 Initial Release

A production-ready Electron.js desktop application that wraps ERPNext with secure authentication and native printing support.

### ✨ Features

#### Security
- ✅ HTTPS-only connections with SSL certificate validation
- ✅ Secure credential storage using OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- ✅ Session-based authentication with CSRF protection
- ✅ Context isolation and disabled Node integration in renderer
- ✅ Content Security Policy enforcement

#### Authentication
- ✅ Username/password login
- ✅ Remember credentials securely
- ✅ Multi-tenant support (multiple ERP instances)
- ✅ Auto-reconnect with saved session
- ✅ Supports 2FA when enabled on server

#### Printing
- ✅ Native OS printing dialog
- ✅ Silent printing for thermal printers
- ✅ PDF export functionality
- ✅ Thermal printer configurations (58mm, 80mm)
- ✅ Label printer support (4"x6")
- ✅ Custom page sizes and margins

#### User Experience
- ✅ Modern, responsive login interface
- ✅ Custom ERPNext branding with logo
- ✅ Offline detection and error handling
- ✅ Deep linking support
- ✅ Auto-update functionality
- ✅ Developer tools for debugging

### 📦 Supported Platforms

- **macOS**: Intel (x64) and Apple Silicon (ARM64)
- **Windows**: 64-bit (x64) and 32-bit (x86)
- **Linux**: x64 and ARM64 (AppImage and Deb packages)

### 📥 Installation

#### macOS
1. Download `ERPNext Desktop-1.0.0-arm64.dmg` (Apple Silicon) or `ERPNext Desktop-1.0.0.dmg` (Intel)
2. Open the DMG file
3. Drag the app to Applications folder
4. Launch from Applications
5. If security warning appears: System Preferences → Security & Privacy → "Open Anyway"

#### Windows
1. Download `ERPNext Desktop Setup 1.0.0.exe`
2. Run the installer
3. Follow installation wizard
4. Launch from Start Menu or Desktop shortcut

#### Linux
**AppImage:**
```bash
chmod +x ERPNext-Desktop-1.0.0-x86_64.AppImage
./ERPNext-Desktop-1.0.0-x86_64.AppImage
```

**Debian/Ubuntu:**
```bash
sudo dpkg -i erpnext-desktop_1.0.0_amd64.deb
```

### 🔧 Configuration

On first launch:
1. Enter your ERPNext URL (must be HTTPS)
2. Enter your username and password
3. Check "Remember credentials" to save securely
4. Click "Sign In"

### 📋 System Requirements

- **macOS**: 10.13 (High Sierra) or later
- **Windows**: Windows 10 or later
- **Linux**: Ubuntu 18.04 or equivalent
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 200MB for installation
- **Network**: HTTPS-enabled ERPNext instance

### 🔐 Security Notes

- All credentials are stored in OS-specific secure storage (never in plain text)
- Only HTTPS connections are allowed
- Self-signed certificates are rejected by default
- For production use, ensure your ERPNext instance has a valid SSL certificate

### 🐛 Known Issues

- Dev tools are enabled in this version (will be disabled in production builds)
- Code signing certificates not included (may show security warnings on first launch)
- Windows SmartScreen may show warning - click "More info" → "Run anyway"

### 📚 Documentation

- [README.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/README.md) - Project overview
- [QUICKSTART.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/QUICKSTART.md) - Getting started guide
- [SECURITY.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/SECURITY.md) - Security guidelines
- [BUILD.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/BUILD.md) - Build instructions
- [DEPLOYMENT.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/DEPLOYMENT.md) - Deployment guide

### 🙏 Acknowledgments

Built with:
- [Electron](https://www.electronjs.org/) - Desktop app framework
- [ERPNext](https://erpnext.com/) - Open source ERP
- [Frappe Framework](https://frappeframework.com/) - Python web framework
- [electron-builder](https://www.electron.build/) - Build and distribution

### 📝 Changelog

See [CHANGELOG.md](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/CHANGELOG.md) for detailed changes.

### 💬 Support

- **Issues**: [GitHub Issues](https://github.com/codfatherlogic/erpnext_desktop_app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codfatherlogic/erpnext_desktop_app/discussions)
- **Email**: support@codfatherlogic.com

### 📜 License

MIT License - See [LICENSE](https://github.com/codfatherlogic/erpnext_desktop_app/blob/main/LICENSE) for details.

---

**Full Changelog**: https://github.com/codfatherlogic/erpnext_desktop_app/commits/v1.0.0
