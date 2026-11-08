import { PUZZLE } from '../data/puzzle';
import { usePuzzleState } from '../lib/usePuzzleState';
import { formatTime } from '../lib/useTimer';
import { loadOnboarding } from '../lib/onboarding';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Grid, type GridHandle } from './Grid';
import { CluesList } from './CluesList';
import { Controls } from './Controls';

interface PuzzleScreenProps {
  onReadStory: () => void;
  onViewResults: (stats: { solveTimeSeconds: number; hintsUsed: number }) => void;
}

export function PuzzleScreen({ onReadStory, onViewResults }: PuzzleScreenProps) {
  const {
    model,
    across,
    down,
    letters,
    statuses,
    selected,
    direction,
    activeClue,
    hintClueKey,
    hintsUsedCount,
    elapsedSeconds,
    setElapsedSeconds,
    solved,
    selectCell,
    moveBy,
    toggleDirection,
    typeLetter,
    backspace,
    checkWord,
    revealLetter,
    showHint,
    selectClue,
  } = usePuzzleState();

  const solvedRef = useRef(solved);
  solvedRef.current = solved;
  const gridRef = useRef<GridHandle>(null);
  const useEasyClues = useMemo(() => {
    const familiarity = loadOnboarding()?.familiarity;
    return familiarity ? familiarity === 'new' : true;
  }, []);

  const handleCheckWord = useCallback(() => {
    checkWord();
    gridRef.current?.focusInput();
  }, [checkWord]);

  const handleHint = useCallback(() => {
    showHint();
    gridRef.current?.focusInput();
  }, [showHint]);

  const handleRevealLetter = useCallback(() => {
    revealLetter();
    gridRef.current?.focusInput();
  }, [revealLetter]);

  useEffect(() => {
    if (solvedRef.current) return;
    const id = window.setInterval(() => {
      if (!solvedRef.current) {
        setElapsedSeconds((s) => s + 1);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [setElapsedSeconds]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-3 py-4 sm:px-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-masthead text-2xl font-medium text-navy sm:text-3xl">
          {PUZZLE.topic}
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-ui text-sm text-navy/60">
          <span>Estimated solve time: {PUZZLE.estimatedMinutes}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            Timer: {formatTime(elapsedSeconds)}
            {solved ? ' — Solved!' : ''}
          </span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={onReadStory}
            className="font-ui text-sm font-medium text-accent hover:underline"
          >
            Read the story first
          </button>
          {solved && (
            <button
              type="button"
              onClick={() => onViewResults({ solveTimeSeconds: elapsedSeconds, hintsUsed: hintsUsedCount })}
              className="rounded-md bg-accent px-3 py-1.5 font-ui text-sm font-medium text-white hover:bg-accent/90"
            >
              View results →
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:w-[60%]">
          <Grid
            ref={gridRef}
            model={model}
            letters={letters}
            statuses={statuses}
            selected={selected}
            direction={direction}
            onSelectCell={selectCell}
            onMove={moveBy}
            onToggleDirection={toggleDirection}
            onTypeLetter={typeLetter}
            onBackspace={backspace}
          />
          <div className="w-full max-w-[min(96vw,560px)]">
            <Controls
              activeClue={activeClue}
              hintClueKey={hintClueKey}
              onCheckWord={handleCheckWord}
              onHint={handleHint}
              onRevealLetter={handleRevealLetter}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <CluesList
            title="Across"
            clues={across}
            activeClue={activeClue}
            onSelectClue={selectClue}
            useEasyClues={useEasyClues}
          />
          <CluesList
            title="Down"
            clues={down}
            activeClue={activeClue}
            onSelectClue={selectClue}
            useEasyClues={useEasyClues}
          />
        </div>
      </div>
    </div>
  );
}
