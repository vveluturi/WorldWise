export type Direction = 'across' | 'down';

export interface WordEntry {
  answer: string;
  row: number;
  col: number;
  direction: Direction;
  clueEasy: string;
  clueHard: string;
  explanation: string;
}

export interface Puzzle {
  id: string;
  topic: string;
  estimatedMinutes: string;
  grid: string[];
  words: WordEntry[];
}

// 12x12 grid, 0-indexed. "." = black square.
const GRID = [
  '....F..SWING',
  '....I....N..',
  'M.BALLOT.C..',
  'A...I....U.S',
  'J...B....M.E',
  'O...U..S.B.N',
  'R...SUBPOENA',
  'I...T..E.N.T',
  'TRIFECTA.T.E',
  'Y...R..K....',
  '.......E....',
  '..MIDTERM...',
];

export const PUZZLE: Puzzle = {
  id: '2026-midterms-dems-win-congress',
  topic: '2026 Midterms: Republicans debate what went wrong',
  estimatedMinutes: '8-10 min',
  grid: GRID,
  words: [
    {
      answer: 'FILIBUSTER',
      row: 0,
      col: 4,
      direction: 'down',
      clueEasy: 'Senate tactic used to delay a vote by talking for a long time',
      clueHard: 'Procedural delay often broken only by a 60-vote threshold',
      explanation:
        'A rule that lets senators stall a bill by extending debate, usually overcome only with 60 votes.',
    },
    {
      answer: 'SWING',
      row: 0,
      col: 7,
      direction: 'across',
      clueEasy: 'Type of district or state that could vote either way',
      clueHard: '___ seat: a race without a clear favorite',
      explanation:
        'A "swing" district or state isn\'t reliably loyal to one party, so campaigns fight hardest to win it.',
    },
    {
      answer: 'INCUMBENT',
      row: 0,
      col: 9,
      direction: 'down',
      clueEasy: 'Current officeholder running for reelection',
      clueHard: 'The seat-holder a challenger tries to unseat',
      explanation:
        'An incumbent already holds the office and is running again, usually with a name-recognition advantage.',
    },
    {
      answer: 'MAJORITY',
      row: 2,
      col: 0,
      direction: 'down',
      clueEasy: 'Having more than half the seats in a chamber',
      clueHard: 'What a party needs to control a chamber\'s agenda',
      explanation:
        'The majority party holds more than half the seats, letting it set the chamber\'s agenda and leadership.',
    },
    {
      answer: 'BALLOT',
      row: 2,
      col: 2,
      direction: 'across',
      clueEasy: 'What you mark to cast your vote',
      clueHard: 'Document listing candidates and measures for voters to choose from',
      explanation:
        'A ballot lists the candidates and questions voters choose among when they vote.',
    },
    {
      answer: 'SENATE',
      row: 3,
      col: 11,
      direction: 'down',
      clueEasy: 'Chamber of Congress with two members per state',
      clueHard: 'Upper chamber of Congress',
      explanation:
        'The Senate is Congress\'s upper chamber, where every state elects exactly two members.',
    },
    {
      answer: 'SPEAKER',
      row: 5,
      col: 7,
      direction: 'down',
      clueEasy: 'Leader of the House of Representatives',
      clueHard: 'Presiding officer chosen by the House\'s majority party',
      explanation:
        'The Speaker leads the House of Representatives and is chosen by whichever party holds the majority there.',
    },
    {
      answer: 'SUBPOENA',
      row: 6,
      col: 4,
      direction: 'across',
      clueEasy: 'Legal order requiring someone to testify or hand over documents',
      clueHard: 'Formal demand issued during a congressional investigation',
      explanation:
        'A subpoena is a legal order that compels a person to testify or produce documents, often used in investigations.',
    },
    {
      answer: 'TRIFECTA',
      row: 8,
      col: 0,
      direction: 'across',
      clueEasy: 'Controlling the House, Senate, and presidency all at once',
      clueHard: 'Term for one party holding both legislative chambers and the executive',
      explanation:
        'A trifecta is when one party simultaneously controls both chambers of the legislature and the executive branch.',
    },
    {
      answer: 'MIDTERM',
      row: 11,
      col: 2,
      direction: 'across',
      clueEasy: 'Election held two years into a president\'s term',
      clueHard: 'Nationwide vote that doesn\'t involve the presidency itself',
      explanation:
        'A midterm election happens halfway through a president\'s four-year term and often serves as a referendum on their party.',
    },
  ],
};
