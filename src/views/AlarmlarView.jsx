import React from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';

export default function AlarmlarView() {
  return (
    <div className="module-view active">
      <div className="card col-span-12">
        <div className="card-header">
          <div className="card-title"><Bell size={18} /> Alarm Kuralları ve Eskalasyon Adımları</div>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Kural Adı</th>
                <th>Kaynak</th>
                <th>Eşik Değeri</th>
                <th>Öncelik</th>
                <th>Bildirim Kanalı</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trafo-1 Yağ Sıcaklığı Yüksek</td>
                <td>TRAFO-1</td>
                <td className="mono">&gt; 80 °C</td>
                <td><span className="badge badge-danger">YÜKSEK</span></td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} /> E-Posta, <MessageSquare size={14} /> SMS
                  </span>
                </td>
                <td><span className="badge badge-success">AKTİF</span></td>
              </tr>
              <tr>
                <td>OG Hücresi Kapak Açık</td>
                <td>OG-HÜCRE-2</td>
                <td className="mono">Açık Sinyali</td>
                <td><span className="badge badge-warning">ORTA</span></td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} /> E-Posta
                  </span>
                </td>
                <td><span className="badge badge-success">AKTİF</span></td>
              </tr>
              <tr>
                <td>Kompresör-2 Titreşim Yüksek</td>
                <td>KOMPRESÖR-2</td>
                <td className="mono">&gt; 6.0 mm/s</td>
                <td><span className="badge badge-danger">YÜKSEK</span></td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} /> E-Posta, <MessageSquare size={14} /> SMS
                  </span>
                </td>
                <td><span className="badge badge-success">AKTİF</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
