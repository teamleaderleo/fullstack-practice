// ========================================
// Q6: Immutable update -- Mark one event as done
// ========================================

const events = [
  { id: 1, name: 'Museum', done: false },
  { id: 2, name: 'Cafe', done: false },
];

const updatedEvents = events.map(event =>
  event.id === 2 ? { ...event, done: true } : event
);
console.log('Updated events:', updatedEvents);

/*
-- My Notes --
T: So here we’re immutably updating an array -- we want to mark the event with ID 2 as "done".

We’re using `.map()` to walk through the array, and we use `event.id === 2` to check the match.

C: Right -- `.map()` is perfect for this because it transforms items *selectively*.
You return a modified version of just the one you want to change, and leave the others untouched.

T: And yeah -- triple equals. At this point, nobody really uses double equals. That one’s got quirks,
and rather than fixing it they added `===`, which... fair enough I guess.

C: Exactly. `===` (strict equality) doesn’t coerce types. It’s the default now.
You’ll *only* see `==` used intentionally by people who know what they're doing and want that coercion.

T: I do wonder if we'll ever get a quadruple equals. You know, like in case we want to compare values *and* souls or something.

C: Haha, “identity and metaphysical equivalence” -- JS 2030.

T: Ternary operators though... man, I still find them kind of unsettling. Like, useful, but uncomfortable.
I’d prefer if the question mark came first. That way it’d be more clearly an “if expression”.
This structure where you hit a Boolean expression first and then *suddenly* see a `?` can be disorienting.
You’re like, “Wait... what are we doing here?”

C: You're definitely not alone. Ternaries are compact, but that compactness has a *cost*.
Especially when reading quickly, your brain sees a logical condition and expects a full if/else block -- and then… surprise punctuation.

T: Right! Some sort of visual signifier -- like a keyword, or even a color-coding hint in a theme -- could help.
Anything that says: “Hey, we’re branching now!”

C: Devs who use them a lot often develop that mental pattern, but yeah -- it’s not inherently ergonomic.
Some linters or style guides even discourage complex ternaries for this reason.
A good rule of thumb is: keep them single-line, side-effect free, and obvious.

T: Makes sense. This case is okay. Still not a fan of the syntax, but I get it.

*/

// ========================================
// Q7: Optional chaining -- Get first event name or fallback
// ========================================

const firstEventName = trip.days?.[0]?.events?.[0] ?? 'Unknown';
console.log('First event name:', firstEventName);

/*
-- My Notes --
T: Okay, we’re trying to get the name of the first event on the first day.
But the structure might not always be present -- maybe `trip.days` is undefined, or `events` doesn’t exist, etc.

So we’re using that `?.` optional chaining operator. This lets you safely dig down without throwing errors.

C: Exactly -- optional chaining lets you "poke" into a nested structure without worrying about `undefined` blowing up the chain.
Each `?.` says: "If this exists, keep going; if not, just bail and return undefined."

T: Right, so this prevents us from needing a whole mess of nested if-statements.
But then we get to this thing: `??`. Double question mark. I *think* this is the nullish coalescing operator?

C: You got it. It’s like a smarter version of `||` (logical OR) -- it **only falls back if the left-hand side is `null` or `undefined`.**
That’s different from `||`, which will treat *falsy* values like `0`, `''`, or `false` as reasons to fall back too.

T: Wait -- that’s kind of wild. So:
```js
0 || 'fallback'     // returns 'fallback'
0 ?? 'fallback'     // returns 0
```
C: Exactly! That’s the difference. ?? is saying: "I only want to assign the fallback if I truly have nothing (null or undefined)."

T: So this expression:
```js
trip.days?.[0]?.events?.[0] ?? 'Unknown'
```
means: if we get a valid string back from digging through all that, great. If we hit undefined or null anywhere, give me 'Unknown'.
C: Nailed it.

T: And from a syntax perspective, I guess we’re going deeper into this “symbolic language” now.
First one question mark is a ternary. Then two question marks is... a null-coalescing assignment.
It’s like we’re getting into question mark algebra.

C: Haha, yes -- if ? is “maybe,” then ?? is “if not that, then give me something real.”
It’s an intentional addition to make null-safety readable without verbosity.

T: Makes sense. Still feels like this kind of stuff needs a primer the first time you see it.
Like, "don’t panic, you’re not being hacked -- this is just modern JavaScript."
C: Couldn’t have said it better.
*/