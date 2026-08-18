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
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Flame, 
  Wind, 
  Zap, 
  Droplet, 
  Gauge, 
  Play, 
  Check, 
  Search, 
  Filter, 
  Sparkles, 
  FileText,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  X,
  Eye,
  CheckCircle
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const initialAnomaliesList = [
  {
    id: 'ANO-001',
    priority: 'Kritik',
    title: 'Hat-2 Doğalgaz Yoğunluğu Yüksek',
    source: 'GZ-02 Gaz Analizörü',
    impact: '₺217,800/ay',
    reason: 'Kalibrasyon kayması & Vana Kaçağı',
    status: 'Açık',
    startTime: 'Bugün 08:15',
    duration: '2 sa 15 dk',
    currentVal: '28,7 Sm³/ton',
    thresholdVal: '23,0 Sm³/ton',
    deviation: '+%32,0',
    chartData: [21.5, 22.0, 22.8, 26.4, 28.1, 28.7],
    timeline: [
      { time: '08:15', label: 'Eşik değer aşımı tespit edildi (+%15)' },
      { time: '08:45', label: 'Tüketim sapması %32 seviyesine ulaştı' },
      { time: '09:30', label: 'AI Copilot kök neden analizi çalıştırıldı' }
    ],
    causes: [
      { name: 'Gaz Vanası / Debimetre Kalibrasyon Kayması', pct: 55, color: '#ef4444' },
      { name: 'Sensör Diyafram Yaşlanması', pct: 25, color: '#f59e0b' },
      { name: 'Fırın Yakıcı Hava/Gaz Oranı Bozulması', pct: 20, color: '#3b82f6' }
    ],
    actions: [
      '1. Saha ekibi GZ-02 vanasının sıfır noktası kalibrasyonunu yapmalıdır.',
      '2. Fırın-2 brülör hava/gaz karışım regülatörünü kontrol edin.'
    ]
  },
  {
    id: 'ANO-002',
    priority: 'Yüksek',
    title: 'Kompresör-2 Basınç Düşüşü & Kaçak',
    source: 'KMP-02 Çıkış Sensörü',
    impact: '₺148,300/ay',
    reason: 'Hat Kaçağı / Filtre Tıkanması',
    status: 'Açık',
    startTime: 'Dün 22:40',
    duration: '11 sa 45 dk',
    currentVal: '4,1 bar',
    thresholdVal: '4,5 bar',
    deviation: '-%8,8',
    chartData: [4.8, 4.7, 4.5, 4.3, 4.2, 4.1],
    timeline: [
      { time: '22:40', label: 'Basınç 4,4 bar altına geriledi' },
      { time: '02:00', label: 'Kompresör yüklenme oranı %94 seviyesine çıktı' },
      { time: '07:00', label: 'Ultrasonik debimetre kaçak sinyali verdi' }
    ],
    causes: [
      { name: 'Dağıtım Hattı Ultrasonik Hava Kaçağı', pct: 60, color: '#ef4444' },
      { name: 'Kompresör Hava Filtresi Tıkanması', pct: 30, color: '#f59e0b' },
      { name: 'Basınç Regülatör Arızası', pct: 10, color: '#3b82f6' }
    ],
    actions: [
      '1. Hat-3 basınçlı hava manifold borularını ultrasonik detektörle tarayın.',
      '2. Kompresör-2 emiş filtresini temizleyin/değiştirin.'
    ]
  },
  {
    id: 'ANO-003',
    priority: 'Yüksek',
    title: 'Trafo-1 Gece Vardiyası Bekleme Reaktif Güç',
    source: 'TR-01 Analizör',
    impact: '₺64,200/ay',
    reason: 'Kompanzasyon Kademe Arızası',
    status: 'Açık',
    startTime: 'Bugün 01:20',
    duration: '9 sa 10 dk',
    currentVal: '142,5 kVAr',
    thresholdVal: '80,0 kVAr',
    deviation: '+%78,1',
    chartData: [75, 78, 95, 120, 138, 142.5],
    timeline: [
      { time: '01:20', label: 'Gece duruşunda reaktif güç çekişi yükseldi' },
      { time: '04:00', label: 'Cos φ değeri 0.84 seviyesine geriledi' }
    ],
    causes: [
      { name: 'Kompanzasyon Kondansatör Kademe Yapışması', pct: 70, color: '#ef4444' },
      { name: 'Yüksüz Trafo Mıknatıslanma Akımı', pct: 30, color: '#3b82f6' }
    ],
    actions: [
      '1. Kompanzasyon panosundaki 4. ve 5. kontaktörleri test edin.',
      '2. Otomatik röle kademe sürelerini yeniden ayarlayın.'
    ]
  },
  {
    id: 'ANO-004',
    priority: 'Orta',
    title: 'Üretim Pano-3 Faz Dengesizliği',
    source: 'PN-03 Enerji Metresi',
    impact: '₺42,500/ay',
    reason: 'Tek Fazlı Aşırı Yüklenme',
    status: 'Açık',
    startTime: 'Bugün 06:10',
    duration: '4 sa 20 dk',
    currentVal: '%14,2 Unbalance',
    thresholdVal: '%5,0 Unbalance',
    deviation: '+%184,0',
    chartData: [4.2, 4.8, 8.5, 11.2, 13.8, 14.2],
    timeline: [
      { time: '06:10', label: 'L2 fazı akım çekişi L1 fazının 2.4 katına çıktı' }
    ],
    causes: [
      { name: 'Tek Fazlı Isıtıcı Rezistans Dengesiz Dağılımı', pct: 80, color: '#ef4444' },
      { name: 'L3 Fazı Gevşek Klemens Teması', pct: 20, color: '#f59e0b' }
    ],
    actions: [
      '1. Pano-3 yük dağılımını L1-L2-L3 arasında dengeli şekilde fazlayın.',
      '2. Termal kamera ile klemens ısınmasını kontrol edin.'
    ]
  },
  {
    id: 'ANO-005',
    priority: 'Orta',
    title: 'Soğutma Kulesi Pompa-2 Titreşim & Güç Artışı',
    source: 'SK-P2 Akıllı Sensör',
    impact: '₺30,000/ay',
    reason: 'Rulman Aşınması / Eksen Kayması',
    status: 'Açık',
    startTime: '14 May 18:00',
    duration: '16 sa 30 dk',
    currentVal: '48,5 kW',
    thresholdVal: '39,0 kW',
    deviation: '+%24,3',
    chartData: [38.5, 39.0, 41.2, 44.5, 47.0, 48.5],
    timeline: [
      { time: '18:00', label: 'Pompa titreşim genliği 4.8 mm/s eşiğini aştı' },
      { time: '22:00', label: 'Motor çekiş gücü 48.5 kW seviyesine yükseldi' }
    ],
    causes: [
      { name: 'Pompa Rulman Yüzey Hasarı / Yağsızlık', pct: 65, color: '#ef4444' },
      { name: 'Kaplin Eksenal Kaçıklık', pct: 35, color: '#f59e0b' }
    ],
    actions: [
      '1. Lazerli kaplin eksen ayarı uygulayın.',
      '2. Rulman gres yağlamasını tazeleyin.'
    ]
  }
];

