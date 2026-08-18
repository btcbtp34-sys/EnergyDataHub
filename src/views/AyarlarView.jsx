import React from 'react';
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
  FileText, 
  UserCheck, 
  Info, 
  RotateCcw, 
  Save, 
  Moon, 
  Zap, 
  Sun 
} from 'lucide-react';

export default function AyarlarView() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="module-view active">
      <div className="dashboard-grid">
        {/* Left & Middle Column (col-span-8) */}
        <div className="col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Genel Ayarlar */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><Settings size={16} /> Genel Ayarlar</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Zaman Dilimi</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>Europe/Istanbul (UTC+03:00)</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Dil</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>Türkçe</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Tarih Formatı</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>15 May 2025 (dd MMM yyyy)</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Sayı Formatı</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>1.234,56</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Otomatik Yenileme</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                    <select className="copilot-input" style={{ padding: '2px 4px', fontSize: '10px' }}><option>60</option></select> saniye
                  </div>
                </div>
              </div>
            </div>

            {/* Tesis Yapısı */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><Network size={16} /> Tesis Yapısı</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Tesis</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>Tüm Tesisler (4)</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Şebeke Yapısı</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>OG / AG</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Gerilim Seviyeleri</label>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }}>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>OG (34,5 kV) ×</span>
                    <span className="badge badge-info" style={{ fontSize: '10px' }}>AG (400 V) ×</span>
                  </div>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Varsayılan Görünüm</label>
                  <select className="copilot-input" style={{ padding: '4px 8px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>Şebeke / OG Giriş</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Birim Fiyatlar */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><Tags size={16} /> Birim Fiyatlar</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Elektrik Birim Fiyatı</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="2,45" style={{ padding: '4px 8px', fontSize: '11px', flex: 1 }} />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>TL/kWh</span>
                  </div>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Doğalgaz Birim Fiyatı</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="9,80" style={{ padding: '4px 8px', fontSize: '11px', flex: 1 }} />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>TL/Sm³</span>
                  </div>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Su Birim Fiyatı</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="18,50" style={{ padding: '4px 8px', fontSize: '11px', flex: 1 }} />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>TL/m³</span>
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={12} /> Fiyatlar KDV hariç girilmektedir.
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Emisyon Katsayıları */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><Leaf size={16} /> Emisyon Katsayıları</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CO₂ (Elektrik)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="0,421" style={{ padding: '3px 6px', fontSize: '11px', width: '60px' }} />
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>kg CO₂e/kWh</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CO₂ (Doğalgaz)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="2,04" style={{ padding: '3px 6px', fontSize: '11px', width: '60px' }} />
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>kg CO₂e/Sm³</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CO₂ (Yakıt)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="text" className="copilot-input" defaultValue="2,68" style={{ padding: '3px 6px', fontSize: '11px', width: '60px' }} />
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>kg CO₂e/L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sayaç Eşleştirme */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><Share2 size={16} /> Sayaç Eşleştirme</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Otomatik Eşleştirme</span>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Eşleştirme Eşiği</label>
                  <select className="copilot-input" style={{ padding: '3px 6px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>%5</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Eşleşme Kriterleri</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '4px', fontSize: '10px' }}>
                    <label><input type="checkbox" defaultChecked /> Sayaç ID</label>
                    <label><input type="checkbox" defaultChecked /> Lokasyon</label>
                    <label><input type="checkbox" defaultChecked /> Cihaz Tipi</label>
                    <label><input type="checkbox" /> Faz Bilgisi</label>
                  </div>
                </div>
              </div>
            </div>

            {/* SAP Bağlantısı */}
            <div className="card" style={{ padding: '16px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '13px' }}><RefreshCw size={16} /> SAP Bağlantısı</div>
                <span className="badge badge-success" style={{ fontSize: '9px' }}>● Bağlı</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>SAP Sistem</label>
                  <select className="copilot-input" style={{ padding: '3px 6px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>SAP_BOT (PRD)</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)' }}>Entegrasyon Tipi</label>
                  <select className="copilot-input" style={{ padding: '3px 6px', fontSize: '11px', width: '100%', marginTop: '2px' }}>
                    <option>IDoc</option>
                    <option>OData REST API</option>
                  </select>
                </div>
                <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '10px', width: '100%', marginTop: '4px' }} onClick={() => alert('SAP Bağlantı Testi Başarılı!')}>
                  <RefreshCw size={12} /> Bağlantı Test Et
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Theme Selector Card */}
          <div className="card" style={{ padding: '16px' }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}><Palette size={16} /> Arayüz Tema Seçenekleri</div>
            </div>
            <div className="theme-selector-grid" style={{ marginTop: '4px' }}>
              <div 
                className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Moon size={14} /> Executive Dark
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Siber mavi ve mor ışılamalı modern karanlık tema.</div>
              </div>

              <div 
                className={`theme-card ${theme === 'yellow-black' ? 'active' : ''}`}
                onClick={() => setTheme('yellow-black')}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} /> Siyah - Sarı (Cyber Gold)
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Yüksek kontrastlı siber siyah ve altın sarısı endüstriyel tema.</div>
              </div>

              <div 
                className={`theme-card ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sun size={14} /> Beyaz (Clean Light)
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Aydınlık ve yüksek okunabilirlikte kurumsal beyaz tema.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Panel */}
        <div className="card col-span-4" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <div className="card-title" style={{ fontSize: '15px' }}><Sliders size={18} /> Aktif Konfigürasyon Özeti</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><Database size={14} /> Veri Kaynağı</strong>
                  <span style={{ color: 'var(--success-text)' }}>Tüm sistemler bağlı</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Son Veri Zamanı</strong>
                <span style={{ color: 'var(--text-muted)' }}>15 May 2025 10:23:58</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><Gauge size={14} /> Sayaçlar</strong>
                  <span style={{ color: 'var(--text-muted)' }}>128 / 128</span>
                </div>
                <span style={{ color: 'var(--success-text)', fontWeight: 700 }}>Eşleştirilmiş</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={14} /> Alarmlar</strong>
                  <span style={{ color: 'var(--danger-text)', fontWeight: 700 }}>3 aktif</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><RefreshCw size={14} /> SAP Bağlantısı</strong>
                  <span style={{ color: 'var(--success-text)', fontWeight: 700 }}>Bağlı</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={14} /> Raporlar</strong>
                <span style={{ color: 'var(--text-muted)' }}>4 şablon aktif</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '8px' }}>
                <strong style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}><UserCheck size={14} /> Son Kaydedilme</strong>
                <span style={{ color: 'var(--text-muted)' }}>14 May 2025 16:45:12</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--info-bg)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '12px', fontSize: '11px', color: 'var(--info-text)', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} /> Ayarlar otomatik olarak kaydedilmez. Değişikliklerinizi kaydetmeyi unutmayın.
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="col-span-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '16px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-card)' }}>
          <button className="btn btn-outline" style={{ fontSize: '12px' }} onClick={() => alert('Ayarlar varsayılan değerlere sıfırlandı.')}>
            <RotateCcw size={14} /> Varsayılanlara Dön
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-outline" style={{ fontSize: '12px' }}>İptal</button>
            <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => alert('Tüm ayarlar başarıyla kaydedildi!')}>
              <Save size={14} /> Kaydet
            </button>
            <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--purple, #8b5cf6), #6d28d9)', fontSize: '12px' }} onClick={() => alert('Tüm haberleşme ve SAP bağlantıları test edildi: BAŞARILI ✓')}>
              <Network size={14} /> Tüm Bağlantıları Test Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
