import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Mail, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MoreVertical 
} from 'lucide-react';

const initialUsers = [
  {
    id: 1,
    name: 'Emre Aksoy',
    email: 'emre.aksoy@btc.com.tr',
    role: 'Yönetici',
    roleColor: 'purple',
    facility: 'Tüm Tesisler',
    status: 'Aktif',
    lastLogin: '15.05.2025 10:12',
    twoFactor: true,
    initials: 'EA',
    department: 'Enerji & Sürdürülebilirlik Yönetimi',
    phone: '+90 (532) 456-7890',
    title: 'Kıdemli Enerji Müdürü',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: true,
      raporlar: true,
      alarmlar: true,
      cihazlar: true,
      ayarlar: true,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 2,
    name: 'Ayşe Yılmaz',
    email: 'ayse.yilmaz@btc.com.tr',
    role: 'Operatör',
    roleColor: 'blue',
    facility: 'Sahadağı TES',
    status: 'Aktif',
    lastLogin: '15.05.2025 09:58',
    twoFactor: true,
    initials: 'AY',
    department: 'Saha Operasyon',
    phone: '+90 (533) 123-4567',
    title: 'Saha Operatörü',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: false,
      raporlar: true,
      alarmlar: true,
      cihazlar: true,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet.kaya@btc.com.tr',
    role: 'Mühendis',
    roleColor: 'green',
    facility: 'Ceyhan TES',
    status: 'Aktif',
    lastLogin: '15.05.2025 09:42',
    twoFactor: true,
    initials: 'MK',
    department: 'Elektrik Mühendisliği',
    phone: '+90 (535) 987-6543',
    title: 'Elektrik Başmühendisi',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: true,
      raporlar: true,
      alarmlar: true,
      cihazlar: true,
      ayarlar: true,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 4,
    name: 'Selin Bayraktar',
    email: 'selin.bayraktar@btc.com.tr',
    role: 'Analist',
    roleColor: 'orange',
    facility: 'Tüm Tesisler',
    status: 'Aktif',
    lastLogin: '15.05.2025 08:31',
    twoFactor: false,
    initials: 'SB',
    department: 'Veri Analitiği & İş Zekası',
    phone: '+90 (536) 555-1234',
    title: 'Kıdemli Enerji Analisti',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: true,
      raporlar: true,
      alarmlar: false,
      cihazlar: false,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 5,
    name: 'Hakan Topçu',
    email: 'hakan.topcu@btc.com.tr',
    role: 'Operatör',
    roleColor: 'blue',
    facility: 'Güney Marmara TES',
    status: 'Aktif',
    lastLogin: '15.05.2025 08:05',
    twoFactor: true,
    initials: 'HT',
    department: 'Tesis Bakım',
    phone: '+90 (537) 444-9988',
    title: 'Bakım Teknikeri',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: false,
      sap: false,
      raporlar: true,
      alarmlar: true,
      cihazlar: true,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 6,
    name: 'Zeynep Zorlu',
    email: 'zeynep.zorlu@btc.com.tr',
    role: 'Görüntüleyici',
    roleColor: 'neutral',
    facility: 'Bakü-Tiflis-Ceyhan',
    status: 'Aktif',
    lastLogin: '14.05.2025 17:48',
    twoFactor: false,
    initials: 'ZZ',
    department: 'Genel Yönetim',
    phone: '+90 (538) 777-3322',
    title: 'İdari İşler Uzmanı',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: false,
      raporlar: true,
      alarmlar: false,
      cihazlar: false,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 7,
    name: 'Oğuzhan Güler',
    email: 'oguzhan.guler@btc.com.tr',
    role: 'Mühendis',
    roleColor: 'green',
    facility: 'Kırıkkale KGS',
    status: 'Aktif',
    lastLogin: '14.05.2025 16:22',
    twoFactor: true,
    initials: 'OG',
    department: 'Enerji Sistemleri',
    phone: '+90 (539) 222-1144',
    title: 'Sistem Mühendisi',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: true,
      raporlar: true,
      alarmlar: true,
      cihazlar: true,
      ayarlar: true,
      sistemLoglari: true,
      kullanicilar: false
    }
  },
  {
    id: 8,
    name: 'Burak Yıldırım',
    email: 'burak.yildirim@btc.com.tr',
    role: 'Operatör',
    roleColor: 'blue',
    facility: 'Aliağa TES',
    status: 'Pasif',
    lastLogin: '12.05.2025 14:11',
    twoFactor: false,
    initials: 'BY',
    department: 'Saha Destek',
    phone: '+90 (530) 888-6655',
    title: 'Saha Elemanı',
    permissions: {
      dashboard: true,
      canliVeri: false,
      kpi: false,
      sap: false,
      raporlar: false,
      alarmlar: false,
      cihazlar: false,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 9,
    name: 'İrem Duman',
    email: 'irem.duman@btc.com.tr',
    role: 'Analist',
    roleColor: 'orange',
    facility: 'Tüm Tesisler',
    status: 'Aktif',
    lastLogin: '12.05.2025 11:05',
    twoFactor: true,
    initials: 'ID',
    department: 'Raporlama Ekibi',
    phone: '+90 (531) 333-2211',
    title: 'Veri Analisti',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: true,
      sap: true,
      raporlar: true,
      alarmlar: false,
      cihazlar: false,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  },
  {
    id: 10,
    name: 'Tamer Çelik',
    email: 'tamer.celik@btc.com.tr',
    role: 'Görüntüleyici',
    roleColor: 'neutral',
    facility: 'Ceyhan TES',
    status: 'Aktif',
    lastLogin: '11.05.2025 10:33',
    twoFactor: false,
    initials: 'TC',
    department: 'Denetim & Uyum',
    phone: '+90 (534) 666-4433',
    title: 'İç Denetçi',
    permissions: {
      dashboard: true,
      canliVeri: true,
      kpi: false,
      sap: false,
      raporlar: true,
      alarmlar: false,
      cihazlar: false,
      ayarlar: false,
      sistemLoglari: false,
      kullanicilar: false
    }
  }
];

