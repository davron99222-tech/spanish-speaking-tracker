const STORE_KEY = "espanol-practica-v1";
const WEEK_COUNT = 26;
const DAY_COUNT = WEEK_COUNT * 7;
const weeks = [
  ["Привыкнуть к звучанию", "Слух и опорные фразы", "A0 → A1", "Короткие ясные реплики: приветствия, знакомство, числа и самые частые слова."],
  ["Знакомство без сценария", "Представиться и задать встречный вопрос", "A1", "Пойми короткое знакомство и проведи диалог из 6–8 реплик."],
  ["Мой обычный день", "Распорядок и время", "A1", "Узнавай основные действия в коротком рассказе и опиши свой день."],
  ["Еда и простые просьбы", "Заказ, предпочтения, уточнения", "A1 · обзор", "Сделай заказ, переспроси цену или состав и запиши контрольный рассказ №1."],
  ["Город вокруг меня", "Места, дорога и транспорт", "A1 → A2", "Понимай простые инструкции и объясни, куда и как добраться."],
  ["Дом, люди, привычки", "Описание и сравнение", "A2", "Свяжи детали в понятное описание человека, места или привычки."],
  ["Планы и приглашения", "Будущие намерения и договорённость", "A2", "Услышь приглашение, уточни время и договорись о встрече."],
  ["Что уже случилось", "Истории о прошлом", "A2 · обзор", "Пойми последовательность недавней истории и перескажи её своими словами."],
  ["Впечатления и эмоции", "Реакции и причины", "A2", "Улавливай настроение собеседника и объясняй, что тебе понравилось и почему."],
  ["Разговор в поездке", "Практические ситуации", "A2 · обзор", "Разберись с типичной ситуацией в дороге и запиши контрольный рассказ №2."],
  ["Длиннее слушаем", "Смысл, детали и связки", "A2 → B1", "Перейди от отдельных фраз к коротким историям и заметкам на знакомые темы."],
  ["Работа и учёба", "Опыт, задачи, планы", "A2+", "Поддержи разговор о повседневных задачах и опыте, попроси привести пример."],
  ["Новости без перегруза", "Главная мысль и факты", "A2+", "Выдели тему, позицию и 3 факта из короткого ясного аудио."],
  ["Связный рассказ", "Событие, причина, результат", "A2+ → B1", "Расскажи историю на 2–3 минуты с понятным началом и концом."],
  ["Мнения и аргументы", "Согласие, сомнение, причина", "B1 · база", "Пойми позицию в разговоре и объясни своё мнение с двумя причинами."],
  ["Живой разговор", "Реакция без долгой подготовки", "B1 · база", "Тренируй быстрый ответ, встречный вопрос и просьбу повторить иначе."],
  ["Разные голоса и темп", "Знакомые темы, новая подача", "B1 · база", "Сравни двух говорящих: темп, произношение, главные идеи и различия."],
  ["Промежуточный рубеж", "Длинное аудио и спонтанный диалог", "Проба B1", "Сделай пробу B1 и контрольную запись №3: рассказ плюс ответы без текста."],
  ["Понимать аргументацию", "Тезис, доводы и вывод", "B1", "Следи за ходом рассуждения на знакомую тему, даже если не знаешь все слова."],
  ["Разговор о выборе", "Плюсы, минусы, компромисс", "B1", "Обсуди вариант решения, отреагируй на доводы собеседника и уточни критерии."],
  ["Тема из интереса", "Подкаст или интервью", "B1+ · знакомая тема", "Разбери фрагмент естественной речи по теме, которую уже хорошо знаешь."],
  ["Нюансы и подтекст", "Намерение, отношение, оговорки", "B1+ · знакомая тема", "Отличай факт от оценки, уверенность от сомнения, буквальный смысл от намёка."],
  ["Объяснить сложное просто", "Перефразирование и примеры", "B1+", "Перескажи услышанное без копирования фраз и поясни незнакомую идею своими словами."],
  ["Спорить спокойно", "Несогласие и уточнение", "B1+", "Поддержи мини-дискуссию: аргумент, ответ, уважительное несогласие."],
  ["Слушать естественный темп", "Длинные фрагменты и несколько голосов", "B1+ → B2 · цель", "Работай с записью почти без адаптации на знакомой теме; отмечай, что помогло понять."],
  ["Финальная проверка и план дальше", "Речь, аудирование, следующий шаг", "B1 · цель / B2 · растяжка", "Повтори исходное задание, сравни записи и выбери конкретные цели на следующие 8 недель."],
].map(([title, skill, level, description]) => ({ title, skill, level, description }));

