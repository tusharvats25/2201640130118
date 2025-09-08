const KEY = "affordmed.urls.v1";

export function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function saveAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function upsert(short, record) {
  const all = loadAll();
  all[short] = record;
  saveAll(all);
}

export function get(short) {
  return loadAll()[short];
}

export function list() {
  const all = loadAll();
  return Object.entries(all)
    .map(([short, rec]) => ({ short, ...rec }))
    .sort((a, b) => b.createdAt - a.createdAt);
}