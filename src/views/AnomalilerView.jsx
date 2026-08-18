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
  AlertTriangle, 
  Skull, 
  Banknote, 
  CheckCircle2, 
  ListChecks, 
  Sparkles, 
  Clock, 
  Activity, 
  ChevronRight, 
  Filter, 
  RefreshCw, 
  ShieldAlert, 
  FileText,
  Play,
  Eye,
  X
} from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend
);

const anomaliesList = [
  {
    id: 'ANOM-2025-0515-001',
    priority: 'Kritik',
    title: 'Hat-2 Doğalgaz Yoğunluğu Yüksek',
    source: 'Hat-2 - Doğalgaz Analizörü',
    startTime: '15.05.2025 09:21:14',
    duration: '1s 03d 22sn',
    impact: '₺217,800 / ay',
    impactVal: '₺217,800',
    reason: 'Kalibrasyon sapması veya sensör arızası',
    status: 'Açık',
    currentVal: '%27,4',
    thresholdVal: '%23,0',
    deviation: '+%4,4',
    affectedKpi: 'Enerji Maliyeti',
    affectedProd: 'Günlük ~2.1 MWh',
    riskLevel: 'Yüksek',
    chartData: [21.2, 22.4, 21.8, 24.5, 23.8, 27.4],
    causes: [
      { name: 'Kalibrasyon Sapması', pct: 55, color: '#ef4444' },
      { name: 'Sensör Yaşlanması', pct: 25, color: '#f59e0b' },
      { name: 'Yakıt Kalitesi Değişimi', pct: 10, color: '#eab308' },
      { name: 'Proses Koşulları', pct: 10, color: '#94a3b8' }
    ],
    timeline: [
      { time: '09:21:14', label: 'Anomali tetiklendi' },
      { time: '09:22:03', label: 'Alarm bildirimi gönderildi' },
      { time: '09:24:11', label: 'Operatöre atandı' },
      { time: '09:31:45', label: 'İlk inceleme yapıldı' },
      { time: '09:58:02', label: 'Ek veri toplandı' }
    ],
    actions: [
      '1. Sensör kalibrasyonunu kontrol edin ve gerekirse kalibre edin.',
      '2. Numune hattı tıkanıklığını kontrol edin.',
      '3. Gaz kromatografı sağlığını doğrulayın.'
    ]
  },
  {
    id: 'ANOM-2025-0515-002',
    priority: 'Yüksek',
    title: 'Kompresör-2 Basınç Düşük',
    source: 'Kompresör-2 Çıkış Basıncı',
    startTime: '15.05.2025 08:45:10',
    duration: '1s 39d 26sn',
    impact: '₺148,300 / ay',
    impactVal: '₺148,300',
    reason: 'Vana konumu veya kaçak şüphesi',
    status: 'Açık',
    currentVal: '4.1 bar',
    thresholdVal: '5.5 bar',
    deviation: '-1.4 bar',
    affectedKpi: 'Basınçlı Hava Verimi',
    affectedProd: 'Hat-2 İletim Hattı',
    riskLevel: 'Yüksek',
    chartData: [5.6, 5.5, 5.2, 4.8, 4.3, 4.1],
    causes: [
      { name: 'Hat Kaçağı Şüphesi', pct: 60, color: '#ef4444' },
      { name: 'Vana Konum Arızası', pct: 25, color: '#f59e0b' },
      { name: 'Filtre Tıkanıklığı', pct: 15, color: '#94a3b8' }
    ],
    timeline: [
      { time: '08:45:10', label: 'Basınç uyarısı verildi' },
      { time: '08:50:00', label: 'Bakım ekibine SMS yollandı' },
      { time: '09:15:20', label: 'Saha denetimi başlatıldı' }
    ],
    actions: [
      '1. Hat kaçak testini basınç yükselterek uygulayın.',
      '2. Vana pnomatik aktüatörünü kontrol edin.',
      '3. Giriş hava filtre değişimini sağlayın.'
    ]
  },
  {
    id: 'ANOM-2025-0515-003',
    priority: 'Yüksek',
    title: 'Fırın-1 Sıcaklık Uyarı Seviyesinde',
    source: 'Fırın-1 Sıcaklık (M13)',
    startTime: '15.05.2025 10:02:15',
    duration: '0s 22d 21sn',
    impact: '₺96,400 / ay',
    impactVal: '₺96,400',
    reason: 'Yanma ayarı veya yakıt kalitesi',
    status: 'Açık',
    currentVal: '840 °C',
    thresholdVal: '800 °C',
    deviation: '+40 °C',
    affectedKpi: 'Doğalgaz Yoğunluğu',
    affectedProd: 'Isıl İşlem Hattı',
    riskLevel: 'Orta-Yüksek',
    chartData: [790, 795, 805, 820, 835, 840],
    causes: [
      { name: 'Hava/Gaz Oranı Bozukluğu', pct: 50, color: '#f59e0b' },
      { name: 'Brülör Meme Tıkanıklığı', pct: 35, color: '#ef4444' },
      { name: 'Termokupl Kalibrasyonu', pct: 15, color: '#94a3b8' }
    ],
    timeline: [
      { time: '10:02:15', label: 'Sıcaklık eşiği aşıldı' },
      { time: '10:08:30', label: 'Otomatik brülör kıstı' }
    ],
    actions: [
      '1. Otomatik hava/gaz karıştırıcı servovanasını kalibre edin.',
      '2. Brülör uçlarını temizleyip kontrol edin.'
    ]
  },
  {
    id: 'ANOM-2025-0515-004',
    priority: 'Orta',
    title: 'OG Hücresi Kapı Açık',
    source: 'OG Hücresi Kapı Sensörü',
    startTime: '15.05.2025 10:14:00',
    duration: '0s 10d 36sn',
    impact: '₺8,200 / ay',
    impactVal: '₺8,200',
    reason: 'Operatör müdahalesi veya sensör hatası',
    status: 'Açık',
    currentVal: 'AÇIK',
    thresholdVal: 'KAPALI',
    deviation: 'İhlal',
    affectedKpi: 'Tesis Güvenliği',
    affectedProd: 'Trafo-1 / Trafo-2',
    riskLevel: 'Orta',
    chartData: [0, 0, 0, 1, 1, 1],
    causes: [
      { name: 'Unutulan Hücre Kapısı', pct: 70, color: '#f59e0b' },
      { name: 'Limit Swiç Temassızlığı', pct: 30, color: '#94a3b8' }
    ],
    timeline: [
      { time: '10:14:00', label: 'Kapı switch kontak verdi' }
    ],
    actions: [
      '1. Nöbetçi elektrik teknisyenini OG odasına yönlendirin.',
      '2. Kapı kilidini mekanik olarak kontrolden geçirin.'
    ]
  },
  {
    id: 'ANOM-2025-0515-005',
    priority: 'Düşük',
    title: 'Pompa-3 Titreşim Artışı',
    source: 'Pompa-3 Titreşim Sensörü',
    startTime: '15.05.2025 07:10:00',
    duration: '3s 14d 30sn',
    impact: '₺32,100 / ay',
    impactVal: '₺32,100',
    reason: 'Yatak aşınması veya hizasızlık',
    status: 'İncelemede',
    currentVal: '4.8 mm/s',
    thresholdVal: '3.5 mm/s',
    deviation: '+1.3 mm/s',
    affectedKpi: 'Kestirimci Bakım',
    affectedProd: 'Soğutma Kulesi',
    riskLevel: 'Düşük',
    chartData: [3.2, 3.4, 3.8, 4.2, 4.5, 4.8],
    causes: [
      { name: 'Rulman Yatak Aşınması', pct: 65, color: '#2563eb' },
      { name: 'Kaplin Hizasızlığı', pct: 35, color: '#94a3b8' }
    ],
    timeline: [
      { time: '07:10:00', label: 'Titreşim ivmesi yükseldi' },
      { time: '08:00:00', label: 'Bakım iş emri açıldı' }
    ],
    actions: [
      '1. Lazerli kaplin eksen ayarı uygulayın.',
      '2. Rulman gres yağlamasını tazeleyin.'
    ]
  }
];

