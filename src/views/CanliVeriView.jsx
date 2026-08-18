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
  Zap, 
  Plug, 
  Activity, 
  Flame, 
  Droplet, 
  Network, 
  X, 
  Gauge, 
  RefreshCw, 
  Sparkles, 
  Bell, 
  Wifi, 
  GitCommit,
  ChevronRight
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend, 
  Filler
);

export default function CanliVeriView() {
  const { theme, openCopilotWithPrompt, setActiveView } = useTheme();
  const [selectedNode, setSelectedNode] = useState(null);

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  // Chart 1: Live AG Electric Power (1.18 MW)
  const liveAgData = {
    labels: ['09:24', '09:39', '09:54', '10:09', '10:24'],
    datasets: [
      {
        label: 'Aktif Güç (MW)',
        data: [1.16, 1.22, 1.18, 1.24, 1.18],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4
      }
    ]
  };

  // Chart 2: Natural Gas Flow Trend (2,274 Sm³)
  const liveGasData = {
    labels: ['09:24', '09:39', '09:54', '10:09', '10:24'],
    datasets: [
      {
        label: 'Doğalgaz Akışı (Sm³)',
        data: [2100, 2250, 2180, 2274, 2210],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4
      }
    ]
  };

  // Chart 3: Water Flow Trend (329.8 m³)
  const liveWaterData = {
    labels: ['09:24', '09:39', '09:54', '10:09', '10:24'],
    datasets: [
      {
        label: 'Su Debisi (m³)',
        data: [310, 340, 325, 335, 329.8],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#06b6d4',
        pointRadius: 4
      }
    ]
  };

  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { display: false } },
      y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { color: gridColor } }
    }
  };

  const handleNodeClick = (name, voltage, power, energy, frequency = '50,02 Hz', status = '● Çevrimiçi & Dengede', current = '20,6 A', model = 'Schneider Electric PM8000') => {
    setSelectedNode({
      name,
      voltage,
      power,
      energy,
      frequency,
      status,
      current,
      model
    });
  };

  return (
    <div className="module-view active">
      
      {/* 10 TELEMETRY METRIC CARDS IN 2 ROWS OF 5 CARDS EACH */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* ROW 1: Elektrik & Sistem Metrikleri (5 Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          
          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Toplam Elektrik</span>
              <div className="metric-icon blue" style={{ width: '36px', height: '36px' }}><Zap size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>1.18</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>MW</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Bugün: 10,420 kWh</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Anlık Talep</span>
              <div className="metric-icon green" style={{ width: '36px', height: '36px' }}><Plug size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>1.25</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>MW</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Maks Demand: 1.72 MW</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Güç Faktörü</span>
              <div className="metric-icon purple" style={{ width: '36px', height: '36px' }}><Activity size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>0.97</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>Cos φ</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Endüktif Denge</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Gerilim (Ortalama)</span>
              <div className="metric-icon orange" style={{ width: '36px', height: '36px' }}><Gauge size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>34.5</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>kV</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>OG / AG Hücresi</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Aktif Alarm</span>
              <div className="metric-icon red" style={{ width: '36px', height: '36px' }}><Bell size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px', color: 'var(--danger-text)' }}>3</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>Adet</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px', color: 'var(--danger-text)', fontWeight: 700 }}>2 Kritik + 1 Orta</div>
          </div>

        </div>

        {/* ROW 2: Haberleşme, Gaz & Su Metrikleri (5 Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          
          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Haberleşme Durumu</span>
              <div className="metric-icon green" style={{ width: '36px', height: '36px' }}><Wifi size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '22px', color: 'var(--success-text)' }}>Normal</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>154/154 cihaz çevrimiçi</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Anlık Doğalgaz</span>
              <div className="metric-icon orange" style={{ width: '36px', height: '36px' }}><Flame size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>21.8</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>Sm³/ton</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Anlık Akış Hızı</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Bugünkü Doğalgaz</span>
              <div className="metric-icon orange" style={{ width: '36px', height: '36px' }}><Flame size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>2,274</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>Sm³</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Günlük Tüketim</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Anlık Su Debisi</span>
              <div className="metric-icon cyan" style={{ width: '36px', height: '36px' }}><Droplet size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>0.86</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>m³/ton</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Anlık Debi</div>
          </div>

          <div className="metric-card" style={{ padding: '20px', gap: '10px' }}>
            <div className="metric-header" style={{ fontSize: '13px' }}>
              <span>Bugünkü Su Tüketimi</span>
              <div className="metric-icon cyan" style={{ width: '36px', height: '36px' }}><Droplet size={18} /></div>
            </div>
            <div className="metric-value-box">
              <span className="metric-value" style={{ fontSize: '26px' }}>329.8</span>
              <span className="metric-unit" style={{ fontSize: '12px' }}>m³</span>
            </div>
            <div className="metric-subtext" style={{ fontSize: '11px' }}>Günlük Tüketim</div>
          </div>

        </div>

      </div>

      {/* MAIN DIAGRAM & TELEMETRY SECTIONS (FULL WIDTH) */}
      <div className="dashboard-grid">
        
        {/* SECTION 1: HIGH DEFINITION INDUSTRIAL SINGLE LINE DIAGRAM (SLD) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Network size={20} color="var(--primary)" /> ŞEBEKE / OG / TRAFO TEK HAT ŞEMASI (SLD)
            </div>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
              ● ÇEVRİMİÇİ CANLI AKIŞ (CANBUS / MODBUS)
            </span>
          </div>

          <div className="single-line-diagram" style={{ overflowX: 'auto' }}>
            <svg width="100%" height="520" viewBox="0 0 1050 520" style={{ fontFamily: 'inherit', minWidth: '950px' }}>
              
              {/* TOP HEADER TITLE */}
              <text x="525" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--text-main)" letterSpacing="0.5">
                ŞEBEKE / OG GİRİŞ 34,5 kV
              </text>

              {/* OG HÜCRESİ DASHED BOX */}
              <rect x="440" y="32" width="170" height="42" rx="6" fill="var(--bg-card)" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="5,4"/>
              <line x1="525" y1="40" x2="525" y2="65" stroke="var(--text-main)" strokeWidth="2"/>
              {/* Breaker symbol 'x' */}
              <line x1="520" y1="48" x2="530" y2="58" stroke="var(--danger)" strokeWidth="2.5"/>
              <line x1="530" y1="48" x2="520" y2="58" stroke="var(--danger)" strokeWidth="2.5"/>
              <rect x="545" y="47" width="12" height="12" fill="none" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="620" y="48" fontSize="10" fontWeight="700" fill="var(--text-main)">OG Hücresi</text>
              <text x="620" y="62" fontSize="9" fill="var(--text-muted)">Kesici + Koruma Rölesi</text>

              {/* M01 NODE & BADGE */}
              <line x1="525" y1="74" x2="525" y2="92" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('ŞEBEKE / OG GİRİŞ (M01)', '34.5 kV', '1.25 MW', '10,420 kWh', '50,02 Hz', '● Çevrimiçi & Dengede', '20,6 A', 'Schneider PM8000')}>
                <circle cx="525" cy="104" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="525" y="108" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M01</text>
                
                {/* Pill Badge */}
                <rect x="548" y="91" width="130" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="558" cy="104" r="4" fill="#10b981"/>
                <text x="568" y="102" fontSize="10" fontWeight="800" fill="var(--text-main)">1.25 MW</text>
                <text x="568" y="112" fontSize="9" fill="var(--text-muted)">10,420 kWh</text>
              </g>

              {/* HORIZONTAL BUSBAR (TOP) */}
              <line x1="525" y1="118" x2="525" y2="135" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="250" y1="135" x2="800" y2="135" stroke="var(--text-main)" strokeWidth="2.5"/>

              {/* LEFT TRANSFORMER 1 (TRAFO-1) */}
              <line x1="250" y1="135" x2="250" y2="148" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="245" y1="142" x2="255" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="255" y1="142" x2="245" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              
              {/* Transformer Symbol (Delta - Wye) */}
              <circle cx="250" cy="166" r="13" fill="none" stroke="var(--text-main)" strokeWidth="2"/>
              <text x="250" y="170" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">Δ</text>
              <circle cx="250" cy="186" r="13" fill="none" stroke="var(--text-main)" strokeWidth="2"/>
              <text x="250" y="190" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">Y</text>
              {/* Ground symbol */}
              <line x1="263" y1="186" x2="275" y2="186" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="275" y1="181" x2="275" y2="191" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="278" y1="183" x2="278" y2="189" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="281" y1="185" x2="281" y2="187" stroke="var(--text-main)" strokeWidth="1.5"/>

              <text x="165" y="166" fontSize="11" fontWeight="800" fill="var(--text-main)">TRAFO-1</text>
              <text x="165" y="178" fontSize="10" fill="var(--text-muted)">34,5/0,4 kV</text>
              <text x="165" y="190" fontSize="10" fill="var(--text-muted)">1600 kVA</text>

              {/* M02 Node */}
              <line x1="250" y1="199" x2="250" y2="214" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('TRAFO-1 (M02)', '34.5/0.4 kV', '620 kW', '5,210 kWh', '50,01 Hz', '● Çevrimiçi & Yükte', '895 A', 'Siemens PAC3200')}>
                <circle cx="250" cy="225" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="250" y="229" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M02</text>

                {/* Pill Badge */}
                <rect x="272" y="212" width="120" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="282" cy="225" r="4" fill="#10b981"/>
                <text x="292" y="223" fontSize="10" fontWeight="800" fill="var(--text-main)">620 kW</text>
                <text x="292" y="233" fontSize="9" fill="var(--text-muted)">5,210 kWh</text>
              </g>

              {/* RIGHT TRANSFORMER 2 (TRAFO-2) */}
              <line x1="800" y1="135" x2="800" y2="148" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="795" y1="142" x2="805" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="805" y1="142" x2="795" y2="152" stroke="var(--danger)" strokeWidth="2"/>

              {/* Transformer Symbol (Delta - Wye) */}
              <circle cx="800" cy="166" r="13" fill="none" stroke="var(--text-main)" strokeWidth="2"/>
              <text x="800" y="170" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">Δ</text>
              <circle cx="800" cy="186" r="13" fill="none" stroke="var(--text-main)" strokeWidth="2"/>
              <text x="800" y="190" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text-main)">Y</text>
              {/* Ground symbol */}
              <line x1="813" y1="186" x2="825" y2="186" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="825" y1="181" x2="825" y2="191" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="828" y1="183" x2="828" y2="189" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="831" y1="185" x2="831" y2="187" stroke="var(--text-main)" strokeWidth="1.5"/>

              <text x="840" y="166" fontSize="11" fontWeight="800" fill="var(--text-main)">TRAFO-2</text>
              <text x="840" y="178" fontSize="10" fill="var(--text-muted)">34,5/0,4 kV</text>
              <text x="840" y="190" fontSize="10" fill="var(--text-muted)">1600 kVA</text>

              {/* M03 Node */}
              <line x1="800" y1="199" x2="800" y2="214" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('TRAFO-2 (M03)', '34.5/0.4 kV', '590 kW', '4,980 kWh', '49,99 Hz', '● Çevrimiçi & Yükte', '850 A', 'Siemens PAC3200')}>
                <circle cx="800" cy="225" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="800" y="229" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M03</text>

                {/* Pill Badge */}
                <rect x="822" y="212" width="120" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="832" cy="225" r="4" fill="#10b981"/>
                <text x="842" y="223" fontSize="10" fontWeight="800" fill="var(--text-main)">590 kW</text>
                <text x="842" y="233" fontSize="9" fill="var(--text-muted)">4,980 kWh</text>
              </g>

              {/* COMMON MID BUSBAR & M04 NODE */}
              <line x1="250" y1="239" x2="250" y2="255" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="800" y1="239" x2="800" y2="255" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="250" y1="255" x2="800" y2="255" stroke="var(--text-main)" strokeWidth="2.5"/>

              <line x1="525" y1="255" x2="525" y2="268" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('ANA AG BİRLEŞİM (M04)', '400 V', '1.18 MW', '9,860 kWh', '50,00 Hz', '● Çevrimiçi', '1,745 A', 'Schneider PM8000')}>
                <circle cx="525" cy="280" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="525" y="284" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M04</text>

                {/* Pill Badge */}
                <rect x="548" y="267" width="130" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="558" cy="280" r="4" fill="#10b981"/>
                <text x="568" y="278" fontSize="10" fontWeight="800" fill="var(--text-main)">1.18 MW</text>
                <text x="568" y="288" fontSize="9" fill="var(--text-muted)">9,860 kWh</text>
              </g>

              {/* MAIN LOW VOLTAGE BUSBAR HEADER */}
              <line x1="525" y1="294" x2="525" y2="310" stroke="var(--text-main)" strokeWidth="2"/>
              <text x="525" y="306" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text-main)" letterSpacing="0.5">
                ANA AG PANO 400 V
              </text>

              {/* MAIN AG BUSBAR LINE */}
              <line x1="80" y1="315" x2="970" y2="315" stroke="var(--text-main)" strokeWidth="3"/>

              {/* 5 MAIN FEEDER OUTLETS */}
              
              {/* FEEDER 1: ÜRETİM PANOSU */}
              <line x1="110" y1="315" x2="110" y2="330" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="105" y1="322" x2="115" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="115" y1="322" x2="105" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('ÜRETİM PANOSU GİRİŞ (M05)', '400 V', '540 kW', '5,210 kWh', '50,00 Hz', '● Çevrimiçi', '780 A', 'Schneider EM6400')}>
                <circle cx="110" cy="345" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="110" y="349" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M05</text>
                
                {/* Pill Badge */}
                <rect x="130" y="332" width="110" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="138" cy="344" r="3.5" fill="#10b981"/>
                <text x="146" y="341" fontSize="9.5" fontWeight="800" fill="var(--text-main)">540 kW</text>
                <text x="146" y="350" fontSize="8.5" fill="var(--text-muted)">5,210 kWh</text>
              </g>

              {/* Feeder 1 Box */}
              <rect x="50" y="375" width="120" height="28" rx="6" fill="var(--bg-card)" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="110" y="393" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-main)">ÜRETİM PANOSU</text>

              {/* Sub-feeders for Üretim Panosu */}
              <line x1="110" y1="403" x2="110" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>
              <line x1="50" y1="420" x2="170" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>

              <line x1="50" y1="420" x2="50" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('HAT-1 (M12)', '400 V', '180 kW', '1,420 kWh', '50,00 Hz', '● Çevrimiçi', '260 A', 'EM6400')}>
                <circle cx="50" cy="445" r="11" fill="#10b981"/>
                <text x="50" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M12</text>
                <text x="50" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">180 kW</text>
                <text x="50" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,420 kWh</text>
                <text x="50" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Hat-1</text>
              </g>

              <line x1="110" y1="420" x2="110" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('HAT-2 (M13)', '400 V', '200 kW', '1,680 kWh', '50,00 Hz', '● Çevrimiçi', '290 A', 'EM6400')}>
                <circle cx="110" cy="445" r="11" fill="#10b981"/>
                <text x="110" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M13</text>
                <text x="110" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">200 kW</text>
                <text x="110" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,680 kWh</text>
                <text x="110" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Hat-2</text>
              </g>

              <line x1="170" y1="420" x2="170" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('HAT-3 (M14)', '400 V', '160 kW', '1,420 kWh', '50,00 Hz', '● Çevrimiçi', '230 A', 'EM6400')}>
                <circle cx="170" cy="445" r="11" fill="#10b981"/>
                <text x="170" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M14</text>
                <text x="170" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">160 kW</text>
                <text x="170" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,420 kWh</text>
                <text x="170" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Hat-3</text>
              </g>

              {/* FEEDER 2: FIRIN PANOSU */}
              <line x1="310" y1="315" x2="310" y2="330" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="305" y1="322" x2="315" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="315" y1="322" x2="305" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('FIRIN PANOSU GİRİŞ (M06)', '400 V', '280 kW', '2,230 kWh', '50,01 Hz', '● Çevrimiçi', '405 A', 'Schneider PM5500')}>
                <circle cx="310" cy="345" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="310" y="349" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M06</text>

                {/* Pill Badge */}
                <rect x="330" y="332" width="110" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="338" cy="344" r="3.5" fill="#10b981"/>
                <text x="346" y="341" fontSize="9.5" fontWeight="800" fill="var(--text-main)">280 kW</text>
                <text x="346" y="350" fontSize="8.5" fill="var(--text-muted)">2,230 kWh</text>
              </g>

              {/* Feeder 2 Box */}
              <rect x="250" y="375" width="120" height="28" rx="6" fill="var(--bg-card)" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="310" y="393" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-main)">FIRIN PANOSU</text>

              {/* Sub-feeders for Fırın Panosu */}
              <line x1="310" y1="403" x2="310" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>
              <line x1="250" y1="420" x2="370" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>

              <line x1="250" y1="420" x2="250" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('FIRIN-1 (M15)', '400 V', '100 kW', '820 kWh', '50,00 Hz', '● Çevrimiçi', '145 A', 'PM5500')}>
                <circle cx="250" cy="445" r="11" fill="#10b981"/>
                <text x="250" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M15</text>
                <text x="250" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">100 kW</text>
                <text x="250" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">820 kWh</text>
                <text x="250" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Fırın-1</text>
              </g>

              <line x1="310" y1="420" x2="310" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('FIRIN-2 (M16)', '400 V', '110 kW', '920 kWh', '50,00 Hz', '● Çevrimiçi', '160 A', 'PM5500')}>
                <circle cx="310" cy="445" r="11" fill="#10b981"/>
                <text x="310" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M16</text>
                <text x="310" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">110 kW</text>
                <text x="310" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">920 kWh</text>
                <text x="310" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Fırın-2</text>
              </g>

              <line x1="370" y1="420" x2="370" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('KURUTMA (M17)', '400 V', '70 kW', '490 kWh', '50,00 Hz', '● Çevrimiçi', '100 A', 'PM5500')}>
                <circle cx="370" cy="445" r="11" fill="#10b981"/>
                <text x="370" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M17</text>
                <text x="370" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">70 kW</text>
                <text x="370" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">490 kWh</text>
                <text x="370" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Kurutma</text>
              </g>

              {/* FEEDER 3: KOMPRESÖR PANOSU */}
              <line x1="510" y1="315" x2="510" y2="330" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="505" y1="322" x2="515" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="515" y1="322" x2="505" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('KOMPRESÖR GİRİŞ (M07)', '400 V', '145 kW', '1,170 kWh', '49,95 Hz', '● Uyarı (Kaçak Riski)', '210 A', 'Socomec DIRIS A-40')}>
                <circle cx="510" cy="345" r="13" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="510" y="349" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M07</text>

                {/* Pill Badge */}
                <rect x="530" y="332" width="110" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="538" cy="344" r="3.5" fill="#f59e0b"/>
                <text x="546" y="341" fontSize="9.5" fontWeight="800" fill="var(--text-main)">145 kW</text>
                <text x="546" y="350" fontSize="8.5" fill="var(--text-muted)">1,170 kWh</text>
              </g>

              {/* Feeder 3 Box */}
              <rect x="440" y="375" width="140" height="28" rx="6" fill="var(--bg-card)" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="510" y="393" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-main)">KOMPRESÖR PANOSU</text>

              {/* Sub-feeders for Kompresör */}
              <line x1="510" y1="403" x2="510" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>
              <line x1="450" y1="420" x2="570" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>

              <line x1="450" y1="420" x2="450" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('KOMPRESÖR-1 (M18)', '400 V', '60 kW', '480 kWh', '50,00 Hz', '● Çevrimiçi', '88 A', 'DIRIS A-40')}>
                <circle cx="450" cy="445" r="11" fill="#10b981"/>
                <text x="450" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M18</text>
                <text x="450" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">60 kW</text>
                <text x="450" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">480 kWh</text>
                <text x="450" y="492" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--text-main)">Kompresör-1</text>
              </g>

              <line x1="510" y1="420" x2="510" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('KOMPRESÖR-2 (M19)', '400 V', '50 kW', '410 kWh', '49,90 Hz', '● Yüksek Sapma', '74 A', 'DIRIS A-40')}>
                <circle cx="510" cy="445" r="11" fill="#ef4444"/>
                <text x="510" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M19</text>
                <text x="510" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--danger-text)">50 kW</text>
                <text x="510" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">410 kWh</text>
                <text x="510" y="492" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--text-main)">Kompresör-2</text>
              </g>

              <line x1="570" y1="420" x2="570" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('KOMPRESÖR-3 (M20)', '400 V', '35 kW', '280 kWh', '50,00 Hz', '● Çevrimiçi', '52 A', 'DIRIS A-40')}>
                <circle cx="570" cy="445" r="11" fill="#10b981"/>
                <text x="570" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M20</text>
                <text x="570" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">35 kW</text>
                <text x="570" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">280 kWh</text>
                <text x="570" y="492" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--text-main)">Kompresör-3</text>
              </g>

              {/* FEEDER 4: YARDIMCI TESİSLER */}
              <line x1="720" y1="315" x2="720" y2="330" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="715" y1="322" x2="725" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="725" y1="322" x2="715" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('YARDIMCI TESİSLER (M08)', '400 V', '110 kW', '930 kWh', '50,00 Hz', '● Çevrimiçi', '160 A', 'Socomec DIRIS A-20')}>
                <circle cx="720" cy="345" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="720" y="349" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M08</text>

                {/* Pill Badge */}
                <rect x="740" y="332" width="110" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="748" cy="344" r="3.5" fill="#10b981"/>
                <text x="756" y="341" fontSize="9.5" fontWeight="800" fill="var(--text-main)">110 kW</text>
                <text x="756" y="350" fontSize="8.5" fill="var(--text-muted)">930 kWh</text>
              </g>

              {/* Feeder 4 Box */}
              <rect x="650" y="375" width="140" height="28" rx="6" fill="var(--bg-card)" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="720" y="393" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-main)">YARDIMCI TESİSLER</text>

              {/* Sub-feeders for Yardımcı Tesisler */}
              <line x1="720" y1="403" x2="720" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>
              <line x1="680" y1="420" x2="760" y2="420" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>

              <line x1="680" y1="420" x2="680" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('POMPA (M21)', '400 V', '50 kW', '420 kWh', '50,00 Hz', '● Çevrimiçi', '72 A', 'DIRIS A-20')}>
                <circle cx="680" cy="445" r="11" fill="#10b981"/>
                <text x="680" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M21</text>
                <text x="680" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">50 kW</text>
                <text x="680" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">420 kWh</text>
                <text x="680" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">Pompa</text>
              </g>

              <line x1="760" y1="420" x2="760" y2="435" stroke="var(--text-dim)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('HVAC (M22)', '400 V', '35 kW', '290 kWh', '50,00 Hz', '● Çevrimiçi', '50 A', 'DIRIS A-20')}>
                <circle cx="760" cy="445" r="11" fill="#10b981"/>
                <text x="760" y="448" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M22</text>
                <text x="760" y="468" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">35 kW</text>
                <text x="760" y="478" textAnchor="middle" fontSize="8" fill="var(--text-muted)">290 kWh</text>
                <text x="760" y="492" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">HVAC</text>
              </g>

              {/* FEEDER 5: İDARİ BİNA */}
              <line x1="910" y1="315" x2="910" y2="330" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="905" y1="322" x2="915" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="915" y1="322" x2="905" y2="332" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('İDARİ BİNA (M09)', '400 V', '65 kW', '550 kWh', '50,00 Hz', '● Çevrimiçi', '95 A', 'Schneider PM3200')}>
                <circle cx="910" cy="345" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="910" y="349" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M09</text>

                {/* Pill Badge */}
                <rect x="928" y="332" width="110" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="936" cy="344" r="3.5" fill="#10b981"/>
                <text x="944" y="341" fontSize="9.5" fontWeight="800" fill="var(--text-main)">65 kW</text>
                <text x="944" y="350" fontSize="8.5" fill="var(--text-muted)">550 kWh</text>
              </g>

              {/* Feeder 5 Box */}
              <rect x="850" y="375" width="120" height="28" rx="6" fill="var(--bg-card)" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="910" y="393" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-main)">İDARİ BİNA</text>

              {/* Sub-feeder for İdari Bina */}
              <line x1="910" y1="403" x2="910" y2="440" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="3,3"/>
              <rect x="855" y="440" width="110" height="26" rx="6" fill="var(--bg-card-hover)" stroke="var(--border-card)"/>
              <text x="910" y="457" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text-main)">Ofis Yükleri</text>

            </svg>
          </div>
        </div>

        {/* SECTION 2: DOĞALGAZ & SU AKIŞ HATTI (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Flame size={20} color="#f59e0b" /> Doğalgaz &amp; Su Akış Hatları
            </div>
            <span className="badge badge-warning" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Basınç &amp; Anlık Debi Sensörleri
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Natural Gas Line Flow */}
            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={18} color="#f59e0b" /> Doğalgaz Hat Akışı (G01 ➔ G03)
                </strong>
                <span className="badge badge-warning">6.5 barg Ana Giriş</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('DOĞALGAZ G01 ANA GİRİŞ', '6.5 barg', '2,740 Sm³/h', '2,274 Sm³', '50 Hz', '● Çevrimiçi', '120 A', 'Endress+Hauser Proline')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>G01 Ana Giriş</div>
                  <div style={{ fontSize: '12px', color: 'var(--warning-text)', fontWeight: 700, marginTop: '4px' }}>6.5 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>2,740 Sm³/h</div>
                </div>

                <div style={{ color: 'var(--text-dim)' }}><ChevronRight size={22} /></div>

                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('DOĞALGAZ G02 FIRIN HATTI', '2.1 barg', '2,210 Sm³/h', '1,820 Sm³', '50 Hz', '● Çevrimiçi', '90 A', 'Endress+Hauser Proline')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>G02 Fırın Hattı</div>
                  <div style={{ fontSize: '12px', color: 'var(--warning-text)', fontWeight: 700, marginTop: '4px' }}>2.1 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>2,210 Sm³/h</div>
                </div>

                <div style={{ color: 'var(--text-dim)' }}><ChevronRight size={22} /></div>

                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('DOĞALGAZ G03 KOMPRESÖR', '1.9 barg', '530 Sm³/h', '454 Sm³', '50 Hz', '● Çevrimiçi', '30 A', 'Endress+Hauser Proline')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>G03 Kompresör</div>
                  <div style={{ fontSize: '12px', color: 'var(--warning-text)', fontWeight: 700, marginTop: '4px' }}>1.9 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>530 Sm³/h</div>
                </div>
              </div>
            </div>

            {/* Water Line Flow */}
            <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Droplet size={18} color="#06b6d4" /> Şebeke Su Hat Akışı (S01 ➔ S03)
                </strong>
                <span className="badge badge-info">5.6 barg Ana Giriş</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('SU S01 ANA GİRİŞ', '5.6 barg', '48.6 m³/h', '329.8 m³', '50 Hz', '● Çevrimiçi', '45 A', 'KROHNE WATERFLUX')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>S01 Ana Giriş</div>
                  <div style={{ fontSize: '12px', color: 'var(--info-text)', fontWeight: 700, marginTop: '4px' }}>5.6 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>48.6 m³/h</div>
                </div>

                <div style={{ color: 'var(--text-dim)' }}><ChevronRight size={22} /></div>

                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('SU S02 PROSES HATTI', '3.2 barg', '37.8 m³/h', '260 m³', '50 Hz', '● Çevrimiçi', '35 A', 'KROHNE WATERFLUX')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>S02 Proses Hattı</div>
                  <div style={{ fontSize: '12px', color: 'var(--info-text)', fontWeight: 700, marginTop: '4px' }}>3.2 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>37.8 m³/h</div>
                </div>

                <div style={{ color: 'var(--text-dim)' }}><ChevronRight size={22} /></div>

                <div 
                  className="node-group"
                  onClick={() => handleNodeClick('SU S03 YARDIMCI HAT', '2.3 barg', '10.8 m³/h', '69.8 m³', '50 Hz', '● Çevrimiçi', '10 A', 'KROHNE WATERFLUX')}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '12px', flex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>S03 Yardımcı Hat</div>
                  <div style={{ fontSize: '12px', color: 'var(--info-text)', fontWeight: 700, marginTop: '4px' }}>2.3 barg</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>10.8 m³/h</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: 3 CANLI TELEMETRİ ÇİZGİ GRAFİĞİ (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Zap size={20} color="var(--primary)" /> Anlık Canlı Telemetri Trend Grafikleri (1 Saatlik Akış)
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            
            {/* Chart 1: Electric Power AG (1.18 MW) */}
            <div style={{ padding: '16px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} color="var(--primary)" /> Toplam AG Gücü
                </strong>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>1.18 MW</span>
              </div>
              <div className="chart-container" style={{ height: '160px' }}>
                <Line data={liveAgData} options={miniChartOptions} />
              </div>
            </div>

            {/* Chart 2: Natural Gas Flow (2,274 Sm³) */}
            <div style={{ padding: '16px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flame size={16} color="#f59e0b" /> Doğalgaz Tüketimi
                </strong>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--warning-text)' }}>2,274 Sm³</span>
              </div>
              <div className="chart-container" style={{ height: '160px' }}>
                <Line data={liveGasData} options={miniChartOptions} />
              </div>
            </div>

            {/* Chart 3: Water Flow (329.8 m³) */}
            <div style={{ padding: '16px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplet size={16} color="#06b6d4" /> Su Tüketimi
                </strong>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--info-text)' }}>329.8 m³</span>
              </div>
              <div className="chart-container" style={{ height: '160px' }}>
                <Line data={liveWaterData} options={miniChartOptions} />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: AKTİF ALARMLAR & ENERJİ DENGE KONTROLÜ (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Active Alarms Feed */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={18} color="var(--danger-text)" /> Aktif Saha Alarmları
                </strong>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '4px 10px', fontSize: '11px' }}
                  onClick={() => setActiveView('alarmlar')}
                >
                  Tüm Alarmları Gör
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-card)' }}>
                  <span className="mono" style={{ color: 'var(--text-muted)' }}>10:22:11</span>
                  <strong style={{ color: 'var(--text-main)' }}>Kompresör-2 (M17) Basınç Düşüşü</strong>
                  <span className="badge badge-danger">Yüksek</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-card)' }}>
                  <span className="mono" style={{ color: 'var(--text-muted)' }}>10:18:45</span>
                  <strong style={{ color: 'var(--text-main)' }}>Fırın-1 (M15) Sıcaklık Limiti Aşıldı</strong>
                  <span className="badge badge-warning">Orta</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ color: 'var(--text-muted)' }}>10:05:32</span>
                  <strong style={{ color: 'var(--text-main)' }}>OG Hücresi Kapı Açık Sensörü</strong>
                  <span className="badge badge-warning">Orta</span>
                </div>
              </div>
            </div>

            {/* Energy Balance Control Summary */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GitCommit size={18} color="var(--success-text)" /> Enerji &amp; Pano Denge Kontrolü
                </strong>
                <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  ● %2.1 (DENGEDE ✓)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Şebeke Toplam AG Gücü (Ana Sayaç):</span>
                  <span className="mono" style={{ color: 'var(--primary)', fontWeight: 800 }}>1.18 MW</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Tüm Panoların Toplam Çekişi:</span>
                  <span className="mono" style={{ color: 'var(--success-text)', fontWeight: 800 }}>1.14 MW</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Kayıp / Kaçak Fark Büyüklüğü:</span>
                  <span className="mono" style={{ color: 'var(--text-main)' }}>0.04 MW (40 kW)</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-card)', lineHeight: '1.4' }}>
                  Sistem kayıp-kaçak tolerans sınırı %3.0'tür. Mevcut hat kayıpları standart sınırlar içerisindedir.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* INTERACTIVE NODE DETAILS POPUP MODAL */}
      {selectedNode && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '540px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px' }}>
              <div className="card-title" style={{ fontSize: '16px' }}>
                <Network size={20} color="var(--primary)" /> {selectedNode.name} Canlı Telemetri Detayı
              </div>
              <button className="btn-close-copilot" onClick={() => setSelectedNode(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${selectedNode.status.includes('Uyarı') ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '12px', padding: '6px 12px' }}>
                  {selectedNode.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Son Telemetri: Anlık (1 sn Polling)
                </span>
              </div>

              {/* 4 Telemetry Metric Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--primary)' }}><Zap size={22} /></div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Anlık Aktif Güç</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedNode.power}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--warning-text)' }}><Gauge size={22} /></div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gerilim / Basınç</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedNode.voltage}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--purple-text)' }}><Activity size={22} /></div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Toplam Akış</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedNode.energy}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--success-text)' }}><RefreshCw size={22} /></div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Şebeke Frekansı</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{selectedNode.frequency}</div>
                  </div>
                </div>
              </div>

              {/* Hardware Connection Info */}
              <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '12px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ölçüm Cihazı / Analizör:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedNode.model}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ortalama Akım (A):</span>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedNode.current}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Güç Faktörü (Cos φ):</span>
                  <strong style={{ color: 'var(--success-text)' }}>0.97 (Endüktif Denge)</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-card)' }}>
              <button 
                className="btn btn-primary" 
                style={{ fontSize: '12px', padding: '8px 16px' }}
                onClick={() => {
                  const prompt = `${selectedNode.name} canlı telemetri analizi yap`;
                  setSelectedNode(null);
                  openCopilotWithPrompt(prompt);
                }}
              >
                <Sparkles size={14} /> AI ile Trend Analizi
              </button>
              <button className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }} onClick={() => setSelectedNode(null)}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
