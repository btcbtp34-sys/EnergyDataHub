import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
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
import { 
  Zap, 
  Flame, 
  Droplet, 
  Banknote, 
  Leaf, 
  Bell, 
  AlertTriangle, 
  TrendingDown, 
  Activity, 
  PieChart, 
  Sparkles,
  Layers,
  ChevronRight
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
  const { theme, openCopilotWithPrompt, setActiveView } = useTheme();
  const [trendMetric, setTrendMetric] = useState('energy'); // 'energy' or 'cost'
  const [distributionTab, setDistributionTab] = useState('type'); // 'type' or 'lines'

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  // Main Hero Trend Chart Data
  const energyTrendData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'Elektrik Yoğunluğu (kWh/ton)',
        data: [362.4, 355.0, 348.2, 342.6, 339.8, 341.2, 342.6],
        borderColor: '#2563eb',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4,
        pointHoverRadius: 7
      },
      {
        label: 'Aylık Hedef (350 kWh/ton)',
        data: [350, 350, 350, 350, 350, 350, 350],
        borderColor: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
        borderDash: [6, 6],
        fill: false,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  };

  const costTrendData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'BirimÜrün Maliyeti (TL/ton)',
        data: [208.5, 201.3, 195.4, 186.7, 184.2, 185.0, 186.7],
        borderColor: '#7c3aed',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(124, 58, 237, 0.25)');
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#7c3aed',
        pointRadius: 4,
        pointHoverRadius: 7
      }
    ]
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
      },
      tooltip: {
        backgroundColor: isLight ? '#0f172a' : '#1e293b',
        titleFont: { family: 'Plus Jakarta Sans', size: 13, weight: '700' },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { color: gridColor } },
      y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { color: gridColor } }
    }
  };

  // Distribution Chart Data
  const energyTypeData = {
    labels: ['Elektrik', 'Doğalgaz', 'Su'],
    datasets: [
      {
        data: [61, 28, 11],
        backgroundColor: ['#2563eb', '#f59e0b', '#06b6d4'],
        borderWidth: 0,
        hoverOffset: 6
      }
    ]
  };

  const lineDensityData = {
    labels: ['Hat-1 Döküm', 'Hat-2 İşleme', 'Hat-3 Montaj', 'Hat-4 Paketleme'],
    datasets: [
      {
        label: 'Tüketim (Sm³/ton)',
        data: [21.4, 28.7, 16.2, 12.8],
        backgroundColor: ['#2563eb', '#ef4444', '#10b981', '#7c3aed'],
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="module-view active">
      {/* 6 EXECUTIVE KPI METRIC CARDS ROW */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Elektrik Yoğunluğu */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Elektrik Yoğunluğu</span>
            <div className="metric-icon blue" style={{ width: '32px', height: '32px' }}><Zap size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>342,6</span>
            <span className="metric-unit" style={{ fontSize: '11px' }}>kWh/ton</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span className="trend-down"><TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} /> %6,8</span>
            <span>dün 367,7</span>
          </div>
        </div>

        {/* Card 2: Doğalgaz Yoğunluğu */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Doğalgaz Yoğunluğu</span>
            <div className="metric-icon orange" style={{ width: '32px', height: '32px' }}><Flame size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>21,8</span>
            <span className="metric-unit" style={{ fontSize: '11px' }}>Sm³/ton</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span className="trend-down"><TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} /> %4,3</span>
            <span>dün 22,8</span>
          </div>
        </div>

        {/* Card 3: Su Yoğunluğu */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Su Yoğunluğu</span>
            <div className="metric-icon cyan" style={{ width: '32px', height: '32px' }}><Droplet size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>0,86</span>
            <span className="metric-unit" style={{ fontSize: '11px' }}>m³/ton</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span className="trend-down"><TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} /> %5,1</span>
            <span>dün 0,91</span>
          </div>
        </div>

        {/* Card 4: Enerji Maliyeti */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Enerji Maliyeti</span>
            <div className="metric-icon purple" style={{ width: '32px', height: '32px' }}><Banknote size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>186,7</span>
            <span className="metric-unit" style={{ fontSize: '11px' }}>TL/ton</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span className="trend-down"><TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} /> %7,2</span>
            <span>dün 201,3</span>
          </div>
        </div>

        {/* Card 5: Karbon Yoğunluğu */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Karbon Yoğunluğu</span>
            <div className="metric-icon green" style={{ width: '32px', height: '32px' }}><Leaf size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>142,3</span>
            <span className="metric-unit" style={{ fontSize: '10px' }}>kg CO₂e/ton</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span className="trend-down"><TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} /> %6,4</span>
            <span>dün 152,1</span>
          </div>
        </div>

        {/* Card 6: Aktif Anomali */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Aktif Anomali</span>
            <div className="metric-icon red" style={{ width: '32px', height: '32px' }}><Bell size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px', color: 'var(--danger-text)' }}>5</span>
            <span className="metric-unit" style={{ fontSize: '11px' }}>Sapma</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px' }}>
            <span style={{ color: 'var(--danger-text)', fontWeight: 700 }}>1 kritik</span> + 2 yüksek + 2 orta
          </div>
        </div>

      </div>

      {/* MAIN HERO INTERACTIVE CHART (col-span-12) */}
      <div className="card col-span-12">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="card-title">
            <Activity size={20} /> Kurumsal Enerji &amp; Maliyet Performans Trendi
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Metric Tab Pills */}
            <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: '10px', gap: '4px' }}>
              <button 
                className={`tab-pill-btn ${trendMetric === 'energy' ? 'active' : ''}`}
                onClick={() => setTrendMetric('energy')}
              >
                <Zap size={14} style={{ display: 'inline', marginRight: '4px' }} /> Enerji Yoğunluğu
              </button>
              <button 
                className={`tab-pill-btn ${trendMetric === 'cost' ? 'active' : ''}`}
                onClick={() => setTrendMetric('cost')}
              >
                <Banknote size={14} style={{ display: 'inline', marginRight: '4px' }} /> Birim Maliyet
              </button>
            </div>

            {/* Time Filter Pills */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>Son 7 Gün</button>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }}>Son 30 Gün</button>
            </div>
          </div>
        </div>

        <div className="chart-container" style={{ height: '320px' }}>
          <Line 
            data={trendMetric === 'energy' ? energyTrendData : costTrendData} 
            options={trendChartOptions} 
          />
        </div>
      </div>

      {/* BOTTOM SPLIT SECTION (col-span-12) */}
      <div className="dashboard-grid">
        {/* Left: Tüketim Dağılımı (col-span-7) */}
        <div className="card col-span-7">
          <div className="card-header">
            <div className="card-title">
              <PieChart size={18} /> Tüketim Dağılımı &amp; Hat Analizi
            </div>
            <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: '8px', gap: '4px' }}>
              <button 
                className={`tab-pill-btn ${distributionTab === 'type' ? 'active' : ''}`}
                onClick={() => setDistributionTab('type')}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                Enerji Türü
              </button>
              <button 
                className={`tab-pill-btn ${distributionTab === 'lines' ? 'active' : ''}`}
                onClick={() => setDistributionTab('lines')}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                Hat Bazlı
              </button>
            </div>
          </div>

          {distributionTab === 'type' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '240px', flexWrap: 'wrap' }}>
              <div style={{ width: '200px', height: '200px' }}>
                <Doughnut 
                  data={energyTypeData} 
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2563eb' }}></div>
                  <span style={{ color: 'var(--text-muted)' }}>Elektrik Tüketimi:</span>
                  <strong style={{ color: 'var(--text-main)' }}>%61 (27,4 MWh)</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }}></div>
                  <span style={{ color: 'var(--text-muted)' }}>Doğalgaz Tüketimi:</span>
                  <strong style={{ color: 'var(--text-main)' }}>%28 (2.296 Sm³)</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#06b6d4' }}></div>
                  <span style={{ color: 'var(--text-muted)' }}>Su Tüketimi:</span>
                  <strong style={{ color: 'var(--text-main)' }}>%11 (180 m³)</strong>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '240px' }}>
              <Bar 
                data={lineDensityData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: textColor }, grid: { display: false } },
                    y: { ticks: { color: textColor }, grid: { color: gridColor } }
                  }
                }} 
              />
            </div>
          )}
        </div>

        {/* Right: Kritik Sapma ve Aksiyon Akışı (col-span-5) */}
        <div className="card col-span-5">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={18} color="var(--warning-text)" /> Kritik Sapma ve Aksiyonlar
            </div>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '11px', padding: '4px 10px' }}
              onClick={() => setActiveView('anomaliler')}
            >
              Tüm Anomaliler <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--danger-text)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flame size={16} /> Hat-2 Doğalgaz Yoğunluğu
                </strong>
                <span className="badge badge-danger">Yüksek Sapma</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Anlık tüketim <strong>28,7 Sm³/ton</strong> seviyesindedir. İzin verilen maksimum limitin %32 üzerindedir.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(239, 68, 68, 0.15)' }}>
                <span style={{ fontSize: '11px', color: 'var(--danger-text)', fontWeight: 700 }}>Finansal Etki: ₺217,800/ay</span>
                <button 
                  className="btn btn-primary" 
                  style={{ fontSize: '11px', padding: '4px 10px', background: 'var(--danger)', borderColor: 'var(--danger)' }}
                  onClick={() => openCopilotWithPrompt('Hat-2 doğalgaz anomalisi için aksiyon oluştur')}
                >
                  <Sparkles size={13} /> AI ile Çöz
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--warning-bg)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--warning-text)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={16} /> Kompresör-2 Basınç Düşüşü
                </strong>
                <span className="badge badge-warning">Kaçak Riski</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Çıkış basıncı <strong>4,1 bar</strong> seviyesinde. Hatlarda muhtemel hava kaçakları tespit edildi.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(245, 158, 11, 0.15)' }}>
                <span style={{ fontSize: '11px', color: 'var(--warning-text)', fontWeight: 700 }}>Finansal Etki: ₺148,300/ay</span>
                <button 
                  className="btn btn-outline" 
                  style={{ fontSize: '11px', padding: '4px 10px' }}
                  onClick={() => openCopilotWithPrompt('Kompresör hava kaçakları analizi')}
                >
                  <Sparkles size={13} /> İncele
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
