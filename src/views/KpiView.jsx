import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { 
  Zap, 
  Flame, 
  Droplet, 
  Banknote, 
  Leaf, 
  Wind, 
  TrendingDown, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Sparkles,
  CheckCircle2,
  Award,
  Target
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Legend
);

export default function KpiView() {
  const { theme, openCopilotWithPrompt } = useTheme();

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  // Chart 1: Time Series Density Trends (Elektrik, Doğalgaz, Su)
  const densityTrendData = {
    labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
    datasets: [
      {
        label: 'Elektrik (kWh/ton)',
        data: [395, 372, 348, 332, 336, 321, 328],
        borderColor: '#2563eb',
        borderWidth: 2.5,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4,
        tension: 0.3
      },
      {
        label: 'Doğalgaz (Sm³/ton)',
        data: [64, 61, 56, 58, 54, 55, 54],
        borderColor: '#f59e0b',
        borderWidth: 2.5,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4,
        tension: 0.3
      },
      {
        label: 'Su (m³/ton x 10)',
        data: [9.2, 8.8, 8.4, 8.1, 7.8, 7.6, 7.5],
        borderColor: '#06b6d4',
        borderWidth: 2.5,
        pointBackgroundColor: '#06b6d4',
        pointRadius: 4,
        tension: 0.3
      }
    ]
  };

  const densityTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1400,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
      }
    },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { color: gridColor } },
      y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { color: gridColor } }
    }
  };

  // Chart 2: Product Type Density Comparison Bar Chart
  const productBarData = {
    labels: ['Çelik', 'Alüminyum', 'Plastik', 'Döküm'],
    datasets: [
      {
        label: 'kWh/ton',
        data: [412.5, 368.9, 278.4, 335.7],
        backgroundColor: '#2563eb',
        borderRadius: 6
      }
    ]
  };

  const productBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1400,
      easing: 'easeOutQuart'
    },
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { display: false } },
      y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { color: gridColor } }
    }
  };

  // Chart 3: Scatter Production (Ton) vs Electricity Consumption (kWh)
  const scatterData = {
    datasets: [
      {
        label: 'Gözlemlenen Üretim / Tüketim Çiftleri',
        data: [
          { x: 150, y: 48000 },
          { x: 250, y: 62000 },
          { x: 380, y: 88000 },
          { x: 450, y: 102000 },
          { x: 520, y: 120000 },
          { x: 620, y: 145000 },
          { x: 740, y: 162000 },
          { x: 860, y: 194000 },
          { x: 950, y: 210000 },
          { x: 1120, y: 236000 }
        ],
        backgroundColor: '#2563eb',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1400,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { 
        title: { display: true, text: 'Üretim Miktarı (Ton)', color: textColor, font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' } }, 
        ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, 
        grid: { color: gridColor } 
      },
      y: { 
        title: { display: true, text: 'Elektrik Tüketimi (kWh)', color: textColor, font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' } }, 
        ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }, 
        grid: { color: gridColor } 
      }
    }
  };

  return (
    <div className="module-view active">
      
      {/* 6 TOP EXECUTIVE KPI METRIC CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        
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
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 358,7</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %4,5</span>
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
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 23,1</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %5,6</span>
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
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 0,94</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %8,5</span>
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
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 201,3</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %7,2</span>
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
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 152,1</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %6,4</span>
          </div>
        </div>

        {/* Card 6: Basınçlı Hava Verimi */}
        <div className="metric-card" style={{ padding: '18px 20px', gap: '8px' }}>
          <div className="metric-header" style={{ fontSize: '12px' }}>
            <span>Basınçlı Hava Verimi</span>
            <div className="metric-icon blue" style={{ width: '32px', height: '32px' }}><Wind size={16} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ fontSize: '26px' }}>6,42</span>
            <span className="metric-unit" style={{ fontSize: '10px' }}>kWh/1000Nm³</span>
          </div>
          <div className="metric-subtext" style={{ fontSize: '11px', justifyContent: 'space-between' }}>
            <span>Geçen Ay: 6,89</span>
            <span className="trend-down" style={{ fontWeight: 700 }}><TrendingDown size={13} style={{ display: 'inline' }} /> %6,8</span>
          </div>
        </div>

      </div>

      {/* VERTICALLY STACKED FULL-WIDTH DASHBOARD SECTIONS */}
      <div className="dashboard-grid">
        
        {/* SECTION 1: KPI KARŞILAŞTIRMA & HEDEF SAPMA TABLOSU (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Target size={20} color="var(--primary)" /> KPI KARŞILAŞTIRMA &amp; ISO 50001 HEDEF SAPMA TABLOSU
            </div>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
              ● TÜM HEDEFLER BAŞARILI (HEDEF ALTINDA KAZANÇ)
            </span>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Enerji &amp; Performans KPI Metriği</th>
                  <th>Gerçekleşen</th>
                  <th>Hedef</th>
                  <th>Hedef Sapması</th>
                  <th>Geçen Ay</th>
                  <th>Aylık Değişim</th>
                  <th>ISO 50001 Statüsü</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="var(--primary)" /> Elektrik Yoğunluğu (kWh/ton)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>342,6</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>350,0</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %2,1</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>358,7</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %4,5</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Flame size={16} color="#f59e0b" /> Doğalgaz Yoğunluğu (Sm³/ton)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>21,8</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>23,0</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %5,2</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>23,1</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %5,6</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Droplet size={16} color="#06b6d4" /> Su Yoğunluğu (m³/ton)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>0,86</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>0,95</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %9,5</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>0,94</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %8,5</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Banknote size={16} color="#7c3aed" /> Enerji Maliyeti (TL/ton)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>186,7</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>200,0</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %6,7</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>201,3</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %7,2</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Leaf size={16} color="#10b981" /> Karbon Yoğunluğu (kg CO₂e/ton)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>142,3</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>150,0</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %5,1</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>152,1</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %6,4</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Wind size={16} color="#0284c7" /> Basınçlı Hava Verimi (kWh/1000 Nm³)
                    </strong>
                  </td>
                  <td className="mono" style={{ fontWeight: 700 }}>6,42</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>6,80</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %5,6</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>6,89</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>↓ %6,8</td>
                  <td><span className="badge badge-success">● Hedef Ulaşıldı ✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
            * Hedefler ISO 50001 Enerji Yönetim Sistemi yıllık performans kriterlerine göre değerlendirilmektedir.
          </div>
        </div>

        {/* SECTION 2: YOĞUNLUK TRENDLERİ & ÜRÜN BAZLI DAĞILIM (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="dashboard-grid">
            
            {/* Left: Yoğunluk Trendleri Line Chart (col-span-7) */}
            <div className="col-span-7">
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <Activity size={18} color="var(--primary)" /> Yoğunluk Trendleri (Zaman Serisi)
                </div>
              </div>
              <div className="chart-container" style={{ height: '240px' }}>
                <Line key={`kpi-density-${isLight}`} data={densityTrendData} options={densityTrendOptions} />
              </div>
            </div>

            {/* Right: Ürün Grubu Yoğunluk Bar Chart (col-span-5) */}
            <div className="col-span-5">
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <BarChart3 size={18} color="var(--primary)" /> Ürün Grubu Bazında Elektrik Yoğunluğu
                </div>
              </div>
              <div className="chart-container" style={{ height: '240px' }}>
                <Bar key={`kpi-bar-${isLight}`} data={productBarData} options={productBarOptions} />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: KORELASYON ANALİZİ & AI PERFORMANS REÇETESİ (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="dashboard-grid">
            
            {/* Left: Scatter Chart Production vs Energy Consumption (col-span-7) */}
            <div className="col-span-7">
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <Activity size={18} color="var(--primary)" /> Üretim vs Enerji Tüketimi Korelasyon Analizi
                </div>
                <span className="badge badge-info" style={{ fontSize: '11px', padding: '6px 10px' }}>
                  Korelasyon (R): 0,87 (Pozitif Güçlü İlişki)
                </span>
              </div>
              <div className="chart-container" style={{ height: '240px' }}>
                <Scatter key={`kpi-scatter-${isLight}`} data={scatterData} options={scatterOptions} />
              </div>
            </div>

            {/* Right: AI Performance Optimization Recipe Card (User Extra) (col-span-5) */}
            <div className="col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="card-header">
                <div className="card-title" style={{ fontSize: '15px' }}>
                  <Sparkles size={18} color="var(--primary)" /> AI Performans Reçetesi
                </div>
              </div>

              <div style={{ padding: '16px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--success-text)" />
                  <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>Optimum Üretim Vardiyası Tespiti</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Plastik grubu üretim hattında <strong>00:00 - 08:00 gece vardiyasında</strong> birim elektrik tüketimi <strong>%12 daha düşük</strong> gerçekleşmektedir.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-card)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--success-text)', fontWeight: 700 }}>Tahmini Tasarruf: ₺42.000/ay</span>
                  <button 
                    className="btn btn-primary" 
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                    onClick={() => openCopilotWithPrompt('KPI verimliliği ve gece vardiyası optimizasyon planı hazırla')}
                  >
                    <Sparkles size={13} /> Reçeteyi Uygula
                  </button>
                </div>
              </div>

              <div style={{ padding: '16px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>ISO 50001 Yıllık Hedef İlerlemesi:</span>
                  <strong style={{ color: 'var(--success-text)' }}>%94,2 Tamamlandı</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '94.2%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
