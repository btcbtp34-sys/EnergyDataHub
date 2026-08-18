import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowLeft, 
  Save, 
  Key, 
  ShieldAlert, 
  Building, 
  Smartphone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PieChart, 
  Activity, 
  TrendingUp, 
  RefreshCw, 
  FileText, 
  Bell, 
  Cpu, 
  Sliders, 
  FileCode, 
  Users, 
  ShieldCheck,
  Lock,
  Globe
} from 'lucide-react';

export default function KullaniciDetayView() {
  const { setActiveView, selectedUser } = useTheme();

  // Fallback user if none selected
  const user = selectedUser || {
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
  };

  const [activeTab, setActiveTab] = useState('permissions');
  const [permissions, setPermissions] = useState(user.permissions || {
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
  });

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="module-view active">
      {/* Top Navigation & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn btn-outline" 
            style={{ fontSize: '12px', padding: '8px 14px' }}
            onClick={() => setActiveView('kullanicilar')}
          >
            <ArrowLeft size={16} /> Kullanıcı Listesine Dön
          </button>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Kullanıcı Yönetimi / <strong style={{ color: 'var(--text-main)' }}>{user.name} Detayı</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ fontSize: '12px' }} onClick={() => showNotification('Şifre Sıfırlama', `${user.name} kullanıcısına şifre sıfırlama e-postası gönderildi.`, 'info')}>
            <Key size={14} /> Şifre Sıfırla
          </button>
          <button className="btn btn-outline" style={{ fontSize: '12px', color: 'var(--danger-text)', borderColor: 'rgba(239, 68, 68, 0.3)' }} onClick={() => showNotification('Hesap Donduruldu', `${user.name} kullanıcısının hesabı pasif duruma alındı.`, 'warning')}>
            <ShieldAlert size={14} /> Hesabı Dondur
          </button>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => showNotification('Değişiklikler Kaydedildi', `${user.name} kullanıcısının tüm modül izinleri ve profil değişiklikleri başarıyla kaydedildi!`, 'success')}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </div>

      {/* User Header Profile Banner */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div 
              className="user-avatar" 
              style={{ 
                width: '64px', 
                height: '64px', 
                fontSize: '22px', 
                boxShadow: '0 0 20px var(--primary-glow)' 
              }}
            >
              {user.initials || 'EA'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>{user.name}</h2>
                <span className="badge badge-info">{user.role || 'Yönetici'}</span>
                {user.status === 'Aktif' ? (
                  <span className="badge badge-success">● Aktif</span>
                ) : (
                  <span className="badge badge-neutral">● Pasif</span>
                )}
              </div>
              <div className="mono" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {user.email}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px', flexWrap: 'wrap' }}>
                <span><Building size={14} style={{ display: 'inline', marginRight: '4px' }} /> {user.department || 'Enerji & Sürdürülebilirlik'}</span>
                <span>📍 {user.facility || 'Tüm Tesisler'}</span>
                <span>💼 {user.title || 'Enerji Yöneticisi'}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-input)', padding: '12px 18px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Son Giriş</div>
              <div className="mono" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{user.lastLogin || '15.05.2025 10:12'}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-card)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>2FA Durumu</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: user.twoFactor ? 'var(--success-text)' : 'var(--danger-text)', marginTop: '2px' }}>
                {user.twoFactor ? 'Etkin ✓' : 'Kapalı ✗'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-card)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Erişim Derecesi</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', marginTop: '2px' }}>Seviye 4 (Yüksek)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
        <button
          className={`tab-pill-btn ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          <ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px' }} /> Modül Yetkileri &amp; İzinler
        </button>

        <button
          className={`tab-pill-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          <Users size={16} style={{ display: 'inline', marginRight: '6px' }} /> Profil &amp; İletişim Bilgileri
        </button>

        <button
          className={`tab-pill-btn ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          <Lock size={16} style={{ display: 'inline', marginRight: '6px' }} /> Güvenlik &amp; Oturum Logları
        </button>
      </div>

      {/* TAB 1: Modül Yetkileri & İzinler Grid */}
      {activeTab === 'permissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>Modül Bazlı İzin Matrisi</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Kullanıcının sistemdeki modüllere erişim ve işlem yapma yetkilerini yönetin.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => {
                const allOn = {};
                Object.keys(permissions).forEach(k => allOn[k] = true);
                setPermissions(allOn);
              }}>Tümünü Aç</button>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '5px 10px' }} onClick={() => {
                const allOff = {};
                Object.keys(permissions).forEach(k => allOff[k] = false);
                setPermissions(allOff);
              }}>Tümünü Kapat</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
            {[
              { key: 'dashboard', title: 'Executive Dashboard', desc: 'Ana özet metrikleri ve genel tesis grafiklerini görüntüleme', icon: PieChart },
              { key: 'canliVeri', title: 'Canlı Veri & Telemetri', desc: 'Şebeke tek hat şeması ve anlık sayaç güç akışlarını takip etme', icon: Activity },
              { key: 'kpi', title: 'KPI Analizi & Korelasyon', desc: 'Spesifik enerji tüketimi ve üretim korelasyon grafiklerini inceleme', icon: TrendingUp },
              { key: 'sap', title: 'SAP S/4HANA Entegrasyonu', desc: 'SAP veri aktarım durumları ve kurumsal PDF raporları indirme', icon: RefreshCw },
              { key: 'raporlar', title: 'Raporlama Merkezi', desc: 'ISO 50001 ve ISO 14064 kurumsal rapor çıktıları oluşturma', icon: FileText },
              { key: 'alarmlar', title: 'Alarm Yönetimi & Eskalasyon', desc: 'Kritik alarm eşiklerini değiştirme ve eskalasyon kurallarını yönetme', icon: Bell },
              { key: 'cihazlar', title: 'Saha Cihazları & Loglar', desc: 'Modbus/MQTT ağ geçitlerini denetleme ve haberleşme parametrelerini düzenleme', icon: Cpu },
              { key: 'ayarlar', title: 'Sistem Ayarları & Birim Fiyatlar', desc: 'Tarife birim fiyatlarını (TL/kWh) ve arayüz temalarını değiştirme', icon: Sliders },
              { key: 'sistemLoglari', title: 'Sistem Etkinlik Logları', desc: 'Tüm sistem olaylarını ve kullanıcı giriş kayıtlarını denetleme', icon: FileCode },
              { key: 'kullanicilar', title: 'Kullanıcı & Rol Yönetimi', desc: 'Yeni kullanıcı ekleme, rol atama ve izin matrislerini düzenleme', icon: Users }
            ].map((item) => {
              const Icon = item.icon;
              const isEnabled = !!permissions[item.key];
              return (
                <div 
                  key={item.key}
                  className="card"
                  style={{ 
                    padding: '18px',
                    borderColor: isEnabled ? 'var(--primary-glow)' : 'var(--border-card)',
                    background: isEnabled ? 'var(--bg-card)' : 'var(--bg-app)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="metric-icon blue" style={{ width: '36px', height: '36px' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '14px', color: 'var(--text-main)', display: 'block' }}>{item.title}</strong>
                        <span style={{ fontSize: '10px', color: isEnabled ? 'var(--success-text)' : 'var(--text-dim)', fontWeight: 600 }}>
                          {isEnabled ? '● Erişim İzni Var' : '○ Erişim Engellendi'}
                        </span>
                      </div>
                    </div>

                    <label className="switch-toggle">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => togglePermission(item.key)}
                      />
                      <span className="switch-slider"></span>
                    </label>
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-card)', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>İzin Seviyesi:</span>
                    <select className="copilot-input" disabled={!isEnabled} style={{ padding: '3px 8px', fontSize: '11px', width: 'auto' }}>
                      <option>Tam Yetki (CRUD)</option>
                      <option>Sadece Okuma (Read-Only)</option>
                      <option>Düzenleme (Write-Only)</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Profil & İletişim Bilgileri */}
      {activeTab === 'info' && (
        <div className="dashboard-grid">
          <div className="card col-span-8">
            <div className="card-header">
              <div className="card-title">Profil ve Kurumsal İletişim Bilgileri</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Ad Soyad</label>
                <input type="text" className="copilot-input" defaultValue={user.name} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>E-Posta Adresi</label>
                <input type="text" className="copilot-input" defaultValue={user.email} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Departman</label>
                <input type="text" className="copilot-input" defaultValue={user.department || 'Enerji & Sürdürülebilirlik'} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Unvan</label>
                <input type="text" className="copilot-input" defaultValue={user.title || 'Enerji Yöneticisi'} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Telefon Numarası</label>
                <input type="text" className="copilot-input" defaultValue={user.phone || '+90 (532) 456-7890'} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Atanan Tesis</label>
                <select className="copilot-input" style={{ width: '100%' }}>
                  <option>{user.facility || 'Tüm Tesisler'}</option>
                  <option>Sahadağı TES</option>
                  <option>Ceyhan TES</option>
                  <option>Güney Marmara TES</option>
                  <option>Kırıkkale KGS</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card col-span-4">
            <div className="card-header">
              <div className="card-title">Hesap Güvenlik Ayarları</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'block' }}>İki Faktörlü Doğrulama (2FA)</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>SMS veya Authenticator uygulaması</span>
                </div>
                <input type="checkbox" defaultChecked={user.twoFactor} style={{ accentColor: 'var(--primary)' }} />
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '10px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Parola İlkesi</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Son parola değiştirilme: 45 gün önce</span>
              </div>

              <button className="btn btn-outline" style={{ width: '100%', marginTop: '8px' }} onClick={() => showNotification('Şifre Yenileme', `${user.name} kullanıcısına şifre yenileme e-postası iletildi.`, 'info')}>
                <Key size={14} /> Şifre Yenileme E-Postası Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Güvenlik & Oturum Logları */}
      {activeTab === 'logs' && (
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><Clock size={18} /> Kullanıcı Oturum ve Etkinlik Geçmişi</div>
          </div>
          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Tarih / Saat</th>
                  <th>İşlem Tipi</th>
                  <th>IP Adresi</th>
                  <th>Cihaz / Tarayıcı</th>
                  <th>Lokasyon</th>
                  <th>Sonuç</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">15.05.2025 10:12:44</td>
                  <td>Sisteme Giriş (Login)</td>
                  <td className="mono">192.168.1.104</td>
                  <td>Chrome 124.0 (Windows 11)</td>
                  <td>İstanbul / Türkiye</td>
                  <td><span className="badge badge-success">● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">15.05.2025 09:30:12</td>
                  <td>Rapor İndirme (ISO 50001 PDF)</td>
                  <td className="mono">192.168.1.104</td>
                  <td>Chrome 124.0 (Windows 11)</td>
                  <td>İstanbul / Türkiye</td>
                  <td><span className="badge badge-success">● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">14.05.2025 16:45:00</td>
                  <td>Ayarlar Değiştirildi (Birim Fiyat)</td>
                  <td className="mono">192.168.1.104</td>
                  <td>Chrome 124.0 (Windows 11)</td>
                  <td>İstanbul / Türkiye</td>
                  <td><span className="badge badge-success">● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">12.05.2025 08:15:22</td>
                  <td>Hatalı Parola Denemesi</td>
                  <td className="mono">192.168.1.104</td>
                  <td>Chrome 124.0 (Windows 11)</td>
                  <td>İstanbul / Türkiye</td>
                  <td><span className="badge badge-danger">● Başarısız</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
