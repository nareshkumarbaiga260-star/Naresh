import React, { useState } from 'react';
import { useAuth, AUTHORIZED_ADMIN_EMAIL } from '../AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle,
  LogOut,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { adminLogin, adminLogout, setCurrentView } = useApp();

  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    setTimeout(() => {
      // 1. Perform simulated login using AuthContext
      const result = login(email, password);

      if (result.success) {
        // Also sync with AppContext if applicable
        if (password) {
          adminLogin(email, password);
        }
        setSuccess(result.message);
        setTimeout(() => {
          setIsLoading(false);
          if (onSuccess) onSuccess();
          onClose();
        }, 800);
      } else {
        setIsLoading(false);
        setError(result.message);
      }
    }, 400);
  };

  const handleLogout = () => {
    logout();
    adminLogout();
    setSuccess('आप सफलतापूर्वक लॉगआउट हो चुके हैं।');
    setTimeout(() => {
      setSuccess('');
    }, 1500);
  };

  const handleGoToAdmin = () => {
    setCurrentView('admin');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 text-white flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 id="login-modal-title" className="text-base font-bold text-slate-100">
                {isAuthenticated ? 'एडमिन सत्र सक्रिय (Active Session)' : 'सुरक्षित एडमिन लॉगिन (Admin Login)'}
              </h2>
              <p className="text-xs text-amber-300/80">Naresh Technical सुरक्षा गेटवे</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {isAuthenticated ? (
            /* Logged-In State */
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  आप सफलतापूर्वक ऑथेंटिकेटेड हैं
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  लॉगिन ईमेल: <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">{user?.email || AUTHORIZED_ADMIN_EMAIL}</span>
                </p>
                <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                  सत्यापित एडमिन (Verified Admin)
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleGoToAdmin}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>एडमिन डैशबोर्ड खोलें (Open Dashboard)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>सत्र समाप्त करें (लॉगआउट / Logout)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  यह एडमिन लॉगिन केवल <strong>{AUTHORIZED_ADMIN_EMAIL}</strong> के लिए अधिकृत है। अप्रमाणित उपयोगकर्ताओं से पोस्ट जोड़ना व डिलीट करना सुरक्षित रूप से छिपा रहता है।
                </span>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  एडमिन ईमेल आईडी (Admin Email)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nareshkumarbaiga260@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  अधिकृत: <code className="text-amber-600 dark:text-amber-400 font-mono">{AUTHORIZED_ADMIN_EMAIL}</code>
                </p>
              </div>

              {/* Password Input with Forgot Password link */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    सुरक्षित पासवर्ड (Admin Password)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>पासवर्ड भूल गए? (Forgot?)</span>
                  </button>
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="पासवर्ड दर्ज करें..."
                    className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick autofill helper */}
              {email !== AUTHORIZED_ADMIN_EMAIL && (
                <button
                  type="button"
                  onClick={() => setEmail(AUTHORIZED_ADMIN_EMAIL)}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  ⚡ अधिकृत ईमेल भरें ({AUTHORIZED_ADMIN_EMAIL})
                </button>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isLoading ? 'सत्यापित हो रहा है...' : 'लॉगिन करें (Login)'}</span>
                </button>
              </div>
            </form>
          )}
      </div>

      {/* Secure Forgot Password / Password Reset Flow */}
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />
    </div>
  );
};

export default LoginModal;
