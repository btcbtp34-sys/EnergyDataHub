/* ==========================================================================
   BTC Energy Data Hub - Theme Engine, App Logic & AI Copilot Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initNavigation();
  initLiveClock();
  initCharts();
  initCopilot();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (DARK GLASS, YELLOW-BLACK, LIGHT)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const savedTheme = localStorage.getItem('btc_hub_theme') || 'dark';
  setTheme(savedTheme);

  const themeCards = document.querySelectorAll('[data-theme-btn]');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      const themeName = card.getAttribute('data-theme-btn');
      setTheme(themeName);
    });
  });
}

function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  localStorage.setItem('btc_hub_theme', themeName);

  // Update theme cards active state
  const themeCards = document.querySelectorAll('[data-theme-btn]');
  themeCards.forEach(card => {
    if (card.getAttribute('data-theme-btn') === themeName) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Re-render charts with appropriate text/grid colors for light vs dark themes
  updateChartsTheme(themeName);
}

function updateChartsTheme(themeName) {
  if (!chartInstances.energyDensity) return;

  const isLight = themeName === 'light';
  const textColor = isLight ? '#475569' : (themeName === 'yellow-black' ? '#d4d4d8' : '#94a3b8');
  const gridColor = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)';

  Chart.defaults.color = textColor;
  Chart.defaults.scale.grid.color = gridColor;

  Object.values(chartInstances).forEach(chart => {
    if (chart && chart.options) {
      if (chart.options.scales) {
        if (chart.options.scales.x) chart.options.scales.x.grid.color = gridColor;
        if (chart.options.scales.y) chart.options.scales.y.grid.color = gridColor;
      }
      chart.update();
    }
  });
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & MODULE SWITCHING
   -------------------------------------------------------------------------- */
const pageTitles = {
  'dashboard': 'Executive Dashboard',
  'canli-veri': 'Canlı Veri & Telemetri',
  'tek-hat': 'Tek Hat Şeması & Denge Kontrolü',
  'kpi': 'KPI Analizi & Korelasyon',
  'anomaliler': 'Anomali Merkezi & Kök Neden Analizi',
  'sap': 'SAP S/4HANA Entegrasyonu & Raporlar',
  'alarmlar': 'Alarm Yönetimi & Eskalasyon',
  'cihazlar': 'Saha Cihazları ve Sistem Logları',
  'ayarlar': 'Sistem Ayarları & Birim Fiyatlar',
  'kullanicilar': 'Kullanıcı Yönetimi & Rol Matrisi'
};

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const moduleViews = document.querySelectorAll('.module-view');
  const titleEl = document.getElementById('current-page-title');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      moduleViews.forEach(v => v.classList.remove('active'));
      const activeView = document.getElementById(`view-${targetView}`);
      if (activeView) activeView.classList.add('active');

      if (titleEl && pageTitles[targetView]) {
        titleEl.textContent = pageTitles[targetView];
      }
    });
  });

  const btnViewAll = document.getElementById('btn-view-all-anomalies');
  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => {
      const anomalyNav = document.querySelector('.nav-item[data-view="anomaliler"]');
      if (anomalyNav) anomalyNav.click();
    });
  }
}

/* --------------------------------------------------------------------------
   3. LIVE CLOCK
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  function updateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('tr-TR');
    if (clockEl) clockEl.textContent = `${dateStr} ${timeStr}`;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   4. CHART.JS SETUP
   -------------------------------------------------------------------------- */
let chartInstances = {};

