# ERPNext Desktop - Security Guidelines

## Overview

This application implements multiple security layers to protect your ERPNext credentials and session data.

## Security Features Implemented

### ✅ 1. HTTPS Enforcement
- Only HTTPS connections are allowed
- SSL certificate validation is enforced
- Self-signed certificates are rejected by default

### ✅ 2. Credential Storage
- Passwords are stored in OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- Never stored in plain text
- Automatic encryption by the operating system

### ✅ 3. Context Isolation
- Renderer processes are isolated from Node.js
- No direct access to Node.js APIs from web content
- IPC communication is whitelisted and controlled

### ✅ 4. Session Management
- Session cookies are stored securely
- Persistent session support across app restarts
- Automatic session cleanup on logout

### ✅ 5. Content Security
- Content Security Policy (CSP) headers
- XSS protection
- No eval() or inline scripts in login window

### ✅ 6. Navigation Protection
- Only same-origin navigation allowed
- External links are prevented
- No arbitrary code execution

## Security Best Practices

### For Administrators

1. **HTTPS Requirement**
   - Always use valid SSL certificates
   - Do not disable certificate validation
   - Keep certificates up to date

2. **User Training**
   - Train users to verify the ERP URL
   - Encourage strong passwords
   - Enable 2FA on ERPNext server

3. **Network Security**
   - Use VPN for remote access
   - Implement IP whitelisting
   - Monitor failed login attempts

4. **Application Updates**
   - Keep the desktop app updated
   - Enable auto-update feature
   - Subscribe to security notifications

### For Developers

1. **Never disable security features**
   ```javascript
   // ❌ DON'T DO THIS
   nodeIntegration: true
   contextIsolation: false
   
   // ✅ ALWAYS USE
   nodeIntegration: false
   contextIsolation: true
   ```

2. **Always validate URLs**
   ```javascript
   if (!url.startsWith('https://')) {
     throw new Error('HTTPS required');
   }
   ```

3. **Use latest Electron version**
   - Update regularly for security patches
   - Check Electron security advisories

4. **Code signing**
   - Sign the application before distribution
   - Use valid code signing certificates

## Threat Model

### Protected Against

- ✅ Man-in-the-middle attacks (HTTPS)
- ✅ Credential theft (OS keychain)
- ✅ XSS attacks (CSP)
- ✅ Code injection (context isolation)
- ✅ Session hijacking (secure cookies)
- ✅ Arbitrary navigation (origin check)

### Not Protected Against

- ⚠️ Compromised ERPNext server
- ⚠️ OS-level malware
- ⚠️ Physical access attacks
- ⚠️ Phishing (user enters wrong URL)

## Incident Response

### If Credentials Are Compromised

1. Logout from desktop app
2. Change password in ERPNext
3. Clear stored credentials:
   ```bash
   # macOS
   security delete-generic-password -s "ERPNext-Desktop"
   
   # Linux
   rm -rf ~/.config/ERPNext-Desktop
   
   # Windows
   # Use Credential Manager to remove
   ```
4. Reinstall desktop app if needed

### Reporting Security Issues

- Do not disclose publicly
- Email: security@yourcompany.com
- Include steps to reproduce
- Allow time for patch before disclosure

## Compliance

This application follows:
- OWASP Top 10 guidelines
- Electron Security Best Practices
- CWE/SANS Top 25 recommendations

## Security Checklist

Before deploying:

- [ ] HTTPS enforced
- [ ] Valid SSL certificate
- [ ] Code signed application
- [ ] Dev tools disabled
- [ ] Security review completed
- [ ] Penetration testing done
- [ ] User training material prepared
- [ ] Incident response plan ready

## Regular Security Tasks

### Weekly
- Monitor failed login attempts
- Review application logs

### Monthly
- Check for Electron updates
- Review security advisories
- Test backup/restore procedures

### Quarterly
- Full security audit
- Penetration testing
- Update security documentation

## Additional Resources

- [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)
- [OWASP Desktop App Security](https://owasp.org/www-community/)
- [ERPNext Security](https://frappeframework.com/docs/user/en/security)
