const MARKERS = [
  {
    value: "8+",
    label: "Core Service Areas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="7" height="7" rx="1" /><rect x="11" y="3" width="7" height="7" rx="1" /><rect x="2" y="12" width="7" height="7" rx="1" /><rect x="11" y="12" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    value: "Veteran",
    label: "Owned & Operated",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2L2 6v5c0 4.5 3.5 7.5 8 9 4.5-1.5 8-4.5 8-9V6L10 2z" /><path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    value: "Gov",
    label: "Contracting Ready",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 18h16M2 10h16M5 10V7M10 10V7M15 10V7M1 7h18M10 2L1 7" />
      </svg>
    ),
  },
  {
    value: "Faith",
    label: "Driven Excellence",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M10 3v14M4 9l6-6 6 6" />
      </svg>
    ),
  },
];

export function CredibilityBar() {
  return (
    <div className="border-b border-black/10 bg-white dark:border-white/10">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-x divide-black/10 lg:grid-cols-4 dark:divide-white/10">
          {MARKERS.map((marker) => (
            <div key={marker.label} className="flex items-center gap-3.5 px-6 py-6 first:pl-0 last:pr-0">
              <div className="shrink-0 text-[#1E3A5F]">{marker.icon}</div>
              <div>
                <dt className="font-display text-lg font-bold tracking-tight text-[#0D1B2A]">
                  {marker.value}
                </dt>
                <dd className="text-xs text-neutral-500">{marker.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
