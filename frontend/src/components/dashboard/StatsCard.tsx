import React from 'react';
import { Icon } from '../icons';
type AccentColor = 'emerald' | 'blue' | 'amber' | 'rose' | 'purple' | 'teal' | 'orange';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color?: AccentColor;
  trend?: { value: number; positiveIsGood?: boolean };
  subtitle?: string;
}

const COLOR_MAP: Record<AccentColor, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/20' },
  purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  border: 'border-purple-500/20' },
  teal:    { bg: 'bg-teal-500/10',    text: 'text-teal-400',    border: 'border-teal-500/20' },
  orange:  { bg: 'bg-orange-500/10',  text: 'text-orange-400',  border: 'border-orange-500/20' },
};

export function StatsCard({
  label,
  value,
  unit,
  icon,
  color = 'emerald',
  trend,
  subtitle,
}: StatsCardProps) {
  const { bg, text, border } = COLOR_MAP[color];

  const trendElement = trend != null && trend.value !== 0 ? (() => {
    const isPositive = trend.positiveIsGood !== false ? trend.value > 0 : trend.value < 0;
    const trendIconName = trend.value > 0 ? 'trending-up' as const : 'trending-down' as const;
    return (
      <div
        className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
        }`}
      >
        <Icon name={trendIconName} className="w-3 h-3" />
        {Math.abs(trend.value).toFixed(1)}
      </div>
    );
  })() : null;

  return (
    <div className="card p-5 card-hover group">
      <div className="flex items-start justify-between mb-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bg} ${border} ${text} group-hover:scale-105 transition-transform duration-200`}
        >
          {icon}
        </div>
        {trendElement ?? <Icon name="minus" className="w-3 h-3 text-slate-600" />}
      </div>
      <p className="stat-label mb-1">{label}</p>
      <div className="flex items-end gap-1.5">
        <span className="stat-value">{value}</span>
        {unit && <span className="text-slate-400 text-sm mb-1 font-medium">{unit}</span>}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1.5">{subtitle}</p>}
    </div>
  );
}
