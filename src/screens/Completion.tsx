import { useMemo } from 'react';
import { PUZZLE } from '../data/puzzle';
import { CONNECTIONS } from '../data/connections';
import { recordCompletion } from '../lib/progress';
import { formatTime } from '../lib/useTimer';

interface CompletionProps {
  solveTimeSeconds: number;
  hintsUsed: number;
  onBackToGames: () => void;
  onViewProgress: () => void;
}

export function Completion({
  solveTimeSeconds,
  hintsUsed,
  onBackToGames,
  onViewProgress,
}: CompletionProps) {
  const record = useMemo(
    () => recordCompletion(PUZZLE.id, { solveTimeSeconds, hintsUsed }),
    [solveTimeSeconds, hintsUsed],
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-3 py-6 sm:px-6">
      <header>
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-accent">
          Solved
        </p>
        <h1 className="font-masthead text-3xl font-medium text-navy sm:text-4xl">
          {PUZZLE.topic}
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Solve time" value={formatTime(record.solveTimeSeconds)} />
        <StatTile label="Hints used" value={String(record.hintsUsed)} />
        <StatTile label="+XP" value={`+${record.xpEarned}`} highlight />
        <StatTile label="Streak" value="+1" highlight />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
          How the answers connect
        </h2>
        <div className="flex flex-col gap-3">
          {CONNECTIONS.map((group) => (
            <div key={group.title} className="rounded-lg border border-navy/10 bg-white p-4">
              <h3 className="font-masthead text-lg font-medium text-navy">{group.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.words.map((word) => (
                  <span
                    key={word}
                    className="rounded-full bg-pale-2 px-3 py-1 font-ui text-xs font-semibold text-navy"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <p className="mt-2 font-ui text-sm text-navy/70">{group.sentence}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onViewProgress}
          className="rounded-md border border-navy/15 bg-white px-4 py-2 font-ui text-sm font-medium text-navy shadow-sm hover:bg-pale"
        >
          View progress
        </button>
        <button
          type="button"
          onClick={onBackToGames}
          className="rounded-md bg-accent px-4 py-2 font-ui text-sm font-medium text-white hover:bg-accent/90"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-navy/10 bg-white p-3 text-center">
      <p
        className={`font-masthead text-2xl font-medium ${highlight ? 'text-accent' : 'text-navy'}`}
      >
        {value}
      </p>
      <p className="mt-1 font-ui text-xs uppercase tracking-wide text-navy/50">{label}</p>
    </div>
  );
}
