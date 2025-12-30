# VIGIL OS Pro - Advanced Fraud Detection & Risk Monitoring Platform

> A comprehensive, real-time fraud detection and vendor risk monitoring dashboard designed for government procurement systems and financial institutions.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Product Overview

**FraudShield Pro** is an intelligent fraud detection platform that leverages advanced analytics and real-time monitoring to identify, investigate, and prevent fraudulent transactions in procurement systems. Built for compliance officers, fraud investigators, and risk management teams, it provides comprehensive insights into vendor behavior patterns, transaction anomalies, and emerging fraud risks.

### Key Capabilities

- **Real-Time Threat Detection** - Automatically identifies suspicious transactions and patterns as they occur
- **Vendor Intelligence** - Deep-dive analysis of vendor profiles, risk scores, and behavioral flags
- **Investigation Management** - Structured workflows for managing fraud investigations from detection to resolution
- **Risk Analytics** - Visual trend analysis and risk metrics dashboards with predictive insights
- **Watchlist Management** - Monitor high-risk vendors and suspicious activities
- **Simulation & Testing** - Test fraud detection rules and scenario planning tools
- **Transaction Stream Monitoring** - Live feed of transactions with instant risk assessment

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher
- [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 Core Features

### 1. **Dashboard & Analytics**
- Executive summary of fraud metrics and alerts
- Risk trend visualization with historical data
- Real-time transaction volume monitoring
- Key risk indicators and KPIs
- Department and regional fraud distribution

### 2. **Alert Management**
- Intelligent alert feed with risk prioritization
- Context-aware fraud detection rules
- One-click alert actions (legitimate, monitor, investigate)
- Alert filtering and search capabilities
- Alert history and resolution tracking

### 3. **Vendor Risk Profiling**
- Comprehensive vendor intelligence database
- Risk scoring algorithm with transparent flags
- Transaction history and patterns
- Related vendor network analysis
- Department engagement tracking
- Registration date and lifecycle monitoring

### 4. **Investigation Panel**
- Structured investigation workflow
- Evidence collection and documentation
- Investigation status tracking
- Timeline of suspicious activities
- Collaborative notes and findings
- Investigation closure reporting

### 5. **Watchlist Management**
- Create and manage vendor watchlists
- Risk-based priority settings
- Automated alerts for watchlist activity
- Bulk operations and batch monitoring
- Watchlist history and trend tracking

### 6. **Advanced Analytics**
- Risk trend charting with multiple metrics
- Comparative vendor analysis
- Fraud pattern identification
- Time-series analysis
- Regional and departmental breakdowns

### 7. **Simulation & Testing**
- Fraud detection rule testing
- Scenario planning tools
- Impact analysis simulations
- Rule optimization testing

---

## 🏗️ Project Architecture

```
src/
├── components/              # React UI components
│   ├── AlertFeed.tsx        # Alert notification system
│   ├── Header.tsx           # Application header
│   ├── InvestigationPanel.tsx # Investigation management
│   ├── RiskMetricsPanel.tsx # Risk metrics display
│   ├── RiskTrendChart.tsx   # Analytics charting
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── SimulationControls.tsx # Testing tools
│   ├── TransactionStream.tsx # Real-time transaction feed
│   ├── VendorProfileCard.tsx # Vendor details
│   ├── WatchlistPanel.tsx   # Watchlist management
│   └── ui/                  # shadcn/ui component library
├── pages/                   # Page components
│   ├── Index.tsx            # Main dashboard
│   └── NotFound.tsx         # 404 page
├── hooks/                   # React custom hooks
│   ├── use-mobile.tsx       # Mobile responsiveness
│   └── use-toast.ts         # Toast notifications
├── lib/                     # Utilities & helpers
│   ├── mockData.ts          # Sample data
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript definitions
│   └── audit.ts             # Domain types
└── App.tsx                  # Root component
```

### Data Models

**Alert**: Fraud risk alerts with severity and context
**Transaction**: Financial transactions with risk assessment
**Vendor**: Vendor profiles with risk scores and flags
**Investigation**: Fraud investigation cases and findings
**WatchlistItem**: Monitored vendors and suspicious patterns
**RiskMetrics**: Statistical risk indicators and trends

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### Styling & Components
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Radix UI** - Headless component primitives

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **React Router** - Client-side routing

### Utilities
- **date-fns** - Date manipulation and formatting
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications
- **next-themes** - Theme management

---

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build (optimized)
npm run build

# Development build with debug info
npm run build:dev

# Preview production build
npm run preview

# Lint code with ESLint
npm run lint
```

---

## 🔧 Configuration Files

- **vite.config.ts** - Vite bundler configuration
- **tsconfig.json** - TypeScript compiler settings
- **tailwind.config.ts** - Tailwind CSS customization
- **postcss.config.js** - CSS processing pipeline
- **eslint.config.js** - Code quality rules
- **components.json** - shadcn/ui configuration

---

## 👥 User Roles

- **Compliance Officer** - Monitor fraud metrics and trends
- **Fraud Investigator** - Investigate alerts and manage cases
- **Risk Manager** - Review watchlist and risk profiles
- **System Administrator** - Manage rules and configuration

---

## 🔐 Security Considerations

- Type-safe development with TypeScript
- Input validation on all forms
- Secure state management with React Query
- Accessible components following WCAG standards
- Environment-based configuration

---

## 📈 Performance Optimizations

- Code splitting with dynamic imports
- Lazy loading of components
- Query caching and deduplication
- CSS minification and purging
- Production bundle analysis

---

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and commit (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Development Workflow

### Working Locally with Your IDE

1. Clone the repository using the project's Git URL
2. Navigate to the project directory
3. Install dependencies with `npm install`
4. Start development server with `npm run dev`
5. Edit files and see changes instantly with hot reload

### Editing via GitHub

1. Navigate to the desired file
2. Click the Edit button (pencil icon)
3. Make your changes
4. Commit the changes directly

### Using GitHub Codespaces

1. Go to the main repository page
2. Click the "Code" button (green)
3. Select the "Codespaces" tab
4. Click "New codespace"
5. Edit files directly in the cloud environment
6. Commit and push when done

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors
Ensure TypeScript compilation passes:
```bash
npx tsc --noEmit
```

---

## 📞 Support & Contact

For issues, feature requests, or questions:
- Create an issue in the repository
- Contact the development team
- Review project documentation

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Made with ❤️ for fraud prevention and risk management**

