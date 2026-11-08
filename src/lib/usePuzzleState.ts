import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildCrossword, type CellInfo, type ClueInfo, type Direction } from './crossword';
import { PUZZLE } from '../data/puzzle';

export type CellStatus = 'correct' | 'incorrect' | 'revealed';

interface Position {
  row: number;
  col: number;
}

interface PersistedState {
  letters: string[][];
  statuses: (CellStatus | null)[][];
  selected: Position;
  direction: Direction;
  elapsedSeconds: number;
  solved: boolean;
  hintsUsedCount: number;
}

const STORAGE_KEY = `worldwise-crossword-${PUZZLE.id}`;

function emptyLetters(height: number, width: number): string[][] {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => ''));
}

function emptyStatuses(height: number, width: number): (CellStatus | null)[][] {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => null));
}

function firstWhiteCell(grid: CellInfo[][]): Position {
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.isBlack) return { row: cell.row, col: cell.col };
    }
  }
  return { row: 0, col: 0 };
}

function solvedLetters(grid: CellInfo[][]): string[][] {
  return grid.map((row) => row.map((cell) => (cell.isBlack ? '' : cell.solution)));
}

// Demo helper: ?solved=1 pre-fills the grid so the completion flow can be
// tested without manually solving.
function hasSolvedParam(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('solved') === '1';
}

