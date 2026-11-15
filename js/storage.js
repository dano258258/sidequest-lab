const KEY = 'sidequest-progress-v1';
export function getProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { completed: [...new Set(Array.isArray(value.completed) ? value.completed.filter(x => typeof x === 'string') : [])] };
  } catch { return {completed: []}; }
}
export function setProgress(progress) {
  try { localStorage.setItem(KEY, JSON.stringify({completed:[...new Set(progress.completed)]})); return true; }
  catch { return false; }
}
export function toggleCompleted(id) {
  const current = getProgress();
  current.completed = current.completed.includes(id) ? current.completed.filter(x=>x!==id) : [...current.completed,id];
  const saved = setProgress(current);
  return { completed: current.completed.includes(id), saved };
}
export function getStats(quests) {
  const ids = new Set(getProgress().completed);
  const done = quests.filter(q=>ids.has(q.id));
  const xp = done.reduce((n,q)=>n+q.xp,0);
  const level = Math.floor(xp/100)+1;
  return {done,xp,level,remaining:100-(xp%100),percent:xp%100};
}
export function isAchievementUnlocked(a, done) {
  if (a.type==='total') return done.length >= a.threshold;
  if (a.type==='category') return done.filter(q=>q.category===a.category).length >= a.threshold;
  if (a.type==='distinctCategories') return new Set(done.map(q=>q.category)).size >= a.threshold;
  return false;
}
