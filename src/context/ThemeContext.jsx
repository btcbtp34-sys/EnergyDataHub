import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

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
  const [notificationModal, setNotificationModal] = useState(null);

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

  const showNotification = (title, message, type = 'success') => {
    setNotificationModal({ title, message, type });
  };

  const closeNotification = () => {
    setNotificationModal(null);
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
      showNotification,
      currentPageTitle: pageTitles[activeView] || 'Executive Dashboard'
    }}>
      {children}

      {/* Global Glassmorphic Notification Pop-Up Modal */}
      {notificationModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
              <div className="card-title" style={{ fontSize: '15px' }}>
                {notificationModal.type === 'success' && <CheckCircle2 size={18} color="var(--success-text)" />}
                {notificationModal.type === 'warning' && <AlertTriangle size={18} color="var(--warning-text)" />}
                {notificationModal.type === 'info' && <Info size={18} color="var(--primary)" />}
                {notificationModal.title}
              </div>
              <button className="btn-close-copilot" onClick={closeNotification}><X size={18} /></button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6', whiteSpace: 'pre-line', marginTop: '12px' }}>
              {notificationModal.message}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
              <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '12px' }} onClick={closeNotification}>
                Anladım / Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