function initCharts() {
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', 'Inter', sans-serif";
  Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';

  // Chart 1: Energy Density Trend (kWh/ton)
  const ctx1 = document.getElementById('chart-energy-density');
  if (ctx1) {
    const c1 = ctx1.getContext('2d');
    const grad1 = c1.createLinearGradient(0, 0, 0, 240);
    grad1.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
    grad1.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    chartInstances.energyDensity = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
        datasets: [
          {
            label: 'kWh/ton',
            data: [415, 385, 350, 320, 318, 298, 342.6],
            borderColor: '#3b82f6',
            backgroundColor: grad1,
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
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 250, max: 450 } }
      }
    });
  }

  // Chart 2: Cost Density Trend (TL/ton)
  const ctx2 = document.getElementById('chart-cost-density');
  if (ctx2) {
    const c2 = ctx2.getContext('2d');
    const grad2 = c2.createLinearGradient(0, 0, 0, 240);
    grad2.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
    grad2.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

    chartInstances.costDensity = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['09 May', '10 May', '11 May', '12 May', '13 May', '14 May', '15 May'],
        datasets: [{
          label: 'TL/ton',
          data: [305, 280, 255, 228, 205, 182, 186.7],
          borderColor: '#8b5cf6',
          backgroundColor: grad2,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#8b5cf6',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 100, max: 350 } }
      }
    });
  }

  // Chart 3: Consumption Donut
  const ctx3 = document.getElementById('chart-consumption-donut');
  if (ctx3) {
    chartInstances.consumptionDonut = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Elektrik (%61,2)', 'Doğalgaz (%27,4)', 'Su (%8,6)', 'Basınçlı Hava (%2,8)'],
        datasets: [{
          data: [765, 342, 108, 35],
          backgroundColor: ['#3b82f6', '#f97316', '#06b6d4', '#10b981'],
          borderWidth: 3,
          borderColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // Chart 4: Line Density Bar
  const ctx4 = document.getElementById('chart-line-density');
  if (ctx4) {
    chartInstances.lineDensity = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: ['Hat-1', 'Hat-2', 'Hat-3'],
        datasets: [{
          label: 'kWh/ton',
          data: [312.5, 356.8, 318.6],
          backgroundColor: ['#3b82f6', '#ea580c', '#10b981'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 200, max: 450 } }
      }
    });
  }

  // Chart 5: Live AG Power Chart
  const ctx5 = document.getElementById('chart-live-ag');
  if (ctx5) {
    const c5 = ctx5.getContext('2d');
    const grad5 = c5.createLinearGradient(0, 0, 0, 240);
    grad5.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
    grad5.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    chartInstances.liveAg = new Chart(ctx5, {
      type: 'line',
      data: {
        labels: ['09:24', '09:39', '09:54', '10:09', '10:24'],
        datasets: [{
          label: 'Aktif Güç (MW)',
          data: [1.16, 1.22, 1.18, 1.24, 1.18],
          borderColor: '#06b6d4',
          backgroundColor: grad5,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#06b6d4'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  // Chart 6: KPI Product Bar
  const ctx6 = document.getElementById('chart-kpi-product-bar');
  if (ctx6) {
    chartInstances.kpiProductBar = new Chart(ctx6, {
      type: 'bar',
      data: {
        labels: ['Çelik', 'Alüminyum', 'Plastik', 'Döküm'],
        datasets: [{
          label: 'kWh/ton',
          data: [412.5, 368.9, 278.4, 335.7],
          backgroundColor: '#3b82f6',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  // Chart 7: KPI Scatter
  const ctx7 = document.getElementById('chart-kpi-scatter');
  if (ctx7) {
    chartInstances.kpiScatter = new Chart(ctx7, {
      type: 'scatter',
      data: {
        datasets: [{
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
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Üretim (Ton)' } },
          y: { title: { display: true, text: 'Elektrik Tüketimi (kWh)' } }
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE HANDLERS
   -------------------------------------------------------------------------- */
function showNodeDetails(name, voltage, power, energy) {
  alert(`⚡ ${name} Detayları:\n- Gerilim Seviyesi: ${voltage}\n- Anlık Aktif Güç: ${power}\n- Toplam Enerji: ${energy}\n\nDurum: ÇEVRİMİÇİ VE DENGEDE ✓`);
}

function triggerAnomalyAction() {
  alert('🛠️ Otomatik Aksiyon Planı Oluşturuldu!\n\n1. Hat-2 Saha Teknisyenine SMS ve e-posta bildirimi gönderildi.\n2. Kalibrasyon iş emri SAP S/4HANA PM modülüne iletildi.');
}

function downloadReport(reportName) {
  alert(`📥 ${reportName} başarıyla yüksek çözünürlüklü PDF formatında indirildi!`);
}

/* --------------------------------------------------------------------------
   6. BTC AI COPILOT CHAT ENGINE & FAB
   -------------------------------------------------------------------------- */
function initCopilot() {
  const drawer = document.getElementById('copilot-drawer');
  const openBtn = document.getElementById('open-copilot-btn');
  const fabBtn = document.getElementById('copilot-fab');
  const closeBtn = document.getElementById('close-copilot-btn');

  const toggleDrawer = () => drawer.classList.toggle('open');
  const openDrawer = () => drawer.classList.add('open');
  const closeDrawer = () => drawer.classList.remove('open');

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (fabBtn) fabBtn.addEventListener('click', toggleDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
}

function askCopilot(promptText) {
  const drawer = document.getElementById('copilot-drawer');
  drawer.classList.add('open');
  
  const inputEl = document.getElementById('copilot-input-field');
  if (inputEl) {
    inputEl.value = promptText;
    sendCopilotMessage();
  }
}

function sendCopilotMessage() {
  const inputEl = document.getElementById('copilot-input-field');
  const messagesContainer = document.getElementById('copilot-messages');
  const userText = inputEl.value.trim();

  if (!userText) return;

  // 1. Append User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = userText;
  messagesContainer.appendChild(userBubble);

  inputEl.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // 2. Typing animation
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-bubble assistant';
  typingBubble.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <em>Model ve telemetri analiz ediliyor...</em>';
  messagesContainer.appendChild(typingBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // 3. Generate AI Response
  setTimeout(() => {
    typingBubble.remove();
    const replyText = generateAIResponse(userText);

    const assistantBubble = document.createElement('div');
    assistantBubble.className = 'chat-bubble assistant';
    assistantBubble.innerHTML = replyText;
    messagesContainer.appendChild(assistantBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 700);
}

function generateAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('hat-2') || q.includes('doğalgaz') || q.includes('anomali')) {
    return `<div style="font-weight:700; color:var(--danger-text); margin-bottom:6px;"><i class="fa-solid fa-triangle-exclamation"></i> Hat-2 Doğalgaz Yoğunluğu Analizi</div>
    Hat-2 üzerindeki gaz analizörü verilerine göre anlık tüketim <span class="highlight">28,7 Sm³/ton</span> seviyesindedir. Bu değer, izin verilen maksimum eşiğin (<span class="highlight">%23,0</span>) <strong style="color:var(--danger-text)">%32 üzerindedir</strong>.<br><br>
    <div style="background:var(--danger-bg); border-left:3px solid var(--danger); padding:8px 12px; border-radius:6px; margin:8px 0;">
      💸 <strong>Tahmini Finansal Etki:</strong> ₺217,800/ay ekstra kayıp<br>
      🔍 <strong>Kök Neden:</strong> %55 Kalibrasyon Kayması / %25 Sensör Yaşlanması
    </div>
    🛠️ <strong>Önerilen Aksiyon:</strong> Sahadaki vana ve debimetre kalibrasyonunun kontrol edilmesi önerilir.`;
  }

  if (q.includes('kompresör') || q.includes('hava') || q.includes('kaçak') || q.includes('basınç')) {
    return `<div style="font-weight:700; color:var(--warning-text); margin-bottom:6px;"><i class="fa-solid fa-wind"></i> Kompresör & Basınçlı Hava Analizi</div>
    Kompresör-2 çıkış basıncı <span class="highlight">4,1 bar</span> seviyesine gerilemiştir (Minimum eşik: 4,5 bar).<br><br>
    ⚠️ Sistemde <strong style="color:var(--warning-text)">%18 oranında gereksiz yük</strong> ve muhtemel hat kaçakları tespit edilmiştir.<br>
    💰 Tahmini kayıp etki büyüklüğü: ₺148,300/ay.`;
  }

  if (q.includes('maliyet') || q.includes('tl/ton') || q.includes('bugün')) {
    return `<div style="font-weight:700; color:var(--purple-text); margin-bottom:6px;"><i class="fa-solid fa-turkish-lira-sign"></i> Bugünkü Enerji Maliyet Özeti</div>
    Bugünkü birim ürün enerji maliyetimiz <span class="highlight">186,7 TL/ton</span> seviyesindedir.<br>
    📉 Dünün ortalamasına (201,3 TL/ton) göre <strong style="color:var(--success-text)">%7,2 verimlilik artışı</strong> sağlanmıştır.<br>
    Toplam 80 ton üretim gerçekleşmiş olup günlük harcama ~₺14.936 seviyesindedir.`;
  }

  if (q.includes('sap') || q.includes('aktarım') || q.includes('entegrasyon')) {
    return `<div style="font-weight:700; color:var(--success-text); margin-bottom:6px;"><i class="fa-solid fa-arrows-rotate"></i> SAP S/4HANA Entegrasyon Durumu</div>
    SAP senkronizasyonu <strong style="color:var(--success-text)">Sağlıklı (OK)</strong> durumdadır.<br>
    • Son Aktarım: 10:22 (Başarılı)<br>
    • Aktarılan Kayıt Sayısı: 12.842 (%98,6 başarı)<br>
    • AUFNR (Üretim Emri) ve MATNR (Malzeme) eşleştirmeleri sorunsuz tamamlanmıştır.`;
  }

  if (q.includes('kpi') || q.includes('hedef') || q.includes('elektrik')) {
    return `<div style="font-weight:700; color:var(--primary); margin-bottom:6px;"><i class="fa-solid fa-bolt"></i> Elektrik Yoğunluğu KPI Analizi</div>
    Elektrik yoğunluğu şu an <span class="highlight">342,6 kWh/ton</span> seviyesindedir.<br>
    🎯 Aylık Hedef: 350,0 kWh/ton.<br>
    ✅ Performans hedefin <strong style="color:var(--success-text)">%2.1 altındadır (Başarılı)</strong>.`;
  }

  return `<div style="font-weight:700; color:var(--primary); margin-bottom:6px;"><i class="fa-solid fa-robot"></i> BTC Energy AI Copilot</div>
  Sorgunuz analiz edildi: "<em>${query}</em>"<br><br>
  Canlı telemetri verilerine göre tesis genelinde toplam 1.18 MW aktif elektrik gücü çekilmektedir. Elektrik ve Su yoğunlukları hedeflenen eşik değerler dahilinde seyrederken, <strong>Hat-2 Doğalgaz hattında</strong> ve <strong>Kompresör-2 basınç seviyesinde</strong> anomali takibi devam etmektedir.`;
}
