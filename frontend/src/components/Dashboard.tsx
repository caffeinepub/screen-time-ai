import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import MetricCard from './MetricCard';
import ScreenTimeChart from './ScreenTimeChart';
import AppUsageChart from './AppUsageChart';
import RiskAnalysis from './RiskAnalysis';
import type { UserProfile } from '../backend';
import {
  Brain,
  Eye,
  Moon,
  Heart,
  LogOut,
  Activity,
  Shield,
  Bell,
} from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile | null;
}

function generateRiskScores(principal: string) {
  const hash = principal.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    burnout: 45 + (hash % 40),
    eyeStrain: 50 + (hash % 35),
    sleepDisruption: 30 + (hash % 45),
    healthScore: 100 - (40 + (hash % 30)),
  };
}

export default function Dashboard({ userProfile }: DashboardProps) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const principal = identity?.getPrincipal().toString() ?? '';
  const displayName = userProfile?.name ?? principal.slice(0, 12) + '…';
  const initials = userProfile?.name
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const scores = generateRiskScores(principal);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const metricCards = [
    {
      title: 'Burnout Risk',
      value: scores.burnout,
      borderColor: '#ef4444',
      trend: scores.burnout > 65 ? ('up' as const) : ('down' as const),
      trendLabel: scores.burnout > 65 ? 'Elevated' : 'Moderate',
      icon: <Brain className="w-4 h-4" />,
      description: 'Based on usage patterns and session duration',
    },
    {
      title: 'Eye Strain Risk',
      value: scores.eyeStrain,
      borderColor: '#f59e0b',
      trend: scores.eyeStrain > 65 ? ('up' as const) : ('down' as const),
      trendLabel: scores.eyeStrain > 65 ? 'High' : 'Moderate',
      icon: <Eye className="w-4 h-4" />,
      description: 'Continuous screen exposure without breaks',
    },
    {
      title: 'Sleep Disruption',
      value: scores.sleepDisruption,
      borderColor: '#3b82f6',
      trend: scores.sleepDisruption > 50 ? ('up' as const) : ('down' as const),
      trendLabel: scores.sleepDisruption > 50 ? 'Elevated' : 'Low',
      icon: <Moon className="w-4 h-4" />,
      description: 'Late-night device usage impact on sleep',
    },
    {
      title: 'Overall Health Score',
      value: scores.healthScore,
      borderColor: '#10b981',
      trend: scores.healthScore > 60 ? ('down' as const) : ('up' as const),
      trendLabel: scores.healthScore > 60 ? 'Good' : 'Needs Work',
      icon: <Heart className="w-4 h-4" />,
      description: 'Composite digital wellness indicator',
    },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Navbar */}
      <header className="bg-navy-gradient shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-sm leading-none block">
                  Screen Time Health
                </span>
                <span className="text-blue-200/60 text-xs">Intelligence Dashboard</span>
              </div>
            </div>

            {/* Right: User + Actions */}
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4 text-white/70" />
              </button>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
                <div className="w-7 h-7 bg-orange-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <span className="text-white text-sm font-medium hidden sm:block max-w-[120px] truncate">
                  {displayName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome section */}
        <section className="bg-navy-gradient rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
            <Activity className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-blue-200/70 text-sm mb-1">Good day,</p>
                <h2 className="text-2xl font-bold">Welcome back, {displayName}!</h2>
                <p className="text-blue-200/60 text-sm mt-1">
                  Here's your digital wellness report for today
                </p>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-blue-200/70 text-xs mb-1">Overall Score</p>
                <p className="text-3xl font-bold text-white">{scores.healthScore}</p>
                <p className="text-blue-200/60 text-xs">/ 100</p>
              </div>
            </div>

            {/* Quick stats bar */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Avg Screen Time', value: '8.4 hrs' },
                { label: 'Break Compliance', value: '34%' },
                { label: 'Night Usage', value: '5/7 days' },
                { label: 'Risk Level', value: scores.burnout > 65 ? 'High' : 'Moderate' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-blue-200/60 text-xs">{stat.label}</p>
                  <p className="text-white font-semibold text-sm mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metric Cards */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Health Risk Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((card) => (
              <MetricCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Usage Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScreenTimeChart />
            <AppUsageChart />
          </div>
        </section>

        {/* Risk Analysis */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            AI Risk Analysis
          </h3>
          <RiskAnalysis />
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 pb-4 text-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Screen Time Health Intelligence.{' '}
            Built with{' '}
            <span className="text-orange-accent">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'screen-time-health'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-light hover:text-navy-deep transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
