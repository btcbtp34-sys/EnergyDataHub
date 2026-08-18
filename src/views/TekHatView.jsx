import React from 'react';
import { Table, CheckCircle, AlertTriangle, AlertCircle, Weight, Wrench, Zap } from 'lucide-react';

export default function TekHatView() {
  return (
    <div className="module-view active">
      <div className="dashboard-grid">
        <div className="card col-span-8">
          <div className="card-header">
            <div className="card-title"><Table size={18} /> Sayaç Hiyerarşisi ve Denge İzleme</div>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Sayaç / Denge Grubu</th>
                  <th>Ana Sayaç Değeri</th>
                  <th>Alt Sayaçlar Toplamı</th>
                  <th>Fark (kWh)</th>
                  <th>Fark Oranı (%)</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>M01 ≈ M02 + M03</strong> (Şebeke - Trafolar)</td>
                  <td className="mono">10,420 kWh</td>
                  <td className="mono">10,190 kWh</td>
                  <td className="mono">230 kWh</td>
                  <td className="mono trend-down">%2.21</td>
                  <td><span className="badge badge-success"><CheckCircle size={12} /> DENGEDE</span></td>
                </tr>
                <tr>
                  <td><strong>M04 ≈ M05..M09</strong> (Ana AG - Panolar)</td>
                  <td className="mono">9,860 kWh</td>
                  <td className="mono">9,940 kWh</td>
                  <td className="mono">-80 kWh</td>
                  <td className="mono trend-down">-%0.81</td>
                  <td><span className="badge badge-warning"><AlertTriangle size={12} /> UYARI</span></td>
                </tr>
                <tr>
                  <td><strong>M05 ≈ M10 + M11 + M12</strong> (Üretim Panosu)</td>
                  <td className="mono">5,210 kWh</td>
                  <td className="mono">4,520 kWh</td>
                  <td className="mono">690 kWh</td>
                  <td className="mono trend-up">%13.24</td>
                  <td><span className="badge badge-danger"><AlertCircle size={12} /> ALARM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><Wrench size={18} /> Denge Sapması Olası Nedenleri</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
              <strong style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Weight size={16} /> 1. Ölçülmeyen Yükler:
              </strong>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Sayaç kapsamı dışında kalan lokal yükler fark oluşturabilir.</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
              <strong style={{ color: 'var(--warning-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wrench size={16} /> 2. Sayaç Hatası & Kalibrasyon:
              </strong>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Sayaç kalibrasyon kayması veya sensör arızası.</div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-card-hover)', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
              <strong style={{ color: 'var(--danger-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} /> 3. Akım Trafosu Oranı:
              </strong>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>CT dönüştürme oranı uyuşmazlığı.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
