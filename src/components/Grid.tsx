import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { CrosswordModel } from '../lib/crossword';
import type { CellStatus } from '../lib/usePuzzleState';
import type { Direction } from '../lib/crossword';

interface Position {
  row: number;
  col: number;
}

interface GridProps {
  model: CrosswordModel;
  letters: string[][];
  statuses: (CellStatus | null)[][];
  selected: Position;
  direction: Direction;
  onSelectCell: (row: number, col: number) => void;
  onMove: (dRow: number, dCol: number) => void;
  onToggleDirection: () => void;
  onTypeLetter: (letter: string) => void;
  onBackspace: () => void;
}

export interface GridHandle {
  focusInput: () => void;
}

export const Grid = forwardRef<GridHandle, GridProps>(function Grid(
  {
    model,
    letters,
    statuses,
    selected,
    direction,
    onSelectCell,
    onMove,
    onToggleDirection,
    onTypeLetter,
    onBackspace,
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus({ preventScroll: true }),
  }));
  const activeCell = model.grid[selected.row][selected.col];
  const activeWord = direction === 'across' ? activeCell.acrossWord : activeCell.downWord;

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [selected, direction]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      onBackspace();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onMove(-1, 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onMove(1, 0);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onMove(0, -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onMove(0, 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      onToggleDirection();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      onTypeLetter(e.key);
    }
  };

  const handleChange = () => {
    // Letters are handled in onKeyDown; keep the input empty so mobile
    // soft keyboards (which may fire input before/without keydown) still work.
    const value = inputRef.current?.value ?? '';
    const match = value.match(/[a-zA-Z]/g);
    if (match && match.length > 0) {
      onTypeLetter(match[match.length - 1]);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex w-full flex-col items-center">
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        value=""
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Crossword letter input"
        className="sr-only"
      />
      <div
        className="grid w-full max-w-[min(96vw,560px)] touch-manipulation gap-0 border-2 border-navy bg-navy"
        style={{
          gridTemplateColumns: `repeat(${model.width}, 1fr)`,
          aspectRatio: `${model.width} / ${model.height}`,
        }}
      >
        {model.grid.flatMap((row) =>
          row.map((cell) => {
            if (cell.isBlack) {
              return <div key={`${cell.row}-${cell.col}`} className="bg-navy" />;
            }

            const isSelected = cell.row === selected.row && cell.col === selected.col;
            const isInActiveWord = Boolean(
              activeWord?.cells.some((c) => c.row === cell.row && c.col === cell.col),
            );
            const status = statuses[cell.row][cell.col];
            const letter = letters[cell.row][cell.col];

            let bg = 'bg-white';
            if (isSelected) bg = 'bg-accent';
            else if (isInActiveWord) bg = 'bg-pale-2';

            let textColor = 'text-navy';
            if (isSelected) textColor = 'text-white';
            else if (status === 'correct') textColor = 'text-emerald-600';
            else if (status === 'incorrect') textColor = 'text-red-600';
            else if (status === 'revealed') textColor = 'text-accent';

            return (
              <button
                key={`${cell.row}-${cell.col}`}
                type="button"
                onClick={() => onSelectCell(cell.row, cell.col)}
                className={`relative flex aspect-square items-center justify-center border border-navy/15 ${bg} focus:outline-none`}
              >
                {cell.number !== null && (
                  <span
                    className={`absolute left-[2px] top-0 text-[clamp(7px,1.6vw,10px)] font-ui font-medium leading-none ${
                      isSelected ? 'text-white/80' : 'text-navy/60'
                    }`}
                  >
                    {cell.number}
                  </span>
                )}
                <span
                  className={`font-ui text-[clamp(14px,4.2vw,22px)] font-semibold ${textColor}`}
                >
                  {letter}
                </span>
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
});
