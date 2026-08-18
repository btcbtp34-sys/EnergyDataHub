import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  Flame, 
  Wind, 
  Banknote, 
  RefreshCw, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail
} from 'lucide-react';

export default function CopilotDrawer() {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    copilotInitialPrompt, 
    setCopilotInitialPrompt,
    copilotProposal,
    setCopilotProposal 
  } = useTheme();

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      html: `<strong>Merhaba Enerji Yöneticisi!</strong><br>Ben <strong>BTC Energy AI</strong>. Tesisinizin anlık telemetri verilerini, SAP entegrasyonlarını ve anomali analizlerini sizin için izliyorum.<br><br><em>Aşağıdaki hızlı sorulardan birini seçebilir veya sorunuzu yazabilirsiniz:</em>`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (copilotInitialPrompt && isCopilotOpen) {
      handleSendMessage(copilotInitialPrompt);
      setCopilotInitialPrompt('');
    }
  }, [copilotInitialPrompt, isCopilotOpen]);

  useEffect(() => {
    if (copilotProposal && isCopilotOpen) {
      handleProposalReceived(copilotProposal);
      setCopilotProposal(null);
    }
  }, [copilotProposal, isCopilotOpen]);

  const handleProposalReceived = (proposal) => {
    const proposalMsg = {
      id: `prop-${Date.now()}`,
      sender: 'assistant',
      isProposal: true,
      proposalData: proposal,
      status: 'pending' // 'pending' | 'executing' | 'completed'
    };

    setMessages((prev) => [...prev, proposalMsg]);
  };

  const handleExecuteAction = (msgId, actionType, actionLabel) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === msgId ? { ...msg, status: 'completed', executedAction: actionLabel } : msg
      )
    );

    // Append user confirmation
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: `✅ Onaylıyorum: ${actionLabel}` }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (actionType === 'cancel') {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            html: `<div style="font-weight:700; color:var(--text-muted); margin-bottom:4px;">❌ Aksiyon İptal Edildi</div>Aksiyon talebi kullanıcı tarafından iptal edildi. Anomali izlemeye devam ediliyor.`
          }
        ]);
        return;
      }

      const sapWoId = `WO-2026-${Math.floor(8000 + Math.random() * 1000)}`;
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          html: `<div style="font-weight:700; color:var(--success-text); margin-bottom:6px;">✅ Aksiyon Planı Başarıyla İşleme Alındı!</div>
          <div style="background:var(--bg-card-hover); border-left:3px solid var(--success-text); padding:10px 12px; border-radius:8px; font-size:12px; margin-bottom:8px;">
            • <strong>SAP PM İş Emri No:</strong> <span class="mono" style="color:var(--primary); font-weight:800;">${sapWoId}</span><br>
            • <strong>Entegrasyon Modülü:</strong> SAP S/4HANA PM (Plant Maintenance)<br>
            • <strong>Atanan Sorumlu:</strong> Saha Bakım Kıdemli Teknisyeni (Ahmet Yılmaz)<br>
            • <strong>Bildirimler:</strong> SMS ve E-Posta ile teknik ekibe eskalasyon yapıldı.
          </div>
          <em>Anomali durumu "Çözüm Sürecinde (SAP İş Emri Açıldı)" olarak güncellendi.</em>`
        }
      ]);
    }, 800);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('hat-2') || q.includes('doğalgaz') || q.includes('anomali')) {
      return `<div style="font-weight:700; color:var(--danger-text); margin-bottom:6px;">Hat-2 Doğalgaz Yoğunluğu Analizi</div>
      Hat-2 üzerindeki gaz analizörü verilerine göre anlık tüketim <span class="highlight">28,7 Sm³/ton</span> seviyesindedir. Bu değer, izin verilen maksimum eşiğin (<span class="highlight">%23,0</span>) <strong style="color:var(--danger-text)">%32 üzerindedir</strong>.<br><br>
      <div style="background:var(--danger-bg); border-left:3px solid var(--danger); padding:8px 12px; border-radius:6px; margin:8px 0;">
        <strong>Tahmini Finansal Etki:</strong> ₺217,800/ay ekstra kayıp<br>
        <strong>Kök Neden:</strong> %55 Kalibrasyon Kayması / %25 Sensör Yaşlanması
      </div>
      <strong>Önerilen Aksiyon:</strong> Sahadaki vana ve debimetre kalibrasyonunun kontrol edilmesi önerilir.`;
    }

    if (q.includes('kompresör') || q.includes('hava') || q.includes('kaçak') || q.includes('basınç')) {
      return `<div style="font-weight:700; color:var(--warning-text); margin-bottom:6px;">Kompresör & Basınçlı Hava Analizi</div>
      Kompresör-2 çıkış basıncı <span class="highlight">4,1 bar</span> seviyesine gerilemiştir (Minimum eşik: 4,5 bar).<br><br>
      Sistemde <strong style="color:var(--warning-text)">%18 oranında gereksiz yük</strong> ve muhtemel hat kaçakları tespit edilmiştir.<br>
      Tahmini kayıp etki büyüklüğü: ₺148,300/ay.`;
    }

    if (q.includes('maliyet') || q.includes('tl/ton') || q.includes('bugün')) {
      return `<div style="font-weight:700; color:var(--purple-text); margin-bottom:6px;">Bugünkü Enerji Maliyet Özeti</div>
      Bugünkü birim ürün enerji maliyetimiz <span class="highlight">186,7 TL/ton</span> seviyesindedir.<br>
      Dünün ortalamasına (201,3 TL/ton) göre <strong style="color:var(--success-text)">%7,2 verimlilik artışı</strong> sağlanmıştır.<br>
      Toplam 80 ton üretim gerçekleşmiş olup günlük harcama ~₺14.936 seviyesindedir.`;
    }

    if (q.includes('sap') || q.includes('aktarım') || q.includes('entegrasyon')) {
      return `<div style="font-weight:700; color:var(--success-text); margin-bottom:6px;">SAP S/4HANA Entegrasyon Durumu</div>
      SAP senkronizasyonu <strong style="color:var(--success-text)">Sağlıklı (OK)</strong> durumdadır.<br>
      • Son Aktarım: 10:22 (Başarılı)<br>
      • Aktarılan Kayıt Sayısı: 12.842 (%98,6 başarı)<br>
      • AUFNR (Üretim Emri) ve MATNR (Malzeme) eşleştirmeleri sorunsuz tamamlanmıştır.`;
    }

    if (q.includes('kpi') || q.includes('hedef') || q.includes('elektrik')) {
      return `<div style="font-weight:700; color:var(--primary); margin-bottom:6px;">Elektrik Yoğunluğu KPI Analizi</div>
      Elektrik yoğunluğu şu an <span class="highlight">342,6 kWh/ton</span> seviyesindedir.<br>
      Aylık Hedef: 350,0 kWh/ton.<br>
      Performans hedefin <strong style="color:var(--success-text)">%2.1 altındadır (Başarılı)</strong>.`;
    }

    return `<div style="font-weight:700; color:var(--primary); margin-bottom:6px;">BTC Energy AI</div>
    Sorgunuz analiz edildi: "<em>${query}</em>"<br><br>
    Canlı telemetri verilerine göre tesis genelinde toplam 1.18 MW aktif elektrik gücü çekilmektedir. Elektrik ve Su yoğunlukları hedeflenen eşik değerler dahilinde seyrederken, <strong>Hat-2 Doğalgaz hattında</strong> ve <strong>Kompresör-2 basınç seviyesinde</strong> anomali takibi devam etmektedir.`;
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyHtml = generateAIResponse(text);
      setMessages((prev) => [...prev, { sender: 'assistant', html: replyHtml }]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`copilot-drawer ${isCopilotOpen ? 'open' : ''}`}>
      <div className="copilot-header">
        <div className="copilot-title">
          <div className="copilot-sparkle">
            <Sparkles size={18} />
          </div>
          <div>
            <div>BTC Energy AI</div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>Akıllı Enerji AI Asistanı</div>
          </div>
        </div>
        <button className="btn-close-copilot" onClick={() => setIsCopilotOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <div className="copilot-body">
        {messages.map((msg, index) => (
          msg.isProposal ? (
            <div key={msg.id || index} className="chat-bubble assistant" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: '14px', width: '100%', maxWidth: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px' }}>
                <Sparkles size={16} /> 🤖 AI Önerilen Aksiyon Planı
              </div>

              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                {msg.proposalData.title || 'Anomali Çözüm Aksiyon Önerisi'}
              </div>

              {msg.proposalData.location && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Lokasyon: {msg.proposalData.location}
                </div>
              )}

              {msg.proposalData.impact && (
                <div style={{ background: 'var(--danger-bg)', borderLeft: '3px solid var(--danger)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: 'var(--danger-text)', marginBottom: '8px' }}>
                  <strong>Finansal Etki:</strong> {msg.proposalData.impact}
                </div>
              )}

              <div style={{ fontSize: '12px', color: 'var(--text-main)', marginBottom: '10px' }}>
                <strong>Önerilen Aksiyon Adımları:</strong>
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  <li>SAP S/4HANA PM modülünde Bakım İş Emri kaydı açılması</li>
                  <li>Saha Kıdemli Teknisyenine SMS/E-posta ile eskalasyon yapılması</li>
                </ul>
              </div>

              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                İşlemi onaylamak ister misiniz?
              </div>

              {msg.status === 'pending' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button 
                    className="btn btn-primary" 
                    style={{ fontSize: '11px', padding: '8px 12px', width: '100%', justifyContent: 'center' }}
                    onClick={() => handleExecuteAction(msg.id, 'sap', 'SAP S/4HANA İş Emri Oluştur & Teknisyene Bildir')}
                  >
                    <FileText size={13} /> ✅ SAP S/4HANA İş Emri Aç & Teknisyene Bildir
                  </button>

                  <button 
                    className="btn btn-outline" 
                    style={{ fontSize: '11px', padding: '6px 12px', width: '100%', justifyContent: 'center' }}
                    onClick={() => handleExecuteAction(msg.id, 'cancel', 'İptal Et')}
                  >
                    <X size={13} /> ❌ Talebi İptal Et
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success-text)', background: 'var(--success-bg)', padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> Karar Verildi: {msg.executedAction}
                </div>
              )}
            </div>
          ) : msg.html ? (
            <div
              key={index}
              className={`chat-bubble ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.html }}
            />
          ) : (
            <div key={index} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          )
        ))}

        {isTyping && (
          <div className="chat-bubble assistant" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <em>Model ve telemetri analiz ediliyor...</em>
          </div>
        )}

        <div ref={messagesEndRef} />

        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>Önerilen Analizler:</div>
          <div className="copilot-suggestions">
            <button className="suggestion-chip" onClick={() => handleSendMessage('Hat-2 doğalgaz anomalisi')}>
              <Flame size={12} /> Hat-2 Anomali Analizi
            </button>
            <button className="suggestion-chip" onClick={() => handleSendMessage('Kompresör hava kaçakları')}>
              <Wind size={12} /> Kompresör Kaçak Riskleri
            </button>
            <button className="suggestion-chip" onClick={() => handleSendMessage('Bugünkü enerji maliyeti')}>
              <Banknote size={12} /> Bugünkü Maliyet Özeti
            </button>
            <button className="suggestion-chip" onClick={() => handleSendMessage('SAP entegrasyon durumu')}>
              <RefreshCw size={12} /> SAP Entegrasyon Durumu
            </button>
          </div>
        </div>
      </div>

      <div className="copilot-footer">
        <input
          type="text"
          className="copilot-input"
          placeholder="Enerji verileri veya anomali sorun..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn-send-chat" onClick={() => handleSendMessage()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
