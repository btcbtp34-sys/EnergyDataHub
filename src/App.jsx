import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CopilotDrawer from './components/CopilotDrawer';
import CopilotFAB from './components/CopilotFAB';

import DashboardView from './views/DashboardView';
import CanliVeriView from './views/CanliVeriView';
import TekHatView from './views/TekHatView';
import KpiView from './views/KpiView';
import AnomalilerView from './views/AnomalilerView';
import SapView from './views/SapView';
import AlarmlarView from './views/AlarmlarView';
import CihazlarView from './views/CihazlarView';
import AyarlarView from './views/AyarlarView';
import KullanicilarView from './views/KullanicilarView';
import KullaniciDetayView from './views/KullaniciDetayView';

function AppContent() {
  const { activeView } = useTheme();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'canli-veri':
        return <CanliVeriView />;
      case 'tek-hat':
        return <TekHatView />;
      case 'kpi':
        return <KpiView />;
      case 'anomaliler':
        return <AnomalilerView />;
      case 'sap':
        return <SapView />;
      case 'alarmlar':
        return <AlarmlarView />;
      case 'cihazlar':
        return <CihazlarView />;
      case 'ayarlar':
        return <AyarlarView />;
      case 'kullanicilar':
        return <KullanicilarView />;
      case 'kullanici-detay':
        return <KullaniciDetayView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div id="app">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="content-body">
          {renderActiveView()}
        </main>
      </div>
      <CopilotDrawer />
      <CopilotFAB />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