export default function AnomalilerView() {
  const { theme, showNotification, openCopilotWithPrompt } = useTheme();
  const [inspectingAnomaly, setInspectingAnomaly] = useState(null);

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const totalOpen = anomaliesList.length;
  const kritikCount = anomaliesList.filter(a => a.priority === 'Kritik').length;
  const yuksekCount = anomaliesList.filter(a => a.priority === 'Yüksek').length;

  const triggerAnomalyAction = (title) => {
    showNotification(
      'Otomatik Aksiyon Planı Oluşturuldu',
      `1. ${title} için Saha Teknisyenine SMS ve e-posta bildirimi iletildi.\n2. Kalibrasyon ve bakım iş emri SAP S/4HANA PM modülüne kaydedildi.`,
      'success'
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Kritik': return <span className="badge badge-danger">KRİTİK</span>;
      case 'Yüksek': return <span className="badge badge-warning">YÜKSEK</span>;
      case 'Orta': return <span className="badge badge-info">ORTA</span>;
      default: return <span className="badge badge-neutral">DÜŞÜK</span>;
    }
  };

  return (
    <div className="module-view active">
      
      {/* 4 SUMMARY METRIC CARDS (Top Row - Dynamically Calculated) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Açık Anomali</span>
            <div className="metric-icon red"><AlertTriangle size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--danger-text)' }}>{totalOpen}</span>
            <span className="metric-unit">Adet Aktif</span>
          </div>
          <div className="metric-subtext">
            <span>Tüm Listelenen Anomaliler</span>
            <span style={{ color: 'var(--danger-text)', fontWeight: 700, marginLeft: 'auto' }}>Canlı Akış</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Kritik Anomali</span>
            <div className="metric-icon red"><Skull size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--danger-text)' }}>{kritikCount}</span>
            <span className="metric-unit">Acil Müdahale</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)', fontWeight: 600 }}>
            <span>{kritikCount} Kritik + {yuksekCount} Yüksek Seviye</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Tahmini Aylık Finansal Kayıp</span>
            <div className="metric-icon orange"><Banknote size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--warning-text)' }}>₺502,800</span>
          </div>
          <div className="metric-subtext">
            <span>5 Aktif Anomali Toplamı</span>
            <span style={{ color: 'var(--warning-text)', fontWeight: 700, marginLeft: 'auto' }}>₺502,800/ay</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Kapanan Anomali</span>
            <div className="metric-icon green"><CheckCircle2 size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--success-text)' }}>18</span>
            <span className="metric-unit">Son 7 Gün</span>
          </div>
          <div className="metric-subtext">
            <span>Çözüm Oranı: %85</span>
          </div>
        </div>
      </div>

      {/* ULTRA-CLEAN EXECUTIVE ANOMALIES TABLE (FULL WIDTH col-span-12) */}
      <div className="dashboard-grid">
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <ListChecks size={20} color="var(--primary)" /> Önceliklendirilmiş Saha Anomali Listesi (5 Aktif Anomali)
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }}>
                <Filter size={14} /> Filtrele
              </button>
              <button 
                className="btn btn-outline" 
                style={{ padding: '6px 12px', fontSize: '11px' }}
                onClick={() => showNotification('Liste Güncellendi', 'Saha anomali verileri canlı senkronize edildi.', 'info')}
              >
                <RefreshCw size={14} /> Yenile
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Öncelik</th>
                  <th>Anomali Tanımı</th>
                  <th>Kaynak / Sensör</th>
                  <th>Finansal Etki (₺/ay)</th>
                  <th>Olası Neden</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {anomaliesList.map((anom) => (
                  <tr 
                    key={anom.id}
                    onClick={() => setInspectingAnomaly(anom)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{getPriorityBadge(anom.priority)}</td>
                    <td>
                      <strong style={{ color: 'var(--text-main)' }}>{anom.title}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{anom.id}</div>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{anom.source}</td>
                    <td className="mono" style={{ color: 'var(--danger-text)', fontWeight: 800 }}>{anom.impact}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{anom.reason}</td>
                    <td>
                      <span className={`badge ${anom.status === 'Açık' ? 'badge-danger' : 'badge-info'}`}>
                        ● {anom.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingAnomaly(anom);
                        }}
                      >
                        <Eye size={14} /> İncele &amp; Detay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WIDE HORIZONTAL 2-COLUMN POP-UP ANOMALY INSPECTOR MODAL */}
      {inspectingAnomaly && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '1200px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            
            {/* Modal Header */}
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px', position: 'sticky', top: 0, background: 'var(--bg-sidebar)', zIndex: 10 }}>
              <div className="card-title" style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={22} color="var(--danger-text)" />
                <span>Seçili Anomali Hızlı Bakış &amp; Kök Neden: <strong>{inspectingAnomaly.title}</strong></span>
              </div>
              <button className="btn-close-copilot" onClick={() => setInspectingAnomaly(null)}>
                <X size={22} />
              </button>
            </div>

            {/* Modal Body (2 Horizontal Side-by-Side Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px 0' }}>
              
              {/* LEFT COLUMN: Parameters Grid & Time Series Chart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Parameters Box */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    Anomali Parametreleri &amp; Tolerans Aşımı
                  </strong>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Kaynak Sensör:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.source}</strong>
                    </div>

                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Başlangıç Zamanı:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.startTime}</strong>
                    </div>

                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Geçen Süre:</span>
                      <strong style={{ color: 'var(--warning-text)' }}>{inspectingAnomaly.duration}</strong>
                    </div>

                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Mevcut Değer:</span>
                      <strong style={{ color: 'var(--danger-text)', fontSize: '14px' }}>{inspectingAnomaly.currentVal}</strong>
                    </div>

                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Eşik Limit:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.thresholdVal}</strong>
                    </div>

                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Sapma Miktarı:</span>
                      <strong style={{ color: 'var(--danger-text)', fontSize: '14px' }}>{inspectingAnomaly.deviation}</strong>
                    </div>
                  </div>
                </div>

                {/* Time Series Chart */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                    Zaman Serisi Eğrisi (Eşik Aşım Analizi)
                  </strong>
                  <div className="chart-container" style={{ height: '180px' }}>
                    <Line 
                      data={{
                        labels: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
                        datasets: [
                          {
                            label: 'Gerçek Değer',
                            data: inspectingAnomaly.chartData,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#2563eb',
                            pointRadius: 4
                          }
                        ]
                      }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 } }, grid: { display: false } },
                          y: { ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10 } }, grid: { color: gridColor } }
                        }
                      }} 
                    />
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Audit Trail Timeline, Root Cause Percentages, Solutions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Audit Trail Timeline */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    <Clock size={15} style={{ display: 'inline', marginRight: '6px' }} /> Olay Zaman Çizelgesi (Audit Trail)
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', marginTop: '2px' }}>
                    {inspectingAnomaly.timeline.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === 0 ? 'var(--danger)' : 'var(--primary)' }}></div>
                        <span className="mono" style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{step.time}</span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Root Cause Progress Bars */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block' }}>
                    Olası Kök Neden İhtimalleri (%)
                  </strong>

                  {inspectingAnomaly.causes.map((cause, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{cause.name}</span>
                        <span className="mono" style={{ fontWeight: 800, color: cause.color }}>%{cause.pct}</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${cause.pct}%`, height: '100%', background: cause.color, borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Action Bullet Points */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block' }}>
                    Önerilen Çözüm Adımları
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {inspectingAnomaly.actions.map((act, idx) => (
                      <div key={idx} style={{ color: 'var(--text-main)', fontWeight: 500 }}>{act}</div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-card)' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '8px 16px', fontSize: '12px' }}
                onClick={() => showNotification('PDF Rapor', `${inspectingAnomaly.title} kök neden analiz raporu indirildi.`, 'info')}
              >
                <FileText size={15} /> PDF Rapor Al
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                  onClick={() => {
                    const prompt = `${inspectingAnomaly.title} (${inspectingAnomaly.id}) için saha teknik aksiyon planı oluştur`;
                    setInspectingAnomaly(null);
                    openCopilotWithPrompt(prompt);
                  }}
                >
                  <Sparkles size={15} /> Copilot ile Aksiyon Planı
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '8px 20px', fontSize: '12px' }}
                  onClick={() => {
                    triggerAnomalyAction(inspectingAnomaly.title);
                    setInspectingAnomaly(null);
                  }}
                >
                  <Play size={15} /> Aksiyon Oluştur
                </button>
                <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => setInspectingAnomaly(null)}>
                  Kapat
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
