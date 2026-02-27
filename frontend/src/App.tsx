import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useGetCallerUserProfile } from './hooks/useQueries';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const showProfileSetup =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-deep">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-white/70 text-sm font-medium tracking-wide">Initializing…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Dashboard userProfile={userProfile ?? null} />
      {showProfileSetup && (
        <ProfileSetupModal
          onSaved={() => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      )}
    </>
  );
}
