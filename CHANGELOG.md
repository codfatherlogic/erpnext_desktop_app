# Changelog

All notable changes to ERPNext Desktop will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-30

### Added
- Initial release of ERPNext Desktop
- Secure session-based authentication
- OS keychain credential storage (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- Native printing support with multiple printer types
- Thermal printer configurations (58mm, 80mm)
- Label printer support (4"x6")
- PDF export functionality
- Multi-tenant support (multiple ERP instances)
- Auto-update functionality
- Offline detection and error handling
- Custom ERPNext branding with logo
- Deep linking support
- HTTPS enforcement with SSL certificate validation
- Context isolation and security hardening
- Content Security Policy
- Developer tools for debugging
- Multi-platform builds (macOS Intel/Silicon, Windows x64/x86, Linux x64/ARM64)
- Comprehensive documentation (README, QUICKSTART, SECURITY, BUILD, DEPLOYMENT)
- CI/CD workflows for automated builds
- Build scripts for all platforms

### Security
- Node integration disabled in renderer processes
- Context isolation enabled
- HTTPS-only connections
- SSL certificate validation
- Credentials stored securely in OS keychain
- CSRF protection via session cookies
- No plain text password storage

### Technical
- Electron 28.0.0
- electron-builder for packaging
- axios for HTTP requests
- keytar for secure credential storage
- electron-store for settings persistence
- electron-updater for auto-updates

## [Unreleased]

### Planned
- Code signing for macOS and Windows
- macOS notarization
- App store distribution (macOS App Store, Microsoft Store)
- Custom print templates
- Offline mode with sync
- System tray support
- Keyboard shortcuts
- Multiple window support
- Plugin system
- Localization support
- Performance optimizations
- Enhanced error reporting
- Crash reporting with Sentry
- Analytics (optional, privacy-focused)

---

For more details on each release, see the [GitHub Releases](https://github.com/codfatherlogic/erpnext_desktop_app/releases) page.
