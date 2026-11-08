import { useEffect, useState } from 'react';

interface WorldWiseMarkProps {
  size?: 'hero' | 'card';
}

const TOP_ROW = ['W', 'O', 'R', 'L', 'D'];
const BOTTOM_ROW = ['W', 'I', 'S', 'E'];

// Looks for public/worldwise-icon.png; falls back to a letter-tile wordmark.
// The full WORLD / WISE grid is reserved for the large hero tile — a small
// "card" icon box uses a compact single-W monogram instead so it doesn't
// overflow.
export function WorldWiseMark({ size = 'card' }: WorldWiseMarkProps) {
  const [iconAvailable, setIconAvailable] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIconAvailable(true);
    img.onerror = () => setIconAvailable(false);
    img.src = '/worldwise-icon.png';
  }, []);

  if (iconAvailable) {
    return (
      <img
        src="/worldwise-icon.png"
        alt="WorldWise"
        className={`h-full w-full object-contain ${size === 'hero' ? 'p-4' : 'p-2'}`}
      />
    );
  }

  if (size === 'card') {
    return (
      <span className="font-masthead text-2xl font-bold text-white" aria-label="WorldWise">
        W
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex gap-1.5">
        {TOP_ROW.map((letter, i) => (
          <span
            key={i}
            className={`flex h-7 w-7 items-center justify-center rounded-md font-ui text-sm font-bold sm:h-8 sm:w-8 sm:text-base ${
              i === 0 ? 'bg-accent text-white ring-2 ring-white' : 'bg-pale text-navy'
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        {BOTTOM_ROW.map((letter, i) => (
          <span
            key={i}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-pale font-ui text-sm font-bold text-navy sm:h-8 sm:w-8 sm:text-base"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
