import type { ClueInfo } from '../lib/crossword';

interface ControlsProps {
  activeClue: ClueInfo | null;
  hintClueKey: string | null;
  onCheckWord: () => void;
  onHint: () => void;
  onRevealLetter: () => void;
}

export function Controls({
  activeClue,
  hintClueKey,
  onCheckWord,
  onHint,
  onRevealLetter,
}: ControlsProps) {
  const showingHint = activeClue && hintClueKey === `${activeClue.direction}-${activeClue.number}`;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={onCheckWord}
          className="flex-1 rounded-md bg-accent px-3 py-2 font-ui text-sm font-medium text-white shadow-sm hover:bg-accent/90 active:bg-accent/80"
        >
          Check word
        </button>
        <button
          type="button"
          onClick={onHint}
          className="flex-1 rounded-md bg-accent px-3 py-2 font-ui text-sm font-medium text-white shadow-sm hover:bg-accent/90 active:bg-accent/80"
        >
          Hint
        </button>
        <button
          type="button"
          onClick={onRevealLetter}
          className="flex-1 rounded-md bg-accent px-3 py-2 font-ui text-sm font-medium text-white shadow-sm hover:bg-accent/90 active:bg-accent/80"
        >
          Reveal letter
        </button>
      </div>
      <div className="min-h-[2.5rem] rounded-md bg-pale px-3 py-2 font-ui text-sm text-navy/70">
        {showingHint && activeClue
          ? activeClue.explanation
          : 'Select a clue, then use Hint for a one-line explanation.'}
      </div>
    </div>
  );
}
