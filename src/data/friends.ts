// Sample/demo data only — not real users.
export interface SampleFriend {
  name: string;
  streak: number;
  conceptsThisWeek: number;
}

export const SAMPLE_FRIENDS: SampleFriend[] = [
  { name: 'Maya', streak: 6, conceptsThisWeek: 18 },
  { name: 'Jordan', streak: 4, conceptsThisWeek: 15 },
  { name: 'Priya', streak: 3, conceptsThisWeek: 12 },
  { name: 'Sam', streak: 2, conceptsThisWeek: 8 },
  { name: 'Alex', streak: 1, conceptsThisWeek: 5 },
];
