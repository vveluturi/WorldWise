export interface ConnectionGroup {
  title: string;
  words: string[];
  sentence: string;
}

// Groups every answer in the puzzle by idea, tied to the story in data/story.ts.
// Each word from data/puzzle.ts appears in exactly one group.
export const CONNECTIONS: ConnectionGroup[] = [
  {
    title: 'Who controls Congress',
    words: ['MAJORITY', 'SPEAKER', 'SENATE', 'TRIFECTA'],
    sentence:
      "Republicans lost their majority in the Senate, the Speaker's gavel, and the trifecta they had going into the election.",
  },
  {
    title: 'How elections work',
    words: ['MIDTERM', 'BALLOT', 'INCUMBENT', 'SWING'],
    sentence:
      'In this midterm, incumbents lost and swing districts flipped, with Trump blaming his absence from the ballot.',
  },
  {
    title: 'What the new majority can do',
    words: ['SUBPOENA', 'FILIBUSTER'],
    sentence:
      'A House majority can issue subpoenas to investigate, but a Senate majority still needs 60 votes to overcome a filibuster.',
  },
];
