import { useState } from 'react';
import {
  INTEREST_OPTIONS,
  saveOnboarding,
  type Familiarity,
  type OnboardingData,
  type TimePerDay,
} from '../lib/onboarding';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const STEP_COUNT = 3;

const FAMILIARITY_OPTIONS: { value: Familiarity; label: string; blurb: string }[] = [
  { value: 'new', label: 'New', blurb: "I'm new to crosswords." },
  { value: 'some', label: 'Some', blurb: "I've solved a few before." },
  { value: 'very', label: 'Very', blurb: 'I solve crosswords regularly.' },
];

const TIME_OPTIONS: TimePerDay[] = [5, 10];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: STEP_COUNT }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-pale-2'}`}
        />
      ))}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border-2 px-4 py-3 text-left font-ui transition ${
        selected ? 'border-accent bg-pale' : 'border-navy/15 bg-white hover:border-navy/30'
      }`}
    >
      <span className="block text-sm font-semibold text-navy">{title}</span>
      {subtitle && <span className="mt-0.5 block text-xs text-navy/60">{subtitle}</span>}
    </button>
  );
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [familiarity, setFamiliarity] = useState<Familiarity | null>(null);
  const [timePerDay, setTimePerDay] = useState<TimePerDay | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const canAdvance =
    step === 0 ? interests.length >= 2 : step === 1 ? familiarity !== null : timePerDay !== null;

  const handleNext = () => {
    if (!canAdvance) return;
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1);
      return;
    }
    if (!familiarity || !timePerDay) return;
    const data: OnboardingData = { interests, familiarity, timePerDay };
    saveOnboarding(data);
    onComplete(data);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-3 py-6 sm:px-6">
      <ProgressBar step={step} />

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-masthead text-2xl font-medium text-navy">
              What are you interested in?
            </h1>
            <p className="mt-1 font-ui text-sm text-navy/60">Pick at least 2 topics.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-full border-2 px-4 py-2 font-ui text-sm font-medium transition ${
                    selected
                      ? 'border-accent bg-pale text-navy'
                      : 'border-navy/15 bg-white text-navy/70 hover:border-navy/30'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-masthead text-2xl font-medium text-navy">
              How familiar are you with crosswords?
            </h1>
            <p className="mt-1 font-ui text-sm text-navy/60">
              New solvers get easier clues to start.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {FAMILIARITY_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={familiarity === opt.value}
                onClick={() => setFamiliarity(opt.value)}
                title={opt.label}
                subtitle={opt.blurb}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-masthead text-2xl font-medium text-navy">
              How much time do you have today?
            </h1>
            <p className="mt-1 font-ui text-sm text-navy/60">
              We'll use this to set your pace, not a hard limit.
            </p>
          </div>
          <div className="flex gap-2">
            {TIME_OPTIONS.map((minutes) => (
              <OptionCard
                key={minutes}
                selected={timePerDay === minutes}
                onClick={() => setTimePerDay(minutes)}
                title={`${minutes} min`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="font-ui text-sm font-medium text-navy/60 disabled:opacity-0"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className="rounded-md bg-accent px-5 py-2 font-ui text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {step === STEP_COUNT - 1 ? 'Start puzzle' : 'Next'}
        </button>
      </div>
    </div>
  );
}
