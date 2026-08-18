import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement,
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { 
  Zap, 
  Flame, 
  Droplet, 
  Banknote, 
  Leaf, 
  AlertTriangle, 
  Boxes, 
  TrendingDown, 
  TrendingUp, 
  LineChart, 
  PieChart as PieIcon, 
  Building2, 
  BellRing, 
  ArrowRight, 
  AlertCircle, 
  Gauge 
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement,
  Tooltip, 
  Legend, 
  Filler
);

export default function DashboardView() {
  const { setActiveView, theme } = useTheme();

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  // Energy Density Line Chart Data
  const energyDensityData = {
    labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
    datasets: [
      {
        label: 'kWh/ton',
        data: [415, 385, 350, 320, 318, 298, 342.6],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 4
      },
      {
        label: '7 Günlük Ort.',
        data: [380, 375, 360, 350, 340, 335, 332],
        borderColor: '#64748b',
        borderDash: [4, 4],
        borderWidth: 1.5,
        pointRadius: 0
      }
    ]
  };

  // Cost Density Line Chart Data
  const costDensityData = {
    labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
    datasets: [
      {
        label: 'TL/ton',
        data: [305, 280, 255, 228, 205, 182, 186.7],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#8b5cf6',
        pointRadius: 4
      }
    ]
  };

  // Consumption Donut Data
  const donutData = {
    labels: ['Elektrik (%61,2)', 'Doğalgaz (%27,4)', 'Su (%8,6)', 'Basınçlı Hava (%2,8)'],
    datasets: [
      {
        data: [765, 342, 108, 35],
        backgroundColor: ['#3b82f6', '#f97316', '#06b6d4', '#10b981'],
        borderWidth: 3,
        borderColor: 'transparent'
      }
    ]
  };

  // Line Density Bar Data
  const barData = {
    labels: ['Hat-1', 'Hat-2', 'Hat-3'],
    datasets: [
      {
        label: 'kWh/ton',
        data: [312.5, 356.8, 318.6],
        backgroundColor: ['#3b82f6', '#ea580c', '#10b981'],
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="module-view active">
      {/* Top Metrics Cards Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Elektrik Yoğunluğu</span>
            <div className="metric-icon blue"><Zap size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">342,6</span>
            <span className="metric-unit">kWh/ton</span>
          </div>
          <div className="metric-subtext">
            <span className="trend-down"><TrendingDown size={14} style={{ display: 'inline' }} /> %6,8</span> dün 367,7 kWh/ton
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Doğalgaz Yoğunluğu</span>
            <div className="metric-icon orange"><Flame size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">21,8</span>
            <span className="metric-unit">Sm³/ton</span>
          </div>
          <div className="metric-subtext">
            <span className="trend-down"><TrendingDown size={14} style={{ display: 'inline' }} /> %4,3</span> dün 22,8 Sm³/ton
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Su Yoğunluğu</span>
            <div className="metric-icon cyan"><Droplet size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">0,86</span>
            <span className="metric-unit">m³/ton</span>
          </div>
          <div className="metric-subtext">
            <span className="trend-down"><TrendingDown size={14} style={{ display: 'inline' }} /> %5,1</span> dün 0,91 m³/ton
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Enerji Maliyeti</span>
            <div className="metric-icon purple"><Banknote size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">186,7</span>
            <span className="metric-unit">TL/ton</span>
          </div>
          <div className="metric-subtext">
            <span className="trend-down"><TrendingDown size={14} style={{ display: 'inline' }} /> %7,2</span> dün 201,3 TL/ton
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Karbon Yoğunluğu</span>
            <div className="metric-icon green"><Leaf size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">142,3</span>
            <span className="metric-unit">kg CO₂e/ton</span>
          </div>
          <div className="metric-subtext">
            <span className="trend-down"><TrendingDown size={14} style={{ display: 'inline' }} /> %6,4</span> dün 152,1 kg CO₂e/ton
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Aktif Anomali</span>
            <div className="metric-icon red"><AlertTriangle size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--danger-text)' }}>3</span>
            <span className="metric-unit">adet</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)' }}>
            2 kritik + 1 uyarı
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Daily Production */}
        <div className="card col-span-3">
          <div className="card-header">
            <div className="card-title"><Boxes size={18} /> Günlük Üretim</div>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-main)' }}>
            80 <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-muted)' }}>ton</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hedef: 100 ton</div>
          <div style={{ width: '100%', background: 'var(--bg-input)', height: '10px', borderRadius: '999px', overflow: 'hidden', marginTop: '6px' }}>
            <div style={{ width: '80%', background: 'linear-gradient(90deg, var(--primary), var(--primary-hover))', height: '100%', borderRadius: '999px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Dün 76 ton</span>
            <span className="trend-down"><TrendingUp size={14} style={{ display: 'inline' }} /> %5,3</span>
          </div>
        </div>

        {/* Energy Density Trend Chart */}
        <div className="card col-span-5">
          <div className="card-header">
            <div className="card-title"><LineChart size={18} /> Enerji Yoğunluğu (kWh/ton)</div>
          </div>
          <div className="chart-container">
            <Line data={energyDensityData} options={commonOptions} />
          </div>
        </div>

        {/* Cost Density Trend Chart */}
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><TrendingUp size={18} /> Maliyet Yoğunluğu (TL/ton)</div>
          </div>
          <div className="chart-container">
            <Line data={costDensityData} options={commonOptions} />
          </div>
        </div>

        {/* Consumption Donut */}
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><PieIcon size={18} /> Tüketim Dağılımı (kWh eşdeğeri)</div>
          </div>
          <div className="chart-container">
            <Doughnut 
              data={donutData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { legend: { position: 'bottom', labels: { color: textColor } } } 
              }} 
            />
          </div>
        </div>

        {/* Line Energy Density Bar */}
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><Building2 size={18} /> Hat Bazlı Enerji Yoğunluğu</div>
          </div>
          <div className="chart-container">
            <Bar data={barData} options={commonOptions} />
          </div>
        </div>

        {/* Recent Anomalies Widget */}
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title"><BellRing size={18} /> Son Anomaliler</div>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '11px', padding: '5px 10px' }}
              onClick={() => setActiveView('anomaliler')}
            >
              Tümünü Gör <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--danger-bg)', borderLeft: '4px solid var(--danger)', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--danger-text)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle size={14} /> Hat-2 Doğalgaz Yoğunluğu Yüksek</span>
                <span className="mono">10:21</span>
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Doğalgaz yoğunluğu 28.7 Sm³/ton ile eşik değerin %32 üzerinde.</div>
            </div>

            <div style={{ background: 'var(--danger-bg)', borderLeft: '4px solid var(--danger)', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--danger-text)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Gauge size={14} /> Kompresör-2 Basınç Düşük</span>
                <span className="mono">10:15</span>
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Basınç 4,1 bar ile minimum eşik değerin altında.</div>
            </div>

            <div style={{ background: 'var(--warning-bg)', borderLeft: '4px solid var(--warning)', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--warning-text)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> Hat-1 Enerji Yoğunluğu Arttı</span>
                <span className="mono">09:58</span>
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Enerji yoğunluğu son 1 saatte %12 arttı.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
