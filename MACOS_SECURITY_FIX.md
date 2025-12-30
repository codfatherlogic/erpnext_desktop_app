# macOS Security Warning - How to Open Unsigned Apps

## Issue
When you try to open ERPNext Desktop on macOS, you see:
- **"ERPNext Desktop" is damaged and can't be opened**
- **Apple could not verify "ERPNext Desktop" is free of malware**

This happens because the app is **not code-signed** with an Apple Developer certificate.

## ✅ Solution: Remove Quarantine Flag

### Method 1: Using Terminal (Recommended)

1. **Open Terminal** (Applications > Utilities > Terminal)

2. **Remove the quarantine flag**:
   ```bash
   xattr -cr /Applications/ERPNext\ Desktop.app
   ```

3. **Now open the app normally** from Applications

### Method 2: Right-Click Method

1. **Locate the app** in Applications folder
2. **Right-click** (or Control+click) on "ERPNext Desktop"
3. Select **"Open"** from the menu
4. Click **"Open"** in the warning dialog
5. The app will now open and remember this choice

### Method 3: System Settings

1. Try to open the app (it will be blocked)
2. Go to **System Settings > Privacy & Security**
3. Scroll down to the Security section
4. Click **"Open Anyway"** next to the ERPNext Desktop warning
5. Click **"Open"** in the confirmation dialog

## For DMG Files

If you're getting the error when opening the DMG:

```bash
# Remove quarantine from DMG
xattr -cr ~/Downloads/ERPNext\ Desktop-*.dmg

# Then open the DMG and drag to Applications
# Then remove quarantine from the app
xattr -cr /Applications/ERPNext\ Desktop.app
```

## Why This Happens

The app is **unsigned** because:
- Code signing requires an Apple Developer account ($99/year)
- This is an open-source project distributed via GitHub
- The app is safe - you can review the source code

## For Developers: Code Signing

To create signed builds:

1. **Get Apple Developer ID certificate**
2. **Set environment variables**:
   ```bash
   export CSC_LINK=/path/to/certificate.p12
   export CSC_KEY_PASSWORD=your_password
   ```
3. **Build with signing**:
   ```bash
   npm run build:mac
   ```

## Alternative: Run from Source

If you prefer not to use unsigned binaries:

```bash
git clone https://github.com/codfatherlogic/erpnext_desktop_app.git
cd erpnext_desktop_app
npm install
npm start
```

This runs the app directly from source code.

## Verification

The app is safe and open source. You can:
- ✅ Review source code: https://github.com/codfatherlogic/erpnext_desktop_app
- ✅ Build it yourself from source
- ✅ Check the SHA256 checksums of releases

## Need Help?

- **Issues**: https://github.com/codfatherlogic/erpnext_desktop_app/issues
- **Email**: support@codfatherlogic.com

---

**Note**: This warning is normal for unsigned macOS apps. Major apps like Discord, Slack, etc. are signed, which is why you don't see this warning for them.
