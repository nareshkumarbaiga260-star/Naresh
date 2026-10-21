import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCircle, ShieldCheck } from 'lucide-react';
import { STATES_LIST } from '../data/initialData';

export const AlertModal: React.FC = () => {
  const { isAlertModalOpen, setIsAlertModalOpen, addSubscriber } = useApp();
  const [email, setEmail] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>(['केंद्र सरकार (All India)']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['job', 'yojana']);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAlertModalOpen) return null;

  const handleStateToggle = (st: string) => {
    setSelectedStates(prev => 
      prev.includes(st) ? prev.filter(x => x !== st) : [...prev, st]
    );
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(x => x !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMessage('कृपया अधिसूचना प्राप्त करने हेतु सहमति चेकबॉक्स पर टिक करें।');
      return;
    }

    const success = addSubscriber({
      email: email.trim(),
      preferredStates: selectedStates,
      preferredCategories: selectedCategories
    });

    if (!success) {
      setErrorMessage('यह ईमेल आईडी पहले से पंजीकृत है।');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800">
        
        <button
          onClick={() => {
            setIsAlertModalOpen(false);
            setSubmitted(false);
            setErrorMessage('');
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              सफलतापूर्वक सदस्यता ली गई!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              आपके ईमेल <strong>{email}</strong> पर भर्ती और योजनाओं के महत्वपूर्ण अपडेट भेजे जाएंगे। आप किसी भी समय अनसब्सक्राइब कर सकते हैं।
            </p>
            <button
              onClick={() => {
                setIsAlertModalOpen(false);
                setSubmitted(false);
              }}
              className="mt-2 px-5 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold"
            >
              ठीक है
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  मुफ़्त जॉब व योजना अलर्ट्स
                </h3>
                <p className="text-xs text-slate-500">
                  नवीनतम विज्ञापन सीधे अपने ईमेल पर प्राप्त करें
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs text-rose-700 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  आपका ईमेल पता *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  पसंदीदा श्रेणियां:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'job', label: 'सरकारी नौकरी' },
                    { id: 'yojana', label: 'सरकारी योजनाएँ' },
                    { id: 'admit-card', label: 'Admit Card' },
                    { id: 'result', label: 'Results' }
                  ].map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  पसंदीदा राज्य:
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  {STATES_LIST.map(st => (
                    <label key={st} className="flex items-center gap-1.5 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(st)}
                        onChange={() => handleStateToggle(st)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="truncate text-slate-700 dark:text-slate-300">{st}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 mt-0.5"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-500 dark:text-slate-400 cursor-pointer">
                  मैं Naresh Technical से सरकारी सूचना ईमेल प्राप्त करने की सहमति देता/देती हूँ। हम स्पैम नहीं करते हैं।
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow"
              >
                अलर्ट्स सक्रिय करें (Subscribe Free)
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
