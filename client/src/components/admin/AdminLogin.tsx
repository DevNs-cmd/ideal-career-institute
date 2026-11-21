import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, Sparkles, Zap, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@ICI2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLogin = async (u: string, p: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    const cleanU = u.trim();
    const cleanP = p.trim();

    try {
      const data = await api.login(cleanU, cleanP);
      if (data && data.token && data.user) {
        login(data.token, data.user);
      } else {
        throw new Error('Invalid response received from authentication server');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(
        err.message || 'Login failed. Please verify the backend server is running on port 5000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(username, password);
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    performLogin(u, p);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">

        {/* Top Header */}
        <div className="bg-slate-900 text-white p-8 text-center border-b border-slate-800 relative">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 mx-auto mb-4 border border-slate-700 flex items-center justify-center shadow-md">
            <img
              src="/assets/logo.png"
              alt="Ideal Career Institute Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase mb-2 border border-red-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrative Gateway
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Ideal Career Institute
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Student Admission CRM & Management Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-5">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <div className="flex-1">
                <span className="font-bold block">Sign In Failed</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Quick 1-Click Login Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin('admin', 'Admin@ICI2026!')}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-current text-amber-300" />
            <span>⚡ 1-Click Instant Admin Login</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase">Or Sign In Manually</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>

            {/* Quick Chips */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-xs space-y-2">
              <div className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Accepted Credentials (Click to Fill):
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('admin');
                    setPassword('Admin@ICI2026!');
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-mono font-bold text-slate-800 cursor-pointer shadow-2xs"
                >
                  admin / Admin@ICI2026!
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUsername('admin');
                    setPassword('admin');
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-mono font-bold text-slate-800 cursor-pointer shadow-2xs"
                >
                  admin / admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {isLoading ? (
                <span>Authenticating with CRM...</span>
              ) : (
                <>
                  <span>Sign In to CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onBackToWebsite}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              ← Back to Institutional Website
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        Technology Partner:{' '}
        <a
          href="https://algoforceaii.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          AlgoForce AI (algoforceaii.com)
        </a>{' '}
        • Ideal Career Institute
      </div>
    </div>
  );
};
