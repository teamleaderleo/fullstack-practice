// ========================================
// Q1: Filter -- Get all visited places
// ========================================

const places = [
  { name: 'Eiffel Tower', visited: true },
  { name: 'Louvre', visited: false },
  { name: 'Colosseum', visited: true },
];

const visitedPlaces = places.filter(place => place.visited);
console.log('Visited places:', visitedPlaces);

/*
-- My Notes --
T: Okay, so we want like all the visited places and we're given this like very neat little bit of data.
What the heck even is this data type? Am I supposed to think of these as key-value pairs?

C: Yes! This is an array of plain JavaScript objects (think: Python dicts).

T: Also, syntactically, this is kind of interesting. Like: `const` -- right, these days everybody uses `const`.
C: const is the default go-to in modern JS unless you need reassignment.

T: So.filter() -- obvious to use it here, and it's kind of like SQL WHERE. Way more readable than some alternatives.
C: .filter() is like SQL WHERE, non-mutating, and very expressive.

T: Arrow function -- that => thing feels like Python’s lambda, but cleaner.
C: => is an arrow function, basically a lambda, and even handles `this` more intuitively.
*/

// ========================================
// Q2: Map -- Get a list of place names
// ========================================

const names = places.map(place => place.name);
console.log('Place names:', names);

/*
-- My Notes --
T: So we're using the same `places` array as before, and now we want just the names.
Interesting that we're not directly printing them. I mean, we could have just done:
console.log(places.map(...)), right?

C: Absolutely -- you can absolutely inline it in the log. This example just assigns it to `names` for clarity,
but in real code, inline usage is super common when you're piping or debugging.

T: Also, why is console.log so long? It's like, not as bad as Java's system.out.print or whatever, but still.
Python just gives you `print` and that feels much better.

C: Yeah, verbosity is one of JS’s quirks. Some people alias `console.log` as `log` during development,
or use logging utilities or browser tools. But yeah -- no built-in shorthand.

T: Right, now we're not filtering anymore -- we're extracting part of the structure. But dot-map almost hides what's happening. 
It feels like something more functional, like mapping inputs to outputs.

C: That's a great instinct -- `.map()` *is* functional. It takes every element of an array and “transforms” it into something else. 
It’s not about inclusion/exclusion (like `.filter()`), it’s about conversion.

T: If I were doing this in Python, I guess I’d do a for-loop and just print each name. Or with list comprehension,
like `[x["name"] for x in places]`, assuming it's a list of dicts. JS feels... more built-in here?

C: Yes -- in Python, list comprehensions are idiomatic, but still a special syntax.
In JS, `.map()` is literally just a method on arrays -- no special language feature required.
And since JS functions are first-class, you can keep it clean with arrow functions.

*/


// ========================================
// INTERMISSION -- Iterators, Iterables, and Why JS Is Cooler Than It Looks
// ========================================

/*
T: I remember from my CS degree there was stuff about iterators, and in Python you definitely see it more, especially in LeetCode.
I didn’t go super deep, but now I’m realizing: wait, isn’t JS kinda underrated here?

C: Totally. JavaScript’s iterable/iterator protocol is low-key one of the most powerful, underappreciated features.
Here’s the key:

- **Iterable**: Any object that implements a method called `[Symbol.iterator]()` that returns an iterator.
- **Iterator**: Any object with a `.next()` method that returns `{ value, done }`.

And that’s what powers `for...of`, the spread operator `...`, array destructuring, and all these higher-order methods.

T: So, like, arrays just happen to be iterables already?
C: Exactly. Arrays are built-in iterables. When you do `for (const item of array)`, behind the scenes, JS is doing:
```js
const iterator = array[Symbol.iterator]();
let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}

T: Whoa, okay, that’s super explicit. So if I wanted to make my own data structure iterable, I’d just define [Symbol.iterator]()?
C: Yep! You can define [Symbol.iterator]() on any object and have it work with for...of, destructuring, etc.
Here’s a silly custom example:
const myRange = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

for (const num of myRange) {
  console.log(num); // 1, 2, 3, 4, 5
}
T: That’s kind of like Python’s __iter__ and __next__.
C: Exactly -- and they serve similar purposes, though JS’s protocol is a bit more explicit and manual.
It’s also what powers generators, which are like iterators with superpowers.
*/

