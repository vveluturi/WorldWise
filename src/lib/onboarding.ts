export type Familiarity = 'new' | 'some' | 'very';
export type TimePerDay = 5 | 10;

export interface OnboardingData {
  interests: string[];
  familiarity: Familiarity;
  timePerDay: TimePerDay;
}

export const INTEREST_OPTIONS = [
  'Politics',
  'Business & Economy',
  'Technology',
  'Science & Climate',
  'Health',
  'World News',
  'Sports',
  'Culture & Arts',
];

const STORAGE_KEY = 'worldwise-onboarding-v1';

export function loadOnboarding(): OnboardingData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return null;
  }
}

export function saveOnboarding(data: OnboardingData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
