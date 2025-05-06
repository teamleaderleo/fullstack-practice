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
