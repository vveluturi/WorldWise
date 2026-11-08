import { useMemo, useState } from 'react';
import { PUZZLE } from '../data/puzzle';
import { SAMPLE_FRIENDS } from '../data/friends';
import { BADGE_DEFINITIONS, getWeekSolvedDays, loadProgress } from '../lib/progress';

interface ProgressProps {
  onBackToGames: () => void;
}

const WEEK_DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const STREAK_BADGE_TARGET = 3;

export function Progress({ onBackToGames }: ProgressProps) {
  const progress = useMemo(loadProgress, []);
  const earnedBadges = new Set(progress.badges);
  const [inviteClicked, setInviteClicked] = useState(false);

  const completedTopics = progress.completions.map((c) =>
    c.puzzleId === PUZZLE.id ? PUZZLE.topic : c.puzzleId,
  );

  const conceptsLearned = progress.completions.length > 0 ? PUZZLE.words.length : 0;
  const topicsExplored = new Set(progress.completions.map((c) => c.puzzleId)).size;
  const weekSolvedDays = useMemo(() => getWeekSolvedDays(progress.completions), [progress.completions]);

  const leaderboard = useMemo(() => {
    const rows = [
      ...SAMPLE_FRIENDS.map((f) => ({ ...f, isYou: false })),
      { name: 'You', streak: progress.streak, conceptsThisWeek: conceptsLearned, isYou: true },
    ];
    return rows.sort((a, b) => b.conceptsThisWeek - a.conceptsThisWeek);
  }, [progress.streak, conceptsLearned]);

  const nextBadge = BADGE_DEFINITIONS.find((b) => !earnedBadges.has(b.id));
  const streakProgress = Math.min(progress.streak, STREAK_BADGE_TARGET);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-3 py-6 sm:px-6">
      <button
        type="button"
        onClick={onBackToGames}
        className="w-fit font-ui text-sm font-medium text-accent hover:underline"
      >
        &larr; Back to Games
      </button>

      <header>
        <h1 className="font-masthead text-3xl font-medium text-navy sm:text-4xl">Your progress</h1>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-navy/10 bg-white p-4 text-center">
          <p className="font-masthead text-3xl font-medium text-navy">{progress.streak}</p>
          <p className="mt-1 font-ui text-xs uppercase tracking-wide text-navy/50">Streak</p>
        </div>
        <div className="rounded-lg border border-navy/10 bg-white p-4 text-center">
          <p className="font-masthead text-3xl font-medium text-navy">{progress.xp}</p>
          <p className="mt-1 font-ui text-xs uppercase tracking-wide text-navy/50">XP</p>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
          Badges
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {BADGE_DEFINITIONS.map((badge) => {
            const earned = earnedBadges.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-lg border p-3 ${
                  earned ? 'border-accent bg-pale' : 'border-navy/10 bg-white opacity-50'
                }`}
              >
                <p className="font-ui text-sm font-semibold text-navy">{badge.label}</p>
                <p className="mt-1 font-ui text-xs text-navy/60">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
          Completed topics
        </h2>
        {completedTopics.length === 0 ? (
          <p className="font-ui text-sm text-navy/60">No puzzles completed yet.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {completedTopics.map((topic) => (
              <li key={topic} className="font-ui text-sm text-navy/80">
                {topic}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
              Friends this week
            </h2>
            <p className="font-ui text-xs text-navy/50">Sample friends — demo data, not real users.</p>
          </div>
          <button
            type="button"
            onClick={() => setInviteClicked(true)}
            className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-ui text-xs font-medium text-white shadow-sm hover:bg-accent/90"
          >
            {inviteClicked ? 'Coming soon' : 'Invite friends'}
          </button>
        </div>
        <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-navy/10 bg-pale">
                <th className="px-3 py-2 text-left font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
                  Rank
                </th>
                <th className="px-3 py-2 text-left font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
                  Streak
                </th>
                <th className="px-3 py-2 text-right font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
                  Concepts learned
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row, i) => (
                <tr
                  key={row.name}
                  className={`border-b border-navy/5 last:border-0 ${row.isYou ? 'bg-pale' : ''}`}
                >
                  <td className="px-3 py-2 font-ui text-sm text-navy/70">{i + 1}</td>
                  <td className="px-3 py-2 font-ui text-sm font-medium text-navy">
                    {row.name}
                    {row.isYou && (
                      <span className="ml-1 font-ui text-xs font-normal text-accent">(you)</span>
                    )}
                  </td>
                  <td className="px-3 py-2 font-ui text-sm text-navy/70">
                    {row.streak > 0 ? `🔥 ${row.streak}` : '—'}
                  </td>
                  <td className="px-3 py-2 text-right font-ui text-sm text-navy/70">
                    {row.conceptsThisWeek}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
          Your week
        </h2>
        <div className="rounded-lg border border-navy/10 bg-white p-4">
          <div className="flex justify-between gap-1">
            {WEEK_DAY_LABELS.map((label, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="font-ui text-xs text-navy/50">{label}</span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-ui text-xs font-semibold ${
                    weekSolvedDays[i] ? 'bg-accent text-white' : 'bg-pale text-navy/30'
                  }`}
                >
                  {weekSolvedDays[i] ? '✓' : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6 border-t border-navy/10 pt-3">
            <div>
              <p className="font-masthead text-xl font-medium text-navy">{conceptsLearned}</p>
              <p className="font-ui text-xs uppercase tracking-wide text-navy/50">
                Concepts learned
              </p>
            </div>
            <div>
              <p className="font-masthead text-xl font-medium text-navy">{topicsExplored}</p>
              <p className="font-ui text-xs uppercase tracking-wide text-navy/50">
                Topics explored
              </p>
            </div>
          </div>
        </div>
      </section>

      {nextBadge && (
        <section className="flex flex-col gap-2">
          <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
            Next badge
          </h2>
          <div className="rounded-lg border border-navy/10 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-ui text-sm font-semibold text-navy">{nextBadge.label}</p>
              {nextBadge.id === '3-day-streak' && (
                <p className="font-ui text-sm text-navy/60">
                  {streakProgress} of {STREAK_BADGE_TARGET} days
                </p>
              )}
            </div>
            {nextBadge.id === '3-day-streak' && (
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-pale-2">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(streakProgress / STREAK_BADGE_TARGET) * 100}%` }}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
