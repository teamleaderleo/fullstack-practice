// ========================================
// Q1: Filter — Get all visited places
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