const dayPatterns = [
  { label: "Разогрев и знакомство", hear: "Выбери короткий диалог по теме недели (2–5 минут). Прослушай дважды без текста: после первого раза назови тему, после второго — 3 факта.", repeat: "Повтори вслух 8–10 коротких фраз из диалога, подражая ударению и мелодике.", speak: "Запиши ответ на вопрос недели на 60–90 секунд. Переслушай и отметь одну удачную фразу.", check: "Сверься с субтитрами или расшифровкой: выпиши только 5 нужных выражений." },
  { label: "Слушать детали", hear: "Прослушай новый фрагмент по теме. Во второй раз запиши ключевые слова, имена, время или причины — что подходит теме.", repeat: "Выбери 5 коротких реплик и повтори их вслед за говорящим, стараясь сохранить ритм.", speak: "Ответь вслух на 5 вопросов по содержанию. Один ответ разверни: мысль + пример.", check: "Проверь детали по тексту; выбери одну ошибку, которую хочешь исправить в речи." },
  { label: "Тень за говорящим", hear: "Возьми 30–60 секунд речи на знакомую тему. Поймай паузы, ударение и связки; затем прослушай весь отрывок.", repeat: "Повтори отрывок за голосом 3 раза: медленно, в обычном темпе, затем без аудио по памяти.", speak: "Запиши похожую реплику от себя, заменив исходные факты своими. Сравни темп и интонацию.", check: "Отметь 2 звука или связки, которые стало легче распознавать." },
  { label: "Рассказать своими словами", hear: "Слушай, пока можешь назвать главную мысль и ход событий. Затем проверь один фрагмент с субтитрами.", repeat: "Повтори за диктором 5–8 связок или выражений, которые помогают выстраивать рассказ.", speak: "Перескажи содержание без текста. Начни с короткой версии, затем добавь причину, пример или своё мнение.", check: "Запиши незнакомые слова, которые действительно мешали смыслу; остальные пропусти." },
  { label: "Диалог и реакция", hear: "Прослушай разговор: кто чего хочет, где они согласны, что нужно уточнить? Сначала без паузы.", repeat: "Повтори 4 ключевые реплики, включая интонацию вопроса, согласия или сомнения.", speak: "Разыграй обе стороны диалога или созвонись с партнёром/преподавателем. Задай минимум 4 встречных вопроса.", check: "Повтори сцену ещё раз, заменив собеседника, место или обстоятельство." },
  { label: "Длинное аудио", hear: "Послушай 5–10 минут знакомой темы. Каждые пару минут коротко проговори, что уже понял(а). Не останавливайся на каждом неизвестном слове.", repeat: "Выбери 3 фразы из аудио и произнеси их в контексте — до и после оригинала.", speak: "Расскажи 2–3 минуты: тема, две важные идеи, собственная реакция. Затем ответь на два возможных встречных вопроса.", check: "Оцени понимание и речь от 1 до 5 и запиши, что помогло удержать смысл." },
  { label: "Итог недели", hear: "Переслушай один фрагмент недели без субтитров. Сравни с первым днём: сколько деталей теперь понятно?", repeat: "Вслух воспроизведи 5 фраз недели по памяти, затем проверь их в расшифровке.", speak: "Запиши недельный монолог или диалог 2–3 минуты. На следующей неделе прослушай запись перед новой практикой.", check: "Назови одно достижение и одну конкретную цель на следующую неделю." },
];

const milestones = [
  { week: 4, title: "Первая запись", prompt: "Расскажи о себе и своём обычном дне 1–2 минуты; ответь на 3 простых вопроса." },
  { week: 8, title: "Расскажи о прошлом", prompt: "Пойми короткую историю и перескажи её с 5 важными деталями." },
  { week: 12, title: "Рубеж A2", prompt: "Поддержи 5-минутный разговор на знакомую тему; пойми общий смысл и основные детали ясной речи." },
  { week: 18, title: "Проба B1", prompt: "Пойми главные мысли ясного разговора и спонтанно расскажи историю или своё мнение 3 минуты." },
  { week: 22, title: "Ближе к B2", prompt: "Проследи тезис и аргументы в длинной речи на знакомую тему; обсуди её 8–10 минут." },
  { week: 26, title: "Итоговый срез", prompt: "Повтори стартовое задание; сравни записи и выполни самооценку аудирования и устного взаимодействия." },
];

