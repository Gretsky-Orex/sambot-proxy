const stateByVertical = {
  repair: {
    subtitle: "CRM для сервиса ремонта смартфонов",
    kpis: [
      ["Выручка сегодня", "₽ 54 200"],
      ["Активные заявки", "18"],
      ["Средний чек", "₽ 2 740"],
      ["Загрузка мастеров", "82%"],
    ],
  },
  beauty: {
    subtitle: "CRM для салона красоты",
    kpis: [["Выручка сегодня", "₽ 47 900"],["Записей", "26"],["Средний чек", "₽ 1 840"],["No-show", "6%"]],
  },
  flowers: {
    subtitle: "CRM для цветочного магазина",
    kpis: [["Выручка сегодня", "₽ 39 600"],["Заказов", "31"],["Средний чек", "₽ 1 280"],["Доставок вовремя", "93%"]],
  },
  autoservice: {
    subtitle: "CRM для автосервиса",
    kpis: [["Выручка сегодня", "₽ 76 300"],["Заказ-нарядов", "14"],["Средний чек", "₽ 5 450"],["Загрузка постов", "88%"]],
  },
};

const customers = [
  ["Иван Петров", "+7 900 111-22-33", "Сегодня", "₽ 7 900"],
  ["Алина Смирнова", "+7 900 200-31-40", "Вчера", "₽ 3 200"],
  ["Денис Орлов", "+7 901 400-40-98", "2 дня назад", "₽ 12 600"],
  ["Мария Лазарева", "+7 911 300-77-12", "Сегодня", "₽ 5 100"],
];

const recent = [
  "#W-241 Диагностика iPhone 12 → В работе",
  "#W-242 Замена дисплея Samsung A52 → Ожидает запчасть",
  "#W-243 Чистка динамика iPhone 11 → Готово к выдаче",
  "#W-244 Замена батареи Xiaomi 11T → Оплачено",
];

const pipeline = {
  "Новые": ["#W-250 Треснул экран iPhone 13", "#W-251 Не заряжается Poco X3"],
  "Диагностика": ["#W-247 iPhone XR перегревается"],
  "В работе": ["#W-241 Диагностика iPhone 12", "#W-246 Замена камеры iPhone 14"],
  "Готово": ["#W-244 Замена батареи Xiaomi 11T"],
};

const schedule = [
  "10:00 — Иван Петров / Диагностика",
  "11:30 — Алина Смирнова / Замена дисплея",
  "13:00 — Денис Орлов / Замена аккумулятора",
  "16:30 — Мария Лазарева / Выдача устройства",
];

const payments = [
  ["Мария Лазарева", "Замена батареи", "₽ 3 900", "Оплачено"],
  ["Иван Петров", "Диагностика", "₽ 900", "Оплачено"],
  ["Алина Смирнова", "Дисплей", "₽ 6 500", "Ожидает"],
];

const viewMeta = {
  dashboard: ["Дашборд", "Операционный контроль бизнеса в реальном времени"],
  customers: ["Клиенты", "Единая база и история взаимодействий"],
  pipeline: ["Воронка", "Управление статусами заявок по этапам"],
  calendar: ["Календарь", "Распределение нагрузки сотрудников"],
  payments: ["Оплаты", "Контроль выручки и закрытия заказов"],
};

function setActiveView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(view).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  document.getElementById('view-title').textContent = viewMeta[view][0];
  document.getElementById('view-subtitle').textContent = viewMeta[view][1];
}

function renderKpis(vertical) {
  const el = document.getElementById('kpi-grid');
  el.innerHTML = '';
  stateByVertical[vertical].kpis.forEach(([label, value]) => {
    const card = document.createElement('div');
    card.className = 'kpi';
    card.innerHTML = `<p>${label}</p><h3>${value}</h3>`;
    el.appendChild(card);
  });
  document.getElementById('view-subtitle').textContent = stateByVertical[vertical].subtitle;
}

function renderList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

function renderTable(id, rows) {
  const body = document.getElementById(id);
  body.innerHTML = '';
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function renderKanban() {
  const board = document.getElementById('kanban');
  board.innerHTML = '';
  Object.entries(pipeline).forEach(([column, tickets]) => {
    const col = document.createElement('div');
    col.className = 'column';
    col.innerHTML = `<h4>${column}</h4>`;
    tickets.forEach(ticket => {
      const t = document.createElement('div');
      t.className = 'ticket';
      t.innerHTML = `<strong>${ticket.split(' ').slice(0,2).join(' ')}</strong><span>${ticket.replace(/^#\w+-\d+\s/, '')}</span>`;
      col.appendChild(t);
    });
    board.appendChild(col);
  });
}

function toast(text) {
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function runDemoFlow() {
  const steps = [
    () => setActiveView('customers'),
    () => toast('Шаг 1: Клиент создан'),
    () => setActiveView('pipeline'),
    () => toast('Шаг 2: Заявка переведена в «В работе»'),
    () => setActiveView('calendar'),
    () => toast('Шаг 3: Назначен слот и мастер'),
    () => setActiveView('payments'),
    () => toast('Шаг 4: Оплата проведена'),
    () => setActiveView('dashboard'),
    () => toast('Шаг 5: KPI обновились в дашборде'),
  ];
  steps.forEach((fn, i) => setTimeout(fn, i * 900));
}

function init() {
  renderKpis('repair');
  renderList('recent-workitems', recent);
  renderList('calendar-list', schedule);
  renderTable('customers-body', customers);
  renderTable('payments-body', payments);
  renderKanban();

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => setActiveView(btn.dataset.view));
  });

  document.getElementById('vertical-select').addEventListener('change', (e) => {
    renderKpis(e.target.value);
    toast(`Переключено на вертикаль: ${e.target.selectedOptions[0].textContent}`);
    setActiveView('dashboard');
  });

  document.getElementById('run-demo').addEventListener('click', runDemoFlow);
}

init();
