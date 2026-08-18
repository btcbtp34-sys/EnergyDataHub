import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, 
  PieChart, 
  Activity, 
  Network, 
  TrendingUp, 
  AlertTriangle, 
  RefreshCw, 
  Bell, 
  Cpu, 
  Sliders, 
  Users 
} from 'lucide-react';

export default function Sidebar() {
  const { activeView, setActiveView } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
    { id: 'canli-veri', label: 'Canlı Veri', icon: Activity },
    { id: 'tek-hat', label: 'Tek Hat Şeması', icon: Network },
    { id: 'kpi', label: 'KPI Analizi', icon: TrendingUp },
    { id: 'anomaliler', label: 'Anomaliler', icon: AlertTriangle, badge: '5' },
    { id: 'sap', label: 'SAP & Raporlar', icon: RefreshCw },
    { id: 'alarmlar', label: 'Alarm Yönetimi', icon: Bell },
    { id: 'cihazlar', label: 'Cihazlar & Loglar', icon: Cpu },
    { id: 'ayarlar', label: 'Ayarlar', icon: Sliders },
    { id: 'kullanicilar', label: 'Kullanıcılar', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-container">
        <div className="brand-logo">
          <Zap size={20} />
        </div>
        <div className="brand-title">BTC <span>Energy Data Hub</span></div>
      </div>

      <div className="nav-section-title">Ana Menü</div>
      <nav className="nav-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <a
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className="status-dot"></span> Tüm Sistemler Çevrimiçi
        </div>
        <div style={{ fontSize: '11px', opacity: 0.6 }}>BTC Data Hub v2.4.1 (Enterprise)</div>
      </div>
    </aside>
  );
}
