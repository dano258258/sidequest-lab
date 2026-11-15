import {loadAll} from './data.js';
import {getProgress,getStats,toggleCompleted,isAchievementUnlocked} from './storage.js';
import {$,el,toast,renderNav,renderCards,renderStats} from './ui.js';
const page=document.body.dataset.page;
const root=document.body.dataset.root||'./';
renderNav(root,page);
window.__getStats=getStats;
const main=async()=>{
  try{
    const {quests,categories,achievements}=await loadAll(root);
    const cats=new Map(categories.map(c=>[c.id,c]));
    if(page==='home'){
      renderStats(quests);
      renderCards($('#featured'),quests.slice(0,3),root,categories);
      const group=$('#categories');for(const c of categories){const a=el('a','category-tile');a.href=`${root}pages/explore.html?category=${encodeURIComponent(c.id)}`;
        a.append(el('span','emoji',c.icon));const body=el('div');body.append(el('h3','',c.name),el('p','',c.description));a.append(body);group.append(a);}
      $('#random-quest').addEventListener('click',()=>{const q=quests[Math.floor(Math.random()*quests.length)];location.href=`${root}pages/detail.html?id=${encodeURIComponent(q.id)}`;});
    }
    if(page==='explore'){
      const selector=$('#category');for(const c of categories){const opt=el('option','',c.name);opt.value=c.id;selector.append(opt);}
      const queryCat=new URLSearchParams(location.search).get('category');if(queryCat&&cats.has(queryCat))selector.value=queryCat;
      const controls=['search','category','mood','duration','budget','companion'];
      function apply(){const search=$('#search').value.trim().toLowerCase();const cat=$('#category').value;const mood=$('#mood').value;const duration=Number($('#duration').value);const budget=$('#budget').value;const companion=$('#companion').value;
        const filtered=quests.filter(q=>(!search||`${q.title} ${q.description}`.toLowerCase().includes(search))&&(!cat||q.category===cat)&&(!mood||q.moods.includes(mood))&&(!duration||q.duration<=duration)&&(budget===''||q.budget<=Number(budget))&&(!companion||q.companions.includes(companion)));
        $('#result-count').textContent=`找到 ${filtered.length} 個任務`;renderCards($('#quest-results'),filtered,root,categories);
      }
      for(const id of controls) $(`#${id}`).addEventListener(id==='search'?'input':'change',apply);
      $('#reset-filters').addEventListener('click',()=>{for(const id of controls) $(`#${id}`).value='';apply();});apply();
    }
    if(page==='detail'){
      const id=new URLSearchParams(location.search).get('id');const q=quests.find(q=>q.id===id);const target=$('#detail-content');
      if(!q){target.append(el('div','message','找不到這個任務，可能是連結有誤或任務已更新。'));return;}
      document.title=`${q.title}｜SideQuest Lab`;
      const category=cats.get(q.category);
      const layout=el('div','detail-layout');const left=el('section','panel');const art=el('div','detail-art',category?.icon||'✨');art.setAttribute('aria-hidden','true');left.append(art,el('p','eyebrow',category?.name||q.category),el('h1','',q.title),el('p','muted',q.description));
      const tags=el('div','card-meta');for(const t of [`⏱ ${q.duration} 分鐘`,`💰 NT$${q.budget}`,`✨ ${q.xp} XP`])tags.append(el('span','pill',t));left.append(tags,el('h2','','冒險步驟'));
      const list=el('ol','steps');for(const step of q.steps)list.append(el('li','',step));left.append(list);
      const right=el('aside','panel');right.append(el('span','kicker','Completion Guide'),el('h2','','完成條件'),el('p','',q.completionCriteria));
      const btn=el('button','btn');btn.type='button';function refresh(){const completed=getProgress().completed.includes(q.id);btn.textContent=completed?'↩ 撤銷完成':'✓ 完成任務・獲得 XP';}
      btn.addEventListener('click',()=>{const result=toggleCompleted(q.id);refresh();toast(result.saved?(result.completed?`任務完成！獲得 ${q.xp} XP ✨`:'已撤銷完成，XP 同步調整'): '無法儲存進度，請檢查瀏覽器儲存權限');});refresh();right.append(btn,el('p','muted small','進度僅保存在此瀏覽器；不會上傳個人資料。'));
      layout.append(left,right);target.append(layout);
    }
    if(page==='achievements'){
      renderStats(quests);const done=getStats(quests).done;const target=$('#achievements-grid');
      for(const a of achievements){const unlocked=isAchievementUnlocked(a,done);const card=el('article',`achievement-card${unlocked?'':' locked'}`);card.append(el('span','emoji',a.icon));const box=el('div');box.append(el('h3','',a.name),el('p','',a.description),el('span','pill',unlocked?'已解鎖 ✓':'尚未解鎖'));card.append(box);target.append(card);}
    }
    if(page==='collection'){
      const done=new Set(getProgress().completed);$('#collection-counter').textContent=`已完成 ${quests.filter(q=>done.has(q.id)).length} / ${quests.length} 個任務`;
      const target=$('#collection-grid');for(const q of quests){const a=el('a','panel collection-card');a.href=`${root}pages/detail.html?id=${encodeURIComponent(q.id)}`;a.append(el('div','emoji',cats.get(q.category)?.icon||'✨'),el('strong','',q.title),el('div','small muted',done.has(q.id)?'✓ 已完成':'○ 尚未完成'));target.append(a);}
    }
  }catch(error){const target=$('#app-error');if(target){target.hidden=false;target.textContent=`內容載入失敗：${error.message}。請使用本地 HTTP 伺服器開啟網站。`;}console.error(error);}
};
main();
