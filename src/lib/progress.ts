export interface CompletionRecord {
  puzzleId: string;
  solveTimeSeconds: number;
  hintsUsed: number;
  xpEarned: number;
  completedAt: string;
}

export interface ProgressData {
  streak: number;
  xp: number;
  badges: string[];
  completions: CompletionRecord[];
}

export interface BadgeDefinition {
  id: string;
  label: string;
  description: string;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: 'first-solve', label: 'First Solve', description: 'Complete your first WorldWise Crossword.' },
  { id: '3-day-streak', label: '3-Day Streak', description: 'Reach a 3-puzzle solving streak.' },
  { id: 'no-hints', label: 'No Hints', description: 'Solve a puzzle without using any hints.' },
];

const STORAGE_KEY = 'worldwise-progress-v1';
const BASE_XP = 100;
const HINT_PENALTY = 10;
const MIN_XP = 40;

function computeXp(hintsUsed: number): number {
  return Math.max(MIN_XP, BASE_XP - hintsUsed * HINT_PENALTY);
}

const EMPTY_PROGRESS: ProgressData = { streak: 0, xp: 0, badges: [], completions: [] };

export function loadProgress(): ProgressData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROGRESS };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

function saveProgress(data: ProgressData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Idempotent: replaying a completion for a puzzle already recorded returns the
 * existing record instead of double-counting streak/XP.
 */
export function recordCompletion(
  puzzleId: string,
  stats: { solveTimeSeconds: number; hintsUsed: number },
): CompletionRecord {
  const progress = loadProgress();
  const existing = progress.completions.find((c) => c.puzzleId === puzzleId);
  if (existing) return existing;

  const record: CompletionRecord = {
    puzzleId,
    solveTimeSeconds: stats.solveTimeSeconds,
    hintsUsed: stats.hintsUsed,
    xpEarned: computeXp(stats.hintsUsed),
    completedAt: new Date().toISOString(),
  };

  const nextStreak = progress.streak + 1;
  const nextCompletions = [...progress.completions, record];
  const badges = new Set(progress.badges);
  badges.add('first-solve');
  if (nextStreak >= 3) badges.add('3-day-streak');
  if (stats.hintsUsed === 0) badges.add('no-hints');

  saveProgress({
    streak: nextStreak,
    xp: progress.xp + record.xpEarned,
    badges: Array.from(badges),
    completions: nextCompletions,
  });

  return record;
}

/**
 * Returns a Monday-first [M, T, W, T, F, S, S] array marking which days of
 * the current week had at least one completion.
 */
export function getWeekSolvedDays(completions: CompletionRecord[]): boolean[] {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday ... 6 = Saturday
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + mondayOffset);

  const days = Array(7).fill(false) as boolean[];
  for (const completion of completions) {
    const diffDays = Math.floor(
      (new Date(completion.completedAt).getTime() - monday.getTime()) / 86_400_000,
    );
    if (diffDays >= 0 && diffDays < 7) days[diffDays] = true;
  }
  return days;
}