// ========================================
// INTERMISSION -- Under the Hood of .map() / .reduce() / Arrow Functions
// ========================================

/* -- My Notes --
Intermission: Under the Hood of .map() / .reduce() / Arrow Functions
pgsql
Copy
Edit
T: I feel like I glossed over `.map()` and `.reduce()` for a long time, but now I’m wondering -- what’s really happening here?
There’s clearly some behind-the-scenes magic. Like how does `.map()` know what to assign? Is it just stepping through?

C: Yep, at a high level, that's what it's doing -- stepping through index by index. But it's helpful to know what the actual method looks like.
If you boiled down `.map()` to its core behavior, it’s something like:

```js
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Only call on defined elements (sparse arrays)
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};
So, it just:

Walks through the array,
Calls your function for each value,
Pushes the return value to a new array.
No in-place mutation. It's not much "magic" -- it's just structured, encapsulated logic.

T: Oh, so it's really just like a loop under the hood?
C: Exactly. A lot of JavaScript’s higher-order methods are basically polished, ergonomic versions of for loops.

What about .reduce()?
That one’s a bit more complex, since you're folding values down into one result -- but again, same idea:

js
Copy
Edit
Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue;
  let startIdx = 0;

  if (acc === undefined) {
    // No initial value -- start from the first element
    acc = this[0];
    startIdx = 1;
  }

  for (let i = startIdx; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }

  return acc;
};
T: Wait, so .reduce() is like accumulating state?
C: Exactly -- it's like saying: "I want to boil this array down into a single value, and I’ll provide the rule for how."

T: I know arrow functions are lambdas, but they also do something different with this, right?
C: Yup. Here’s the core difference:

Traditional function: has its own this, based on how it's called.

Arrow function: captures this from the surrounding context (lexical scope).

Example:
js
Copy
Edit
function Timer() {
  this.seconds = 0;

  // Here, 'this' inside setInterval would be wrong unless we use an arrow function
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
If you had used a regular function inside setInterval, this would have referred to setInterval, not the Timer instance.

T: Yeah, I think I just started ignoring this at some point and it stopped being a problem.
C: That’s actually kind of healthy. In modern JS -- especially with arrow functions, closures, and functional components -- you can often avoid direct use of this, which is kind of a gift.

T: Wait, arrow functions are kind of f***ing magical. Like, this is part of what makes React React, right?
C: 100%. Arrow functions are *foundational* to the modern JavaScript dev experience -- not just React,
but also for writing concise, expressive code where binding `this` used to be a pain.
React functional components? Event handlers? Inline logic in JSX? All of that lives and breathes through arrow functions.

T: Across Python, Java, and Go -- none of them really do this quite the same way.
I feel like Python has lambdas, sure, but they’re limited.
And Java’s anonymous functions are kind of verbose. Go -- well, maybe it has something?

C: Go does have function literals, yeah -- you can do stuff like:

```go
fn := func(x int) int {
    return x * 2
}
But Go is explicitly anti-magic -- it favors simplicity over ergonomics.
There's no concept of this really, because it's all about interfaces and value-based composition, not OOP.

T: Right, I guess that's why constructors and methods in Go don't lean into this paradigm. You kind of sidestep it all.
C: Exactly. So when you come back to JS, arrow functions feel ergonomic in a way that many languages avoid --
they reduce boilerplate, dodge binding hell, and let you express intent quickly.
*/

// ========================================
// Q3: Reduce -- Count how many visited
// ========================================

const countVisited = places.reduce((count, place) =>
  place.visited ? count + 1 : count, 0);
console.log('Count of visited places:', countVisited);

