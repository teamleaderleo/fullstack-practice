// --- 🧪 Challenge 1: Flatten a nested array of values --- //
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.flat(); // [1, 2, 3, 4, 5]
console.log('Flattened:', flat);

// --- 🧪 Challenge 2: Group people by department --- //
const people = [
  { name: 'Alice', dept: 'Engineering' },
  { name: 'Bob', dept: 'Design' },
  { name: 'Charlie', dept: 'Engineering' },
];

const grouped = people.reduce((acc, person) => {
  acc[person.dept] ||= [];
  acc[person.dept].push(person.name);
  return acc;
}, {});
console.log('Grouped by dept:', grouped);

// --- 🧪 Challenge 3: SQL-style JOIN --- //
const users = [
  { id: 1, name: 'Jane' },
  { id: 2, name: 'John' },
];

const posts = [
  { userId: 1, title: 'Post A' },
  { userId: 2, title: 'Post B' },
  { userId: 1, title: 'Post C' },
];

const joined = users.map(user => ({
  ...user,
  posts: posts.filter(p => p.userId === user.id),
}));
console.log('Joined:', joined);
