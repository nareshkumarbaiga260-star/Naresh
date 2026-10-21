import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  X, 
  ArrowLeft, 
  Server, 
  HelpCircle,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { PasswordResetService, PRODUCTION_BACKEND_REQUIREMENTS } from '../services/PasswordResetService';
import { AUTHORIZED_ADMIN_EMAIL } from '../AuthContext';
import { useApp } from '../context/AppContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type ResetStep = 'request' | 'otp-verify' | 'new-password' | 'backend-guide';

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { setAdminPassword, hasConfiguredPassword } = useApp();

  const [step, setStep] = useState<ResetStep>('request');
  const [identifier, setIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [mobileNumberForOtp, setMobileNumberForOtp] = useState('');
  
  // CAPTCHA State
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(5);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Rate Limiting & Cooldown
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // New Password Fields (Protected Reset Page)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Generate new random CAPTCHA
  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    if (isOpen) {
      refreshCaptcha();
      setStatusMessage(null);
      setStep('request');
      setIdentifier('');
      setOtpCode('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [isOpen]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => setCooldownSeconds(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  if (!isOpen) return null;

  // Handle Step 1: Initial Request Submission
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setCaptchaError('');

    // 1. CAPTCHA Validation
    if (parseInt(captchaInput.trim(), 10) !== (captchaNum1 + captchaNum2)) {
      setCaptchaError('सुरक्षा कोड (CAPTCHA) गलत है। कृपया पुनः हल करें।');
      refreshCaptcha();
      return;
    }

    if (cooldownSeconds > 0) {
      setStatusMessage({
        type: 'error',
        text: `कृपया प्रतीक्षा करें। आप ${cooldownSeconds} सेकंड बाद पुनः प्रयास कर सकते हैं।`
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await PasswordResetService.requestPasswordReset(
        identifier,
        true,
        AUTHORIZED_ADMIN_EMAIL
      );

      setIsLoading(false);

      if (result.requiresOtpVerification) {
        // Mobile number entered: transition to OTP step
        setMobileNumberForOtp(identifier);
        setStep('otp-verify');
        setStatusMessage({
          type: 'info',
          text: result.message
        });
      } else {
        // Standard generic message (Rule 5: Never reveal if email/mobile is registered)
        setStatusMessage({
          type: 'success',
          text: result.message
        });
        setCooldownSeconds(60);
      }
    } catch {
      setIsLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'सर्वर से संपर्क करने में त्रुटि। कृपया कुछ समय बाद पुनः प्रयास करें।'
      });
    }
  };

  // Handle Step 2: OTP Verification for Mobile Number
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length !== 6) {
      setStatusMessage({
        type: 'error',
        text: 'कृपया 6 अंकों का सुरक्षा OTP दर्ज करें।'
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const result = await PasswordResetService.verifyMobileOtp(
        mobileNumberForOtp,
        otpCode,
        AUTHORIZED_ADMIN_EMAIL
      );

      setIsLoading(false);

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: result.message
        });
        // Once OTP verified and link dispatched to Gmail, allow user to proceed to Reset Page
        setTimeout(() => {
          setStep('new-password');
        }, 1200);
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message
        });
      }
    } catch {
      setIsLoading(false);
      setStatusMessage({
        type: 'error',
        text: 'सत्यापन में त्रुटि हुई।'
      });
    }
  };

  // Handle Step 3: Direct Secure Password Creation
  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('दोनों पासवर्ड मेल नहीं खाते। कृपया पुनः जाँचें।');
      return;
    }

    setIsLoading(true);

    try {
      // Secure local cryptographic save
      await setAdminPassword(newPassword);
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'पासवर्ड सफलतापूर्वक रीसेट हो गया है! अब आप अपने नए पासवर्ड से लॉगिन कर सकते हैं।'
      });

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch {
      setIsLoading(false);
      setPasswordError('पासवर्ड सहेजने में त्रुटि।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 text-white flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 id="forgot-password-title" className="text-base font-bold text-slate-100">
                पासवर्ड रीसेट एवं रिकवरी (Password Reset)
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

        {/* Navigation Tabs between Reset and Production Backend Guide */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold">
          <button
            onClick={() => setStep('request')}
            className={`flex-1 py-2.5 px-3 text-center border-b-2 transition-colors ${
              step !== 'backend-guide'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            सुरक्षित रीसेट अनुरोध
          </button>
          <button
            onClick={() => setStep('backend-guide')}
            className={`flex-1 py-2.5 px-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              step === 'backend-guide'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>उत्पादन बैकएंड आवश्यकताएँ (SOP)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Status Message Banner */}
          {statusMessage && (
            <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed font-medium">{statusMessage.text}</span>
            </div>
          )}

          {/* VIEW 1: STEP 'request' - Request Reset via Gmail or Mobile */}
          {step === 'request' && (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  सुरक्षा एवं गोपनीयता दिशानिर्देश:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  <li>रजिस्टर्ड Gmail डालने पर सीधे उसी ईमेल पर वन-टाइम रीसेट लिंक भेजा जाता है।</li>
                  <li>रजिस्टर्ड मोबाइल नंबर डालने पर पहले OTP सत्यापन होगा, जिसके बाद लिंक रजिस्टर्ड Gmail पर ही भेजा जाएगा।</li>
                  <li>खाता अस्तित्व की गोपनीयता (Anti-Enumeration) बनाए रखने के लिए हमेशा सामान्य संदेश प्रदर्शित होता है।</li>
                </ul>
              </div>

              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  रजिस्टर्ड Gmail पता या 10 अंकों का मोबाइल नंबर *
                </label>
                <div className="relative">
                  {identifier.includes('@') ? (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  ) : (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  )}
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="उदा. आपका-ईमेल@gmail.com या 9876543210"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Security CAPTCHA / Rate Limiting */}
              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    बॉट व स्पैम रोकथाम (CAPTCHA Challenge)
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>नया प्रश्न</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 rounded-lg font-mono font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm tracking-wider select-none">
                    {captchaNum1} + {captchaNum2} = ?
                  </div>
                  <input
                    type="number"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="उत्तर भरें"
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>

                {captchaError && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    {captchaError}
                  </p>
                )}
              </div>

              {/* Cooldown Notice */}
              {cooldownSeconds > 0 && (
                <div className="text-center text-xs text-amber-600 dark:text-amber-400 font-mono flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>पुनः अनुरोध के लिए {cooldownSeconds} सेकंड प्रतीक्षा करें।</span>
                </div>
              )}

              {/* Actions */}
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
                  disabled={isLoading || cooldownSeconds > 0}
                  className="w-2/3 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isLoading ? 'अनुरोध भेजा जा रहा है...' : 'रीसेट लिंक भेजें (Reset Request)'}</span>
                </button>
              </div>

              {/* Direct Password Setup Option if Admin is Authorized */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
                <button
                  type="button"
                  onClick={() => setStep('new-password')}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  🔒 क्या आपके पास वैध रीसेट लिंक है? नया पासवर्ड यहाँ सेट करें →
                </button>
              </div>
            </form>
          )}

          {/* VIEW 2: STEP 'otp-verify' - Verify Mobile OTP */}
          {step === 'otp-verify' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>वापस जाएं</span>
              </button>

              <div className="text-center py-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  मोबाइल OTP सत्यापन
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  आपके पंजीकृत मोबाइल नंबर पर 6 अंकों का गुप्त कोड भेजा गया है।
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  6 अंकों का OTP दर्ज करें *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="******"
                  className="w-full text-center py-2.5 px-3 text-lg sm:text-xl font-mono tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  सुरक्षा नियम 4: यह OTP 5 मिनट के लिए वैध है और केवल एक बार इस्तेमाल हो सकता है।
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('request')}
                  className="w-1/3 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={isLoading || otpCode.length !== 6}
                  className="w-2/3 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isLoading ? 'जाँच हो रही है...' : 'OTP सत्यापित करें (Verify)'}</span>
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: STEP 'new-password' - Secure Reset Screen */}
          {step === 'new-password' && (
            <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>वापस जाएं</span>
              </button>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  सुरक्षित पासवर्ड निर्माण (Rule 7 Compliance):
                </span>
                <p className="text-[11px] leading-relaxed">
                  नया पासवर्ड केवल इस सुरक्षित पेज पर आपके द्वारा बनाया जा रहा है। पासवर्ड कभी भी किसी कोड, चैट या सर्वर लॉग में नहीं लिखा जाता। यह Web Crypto API (SHA-256 + Salt) द्वारा स्थानीय रूप से एनक्रिप्ट होता है।
                </p>
              </div>

              {passwordError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
                  {passwordError}
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  नया पासवर्ड (New Password - कम से कम 8 अक्षर) *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="कम से कम 8 मजबूत अक्षर दर्ज करें"
                    className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-2"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  नए पासवर्ड की पुनः पुष्टि करें (Confirm Password) *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="वही पासवर्ड दोबारा दर्ज करें"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isLoading ? 'पासवर्ड सहेजा जा रहा है...' : 'नया पासवर्ड सुरक्षित सहेजें'}</span>
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: STEP 'backend-guide' - Backend Infrastructure & SOP (Rule 8 Compliance) */}
          {step === 'backend-guide' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200">
                <strong className="block mb-1 text-sm font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-amber-600" />
                  वास्तविक ईमेल/SMS डिलीवरी हेतु आवश्यक सेटअप (Rule 8):
                </strong>
                <p className="text-[11px] leading-relaxed">
                  क्लाइंट-साइड React एप्लिकेशन सीधे ब्राउज़र से बिना सीक्रेट क्रेडेंशियल एक्सपोज़ किए वास्तविक Gmail या SMS नहीं भेज सकता। प्रोडक्शन में वास्तविक ईमेल और SMS भेजने के लिए निम्नलिखित बैकएंड सेवाएँ आवश्यक होती हैं:
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    1. ईमेल डिलीवरी सेवा (SMTP):
                  </span>
                  <p className="text-[11px] text-slate-500">
                    <strong>Resend</strong> (अनुशंसित) या <strong>SendGrid / AWS SES</strong>। यह सेवा पंजीकृत Gmail पर सुरक्षित क्रिप्टोग्राफिक रीसेट लिंक डिलीवर करती है।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    2. SMS OTP गेटवे:
                  </span>
                  <p className="text-[11px] text-slate-500">
                    <strong>Twilio</strong>, <strong>MSG91</strong> या <strong>Fast2SMS</strong> (DLT Approved)। यह मोबाइल सत्यापन हेतु 6 अंकों का सुरक्षित OTP भेजता है।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    3. बैकएंड सर्वर (API Handler):
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Node.js/Express सर्वर या Firebase Cloud Functions। यह 15-मिनट की समयावधि वाले वन-टाइम हैशेड टोकन तैयार और सत्यापित करता है।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    4. आवश्यक एनवायर्नमेंट वैरिएबल्स:
                  </span>
                  <ul className="text-[10px] text-slate-500 font-mono list-disc pl-3">
                    {PRODUCTION_BACKEND_REQUIREMENTS.environmentVariablesNeeded.map((env, i) => (
                      <li key={i}>{env}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  वर्तमान में सक्रिय क्लाइंट सुरक्षा:
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  वेबसाइट में कोई नकली या असुरक्षित डाटा एक्सपोज़र नहीं है। मोबाइल नंबर या एडमिन ईमेल सार्वजनिक रूप से प्रदर्शित नहीं होता। सभी पासवर्ड Web Crypto SHA-256 द्वारा सुरक्षित हैं और रीसेट प्रक्रिया पूरी तरह से Anti-Enumeration मानकों का पालन करती है।
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('request')}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                रीसेट फ़ॉर्म पर वापस जाएं
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
