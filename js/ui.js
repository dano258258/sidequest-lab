export const $ = selector => document.querySelector(selector);
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className=className;
  if (text !== undefined) node.textContent=String(text);
  return node;
}
export function toast(message) {
  const old = $('#toast');if (old) old.remove();
  const node=el('div','',message);node.id='toast';node.setAttribute('role','status');document.body.append(node);
  setTimeout(()=>node.remove(),3200);
}
export function renderNav(root,page) {
  const nav=$('#nav');if(!nav)return;
  const links=[['home','首頁',`${root}index.html`],['explore','探索任務',`${root}pages/explore.html`],['achievements','成就館',`${root}pages/achievements.html`],['collection','任務圖鑑',`${root}pages/collection.html`]];
  for(const [id,label,url] of links){const a=el('a','',label);a.href=url;if(id===page)a.setAttribute('aria-current','page');nav.append(a);}
  const brand=$('#brand');if(brand)brand.href=`${root}index.html`;
  const footer=$('#footer-home');if(footer)footer.href=`${root}index.html`;
}
export function questCard(q, root, category) {
  const card=el('article','quest-card');
  const icon=el('div','quest-icon',category?.icon||'✨');icon.setAttribute('aria-hidden','true');card.append(icon);
  card.append(el('span','kicker',category?.name||q.category));
  card.append(el('h3','',q.title));card.append(el('p','',q.description));
  const meta=el('div','card-meta');for(const text of [`⏱ ${q.duration} 分鐘`,`💰 NT$${q.budget}`,`✨ ${q.xp} XP`])meta.append(el('span','pill',text));card.append(meta);
  const footer=el('div','card-footer');footer.append(el('span','muted',q.difficulty==='easy'?'🌿 輕鬆':q.difficulty==='medium'?'🌤 進階':'🔥 挑戰'));
  const link=el('a','link','查看任務 →');link.href=`${root}pages/detail.html?id=${encodeURIComponent(q.id)}`;footer.append(link);card.append(footer);return card;
}
export function renderCards(target,quests,root,categories){target.replaceChildren();const categoryMap=new Map(categories.map(c=>[c.id,c]));
  if(!quests.length){target.append(el('div','message empty','沒有符合條件的任務，試試調整篩選條件。'));return;}
  for(const q of quests)target.append(questCard(q,root,categoryMap.get(q.category)));
}
export function renderStats(quests){const stats=window.__getStats(quests);for(const [id,value] of Object.entries({'stat-level':`Lv.${stats.level}`,'stat-xp':stats.xp,'stat-done':stats.done.length,'xp-next':stats.remaining})){const node=$(`#${id}`);if(node)node.textContent=value;}
  const bar=$('#xp-bar');if(bar){bar.style.width=`${stats.percent}%`;bar.parentElement.setAttribute('aria-valuenow',String(stats.percent));}
}
