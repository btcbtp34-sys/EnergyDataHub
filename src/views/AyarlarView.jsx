import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Settings, 
  Network, 
  Tags, 
  Leaf, 
  Share2, 
  RefreshCw, 
  Palette, 
  Sliders, 
  Database, 
  Clock, 
  Gauge, 
  Bell, 
  Info, 
  Save, 
  Moon, 
  Sun,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function AyarlarView() {
  const { theme, setTheme } = useTheme();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="module-view active">
      {/* Top Header & Save Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>Platform &amp; Sistem Ayarları</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Arayüz teması, tarife birim fiyatları, emisyon katsayıları ve kurumsal entegrasyon parametreleri
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {saveSuccess && (
            <span style={{ fontSize: '13px', color: 'var(--success-text)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Ayarlar başarıyla kaydedildi!
            </span>
          )}
          <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '13px' }} onClick={handleSave}>
            <Save size={16} /> Tüm Ayarları Kaydet
          </button>
        </div>
      </div>

      {/* Main Spacious Settings Grid */}
      <div className="dashboard-grid">
        
        {/* CARD 1: Tema & Görünüm Tercihleri (col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Palette size={20} /> Arayüz Tema Tercihleri
            </div>
            <span className="badge badge-info" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Aktif Tema: {theme === 'light' ? 'Clean Light (Beyaz)' : (theme === 'dark' ? 'Executive Dark' : 'Cyber Yellow-Black')}
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Çalışma ortamınıza ve ışık şartlarınıza en uygun görsel temayı seçebilirsiniz. Değişiklik anında tüm modüllere uygulanır.
          </p>

          <div className="theme-selector-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '6px' }}>
            
            {/* Theme 1: Clean Light */}
            <div 
              className={`theme-card ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sun size={18} color="#eab308" /> Clean Light (Kurumsal Beyaz)
                </strong>
                {theme === 'light' && <CheckCircle2 size={18} color="var(--primary)" />}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>
                Yüksek kontrastlı, aydınlık ortamlara uygun, gözü yormayan beyaz ve mavi kurumsal SaaS teması.
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ffffff', border: '1px solid #cbd5e1' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2563eb' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #cbd5e1' }}></div>
              </div>
            </div>

            {/* Theme 2: Executive Dark */}
            <div 
              className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Moon size={18} color="#3b82f6" /> Executive Dark
                </strong>
                {theme === 'dark' && <CheckCircle2 size={18} color="var(--primary)" />}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>
                Kontrol merkezleri ve gece kullanımı için tasarlanmış derin koyu mavi ve cam efekti (glassmorphism) teması.
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#080c14', border: '1px solid #334155' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#121a2b', border: '1px solid #334155' }}></div>
              </div>
            </div>

            {/* Theme 3: Cyber Yellow-Black */}
            <div 
              className={`theme-card ${theme === 'yellow-black' ? 'active' : ''}`}
              onClick={() => setTheme('yellow-black')}
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#f59e0b" /> Cyber Yellow-Black
                </strong>
                {theme === 'yellow-black' && <CheckCircle2 size={18} color="var(--primary)" />}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '6px' }}>
                Yüksek görünürlüklü endüstriyel siyah ve sarı uyarı renk paleti.
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#050505', border: '1px solid #3f3f46' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#141414', border: '1px solid #3f3f46' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 2: Genel Sistem Ayarları (col-span-6) */}
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Settings size={18} /> Genel Sistem &amp; Bölgesel Ayarlar
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div>
              <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Zaman Dilimi (Timezone)
              </label>
              <select className="copilot-input" style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}>
                <option>Europe/Istanbul (UTC+03:00)</option>
                <option>UTC (Coordinated Universal Time)</option>
                <option>Europe/London (UTC+00:00)</option>
              </select>
            </div>

            <div>
              <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Sistem Dili (Language)
              </label>
              <select className="copilot-input" style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}>
                <option>Türkçe (Türkiye)</option>
                <option>English (United States)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Tarih Biçimi
                </label>
                <select className="copilot-input" style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}>
                  <option>15 May 2025 (dd MMM yyyy)</option>
                  <option>15/05/2025 (dd/MM/yyyy)</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Sayısal Ayraç
                </label>
                <select className="copilot-input" style={{ width: '100%', padding: '10px 14px', fontSize: '13px' }}>
                  <option>1.234,56 (Tr standart)</option>
                  <option>1,234.56 (US standart)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Canlı Veri Otomatik Yenileme</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Telemetri verilerinin polling sıklığı</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select className="copilot-input" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  <option>15 saniye</option>
                  <option>30 saniye</option>
                  <option>60 saniye</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Birim Fiyatlar & Tarife Parametreleri (col-span-6) */}
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Tags size={18} /> Birim Fiyatlar &amp; Tarife Ayarları
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div>
              <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Elektrik Birim Fiyatı
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="text" className="copilot-input" defaultValue="2,45" style={{ flex: 1, padding: '10px 14px', fontSize: '14px', fontWeight: 700 }} />
                <span className="badge badge-info" style={{ fontSize: '12px', padding: '10px 14px' }}>TL / kWh</span>
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Doğalgaz Birim Fiyatı
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="text" className="copilot-input" defaultValue="9,80" style={{ flex: 1, padding: '10px 14px', fontSize: '14px', fontWeight: 700 }} />
                <span className="badge badge-warning" style={{ fontSize: '12px', padding: '10px 14px' }}>TL / Sm³</span>
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Sebeke Suyu Birim Fiyatı
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="text" className="copilot-input" defaultValue="18,50" style={{ flex: 1, padding: '10px 14px', fontSize: '14px', fontWeight: 700 }} />
                <span className="badge badge-neutral" style={{ fontSize: '12px', padding: '10px 14px' }}>TL / m³</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--primary)" />
              <span>Tüm birim fiyatlar vergi (KDV ve TRT payı) hariç net maliyetler üzerinden hesaplanmaktadır.</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Sürdürülebilirlik & Karbon Emisyon Katsayıları (col-span-6) */}
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Leaf size={18} /> Sürdürülebilirlik &amp; Emisyon Katsayıları (ISO 14064)
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-card)' }}>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Kapsam 2: Elektrik Şebekesi Emisyonu</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Ulusal şebeke ortalama karbon faktörü</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="text" className="copilot-input" defaultValue="0,421" style={{ width: '80px', padding: '6px 10px', fontSize: '13px', textAlign: 'center', fontWeight: 700 }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>kg CO₂e/kWh</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-card)' }}>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Kapsam 1: Doğalgaz Yanma Emisyonu</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Doğalgaz yakılması sonucu oluşan emisyon</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="text" className="copilot-input" defaultValue="2,04" style={{ width: '80px', padding: '6px 10px', fontSize: '13px', textAlign: 'center', fontWeight: 700 }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>kg CO₂e/Sm³</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block' }}>Kapsam 1: Dizel / Yakıt Emisyonu</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Jeneratör ve tesis içi araç yakıtı</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="text" className="copilot-input" defaultValue="2,68" style={{ width: '80px', padding: '6px 10px', fontSize: '13px', textAlign: 'center', fontWeight: 700 }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>kg CO₂e/L</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Kurumsal SAP S/4HANA Entegrasyonu (col-span-6) */}
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Database size={18} /> SAP S/4HANA &amp; Veritabanı Bağlantısı
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>SAP Host IP / Sunucu</label>
                <input type="text" className="copilot-input" defaultValue="10.200.45.100" style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>System Client ID</label>
                <input type="text" className="copilot-input" defaultValue="100 (PRD)" style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>RFC Destination</label>
                <input type="text" className="copilot-input" defaultValue="SAP_BTC_ENERGY_RFC" style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Senkronizasyon Sıklığı</label>
                <select className="copilot-input" style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}>
                  <option>Her 15 Dakikada Bir</option>
                  <option>Saatlik Batch</option>
                  <option>Günlük 00:00</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-card)' }}>
              <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
                ● SAP Bağlantısı Sağlıklı (OK)
              </span>
              <button 
                className="btn btn-outline" 
                style={{ padding: '8px 16px', fontSize: '12px' }}
                onClick={() => showNotification('SAP Bağlantı Testi', 'SAP S/4HANA sunucusu ile RFC ping bağlantı testi yapıldı:\nBAŞARILI (24ms ping)', 'success')}
              >
                <RefreshCw size={14} /> Bağlantıyı Test Et
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
