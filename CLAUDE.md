# WorldWise Crossword

A concept prototype of a news-based crossword living inside "NYT Games." Each puzzle is built
around one news article; clues teach the key terms in plain language. Not affiliated with The
New York Times — a disclaimer banner is fixed on every screen.

## Stack

React + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`, config lives in `src/index.css`
via `@theme`). No router — navigation is a single `screen` state enum in `src/App.tsx`. No
backend — all state is local React state plus `localStorage`.

- `npm run dev` — start the dev server
- `npm run build` — typecheck (`tsc -b`) then `vite build`
- `npm run lint` — oxlint

## Screen flow

`Home → Games hub → Onboarding (3 steps) → Puzzle ⇄ Story → Completion → Progress`

Every screen renders under the fixed `Banner` in `src/App.tsx`. Each screen is a plain function
component in `src/screens/` (except the puzzle, which lives in `src/components/PuzzleScreen.tsx`
alongside its sub-components) and receives navigation as callback props from `App` — there's no
shared nav/router state beyond the one `screen` variable.

- **HomePage** — masthead reads "The New York Times" in Playfair Display (plain text, no logo);
  links to Games and Progress.
- **GamesHub** — header "NYT Games". Wordle/Spelling Bee/Connections/The Mini are inert tiles
  that show a "Demo only" label on hover. The featured WorldWise Crossword tile (NEW badge) opens
  onboarding.
- **Onboarding** (`src/screens/Onboarding.tsx`) — 3 steps with a progress bar: interests (2+),
  familiarity (New/Some/Very — New selects easy clues), time per day (5/10 min). Saved via
  `src/lib/onboarding.ts` to `localStorage`, then opens the puzzle.
- **PuzzleScreen** — the crossword itself. Reads the saved familiarity to pick easy vs. hard
  clues (defaults to easy if onboarding was skipped). Has a "Read the story first" link and,
  once solved, a "View results" button.
- **StoryPage** — tabs (Quick summary / Deeper explanation / Glossary), an outbound "Read the
  full article on nytimes.com" button, and an "Outside your usual topics" card that suggests an
  interest the user didn't pick during onboarding. Content lives in `src/data/story.ts`; real
  article text is `[PLACEHOLDER]` — never invent news facts here.
- **Completion** — solve time, hints used, +XP, streak +1, and a connection map
  (`src/data/connections.ts`) grouping the 10 answers by idea with one sentence per group.
  Recording is idempotent per puzzle id (see `src/lib/progress.ts`).
- **Progress** — streak, XP, badges (First Solve / 3-Day Streak / No Hints), completed topics.

## Puzzle data model

- `src/data/puzzle.ts` — the 12×12 grid (`"."` = black square) and, per answer, an easy clue, a
  hard clue, and a one-line explanation. This is the only place puzzle content is authored.
- `src/lib/crossword.ts` — derives clue numbering and across/down word boundaries from the grid
  (standard crossword numbering algorithm). Don't hardcode clue numbers elsewhere.
- `src/lib/usePuzzleState.ts` — selection, typing, word-bounded auto-advance (arrow keys roam the
  full grid; typing/backspace stay within the active word), check/hint/reveal, hint-count
  tracking, and `localStorage` persistence keyed by puzzle id.
- `src/lib/progress.ts` — streak/XP/badge bookkeeping, keyed by puzzle id, idempotent so
  revisiting Completion doesn't double-count.

## Demo helpers (query params)

- `?demo=1` — skip onboarding when opening the crossword from the Games hub.
- `?solved=1` — pre-fill the grid with the solution on load, so the Completion flow can be
  exercised without solving by hand.

Combine them (`?demo=1&solved=1`) to jump straight to a solved puzzle for quick testing.

## Conventions

- Add a new puzzle by extending `src/data/puzzle.ts` with a new grid/word set — `crossword.ts`
  and `usePuzzleState.ts` are puzzle-agnostic. `connections.ts` and `story.ts` currently assume a
  single puzzle; they'd need to key off `PUZZLE.id` if a second puzzle is added.
- Styling: white background, black grid lines, light-blue current word, yellow selected cell.
  Playfair Display for mastheads/headings (`font-masthead`), Libre Franklin for UI text
  (`font-ui`).
- Never fabricate specific news facts — clues, explanations, and story content should stay
  generic/structural (see the `[PLACEHOLDER]` convention in `data/story.ts`).