const phaseForWeek = n => n <= 4 ? "Слух и стартовая речь" : n <= 8 ? "Бытовое общение A1" : n <= 14 ? "Переход к A2" : n <= 20 ? "Уверенный B1" : "B1+ и цель B2";
const $ = selector => document.querySelector(selector);
const todayISO = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const parseISO = value => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};
const dateISO = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const dateLabel = value => new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", weekday: "long" }).format(parseISO(value));
const addDays = (iso, days) => { const date = parseISO(iso); date.setDate(date.getDate() + days); return dateISO(date); };
const emptyData = () => ({ version: 1, startDate: todayISO(), entries: {} });
let data = loadData();
let selectedWeek = 0;
let activeDate = "";
let toastTimer;

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (saved?.version === 1 && saved.entries && /^\d{4}-\d{2}-\d{2}$/.test(saved.startDate)) return saved;
  } catch { /* повреждённая запись будет заменена чистым профилем */ }
  return emptyData();
}

function saveData() {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  render();
}

function dayNumberFor(value) {
  return Math.floor((parseISO(value) - parseISO(data.startDate)) / 86400000);
}

function dayInfo(value) {
  const n = Math.max(0, Math.min(DAY_COUNT - 1, dayNumberFor(value)));
  const week = Math.floor(n / 7);
  const day = n % 7;
  return { n, week, day, curriculum: weeks[week], pattern: dayPatterns[day], date: value };
}

