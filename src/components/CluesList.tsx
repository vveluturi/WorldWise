import type { ClueInfo } from '../lib/crossword';

interface CluesListProps {
  title: string;
  clues: ClueInfo[];
  activeClue: ClueInfo | null;
  onSelectClue: (clue: ClueInfo) => void;
  useEasyClues: boolean;
}

export function CluesList({ title, clues, activeClue, onSelectClue, useEasyClues }: CluesListProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="mb-2 font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
        {title}
      </h3>
      <ul className="flex flex-col gap-1">
        {clues.map((clue) => {
          const isActive =
            activeClue?.number === clue.number && activeClue?.direction === clue.direction;
          return (
            <li key={`${clue.direction}-${clue.number}`}>
              <button
                type="button"
                onClick={() => onSelectClue(clue)}
                className={`w-full rounded px-2 py-1 text-left font-ui text-sm leading-snug ${
                  isActive ? 'bg-pale-2 font-medium text-navy' : 'text-navy/80 hover:bg-pale'
                }`}
              >
                <span className="font-semibold">{clue.number}.</span>{' '}
                {useEasyClues ? clue.clueEasy : clue.clueHard}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
