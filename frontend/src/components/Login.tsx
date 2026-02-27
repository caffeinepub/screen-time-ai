import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Monitor, Shield, Brain, Activity } from 'lucide-react';

export default function Login() {
  const { login, isLoggingIn, isLoginError, loginError } = useInternetIdentity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-gradient relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/assets/generated/logo-shield.dim_256x256.png"
                alt="Screen Time Health Intelligence Logo"
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight leading-tight">
            Screen Time Health Intelligence
          </h1>
          <p className="text-blue-200/80 text-sm mb-8 leading-relaxed">
            AI-powered behavioral risk prediction for burnout &amp; fatigue
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { icon: Brain, label: 'AI Risk Analysis' },
              { icon: Activity, label: 'Health Metrics' },
              { icon: Monitor, label: 'Usage Insights' },
              { icon: Shield, label: 'Secure & Private' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 bg-white/10 text-blue-100 text-xs px-3 py-1.5 rounded-full border border-white/10"
              >
                <Icon className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>

          {/* Login button */}
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full bg-orange-accent hover:bg-orange-accent-hover text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-accent/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 text-base"
          >
            {isLoggingIn ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
                Sign in with Internet Identity
              </>
            )}
          </button>

          {isLoginError && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm">
                {loginError?.message || 'Login failed. Please try again.'}
              </p>
            </div>
          )}

          <p className="mt-6 text-blue-200/50 text-xs">
            Secured by Internet Computer's decentralized identity system
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-white/30 text-xs mt-6">
          Your data stays private and on-chain
        </p>
      </div>
    </div>
  );
}
