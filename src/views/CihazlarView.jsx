import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { 
  Box, 
  Wifi, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Search, 
  Filter, 
  Eye, 
  LineChart as LineChartIcon, 
  Settings as SettingsIcon, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  Activity,
  RefreshCw,
  Gauge,
  X,
  Save,
  Server,
  Sliders,
  Radio,
  FileText,
  TrendingUp
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const devicesList = [
  { id: 'M01', name: 'M01 OG Ölçüm Cihazı', location: 'Ana AG Pano', protocol: 'Modbus TCP', address: '192.168.10.10:502', status: 'Çevrimiçi', quality: 100, calibDate: '02.03.2025', activePower: '1,25 MW', voltage: '34,5 kV', current: '20,6 A', frequency: '50,02 Hz', model: 'PM8000', vendor: 'Schneider Electric' },
  { id: 'M02', name: 'M02 Trafo-1 Ölçüm Cihazı', location: 'Trafo-1', protocol: 'Modbus TCP', address: '192.168.10.11:502', status: 'Çevrimiçi', quality: 99, calibDate: '15.02.2025', activePower: '620 kW', voltage: '0,4 kV', current: '895 A', frequency: '50,01 Hz', model: 'PAC3200', vendor: 'Siemens' },
  { id: 'M03', name: 'M03 Trafo-2 Ölçüm Cihazı', location: 'Trafo-2', protocol: 'Modbus TCP', address: '192.168.10.12:502', status: 'Çevrimiçi', quality: 100, calibDate: '12.03.2025', activePower: '590 kW', voltage: '0,4 kV', current: '850 A', frequency: '49,99 Hz', model: 'PAC3200', vendor: 'Siemens' },
  { id: 'M04', name: 'M04 Ana AG Koruma Rölesi', location: 'Ana AG Pano', protocol: 'IEC 61850', address: '192.168.10.13:102', status: 'Çevrimiçi', quality: 100, calibDate: '05.04.2025', activePower: '1,21 MW', voltage: '0,4 kV', current: '1745 A', frequency: '50,00 Hz', model: 'SIPROTEC 5', vendor: 'Siemens' },
  { id: 'M05', name: 'M05 Üretim Pano Ölçüm', location: 'Üretim Panosu', protocol: 'Modbus TCP', address: '192.168.20.10:502', status: 'Uyarı', quality: 86, calibDate: '10.02.2025', activePower: '540 kW', voltage: '0,39 kV', current: '780 A', frequency: '49,98 Hz', model: 'EM6400', vendor: 'Schneider Electric' },
  { id: 'M06', name: 'M06 Fırın-1 Enerji Analizörü', location: 'Fırın Panosu', protocol: 'Modbus TCP', address: '192.168.20.11:502', status: 'Çevrimiçi', quality: 98, calibDate: '28.02.2025', activePower: '280 kW', voltage: '0,4 kV', current: '405 A', frequency: '50,01 Hz', model: 'PM5500', vendor: 'Schneider Electric' },
  { id: 'M07', name: 'M07 Kompresör-1 Ölçüm', location: 'Kompresör Odası', protocol: 'Modbus TCP', address: '192.168.20.21:502', status: 'Çevrimiçi', quality: 100, calibDate: '18.03.2025', activePower: '145 kW', voltage: '0,4 kV', current: '210 A', frequency: '50,00 Hz', model: 'DIRIS A-40', vendor: 'Socomec' },
  { id: 'M08', name: 'M08 HVAC Ölçüm Cihazı', location: 'Yardımcı Tesisler', protocol: 'Modbus TCP', address: '192.168.30.10:502', status: 'Uyarı', quality: 82, calibDate: '07.02.2025', activePower: '110 kW', voltage: '0,38 kV', current: '160 A', frequency: '49,95 Hz', model: 'DIRIS A-20', vendor: 'Socomec' }
];

export default function CihazlarView() {
  const { theme } = useTheme();
  const [selectedDevice, setSelectedDevice] = useState(devicesList[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'details', 'charts', 'settings', or null

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const filteredDevices = devicesList.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Chart Data for selected device
  const chartData = {
    labels: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30'],
    datasets: [
      {
        label: `${selectedDevice.name} Telemetri Çekiş Trendi`,
        data: [1.12, 1.15, 1.18, 1.25, 1.22, 1.24, 1.25],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  return (
    <div className="module-view active">
      {/* Metrics Header Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Toplam Cihaz</span><div className="metric-icon blue"><Box size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">154</span></div>
          <div className="metric-subtext">Tüm lokasyonlarda</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Çevrimiçi Cihaz</span><div className="metric-icon green"><Wifi size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--success-text)' }}>147</span></div>
          <div className="metric-subtext" style={{ color: 'var(--success-text)', fontWeight: 700 }}>%95,5 çevrimiçi</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Uyarıdaki Cihaz</span><div className="metric-icon orange"><AlertTriangle size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--warning-text)' }}>4</span></div>
          <div className="metric-subtext" style={{ color: 'var(--warning-text)', fontWeight: 700 }}>%2,6 uyarı</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Son Veri Zamanı</span><div className="metric-icon purple"><Clock size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ fontSize: '24px' }}>10:24:30</span></div>
          <div className="metric-subtext">15 May 2025</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Cihazlar List Table */}
        <div className="card col-span-7">
          <div className="card-header">
            <div className="card-title"><Cpu size={18} /> Cihazlar</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="copilot-input" 
                placeholder="Cihaz adı ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '12px', width: '160px' }} 
              />
              <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }}><Search size={14} /></button>
              <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }}><Filter size={14} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Cihaz Adı</th>
                  <th>Lokasyon</th>
                  <th>Protokol</th>
                  <th>IP / Modbus Adresi</th>
                  <th>Durum</th>
                  <th>Veri Kalitesi</th>
                  <th>Kalibrasyon Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => {
                  const isSelected = device.id === selectedDevice.id;
                  return (
                    <tr 
                      key={device.id} 
                      style={{ 
                        background: isSelected ? 'var(--primary-light)' : undefined, 
                        cursor: 'pointer' 
                      }}
                      onClick={() => setSelectedDevice(device)}
                    >
                      <td>
                        <strong>
                          <Box size={14} color="var(--primary)" style={{ display: 'inline', marginRight: '6px' }} />
                          {device.name}
                        </strong>
                      </td>
                      <td>{device.location}</td>
                      <td className="mono">{device.protocol}</td>
                      <td className="mono">{device.address}</td>
                      <td>
                        {device.status === 'Çevrimiçi' ? (
                          <span className="badge badge-success">● Çevrimiçi</span>
                        ) : (
                          <span className="badge badge-warning">● Uyarı</span>
                        )}
                      </td>
                      <td className="mono" style={{ color: device.quality > 90 ? 'var(--success-text)' : 'var(--warning-text)', fontWeight: 800 }}>
                        <Radio size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        %{device.quality}
                      </td>
                      <td>{device.calibDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
            <span>Toplam {devicesList.length} cihaz kayıtlı</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>«</button>
              <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '11px' }}>1</button>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>2</button>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>»</button>
            </div>
          </div>
        </div>

        {/* Selected Device Inspector Panel */}
        <div className="card col-span-5">
          <div className="card-header">
            <div className="card-title">Seçili Cihaz: {selectedDevice.name}</div>
            <span className={`badge ${selectedDevice.status === 'Çevrimiçi' ? 'badge-success' : 'badge-warning'}`}>
              ● {selectedDevice.status}
            </span>
          </div>

          {/* 4 Live Telemetry Tiles with Pure Lucide Icons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--primary)' }}><Zap size={20} /></div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Aktif Güç</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedDevice.activePower}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--warning-text)' }}><Gauge size={20} /></div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Gerilim (Ortalama)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedDevice.voltage}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--purple-text)' }}><Activity size={20} /></div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Akım (Ortalama)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedDevice.current}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--success-text)' }}><RefreshCw size={20} /></div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Frekans</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedDevice.frequency}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', marginTop: '6px' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Bağlantı Bilgileri</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Protokol:</span><span style={{ color: 'var(--text-main)' }}>{selectedDevice.protocol}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>IP Adresi:</span><span style={{ color: 'var(--text-main)' }}>{selectedDevice.address}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Veri Kalitesi:</span><span style={{ color: 'var(--success-text)', fontWeight: 700 }}>%{selectedDevice.quality}</span></div>
            </div>

            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>Cihaz Bilgileri</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Üretici:</span><span style={{ color: 'var(--text-main)' }}>{selectedDevice.vendor}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Model:</span><span style={{ color: 'var(--text-main)' }}>{selectedDevice.model}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Kalibrasyon:</span><span style={{ color: 'var(--text-main)' }}>{selectedDevice.calibDate}</span></div>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px' }} onClick={() => setActiveModal('details')}>
              <Eye size={14} /> Detaylar
            </button>
            <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px' }} onClick={() => setActiveModal('charts')}>
              <LineChartIcon size={14} /> Grafikler
            </button>
            <button className="btn btn-outline" style={{ flex: 1, fontSize: '11px' }} onClick={() => setActiveModal('settings')}>
              <SettingsIcon size={14} /> Ayarlar
            </button>
          </div>
        </div>

        {/* System Event Logs Panel */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><Clock size={18} /> Sistem Logları</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-success">● Normal</span>
              <span className="badge badge-warning">● Uyarı</span>
              <span className="badge badge-danger">● Alarm</span>
              <input type="text" className="copilot-input" placeholder="Tarih aralığı..." style={{ padding: '5px 10px', fontSize: '12px', width: '160px', marginLeft: '12px' }} />
              <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '12px' }}><Filter size={14} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Tarih / Saat</th>
                  <th>Modül</th>
                  <th>Olay</th>
                  <th>Seviye</th>
                  <th>Kullanıcı / Cihaz</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">15.05.2025 10:24:28</td>
                  <td>Cihaz Yönetimi</td>
                  <td>M01 OG Ölçüm Cihazı bağlantısı yeniden sağlandı.</td>
                  <td><span className="badge badge-success">● Normal</span></td>
                  <td>Sistem</td>
                  <td><span style={{ color: 'var(--success-text)', fontWeight: 700 }}><CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} /> Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">15.05.2025 10:21:43</td>
                  <td>Veri Toplama</td>
                  <td>M05 Üretim Pano Ölçüm cihazından veri gecikmesi tespit edildi.</td>
                  <td><span className="badge badge-warning">● Uyarı</span></td>
                  <td>Sistem</td>
                  <td><span style={{ color: 'var(--warning-text)', fontWeight: 700 }}><AlertCircle size={13} style={{ display: 'inline', marginRight: '4px' }} /> Açık</span></td>
                </tr>
                <tr>
                  <td className="mono">15.05.2025 10:18:07</td>
                  <td>Alarm Yönetimi</td>
                  <td>Trafo-1 sıcaklık alarmı (85°C) oluştu.</td>
                  <td><span className="badge badge-danger">● Alarm</span></td>
                  <td>M02 Trafo-1 Ölçüm Cihazı</td>
                  <td><span style={{ color: 'var(--danger-text)', fontWeight: 700 }}><AlertCircle size={13} style={{ display: 'inline', marginRight: '4px' }} /> Açık</span></td>
                </tr>
                <tr>
                  <td className="mono">15.05.2025 10:15:32</td>
                  <td>Kullanıcı Yönetimi</td>
                  <td>Enerji Yöneticisi kullanıcısı oturum açtı.</td>
                  <td><span className="badge badge-success">● Normal</span></td>
                  <td>Enerji Yöneticisi</td>
                  <td><span style={{ color: 'var(--success-text)', fontWeight: 700 }}><CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} /> Başarılı</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================== MODAL 1: DETAYLAR MODAL ==================== */}
      {activeModal === 'details' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '640px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
              <div className="card-title" style={{ fontSize: '16px' }}>
                <Server size={18} /> {selectedDevice.name} - Teknik Detaylar &amp; Registerlar
              </div>
              <button className="btn-close-copilot" onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px', fontSize: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'var(--bg-card-hover)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Modbus Adresi</span>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '14px' }}>{selectedDevice.address}</strong>
                </div>
                <div style={{ background: 'var(--bg-card-hover)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Bağlantı Kalitesi</span>
                  <strong style={{ display: 'block', color: 'var(--success-text)', fontSize: '14px' }}>%{selectedDevice.quality}</strong>
                </div>
                <div style={{ background: 'var(--bg-card-hover)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Model &amp; Sürüm</span>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '14px' }}>{selectedDevice.model} (v2.3)</strong>
                </div>
              </div>

              <strong style={{ color: 'var(--text-main)', fontSize: '13px' }}>Canlı Modbus Register Okumaları</strong>
              <div className="table-responsive">
                <table className="custom-table" style={{ fontSize: '11px' }}>
                  <thead>
                    <tr>
                      <th>Register (Hex)</th>
                      <th>Parametre</th>
                      <th>Değer</th>
                      <th>Birim</th>
                      <th>Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="mono">0x3001 (40001)</td>
                      <td>Aktif Güç (L1-L3 Total)</td>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedDevice.activePower}</td>
                      <td>MW</td>
                      <td>Float32</td>
                    </tr>
                    <tr>
                      <td className="mono">0x3003 (40003)</td>
                      <td>Gerilim L1-N</td>
                      <td className="mono">{selectedDevice.voltage}</td>
                      <td>kV</td>
                      <td>Float32</td>
                    </tr>
                    <tr>
                      <td className="mono">0x3005 (40005)</td>
                      <td>Akım Ortalama</td>
                      <td className="mono">{selectedDevice.current}</td>
                      <td>A</td>
                      <td>Float32</td>
                    </tr>
                    <tr>
                      <td className="mono">0x3007 (40007)</td>
                      <td>Şebeke Frekansı</td>
                      <td className="mono">{selectedDevice.frequency}</td>
                      <td>Hz</td>
                      <td>Float32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
              <button className="btn btn-outline" onClick={() => setActiveModal(null)}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: GRAFİKLER MODAL ==================== */}
      {activeModal === 'charts' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '720px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
              <div className="card-title" style={{ fontSize: '16px' }}>
                <TrendingUp size={18} /> {selectedDevice.name} - Telemetri Trendi
              </div>
              <button className="btn-close-copilot" onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>

            <div style={{ height: '300px', width: '100%', marginTop: '16px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Son 24 saatlik canlı polling verisi.</span>
              <button className="btn btn-outline" onClick={() => setActiveModal(null)}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: AYARLAR MODAL ==================== */}
      {activeModal === 'settings' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '540px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
              <div className="card-title" style={{ fontSize: '16px' }}>
                <Sliders size={18} /> {selectedDevice.name} - Konfigürasyon
              </div>
              <button className="btn-close-copilot" onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px', fontSize: '12px' }}>
              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>IP Adresi &amp; Port</label>
                <input type="text" className="copilot-input" defaultValue={selectedDevice.address} style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Modbus Slave ID</label>
                  <input type="text" className="copilot-input" defaultValue="1" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Okuma Sıklığı (sn)</label>
                  <input type="text" className="copilot-input" defaultValue="5" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Akım Trafosu Oranı (CT Ratio)</label>
                <input type="text" className="copilot-input" defaultValue="1000/5" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
              <button className="btn btn-outline" onClick={() => setActiveModal(null)}>İptal</button>
              <button className="btn btn-primary" onClick={() => {
                showNotification('Cihaz Konfigürasyonu', `${selectedDevice.name} konfigürasyonu başarıyla kaydedildi!`, 'success');
                setActiveModal(null);
              }}>
                <Save size={14} /> Konfigürasyonu Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
