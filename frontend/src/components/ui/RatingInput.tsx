interface RatingInputProps {
  value: number | null;
  onChange: (value: number) => void;
  labels?: readonly string[];
  id?: string;
}

export function RatingInput({ value, onChange, labels, id }: RatingInputProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          id={id ? `${id}-${n}` : undefined}
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
            value === n
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
              : 'bg-slate-700/80 text-slate-400 hover:bg-slate-600 hover:text-slate-200 border border-slate-600/40'
          }`}
          aria-label={labels ? `${labels[n - 1]} (${n}/5)` : `${n} de 5`}
          aria-pressed={value === n}
        >
          {n}
        </button>
      ))}
      {labels && value != null && (
        <span className="text-xs text-slate-500 ml-1">{labels[value - 1]}</span>
      )}
    </div>
  );
}
