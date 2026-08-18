import React from 'react';
import { FolderOpen, Skull, Banknote, CheckCircle, ListChecks, Brain, Sparkles } from 'lucide-react';

export default function AnomalilerView() {
  const triggerAnomalyAction = () => {
    alert('Otomatik Aksiyon Planı Oluşturuldu!\n\n1. Hat-2 Saha Teknisyenine SMS ve e-posta bildirimi gönderildi.\n2. Kalibrasyon iş emri SAP S/4HANA PM modülüne iletildi.');
  };

  return (
    <div className="module-view active">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Açık Anomali</span><div className="metric-icon blue"><FolderOpen size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">12</span> <span className="metric-unit">adet</span></div>
          <div className="metric-subtext">Dün: 9</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Kritik Anomali</span><div className="metric-icon red"><Skull size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--danger-text)' }}>3</span> <span className="metric-unit">adet</span></div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)' }}>Acil müdahale gerekir</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Tahmini Aylık Finansal Kayıp</span><div className="metric-icon orange"><Banknote size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--warning-text)' }}>₺1,284,500</span></div>
          <div className="metric-subtext">Finansal etki simülasyonu</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Kapanan Anomali</span><div className="metric-icon green"><CheckCircle size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">18</span> <span className="metric-unit">son 7 gün</span></div>
          <div className="metric-subtext">Çözüm oranı %85</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card col-span-8">
          <div className="card-header">
            <div className="card-title"><ListChecks size={18} /> Önceliklendirilmiş Anomali Listesi</div>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Öncelik</th>
                  <th>Anomali Tanımı</th>
                  <th>Kaynak</th>
                  <th>Etki (₺/ay)</th>
                  <th>Olası Neden</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'var(--danger-bg)' }}>
                  <td><span className="badge badge-danger">KRİTİK</span></td>
                  <td><strong>Hat-2 Doğalgaz Yoğunluğu Yüksek</strong></td>
                  <td>Hat-2 Gaz Analizörü</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 800 }}>₺217,800 / ay</td>
                  <td>Kalibrasyon sapması / Vana arızası</td>
                  <td><span className="badge badge-danger">AÇIK</span></td>
                </tr>
                <tr style={{ background: 'var(--danger-bg)' }}>
                  <td><span className="badge badge-danger">KRİTİK</span></td>
                  <td><strong>Kompresör-2 Basınç Düşük</strong></td>
                  <td>Kompresör-2</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 800 }}>₺148,300 / ay</td>
                  <td>Hava kaçağı / Vana arızası</td>
                  <td><span className="badge badge-danger">AÇIK</span></td>
                </tr>
                <tr>
                  <td><span className="badge badge-warning">ORTA</span></td>
                  <td>Fırın-1 Sıcaklık Uyarı Seviyesinde</td>
                  <td>Fırın-1 Sıcaklık Sensörü</td>
                  <td className="mono">₺96,400 / ay</td>
                  <td>Yanma ayarı bozukluğu</td>
                  <td><span className="badge badge-warning">İNCELENİYOR</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><Brain size={18} /> Kök Neden Analizi</div>
          </div>
          <div style={{ fontSize: '13px' }}>
            <div style={{ fontWeight: 700, color: 'var(--danger-text)', marginBottom: '8px' }}>Hat-2 Doğalgaz Yoğunluğu Yüksek</div>
            <div style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>ID: ANOM-2025-0515-001 | 15.05.2025 09:21</div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>Sensör Kalibrasyon Sapması</span>
                <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>%55</span>
              </div>
              <div style={{ width: '100%', background: 'var(--bg-input)', height: '8px', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '55%', background: 'var(--danger)', height: '100%' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>Sensör Yaşlanması</span>
                <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>%25</span>
              </div>
              <div style={{ width: '100%', background: 'var(--bg-input)', height: '8px', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '25%', background: 'var(--warning)', height: '100%' }}></div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }} onClick={triggerAnomalyAction}>
              <Sparkles size={16} /> Otomatik Aksiyon Planı Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
