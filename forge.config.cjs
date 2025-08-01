const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseVersion, FuseV1Options } = require('@electron/fuses');
const path = require('path');
const fs = require('fs');

module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: ['./dist'],
    name: 'Ledger Live Desktop',
    executableName: 'ledger-live-desktop',
    appBundleId: 'com.yourcompany.ledgerlivedesktop',
    appVersion: '1.0.0',
    buildVersion: '1.0.0',
    icon: './assets/icon' // DO NOT include .ico or .icns extension
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        name: 'ledger-live-desktop',
        authors: 'Your Name',
        description: 'Ledger Live Desktop is a React-based desktop app powered by Electron and Vite.',
        exe: 'ledger-live-desktop.exe',
        setupExe: 'LedgerLiveDesktopSetup.exe',
        setupIcon: './assets/icon.ico',
        loadingGif: './assets/loading.gif',
        noMsi: true
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      fuses: {
        [FuseV1Options.RunAsNode]: false,
        [FuseV1Options.EnableCookieEncryption]: true,
        [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
        [FuseV1Options.EnableNodeCliInspectArguments]: false,
        [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
        [FuseV1Options.OnlyLoadAppFromAsar]: true,
      }
    }),
  ],
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      console.log('Running packageAfterCopy hook...');
      const distPath = path.join(buildPath, 'dist');
      if (!fs.existsSync(distPath)) {
        console.warn('⚠️  Warning: dist folder not found at:', distPath);
      } else {
        console.log('✅ dist folder found.');
      }
    }
  }
};
