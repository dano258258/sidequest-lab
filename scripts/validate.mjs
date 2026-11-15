import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const quests=read('data/quests.json');const categories=read('data/categories.json');const achievements=read('data/achievements.json');const schema=read('data/quest.schema.json');
const ids=new Set();const allowedCategories=new Set(categories.map(c=>c.id));
const required=schema.required;
for(const q of quests){
  for(const key of required) assert.ok(Object.hasOwn(q,key),`${q.id}: missing ${key}`);
  assert.match(q.id,/^quest-[0-9]{3,}$/);assert.ok(!ids.has(q.id),`duplicate ${q.id}`);ids.add(q.id);
  assert.ok(allowedCategories.has(q.category),`${q.id}: unknown category`);
  assert.ok(schema.properties.category.enum.includes(q.category));
  for(const [key,value] of Object.entries(q)) assert.ok(Object.hasOwn(schema.properties,key),`unexpected ${key}`);
  for(const key of ['title','description','completionCriteria'])assert.ok(typeof q[key]==='string'&&q[key].length>0,`${q.id}: invalid ${key}`);
  for(const key of ['duration','budget','xp'])assert.ok(Number.isInteger(q[key])&&q[key]>=schema.properties[key].minimum&&q[key]<=schema.properties[key].maximum,`${q.id}: invalid ${key}`);
  for(const key of ['moods','companions']){
    assert.ok(Array.isArray(q[key])&&q[key].length>0&&new Set(q[key]).size===q[key].length);
    assert.ok(q[key].every(x=>schema.properties[key].items.enum.includes(x)),`${q.id}: invalid ${key}`);
  }
  assert.ok(schema.properties.difficulty.enum.includes(q.difficulty));
  assert.ok(Array.isArray(q.steps)&&q.steps.length>=2&&q.steps.every(s=>typeof s==='string'&&s.length>=4));
}
const files=['index.html','pages/explore.html','pages/detail.html','pages/achievements.html','pages/collection.html'];
for(const file of files){const text=fs.readFileSync(path.join(root,file),'utf8');const expectedRoot=file==='index.html'?'./':'../';assert.ok(text.includes(`data-root="${expectedRoot}"`),`${file} incorrect root`);assert.ok(text.includes(`${expectedRoot}js/app.js`));assert.ok(text.includes(`${expectedRoot}css/style.css`));}
for(const a of achievements){assert.ok(a.id&&a.name&&Number.isInteger(a.threshold));if(a.type==='category')assert.ok(allowedCategories.has(a.category));}
assert.equal(new Set(achievements.map(a=>a.id)).size,achievements.length);
console.log(`PASS: ${quests.length} quests, ${categories.length} categories, ${achievements.length} achievements, ${files.length} HTML pages.`);