function buildDayCard(info, compact = false) {
  const { n, week, day, curriculum, pattern, date } = info;
  const entry = data.entries[date];
  const active = dayNumberFor(date) >= 0 && dayNumberFor(date) < DAY_COUNT;
  const canEdit = date <= todayISO();
  return `<article class="day-card ${entry ? "is-done" : ""} ${active ? "" : "is-outside"} ${compact ? "day-compact" : ""}">
    <div class="day-card-top"><div class="day-date"><span class="day-index">${String(day + 1).padStart(2, "0")}</span><span>${dateLabel(date)}</span></div><span class="day-status ${entry ? "done" : "pending"}">${entry ? "Выполнено" : "Запланировано"}</span></div>
    <h3>${pattern.label}: ${curriculum.skill.toLowerCase()}</h3>
    <div class="day-focus"><span>НЕДЕЛЯ ${String(week + 1).padStart(2, "0")}</span><b>${curriculum.title}</b><span>${curriculum.level}</span></div>
    <div class="task-columns"><div><span class="task-label"><i>01</i>СЛУШАЙ · 35 МИН</span><p>${pattern.hear}</p></div><div><span class="task-label"><i>02</i>РАЗБЕРИ · 25 МИН</span><p>${pattern.check}</p></div><div><span class="task-label"><i>03</i>ПОВТОРИ · 30 МИН</span><p>${pattern.repeat}</p></div><div><span class="task-label"><i>04</i>ГОВОРИ · 30 МИН</span><p>${pattern.speak}</p></div></div>
    ${entry ? `<div class="saved-note"><span>✓ ${entry.minutes || 0} мин в дневнике</span>${entry.notes ? `<span>${escapeHTML(entry.notes)}</span>` : ""}</div>` : ""}
    <button class="button ${entry ? "button-outline" : "button-primary"} day-action" type="button" data-log-date="${date}" ${!canEdit ? "disabled" : ""}>${entry ? "Открыть дневник" : canEdit ? "Отметить занятие" : "Этот день ещё впереди"}</button>
  </article>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function renderToday() {
  const today = todayISO();
  const dayNo = dayNumberFor(today);
  const title = $("#today-title");
  if (dayNo < 0) {
    title.textContent = "Маршрут ещё не начался";
    $("#today-card").innerHTML = `<div class="empty-state"><p>Выбранное начало плана — ${dateLabel(data.startDate)}. До старта ${Math.abs(dayNo)} дн.</p><p>Измени дату начала выше или загляни в будущие недели.</p></div>`;
    return;
  }
  if (dayNo >= DAY_COUNT) {
    title.textContent = "Шесть месяцев завершены";
    $("#today-card").innerHTML = `<div class="empty-state"><p>Ты прошёл(а) все 26 недель. Сравни записи и выбери следующий маршрут.</p></div>`;
    return;
  }
  title.textContent = `День ${dayNo + 1} · ${dateLabel(today)}`;
  $("#today-card").innerHTML = buildDayCard(dayInfo(today));
}

function renderWeek() {
  selectedWeek = Math.max(0, Math.min(WEEK_COUNT - 1, selectedWeek));
  const start = addDays(data.startDate, selectedWeek * 7);
  const week = weeks[selectedWeek];
  const milestone = milestones.find(item => item.week === selectedWeek + 1);
  $("#week-title").textContent = `Неделя ${selectedWeek + 1}: ${week.title}`;
  $("#week-indicator").textContent = `${String(selectedWeek + 1).padStart(2, "0")} / 26`;
  $("#prev-week").disabled = selectedWeek === 0;
  $("#next-week").disabled = selectedWeek === WEEK_COUNT - 1;
  $("#week-summary").innerHTML = `<span class="week-level">${week.level}</span><p>${week.description}</p>${milestone ? `<div class="milestone"><span>КОНТРОЛЬНАЯ ТОЧКА · ${milestone.title}</span><p>${milestone.prompt}</p></div>` : ""}`;
  const days = Array.from({ length: 7 }, (_, index) => buildDayCard(dayInfo(addDays(start, index)), true)).join("");
  $("#week-days").innerHTML = days;
}

function renderRoadmap() {
  $("#roadmap").innerHTML = weeks.map((week, index) => {
    const start = addDays(data.startDate, index * 7);
    const end = addDays(start, 6);
    const done = Array.from({ length: 7 }, (_, day) => data.entries[addDays(start, day)]).filter(Boolean).length;
    const current = dayNumberFor(todayISO());
    const status = current >= index * 7 + 7 ? "past" : current >= index * 7 ? "current" : "future";
    return `<button class="roadmap-item ${status} ${selectedWeek === index ? "selected" : ""}" type="button" data-week="${index}"><span class="roadmap-number">${String(index + 1).padStart(2, "0")}</span><span class="roadmap-copy"><b>${week.title}</b><small>${week.level} · ${start.slice(5)}—${end.slice(5)}</small><span class="mini-track"><i style="width:${Math.round(done / 7 * 100)}%"></i></span></span><span class="roadmap-count">${done}/7</span></button>`;
  }).join("");
}

function renderStats() {
  const completed = Object.keys(data.entries).filter(date => dayNumberFor(date) >= 0 && dayNumberFor(date) < DAY_COUNT).length;
  const percent = Math.round(completed / DAY_COUNT * 100);
  const minutes = Object.values(data.entries).reduce((sum, entry) => sum + (Number(entry.minutes) || 0), 0);
  const dayNo = dayNumberFor(todayISO());
  const current = Math.max(0, Math.min(WEEK_COUNT - 1, Math.floor(Math.max(0, dayNo) / 7)));
  let streak = 0;
  for (let date = todayISO(); data.entries[date]; date = addDays(date, -1)) streak++;
  $("#overall-percent").textContent = `${percent}%`;
  $("#overall-bar").style.width = `${percent}%`;
  $(".progress-track").setAttribute("aria-valuenow", String(percent));
  $("#days-done").textContent = `${completed} ${plural(completed, "занятие", "занятия", "занятий")}`;
  $("#hours-total").innerHTML = `${(minutes / 60).toFixed(minutes % 60 ? 1 : 0)} <small>ч</small>`;
  $("#current-week").innerHTML = `${String(current + 1).padStart(2, "0")} <small>/ 26</small>`;
  $("#week-phase").textContent = phaseForWeek(current + 1);
  $("#streak").innerHTML = `${streak} <small>${plural(streak, "день", "дня", "дней")}</small>`;
}

function plural(number, one, few, many) {
  const mod100 = number % 100;
  const mod10 = number % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function renderCheckpoint() {
  const dayNo = dayNumberFor(todayISO());
  const upcoming = milestones.find(item => item.week * 7 - 1 >= dayNo) || milestones[milestones.length - 1];
  $("#checkpoint").innerHTML = `<span>НЕДЕЛЯ ${String(upcoming.week).padStart(2, "0")}</span><b>${upcoming.title}</b><small>${upcoming.prompt}</small>`;
}

function renderSkillChart() {
  const current = Math.max(0, Math.min(25, Math.floor(Math.max(0, dayNumberFor(todayISO())) / 7)));
  const first = Math.max(0, current - 7);
  const indices = Array.from({ length: current - first + 1 }, (_, offset) => first + offset);
  const bar = (value, kind) => value === null ? `<i class="chart-bar empty ${kind}" aria-label="Нет оценки"></i>` : `<i class="chart-bar ${kind}" style="height:${value * 20}%" aria-label="Оценка ${value} из 5"></i>`;
  $("#skill-chart").innerHTML = indices.map(index => {
    const dates = Array.from({ length: 7 }, (_, day) => addDays(data.startDate, index * 7 + day));
    const values = ["listening", "speaking"].map(key => {
      const items = dates.map(date => Number(data.entries[date]?.[key])).filter(value => value >= 1 && value <= 5);
      return items.length ? Number((items.reduce((sum, value) => sum + value, 0) / items.length).toFixed(1)) : null;
    });
    const shown = values.map(value => value === null ? "—" : value.toFixed(1));
    return `<div class="skill-week"><div class="bars">${bar(values[0], "listening")}${bar(values[1], "speaking")}</div><span>Н${String(index + 1).padStart(2, "0")}</span><small>Слух ${shown[0]} · Речь ${shown[1]}</small></div>`;
  }).join("");
}

function render() {
  $("#start-date").value = data.startDate;
  renderStats();
  renderToday();
  renderWeek();
  renderRoadmap();
  renderCheckpoint();
  renderSkillChart();
}

function openLog(date) {
  const info = dayInfo(date);
  const entry = data.entries[date] || {};
  activeDate = date;
  $("#entry-date").value = date;
  $("#dialog-title").textContent = `${dateLabel(date)} · неделя ${info.week + 1}`;
  $("#dialog-task").textContent = `${info.pattern.label}: ${info.curriculum.skill.toLowerCase()}. ${info.curriculum.title}.`;
  $("#entry-minutes").value = entry.minutes ?? 120;
  $("#entry-listening").value = entry.listening ?? "";
  $("#entry-speaking").value = entry.speaking ?? "";
  $("#entry-notes").value = entry.notes ?? "";
  $("#delete-entry").hidden = !data.entries[date];
  $("#log-dialog").showModal();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-log-date]");
  if (button) openLog(button.dataset.logDate);
  const weekButton = event.target.closest("[data-week]");
  if (weekButton) {
    selectedWeek = Number(weekButton.dataset.week);
    renderWeek();
    renderRoadmap();
    document.querySelector(".week-heading").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

$("#prev-week").addEventListener("click", () => { selectedWeek--; renderWeek(); renderRoadmap(); });
$("#next-week").addEventListener("click", () => { selectedWeek++; renderWeek(); renderRoadmap(); });
$("#today-button").addEventListener("click", () => { selectedWeek = Math.max(0, Math.min(25, Math.floor(Math.max(0, dayNumberFor(todayISO())) / 7))); render(); document.querySelector(".week-heading").scrollIntoView({ behavior: "smooth", block: "start" }); });
$("#start-date").addEventListener("change", event => {
  if (!event.target.value) return;
  data.startDate = event.target.value;
  selectedWeek = 0;
  saveData();
  showToast("Дата начала плана обновлена");
});

$("#log-form").addEventListener("submit", event => {
  if (event.submitter?.value !== "save") return;
  event.preventDefault();
  data.entries[activeDate] = {
    minutes: Math.max(0, Math.min(480, Number($("#entry-minutes").value) || 0)),
    listening: $("#entry-listening").value,
    speaking: $("#entry-speaking").value,
    notes: $("#entry-notes").value.trim(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  $("#log-dialog").close();
  render();
  showToast("Занятие добавлено в дневник");
});

$("#delete-entry").addEventListener("click", () => {
  delete data.entries[activeDate];
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  $("#log-dialog").close();
  render();
  showToast("Отметка снята");
});

$("#backup-button").addEventListener("click", () => {
  const content = JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2);
  const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `ispanskiy-progress-${todayISO()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Резервная копия скачана");
});

$("#import-file").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const incoming = JSON.parse(await file.text());
    if (incoming?.version !== 1 || !incoming.entries || !/^\d{4}-\d{2}-\d{2}$/.test(incoming.startDate)) throw new Error("bad backup");
    if (!confirm("Импорт заменит текущие отметки и дату начала в этом браузере. Продолжить?")) return;
    data = { version: 1, startDate: incoming.startDate, entries: incoming.entries };
    saveData();
    showToast("Копия восстановлена");
  } catch {
    showToast("Не удалось прочитать эту копию");
  } finally {
    event.target.value = "";
  }
});

const todayNo = dayNumberFor(todayISO());
selectedWeek = todayNo < 0 ? 0 : Math.min(25, Math.floor(todayNo / 7));
render();

