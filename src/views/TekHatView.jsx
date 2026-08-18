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
  Legend 
} from 'chart.js';
import { 
  Network, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  Scale, 
  Sliders, 
  Activity, 
  Wifi, 
  X, 
  Zap, 
  Gauge, 
  RefreshCw, 
  Sparkles 
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend
);

export default function TekHatView() {
  const { theme, openCopilotWithPrompt } = useTheme();
  const [selectedNode, setSelectedNode] = useState(null);

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  // Balance difference percentage trend chart data
  const balanceTrendData = {
    labels: ['09:24', '09:30', '09:36', '09:42', '09:48', '09:54', '10:00', '10:06', '10:12', '10:18', '10:24'],
    datasets: [
      {
        label: 'Denge Farkı (%)',
        data: [2.1, -1.5, 3.2, 1.8, 5.1, -2.4, 0.8, -3.2, 1.5, -4.8, 2.21],
        borderColor: '#2563eb',
        borderWidth: 2.5,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4,
        tension: 0.3
      },
      {
        label: '%5 Uyarı Eşiği',
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0
      },
      {
        label: '-%5 Uyarı Eşiği',
        data: [-5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5],
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0
      },
      {
        label: '%10 Alarm Eşiği',
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        borderColor: '#ef4444',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0
      },
      {
        label: '-%10 Alarm Eşiği',
        data: [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10],
        borderColor: '#ef4444',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0
      }
    ]
  };

  const balanceTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
      }
    },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { color: gridColor } },
      y: { 
        ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 }, callback: (val) => `%${val}` }, 
        grid: { color: gridColor },
        min: -20,
        max: 20
      }
    }
  };

  const handleNodeClick = (name, code, power, energy, status = 'Normal', type = 'green') => {
    setSelectedNode({
      name: `${name} (${code})`,
      code,
      power,
      energy,
      voltage: '400 V',
      current: '240 A',
      frequency: '50,01 Hz',
      status: status === 'Normal' ? '● Çevrimiçi & Dengede' : (status === 'Uyarı' ? '● Uyarı (Limit Aşımı)' : '● ALARM (Yüksek Sapma)'),
      type,
      model: 'Schneider Electric PM8000'
    });
  };

  return (
    <div className="module-view active">
      {/* VERTICALLY STACKED FULL-WIDTH SECTIONS */}
      <div className="dashboard-grid">
        
        {/* SECTION 1: ŞEBEKE / OG / TRAFO TEK HAT ŞEMASI (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Network size={20} color="var(--primary)" /> ŞEBEKE / OG GİRİŞ TEK HAT ŞEMASI &amp; SAYAÇ HİYERARŞİSİ
            </div>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
              ● 21 SAYAÇ DÜĞÜMÜ CANLI İZLENİYOR
            </span>
          </div>

          {/* High-Definition SVG Diagram matching the reference layout */}
          <div className="single-line-diagram" style={{ overflowX: 'auto', padding: '10px 0' }}>
            <svg width="100%" height="480" viewBox="0 0 1020 480" style={{ fontFamily: 'inherit', minWidth: '960px' }}>
              
              {/* HEADER TITLE */}
              <text x="510" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--text-main)" letterSpacing="0.5">
                ŞEBEKE / OG GİRİŞ 34,5 kV
              </text>

              {/* OG HÜCRESİ BOX */}
              <rect x="425" y="32" width="170" height="42" rx="6" fill="var(--bg-card)" stroke="var(--text-dim)" strokeWidth="1.5" strokeDasharray="5,4"/>
              <line x1="510" y1="40" x2="510" y2="65" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="505" y1="48" x2="515" y2="58" stroke="var(--danger)" strokeWidth="2.5"/>
              <line x1="515" y1="48" x2="505" y2="58" stroke="var(--danger)" strokeWidth="2.5"/>
              <rect x="530" y="47" width="12" height="12" fill="none" stroke="var(--text-main)" strokeWidth="1.5"/>
              <text x="605" y="48" fontSize="10" fontWeight="700" fill="var(--text-main)">OG Hücresi</text>
              <text x="605" y="62" fontSize="9" fill="var(--text-muted)">Kesici + Koruma Rölesi</text>

              {/* M01 NODE */}
              <line x1="510" y1="74" x2="510" y2="90" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Şebeke OG Giriş', 'M01', '1.25 MW', '10,420 kWh', 'Normal', 'green')}>
                <circle cx="510" cy="102" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="510" y="106" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M01</text>
                
                {/* Badge */}
                <rect x="532" y="89" width="125" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="542" cy="102" r="4" fill="#10b981"/>
                <text x="552" y="100" fontSize="10" fontWeight="800" fill="var(--text-main)">1.25 MW</text>
                <text x="552" y="110" fontSize="9" fill="var(--text-muted)">10,420 kWh</text>
              </g>

              {/* BUSBAR LEVEL 1 (SPLIT TO M02 & M03) */}
              <line x1="510" y1="116" x2="510" y2="132" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="250" y1="132" x2="770" y2="132" stroke="var(--text-main)" strokeWidth="2.5"/>

              {/* M02 NODE */}
              <line x1="250" y1="132" x2="250" y2="148" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="245" y1="142" x2="255" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="255" y1="142" x2="245" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Trafo-1', 'M02', '0.62 MW', '5,210 kWh', 'Normal', 'green')}>
                <circle cx="250" cy="162" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="250" y="166" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M02</text>
                
                <rect x="272" y="149" width="125" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="282" cy="162" r="4" fill="#10b981"/>
                <text x="292" y="160" fontSize="10" fontWeight="800" fill="var(--text-main)">0.62 MW</text>
                <text x="292" y="170" fontSize="9" fill="var(--text-muted)">5,210 kWh</text>
              </g>

              {/* M03 NODE */}
              <line x1="770" y1="132" x2="770" y2="148" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="765" y1="142" x2="775" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="775" y1="142" x2="765" y2="152" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Trafo-2', 'M03', '0.59 MW', '4,980 kWh', 'Normal', 'green')}>
                <circle cx="770" cy="162" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="770" y="166" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M03</text>
                
                <rect x="792" y="149" width="125" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="802" cy="162" r="4" fill="#10b981"/>
                <text x="812" y="160" fontSize="10" fontWeight="800" fill="var(--text-main)">0.59 MW</text>
                <text x="812" y="170" fontSize="9" fill="var(--text-muted)">4,980 kWh</text>
              </g>

              {/* BUSBAR LEVEL 2 (JOINING TO M04) */}
              <line x1="250" y1="176" x2="250" y2="192" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="770" y1="176" x2="770" y2="192" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="250" y1="192" x2="770" y2="192" stroke="var(--text-main)" strokeWidth="2.5"/>

              {/* M04 NODE */}
              <line x1="510" y1="192" x2="510" y2="206" stroke="var(--text-main)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Ana AG Birleşim', 'M04', '1.18 MW', '9,860 kWh', 'Normal', 'green')}>
                <circle cx="510" cy="220" r="14" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="510" y="224" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">M04</text>
                
                <rect x="532" y="207" width="125" height="26" rx="13" fill="var(--bg-card)" stroke="var(--border-card)" strokeWidth="1.5"/>
                <circle cx="542" cy="220" r="4" fill="#10b981"/>
                <text x="552" y="218" fontSize="10" fontWeight="800" fill="var(--text-main)">1.18 MW</text>
                <text x="552" y="228" fontSize="9" fill="var(--text-muted)">9,860 kWh</text>
              </g>

              {/* BUSBAR LEVEL 3 (MAIN AG BUSBAR X: 60 to 960 AT Y: 248) */}
              <line x1="510" y1="234" x2="510" y2="248" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="60" y1="248" x2="960" y2="248" stroke="var(--text-main)" strokeWidth="3"/>

              {/* 5 MAIN PANEL NODES (M05 to M09) */}

              {/* M05 Node (Üretim) */}
              <line x1="90" y1="248" x2="90" y2="264" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="85" y1="256" x2="95" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="95" y1="256" x2="85" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Üretim Panosu', 'M05', '0.54 MW', '5,210 kWh', 'Normal', 'green')}>
                <circle cx="90" cy="278" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="90" y="282" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M05</text>
                
                <rect x="108" y="266" width="105" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="116" cy="278" r="3.5" fill="#10b981"/>
                <text x="124" y="275" fontSize="9.5" fontWeight="800" fill="var(--text-main)">0.54 MW</text>
                <text x="124" y="284" fontSize="8.5" fill="var(--text-muted)">5,210 kWh</text>
              </g>

              {/* M06 Node (Fırın) */}
              <line x1="300" y1="248" x2="300" y2="264" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="295" y1="256" x2="305" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="305" y1="256" x2="295" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Fırın Panosu', 'M06', '0.28 MW', '2,230 kWh', 'Normal', 'green')}>
                <circle cx="300" cy="278" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="300" y="282" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M06</text>

                <rect x="318" y="266" width="105" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="326" cy="278" r="3.5" fill="#10b981"/>
                <text x="334" y="275" fontSize="9.5" fontWeight="800" fill="var(--text-main)">0.28 MW</text>
                <text x="334" y="284" fontSize="8.5" fill="var(--text-muted)">2,230 kWh</text>
              </g>

              {/* M07 Node (Kompresör) */}
              <line x1="510" y1="248" x2="510" y2="264" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="505" y1="256" x2="515" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="515" y1="256" x2="505" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Kompresör Panosu', 'M07', '0.15 MW', '1,170 kWh', 'Normal', 'green')}>
                <circle cx="510" cy="278" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="510" y="282" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M07</text>

                <rect x="528" y="266" width="105" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="536" cy="278" r="3.5" fill="#10b981"/>
                <text x="544" y="275" fontSize="9.5" fontWeight="800" fill="var(--text-main)">0.15 MW</text>
                <text x="544" y="284" fontSize="8.5" fill="var(--text-muted)">1,170 kWh</text>
              </g>

              {/* M08 Node (Yardımcı Tesisler) */}
              <line x1="720" y1="248" x2="720" y2="264" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="715" y1="256" x2="725" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="725" y1="256" x2="715" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('Yardımcı Tesisler', 'M08', '0.11 MW', '930 kWh', 'Normal', 'green')}>
                <circle cx="720" cy="278" r="13" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                <text x="720" y="282" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M08</text>

                <rect x="738" y="266" width="105" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="746" cy="278" r="3.5" fill="#10b981"/>
                <text x="754" y="275" fontSize="9.5" fontWeight="800" fill="var(--text-main)">0.11 MW</text>
                <text x="754" y="284" fontSize="8.5" fill="var(--text-muted)">930 kWh</text>
              </g>

              {/* M09 Node (İdari Bina - Uyarı Orange) */}
              <line x1="910" y1="248" x2="910" y2="264" stroke="var(--text-main)" strokeWidth="2"/>
              <line x1="905" y1="256" x2="915" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <line x1="915" y1="256" x2="905" y2="266" stroke="var(--danger)" strokeWidth="2"/>
              <g className="node-group" onClick={() => handleNodeClick('İdari Bina', 'M09', '0.07 MW', '550 kWh', 'Uyarı', 'orange')}>
                <circle cx="910" cy="278" r="13" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <text x="910" y="282" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">M09</text>

                <rect x="928" y="266" width="85" height="24" rx="12" fill="var(--bg-card)" stroke="var(--border-card)"/>
                <circle cx="936" cy="278" r="3.5" fill="#f59e0b"/>
                <text x="944" y="275" fontSize="9.5" fontWeight="800" fill="var(--warning-text)">0.07 MW</text>
                <text x="944" y="284" fontSize="8.5" fill="var(--text-muted)">550 kWh</text>
              </g>

              {/* SUB-BUSBARS & SUB-NODES (M10 to M21) */}
              
              {/* Group 1: under M05 (Üretim) -> M10, M11, M12 */}
              <line x1="90" y1="291" x2="90" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="40" y1="330" x2="140" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              
              <line x1="40" y1="330" x2="40" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="36" y1="338" x2="44" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="44" y1="338" x2="36" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Hat-1', 'M10', '0.18 MW', '1,420 kWh', 'Normal', 'green')}>
                <circle cx="40" cy="358" r="11" fill="#10b981"/>
                <text x="40" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M10</text>
                <text x="40" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.18 MW</text>
                <text x="40" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,420 kWh</text>
              </g>

              <line x1="90" y1="330" x2="90" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="86" y1="338" x2="94" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="94" y1="338" x2="86" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Hat-2', 'M11', '0.20 MW', '1,680 kWh', 'Normal', 'green')}>
                <circle cx="90" cy="358" r="11" fill="#10b981"/>
                <text x="90" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M11</text>
                <text x="90" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.20 MW</text>
                <text x="90" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,680 kWh</text>
              </g>

              <line x1="140" y1="330" x2="140" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="136" y1="338" x2="144" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="144" y1="338" x2="136" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Hat-3', 'M12', '0.16 MW', '1,420 kWh', 'Normal', 'green')}>
                <circle cx="140" cy="358" r="11" fill="#10b981"/>
                <text x="140" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M12</text>
                <text x="140" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.16 MW</text>
                <text x="140" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">1,420 kWh</text>
              </g>

              {/* Group 2: under M06 (Fırın) -> M13, M14 */}
              <line x1="300" y1="291" x2="300" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="260" y1="330" x2="340" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>

              <line x1="260" y1="330" x2="260" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="256" y1="338" x2="264" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="264" y1="338" x2="256" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Fırın-1', 'M13', '0.10 MW', '820 kWh', 'Normal', 'green')}>
                <circle cx="260" cy="358" r="11" fill="#10b981"/>
                <text x="260" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M13</text>
                <text x="260" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.10 MW</text>
                <text x="260" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">820 kWh</text>
              </g>

              <line x1="340" y1="330" x2="340" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="336" y1="338" x2="344" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="344" y1="338" x2="336" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Fırın-2', 'M14', '0.11 MW', '920 kWh', 'Normal', 'green')}>
                <circle cx="340" cy="358" r="11" fill="#10b981"/>
                <text x="340" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M14</text>
                <text x="340" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.11 MW</text>
                <text x="340" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">920 kWh</text>
              </g>

              {/* Group 3: under M07 (Kompresör) -> M15, M16 (Uyarı), M17 (Alarm) */}
              <line x1="510" y1="291" x2="510" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="460" y1="330" x2="560" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>

              <line x1="460" y1="330" x2="460" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="456" y1="338" x2="464" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="464" y1="338" x2="456" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Kompresör-1', 'M15', '0.07 MW', '490 kWh', 'Normal', 'green')}>
                <circle cx="460" cy="358" r="11" fill="#10b981"/>
                <text x="460" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M15</text>
                <text x="460" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.07 MW</text>
                <text x="460" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">490 kWh</text>
              </g>

              <line x1="510" y1="330" x2="510" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="506" y1="338" x2="514" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="514" y1="338" x2="506" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Kompresör-2', 'M16', '0.05 MW', '410 kWh', 'Uyarı', 'orange')}>
                <circle cx="510" cy="358" r="11" fill="#f59e0b"/>
                <text x="510" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M16</text>
                <text x="510" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--warning-text)">0.05 MW</text>
                <text x="510" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">410 kWh</text>
              </g>

              <line x1="560" y1="330" x2="560" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="556" y1="338" x2="564" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="564" y1="338" x2="556" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Kurutma (M17)', 'M17', '0.03 MW', '280 kWh', 'Alarm', 'red')}>
                <circle cx="560" cy="358" r="11" fill="#ef4444"/>
                <text x="560" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M17</text>
                <text x="560" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--danger-text)">0.03 MW</text>
                <text x="560" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">280 kWh</text>
              </g>

              {/* Group 4: under M08 (Yardımcı) -> M18, M19 */}
              <line x1="720" y1="291" x2="720" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="670" y1="330" x2="770" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>

              <line x1="670" y1="330" x2="670" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="666" y1="338" x2="674" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="674" y1="338" x2="666" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Pompa', 'M18', '0.06 MW', '420 kWh', 'Normal', 'green')}>
                <circle cx="670" cy="358" r="11" fill="#10b981"/>
                <text x="670" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M18</text>
                <text x="670" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.06 MW</text>
                <text x="670" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">420 kWh</text>
              </g>

              <line x1="770" y1="330" x2="770" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="766" y1="338" x2="774" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="774" y1="338" x2="766" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('HVAC', 'M19', '0.05 MW', '290 kWh', 'Normal', 'green')}>
                <circle cx="770" cy="358" r="11" fill="#10b981"/>
                <text x="770" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M19</text>
                <text x="770" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.05 MW</text>
                <text x="770" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">290 kWh</text>
              </g>

              {/* Group 5: under M09 (İdari) -> M20, M21 */}
              <line x1="910" y1="291" x2="910" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="870" y1="330" x2="950" y2="330" stroke="var(--text-main)" strokeWidth="1.5"/>

              <line x1="870" y1="330" x2="870" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="866" y1="338" x2="874" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="874" y1="338" x2="866" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Ofis-1', 'M20', '0.04 MW', '290 kWh', 'Normal', 'green')}>
                <circle cx="870" cy="358" r="11" fill="#10b981"/>
                <text x="870" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M20</text>
                <text x="870" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-main)">0.04 MW</text>
                <text x="870" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">290 kWh</text>
              </g>

              <line x1="950" y1="330" x2="950" y2="345" stroke="var(--text-main)" strokeWidth="1.5"/>
              <line x1="946" y1="338" x2="954" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <line x1="954" y1="338" x2="946" y2="346" stroke="var(--danger)" strokeWidth="1.5"/>
              <g className="node-group" onClick={() => handleNodeClick('Ofis-2', 'M21', '0.03 MW', '220 kWh', 'Uyarı', 'orange')}>
                <circle cx="950" cy="358" r="11" fill="#f59e0b"/>
                <text x="950" y="361" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">M21</text>
                <text x="950" y="380" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--warning-text)">0.03 MW</text>
                <text x="950" y="390" textAnchor="middle" fontSize="8" fill="var(--text-muted)">220 kWh</text>
              </g>

            </svg>
          </div>

          {/* STATUS LEGEND FOOTER */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-card)', marginTop: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Normal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Uyarı</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Alarm</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }}></div>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Veri Yok</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: DENGE KONTROL FORMÜLLERİ & HESAPLAMALARI (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Scale size={20} color="var(--primary)" /> SAYAÇ HİYERARŞİSİ &amp; DENGE KONTROL FORMÜLLERİ
            </div>
            <span className="badge badge-neutral" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Dengede (Tolerans ±%3.0)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            
            {/* Equation Card 1 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>M01 ≈ M02 + M03</strong>
                <span className="badge badge-success" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} /> Dengede ✓
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Ana Sayaç (M01):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>10,420 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Alt Sayaç Toplamı (M02+M03):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>10,190 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Fark Miktarı:</span>
                  <span className="mono" style={{ color: 'var(--text-main)' }}>230 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-card)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Fark Oranı:</span>
                  <span className="mono" style={{ color: 'var(--success-text)', fontWeight: 800 }}>%2,21 ✓</span>
                </div>
              </div>
            </div>

            {/* Equation Card 2 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text-main)' }}>M04 ≈ M05+M06+M07+M08+M09</strong>
                <span className="badge badge-warning" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={13} /> Uyarı ⚠️
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Ana Sayaç (M04):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>9,860 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Alt Sayaç Toplamı (M05..M09):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>9,940 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Fark Miktarı:</span>
                  <span className="mono" style={{ color: 'var(--text-main)' }}>-80 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-card)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Fark Oranı:</span>
                  <span className="mono" style={{ color: 'var(--warning-text)', fontWeight: 800 }}>%-0,81 ⚠️</span>
                </div>
              </div>
            </div>

            {/* Equation Card 3 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '10px' }}>
                <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>M05 ≈ M10 + M11 + M12</strong>
                <span className="badge badge-danger" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={13} /> ALARM 🛑
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Ana Sayaç (M05):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>5,210 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Alt Sayaç Toplamı (M10+M11+M12):</span>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>4,520 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Fark Miktarı:</span>
                  <span className="mono" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>690 kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-card)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Fark Oranı:</span>
                  <span className="mono" style={{ color: 'var(--danger-text)', fontWeight: 800 }}>%13,24 🛑</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: DENGE FARKI TRENDİ & OLASI NEDENLER (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="dashboard-grid">
            
            {/* Left: Denge Farkı Trendi Chart (col-span-7) */}
            <div className="col-span-7">
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <Activity size={18} color="var(--primary)" /> Denge Farkı Trendi (%) (1 Saatlik Akış)
                </div>
              </div>
              <div className="chart-container" style={{ height: '240px' }}>
                <Line data={balanceTrendData} options={balanceTrendOptions} />
              </div>
            </div>

            {/* Right: Denge Sapmalarının Olası Nedenleri (col-span-5) */}
            <div className="col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <HelpCircle size={18} color="var(--warning-text)" /> Denge Sapmalarının Olası Nedenleri
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="metric-icon green" style={{ width: '36px', height: '36px' }}><Scale size={18} /></div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>1. Ölçülmeyen Yük</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sayaç kapsamı dışında kalan yükler fark oluşturabilir.</span>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="metric-icon orange" style={{ width: '36px', height: '36px' }}><Sliders size={18} /></div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>2. Sayaç Hatası &amp; Kalibrasyon</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sayaç kalibrasyon hataları veya arızalan sapmalara neden olabilir.</span>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="metric-icon purple" style={{ width: '36px', height: '36px' }}><Activity size={18} /></div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>3. Akım Trafosu Oranı (CT)</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CT oran hataları ölçüm farklılıklarına yol açabilir.</span>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="metric-icon blue" style={{ width: '36px', height: '36px' }}><Wifi size={18} /></div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>4. Haberleşme Problemi</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Veri kaybı veya gecikmeleri geçici dengesizliklere sebep olabilir.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* INTERACTIVE NODE DETAILS MODAL */}
      {selectedNode && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px' }}>
              <div className="card-title" style={{ fontSize: '16px' }}>
                <Network size={20} color="var(--primary)" /> {selectedNode.name} Sayaç Detayı
              </div>
              <button className="btn-close-copilot" onClick={() => setSelectedNode(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${selectedNode.type === 'red' ? 'badge-danger' : (selectedNode.type === 'orange' ? 'badge-warning' : 'badge-success')}`} style={{ fontSize: '12px', padding: '6px 12px' }}>
                  {selectedNode.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Modbus Adresi: 0x4B
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Anlık Aktif Güç</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>{selectedNode.power}</div>
                </div>

                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Toplam Enerji Tüketimi</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>{selectedNode.energy}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-card)' }}>
              <button 
                className="btn btn-primary" 
                style={{ fontSize: '12px', padding: '8px 16px' }}
                onClick={() => {
                  const prompt = `${selectedNode.name} sayacı için denge ve sapma analizi yap`;
                  setSelectedNode(null);
                  openCopilotWithPrompt(prompt);
                }}
              >
                <Sparkles size={14} /> AI ile İncele
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
