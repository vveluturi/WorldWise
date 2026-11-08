interface IconProps {
  className?: string;
}

// Simple, original line-icon shapes — not NYT's real game marks.

export function HexagonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 3 L28 10 V22 L16 29 L4 22 V10 Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2.25" />
      <path d="M4 12.5H28M4 20.5H28M12.5 4V28M20.5 4V28" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function DotsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="currentColor" />
      <circle cx="22" cy="10" r="4" fill="currentColor" />
      <circle cx="10" cy="22" r="4" fill="currentColor" />
      <circle cx="22" cy="22" r="4" fill="currentColor" />
    </svg>
  );
}

export function MiniGridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2.25" />
      <path d="M16 6V26" stroke="currentColor" strokeWidth="2" />
      <path d="M6 16H26" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
