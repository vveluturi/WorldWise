import { PUZZLE } from './puzzle';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface WordInStory {
  term: string;
  definition: string;
  contextLabel: 'In this story' | 'Why it matters next';
  context: string;
}

export interface PerspectiveEntry {
  label: string;
  text: string;
}

// Text below (quickSummary, deeperExplanation, wordsInStory, perspectives) is
// drawn only from the source article. **word** marks crossword answers so
// they can be rendered in bold. Don't add facts or quotes beyond that article.
export const STORY = {
  puzzleId: PUZZLE.id,
  headline: 'After the midterms, Republicans debate what went wrong',
  sourceLine:
    'Based on reporting by Tim Balk, Michael Levenson and Emily Davies, The New York Times, Nov. 4, 2026',
  articleUrl: 'https://www.nytimes.com/2026/11/04/us/politics/trump-republicans-blame-midterms.html',
  topNote:
    'This story focuses on Republican reactions to the results. WorldWise pairs it with coverage of other perspectives.',

  quickSummary:
    "In the 2026 **midterm** elections, held halfway through President Trump's term, Republicans " +
    'lost control of both the House and the **Senate**. Losing the **majority** in each chamber ' +
    'means Democrats will now decide which bills get votes, and Republican Mike Johnson will give ' +
    'up his role as **Speaker** of the House. President Trump said Republicans struggled because he ' +
    'was not on the **ballot** himself. Many Republicans disagreed, pointing instead to his tariff ' +
    'policies, rising prices tied to the war in Iran, and candidates he endorsed. Some **incumbent** ' +
    'Republican senators, like Jon Husted of Ohio, lost their seats, and Democrats won even in ' +
    'reliably Republican states. Party leaders such as Senate Majority Leader John Thune and Speaker ' +
    'Johnson defended the president, while others urged the party to move on from him.',

  deeperExplanation: [
    'Before the election, Republicans held a **trifecta**: the White House, the House, and the ' +
      '**Senate**. That gave them the power to pass their agenda with few obstacles. **Midterms** ' +
      "often go badly for the president's party, but Republicans quoted by The Times described this " +
      'as their worst **midterm** showing in decades, with losses in states they had won for years.',
    'The bigger story is the debate inside the Republican Party over who is responsible. Trump ' +
      'argued voters stayed home without him on the ticket. Vice President JD Vance blamed the war ' +
      'in Iran, and Representative Don Bacon of Nebraska, who represents a **swing** district, said ' +
      "the president's unpopularity and weak candidates were the main causes. One Republican " +
      'consultant in Colorado, Dick Wadhams, summed up his view: "This was an anti-Trump vote." The ' +
      'answer matters because it will shape how much influence Trump has over his party in his final ' +
      'two years in office.',
  ],

  perspectives: [
    {
      label: 'Trump and his defenders',
      text:
        'The president said turnout fell without him on the **ballot**, and **Speaker** Johnson ' +
        'defended him, saying Democrats were driven by opposition to Trump.',
    },
    {
      label: 'Republican critics',
      text:
        'Strategists and lawmakers said voters were reacting to tariffs, higher prices from the war ' +
        'in Iran, and weak candidates the president backed.',
    },
  ] satisfies PerspectiveEntry[],

  wordsInStory: [
    {
      term: 'MIDTERM',
      definition: "An election held halfway through a president's four-year term.",
      contextLabel: 'In this story',
      context:
        "Voters chose all House seats and many **Senate** seats two years into Trump's second term.",
    },
    {
      term: 'MAJORITY',
      definition: 'Having more than half the seats, which lets a party control what a chamber votes on.',
      contextLabel: 'In this story',
      context:
        'Republicans lost their **majority** in both the House and **Senate**, so Democrats will ' +
        'set the agenda.',
    },
    {
      term: 'SPEAKER',
      definition: 'The leader of the House, chosen by the **majority** party.',
      contextLabel: 'In this story',
      context: 'Mike Johnson will lose the job because his party no longer holds the House.',
    },
    {
      term: 'SENATE',
      definition: 'The chamber of Congress with 100 members, two per state.',
      contextLabel: 'In this story',
      context: 'Republicans lost **Senate** races even in states like Texas and South Carolina.',
    },
    {
      term: 'BALLOT',
      definition: 'The list of candidates and choices voters see.',
      contextLabel: 'In this story',
      context: "Trump said his party lost because his name wasn't on it.",
    },
    {
      term: 'INCUMBENT',
      definition: 'The person who currently holds an office.',
      contextLabel: 'In this story',
      context: 'Sitting Republican senators, including Jon Husted of Ohio, lost to challengers.',
    },
    {
      term: 'SWING',
      definition: 'A district or state that could go to either party.',
      contextLabel: 'In this story',
      context:
        "Don Bacon represents a **swing** district in Nebraska, and his would-be Republican " +
        'successor lost there.',
    },
    {
      term: 'TRIFECTA',
      definition: 'When one party controls the White House, House, and **Senate** at once.',
      contextLabel: 'In this story',
      context: 'Republicans had a **trifecta** before the election and lost it.',
    },
    {
      term: 'SUBPOENA',
      definition: 'A legal order requiring someone to testify or hand over documents.',
      contextLabel: 'Why it matters next',
      context:
        'A House **majority** can issue **subpoenas**, so Democrats will gain the power to ' +
        'investigate the administration.',
    },
    {
      term: 'FILIBUSTER',
      definition: 'A **Senate** tactic to delay or block a vote, usually requiring 60 votes to end.',
      contextLabel: 'Why it matters next',
      context:
        'Even with a **Senate** **majority**, a party often needs 60 votes to pass major bills.',
    },
  ] satisfies WordInStory[],

  glossary: PUZZLE.words.map((w): GlossaryEntry => ({ term: w.answer, definition: w.explanation })),

  outsideTopicCard: {
    title: 'Outside your usual topics',
    blurb: "Based on what you picked, we'll surface a puzzle from a different beat soon.",
  },
};
