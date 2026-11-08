# WorldWise Crossword

A daily, news-based crossword concept for NYT Games that helps Gen Z understand current events, not just scroll past them.

**[Live demo](https://worldwise-brown-one.vercel.app/)** · **[Pitch deck](https://vibha-veluturi.vercel.app/projects/worldwise-deck.pdf)**

> Student concept prototype. Not affiliated with or endorsed by The New York Times.

## The problem

Gen Z sees the news on TikTok and Instagram but often misses the context. Traditional articles assume background knowledge and use unfamiliar terms. Seeing a headline is not the same as understanding it.

## The idea

Meet students where they already spend time: daily games. WorldWise turns one news story a day into a crossword whose clues teach the key terms behind it.

1. **Personalize.** A short intake picks your interests, how familiar you are with the news, and how much time you have.
2. **Play.** Solve a crossword built from a real story. Clues adjust to your familiarity level.
3. **Learn.** After solving, read a quick summary, a deeper explanation, and a glossary of the terms you just used.
4. **Explore.** Every puzzle ends with a link to the full article, plus an "Outside your usual topics" suggestion to avoid a filter bubble.

The demo puzzle is built around 2026 midterm election coverage (for example, clue: *legal order to testify* → **SUBPOENA** → why it matters now that Democrats control the House).

## Features

- NYT Games-style hub with WorldWise as the featured new game
- 3-step onboarding that sets easy or hard clues
- Fully playable 12×12 crossword: auto-numbering, word-bounded typing, arrow-key navigation, check, hint, and reveal
- Story page with Quick summary, Deeper explanation, and Glossary tabs
- Completion screen with solve time, hints used, XP, streak, and a map connecting the answers by idea
- Progress page with streaks, XP, badges, and completed topics
- Progress saved in the browser, no account needed

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| State | React state + `localStorage` (no backend) |
| Linting | Oxlint |
| Hosting | Vercel |
| Built with | Claude Code |

## Run locally

```bash
npm install
npm run dev
```

Demo shortcuts: add `?demo=1` to skip onboarding, or `?demo=1&solved=1` to jump straight to a solved puzzle.

## Project structure

```
src/
  App.tsx            screen flow (Home → Games → Onboarding → Puzzle ⇄ Story → Completion → Progress)
  screens/           one component per screen
  components/        crossword grid, clues list, controls
  data/              puzzle grid and clues, story content, answer connections
  lib/               crossword numbering, puzzle state, onboarding, progress tracking
```

## Team

Built in a 4-hour sprint by Group 3: Akchara Arun, Amy Buenrostro, Prisha Kuberan, and Vibha Veluturi. Vibha built the working prototype.
