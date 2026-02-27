import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const chartData = [
  { category: 'Social Media', hours: 3.5, color: '#ec4899' },
  { category: 'Work Apps',    hours: 4.2, color: '#2a5298' },
  { category: 'Entertainment',hours: 2.8, color: '#8b5cf6' },
  { category: 'News',         hours: 1.5, color: '#10b981' },
  { category: 'Health Apps',  hours: 0.8, color: '#14b8a6' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-navy-deep text-white rounded-lg px-4 py-3 shadow-xl text-sm">
      <p className="font-semibold mb-1">{label}</p>
      <p className="text-xs text-blue-200">
        Usage: <span className="font-bold text-white">{payload[0].value} hrs/day</span>
      </p>
    </div>
  );
}

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

function CustomLabel({ x = 0, y = 0, width = 0, value }: CustomLabelProps) {
  return (
    <text
      x={x + width / 2}
      y={y - 4}
      fill="#6b7280"
      textAnchor="middle"
      fontSize={11}
      fontWeight={600}
    >
      {value}h
    </text>
  );
}

export default function AppUsageChart() {
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">Daily App Usage Breakdown</h3>
        <p className="text-xs text-gray-400 mt-0.5">Average hours per category</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 6]}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}h`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="hours" radius={[6, 6, 0, 0]} label={<CustomLabel />}>
            {chartData.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
