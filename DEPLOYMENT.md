# ERPNext Desktop - Deployment Guide

## Build & Distribution

### Prerequisites

1. **Node.js 18+**
   ```bash
   node --version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Code Signing Certificates** (for production)
   - macOS: Apple Developer ID certificate
   - Windows: Code signing certificate from trusted CA
   - Linux: Optional GPG signing

## Building the Application

### Development Build
```bash
npm start
```

### Production Builds

#### macOS
```bash
npm run build:mac
```
Outputs:
- `dist/ERPNext Desktop.dmg` - Disk image installer
- `dist/ERPNext Desktop.app.zip` - Portable app

**Code Signing (macOS)**
```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
npm run build:mac
```

**Notarization (required for macOS 10.15+)**
```bash
export APPLE_ID=your.email@example.com
export APPLE_ID_PASSWORD=app-specific-password
npm run build:mac
```

#### Windows
```bash
npm run build:win
```
Outputs:
- `dist/ERPNext Desktop Setup.exe` - NSIS installer
- `dist/ERPNext Desktop.exe` - Portable executable

**Code Signing (Windows)**
```bash
export CSC_LINK=/path/to/certificate.pfx
export CSC_KEY_PASSWORD=your_password
npm run build:win
```

#### Linux
```bash
npm run build:linux
```
Outputs:
- `dist/ERPNext Desktop.AppImage` - Universal Linux binary
- `dist/erpnext-desktop_1.0.0_amd64.deb` - Debian package

### Multi-Platform Build
```bash
npm run build
```

## Configuration for Deployment

### 1. Update package.json

```json
{
  "name": "erpnext-desktop",
  "version": "1.0.0",
  "author": "Your Company Name",
  "description": "ERPNext Desktop Client",
  "homepage": "https://yourcompany.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourcompany/erpnext-desktop"
  }
}
```

### 2. Configure Auto-Update

Edit package.json:
```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "yourcompany",
      "repo": "erpnext-desktop"
    }
  }
}
```

Or use S3:
```json
{
  "build": {
    "publish": {
      "provider": "s3",
      "bucket": "your-bucket-name",
      "region": "us-east-1"
    }
  }
}
```

### 3. Set Default ERP URL (Optional)

Edit `config.json`:
```json
{
  "defaultErpUrl": "https://erp.yourcompany.com"
}
```

## Distribution Methods

### Method 1: GitHub Releases
1. Create GitHub repository
2. Set up releases
3. Upload built artifacts
4. Users download from releases page
5. Auto-update works automatically

### Method 2: Company Website
1. Host installers on your web server
2. Provide download links
3. Configure auto-update URL
4. Monitor download analytics

### Method 3: Private Distribution
1. Use company intranet
2. Deploy via MDM (Mobile Device Management)
3. Use enterprise app stores
4. Silent installation for corporate devices

## Installation Instructions for Users

### macOS
1. Download `ERPNext Desktop.dmg`
2. Open the DMG file
3. Drag app to Applications folder
4. Launch from Applications
5. If security warning appears:
   - System Preferences → Security & Privacy
   - Click "Open Anyway"

### Windows
1. Download `ERPNext Desktop Setup.exe`
2. Run the installer
3. Follow installation wizard
4. Launch from Start Menu or Desktop shortcut
5. If SmartScreen appears, click "More info" → "Run anyway"

### Linux
**AppImage:**
```bash
chmod +x ERPNext-Desktop.AppImage
./ERPNext-Desktop.AppImage
```

**Debian/Ubuntu:**
```bash
sudo dpkg -i erpnext-desktop_1.0.0_amd64.deb
sudo apt-get install -f  # if dependencies missing
```

## Enterprise Deployment

### Silent Installation

**Windows:**
```cmd
ERPNext-Desktop-Setup.exe /S
```

**macOS:**
```bash
sudo installer -pkg ERPNext-Desktop.pkg -target /
```

### Pre-configured Deployment

1. Create custom `config.json`:
```json
{
  "defaultErpUrl": "https://erp.company.com",
  "security": {
    "allowedDomains": ["erp.company.com"]
  }
}
```

2. Bundle with installer:
```bash
# Add to package.json build config
"extraResources": [
  {
    "from": "config.json",
    "to": "config.json"
  }
]
```

## Monitoring & Analytics

### Usage Tracking (Optional)

Add to main.js:
```javascript
const analytics = require('electron-google-analytics');

app.on('ready', () => {
  analytics.init('UA-XXXXXXXXX-X');
  analytics.event('App', 'Launch');
});
```

### Error Reporting

Add Sentry or similar:
```bash
npm install @sentry/electron
```

```javascript
const Sentry = require('@sentry/electron');

Sentry.init({
  dsn: 'https://your-sentry-dsn'
});
```

## Maintenance

### Version Updates

1. Update version in `package.json`
2. Build new version
3. Upload to distribution channel
4. Users auto-update on next launch

### Release Notes

Create `CHANGELOG.md`:
```markdown
# Changelog

## [1.1.0] - 2025-01-15
### Added
- Thermal printer support
- Offline mode indicator

### Fixed
- Login timeout issues
- Print dialog scaling
```

## Security Hardening

### Pre-deployment Checklist

- [ ] Code signed with valid certificate
- [ ] HTTPS only, certificates validated
- [ ] Dev tools disabled (`enableDevTools: false`)
- [ ] Node integration disabled
- [ ] Context isolation enabled
- [ ] Security audit completed
- [ ] Penetration testing done

### Post-deployment

- [ ] Monitor error reports
- [ ] Track failed login attempts
- [ ] Regular security updates
- [ ] User training materials distributed

## Support & Troubleshooting

### Common Issues

**"App can't be opened" (macOS)**
- Solution: Right-click → Open, or System Preferences → Security

**"Windows protected your PC"**
- Solution: Click "More info" → "Run anyway"

**Login fails with SSL error**
- Solution: Verify ERPNext uses valid HTTPS certificate

**Printer not found**
- Solution: Check printer is connected and drivers installed

### Support Resources

- Documentation: `/docs`
- GitHub Issues: `github.com/yourcompany/erpnext-desktop/issues`
- Email: support@yourcompany.com
- ERPNext Forum: discuss.erpnext.com

## License & Legal

Ensure you have:
- [ ] License file included
- [ ] Attribution for open source components
- [ ] Privacy policy (if collecting data)
- [ ] Terms of service
- [ ] EULA (End User License Agreement)

## Next Steps

1. ✅ Build application
2. ✅ Test on all target platforms
3. ✅ Set up distribution channel
4. ✅ Create user documentation
5. ✅ Train support team
6. ✅ Launch to users
7. ✅ Monitor and maintain
