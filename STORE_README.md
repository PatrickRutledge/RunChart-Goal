# Microsoft Store Package

This branch is configured to build Run Chart as a Progressive Web App (PWA) for Microsoft Store submission.

## Prerequisites

- **Microsoft Partner Center Account** - Required for store submission
- **Windows 10/11** - For testing and validation
- **PWA Builder CLI** (optional) - `npm install -g @pwabuilder/cli`

## Building for Microsoft Store

### 1. Build PWA
```bash
npm install
npm run build:pwa
```

### 2. Generate PWA Assets
```bash
# Generate all PWA icons and splash screens
npm run pwa:generate-icons
```

### 3. Test PWA Locally
```bash
npm run preview:pwa
```

### 4. Package for Store

#### Option A: Using PWA Builder (Recommended)
```bash
# Install PWA Builder globally
npm install -g @pwabuilder/cli

# Generate store package
pwa package --platform windows --dir dist/
```

#### Option B: Manual MSIX Package
1. Use **MSIX Packaging Tool** from Microsoft Store
2. Point to your built `dist/` folder
3. Follow the packaging wizard

## Store Submission Requirements

### App Icons (Required)
- **Store Logo**: 50x50 px (`StoreLogo.png`)
- **Square 150x150**: 150x150 px (`Square150x150Logo.png`) 
- **Square 44x44**: 44x44 px (`Square44x44Logo.png`)
- **Wide 310x150**: 310x150 px (`Wide310x150Logo.png`)

### Screenshots (Required)
- **Desktop**: 1280x720 px (minimum 1 screenshot)
- **Mobile**: 750x1334 px (if mobile supported)

### Description Content
- **Short Description**: Under 200 characters
- **Full Description**: Detailed app functionality
- **Features List**: Key features and benefits
- **Keywords**: For store search optimization

## PWA Features Implemented

✅ **Service Worker** - Offline functionality  
✅ **Web App Manifest** - Installation support  
✅ **Responsive Design** - Works on all screen sizes  
✅ **HTTPS Ready** - Secure connection support  
✅ **Offline Capable** - Core functionality works offline  
✅ **App Shortcuts** - Quick actions from Start Menu  
✅ **Share Target** - Accept shared data from other apps  

## Microsoft Store Guidelines

### Technical Requirements
- App must be installable as PWA
- HTTPS hosting required  
- Must pass Microsoft Store policies
- Responsive design for different screen sizes
- Proper error handling and loading states

### Content Requirements  
- Family-friendly content
- Clear privacy policy
- Accurate app description
- High-quality app icons and screenshots
- Proper age rating

## Deployment Steps

1. **Build and Test**:
   ```bash
   npm run build:pwa
   npm run preview:pwa
   ```

2. **Generate Package**:
   ```bash
   pwa package --platform windows
   ```

3. **Submit to Store**:
   - Upload MSIX package to Partner Center
   - Complete store listing details
   - Add screenshots and descriptions
   - Submit for certification

4. **Post-Submission**:
   - Monitor certification status
   - Respond to any feedback
   - Plan update strategy

## Testing

### Local Testing
- Test PWA installation from browser
- Verify offline functionality
- Test all features work correctly
- Check responsive design

### Store Testing
- Use Microsoft Store testing tools
- Test installation process
- Verify store listing accuracy
- Test on different Windows versions

## Updates

PWA updates are automatic when users visit the app. For store updates:
1. Update version in `package.json`
2. Rebuild and repackage
3. Submit update to Partner Center

## Resources

- [Microsoft Store PWA Documentation](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Partner Center](https://partner.microsoft.com/)
- [Store Policies](https://docs.microsoft.com/en-us/windows/uwp/publish/store-policies)
