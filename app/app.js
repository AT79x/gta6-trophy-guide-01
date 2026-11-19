// Leonida Legend — GTA VI trophy guide & tracker.
// Checklist progress is saved in localStorage; export/import backs it up as JSON.
// Filters: story, missable, collectibles, activities, online (the game has none),
// earned, remaining. Spoiler-safe mode hides story trophy names and descriptions
// until they are earned. Deterministic screenshot states come from ?shot=
// (checklist | detail | roadmap | filter).
import { loadTrophyData, isStoryTrophy } from './data.js';
import { renderRoadmap } from './roadmap.js';

const STORAGE_KEY = 'leonida-legend-progress-v1';
const SPOILER_KEY = 'leonida-legend-spoiler-v1';

const listEl = document.getElementById('trophyList');
const detailEl = document.getElementById('detailPanel');
const earnedCountEl = document.getElementById('earnedCount');
const pctEl = document.getElementById('pct');
const progressFillEl = document.getElementById('progressFill');
const shownCountEl = document.getElementById('shownCount');
const spoilerToggle = document.getElementById('spoilerToggle');
const hideEarnedToggle = document.getElementById('hideEarnedToggle');
const searchInput = document.getElementById('search');
const ioMsg = document.getElementById('ioMsg');

const params = new URLSearchParams(location.search);
const shot = params.get('shot') || '';

let trophies = await loadTrophyData();
let earned = new Set(readStoredProgress());
let filter = 'all';
let openId = null;

// Demo progress for screenshots: ?shot= states show a composed, readable view.
const demoEarned = ['Just Like Paradise', 'Paradise Lost', 'Trust', 'Break the Bank', 'Family Matters', 'DWNFALL', 'Hi-Jacked', 'Snow Storm', 'Master of None', 'Stick Fiddler', 'Baited My Tackle', 'In The Beginning…'];
if (shot === 'checklist' || shot === 'detail' || shot === 'roadmap') {
  earned = new Set(demoEarned);
}
if (shot === 'filter') {
  filter = 'missable';
  earned = new Set(demoEarned);
}
if (shot === 'detail') openId = 28;
if (shot === 'roadmap') {
  document.body.classList.add('shot-roadmap');
}
if (shot === 'detail') {
  document.body.classList.add('shot-detail');
}
if (shot === 'filter') {
  document.body.classList.add('shot-filter');
}
if (shot === 'checklist') {
  document.body.classList.add('shot-checklist');
}

function readStoredProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : [];
  } catch {
    return [];
  }
}

function saveProgress() {
  if (shot) return; // screenshot states never overwrite the player's real progress
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned])); } catch { /* storage full or blocked */ }
}

function spoilerOn() {
  return spoilerToggle.checked;
}

function trophyIsHiddenBySpoiler(t) {
  return spoilerOn() && isStoryTrophy(t) && !earned.has(t.name);
}

function visibleTrophies() {
  const q = searchInput.value.trim().toLowerCase();
  return trophies.filter((t) => {
    if (filter === 'story' && t.kind !== 'story') return false;
    if (filter === 'missable' && !t.missable) return false;
    if (filter === 'collectible' && t.kind !== 'collectible') return false;
    if (filter === 'activity' && t.kind !== 'activity') return false;
    if (filter === 'online') return false; // GTA VI has no online trophies
    if (filter === 'earned' && !earned.has(t.name)) return false;
    if (filter === 'remaining' && earned.has(t.name)) return false;
    if (hideEarnedToggle.checked && earned.has(t.name)) return false;
    if (q && !(t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.guide.toLowerCase().includes(q))) return false;
    return true;
  });
}

