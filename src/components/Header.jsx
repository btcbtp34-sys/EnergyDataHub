import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Clock, Sparkles, Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const notificationsList = [
  { id: 1, type: 'danger', title: 'Hat-2 Doğalgaz Anomali Riski', time: '10 dk önce', desc: 'Hat-2 doğalgaz debisinde %32 aşım. Tahmini finansal etki: ₺217.800/ay.' },
  { id: 2, type: 'warning', title: 'Kompresör-2 Hava Kaçağı', time: '25 dk önce', desc: 'Basınç 4,1 bar seviyesine geriledi. Hat sızdırmazlık kontrolü gerekli.' },
  { id: 3, type: 'success', title: 'SAP S/4HANA Entegrasyonu', time: '45 dk önce', desc: '12.842 adet telemetri ve malzeme kaydı SAP sistemine aktarıldı.' },
  { id: 4, type: 'info', title: 'ISO 50001 Verimlilik Hedefi', time: '1 saat önce', desc: 'Aylık enerji yoğunluğu hedefin %2,1 altında seyrediyor.' },
  { id: 5, type: 'warning', title: 'Trafo-1 Sıcaklık Limit Uyarısı', time: '2 saat önce', desc: 'Sıcaklık 78°C seviyesine ulaştı. Fan soğutma sistemi devreye alındı.' }
];

export default function Header() {
  const { currentPageTitle, theme } = useTheme();
  const [timeStr, setTimeStr] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const isLight = theme === 'light';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
      const time = now.toLocaleTimeString('tr-TR');
      setTimeStr(`${date} ${time}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'danger': return <AlertCircle size={15} color="var(--danger-text)" />;
      case 'warning': return <AlertTriangle size={15} color="var(--warning-text)" />;
      case 'success': return <CheckCircle2 size={15} color="var(--success-text)" />;
      default: return <Info size={15} color="var(--primary)" />;
    }
  };

  return (
    <header className="top-header" style={{ position: 'relative' }}>
      <div className="header-left">
        <h1 className="page-title">{currentPageTitle}</h1>
      </div>
      <div className="header-right">
        <span className="badge-live">CANLI TELEMETRİ</span>
        <div className="time-display">
          <Clock size={15} />
          <span>{timeStr}</span>
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div 
            className="btn-icon" 
            title="Bildirimler"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ cursor: 'pointer' }}
          >
            <Bell size={18} />
            <span className="badge">{notificationsList.length}</span>
          </div>

          {showNotifications && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '360px',
                background: isLight ? '#ffffff' : 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                zIndex: 1000,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={16} color="var(--primary)" /> Son Bildirimler ({notificationsList.length})
                </div>
                <button className="btn-close-copilot" onClick={() => setShowNotifications(false)}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto' }}>
                {notificationsList.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      background: isLight ? '#f8fafc' : 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      gap: '10px'
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>{getBadgeIcon(item.type)}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '12.5px', color: 'var(--text-main)' }}>{item.title}</strong>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.time}</span>
                      </div>
                      <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Tüm Bildirimleri Okundu İşaretle
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="user-avatar">HK</div>
          <div className="user-info">
            <span className="user-name">Hasan Cavit Koçak</span>
            <span className="user-role">Enerji Yöneticisi</span>
          </div>
        </div>
      </div>
    </header>
  );
}
