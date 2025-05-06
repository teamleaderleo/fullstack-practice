// ========================================
// Q1: Aggregation -- Total population by country
// ========================================

const csvData = `
city,country,population
San Francisco,USA,870000
New York,USA,8400000
Toronto,Canada,2800000
Vancouver,Canada,630000
`;

// Expected Output:
// { USA: 9270000, Canada: 3430000 }

function totalPopulationByCountry(csv: string): Record<string, number> {
  const lines = csv.trim().split('\n');
  const header = lines[0].split(',');
  const result: Record<string, number> = {};

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const country = cols[1];
    const population = parseInt(cols[2], 10);
    result[country] = (result[country] || 0) + population;
  }

  return result;
}

console.log('Populations:', totalPopulationByCountry(csvData));

/*
-- My Notes --
T:
C:
*/

// ========================================
// Q2: Grouping -- Posts by tag
// ========================================
const posts = [
  { id: 1, title: 'Post 1', tags: ['tech', 'news'] },
  { id: 2, title: 'Post 2', tags: ['lifestyle'] },
  { id: 3, title: 'Post 3', tags: ['tech', 'lifestyle'] },
];

// Expected Output:
// { tech: [1, 3], news: [1], lifestyle: [2, 3] }

function groupPostsByTag(posts: { id: number; tags: string[] }[]): Record<string, number[]> {
  const tagMap: Record<string, number[]> = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!tagMap[tag]) {
        tagMap[tag] = [];
      }
      tagMap[tag].push(post.id);
    }
  }
  return tagMap;
}

console.log('Grouped by tag:', groupPostsByTag(posts));

/*
-- My Notes --
T:
C:
*/

// ========================================
// Q3: Filter + Sort -- Active users by age
// ========================================
const users = [
  { name: 'Alice', age: 30, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Carol', age: 28, active: true },
];

// Expected Output:
// ['Carol', 'Alice']

function getActiveUserNamesSorted(users: { name: string; age: number; active: boolean }[]): string[] {
  return users
    .filter(user => user.active)
    .sort((a, b) => a.age - b.age)
    .map(user => user.name);
}

console.log('Active users:', getActiveUserNamesSorted(users));

/*
-- My Notes --
T:
C:
*/
