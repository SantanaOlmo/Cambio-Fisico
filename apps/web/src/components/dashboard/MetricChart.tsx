import {
  ResponsiveContainer,
  LineChart,
  AreaChart,
  BarChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Entry } from '../../types/entry';

interface MetricChartProps {
  entries: Entry[];
  metric: keyof Entry;
  label: string;
  color?: string;
  unit?: string;
  type?: 'line' | 'area' | 'bar';
}

interface ChartPoint {
  date: string;
  value: number;
}

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '10px',
  color: '#f1f5f9',
  fontSize: '12px',
};

export function MetricChart({
  entries,
  metric,
  label,
  color = '#10b981',
  unit = '',
  type = 'line',
}: MetricChartProps) {
  const data: ChartPoint[] = [...entries]
    .filter((e) => e[metric] != null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({
      date: e.date.slice(5), // MM-DD
      value: e[metric] as number,
    }));

  if (data.length === 0) {
    return (
      <div className="card p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          {label}
        </p>
        <div className="h-36 flex items-center justify-center">
          <p className="text-sm text-slate-600">Sin datos aún</p>
        </div>
      </div>
    );
  }

  const tickProps = { fill: '#475569', fontSize: 10 };
  const gridProps = { stroke: '#1e293b', strokeDasharray: '4 4' };

  const commonProps = {
    data,
    margin: { top: 4, right: 4, left: -20, bottom: 0 },
  };

  const renderContent = () => {
    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="date" tick={tickProps} />
          <YAxis tick={tickProps} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}${unit}`, label]} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#grad-${metric})`}
            strokeWidth={2}
            dot={{ fill: color, r: 2.5 }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      );
    }

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="date" tick={tickProps} />
          <YAxis tick={tickProps} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}${unit}`, label]} />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} opacity={0.85} />
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="date" tick={tickProps} />
        <YAxis tick={tickProps} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}${unit}`, label]} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 2.5 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    );
  };

  return (
    <div className="card p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        {label}
      </p>
      <ResponsiveContainer width="100%" height={160}>{renderContent()}</ResponsiveContainer>
    </div>
  );
}
