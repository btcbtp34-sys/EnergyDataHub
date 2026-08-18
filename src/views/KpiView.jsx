import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Chart as ChartJS, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Zap, Flame, Droplet, Banknote, Leaf } from 'lucide-react';

ChartJS.register(LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function KpiView() {
  const { theme } = useTheme();

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const productBarData = {
    labels: ['Çelik', 'Alüminyum', 'Plastik', 'Döküm'],
    datasets: [
      {
        label: 'kWh/ton',
        data: [412.5, 368.9, 278.4, 335.7],
        backgroundColor: '#3b82f6',
        borderRadius: 8
      }
    ]
  };

  const scatterData = {
    datasets: [
      {
        label: 'Tüketim vs Üretim Korelasyonu',
        data: [
          { x: 200, y: 50000 },
          { x: 400, y: 95000 },
          { x: 600, y: 130000 },
          { x: 800, y: 165000 },
          { x: 1000, y: 190000 },
          { x: 1200, y: 220000 }
        ],
        backgroundColor: '#3b82f6',
        pointRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        title: { display: true, text: 'Üretim (Ton)', color: textColor }, 
        ticks: { color: textColor }, 
        grid: { color: gridColor } 
      },
      y: { 
        title: { display: true, text: 'Elektrik Tüketimi (kWh)', color: textColor }, 
        ticks: { color: textColor }, 
        grid: { color: gridColor } 
      }
    }
  };

  return (
    <div className="module-view active">
      <div className="dashboard-grid">
        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title"><BarChart3 size={18} /> Ürün Grubu Bazında Elektrik Yoğunluğu</div>
          </div>
          <div className="chart-container">
            <Bar data={productBarData} options={barOptions} />
          </div>
        </div>

        <div className="card col-span-6">
          <div className="card-header">
            <div className="card-title"><TrendingUp size={18} /> Üretim vs Enerji Tüketimi Korelasyonu</div>
          </div>
          <div className="chart-container">
            <Scatter data={scatterData} options={scatterOptions} />
          </div>
        </div>

        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><BarChart3 size={18} /> KPI Karşılaştırma Tablosu</div>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>KPI Tanımı</th>
                  <th>Gerçekleşen</th>
                  <th>Hedef</th>
                  <th>Sapma (%)</th>
                  <th>Geçen Ay</th>
                  <th>Aylık Değişim</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Zap size={14} color="var(--primary)" /> Elektrik Yoğunluğu (kWh/ton)</span></td>
                  <td className="mono">342.6</td>
                  <td className="mono">350.0</td>
                  <td className="mono trend-down">↓ %2.1</td>
                  <td className="mono">358.7</td>
                  <td className="mono trend-down">↓ %4.5</td>
                </tr>
                <tr>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Flame size={14} color="#f97316" /> Doğalgaz Yoğunluğu (Sm³/ton)</span></td>
                  <td className="mono">21.8</td>
                  <td className="mono">23.0</td>
                  <td className="mono trend-down">↓ %5.2</td>
                  <td className="mono">23.1</td>
                  <td className="mono trend-down">↓ %5.6</td>
                </tr>
                <tr>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Droplet size={14} color="var(--info-text)" /> Su Yoğunluğu (m³/ton)</span></td>
                  <td className="mono">0.86</td>
                  <td className="mono">0.95</td>
                  <td className="mono trend-down">↓ %9.5</td>
                  <td className="mono">0.94</td>
                  <td className="mono trend-down">↓ %8.5</td>
                </tr>
                <tr>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Banknote size={14} color="var(--purple-text)" /> Enerji Maliyeti (TL/ton)</span></td>
                  <td className="mono">186.7</td>
                  <td className="mono">200.0</td>
                  <td className="mono trend-down">↓ %6.7</td>
                  <td className="mono">201.3</td>
                  <td className="mono trend-down">↓ %7.2</td>
                </tr>
                <tr>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Leaf size={14} color="var(--success-text)" /> Karbon Yoğunluğu (kg CO₂e/ton)</span></td>
                  <td className="mono">142.3</td>
                  <td className="mono">150.0</td>
                  <td className="mono trend-down">↓ %5.1</td>
                  <td className="mono">152.1</td>
                  <td className="mono trend-down">↓ %6.4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