export default function AnomalilerView() {
  const { theme, showNotification, openCopilotWithProposal } = useTheme();
  const [anomalies, setAnomalies] = useState(initialAnomaliesList);
  const [inspectingAnomaly, setInspectingAnomaly] = useState(null);

  const isLight = theme === 'light';
  const textColor = isLight ? '#475569' : (theme === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  const totalOpen = anomalies.length;
  const kritikCount = anomalies.filter(a => a.priority === 'Kritik').length;
  const yuksekCount = anomalies.filter(a => a.priority === 'Yüksek').length;

  const triggerDirectActionPlan = (anomalyObj) => {
    // Close inspection modal if open so background is clean
    setInspectingAnomaly(null);

    // Update status to Çözüm Sürecinde
    const updated = anomalies.map(a => 
      a.id === anomalyObj.id 
        ? { ...a, status: 'Çözüm Sürecinde (Aksiyon Bekleniyor)' } 
        : a
    );
    setAnomalies(updated);

    if (inspectingAnomaly && inspectingAnomaly.id === anomalyObj.id) {
      setInspectingAnomaly(prev => ({ ...prev, status: 'Çözüm Sürecinde (Aksiyon Bekleniyor)' }));
    }

    openCopilotWithProposal({
      id: anomalyObj.id,
      title: anomalyObj.title,
      location: anomalyObj.source,
      impact: anomalyObj.impact,
      reason: anomalyObj.reason,
      actions: anomalyObj.actions
    });
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
      
      {/* 4 SUMMARY METRIC CARDS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header"><span>Aktif Anomali</span><div className="metric-icon red"><AlertTriangle size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--danger-text)' }}>{totalOpen}</span></div>
          <div className="metric-subtext">5 sahada anlık takipte</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Kritik Öncelikli</span><div className="metric-icon red"><Flame size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--danger-text)' }}>{kritikCount}</span></div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)', fontWeight: 700 }}>Acil müdahale gerekli</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Yüksek Öncelikli</span><div className="metric-icon orange"><Wind size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ color: 'var(--warning-text)' }}>{yuksekCount}</span></div>
          <div className="metric-subtext" style={{ color: 'var(--warning-text)', fontWeight: 700 }}>İnceleme bekliyor</div>
        </div>

        <div className="metric-card">
          <div className="metric-header"><span>Finansal Etki Riski</span><div className="metric-icon purple"><Zap size={18} /></div></div>
          <div className="metric-value-box"><span className="metric-value" style={{ fontSize: '26px' }}>₺502,800</span><span className="metric-unit">/ay</span></div>
          <div className="metric-subtext">Kök nedenler çözülürse kazanç</div>
        </div>
      </div>

      {/* MINIMALIST ACTIVE ANOMALIES TABLE */}
      <div className="dashboard-grid">
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title"><ShieldAlert size={18} /> Aktif Anomali Listesi ve Kök Neden Analizi</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" className="copilot-input" placeholder="Anomali veya sensör ara..." style={{ padding: '6px 12px', fontSize: '12px', width: '220px' }} />
              <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }}><Search size={14} /></button>
              <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '12px' }}><Filter size={14} /></button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Öncelik</th>
                  <th>Anomali Tanımı</th>
                  <th>Kaynak Cihaz</th>
                  <th>Finansal Etki</th>
                  <th>Kök Neden Özeti</th>
                  <th>Durum</th>
                  <th style={{ textAlign: 'right' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((anom) => (
                  <tr 
                    key={anom.id} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setInspectingAnomaly(anom)}
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
                      <span className={`badge ${anom.status === 'Açık' ? 'badge-danger' : 'badge-success'}`}>
                        ● {anom.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={() => setInspectingAnomaly(anom)}
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

      {/* POP-UP ANOMALY INSPECTOR MODAL (CLEAN WHITE BACKGROUND & DIRECT AI ACTION PLAN) */}
      {inspectingAnomaly && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(8px)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '1200px', maxHeight: '90vh', overflowY: 'auto', background: isLight ? '#ffffff' : 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderRadius: '20px', padding: '28px' }}>
            
            {/* Modal Header */}
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px', position: 'sticky', top: 0, background: isLight ? '#ffffff' : 'var(--bg-card)', zIndex: 10 }}>
              <div className="card-title" style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={22} color="var(--danger-text)" />
                <span>Seçili Anomali Hızlı Bakış &amp; Kök Neden: <strong>{inspectingAnomaly.title}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`badge ${inspectingAnomaly.status === 'Açık' ? 'badge-danger' : 'badge-success'}`}>
                  ● {inspectingAnomaly.status}
                </span>
                <button className="btn-close-copilot" onClick={() => setInspectingAnomaly(null)}>
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal Body (2 Horizontal Side-by-Side Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px 0' }}>
              
              {/* LEFT COLUMN: Parameters Grid & Time Series Chart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Parameters Box (Pure White Background) */}
                <div style={{ background: isLight ? '#ffffff' : 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    Anomali Parametreleri &amp; Tolerans Aşımı
                  </strong>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px' }}>
                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Kaynak Sensör:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.source}</strong>
                    </div>

                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Başlangıç Zamanı:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.startTime}</strong>
                    </div>

                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Geçen Süre:</span>
                      <strong style={{ color: 'var(--warning-text)' }}>{inspectingAnomaly.duration}</strong>
                    </div>

                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Mevcut Değer:</span>
                      <strong style={{ color: 'var(--danger-text)', fontSize: '14px' }}>{inspectingAnomaly.currentVal}</strong>
                    </div>

                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Eşik Limit:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingAnomaly.thresholdVal}</strong>
                    </div>

                    <div style={{ background: isLight ? '#f8fafc' : 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Sapma Miktarı:</span>
                      <strong style={{ color: 'var(--danger-text)', fontSize: '14px' }}>{inspectingAnomaly.deviation}</strong>
                    </div>
                  </div>
                </div>

                {/* Time Series Chart */}
                <div style={{ background: isLight ? '#ffffff' : 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                    Zaman Serisi Eğrisi (Eşik Aşım Analizi)
                  </strong>
                  <div className="chart-container" style={{ height: '180px' }}>
                    <Line 
                      key={`anomaly-${inspectingAnomaly.id}-${isLight}`}
                      data={{
                        labels: ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
                        datasets: [
                          {
                            label: 'Gerçek Değer',
                            data: inspectingAnomaly.chartData,
                            borderColor: '#0f2942',
                            backgroundColor: 'rgba(15, 41, 66, 0.12)',
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#0f2942',
                            pointRadius: 4
                          }
                        ]
                      }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                          duration: 1400,
                          easing: 'easeOutQuart'
                        },
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
                <div style={{ background: isLight ? '#ffffff' : 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', marginTop: '2px' }}>
                    {(inspectingAnomaly?.timeline || []).map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === 0 ? 'var(--danger)' : 'var(--primary)' }}></div>
                        <span className="mono" style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{step.time}</span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Root Cause Progress Bars */}
                <div style={{ background: isLight ? '#ffffff' : 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block' }}>
                    Olası Kök Neden İhtimalleri (%)
                  </strong>

                  {(inspectingAnomaly?.causes || []).map((cause, idx) => (
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
                <div style={{ background: isLight ? '#ffffff' : 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'block' }}>
                    Önerilen Çözüm Adımları
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {(inspectingAnomaly?.actions || []).map((act, idx) => (
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
                  className="btn btn-primary" 
                  style={{ padding: '8px 20px', fontSize: '12px', background: 'var(--primary)' }}
                  onClick={() => triggerDirectActionPlan(inspectingAnomaly)}
                >
                  <Sparkles size={15} /> AI ile Aksiyon Planını Doğrudan Çalıştır
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
