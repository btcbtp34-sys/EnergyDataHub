import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bell, 
  BellOff, 
  Activity, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  UserCheck, 
  ShieldAlert, 
  Clock, 
  Moon, 
  Eye, 
  X, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Sparkles,
  Save
} from 'lucide-react';

const initialAlarmRules = [
  {
    id: 'RULE-001',
    name: 'Trafo-1 Yağ Sıcaklığı Yüksek',
    source: 'TRAFO-1',
    threshold: '> 80 °C',
    priority: 'Yüksek',
    channels: { mail: true, app: true, sms: true },
    status: 'Aktif',
    lastTrigger: '15.05.2025 10:22',
    param: 'Yağ Sıcaklığı',
    condition: '> (Büyük)',
    thresholdVal: '80 °C',
    delay: '2 dakika',
    primaryUser: 'Enerji Yöneticisi (Hasan Cavit Koçak)',
    secondaryUser: 'Bakım Müdürü',
    infoUser: 'Nöbetçi Mühendis',
    escalation: [
      { step: '1. Adım (0-5 dk)', user: 'Birincil Kullanıcılar' },
      { step: '2. Adım (5-15 dk)', user: 'Bakım Müdürü' },
      { step: '3. Adım (15+ dk)', user: 'Enerji Yöneticisi' }
    ],
    quietHours: '22:00 - 06:00 (Her gün)'
  },
  {
    id: 'RULE-002',
    name: 'OG Hücresi Kapak Açık',
    source: 'OG-HUCRESI-2',
    threshold: 'Açık',
    priority: 'Orta',
    channels: { mail: true, app: true, sms: true },
    status: 'Aktif',
    lastTrigger: '15.05.2025 09:58',
    param: 'Kapı Sensör Kontak',
    condition: '= (Açık)',
    thresholdVal: 'AÇIK',
    delay: '0 dakika',
    primaryUser: 'Nöbetçi Elektrikçi',
    secondaryUser: 'Tesis Güvenlik',
    infoUser: 'Bakım Müdürü',
    escalation: [
      { step: '1. Adım (0-2 dk)', user: 'Nöbetçi Elektrikçi' },
      { step: '2. Adım (2-10 dk)', user: 'Tesis Güvenlik' }
    ],
    quietHours: 'Yok (7/24 Aktif)'
  },
  {
    id: 'RULE-003',
    name: 'Kompr. 2 Titreşim Yüksek',
    source: 'KOMPRESOR-2',
    threshold: '> 6.0 mm/s',
    priority: 'Yüksek',
    channels: { mail: true, app: true, sms: false },
    status: 'Aktif',
    lastTrigger: '15.05.2025 09:45',
    param: 'İvme Titreşim',
    condition: '> (Büyük)',
    thresholdVal: '6.0 mm/s',
    delay: '1 dakika',
    primaryUser: 'Mekanik Bakım',
    secondaryUser: 'Bakım Müdürü',
    infoUser: 'Enerji Yöneticisi',
    escalation: [
      { step: '1. Adım (0-5 dk)', user: 'Mekanik Bakım' },
      { step: '2. Adım (5-15 dk)', user: 'Bakım Müdürü' }
    ],
    quietHours: '22:00 - 06:00 (Her gün)'
  },
  {
    id: 'RULE-004',
    name: 'Jeneratör Yük Oranı Yüksek',
    source: 'JENERATOR-1',
    threshold: '> 90 %',
    priority: 'Orta',
    channels: { mail: true, app: true, sms: true },
    status: 'Aktif',
    lastTrigger: '15.05.2025 08:31',
    param: 'Aktif Yük %',
    condition: '> (Büyük)',
    thresholdVal: '90 %',
    delay: '3 dakika',
    primaryUser: 'Enerji Yöneticisi',
    secondaryUser: 'Elektrik Mühendisi',
    infoUser: 'Fabrika Müdürü',
    escalation: [
      { step: '1. Adım (0-5 dk)', user: 'Enerji Yöneticisi' },
      { step: '2. Adım (5-15 dk)', user: 'Elektrik Mühendisi' }
    ],
    quietHours: 'Yok (7/24 Aktif)'
  },
  {
    id: 'RULE-005',
    name: 'Pano 1 Akım Dengesizliği',
    source: 'PANO-1',
    threshold: '> 15 %',
    priority: 'Orta',
    channels: { mail: true, app: true, sms: true },
    status: 'Aktif',
    lastTrigger: '15.05.2025 07:10',
    param: 'Faz Akım Sapması',
    condition: '> (Büyük)',
    thresholdVal: '15 %',
    delay: '5 dakika',
    primaryUser: 'Elektrik Bakım Teknisyeni',
    secondaryUser: 'Elektrik Mühendisi',
    infoUser: 'Enerji Yöneticisi',
    escalation: [
      { step: '1. Adım (0-10 dk)', user: 'Elektrik Bakım Teknisyeni' }
    ],
    quietHours: '23:00 - 07:00 (Her gün)'
  },
  {
    id: 'RULE-006',
    name: 'Yardımcı Trafo Yağ Seviyesi Düşük',
    source: 'TRAFO-YRD',
    threshold: '< MIN',
    priority: 'Orta',
    channels: { mail: true, app: true, sms: false },
    status: 'Pasif',
    lastTrigger: '—',
    param: 'Yağ Seviye Şamandırası',
    condition: '< (Küçük)',
    thresholdVal: 'MIN Seviye',
    delay: '0 dakika',
    primaryUser: 'Trafo Teknisyeni',
    secondaryUser: 'Bakım Müdürü',
    infoUser: 'Enerji Yöneticisi',
    escalation: [
      { step: '1. Adım (0-5 dk)', user: 'Trafo Teknisyeni' }
    ],
    quietHours: 'Yok (7/24 Aktif)'
  },
  {
    id: 'RULE-007',
    name: 'Batarya Grubu Voltaj Düşük',
    source: 'BATARYA-1',
    threshold: '< 48 V',
    priority: 'Yüksek',
    channels: { mail: true, app: true, sms: true },
    status: 'Aktif',
    lastTrigger: '15.05.2025 06:42',
    param: 'DC Gerilim',
    condition: '< (Küçük)',
    thresholdVal: '48 V',
    delay: '1 dakika',
    primaryUser: 'UPS Teknisyeni',
    secondaryUser: 'Elektrik Mühendisi',
    infoUser: 'Bakım Müdürü',
    escalation: [
      { step: '1. Adım (0-5 dk)', user: 'UPS Teknisyeni' }
    ],
    quietHours: 'Yok (7/24 Aktif)'
  },
  {
    id: 'RULE-008',
    name: 'UPS Giriş Voltaj Düşük',
    source: 'UPS-1',
    threshold: '< 180 V',
    priority: 'Düşük',
    channels: { mail: false, app: true, sms: false },
    status: 'Aktif',
    lastTrigger: '15.05.2025 05:31',
    param: 'AC Şebeke Giriş Gerilimi',
    condition: '< (Küçük)',
    thresholdVal: '180 V',
    delay: '2 dakika',
    primaryUser: 'Elektrik Teknisyeni',
    secondaryUser: 'Enerji Yöneticisi',
    infoUser: 'Bakım Ekibi',
    escalation: [
      { step: '1. Adım (0-10 dk)', user: 'Elektrik Teknisyeni' }
    ],
    quietHours: 'Yok (7/24 Aktif)'
  }
];