/*
-- My Notes --
T: Okay, so here we’re counting how many places were visited using `.reduce()`.

We pass in two parameters: `count` and `place`. `count` is the accumulator and starts at 0 (that’s the second argument). 

Now, this part is interesting: `place.visited ? count + 1 : count` -- that’s the ternary operator, right? 
It’s like a shortcut for an if/else. But the symbolism here is a bit... unintuitive? 
It makes sense if you know what you're looking at, but I feel like it might trip you up if you read left to right too literally.

Would this be easier to read if you were used to reading right to left? Like, would someone used to Hebrew or Japanese
pick this up more intuitively?

C: That’s a fascinating thought -- the ternary syntax definitely benefits from **pattern familiarity** over semantic clarity.
It’s more “visual idiom” than logical structure. Once you’ve seen it a few times, it’s very compact,
but yeah -- it’s not *inherently* readable.

T: Also, in Python, I feel like I’d probably just use a sum and a generator expression: 
`sum(1 for p in places if p["visited"])`. It’s very declarative. But here, we’re going lower-level, in a sense.

C: Exactly -- Python's syntax leans toward concise *expressions* (like comprehensions), while JS often pushes you 
toward using functional primitives like `.reduce()` to achieve the same thing.

T: And with raw JavaScript, we don’t know what the types are. Is `countVisited` going to be a number? Probably? 
But in TypeScript, you’d be able to annotate this -- maybe explicitly say `reduce<number>` or something.

C: Right -- in TypeScript, you could write:
```ts
const countVisited = places.reduce<number>((count, place) => 
  place.visited ? count + 1 : count, 0);
```
That helps the compiler (and your teammates) know exactly what you're expecting.
But JS is more trusting -- which is both freeing and risky.

T: Yeah, like in Python you might use a defaultdict, or just track things casually.
In JS, it feels like you’re juggling a few assumptions unless you lock it down with TS.

C: That’s the eternal tension between flexibility and safety -- TypeScript gives you scaffolding,
but pure JS lets you move fast. You’ll pick the tool depending on context, especially in companies where 
data shape consistency is everything.
*/

// ========================================
// Q4: Group by country
// ========================================

const grouped = places.reduce((acc, place) => {
  if (!acc[place.country]) acc[place.country] = [];
  acc[place.country].push(place);
  return acc;
}, {});
console.log('Grouped by country:', grouped);

/*
-- My Notes --
T: Okay, so we’re using `.reduce()` again -- but now it’s more complicated.
This time we’re grouping places by country.

So, are the parameters here like a tuple? Like the accumulator and the item?
I guess they’re just parameters we name -- it’s not that JavaScript gives us a "tuple" or anything.
We’re just destructuring the data flow from `.reduce()`?

C: Exactly. In `.reduce((acc, item) => {}, initialValue)`, you're naming two parameters:
- `acc`: the accumulator that you’re building up.
- `item`: the current element in the array. No tuple or special structure -- it’s just parameter order.

T: So in this case, `acc` is the grouping object, and `place` is each place object in the array. 
We’re checking if `acc[place.country]` exists, and if not, we initialize it as an empty array.

C: Right -- this is basically a classic "group by" operation in imperative style.
You create an object where each key is a country, and the value is an array of places in that country.

T: `.push()` here is doing the same thing as `append()` in Python, right?
C: Exactly. `.push(item)` appends to the end of a JS array. Same as Python's `list.append()`.

T: And then we always return `acc` at the end because reduce needs to carry that forward, yeah?
C: Yep -- if you forget to return `acc`, everything breaks. It’s like passing the baton in a relay race.

T: So I guess this isn’t flattening -- it’s grouping. Just visually, it kind of looks like it’s flattening into nested arrays.
C: Good instinct -- but yeah, it’s grouping. You’re creating a **structure of arrays**, not collapsing one.

T: Honestly, this feels a little awkward and not super readable. Isn’t there a more intuitive way?
C: Totally fair. This is a common critique of `.reduce()` for grouping. It’s powerful but not expressive.
In practice, a helper like Lodash's `_.groupBy` makes it *much* cleaner:

```js
import _ from 'lodash';
const grouped = _.groupBy(places, 'country');
```
One line. Very clear. But if you’re avoiding dependencies, this reduce pattern is the go-to.
T: Makes sense. Maybe it's just about familiarity -- this is readable once you’ve seen it a few times, but it’s not beginner-friendly.

C: That’s exactly right. Once your mental model clicks, this becomes a kind of muscle memory -- but the first few times? Yeah, totally awkward.
*/