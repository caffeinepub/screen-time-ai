import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  borderColor: string;
  trend: 'up' | 'down';
  trendLabel?: string;
  icon: React.ReactNode;
  description?: string;
}

export default function MetricCard({
  title,
  value,
  unit = '%',
  borderColor,
  trend,
  trendLabel,
  icon,
  description,
}: MetricCardProps) {
  const isRisk = trend === 'up';

  return (
    <div
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-5 border-l-4 flex flex-col gap-3"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${borderColor}18` }}
          >
            <span style={{ color: borderColor }}>{icon}</span>
          </div>
          <span className="text-sm font-medium text-gray-500 leading-tight">{title}</span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isRisk
              ? 'bg-red-50 text-red-500'
              : 'bg-green-50 text-green-600'
          }`}
        >
          {isRisk ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendLabel || (isRisk ? 'High' : 'Low')}
        </div>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold text-gray-800 leading-none">{value}</span>
        <span className="text-lg font-semibold text-gray-400 mb-0.5">{unit}</span>
      </div>

      {description && <p className="text-xs text-gray-400 leading-relaxed">{description}</p>}

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.min(value, 100)}%`,
            backgroundColor: borderColor,
          }}
        />
      </div>
    </div>
  );
}
