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
T: Okay, so we’re parsing and aggregating stuff. We take in a "thing" -- here, a string that looks like CSV data.
C: Right. It's a multiline CSV string, and we're treating it as raw input you'd typically get from a file or API.

T: And we use this Record<string, number> thing -- that’s like a key-value map where keys are countries, and values are total populations?
C: Exactly. It’s a TypeScript type: Record<K, V> just means an object whose keys are type K (like string), and values are type V (like number).

T: Sometimes the syntax gets cluttered with types. Like, you’ve got function parameters and return types right next to each other, 
and it can be hard to visually parse when you're tired.
C: Fair point -- TypeScript gets dense fast. But keeping return types explicit really helps prevent bugs.

T: Alright, so first, csv.trim().split('\n'). That strips off blank lines and splits the CSV into rows.
C: Yes -- trim() removes surrounding whitespace, and split('\n') turns it into an array of lines.

T: Then .split(',') again for each line, which gives us the actual fields.
C: Yep -- CSVs are column-delimited, so that gives you the columns per row. It's a poor man's CSV parser, 
but it works for simple cases like this.

T: So like... strings in JS -- can I treat them like arrays? Like indexable?
C: You can! Strings are array-like: you can index them, slice them, etc. But they’re immutable.

T: Ok. So you loop from i = 1 to skip the header. Then for each line, you pull out the country and population.
C: Exactly. The header's just the labels. Everything from line 1 onward is the actual data.

T: And then you parse the population with parseInt, just to make sure it's a number.
C: Right. Always parse strings from CSVs -- even numbers come in as strings.

T: You build up the result object by summing each population under its country key. Straightforward.
C: You nailed it. That “sum while grouping” pattern is super common in these types of real-world scripts.

T: One tiny thing -- what’s the deal with the backticks and tildes and stuff in template literals? Why not just use quotes?
C: Backticks are for template literals, which let you do multi-line strings and string interpolation like `Hello ${name}`. 
Regular quotes can’t span multiple lines.
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

T: Okay, right. So we’d just do this with a SQL join normally,
but I guess this is one of those cases where you want to do it imperatively.
Fine.
C: Yup, it’s pretty common when you’ve already got a JSON array in memory
or you're dealing with API data and not a DB.

T: So, okay, we write a function again.
Take in the posts -- and this time, we’re defining the whole structure
of the array’s contents right there in the parameter.
It looks kinda awkward.

C: Yeah, that inline typing --
posts: { id: number; tags: string[] }[] --
it’s handy for quick stuff, but not pretty.

T: I feel like you’d usually define the shape elsewhere.
Like a separate type -- not inline.
C: Totally. In production code, you’d have something like
type Post = { id: number; tags: string[] };
and then just write posts: Post[].

T: Also, visually -- the square brackets at the end of the type
make things look a bit backward.
When you're skimming, it's like a little brain hiccup.
C: Yeah, that’s a common reaction. TypeScript's syntax can get
visually messy when you're stacking types inline like that.

T: Whatever, though. Not the worst thing.
And I guess if you're just moving fast, it's fine.
C: Yep -- it's pragmatic. Ugly, but fast.

T: Okay. So each post has a list of tags.
And we want to flip that --
so now each tag points to a list of post IDs.
C: Exactly. You’re inverting the structure --
from post → tags to tag → [post IDs].

T: Is this gonna be n²? Or…
No, actually, you just go over each post once,
and then each tag in it.
C: Right -- O(n * k), where n is the number of posts
and k is the average number of tags per post.

T: Okay, so we go post by post, tag by tag.
If a tag’s not in the map yet, initialize an array.
Then push the post ID in there.
C: That’s it. It's a basic "group by" operation.

T: I guess this makes sense for user-defined tagging systems --
like hashtags, where tags are dynamic and not pre-declared.
C: Definitely. That’s where this kind of mapping logic
gets used a lot -- tags, categories, labels, etc.
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
