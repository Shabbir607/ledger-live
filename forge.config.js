const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    // Include the dist folder in the packaged app
    extraResource: [
      './dist'
    ],
    // App metadata
    name: 'Ledger Live Desktop',
    executableName: 'ledger-live-desktop',
    appBundleId: 'com.yourcompany.ledgerlivedesktop',
    appVersion: '1.0.0',
    buildVersion: '1.0.0',
    // Icon configuration (optional - will use default if not found)
    icon: './assets/icon' // Electron Forge will add the appropriate extension
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        // Windows-specific configuration for Squirrel installer
        name: 'ledger-live-desktop',
        authors: 'Your Name',
        description: 'Ledger Live Desktop is a React-based desktop app powered by Electron and Vite.',
        exe: 'ledger-live-desktop.exe',
        setupExe: 'LedgerLiveDesktopSetup.exe',
        setupIcon: './assets/icon.ico', // Optional
        loadingGif: './assets/loading.gif', // Optional
        noMsi: true // Only create .exe, not .msi
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  // Build hooks to ensure React app is built before packaging
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      console.log('Package after copy hook - ensuring dist folder exists');
      const fs = require('fs');
      const distPath = path.join(buildPath, 'dist');
      if (!fs.existsSync(distPath)) {
        console.warn('Warning: dist folder not found in build path');
      }
    }
  }
};
