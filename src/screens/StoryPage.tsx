import { useMemo, useState } from 'react';
import { STORY } from '../data/story';
import { INTEREST_OPTIONS, loadOnboarding } from '../lib/onboarding';

interface StoryPageProps {
  onBackToPuzzle: () => void;
}

type Tab = 'words' | 'summary' | 'deeper' | 'glossary';

const TABS: { id: Tab; label: string }[] = [
  { id: 'words', label: 'Words in this story' },
  { id: 'summary', label: 'Quick summary' },
  { id: 'deeper', label: 'Deeper explanation' },
  { id: 'glossary', label: 'Glossary' },
];

function BoldedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-navy">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function StoryPage({ onBackToPuzzle }: StoryPageProps) {
  const [tab, setTab] = useState<Tab>('words');

  const outsideTopic = useMemo(() => {
    const interests = loadOnboarding()?.interests ?? [];
    return INTEREST_OPTIONS.find((topic) => !interests.includes(topic)) ?? INTEREST_OPTIONS[0];
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-3 py-6 sm:px-6">
      <button
        type="button"
        onClick={onBackToPuzzle}
        className="w-fit font-ui text-sm font-medium text-accent hover:underline"
      >
        &larr; Back to puzzle
      </button>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="font-ui text-sm text-amber-900">{STORY.topNote}</p>
      </div>

      <div>
        <h1 className="font-masthead text-3xl font-medium text-navy sm:text-4xl">
          {STORY.headline}
        </h1>
        <p className="mt-1 font-ui text-xs text-navy/50">{STORY.sourceLine}</p>
        <a
          href={STORY.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-md bg-accent px-4 py-2 font-ui text-sm font-medium text-white shadow-sm hover:bg-accent/90"
        >
          Read the full article on nytimes.com
        </a>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-navy/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-2 font-ui text-sm font-medium ${
              tab === t.id
                ? 'border-accent text-navy'
                : 'border-transparent text-navy/50 hover:text-navy/80'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'words' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STORY.wordsInStory.map((word) => (
            <div key={word.term} className="rounded-lg border border-navy/10 bg-white p-3">
              <p className="font-ui text-sm font-semibold uppercase tracking-wide text-navy">
                {word.term}
              </p>
              <p className="mt-1 font-ui text-sm text-navy/70">
                <BoldedText text={word.definition} />
              </p>
              <p className="mt-2 font-ui text-xs font-semibold uppercase tracking-wide text-accent">
                {word.contextLabel}
              </p>
              <p className="font-ui text-sm text-navy/70">
                <BoldedText text={word.context} />
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === 'summary' && (
        <p className="font-ui text-base leading-relaxed text-navy/80">
          <BoldedText text={STORY.quickSummary} />
        </p>
      )}

      {tab === 'deeper' && (
        <div className="flex flex-col gap-4">
          {STORY.deeperExplanation.map((paragraph, i) => (
            <p key={i} className="font-ui text-base leading-relaxed text-navy/80">
              <BoldedText text={paragraph} />
            </p>
          ))}
          <div className="flex flex-col gap-3 border-t border-navy/10 pt-4">
            <h2 className="font-ui text-sm font-semibold uppercase tracking-wide text-navy/60">
              Inside the Republican Party
            </h2>
            {STORY.perspectives.map((p) => (
              <div key={p.label}>
                <p className="font-ui text-sm font-semibold text-navy">{p.label}</p>
                <p className="font-ui text-sm text-navy/70">
                  <BoldedText text={p.text} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'glossary' && (
        <dl className="flex flex-col gap-3">
          {STORY.glossary.map((entry) => (
            <div key={entry.term}>
              <dt className="font-ui text-sm font-semibold text-navy">{entry.term}</dt>
              <dd className="font-ui text-sm text-navy/70">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="relative mt-2 overflow-hidden rounded-lg border border-navy/10 bg-pale p-4">
        <p className="font-ui text-xs font-semibold uppercase tracking-wide text-navy/50">
          {STORY.outsideTopicCard.title}
        </p>
        <p className="mt-1 font-ui text-sm text-navy/70">
          {STORY.outsideTopicCard.blurb} Next up: <strong>{outsideTopic}</strong>.
        </p>
      </div>
    </div>
  );
}
