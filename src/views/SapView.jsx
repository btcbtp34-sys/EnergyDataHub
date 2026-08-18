import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { 
  Cloud, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Link as LinkIcon, 
  FileText, 
  FileCheck, 
  Download, 
  Mail, 
  RefreshCw, 
  Filter, 
  Sliders, 
  TrendingUp, 
  Leaf, 
  AlertTriangle,
  BarChart2
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend
);

// Custom SVG Icons for PDF and Excel
const PdfIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ef4444', display: 'inline' }}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M9 13h2a1.5 1.5 0 0 0 0-3H9v5"/>
    <path d="M15 13v2"/>
  </svg>
);

const ExcelIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981', display: 'inline' }}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M8 13l4 4"/>
    <path d="M12 13l-4 4"/>
  </svg>
);

export default function SapView() {
  const { theme, showNotification } = useTheme();

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const handleDownload = (reportName, format) => {
    showNotification(
      'Rapor Dışa Aktarıldı',
      `${reportName} başarıyla ${format} formatında yüksek çözünürlükte indirildi!`,
      'success'
    );
  };

  const handleSendEmail = (reportName) => {
    showNotification(
      'E-posta İletildi',
      `${reportName} kurumsal e-posta adresinize (hasan.kocak@btc.com.tr) başarıyla gönderildi.`,
      'info'
    );
  };

  // Integration volume combo chart data
  const volumeChartData = {
    labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
    datasets: [
      {
        type: 'line',
        label: 'Bekleyen Kayıt',
        data: [180, 210, 240, 480, 310, 150, 216],
        borderColor: '#3b82f6',
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 5,
        fill: false
      },
      {
        type: 'bar',
        label: 'Başarılı Kayıt (12.842)',
        data: [12102, 11653, 12341, 12870, 12245, 12102, 12842],
        backgroundColor: '#10b981',
        borderRadius: 8
      },
      {
        type: 'bar',
        label: 'Hatalı Kayıt (178)',
        data: [140, 112, 160, 210, 135, 120, 178],
        backgroundColor: '#ef4444',
        borderRadius: 8
      }
    ]
  };

  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1400,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
      }
    },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { display: false } },
      y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { color: gridColor } }
    }
  };

  return (
    <div className="module-view active">
      {/* 4 SUMMARY METRIC CARDS (Top Row) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Son SAP Aktarımı</span>
            <div className="metric-icon blue"><Cloud size={20} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">10:22</span>
          </div>
          <div className="metric-subtext">
            <span>15 May 2025</span>
            <span className="badge badge-success" style={{ marginLeft: 'auto' }}>● Başarılı</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Başarılı Kayıt</span>
            <div className="metric-icon green"><CheckCircle2 size={20} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--success-text)' }}>12.842</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--success-text)', fontWeight: 600 }}>
            <span>%98,6 Başarı Oranı</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Hatalı Kayıt</span>
            <div className="metric-icon red"><XCircle size={20} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--danger-text)' }}>178</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)', fontWeight: 600 }}>
            <span>%1,4 (Kuyrukta Yeniden Deneniyor)</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Zamanlanmış Raporlar</span>
            <div className="metric-icon purple"><Calendar size={20} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">4</span>
            <span className="metric-unit">Otomatik Rapor</span>
          </div>
          <div className="metric-subtext">
            <span>Son Otomatik Rapor: 09:30</span>
          </div>
        </div>
      </div>

      {/* VERTICALLY STACKED FULL-WIDTH SECTIONS (col-span-12) */}
      <div className="dashboard-grid">
        
        {/* SECTION 1: Kurumsal Raporlama Merkezi (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <FileText size={20} color="var(--primary)" /> Kurumsal Raporlama &amp; İndirme Merkezi
            </div>
            <span className="badge badge-info" style={{ fontSize: '12px', padding: '6px 12px' }}>
              ISO 50001 &amp; ISO 14064 Uyumlu
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '4px' }}>
            
            {/* Report Card 1 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="metric-icon blue" style={{ width: '40px', height: '40px' }}><FileCheck size={20} /></div>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'block' }}>Günlük Enerji Raporu</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sıklık: Günlük Otomatik (09:30)</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Günlük tesis bazlı elektrik, doğalgaz ve su tüketimi, üretim miktarları ve yoğunluk özet verilerini içerir.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Günlük Enerji Raporu', 'PDF')}>
                  <PdfIcon size={16} /> PDF
                </button>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Günlük Enerji Raporu', 'Excel')}>
                  <ExcelIcon size={16} /> Excel
                </button>
                <button className="btn btn-outline" style={{ padding: '9px 14px', fontSize: '12px' }} onClick={() => handleSendEmail('Günlük Enerji Raporu')}>
                  <Mail size={16} color="var(--primary)" /> E-posta
                </button>
              </div>
            </div>

            {/* Report Card 2 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="metric-icon green" style={{ width: '40px', height: '40px' }}><TrendingUp size={20} /></div>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'block' }}>Aylık KPI &amp; Performans Raporu</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sıklık: Aylık (Her Ayın 1. Günü)</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Aylık spesifik enerji tüketimi (SEC), hedef sapmaları ve finansal verimlilik analizlerini içerir.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Aylık KPI Raporu', 'PDF')}>
                  <PdfIcon size={16} /> PDF
                </button>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Aylık KPI Raporu', 'Excel')}>
                  <ExcelIcon size={16} /> Excel
                </button>
                <button className="btn btn-outline" style={{ padding: '9px 14px', fontSize: '12px' }} onClick={() => handleSendEmail('Aylık KPI Raporu')}>
                  <Mail size={16} color="var(--primary)" /> E-posta
                </button>
              </div>
            </div>

            {/* Report Card 3 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="metric-icon cyan" style={{ width: '40px', height: '40px' }}><Leaf size={20} /></div>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'block' }}>CO₂ Karbon Emisyon Raporu</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Standart: ISO 14064 / GHG Protocol</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Kapsam 1 ve Kapsam 2 karbon ayak izi hesaplamaları, kaynak bazlı dağılımlar ve yeşil dönüşüm trendleri.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('CO2 Emisyon Raporu', 'PDF')}>
                  <PdfIcon size={16} /> PDF
                </button>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('CO2 Emisyon Raporu', 'Excel')}>
                  <ExcelIcon size={16} /> Excel
                </button>
                <button className="btn btn-outline" style={{ padding: '9px 14px', fontSize: '12px' }} onClick={() => handleSendEmail('CO2 Emisyon Raporu')}>
                  <Mail size={16} color="var(--primary)" /> E-posta
                </button>
              </div>
            </div>

            {/* Report Card 4 */}
            <div style={{ padding: '20px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="metric-icon orange" style={{ width: '40px', height: '40px' }}><AlertTriangle size={20} /></div>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-main)', display: 'block' }}>Anomali &amp; Kök Neden Raporu</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sıklık: Günlük Otomatik (09:10)</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Tespit edilen enerji sapmaları, tahmini finansal kayıp maliyetleri ve kök neden aksiyon önerileri.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Anomali Raporu', 'PDF')}>
                  <PdfIcon size={16} /> PDF
                </button>
                <button className="btn btn-outline" style={{ flex: 1, padding: '9px 14px', fontSize: '12px' }} onClick={() => handleDownload('Anomali Raporu', 'Excel')}>
                  <ExcelIcon size={16} /> Excel
                </button>
                <button className="btn btn-outline" style={{ padding: '9px 14px', fontSize: '12px' }} onClick={() => handleSendEmail('Anomali Raporu')}>
                  <Mail size={16} color="var(--primary)" /> E-posta
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: Günlük Entegrasyon Hacmi Grafiği (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <BarChart2 size={20} color="var(--primary)" /> Günlük Entegrasyon Hacmi &amp; Trend Analizi
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-neutral" style={{ fontSize: '12px', padding: '6px 12px' }}>Son 7 Günlük Kayıt Hacmi</span>
            </div>
          </div>

          <div className="chart-card-animated" style={{ height: '300px', width: '100%', marginTop: '6px' }}>
            <Bar key={`sap-volume-${isLight}`} data={volumeChartData} options={volumeChartOptions} />
          </div>
        </div>

        {/* SECTION 3: SAP Veri Eşleştirme (Field Mapping) (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <LinkIcon size={20} color="var(--primary)" /> SAP S/4HANA Veri Eşleştirme (Field Mapping)
            </div>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '12px', padding: '8px 16px' }}
              onClick={() => showNotification('Eşleştirme Yönetimi', 'SAP S/4HANA alan eşleştirme düzenleyicisi açılıyor...', 'info')}
            >
              <Sliders size={14} /> Eşleştirmeyi Yönet
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Veri Eşleştirme Alanı</th>
                  <th>SAP Entegrasyon Alan Adı</th>
                  <th>Açıklama</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Üretim Emri</strong></td>
                  <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>AUFNR - Üretim Emri</td>
                  <td style={{ color: 'var(--text-muted)' }}>Saha üretim sipariş kodları ve lot bilgisi</td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td><strong>Ürün Kodu</strong></td>
                  <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>MATNR - Malzeme Numarası</td>
                  <td style={{ color: 'var(--text-muted)' }}>Üretilen mamul ve yarı-mamul stok kodları</td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td><strong>Maliyet Merkezi</strong></td>
                  <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>KOSTL - Maliyet Merkezi</td>
                  <td style={{ color: 'var(--text-muted)' }}>Fabrika departman ve masraf yerleri</td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td><strong>Teknik Lokasyon</strong></td>
                  <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>ILOCK - Teknik Lokasyon</td>
                  <td style={{ color: 'var(--text-muted)' }}>Tesis trafo, pano ve sayaç fiziksel konumları</td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Eşleştirildi</span></td>
                </tr>
                <tr>
                  <td><strong>Tonaj (Üretim Miktarı)</strong></td>
                  <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>GAMNG - Miktar (Ton)</td>
                  <td style={{ color: 'var(--text-muted)' }}>Birim ürün enerji yoğunluğu hesaplama girdisi</td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Eşleştirildi</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: SAP Aktarım Logları (FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Clock size={20} color="var(--primary)" /> SAP Aktarım Logları &amp; Canlı Akış
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '8px 16px', fontSize: '12px' }}
                onClick={() => showNotification('Loglar Yenilendi', 'SAP aktarım logları başarıyla senkronize edildi.', 'success')}
              >
                <RefreshCw size={14} /> Yenile
              </button>
              <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}>
                <Filter size={14} /> Filtrele
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Tarih / Saat</th>
                  <th>Aktarım Tipi</th>
                  <th>Toplam Kayıt</th>
                  <th>Başarılı Kayıt</th>
                  <th>Hatalı Kayıt</th>
                  <th>Servis / Kullanıcı</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono">15.05.2025 10:22:14</td>
                  <td>Üretim &amp; Tüketim Verisi</td>
                  <td className="mono">12.842</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>12.664</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>178</td>
                  <td><span className="mono" style={{ color: 'var(--text-muted)' }}>SAP_BOT_SERVICE</span></td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">15.05.2025 02:22:10</td>
                  <td>Üretim &amp; Tüketim Verisi</td>
                  <td className="mono">12.521</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>12.401</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>120</td>
                  <td><span className="mono" style={{ color: 'var(--text-muted)' }}>SAP_BOT_SERVICE</span></td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">14.05.2025 22:22:03</td>
                  <td>Üretim &amp; Tüketim Verisi</td>
                  <td className="mono">11.978</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>11.845</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>133</td>
                  <td><span className="mono" style={{ color: 'var(--text-muted)' }}>SAP_BOT_SERVICE</span></td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Başarılı</span></td>
                </tr>
                <tr>
                  <td className="mono">14.05.2025 10:22:06</td>
                  <td>Üretim &amp; Tüketim Verisi</td>
                  <td className="mono">12.102</td>
                  <td className="mono" style={{ color: 'var(--success-text)', fontWeight: 700 }}>11.963</td>
                  <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>139</td>
                  <td><span className="mono" style={{ color: 'var(--text-muted)' }}>SAP_BOT_SERVICE</span></td>
                  <td><span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>● Başarılı</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span>Toplam 128 aktarım kaydı listeleniyor</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '12px' }}>«</button>
              <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}>1</button>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '12px' }}>2</button>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '12px' }}>3</button>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '12px' }}>4</button>
              <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '12px' }}>»</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
