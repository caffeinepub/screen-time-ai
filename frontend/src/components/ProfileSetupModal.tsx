import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { User } from 'lucide-react';

interface ProfileSetupModalProps {
  onSaved: () => void;
}

export default function ProfileSetupModal({ onSaved }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const { mutate: saveProfile, isPending, isError, error } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveProfile(
      { name: name.trim() },
      {
        onSuccess: () => {
          onSaved();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 border border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-navy-light/10 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-navy-deep" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-navy-deep text-center mb-1">Welcome!</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Please enter your name to get started with your health dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-light/40 focus:border-navy-light transition-colors"
              autoFocus
            />
          </div>

          {isError && (
            <p className="text-red-500 text-sm">
              {(error as Error)?.message || 'Failed to save profile. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={!name.trim() || isPending}
            className="w-full bg-orange-accent hover:bg-orange-accent-hover text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              'Get Started'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
