/* 凡人不修仙：存檔、命線隨機與可驗證的資源規則。無伺服器與付費 API。 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.FANREN_CONTINUITY = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const KEY = 'fanren.continuity.v1';
  const SETTINGS = 'fanren.reader.v1';
  const VERSION = 1;
  // 貢獻減少可能是事件懲罰而非付費；只有明確貨幣消費預先鎖選項。
  const RESOURCE_COSTS = { coinDelta: 'coins', spiritStoneDelta: 'spiritStone' };
  const TRUTHS = ['尋常命線', '舊債命線', '薄命命線', '旁人命線'];
  function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
  function storageRead(storage, key) {
    try { const v = storage.getItem(key); return v ? JSON.parse(v) : null; } catch (_) { return null; }
  }
  function storageWrite(storage, key, data) {
    try { storage.setItem(key, JSON.stringify(data)); return true; } catch (_) { return false; }
  }
  function freshMeta() { return { deaths: 0, incarnations: 1, memories: [], endings: [], history: [] }; }
  function sanitizeMeta(raw) {
    const v = safeObject(raw), m = freshMeta();
    m.deaths = Math.max(0, Math.min(1000000, Number.isFinite(v.deaths) ? Math.floor(v.deaths) : 0));
    m.incarnations = Math.max(1, Math.min(1000000, Number.isFinite(v.incarnations) ? Math.floor(v.incarnations) : 1));
    for (const field of ['memories', 'endings', 'history']) m[field] = Array.isArray(v[field]) ? v[field].filter(x => x && typeof x === 'object').slice(-60) : [];
    return m;
  }
  function load(storage) {
    const v = storageRead(storage, KEY);
    if (!v || v.version !== VERSION || !v.current || typeof v.current.sceneKey !== 'string') return null;
    return { meta: sanitizeMeta(v.meta), current: v.current };
  }
  function save(storage, meta, current) {
    return storageWrite(storage, KEY, { version: VERSION, meta: sanitizeMeta(meta), current });
  }
  function readSettings(storage) {
    const s = safeObject(storageRead(storage, SETTINGS));
    return { font: ['small','medium','large'].includes(s.font) ? s.font : 'medium',
      speed: ['slow','normal','fast'].includes(s.speed) ? s.speed : 'normal' };
  }
  function saveSettings(storage, settings) { return storageWrite(storage, SETTINGS, readSettings({getItem: () => JSON.stringify(settings)})); }
  function newFate(seed) {
    const value = (seed >>> 0) || 0x4a3c2d1b;
    return { childhood: value % 100 < 32 ? 'early_trouble' : 'start_choice',
      signature: TRUTHS[(value >>> 7) % TRUTHS.length], sealed: true };
  }
  function nextRandom(run) {
    let x = Number(run.rngState) >>> 0;
    if (!x) x = 0x6d2b79f5;
    x ^= (x << 13); x ^= (x >>> 17); x ^= (x << 5);
    run.rngState = x >>> 0;
    run.drawCount = (Number(run.drawCount) || 0) + 1;
    return (run.rngState >>> 0) / 4294967296;
  }
  function chooseWeighted(items, run) {
    if (!Array.isArray(items)) return null;
    const valid = items.map(item => ({ next: item && item.next, weight: Math.max(0, Number(item && item.weight) || 0) }))
      .filter(x => typeof x.next === 'string' && x.next && Number.isFinite(x.weight) && x.weight > 0);
    const sum = valid.reduce((n, x) => n + x.weight, 0);
    if (!sum) return null;
    let roll = nextRandom(run) * sum;
    for (const item of valid) { roll -= item.weight; if (roll < 0) return item.next; }
    return valid[valid.length - 1].next;
  }
  function costProblem(choice, state) {
    if (!choice || typeof choice !== 'object') return '選項無效';
    for (const [delta, stat] of Object.entries(RESOURCE_COSTS)) {
      const amount = Number(choice[delta] || 0);
      if (!Number.isFinite(amount)) return '資源數值無效';
      if (amount < 0 && (Number(state[stat]) || 0) < -amount) return stat === 'coins' ? '銅錢不足' : '靈石不足';
    }
    const requires = safeObject(choice.requires);
    for (const [stat, threshold] of Object.entries(requires)) {
      if (!Object.prototype.hasOwnProperty.call(state, stat) ||
        !Number.isFinite(Number(threshold)) || (Number(state[stat]) || 0) < Number(threshold)) return choice.requireText || '條件不足';
    }
    return '';
  }
  function recordMemory(meta, sceneKey, scene) {
    const m = sanitizeMeta(meta);
    m.deaths += 1;
    const clue = typeof scene.intel === 'string' ? scene.intel.trim() : '';
    const memory = { sceneKey, title: String(scene.title || '無名之死').slice(0,80),
      clue: clue.slice(0,240), chapter: Number(scene.bookChapter) || 1 };
    if (clue && !m.memories.some(x => x.sceneKey === sceneKey && x.clue === memory.clue)) m.memories.push(memory);
    m.memories = m.memories.slice(-24);
    m.history.push({ kind: 'death', ...memory, epitaph: String(scene.death && scene.death.epitaph || '').slice(0,260) });
    m.history = m.history.slice(-60);
    return m;
  }
  function recordEnding(meta, sceneKey, scene) {
    const m = sanitizeMeta(meta);
    m.endings.push({ sceneKey, title: String(scene.title || '').slice(0,80) });
    m.endings = m.endings.slice(-30);
    return m;
  }
  function recordNpc(npcs, evt) {
    if (!evt || typeof evt !== 'object' || !['zheng','liang','chen','doctor','gu','zhou','he','pei','duan'].includes(evt.id)) return npcs;
    const result = { ...safeObject(npcs) };
    result[evt.id] = { status: typeof evt.status === 'string' ? evt.status.slice(0,30) : '未知',
      note: typeof evt.note === 'string' ? evt.note.slice(0,120) : '', lastChapter: Number(evt.chapter) || 1 };
    return result;
  }
  return { KEY, SETTINGS, VERSION, freshMeta, sanitizeMeta, load, save, readSettings, saveSettings,
    newFate, nextRandom, chooseWeighted, costProblem, recordMemory, recordEnding, recordNpc };
});
