# ERPNext Desktop - Quick Start Guide

## Installation

### 1. Install Dependencies
```bash
cd /Users/sammishthundiyil/erpnext_electronjs
npm install
```

### 2. Run the Application
```bash
npm start
```

## First Launch

1. **Enter ERPNext URL**
   - Must be HTTPS (e.g., `https://your-erp-domain.com`)
   - No trailing slash

2. **Enter Credentials**
   - Username: Your ERPNext username/email
   - Password: Your ERPNext password

3. **Remember Credentials** (Optional)
   - Check the box to save credentials securely in OS keychain

4. **Click Sign In**
   - App will authenticate with your ERPNext server
   - Main window opens with full ERPNext interface

## Features

### ✅ Secure Authentication
- Session-based login
- Credentials stored in OS keychain
- HTTPS enforcement
- CSRF protection

### ✅ Native Printing
- Direct OS printer access
- PDF export functionality
- Thermal printer support (58mm, 80mm)
- Label printer support (4x6)

### ✅ Multi-Tenant
- Switch between different ERP instances
- Saved credentials per instance
- Quick URL switching

### ✅ Auto-Update
- Automatic update checks
- Background downloads
- One-click install

## Development

### Project Structure
```
erpnext_electronjs/
├── main.js                 # Main Electron process
├── login.html             # Login window UI
├── preload-login.js       # Login window bridge
├── preload-main.js        # Main window bridge
├── print-enhancement.js   # Printing functionality
├── printer-config.js      # Printer configurations
├── config.json           # Application configuration
├── package.json          # Dependencies & build config
├── README.md            # Project documentation
├── SECURITY.md          # Security guidelines
└── DEPLOYMENT.md        # Deployment instructions
```

### Key Files

**main.js** - Core application logic
- Window management
- Authentication handler
- Printing setup
- Auto-update configuration

**login.html** - Login interface
- Modern, responsive UI
- Form validation
- Error handling

**preload-*.js** - Security bridges
- Context isolation
- IPC communication
- API exposure

### Configuration

Edit `config.json`:
```json
{
  "defaultErpUrl": "https://your-default-erp-url.com",
  "security": {
    "enforceHttps": true,
    "validateCertificates": true
  },
  "printing": {
    "defaultPaperSize": "A4",
    "enableSilentPrint": false
  }
}
```

## Building

### macOS
```bash
npm run build:mac
```
Output: `dist/ERPNext Desktop.dmg`

### Windows
```bash
npm run build:win
```
Output: `dist/ERPNext Desktop Setup.exe`

### Linux
```bash
npm run build:linux
```
Output: `dist/ERPNext Desktop.AppImage`

## Troubleshooting

### Login Issues
- Verify HTTPS URL is correct
- Check ERPNext server is accessible
- Verify credentials are correct
- Check internet connection

### SSL Certificate Errors
- Ensure ERPNext has valid SSL certificate
- Self-signed certificates are not supported by default

### Printing Issues
- Verify printer is connected
- Check printer drivers are installed
- Try PDF export first to test

### Performance Issues
- Clear browser cache: `session.defaultSession.clearStorageData()`
- Restart application
- Check system resources

## Security

### Best Practices
✅ Always use HTTPS
✅ Use strong passwords
✅ Enable 2FA on ERPNext
✅ Keep application updated
✅ Don't share credentials
✅ Logout when done

### What's Protected
✅ Credentials (OS keychain)
✅ Session cookies (encrypted)
✅ Network traffic (HTTPS)
✅ Code injection (context isolation)

## Testing

### Test Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Remember credentials
- [ ] Print a document
- [ ] Export PDF
- [ ] Navigate ERPNext
- [ ] Logout
- [ ] Re-login with saved credentials

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Test in development: `npm start`
3. ✅ Configure settings in `config.json`
4. ✅ Build for production: `npm run build:mac/win/linux`
5. ✅ Distribute to users

## Support

- 📖 Documentation: See README.md, SECURITY.md, DEPLOYMENT.md
- 🐛 Issues: Create GitHub issue
- 💬 Questions: Contact support team
- 🔐 Security: See SECURITY.md

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [ERPNext Documentation](https://docs.erpnext.com)
- [Frappe Framework](https://frappeframework.com)

---

**Ready to start!** Run `npm install` then `npm start` 🚀