function loadPersisted(height: number, width: number): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (
      parsed.letters?.length === height &&
      parsed.letters[0]?.length === width &&
      parsed.statuses?.length === height
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function usePuzzleState() {
  const model = useMemo(() => buildCrossword(), []);
  const { grid, width, height, across, down } = model;

  const persisted = useMemo(() => loadPersisted(height, width), [height, width]);
  const demoSolved = useMemo(hasSolvedParam, []);

  const [letters, setLetters] = useState<string[][]>(() => {
    if (demoSolved) return solvedLetters(grid);
    return persisted?.letters ?? emptyLetters(height, width);
  });
  const [statuses, setStatuses] = useState<(CellStatus | null)[][]>(
    () => persisted?.statuses ?? emptyStatuses(height, width),
  );
  const [selected, setSelected] = useState<Position>(
    () => persisted?.selected ?? firstWhiteCell(grid),
  );
  const [direction, setDirection] = useState<Direction>(() => persisted?.direction ?? 'across');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    () => persisted?.elapsedSeconds ?? 0,
  );
  const [hintClueKey, setHintClueKey] = useState<string | null>(null);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(
    () => persisted?.hintsUsedCount ?? 0,
  );

  const solved = useMemo(() => {
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const cell = grid[r][c];
        if (cell.isBlack) continue;
        if (letters[r][c] !== cell.solution) return false;
      }
    }
    return true;
  }, [letters, grid, height, width]);

  // Persist on change.
  useEffect(() => {
    const payload: PersistedState = {
      letters,
      statuses,
      selected,
      direction,
      elapsedSeconds,
      solved,
      hintsUsedCount,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [letters, statuses, selected, direction, elapsedSeconds, solved, hintsUsedCount]);

  const cellAt = useCallback((row: number, col: number): CellInfo | null => {
    if (row < 0 || row >= height || col < 0 || col >= width) return null;
    const cell = grid[row][col];
    return cell.isBlack ? null : cell;
  }, [grid, height, width]);

  const activeClue: ClueInfo | null = useMemo(() => {
    const cell = grid[selected.row][selected.col];
    if (direction === 'across') return cell.acrossWord ?? cell.downWord;
    return cell.downWord ?? cell.acrossWord;
  }, [grid, selected, direction]);

  const effectiveDirection: Direction = activeClue?.direction ?? direction;

  const selectCell = useCallback(
    (row: number, col: number) => {
      const cell = cellAt(row, col);
      if (!cell) return;
      const isSameCell = selected.row === row && selected.col === col;
      setHintClueKey(null);
      if (isSameCell) {
        if (cell.acrossWord && cell.downWord) {
          setDirection((d) => (d === 'across' ? 'down' : 'across'));
        }
        return;
      }
      setSelected({ row, col });
      setDirection((d) => {
        if (d === 'across' && !cell.acrossWord && cell.downWord) return 'down';
        if (d === 'down' && !cell.downWord && cell.acrossWord) return 'across';
        return d;
      });
    },
    [cellAt, selected],
  );

  const moveBy = useCallback(
    (dRow: number, dCol: number) => {
      let r = selected.row + dRow;
      let c = selected.col + dCol;
      while (r >= 0 && r < height && c >= 0 && c < width) {
        if (!grid[r][c].isBlack) {
          setSelected({ row: r, col: c });
          setHintClueKey(null);
          return;
        }
        r += dRow;
        c += dCol;
      }
    },
    [selected, grid, height, width],
  );

  // Moves within the bounds of the currently active word only, so typing
  // past the last letter (or backspacing past the first) doesn't wander
  // into unrelated cells elsewhere in the grid.
  const advanceWithinWord = useCallback(
    (reverse = false) => {
      const clue = activeClue;
      if (!clue) return;
      const index = clue.cells.findIndex(
        (c) => c.row === selected.row && c.col === selected.col,
      );
      if (index === -1) return;
      const nextIndex = reverse ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= clue.cells.length) return;
      const next = clue.cells[nextIndex];
      setSelected({ row: next.row, col: next.col });
      setHintClueKey(null);
    },
    [activeClue, selected],
  );

  const toggleDirection = useCallback(() => {
    const cell = grid[selected.row][selected.col];
    if (cell.acrossWord && cell.downWord) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'));
    }
  }, [grid, selected]);

  const setLetter = useCallback(
    (row: number, col: number, value: string) => {
      setLetters((prev) => {
        const next = prev.map((r) => r.slice());
        next[row][col] = value;
        return next;
      });
      setStatuses((prev) => {
        const next = prev.map((r) => r.slice());
        next[row][col] = null;
        return next;
      });
    },
    [],
  );

  const typeLetter = useCallback(
    (letter: string) => {
      const cell = grid[selected.row][selected.col];
      if (cell.isBlack) return;
      setLetter(selected.row, selected.col, letter.toUpperCase());
      advanceWithinWord(false);
    },
    [grid, selected, setLetter, advanceWithinWord],
  );

  const backspace = useCallback(() => {
    const cell = grid[selected.row][selected.col];
    if (cell.isBlack) return;
    if (letters[selected.row][selected.col]) {
      setLetter(selected.row, selected.col, '');
    } else {
      advanceWithinWord(true);
    }
  }, [grid, selected, letters, setLetter, advanceWithinWord]);

  const checkWord = useCallback(() => {
    const clue = activeClue;
    if (!clue) return;
    setStatuses((prev) => {
      const next = prev.map((r) => r.slice());
      clue.cells.forEach(({ row, col }, i) => {
        const expected = clue.answer[i];
        const actual = letters[row][col];
        if (!actual) return;
        next[row][col] = actual === expected ? 'correct' : 'incorrect';
      });
      return next;
    });
  }, [activeClue, letters]);

  const revealLetter = useCallback(() => {
    const cell = grid[selected.row][selected.col];
    if (cell.isBlack) return;
    setLetter(selected.row, selected.col, cell.solution);
    setStatuses((prev) => {
      const next = prev.map((r) => r.slice());
      next[selected.row][selected.col] = 'revealed';
      return next;
    });
  }, [grid, selected, setLetter]);

  const showHint = useCallback(() => {
    const clue = activeClue;
    if (!clue) return;
    setHintClueKey(`${clue.direction}-${clue.number}`);
    setHintsUsedCount((n) => n + 1);
  }, [activeClue]);

  const selectClue = useCallback((clue: ClueInfo) => {
    setSelected({ row: clue.row, col: clue.col });
    setDirection(clue.direction);
    setHintClueKey(null);
  }, []);

  return {
    model,
    across,
    down,
    letters,
    statuses,
    selected,
    direction: effectiveDirection,
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
  };
}
