import type { ComponentType } from 'react';
import { WorldWiseMark } from '../components/icons/WorldWiseMark';
import { DotsIcon, GridIcon, HexagonIcon, MiniGridIcon } from '../components/icons/GameIcons';

interface GamesHubProps {
  onOpenCrossword: () => void;
  onHome: () => void;
  onProgress: () => void;
}

interface DemoGame {
  name: string;
  blurb: string;
  Icon: ComponentType<{ className?: string }>;
  shade: string;
}

const DEMO_GAMES: DemoGame[] = [
  { name: 'Wordle', blurb: 'Guess the five-letter word.', Icon: GridIcon, shade: 'bg-pale' },
  { name: 'Spelling Bee', blurb: 'Find words from seven letters.', Icon: HexagonIcon, shade: 'bg-pale-2' },
  { name: 'Connections', blurb: 'Group words that share a theme.', Icon: DotsIcon, shade: 'bg-pale' },
  { name: 'The Mini', blurb: 'A quick, bite-sized crossword.', Icon: MiniGridIcon, shade: 'bg-pale-2' },
];

function DemoCard({ name, blurb, Icon, shade }: DemoGame) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-navy/10 bg-white p-4 shadow-sm">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${shade}`}>
        <Icon className="h-5 w-5 text-navy" />
      </div>
      <h3 className="font-masthead text-lg font-medium text-navy">{name}</h3>
      <p className="mt-1 font-ui text-sm text-navy/60">{blurb}</p>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
          Demo only
        </span>
      </div>
    </div>
  );
}

function HeroDemoTile({
  Icon,
  size,
  shade,
}: {
  Icon: ComponentType<{ className?: string }>;
  size: number;
  shade: string;
}) {
  return (
    <div
      className={`group relative flex items-center justify-center rounded-3xl shadow-sm transition-transform hover:scale-105 ${shade}`}
      style={{ width: size, height: size }}
    >
      <Icon className="h-1/2 w-1/2 text-navy" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-white/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span className="font-ui text-[9px] font-semibold uppercase tracking-wide text-navy/60">
          Demo only
        </span>
      </div>
    </div>
  );
}

export function GamesHub({ onOpenCrossword, onHome, onProgress }: GamesHubProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-3 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
          NYT Games
        </p>
        <nav className="flex gap-3">
          <button
            type="button"
            onClick={onProgress}
            className="font-ui text-sm font-medium text-accent hover:underline"
          >
            Progress
          </button>
          <button
            type="button"
            onClick={onHome}
            className="font-ui text-sm font-medium text-accent hover:underline"
          >
            Home
          </button>
        </nav>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        <HeroDemoTile Icon={HexagonIcon} size={84} shade="bg-pale-2" />
        <HeroDemoTile Icon={GridIcon} size={64} shade="bg-pale" />
        <button
          type="button"
          onClick={onOpenCrossword}
          className="relative flex h-44 w-44 flex-col items-center justify-center rounded-3xl bg-accent shadow-md transition-transform hover:scale-105 sm:h-52 sm:w-52"
        >
          <WorldWiseMark size="hero" />
        </button>
        <HeroDemoTile Icon={DotsIcon} size={80} shade="bg-pale-2" />
        <HeroDemoTile Icon={MiniGridIcon} size={60} shade="bg-pale" />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-masthead text-4xl font-medium text-navy sm:text-5xl">Games</h1>
        <p className="font-masthead text-lg italic text-navy/70">
          A daily puzzle. A clearer picture.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCrossword}
        className="relative flex items-center gap-4 overflow-hidden rounded-xl border-2 border-accent bg-pale p-5 text-left shadow-sm transition hover:bg-pale-2"
      >
        <span className="absolute right-4 top-4 rounded-full bg-accent px-2 py-0.5 font-ui text-xs font-semibold uppercase tracking-wide text-white">
          New
        </span>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent">
          <WorldWiseMark size="card" />
        </div>
        <div>
          <h2 className="font-masthead text-2xl font-medium text-navy">WorldWise Crossword</h2>
          <p className="mt-1 max-w-md font-ui text-sm text-navy/70">
            A crossword built around today's news, with clues that teach you the key terms.
          </p>
        </div>
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DEMO_GAMES.map((game) => (
          <DemoCard key={game.name} {...game} />
        ))}
      </div>
    </div>
  );
}
