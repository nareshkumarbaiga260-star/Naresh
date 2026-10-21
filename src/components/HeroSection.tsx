import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Calendar, CheckCircle2, Bell, Sparkles } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/initialData';

export const HeroSection: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filterCategory, 
    setFilterCategory, 
    setIsAlertModalOpen,
    setCurrentView
  } = useApp();

  const importantDates = [
    { title: 'रेलवे RRB टेक्नीशियन', date: '20 अप्रैल 2026', type: 'अंतिम तिथि', color: 'text-amber-500' },
    { title: 'SSC CGL 2026', date: '28 अप्रैल 2026', type: 'आवेदन चालू', color: 'text-emerald-500' },
    { title: 'CTET 2026 परीक्षा', date: '12 अप्रैल 2026', type: 'परीक्षा तिथि', color: 'text-sky-500' },
    { title: 'RRB ALP उत्तर कुंजी', date: '29 मार्च 2026', type: 'आपत्ति अंतिम तिथि', color: 'text-rose-500' },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        
        {/* Verified Non-Government Subtitle */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>सरल हिंदी में सरकारी भर्ती और जनकल्याणकारी योजनाओं की प्रामाणिक जानकारी</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          सरकारी नौकरी व सरकारी योजनाएँ, <br className="hidden sm:inline" />
          <span className="text-amber-400">आसान भाषा और सीधे लिंक</span> के साथ
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          सत्यापित योग्यता, महत्वपूर्ण तिथियाँ, चयन प्रक्रिया, पाठ्यक्रम और आधिकारिक नोटिफिकेशन के सीधे लिंक। आवेदन करने से पहले आधिकारिक स्रोत की पुष्टि जरूर करें।
        </p>

        {/* Main Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-300 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 transition-all">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="भर्ती, योजना, रिजल्ट, एडमिट कार्ड या विभाग खोजें… (उदा. RRB, SSC, PM Awas, UP)" 
              className="w-full py-3.5 pl-3 pr-24 text-sm sm:text-base text-slate-900 dark:text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2 px-1"
              >
                साफ करें
              </button>
            )}
            <button 
              onClick={() => {
                const el = document.getElementById('posts-directory-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm px-4 py-3 mr-1 rounded-lg transition-colors shrink-0"
            >
              खोजें
            </button>
          </div>
        </div>

        {/* Quick Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                const el = document.getElementById('posts-directory-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Important Dates Strip */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex items-center justify-center gap-2 mb-2 text-xs font-semibold text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>महत्वपूर्ण तिथियाँ (Important Dates Ticker)</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-left">
            {importantDates.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-2.5 hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => {
                  setSearchQuery(item.title.split(' ')[0]);
                  const el = document.getElementById('posts-directory-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{item.type}</span>
                  <span className={`font-mono font-semibold ${item.color}`}>●</span>
                </div>
                <div className="font-medium text-xs text-white truncate" title={item.title}>
                  {item.title}
                </div>
                <div className="text-[11px] font-mono font-semibold text-amber-300 mt-0.5">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
