import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Line } from 'react-chartjs-2';
import { Zap, Plug, Activity, Flame, Droplet, Network, AreaChart } from 'lucide-react';

export default function CanliVeriView() {
  const { theme } = useTheme();

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const liveAgData = {
    labels: ['09:24', '09:39', '09:54', '10:09', '10:24'],
    datasets: [
      {
        label: 'Aktif Güç (MW)',
        data: [1.16, 1.22, 1.18, 1.24, 1.18],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#06b6d4'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  const showNodeDetails = (name, voltage, power, energy) => {
    alert(`${name} Detayları:\n- Gerilim Seviyesi: ${voltage}\n- Anlık Aktif Güç: ${power}\n- Toplam Enerji: ${energy}\n\nDurum: ÇEVRİMİÇİ VE DENGEDE ✓`);
  };

  return (
    <div className="module-view active">
      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Toplam Elektrik</span><div className="metric-icon blue"><Zap size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">1.18</span> <span className="metric-unit">MW</span></div>
          <div className="metric-subtext">Bugün: 10,420 kWh</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Anlık Talep</span><div className="metric-icon cyan"><Plug size={18} /></div></div>
          <div className="metric-value-box"><span class="metric-value">1.25</span> <span className="metric-unit">MW</span></div>
          <div className="metric-subtext">Maks Demand: 1.72 MW</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Güç Faktörü</span><div className="metric-icon purple"><Activity size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">0.97</span> <span className="metric-unit">Cos φ</span></div>
          <div className="metric-subtext">Endüktif</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Anlık Doğalgaz</span><div className="metric-icon orange"><Flame size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">21.8</span> <span className="metric-unit">Sm³/ton</span></div>
          <div className="metric-subtext">Bugün: 2,274 Sm³</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Anlık Su Debisi</span><div className="metric-icon cyan"><Droplet size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value">0.86</span> <span className="metric-unit">m³/ton</span></div>
          <div className="metric-subtext">Bugün: 329.8 m³</div>
        </div>
      </div>

      {/* Grid */}
      <div className="dashboard-grid">
        {/* SVG Diagram */}
        <div className="card col-span-8">
          <div className="card-header">
            <div className="card-title"><Network size={18} /> ŞEBEKE / OG / TRAFO TEK HAT ŞEMASI</div>
            <span className="badge badge-success">● ÇEVRİMİÇİ</span>
          </div>

          <div className="single-line-diagram">
            <svg width="100%" height="340" viewBox="0 0 800 340" style={{ fontFamily: 'inherit' }}>
              <g className="node-group" onClick={() => showNodeDetails('OG Giriş Şebeke', '34.5 kV', '1.25 MW', '10,420 kWh')}>
                <rect x="310" y="10" width="180" height="44" rx="8" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="400" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-main)">ŞEBEKE / OG GİRİŞ 34.5 kV</text>
                <text x="400" y="44" textAnchor="middle" fontSize="10" fill="var(--success-text)">● M01: 1.25 MW (10,420 kWh)</text>
              </g>

              <line x1="400" y1="54" x2="400" y2="80" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="220" y1="80" x2="580" y2="80" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="220" y1="80" x2="220" y2="100" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="580" y1="80" x2="580" y2="100" stroke="var(--text-dim)" strokeWidth="2"/>

              <g className="node-group" onClick={() => showNodeDetails('TRAFO-1', '34.5 / 0.4 kV', '620 kW', '5,210 kWh')}>
                <circle cx="220" cy="120" r="18" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="220" y="124" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">T1</text>
                <rect x="140" y="145" width="160" height="32" rx="6" fill="var(--bg-card)" stroke="var(--primary)"/>
                <text x="220" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">M02: 620 kW (5,210 kWh)</text>
              </g>

              <g className="node-group" onClick={() => showNodeDetails('TRAFO-2', '34.5 / 0.4 kV', '590 kW', '4,980 kWh')}>
                <circle cx="580" cy="120" r="18" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="580" y="124" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">T2</text>
                <rect x="500" y="145" width="160" height="32" rx="6" fill="var(--bg-card)" stroke="var(--primary)"/>
                <text x="580" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">M03: 590 kW (4,980 kWh)</text>
              </g>

              <line x1="220" y1="177" x2="220" y2="200" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="580" y1="177" x2="580" y2="200" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="120" y1="200" x2="680" y2="200" stroke="var(--text-dim)" strokeWidth="2"/>

              <line x1="120" y1="200" x2="120" y2="230" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="300" y1="200" x2="300" y2="230" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="500" y1="200" x2="500" y2="230" stroke="var(--text-dim)" strokeWidth="2"/>
              <line x1="680" y1="200" x2="680" y2="230" stroke="var(--text-dim)" strokeWidth="2"/>

              <g className="node-group" onClick={() => showNodeDetails('Üretim Panosu', '400 V', '540 kW', '5,210 kWh')}>
                <rect x="50" y="230" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--success)" strokeWidth="2"/>
                <text x="120" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-main)">ÜRETİM PANOSU</text>
                <text x="120" y="268" textAnchor="middle" fontSize="10" fill="var(--success-text)">540 kW</text>
              </g>

              <g className="node-group" onClick={() => showNodeDetails('Fırın Panosu', '400 V', '280 kW', '2,230 kWh')}>
                <rect x="230" y="230" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--success)" strokeWidth="2"/>
                <text x="300" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-main)">FIRIN PANOSU</text>
                <text x="300" y="268" textAnchor="middle" fontSize="10" fill="var(--success-text)">280 kW</text>
              </g>

              <g className="node-group" onClick={() => showNodeDetails('Kompresör Panosu', '400 V', '145 kW', '1,170 kWh')}>
                <rect x="430" y="230" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--danger)" strokeWidth="2"/>
                <text x="500" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-main)">KOMPRESÖR</text>
                <text x="500" y="268" textAnchor="middle" fontSize="10" fill="var(--danger-text)">145 kW (Düşük)</text>
              </g>

              <g className="node-group" onClick={() => showNodeDetails('Yardımcı Tesisler', '400 V', '110 kW', '930 kWh')}>
                <rect x="610" y="230" width="140" height="50" rx="8" fill="var(--bg-card)" stroke="var(--success)" strokeWidth="2"/>
                <text x="680" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-main)">YARDIMCI TESİS</text>
                <text x="680" y="268" textAnchor="middle" fontSize="10" fill="var(--success-text)">110 kW</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Live AG Chart */}
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><AreaChart size={18} /> Anlık Güç Çekişi (AG)</div>
          </div>
          <div className="chart-container">
            <Line data={liveAgData} options={options} />
          </div>

          <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '12px', marginTop: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Denge Kontrol Özeti</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', color: 'var(--text-muted)' }}>
              <span>Toplam AG Gücü:</span>
              <span className="mono" style={{ color: 'var(--text-main)' }}>1.18 MW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', color: 'var(--text-muted)' }}>
              <span>Panolar Toplamı:</span>
              <span className="mono" style={{ color: 'var(--text-main)' }}>1.14 MW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'var(--success-text)' }}>
              <span>Fark Oranı:</span>
              <span className="mono">%2.1 (DENGEDE ✓)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
