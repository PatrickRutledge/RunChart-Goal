# Mobile App Package

This branch is configured to build Run Chart as native iOS and Android applications using Capacitor.

## Prerequisites

### For Android Development
- **Android Studio** - Latest version
- **Java JDK 11+** - Required for Android builds
- **Android SDK** - API level 33+ recommended

### For iOS Development (macOS only)
- **Xcode 14+** - Latest version from App Store
- **iOS 13+** - Minimum supported version
- **CocoaPods** - `sudo gem install cocoapods`

## Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Web Assets
```bash
npm run build:mobile
```

### 3. Platform-Specific Setup

#### Android
```bash
# Open Android Studio
npm run mobile:android

# Or run directly on device/emulator
npm run mobile:run:android
```

#### iOS (macOS only)
```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Open Xcode
npm run mobile:ios

# Or run directly on device/simulator
npm run mobile:run:ios
```

## Mobile Features

### Native Capabilities
✅ **Native UI** - Native navigation and controls  
✅ **Offline Support** - Full offline functionality  
✅ **File System** - Save/load chart data locally  
✅ **Native Sharing** - Share charts via system share sheet  
✅ **Haptic Feedback** - Touch feedback on interactions  
✅ **Status Bar Control** - Themed status bar  
✅ **Splash Screen** - Branded app loading screen  
✅ **Device Info** - Access device specifications  

### Mobile-Optimized UI
- **Touch-Friendly** - Large tap targets and gestures
- **Responsive Design** - Optimized for phone and tablet
- **Dark Mode** - Follows system theme preference
- **Portrait/Landscape** - Supports both orientations
- **Safe Area** - Respects device notches and home indicators

## Building for Release

### Android Release Build

1. **Generate Signing Key** (first time only):
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Signing** in `android/app/build.gradle`:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('my-release-key.keystore')
               storePassword 'password'
               keyAlias 'my-key-alias'
               keyPassword 'password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Build APK/Bundle**:
   ```bash
   cd android
   ./gradlew assembleRelease
   # or for Play Store
   ./gradlew bundleRelease
   ```

### iOS Release Build

1. **Configure Code Signing** in Xcode:
   - Select your development team
   - Choose distribution certificate
   - Set bundle identifier

2. **Archive for Distribution**:
   - Product → Archive in Xcode
   - Upload to App Store Connect
   - Submit for review

## App Store Guidelines

### Android (Google Play)
- **Target API Level**: 33+ (Android 13)
- **App Bundle**: Required for new apps
- **64-bit Support**: Required
- **Privacy Policy**: Required if collecting data
- **Content Rating**: Complete questionnaire

### iOS (App Store)
- **iOS Version**: 13.0+ minimum
- **App Store Guidelines**: Follow all guidelines
- **Privacy Nutrition Labels**: Required
- **TestFlight**: Use for beta testing

## Mobile-Specific Configuration

### Android Permissions
Configure in `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### iOS Permissions  
Configure in `ios/App/App/Info.plist`:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>To save chart images to your photo library</string>
```

## Testing

### Development Testing
```bash
# Live reload on device
npm run mobile:serve

# Test on Android emulator
npm run mobile:run:android

# Test on iOS simulator  
npm run mobile:run:ios
```

### Performance Testing
- Test on various device specs
- Monitor memory usage
- Check battery impact
- Verify offline functionality

## Distribution

### Internal Testing
- **Android**: Use internal testing in Play Console
- **iOS**: Use TestFlight for beta testing

### Store Release
1. **Prepare Assets**:
   - App icons (multiple sizes)
   - Screenshots (various devices)
   - Store descriptions
   - Feature graphics

2. **Upload Builds**:
   - Google Play Console (Android)
   - App Store Connect (iOS)

3. **Review Process**:
   - Both stores review apps before release
   - Address any feedback promptly
   - Monitor store ratings and reviews

## Maintenance

### Updating the App
1. Update web code in `src/`
2. Run `npm run build:mobile`
3. Test on both platforms
4. Increment version in `package.json`
5. Build and upload new releases

### Plugin Updates
```bash
# Update Capacitor and plugins
npm update @capacitor/core @capacitor/cli
npx cap sync
```

## Troubleshooting

### Common Android Issues
- **Gradle sync fails**: Check Java version and Android SDK
- **App crashes**: Check device logs with `adb logcat`
- **Permissions denied**: Update AndroidManifest.xml

### Common iOS Issues  
- **Build fails**: Check Xcode version and iOS SDK
- **CocoaPods errors**: Run `pod install` in ios/ directory
- **Signing issues**: Verify certificates in Xcode

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/)
- [iOS Developer Guide](https://developer.apple.com/ios/)
- [Google Play Console](https://play.google.com/console/)
- [App Store Connect](https://appstoreconnect.apple.com/)
