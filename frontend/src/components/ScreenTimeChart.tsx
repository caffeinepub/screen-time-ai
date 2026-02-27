import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { day: 'Mon', screenTime: 6.5, burnoutRisk: 42 },
  { day: 'Tue', screenTime: 8.2, burnoutRisk: 55 },
  { day: 'Wed', screenTime: 7.8, burnoutRisk: 51 },
  { day: 'Thu', screenTime: 9.1, burnoutRisk: 63 },
  { day: 'Fri', screenTime: 10.3, burnoutRisk: 72 },
  { day: 'Sat', screenTime: 7.4, burnoutRisk: 58 },
  { day: 'Sun', screenTime: 6.8, burnoutRisk: 45 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-navy-deep text-white rounded-lg px-4 py-3 shadow-xl text-sm">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="text-xs">
          {entry.name}: <span className="font-bold">{entry.value}</span>
          {entry.name === 'Screen Time (hrs)' ? ' hrs' : '%'}
        </p>
      ))}
    </div>
  );
}

export default function ScreenTimeChart() {
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          Screen Time vs Burnout Risk
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Last 7 days overview</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 14]}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Hours',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: 11, fill: '#2a5298' },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Risk %',
              angle: 90,
              position: 'insideRight',
              offset: 10,
              style: { fontSize: 11, fill: '#ff7a18' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="screenTime"
            name="Screen Time (hrs)"
            stroke="#2a5298"
            strokeWidth={2.5}
            dot={{ fill: '#2a5298', strokeWidth: 2, stroke: '#fff', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="burnoutRisk"
            name="Burnout Risk (%)"
            stroke="#ff7a18"
            strokeWidth={2.5}
            dot={{ fill: '#ff7a18', strokeWidth: 2, stroke: '#fff', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
