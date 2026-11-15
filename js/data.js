export async function loadJSON(root, file) {
  const response = await fetch(`${root}data/${file}`);
  if (!response.ok) throw new Error(`讀取 ${file} 失敗（${response.status}）`);
  return response.json();
}
export async function loadAll(root) {
  const [quests, categories, achievements] = await Promise.all([
    loadJSON(root, 'quests.json'),loadJSON(root, 'categories.json'),loadJSON(root, 'achievements.json')
  ]);
  return { quests, categories, achievements };
}
