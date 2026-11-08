import { STORY } from '../data/story';

interface HomePageProps {
  onGames: () => void;
  onProgress: () => void;
}

const TOP_STORY = {
  label: 'Top Story',
  headline: STORY.headline,
  dek: 'Based on reporting by Tim Balk, Michael Levenson and Emily Davies.',
  href: STORY.articleUrl,
};

const OTHER_SECTIONS = [
  {
    label: 'Midterms',
    headline: 'What the 2026 election results mean going forward',
    dek: 'Coverage of the midterms continues across Washington this week.',
  },
  {
    label: 'Analysis',
    headline: 'How both parties are reading the midterm results',
    dek: 'This space stands in for additional midterm coverage on the homepage.',
  },
];

export function HomePage({ onGames, onProgress }: HomePageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-3 py-4 sm:px-6">
      <header className="flex items-center justify-between border-b border-navy/10 pb-4">
        <h1 className="font-masthead text-3xl font-medium text-navy sm:text-4xl">
          The New York Times
        </h1>
        <nav className="flex gap-2">
          <button
            type="button"
            onClick={onProgress}
            className="rounded-md border border-navy/15 bg-white px-4 py-2 font-ui text-sm font-medium text-navy shadow-sm hover:bg-pale"
          >
            Progress
          </button>
          <button
            type="button"
            onClick={onGames}
            className="rounded-md bg-accent px-4 py-2 font-ui text-sm font-medium text-white shadow-sm hover:bg-accent/90"
          >
            Games
          </button>
        </nav>
      </header>

      <div className="flex flex-col gap-6">
        <article className="border-b border-navy/10 pb-6">
          <p className="font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
            {TOP_STORY.label}
          </p>
          <a
            href={TOP_STORY.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-masthead text-xl font-medium text-navy hover:underline sm:text-2xl"
          >
            {TOP_STORY.headline}
          </a>
          <p className="mt-2 font-ui text-sm text-navy/60">{TOP_STORY.dek}</p>
        </article>

        {OTHER_SECTIONS.map((section) => (
          <article key={section.label} className="border-b border-navy/10 pb-6 last:border-0">
            <p className="font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
              {section.label}
            </p>
            <h2 className="mt-1 font-masthead text-xl font-medium text-navy sm:text-2xl">
              {section.headline}
            </h2>
            <p className="mt-2 font-ui text-sm text-navy/60">{section.dek}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
