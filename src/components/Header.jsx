import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Clock, Sparkles, Bell } from 'lucide-react';

export default function Header() {
  const { currentPageTitle, setIsCopilotOpen } = useTheme();
  const [timeStr, setTimeStr] = useState('');

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

  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="page-title">{currentPageTitle}</h1>
      </div>
      <div className="header-right">
        <span className="badge-live">CANLI TELEMETRİ</span>
        <div className="time-display">
          <Clock size={15} />
          <span>{timeStr}</span>
        </div>

        <div className="btn-icon" title="Bildirimler">
          <Bell size={18} />
          <span className="badge">3</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar">EY</div>
          <div className="user-info">
            <span className="user-name">Enerji Yöneticisi</span>
            <span className="user-role">Sistem Yöneticisi</span>
          </div>
        </div>
      </div>
    </header>
  );
}
