# Run Chart - Goal Limits - Deployment Guide

This repository contains multiple deployment branches for packaging the Run Chart application across different platforms. Each branch is optimized for its specific deployment target.

## 🌟 Available Deployment Options

### 1. 🌐 Azure Static Web Apps
**Branch:** `azure-deployment`

- **Platform:** Web Browser
- **Hosting:** Azure Static Web Apps
- **Features:** CDN, HTTPS, Custom domains, Auto-scaling
- **Best for:** Quick web deployment with enterprise features

**Quick Deploy:**
```bash
git checkout azure-deployment
# Follow instructions in AZURE_README.md
```

### 2. 💻 Desktop Application  
**Branch:** `desktop-package`

- **Platform:** Windows, macOS, Linux
- **Technology:** Electron
- **Distribution:** Standalone installers (.exe, .dmg, .deb, .AppImage)
- **Best for:** Offline usage, native desktop integration

**Quick Build:**
```bash
git checkout desktop-package
npm install
npm run electron:dist
```

### 3. 🏪 Microsoft Store (PWA)
**Branch:** `store-package`

- **Platform:** Windows 10/11, Web
- **Technology:** Progressive Web App (PWA)
- **Distribution:** Microsoft Store, direct installation
- **Best for:** Store discovery, automatic updates

**Quick Build:**
```bash
git checkout store-package
npm install
npm run build:pwa
```

### 4. 📱 Mobile Apps
**Branch:** `mobile-app`

- **Platform:** iOS, Android
- **Technology:** Capacitor (native mobile apps)
- **Distribution:** App Store, Google Play Store
- **Best for:** Mobile-first users, native mobile features

**Quick Build:**
```bash
git checkout mobile-app
npm install
npm run build:mobile
npm run mobile:android  # or mobile:ios
```

## 🚀 Getting Started

### Choose Your Deployment Path

1. **For Web Hosting** → Use `azure-deployment` branch
2. **For Desktop Users** → Use `desktop-package` branch  
3. **For Microsoft Store** → Use `store-package` branch
4. **For Mobile Apps** → Use `mobile-app` branch

### Development Workflow

1. **Make changes in `main` branch**
2. **Merge to deployment branches as needed**
3. **Deploy from specific branches**

```bash
# Example: Update desktop app
git checkout main
# ... make changes ...
git commit -m "Add new feature"

git checkout desktop-package
git merge main
npm run electron:dist
```

## 📋 Branch Comparison

| Feature | Azure | Desktop | Store | Mobile |
|---------|-------|---------|-------|--------|
| **Offline Support** | ❌ | ✅ | ✅ | ✅ |
| **Auto Updates** | ✅ | ⚠️ | ✅ | ✅ |
| **App Store Distribution** | ❌ | ❌ | ✅ | ✅ |
| **Native Integration** | ❌ | ✅ | ⚠️ | ✅ |
| **Installation Required** | ❌ | ✅ | ⚠️ | ✅ |
| **Cross Platform** | ✅ | ✅ | ⚠️ | ✅ |
| **Development Complexity** | Low | Medium | Medium | High |

## 🔧 Prerequisites by Platform

### General Requirements
- Node.js 18+
- npm or yarn
- Git

### Azure Deployment
- Azure account
- GitHub integration setup

### Desktop Package
- No additional requirements

### Microsoft Store  
- Microsoft Partner Center account
- Windows 10/11 for testing

### Mobile Apps
- **Android:** Android Studio, Java JDK 11+
- **iOS:** macOS, Xcode 14+, CocoaPods

## 📚 Documentation

Each deployment branch includes detailed README files:

- **Azure:** `AZURE_README.md`
- **Desktop:** `DESKTOP_README.md`  
- **Store:** `STORE_README.md`
- **Mobile:** `MOBILE_README.md`

## 🔄 Update Strategy

### For Multiple Platforms

1. **Develop in main branch**
2. **Test thoroughly**
3. **Merge to deployment branches**
4. **Build and deploy each platform**

### Automated CI/CD (Recommended)

Set up GitHub Actions for each branch:
- `azure-deployment`: Auto-deploy to Azure
- `desktop-package`: Build releases on tags
- `store-package`: Generate PWA packages
- `mobile-app`: Build APK/IPA files

## 🎯 Which Option Should You Choose?

### For Quick Sharing
➡️ **Azure Static Web Apps** - Fastest to deploy and share

### For Power Users  
➡️ **Desktop Application** - Full native experience

### For Windows Users
➡️ **Microsoft Store** - Easy discovery and installation

### For Mobile Users
➡️ **Mobile Apps** - Best mobile experience

### For Maximum Reach
➡️ **All Platforms** - Deploy to multiple platforms for widest audience

## 🚨 Important Notes

1. **Version Management:** Keep versions synchronized across branches
2. **Feature Parity:** Ensure core features work on all platforms
3. **Testing:** Test each platform before releasing
4. **Asset Management:** Each platform may need specific assets (icons, etc.)

## 💡 Quick Commands Reference

```bash
# Switch between deployment branches
git checkout azure-deployment
git checkout desktop-package  
git checkout store-package
git checkout mobile-app

# Build for each platform
npm run build              # Azure/Web
npm run electron:dist     # Desktop
npm run build:pwa         # Store
npm run build:mobile      # Mobile

# Development
npm run dev               # Web development
npm run electron:dev      # Desktop development  
npm run preview:pwa       # PWA preview
npm run mobile:serve      # Mobile development
```

## 🤝 Contributing

When contributing:
1. Make changes in `main` branch first
2. Test in web development mode
3. Merge to appropriate deployment branches
4. Test platform-specific builds
5. Update documentation as needed

## 📞 Support

- **Issues:** Create GitHub issues in this repository
- **Platform-Specific:** Check individual README files in each branch
- **General Questions:** Use GitHub Discussions

---

**Ready to deploy?** Choose your platform above and follow the branch-specific instructions! 🚀