function sourceLinks(sources) {
  const parts = [];
  for (const s of sources || []) {
    parts.push(s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${escapeHtml(s.name)}</a>` : escapeHtml(s.name));
  }
  return parts.join(' · ');
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderDetail(t) {
  const hidden = trophyIsHiddenBySpoiler(t);
  detailEl.hidden = false;
  detailEl.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = hidden ? 'Hidden story trophy — earn it to reveal' : t.name;
  const meta = document.createElement('p');
  meta.innerHTML = `<span class="grade grade-${t.grade}">${t.grade}</span> ${t.hidden ? '<span class="flag hiddenFlag">Hidden on PS5</span> ' : ''}${t.missable ? '<span class="flag">⚠ MISSABLE</span> ' : ''}${t.count ? `<span>Target: ${t.count.toLocaleString('en-US')}</span>` : ''}`;
  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = hidden ? 'Name and description hidden by spoiler-safe mode.' : 'Official description: “' + t.description + '”';
  const guide = document.createElement('p');
  guide.className = 'guide';
  guide.textContent = hidden ? 'Guide hidden until earned.' : t.guide;
  const src = document.createElement('p');
  src.className = 'sources';
  src.innerHTML = hidden ? '' : 'Sources: ' + sourceLinks(t.sources);
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close guide';
  close.addEventListener('click', () => { detailEl.hidden = true; openId = null; });
  detailEl.append(h2, meta, desc, guide, src, close);
}

function renderList() {
  const shown = visibleTrophies();
  listEl.replaceChildren();
  for (const t of shown) {
    const hidden = trophyIsHiddenBySpoiler(t);
    const li = document.createElement('li');
    li.className = 'trophy' + (earned.has(t.name) ? ' earned' : '');
    const top = document.createElement('div');
    top.className = 'top';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.name);
    box.setAttribute('aria-label', 'Earned: ' + t.name);
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.name); else earned.delete(t.name);
      saveProgress();
      renderAll();
    });
    const h3 = document.createElement('h3');
    h3.textContent = hidden ? '??? — hidden story trophy' : t.name;
    const grade = document.createElement('span');
    grade.className = 'grade grade-' + t.grade;
    grade.textContent = t.grade;
    top.append(box, h3, grade);
    if (t.missable) {
      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.textContent = '⚠ MISSABLE';
      top.append(flag);
    }
    if (t.hidden) {
      const flag = document.createElement('span');
      flag.className = 'flag hiddenFlag';
      flag.textContent = 'Hidden';
      top.append(flag);
    }
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = hidden ? 'Hidden until earned (spoiler-safe mode is on).' : t.description + (t.count ? ` — target: ${t.count.toLocaleString('en-US')}` : '');
    const guide = document.createElement('p');
    guide.className = 'guide';
    guide.textContent = hidden ? '' : t.guide;
    const src = document.createElement('p');
    src.className = 'sources';
    src.innerHTML = hidden ? '' : 'Sources: ' + sourceLinks(t.sources);
    const actions = document.createElement('div');
    actions.className = 'actions';
    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.textContent = 'Open guide';
    openBtn.addEventListener('click', () => { openId = t.id; renderDetail(t); detailEl.scrollIntoView({ block: 'nearest' }); });
    actions.append(openBtn);
    li.append(top, desc, guide, src, actions);
    listEl.append(li);
  }
  shownCountEl.textContent = filter === 'online'
    ? '0 shown — GTA VI has no online trophies'
    : `${shown.length} of 55 shown`;
  if (filter === 'online') {
    const li = document.createElement('li');
    li.className = 'trophy';
    li.textContent = 'No online trophies: all 55 GTA VI trophies are single-player and offline (PowerPyx, Output Lag).';
    listEl.append(li);
  }
}

function renderProgress() {
  const n = earned.size;
  earnedCountEl.textContent = String(n);
  pctEl.textContent = Math.round((n / trophies.length) * 100) + '%';
  progressFillEl.style.width = ((n / trophies.length) * 100) + '%';
}

function renderAll() {
  renderProgress();
  renderList();
  if (openId) {
    const t = trophies.find((x) => x.id === openId);
    if (t) renderDetail(t);
  }
}

function exportProgress() {
  const payload = { game: 'Grand Theft Auto VI', exported: new Date().toISOString(), earned: [...earned].sort() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
  ioMsg.textContent = `Exported ${earned.size} earned trophies.`;
}

async function importProgress(file) {
  try {
    const data = JSON.parse(await file.text());
    const names = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(names)) throw new Error('bad file');
    const known = new Set(trophies.map((t) => t.name));
    const valid = names.filter((n) => known.has(n));
    earned = new Set(valid);
    saveProgress();
    renderAll();
    ioMsg.textContent = `Imported ${valid.length} earned trophies${names.length - valid.length ? ` (${names.length - valid.length} unknown names skipped)` : ''}.`;
  } catch {
    ioMsg.textContent = 'Import failed: that file is not a Leonida Legend progress export.';
  }
}

document.getElementById('filters').addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-filter]');
  if (!btn) return;
  filter = btn.dataset.filter;
  for (const b of document.querySelectorAll('#filters button')) b.classList.toggle('active', b === btn);
  renderAll();
});
spoilerToggle.addEventListener('change', () => {
  try { localStorage.setItem(SPOILER_KEY, spoilerToggle.checked ? '1' : '0'); } catch { /* ignore */ }
  renderAll();
});
hideEarnedToggle.addEventListener('change', renderAll);
searchInput.addEventListener('input', renderAll);
document.getElementById('exportBtn').addEventListener('click', exportProgress);
document.getElementById('importFile').addEventListener('change', (e) => {
  if (e.target.files[0]) importProgress(e.target.files[0]);
});
document.getElementById('resetBtn').addEventListener('click', () => {
  earned = new Set();
  saveProgress();
  renderAll();
  ioMsg.textContent = 'Progress reset.';
});

// Restore the spoiler preference, and apply the ?shot= filter state.
try { spoilerToggle.checked = localStorage.getItem(SPOILER_KEY) === '1'; } catch { /* ignore */ }
if (shot === 'filter') {
  spoilerToggle.checked = false;
  for (const b of document.querySelectorAll('#filters button')) b.classList.toggle('active', b.dataset.filter === 'missable');
}
if (shot === 'roadmap') spoilerToggle.checked = false;

renderRoadmap(document.getElementById('roadmapList'));
renderAll();
