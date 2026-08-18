import React from 'react';
import { Clock, CheckCircle2, XCircle, Link, FileText, Download } from 'lucide-react';

export default function SapView() {
  const downloadReport = (reportName) => {
    alert(`${reportName} başarıyla yüksek çözünürlüklü PDF formatında indirildi!`);
  };

  return (
    <div className="module-view active">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Son SAP Aktarımı</span><div className="metric-icon blue"><Clock size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">10:22</span></div>
          <div className="metric-subtext">Başarılı</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Başarılı Kayıt</span><div className="metric-icon green"><CheckCircle2 size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--success-text)' }}>12.842</span></div>
          <div className="metric-subtext">Bugün (%98.6)</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Hatalı Kayıt</span><div className="metric-icon red"><XCircle size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--danger-text)' }}>178</span></div>
          <div className="metric-subtext">Kuyrukta yeniden deneniyor</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title"><Link size={18} /> SAP Veri Eşleştirme (Mapping)</div>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Veri Eşleştirme Alanı</th>
                  <th>SAP Alan Adı</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Üretim Emri</td>
                  <td className="mono">AUFNR - Üretim Emri</td>
                  <td><span className="badge badge-success">● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td>Ürün Kodu</td>
                  <td className="mono">MATNR - Malzeme Numarası</td>
                  <td><span className="badge badge-success">● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td>Maliyet Merkezi</td>
                  <td className="mono">KOSTL - Maliyet Merkezi</td>
                  <td><span className="badge badge-success">● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td>Teknik Lokasyon</td>
                  <td className="mono">ILOCK - Teknik Lokasyon</td>
                  <td><span className="badge badge-success">● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td>Miktar (Ton)</td>
                  <td className="mono">GAMNG - Miktar (Ton)</td>
                  <td><span className="badge badge-success">● Eşleştirildi</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title"><FileText size={18} /> Kurumsal Hazır Raporlar</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>Günlük Enerji Raporu</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>Günlük tüketim ve maliyet özeti.</div>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '6px 10px', width: '100%' }} onClick={() => downloadReport('Günlük Enerji Raporu')}>
                <Download size={14} /> İndir (PDF)
              </button>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>Aylık KPI Raporu</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>Hedef sapmaları ve performans.</div>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '6px 10px', width: '100%' }} onClick={() => downloadReport('Aylık KPI Raporu')}>
                <Download size={14} /> İndir (PDF)
              </button>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>CO₂ Emisyon Raporu</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>ISO 14064 / GHG Protocol.</div>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '6px 10px', width: '100%' }} onClick={() => downloadReport('CO2 Emisyon Raporu')}>
                <Download size={14} /> İndir (PDF)
              </button>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>Anomali Raporu</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>Tespit edilen sapma ve aksiyonlar.</div>
              <button className="btn btn-outline" style={{ fontSize: '11px', padding: '6px 10px', width: '100%' }} onClick={() => downloadReport('Anomali Raporu')}>
                <Download size={14} /> İndir (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
