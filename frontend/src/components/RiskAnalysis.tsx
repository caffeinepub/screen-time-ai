import { AlertTriangle, CheckCircle } from 'lucide-react';

const riskFactors = [
  { text: 'Late night usage detected', detail: 'Activity after 11 PM on 5 of 7 days' },
  { text: 'Extended continuous sessions', detail: 'Sessions exceeding 3 hours without breaks' },
  { text: 'High social media ratio', detail: '27% of total screen time on social platforms' },
  { text: 'Insufficient break intervals', detail: 'Average break interval: 94 minutes' },
];

const recommendations = [
  { text: 'Take 20-20-20 eye breaks', detail: 'Every 20 min, look 20 ft away for 20 seconds' },
  { text: 'Limit screens after 9 PM', detail: 'Blue light disrupts melatonin production' },
  { text: 'Use app timers for social media', detail: 'Set a 45-minute daily limit' },
  { text: 'Enable night mode after sunset', detail: 'Reduces eye strain and sleep disruption' },
];

export default function RiskAnalysis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Risk Factors */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-800">Risk Factors Detected</h3>
            <p className="text-xs text-red-400">{riskFactors.length} issues identified</p>
          </div>
        </div>
        <ul className="space-y-3">
          {riskFactors.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-3 h-3 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">{item.text}</p>
                <p className="text-xs text-red-400 mt-0.5">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-green-800">Recommendations</h3>
            <p className="text-xs text-green-500">{recommendations.length} actions to improve</p>
          </div>
        </div>
        <ul className="space-y-3">
          {recommendations.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">{item.text}</p>
                <p className="text-xs text-green-500 mt-0.5">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