const alarmHistoryList = [
  { time: '15.05.2025 10:22:14', rule: 'Trafo-1 Yağ Sıcaklığı Yüksek', source: 'TRAFO-1', status: 'Aktif', priority: 'Yüksek', val: '82.6 °C', desc: 'Eşik değeri aşıldı (> 80 °C)', duration: '2 dk 12 sn' },
  { time: '15.05.2025 09:58:42', rule: 'OG Hücresi Kapak Açık', source: 'OG-HUCRESI-2', status: 'Açık', priority: 'Orta', val: 'Açık', desc: 'OG hücresi kapağı açık durumda', duration: '25 dk 18 sn' },
  { time: '15.05.2025 09:45:11', rule: 'Kompr. 2 Titreşim Yüksek', source: 'KOMPRESOR-2', status: 'Aktif', priority: 'Yüksek', val: '6.8 mm/s', desc: 'Titreşim değeri eşik değeri aşıldı (> 6.0 mm/s)', duration: '38 dk 49 sn' },
  { time: '15.05.2025 08:31:05', rule: 'Jeneratör Yük Oranı Yüksek', source: 'JENERATOR-1', status: 'Açık', priority: 'Orta', val: '93 %', desc: 'Jeneratör yük oranı yüksek', duration: '1 sa 52 dk' },
  { time: '15.05.2025 07:10:38', rule: 'Pano 1 Akım Dengesizliği', source: 'PANO-1', status: 'Kapatıldı', priority: 'Orta', val: '12 %', desc: 'Değer normale döndü', duration: '22 dk 14 sn' }
];

