# Ledger Live Desktop UI

A fully-featured, pixel-perfect desktop application UI inspired by the Ledger Live Desktop App, built with React + TailwindCSS and designed for Electron or Tauri integration.

## 🚀 Features

### ✅ Complete Screen Implementation
- **Dashboard/Portfolio**: Portfolio overview with interactive charts, account cards, and recent transactions
- **Accounts**: Comprehensive account management with search, filtering, and detailed account information
- **Send**: Complete send flow with asset selection, recipient input, amount selection, and fee options
- **Receive**: QR code generation, address management, and payment request functionality
- **Manager**: Ledger device app management with installation/uninstallation capabilities
- **Settings**: Comprehensive settings panel with security, preferences, and account management

### ✅ Modern Design System
- **Dark Theme**: Professional dark theme with carefully crafted color palette
- **Neon Accents**: Cyan, green, and purple neon accent colors for modern appeal
- **Glassmorphism**: Subtle glass effects with backdrop blur and transparency
- **Neumorphism**: Soft shadow effects for depth and modern aesthetics
- **Material Design**: Clean, modern interface following Material Design principles

### ✅ Advanced UI Components
- **Interactive Charts**: Portfolio performance charts with Recharts integration
- **Account Cards**: Beautiful cryptocurrency account cards with hover effects
- **Transaction Items**: Detailed transaction history with status indicators
- **Navigation Sidebar**: Fixed sidebar with active state indicators and device status
- **Form Components**: Advanced form inputs with validation and interactive elements

### ✅ Responsive Layout
- **Desktop Optimized**: Minimum width of 1440px as specified
- **Fixed Sidebar**: 264px fixed sidebar with main content area of 1176px minimum
- **Grid Layouts**: Responsive grid systems for optimal content organization
- **Smooth Animations**: Page transitions and hover effects throughout

### ✅ Mock Data Integration
- **Realistic Content**: Comprehensive mock data for all screens and components
- **Portfolio Data**: Historical chart data and performance metrics
- **Account Information**: Multiple cryptocurrency accounts with balances and addresses
- **Transaction History**: Detailed transaction records with various statuses
- **Device Management**: Ledger device apps and storage management

## 🛠 Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server
- **Recharts**: Beautiful and composable charts for React
- **Lucide Icons**: Modern icon library with consistent design
- **shadcn/ui**: High-quality UI components built on Radix UI

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Quick Start
```bash
# Navigate to project directory
cd ledger-live-desktop

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Open browser to http://localhost:5173
```

### Build for Production
```bash
# Build for production
npm run build
# or
pnpm build

# Preview production build
npm run preview
# or
pnpm preview
```

## 🖥 Electron Integration

To integrate with Electron for desktop app deployment:

1. Install Electron dependencies:
```bash
npm install --save-dev electron electron-builder
```

2. Add Electron main process file (`public/electron.js`):
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1440,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

3. Update `package.json`:
```json
{
  "main": "public/electron.js",
  "scripts": {
    "electron": "electron .",
    "electron-dev": "ELECTRON_IS_DEV=true electron .",
    "build-electron": "npm run build && electron-builder"
  }
}
```

## 🦀 Tauri Integration

To integrate with Tauri for Rust-based desktop app:

1. Install Tauri CLI:
```bash
npm install --save-dev @tauri-apps/cli
```

2. Initialize Tauri:
```bash
npx tauri init
```

3. Configure `src-tauri/tauri.conf.json`:
```json
{
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "devPath": "http://localhost:5173",
    "distDir": "../dist"
  },
  "tauri": {
    "windows": [{
      "title": "Ledger Live Desktop",
      "width": 1440,
      "height": 900,
      "minWidth": 1440,
      "minHeight": 900,
      "resizable": true
    }]
  }
}
```

4. Run Tauri development:
```bash
npx tauri dev
```

## 📁 Project Structure

```
ledger-live-desktop/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Layout/        # Layout components (Sidebar, MainLayout)
│   │   ├── Screens/       # Main application screens
│   │   └── UI/            # Reusable UI components
│   ├── data/              # Mock data and constants
│   ├── lib/               # Utility functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles and theme
│   └── main.jsx           # Application entry point
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a0a0b` (Deep black)
- **Card**: `#111113` (Dark gray)
- **Border**: `#27272a` (Medium gray)
- **Primary**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Purple**: `#8b5cf6` (Purple accent)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good contrast
- **Code**: Monospace for addresses and hashes

### Spacing & Layout
- **Sidebar Width**: 264px fixed
- **Content Padding**: 24px (1.5rem)
- **Card Padding**: 24px (1.5rem)
- **Border Radius**: 12px default, 16px for cards
- **Grid Gaps**: 16px (1rem) and 24px (1.5rem)

## 🔧 Customization

### Adding New Screens
1. Create new component in `src/components/Screens/`
2. Add route to `App.jsx` switch statement
3. Add navigation item to `Sidebar.jsx`

### Modifying Theme
- Update CSS variables in `src/App.css`
- Modify TailwindCSS configuration if needed
- Update component color classes

### Adding New Components
- Follow existing component structure
- Use TailwindCSS utility classes
- Implement proper hover and focus states
- Add animations using custom CSS classes

## 📱 Features Implemented

### Dashboard
- Portfolio value display with 24h change
- Interactive portfolio chart with time range selection
- Account summary cards with hover effects
- Recent transaction list with status indicators
- Quick stats cards with key metrics

### Accounts
- Comprehensive account table with sorting
- Search and filter functionality
- Account balance and change indicators
- Send/Receive action buttons
- Address display with truncation

### Send
- Asset selection dropdown
- Recipient address input with QR scanner
- Amount input with percentage shortcuts
- Network fee selection with time estimates
- Form validation and error handling

### Receive
- QR code generation for addresses
- Address copying functionality
- Asset selection for different cryptocurrencies
- Payment request amount specification
- Address management and generation

### Manager
- Device connection status
- Storage usage visualization
- Installed apps management
- Available apps catalog
- Install/uninstall functionality

### Settings
- Theme and appearance settings
- Security and privacy options
- Notification preferences
- Account management tools
- App information display

## 🚀 Production Deployment

The application is ready for production deployment with:
- Optimized build output
- Minified CSS and JavaScript
- Tree-shaken dependencies
- Responsive design for desktop
- Cross-browser compatibility

## 📄 License

This project is created as a UI demonstration and is not affiliated with Ledger SAS. All design inspiration is credited to the original Ledger Live application.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding proper state management (Redux, Zustand)
- Implementing real API integration
- Adding comprehensive testing
- Setting up proper error boundaries
- Implementing accessibility features
- Adding internationalization support

---

**Note**: This is a UI-only implementation with mock data. For a production application, you would need to integrate with actual Ledger hardware APIs and cryptocurrency networks.