export default function KullanicilarView() {
  const { setActiveView, setSelectedUser, showNotification } = useTheme();
  const [users] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setActiveView('kullanici-detay');
  };

  const getRoleBadgeClass = (roleColor) => {
    switch (roleColor) {
      case 'purple': return 'badge-info';
      case 'blue': return 'badge-info';
      case 'green': return 'badge-success';
      case 'orange': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="module-view active">
      {/* Top 4 Metrics Summary Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Toplam Kullanıcı</span>
            <div className="metric-icon blue"><Users size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">48</span>
          </div>
          <div className="metric-subtext">Tüm sistemdeki kullanıcı sayısı</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Aktif Kullanıcı</span>
            <div className="metric-icon green"><UserCheck size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--success-text)' }}>36</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--success-text)', fontWeight: 600 }}>
            Son 30 günde giriş yapan
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Yönetici Rolü</span>
            <div className="metric-icon purple"><ShieldCheck size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">8</span>
          </div>
          <div className="metric-subtext">Yönetici yetkisine sahip kullanıcı</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Son Giriş</span>
            <div className="metric-icon orange"><Clock size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '24px' }}>10:12</span>
          </div>
          <div className="metric-subtext">15 May 2025</div>
        </div>
      </div>

      {/* Full-width User Table (col-span-12) */}
      <div className="card col-span-12">
        {/* Action Toolbar */}
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '12px' }}
              onClick={() => showNotification('Yeni Kullanıcı', 'Yeni kullanıcı kaydetme modülü açılıyor...', 'info')}
            >
              <Plus size={16} /> Yeni Kullanıcı
            </button>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '12px' }}
              onClick={() => showNotification('Davet Gönder', 'Toplu e-posta davet bağlantısı oluşturuldu.', 'info')}
            >
              <Mail size={15} /> Davet Gönder
            </button>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '12px' }}
              onClick={() => showNotification('Rol Atama', 'Toplu rol ve yetki matrisi düzenleme aracı açılıyor...', 'info')}
            >
              <UserPlus size={15} /> Rol Ata
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="copilot-input"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '32px', fontSize: '12px', width: '220px' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-muted)' }} />
            </div>

            <button className="btn btn-outline" style={{ padding: '7px 12px', fontSize: '12px' }}>
              <Filter size={14} /> Filtrele
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="table-responsive">
          <table className="custom-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Rol</th>
                <th>Tesis</th>
                <th>Durum</th>
                <th>Son Giriş</th>
                <th style={{ textAlign: 'center' }}>2FA</th>
                <th style={{ textAlign: 'center' }}>Detay &amp; İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="user-table-row"
                  onClick={() => handleOpenDetail(user)}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div 
                        className="user-avatar"
                        style={{ 
                          width: '34px', 
                          height: '34px', 
                          fontSize: '12px',
                          background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                          color: 'white',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block' }}>{user.name}</strong>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{user.title || 'Enerji Uzmanı'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{user.email}</td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(user.roleColor)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.facility}</td>
                  <td>
                    {user.status === 'Aktif' ? (
                      <span className="badge badge-success">● Aktif</span>
                    ) : (
                      <span className="badge badge-neutral">● Pasif</span>
                    )}
                  </td>
                  <td className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.lastLogin}</td>
                  <td style={{ textAlign: 'center' }}>
                    {user.twoFactor ? (
                      <CheckCircle2 size={16} color="var(--success-text)" style={{ display: 'inline' }} />
                    ) : (
                      <XCircle size={16} color="var(--danger-text)" style={{ display: 'inline' }} />
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                      <button 
                        className="btn btn-outline" 
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => handleOpenDetail(user)}
                      >
                        <Eye size={12} /> Detay
                      </button>
                      <button 
                        className="btn-icon" 
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => showNotification('Kullanıcı İşlemleri', `${user.name} için hızlı eylemler seçildi.`, 'info')}
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <span>Toplam {users.length} kayıt gösteriliyor</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>«</button>
            <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '11px' }}>1</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>2</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>3</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>4</button>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>5</button>
            <span>... 10</span>
            <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>»</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Sayfa başına</span>
            <select className="copilot-input" style={{ padding: '2px 6px', fontSize: '11px' }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