export default function AlarmlarView() {
  const { showNotification, openCopilotWithPrompt } = useTheme();
  const [alarmRules, setAlarmRules] = useState(initialAlarmRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectingRule, setInspectingRule] = useState(null);

  // New Rule Modal Form State
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleSource, setNewRuleSource] = useState('TRAFO-2');
  const [newRuleThreshold, setNewRuleThreshold] = useState('> 85 °C');
  const [newRulePriority, setNewRulePriority] = useState('Yüksek');
  const [newRuleMail, setNewRuleMail] = useState(true);
  const [newRuleApp, setNewRuleApp] = useState(true);
  const [newRuleSms, setNewRuleSms] = useState(true);

  const filteredRules = alarmRules.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRuleStatus = (ruleId) => {
    setAlarmRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextStatus = r.status === 'Aktif' ? 'Pasif' : 'Aktif';
        showNotification('Kural Durumu Değişti', `${r.name} kuralı durumu "${nextStatus}" olarak güncellendi.`, 'info');
        return { ...r, status: nextStatus };
      }
      return r;
    }));

    if (inspectingRule && inspectingRule.id === ruleId) {
      setInspectingRule(prev => prev ? { ...prev, status: prev.status === 'Aktif' ? 'Pasif' : 'Aktif' } : null);
    }
  };

  const handleCreateNewRule = (e) => {
    e.preventDefault();
    if (!newRuleName.trim()) {
      showNotification('Hata', 'Lütfen kural adını giriniz.', 'error');
      return;
    }

    const newRule = {
      id: `RULE-00${alarmRules.length + 1}`,
      name: newRuleName,
      source: newRuleSource,
      threshold: newRuleThreshold,
      priority: newRulePriority,
      channels: { mail: newRuleMail, app: newRuleApp, sms: newRuleSms },
      status: 'Aktif',
      lastTrigger: 'Şimdi',
      param: 'Telemetri Eşik Değeri',
      condition: '> (Büyük)',
      thresholdVal: newRuleThreshold,
      delay: '1 dakika',
      primaryUser: 'Enerji Yöneticisi (Hasan Cavit Koçak)',
      secondaryUser: 'Bakım Müdürü',
      infoUser: 'Nöbetçi Elektrikçi',
      escalation: [
        { step: '1. Adım (0-5 dk)', user: 'Birincil Kullanıcılar' },
        { step: '2. Adım (5-15 dk)', user: 'Bakım Müdürü' }
      ],
      quietHours: 'Yok (7/24 Aktif)'
    };

    setAlarmRules([newRule, ...alarmRules]);
    setIsAddingRule(false);
    setNewRuleName('');
    showNotification(
      'Yeni Alarm Kuralı Tanımlandı',
      `"${newRule.name}" kuralı (${newRule.source}) başarıyla oluşturuldu ve aktifleştirildi.`,
      'success'
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Yüksek': return <span className="badge badge-danger">YÜKSEK</span>;
      case 'Orta': return <span className="badge badge-warning">ORTA</span>;
      default: return <span className="badge badge-neutral">DÜŞÜK</span>;
    }
  };

  return (
    <div className="module-view active">
      
      {/* 4 TOP EXECUTIVE METRIC CARDS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Toplam Alarm Kuralı</span>
            <div className="metric-icon blue"><Bell size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">{alarmRules.length + 78}</span>
            <span className="metric-unit">Kural</span>
          </div>
          <div className="metric-subtext">Tüm sistemlerde tanımlı</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Aktif Alarm</span>
            <div className="metric-icon red"><Bell size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--danger-text)' }}>3</span>
            <span className="metric-unit">Kritik</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--danger-text)', fontWeight: 600 }}>
            Hemen aksiyon gerekli
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Susturulmuş Alarm</span>
            <div className="metric-icon orange"><BellOff size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value" style={{ color: 'var(--warning-text)' }}>7</span>
            <span className="metric-unit">Kural</span>
          </div>
          <div className="metric-subtext">Susturma aktif</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Son 24 Saat Alarmı</span>
            <div className="metric-icon purple"><Activity size={18} /></div>
          </div>
          <div className="metric-value-box">
            <span className="metric-value">24</span>
            <span className="metric-unit">Tetikleme</span>
          </div>
          <div className="metric-subtext" style={{ color: 'var(--success-text)', fontWeight: 700 }}>
            ↓ %14 Önceki 24 saate göre
          </div>
        </div>
      </div>

      {/* SECTION 1: ALARM KURALLARI TABLOSU (FULL WIDTH col-span-12) */}
      <div className="dashboard-grid">
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Bell size={20} color="var(--primary)" /> Alarm Kuralları &amp; Bildirim Yöneticisi ({alarmRules.length} Tanımlı Kural)
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="search-box" style={{ width: '220px' }}>
                <Search size={15} />
                <input 
                  type="text" 
                  placeholder="Kural veya kaynak ara..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '12px', padding: '6px 10px 6px 30px' }}
                />
              </div>

              <button 
                className="btn btn-primary" 
                style={{ fontSize: '12px', padding: '6px 14px' }}
                onClick={() => setIsAddingRule(true)}
              >
                <Plus size={15} /> Yeni Kural Ekle
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '13px' }}>
              <thead>
                <tr>
                  <th>Kural Adı</th>
                  <th>Kaynak Cihaz</th>
                  <th>Eşik Değeri</th>
                  <th>Öncelik</th>
                  <th>Bildirim Kanalları</th>
                  <th>Durum</th>
                  <th>Son Tetikleme</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr 
                    key={rule.id}
                    onClick={() => setInspectingRule(rule)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <strong style={{ color: 'var(--text-main)' }}>{rule.name}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rule.id}</div>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{rule.source}</td>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--text-main)' }}>{rule.threshold}</td>
                    <td>{getPriorityBadge(rule.priority)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)' }}>
                        {rule.channels.mail && <Mail size={15} title="E-Posta" color="var(--primary)" />}
                        {rule.channels.app && <Smartphone size={15} title="Uygulama İçi" color="var(--success-text)" />}
                        {rule.channels.sms && <MessageSquare size={15} title="SMS" color="var(--warning-text)" />}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${rule.status === 'Aktif' ? 'badge-success' : 'badge-neutral'}`}>
                        ● {rule.status}
                      </span>
                    </td>
                    <td className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rule.lastTrigger}</td>
                    <td>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingRule(rule);
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

        {/* SECTION 2: SON ALARM GEÇMİŞİ (AUDIT LOG TABLE - FULL WIDTH col-span-12) */}
        <div className="card col-span-12">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px' }}>
              <Clock size={20} color="var(--primary)" /> Son Alarm Tetiklenme Geçmişi (Canlı Audit Log)
            </div>
            <button 
              className="btn btn-outline" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => showNotification('Alarm Geçmişi', 'Son 100 alarm tetiklenmesi canlı yüklendi.', 'info')}
            >
              Tüm Geçmişi Gör <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '12.5px' }}>
              <thead>
                <tr>
                  <th>Tetiklenme Zamanı</th>
                  <th>Kural Adı</th>
                  <th>Kaynak</th>
                  <th>Durum</th>
                  <th>Öncelik</th>
                  <th>Anlık Değer</th>
                  <th>Açıklama &amp; Eşik</th>
                  <th>Geçen Süre</th>
                </tr>
              </thead>
              <tbody>
                {alarmHistoryList.map((hist, idx) => (
                  <tr key={idx}>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--text-main)' }}>{hist.time}</td>
                    <td><strong>{hist.rule}</strong></td>
                    <td style={{ color: 'var(--text-muted)' }}>{hist.source}</td>
                    <td>
                      <span className={`badge ${hist.status === 'Aktif' ? 'badge-danger' : (hist.status === 'Açık' ? 'badge-warning' : 'badge-success')}`}>
                        ● {hist.status}
                      </span>
                    </td>
                    <td>{getPriorityBadge(hist.priority)}</td>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--danger-text)' }}>{hist.val}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{hist.desc}</td>
                    <td className="mono" style={{ color: 'var(--warning-text)', fontWeight: 600 }}>{hist.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* NEW RULE CREATION POP-UP MODAL */}
      {isAddingRule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '560px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px' }}>
              <div className="card-title" style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Plus size={22} color="var(--primary)" />
                <span>Yeni Alarm Kuralı Tanımla</span>
              </div>
              <button className="btn-close-copilot" onClick={() => setIsAddingRule(false)}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateNewRule} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Kural Adı &amp; Tanımı</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Örn: Trafo-2 Aşırı Sıcaklık Uyarısı" 
                  value={newRuleName} 
                  onChange={(e) => setNewRuleName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-card)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Kaynak Cihaz</label>
                  <select 
                    value={newRuleSource} 
                    onChange={(e) => setNewRuleSource(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-card)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px' }}
                  >
                    <option value="TRAFO-1">TRAFO-1 (Ana Trafo)</option>
                    <option value="TRAFO-2">TRAFO-2 (Yedek Trafo)</option>
                    <option value="KOMPRESOR-1">KOMPRESÖR-1</option>
                    <option value="OG-HUCRESI-1">OG HÜCRESİ-1</option>
                    <option value="PANO-2">PANO-2 ÜRETİM</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Öncelik Seviyesi</label>
                  <select 
                    value={newRulePriority} 
                    onChange={(e) => setNewRulePriority(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-card)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px' }}
                  >
                    <option value="Yüksek">Yüksek (Kritik)</option>
                    <option value="Orta">Orta (Sarı Uyarı)</option>
                    <option value="Düşük">Düşük (Bilgilendirme)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Eşik Değeri &amp; Koşulu</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Örn: > 85 °C veya > 6.5 mm/s" 
                  value={newRuleThreshold} 
                  onChange={(e) => setNewRuleThreshold(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-card)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Bildirim Kanalları</label>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={newRuleMail} onChange={(e) => setNewRuleMail(e.target.checked)} /> E-posta
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={newRuleApp} onChange={(e) => setNewRuleApp(e.target.checked)} /> Uygulama İçi
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={newRuleSms} onChange={(e) => setNewRuleSms(e.target.checked)} /> SMS
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-card)' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '12px' }}>
                  <Save size={15} /> Kuralı Kaydet &amp; Aktifleştir
                </button>
                <button type="button" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => setIsAddingRule(false)}>
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WIDE HORIZONTAL 2-COLUMN POP-UP "SEÇİLİ KURAL DETAYLARI" MODAL */}
      {inspectingRule && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-sidebar)', border: '1px solid var(--border-card)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            
            {/* Modal Header */}
            <div className="card-header" style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: '14px', position: 'sticky', top: 0, background: 'var(--bg-sidebar)', zIndex: 10 }}>
              <div className="card-title" style={{ fontSize: '17px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={22} color="var(--primary)" />
                <span>Seçili Kural Detayları: <strong>{inspectingRule.name}</strong></span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Active Switch Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => toggleRuleStatus(inspectingRule.id)}>
                  <span style={{ fontSize: '12px', color: inspectingRule.status === 'Aktif' ? 'var(--success-text)' : 'var(--text-muted)', fontWeight: 700 }}>
                    {inspectingRule.status === 'Aktif' ? '● Kural Aktif' : '○ Kural Pasif'}
                  </span>
                  <div style={{ width: '38px', height: '20px', background: inspectingRule.status === 'Aktif' ? '#10b981' : 'var(--border-card)', borderRadius: '10px', padding: '2px', transition: 'all 0.2s' }}>
                    <div style={{ width: '16px', height: '16px', background: '#ffffff', borderRadius: '50%', transform: inspectingRule.status === 'Aktif' ? 'translateX(18px)' : 'translateX(0)', transition: 'all 0.2s' }}></div>
                  </div>
                </div>

                <button className="btn-close-copilot" onClick={() => setInspectingRule(null)}>
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Modal Body (Wide Horizontal 2-Column Split Layout) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px 0' }}>
              
              {/* LEFT COLUMN: Eşik Ayarları, Bildirim Kanalları & Sessiz Saatler */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* 1. Eşik Ayarları */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} color="var(--primary)" /> 1. Eşik Ayarları
                    </strong>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => showNotification('Düzenle', 'Eşik ayarları düzenleme açıldı.', 'info')}>
                      <Edit3 size={13} /> Düzenle
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>İzlenen Parametre:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.param}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Mantıksal Koşul:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.condition}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Eşik Değeri:</span>
                      <strong className="mono" style={{ color: 'var(--danger-text)', fontSize: '14px' }}>{inspectingRule.thresholdVal}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Gecikme Süresi:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.delay}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Bildirim Kanalları */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Send size={16} color="var(--primary)" /> 2. Bildirim Kanalları
                    </strong>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => showNotification('Düzenle', 'Bildirim kanalları düzenleme açıldı.', 'info')}>
                      <Edit3 size={13} /> Düzenle
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className={`badge ${inspectingRule.channels.mail ? 'badge-info' : 'badge-neutral'}`} style={{ padding: '7px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={13} /> E-posta {inspectingRule.channels.mail ? '✓' : '✗'}
                    </span>
                    <span className={`badge ${inspectingRule.channels.app ? 'badge-success' : 'badge-neutral'}`} style={{ padding: '7px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Smartphone size={13} /> Uygulama İçi {inspectingRule.channels.app ? '✓' : '✗'}
                    </span>
                    <span className={`badge ${inspectingRule.channels.sms ? 'badge-warning' : 'badge-neutral'}`} style={{ padding: '7px 12px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={13} /> SMS Mobil {inspectingRule.channels.sms ? '✓' : '✗'}
                    </span>
                  </div>
                </div>

                {/* 3. Sessiz Saatler */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Moon size={16} color="var(--primary)" /> 3. Sessiz Saatler (Kısıt)
                    </strong>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => showNotification('Düzenle', 'Sessiz saatler ayarı açıldı.', 'info')}>
                      <Edit3 size={13} /> Düzenle
                    </button>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.quietHours}</strong> - Bu saatlerde tekrarlı sesli/SMS alarm gönderilmez.
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Sorumlu Kullanıcılar & Yükseltme Adımları */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* 4. Sorumlu Kullanıcılar */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <UserCheck size={16} color="var(--primary)" /> 4. Sorumlu Kullanıcılar
                    </strong>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => showNotification('Düzenle', 'Sorumlu kullanıcı listesi açıldı.', 'info')}>
                      <Edit3 size={13} /> Düzenle
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Birincil Sorumlu:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.primaryUser}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>İkincil Sorumlu:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.secondaryUser}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Bilgilendirilen:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{inspectingRule.infoUser}</strong>
                    </div>
                  </div>
                </div>

                {/* 5. Yükseltme (Eskalasyon) Adımları */}
                <div style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '6px' }}>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={16} color="var(--warning-text)" /> 5. Yükseltme (Eskalasyon) Adımları
                    </strong>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => showNotification('Düzenle', 'Eskalasyon seviyeleri düzenleme açıldı.', 'info')}>
                      <Edit3 size={13} /> Düzenle
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    {inspectingRule.escalation.map((esc, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{esc.step}</span>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{esc.user}</span>
                      </div>
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
                onClick={() => {
                  showNotification('Test Bildirimi Gönderildi', `${inspectingRule.name} kuralı için test uyarısı iletildi.`, 'success');
                }}
              >
                <Send size={15} /> Test Bildirimi Gönder
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '8px 20px', fontSize: '12px' }}
                  onClick={() => {
                    const prompt = `${inspectingRule.name} alarm kuralı ve eskalasyon matrisi için optimizasyon önerisi sun`;
                    setInspectingRule(null);
                    openCopilotWithPrompt(prompt);
                  }}
                >
                  <Sparkles size={15} /> AI ile Kuralı İncele
                </button>
                <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => setInspectingRule(null)}>
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
