import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const pageTitles = {
  'dashboard': 'Executive Dashboard',
  'canli-veri': 'Canlı Veri & Telemetri',
  'tek-hat': 'Tek Hat Şeması & Denge Kontrolü',
  'kpi': 'KPI Analizi & Korelasyon',
  'anomaliler': 'Anomali Merkezi & Kök Neden Analizi',
  'sap': 'SAP S/4HANA Entegrasyonu & Raporlar',
  'alarmlar': 'Alarm Yönetimi & Eskalasyon',
  'cihazlar': 'Saha Cihazları ve Sistem Logları',
  'ayarlar': 'Sistem Ayarları & Birim Fiyatlar',
  'kullanicilar': 'Kullanıcı Yönetimi & Rol Matrisi',
  'kullanici-detay': 'Kullanıcı Profil & Yetki Detayı'
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('btc_hub_theme') || 'light';
  });

  const [activeView, setActiveView] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState('');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('btc_hub_theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const openCopilotWithPrompt = (promptText) => {
    setCopilotInitialPrompt(promptText);
    setIsCopilotOpen(true);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      activeView,
      setActiveView,
      selectedUser,
      setSelectedUser,
      isCopilotOpen,
      setIsCopilotOpen,
      copilotInitialPrompt,
      setCopilotInitialPrompt,
      openCopilotWithPrompt,
      currentPageTitle: pageTitles[activeView] || 'Executive Dashboard'
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
