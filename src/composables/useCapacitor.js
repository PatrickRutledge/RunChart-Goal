import { ref, onMounted } from 'vue'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { Share } from '@capacitor/share'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

export function useCapacitor() {
  const isNative = ref(false)
  const platform = ref('')

  onMounted(() => {
    isNative.value = Capacitor.isNativePlatform()
    platform.value = Capacitor.getPlatform()

    if (isNative.value) {
      initializeApp()
    }
  })

  async function initializeApp() {
    try {
      // Hide splash screen
      await SplashScreen.hide()

      // Set status bar style
      if (Capacitor.isPluginAvailable('StatusBar')) {
        await StatusBar.setStyle({ style: Style.Dark })
      }
    } catch (error) {
      console.warn('Error initializing app:', error)
    }
  }

  async function shareChart(title, data) {
    if (!Capacitor.isPluginAvailable('Share')) {
      // Fallback to Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: 'Check out my run chart data',
            url: window.location.href
          })
          return true
        } catch (error) {
          console.warn('Web share failed:', error)
          return false
        }
      }
      return false
    }

    try {
      await Share.share({
        title: title,
        text: data,
        dialogTitle: 'Share your run chart'
      })
      return true
    } catch (error) {
      console.warn('Native share failed:', error)
      return false
    }
  }

  async function saveChartData(filename, data) {
    if (!Capacitor.isPluginAvailable('Filesystem')) {
      // Fallback to download
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      return true
    }

    try {
      await Filesystem.writeFile({
        path: filename,
        data: data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      })
      return true
    } catch (error) {
      console.warn('File save failed:', error)
      return false
    }
  }

  async function vibrate(style = ImpactStyle.Light) {
    if (Capacitor.isPluginAvailable('Haptics')) {
      try {
        await Haptics.impact({ style })
      } catch (error) {
        console.warn('Haptics failed:', error)
      }
    }
  }

  async function getDeviceInfo() {
    if (!isNative.value) {
      return {
        platform: 'web',
        model: 'Browser',
        osVersion: navigator.userAgent
      }
    }

    try {
      const { Device } = await import('@capacitor/device')
      const info = await Device.getInfo()
      return info
    } catch (error) {
      console.warn('Device info failed:', error)
      return null
    }
  }

  return {
    isNative,
    platform,
    shareChart,
    saveChartData,
    vibrate,
    getDeviceInfo
  }
}
