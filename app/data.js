// loadTrophyData loads the official list plus our guides from app/data/trophies.json.
// The file is fetched at run time from the same folder the app is served from,
// so the guide works fully offline with no network request.
export async function loadTrophyData() {
  const response = await fetch('data/trophies.json');
  if (!response.ok) throw new Error('Could not load data/trophies.json');
  const doc = await response.json();
  return doc.trophies;
}

// trophyCounts summarises the list: total, per grade, hidden, missable.
export function trophyCounts(trophies) {
  const counts = { total: trophies.length, platinum: 0, gold: 0, silver: 0, bronze: 0, hidden: 0, missable: 0 };
  for (const t of trophies) {
    if (counts[t.grade] !== undefined) counts[t.grade] += 1;
    if (t.hidden) counts.hidden += 1;
    if (t.missable) counts.missable += 1;
  }
  return counts;
}

// isStoryTrophy is true for story-chapter, mission and side-character-finale trophies.
export function isStoryTrophy(trophy) {
  return trophy.kind === 'story';
}
