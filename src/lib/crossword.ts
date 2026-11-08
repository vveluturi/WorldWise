import { PUZZLE, type Direction, type WordEntry } from '../data/puzzle';

export type { Direction };

export interface CellInfo {
  row: number;
  col: number;
  isBlack: boolean;
  solution: string;
  number: number | null;
  acrossWord: ClueInfo | null;
  downWord: ClueInfo | null;
}

export interface ClueInfo {
  number: number;
  direction: Direction;
  row: number;
  col: number;
  length: number;
  answer: string;
  clueEasy: string;
  clueHard: string;
  explanation: string;
  cells: Array<{ row: number; col: number }>;
}

export interface CrosswordModel {
  width: number;
  height: number;
  grid: CellInfo[][];
  across: ClueInfo[];
  down: ClueInfo[];
}

function findWord(words: WordEntry[], row: number, col: number, direction: Direction): WordEntry {
  const word = words.find((w) => w.row === row && w.col === col && w.direction === direction);
  if (!word) {
    throw new Error(`No word entry found for ${direction} at (${row}, ${col})`);
  }
  return word;
}

export function buildCrossword(): CrosswordModel {
  const rows = PUZZLE.grid;
  const height = rows.length;
  const width = rows[0].length;

  const isBlack = (r: number, c: number) =>
    r < 0 || r >= height || c < 0 || c >= width || rows[r][c] === '.';

  const grid: CellInfo[][] = [];
  for (let r = 0; r < height; r++) {
    const rowCells: CellInfo[] = [];
    for (let c = 0; c < width; c++) {
      rowCells.push({
        row: r,
        col: c,
        isBlack: isBlack(r, c),
        solution: isBlack(r, c) ? '' : rows[r][c],
        number: null,
        acrossWord: null,
        downWord: null,
      });
    }
    grid.push(rowCells);
  }

  const across: ClueInfo[] = [];
  const down: ClueInfo[] = [];
  let nextNumber = 1;

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (isBlack(r, c)) continue;

      const startsAcross = isBlack(r, c - 1) && !isBlack(r, c + 1);
      const startsDown = isBlack(r - 1, c) && !isBlack(r + 1, c);

      if (!startsAcross && !startsDown) continue;

      const number = nextNumber++;
      grid[r][c].number = number;

      if (startsAcross) {
        const entry = findWord(PUZZLE.words, r, c, 'across');
        const cells = Array.from({ length: entry.answer.length }, (_, i) => ({ row: r, col: c + i }));
        const clue: ClueInfo = {
          number,
          direction: 'across',
          row: r,
          col: c,
          length: entry.answer.length,
          answer: entry.answer,
          clueEasy: entry.clueEasy,
          clueHard: entry.clueHard,
          explanation: entry.explanation,
          cells,
        };
        across.push(clue);
        cells.forEach(({ row, col }) => {
          grid[row][col].acrossWord = clue;
        });
      }

      if (startsDown) {
        const entry = findWord(PUZZLE.words, r, c, 'down');
        const cells = Array.from({ length: entry.answer.length }, (_, i) => ({ row: r + i, col: c }));
        const clue: ClueInfo = {
          number,
          direction: 'down',
          row: r,
          col: c,
          length: entry.answer.length,
          answer: entry.answer,
          clueEasy: entry.clueEasy,
          clueHard: entry.clueHard,
          explanation: entry.explanation,
          cells,
        };
        down.push(clue);
        cells.forEach(({ row, col }) => {
          grid[row][col].downWord = clue;
        });
      }
    }
  }

  return { width, height, grid, across, down };
}
