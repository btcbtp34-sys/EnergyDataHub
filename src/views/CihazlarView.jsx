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
  TrendingUp,
  SlidersHorizontal,
  Layers
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
  const { theme, showNotification } = useTheme();
  const [selectedDevice, setSelectedDevice] = useState(null); // null when modal closed
  const [searchTerm, setSearchTerm] = useState('');
  const [modalTab, setModalTab] = useState('telemetry'); // 'telemetry', 'registers', 'charts', 'settings'

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const filteredDevices = devicesList.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Chart Data for selected device
  const chartData = selectedDevice ? {
    labels: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30'],
    datasets: [
      {
        label: `${selectedDevice.name} Telemetri Çekiş Trendi`,
        data: [1.12, 1.15, 1.18, 1.25, 1.22, 1.24, 1.25],
        borderColor: '#1d4ed8',
        backgroundColor: 'rgba(29, 78, 216, 0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#1d4ed8',
        pointRadius: 5
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1400,
      easing: 'easeOutQuart'
    },
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  const handleOpenDeviceDetail = (device, initialTab = 'telemetry') => {
    setSelectedDevice(device);
    setModalTab(initialTab);
  };

  return (
    <div className="module-view active">
      {/* Metrics Header Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Toplam Cihaz</span><div className="metric-icon blue"><Box size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">154</span></div>
          <div className="metric-subtext">Tüm saha lokasyonlarında</div>
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
          <div className="metric-subtext">Canlı Polling Aktif</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Full-width Cihazlar List Table (col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><Cpu size={18} /> Saha Cihazları ve Telemetri Listeniz</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="copilot-input" 
                placeholder="Cihaz adı, IP veya lokasyon ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 14px', fontSize: '12px', width: '240px' }} 
              />
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}><Search size={14} /></button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}><Filter size={14} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Cihaz Adı</th>
                  <th>Lokasyon</th>
                  <th>Protokol</th>
                  <th>IP / Modbus Adresi</th>
                  <th>Durum</th>
                  <th>Veri Kalitesi</th>
                  <th>Kalibrasyon Tarihi</th>
                  <th style={{ textAlign: 'right' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => {
                  return (
                    <tr 
                      key={device.id} 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOpenDeviceDetail(device, 'telemetry')}
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
                      <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '4px 12px', fontSize: '11px' }}
                          onClick={() => handleOpenDeviceDetail(device, 'telemetry')}
                        >
                          <Eye size={13} /> İncele &amp; Detay
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
            <span>Toplam {devicesList.length} kayıtlı cihaz sıralanıyor</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>«</button>
              <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '11px' }}>1</button>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>2</button>
              <button className="btn btn-outline" style={{ padding: '3px 8px', fontSize: '11px' }}>»</button>
            </div>
          </div>
        </div>

        {/* System Event Logs Panel (col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><Clock size={18} /> Canlı Sistem &amp; Olay Logları</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-success">● Normal</span>
              <span className="badge badge-warning">● Uyarı</span>
              <span className="badge badge-danger">● Alarm</span>
              <input type="text" className="copilot-input" placeholder="Olay ara..." style={{ padding: '5px 10px', fontSize: '12px', width: '160px', marginLeft: '12px' }} />
              <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '12px' }}><Filter size={14} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Tarih / Saat</th>
                  <th>Modül</th>
                  <th>Olay Açıklaması</th>
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

      {/* ==================== SEÇİLİ CİHAZ POP-UP DETAY MODAL ==================== */}
      {selectedDevice && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.55)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 250, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '24px' 
          }}
          onClick={() => setSelectedDevice(null)}
        >
          <div 
            className="card" 
            style={{ 
              width: '100%', 
              maxWidth: '960px', 
              maxHeight: '90vh',
              overflowY: 'auto',
              background: isLight ? '#ffffff' : 'var(--bg-card)', 
              border: '1px solid var(--border-card)', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '28px',
              borderRadius: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Server size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {selectedDevice.name}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Lokasyon: {selectedDevice.location} | Model: {selectedDevice.model} ({selectedDevice.vendor})
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`badge ${selectedDevice.status === 'Çevrimiçi' ? 'badge-success' : 'badge-warning'}`}>
                  ● {selectedDevice.status}
                </span>
                <button className="btn-close-copilot" onClick={() => setSelectedDevice(null)}><X size={22} /></button>
              </div>
            </div>

            {/* Sub Navigation Tabs */}
            <div style={{ display: 'flex', gap: '8px', margin: '16px 0', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
              <button 
                className={`btn ${modalTab === 'telemetry' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setModalTab('telemetry')}
              >
                <Zap size={14} /> Canlı Telemetri &amp; Künye
              </button>
              <button 
                className={`btn ${modalTab === 'registers' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setModalTab('registers')}
              >
                <Layers size={14} /> Modbus Registerları
              </button>
              <button 
                className={`btn ${modalTab === 'charts' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setModalTab('charts')}
              >
                <TrendingUp size={14} /> Trend Grafiği
              </button>
              <button 
                className={`btn ${modalTab === 'settings' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setModalTab('settings')}
              >
                <SlidersHorizontal size={14} /> Cihaz Ayarları
              </button>
            </div>

            {/* TAB 1: TELEMETRY & SPECS */}
            {modalTab === 'telemetry' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 4 Live Telemetry Tiles */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--primary)' }}><Zap size={24} /></div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Aktif Güç</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{selectedDevice.activePower}</div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--warning-text)' }}><Gauge size={24} /></div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gerilim (Ort)</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{selectedDevice.voltage}</div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--purple-text)' }}><Activity size={24} /></div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Akım (Ort)</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{selectedDevice.current}</div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--success-text)' }}><RefreshCw size={24} /></div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Şebeke Frekansı</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{selectedDevice.frequency}</div>
                    </div>
                  </div>
                </div>

                {/* Connection & Vendor Info 2-Column */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '16px' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '10px', fontSize: '14px' }}>📡 Haberleşme &amp; Bağlantı Parametreleri</strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>İletişim Protokolü:</span><span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedDevice.protocol}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>IP &amp; Modbus Adresi:</span><span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedDevice.address}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>Sinyal / Veri Kalitesi:</span><span className="mono" style={{ color: 'var(--success-text)', fontWeight: 800 }}>%{selectedDevice.quality} (Mükemmel)</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Polling Sıklığı:</span><span className="mono" style={{ color: 'var(--text-main)' }}>5000 ms</span></div>
                  </div>

                  <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '16px' }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '10px', fontSize: '14px' }}>⚙️ Donanım &amp; Kalibrasyon Künyesi</strong>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>Cihaz Üreticisi:</span><span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedDevice.vendor}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>Model Kodu:</span><span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedDevice.model}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}><span>Son Kalibrasyon:</span><span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{selectedDevice.calibDate}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Gelecek Bakım Periyodu:</span><span style={{ color: 'var(--primary)', fontWeight: 700 }}>02.03.2026 (360 gün var)</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MODBUS REGISTERS */}
            {modalTab === 'registers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>Canlı Modbus Register Tablosu</strong>
                <div className="table-responsive">
                  <table className="custom-table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Register (Hex / Dec)</th>
                        <th>Parametre Adı</th>
                        <th>Anlık Değer</th>
                        <th>Birim</th>
                        <th>Veri Tipi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="mono">0x3001 (40001)</td>
                        <td>Aktif Güç (L1-L3 Toplam)</td>
                        <td className="mono" style={{ fontWeight: 800, color: 'var(--primary)' }}>{selectedDevice.activePower}</td>
                        <td>MW</td>
                        <td>Float32</td>
                      </tr>
                      <tr>
                        <td className="mono">0x3003 (40003)</td>
                        <td>Gerilim L1-N</td>
                        <td className="mono" style={{ fontWeight: 700 }}>{selectedDevice.voltage}</td>
                        <td>kV</td>
                        <td>Float32</td>
                      </tr>
                      <tr>
                        <td className="mono">0x3005 (40005)</td>
                        <td>Akım (Ortalama)</td>
                        <td className="mono" style={{ fontWeight: 700 }}>{selectedDevice.current}</td>
                        <td>A</td>
                        <td>Float32</td>
                      </tr>
                      <tr>
                        <td className="mono">0x3007 (40007)</td>
                        <td>Şebeke Frekansı</td>
                        <td className="mono" style={{ fontWeight: 700 }}>{selectedDevice.frequency}</td>
                        <td>Hz</td>
                        <td>Float32</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: CHARTS */}
            {modalTab === 'charts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>Son 24 Saatlik Çekiş Trendi</strong>
                <div className="chart-card-animated" style={{ height: '300px', width: '100%' }}>
                  <Line key={`cihazlar-${selectedDevice?.code}-${isLight}`} data={chartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS */}
            {modalTab === 'settings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
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
            )}

            {/* Modal Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-card)' }}>
              <button className="btn btn-outline" onClick={() => setSelectedDevice(null)}>Kapat</button>
              {modalTab === 'settings' && (
                <button className="btn btn-primary" onClick={() => {
                  showNotification('Cihaz Konfigürasyonu', `${selectedDevice.name} konfigürasyonu kaydedildi!`, 'success');
                  setSelectedDevice(null);
                }}>
                  <Save size={14} /> Konfigürasyonu Kaydet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
