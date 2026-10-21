import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import { useAuth } from '../AuthContext';
import { 
  Bookmark, 
  Moon, 
  Sun, 
  ShieldAlert, 
  Lock, 
  Menu, 
  X, 
  Search, 
  Bell, 
  HelpCircle,
  FileText,
  ChevronDown,
  LogIn,
  UserCheck
} from 'lucide-react';
import { LoginModal } from './LoginModal';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    theme, 
    toggleTheme, 
    bookmarkedIds, 
    setIsBookmarkDrawerOpen,
    setIsAlertModalOpen,
    isAdminLoggedIn,
    setFilterCategory,
    resetFilters
  } = useApp();

  const { isAuthenticated } = useAuth();
  const isUserAdmin = isAdminLoggedIn || isAuthenticated;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleNavClick = (view: AppView, catId?: string) => {
    setCurrentView(view);
    if (catId) {
      setFilterCategory(catId);
    } else if (view === 'home') {
      resetFilters();
    }
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* 1. Mandatory Statutory Non-Government Notice Bar */}
      <div className="bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800/60 px-4 py-2 text-xs md:text-sm font-medium text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>
            <strong>सांविधिक सूचना:</strong> Naresh Technical एक स्वतंत्र जानकारी वेबसाइट है। यह सरकारी वेबसाइट नहीं है। कृपया आवेदन करने से पहले संबंधित विभाग की आधिकारिक वेबसाइट पर जानकारी जरूर जाँचें।
          </span>
        </div>
      </div>

      {/* 2. Main Top Navigation Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left group focus:outline-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Naresh <span className="text-amber-500 font-extrabold">Technical</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono hidden sm:inline-block">
                  स्वतंत्र पोर्टल
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                सरकारी योजना और सरकारी भर्ती सूचना (सरल हिंदी)
              </p>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-200">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'home' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              होम
            </button>

            <button 
              onClick={() => handleNavClick('jobs', 'job')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'jobs' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              नवीनतम भर्ती
            </button>

            <button 
              onClick={() => handleNavClick('yojana', 'yojana')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'yojana' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              सरकारी योजनाएँ
            </button>

            <button 
              onClick={() => handleNavClick('admit-card', 'admit-card')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'admit-card' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              Admit Card
            </button>

            <button 
              onClick={() => handleNavClick('results', 'result')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'results' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              Results
            </button>

            <button 
              onClick={() => handleNavClick('answer-key', 'answer-key')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'answer-key' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              Answer Key
            </button>

            <button 
              onClick={() => handleNavClick('syllabus', 'syllabus')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'syllabus' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              पाठ्यक्रम (Syllabus)
            </button>

            <button 
              onClick={() => handleNavClick('states')}
              className={`px-2.5 py-1.5 rounded-md transition-colors ${currentView === 'states' ? 'bg-slate-800 text-amber-400 font-semibold' : 'hover:bg-slate-800/70 hover:text-white'}`}
            >
              राज्यवार
            </button>

            {/* More dropdown */}
            <div className="relative">
              <button 
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-800/70 hover:text-white text-slate-300"
              >
                अन्य <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                  <button 
                    onClick={() => handleNavClick('prep')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60"
                  >
                    परीक्षा तैयारी मार्गदर्शन
                  </button>
                  <button 
                    onClick={() => handleNavClick('correction')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60 text-amber-600 dark:text-amber-400 font-medium"
                  >
                    जानकारी सुधारने का अनुरोध
                  </button>
                  <button 
                    onClick={() => handleNavClick('setup-guide')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60"
                  >
                    उत्पादन व होस्टिंग गाइड
                  </button>
                  <div className="my-1 border-t border-slate-200 dark:border-slate-700"></div>
                  <button 
                    onClick={() => handleNavClick('about')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60"
                  >
                    हमारे बारे में (About Us)
                  </button>
                  <button 
                    onClick={() => handleNavClick('contact')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60"
                  >
                    संपर्क करें (Contact Us)
                  </button>
                  <button 
                    onClick={() => handleNavClick('disclaimer')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-500"
                  >
                    Disclaimer (अस्वीकरण)
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Alert Subscribe Button */}
            <button 
              onClick={() => setIsAlertModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-amber-500/30 transition-colors"
              title="सरकारी नौकरी व योजना ईमेल अलर्ट्स"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">अलर्ट्स</span>
            </button>

            {/* Bookmarks */}
            <button 
              onClick={() => setIsBookmarkDrawerOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="सहेजी गई पोस्ट्स (Saved Posts)"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title={theme === 'dark' ? 'लाइट मोड में बदलें' : 'डार्क मोड में बदलें'}
              aria-label="Theme Toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Login Button (Triggers LoginModal) */}
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                isAuthenticated 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25' 
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
              }`}
              title="सुरक्षित लॉगिन (Login Modal)"
            >
              {isAuthenticated ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <LogIn className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isAuthenticated ? 'लॉगिन' : 'Login'}</span>
            </button>

            {/* Admin Dashboard Navigation Button */}
            <button 
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                isUserAdmin 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isUserAdmin ? 'एडमिन डैशबोर्ड' : 'कंसोल'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Login Button */}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold flex items-center justify-between text-xs transition-colors hover:bg-amber-500/20"
            >
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>{isAuthenticated ? 'एडमिन सत्र सक्रिय (Login Status)' : 'सुरक्षित एडमिन लॉगिन (Login)'}</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isAuthenticated ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {isAuthenticated ? 'Active' : 'Modal'}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🏠 होम (Home)
              </button>
              <button 
                onClick={() => handleNavClick('jobs', 'job')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                💼 नवीनतम भर्ती (Jobs)
              </button>
              <button 
                onClick={() => handleNavClick('yojana', 'yojana')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🏛️ सरकारी योजनाएँ (Yojana)
              </button>
              <button 
                onClick={() => handleNavClick('admit-card', 'admit-card')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🎫 Admit Card
              </button>
              <button 
                onClick={() => handleNavClick('results', 'result')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🏆 Results
              </button>
              <button 
                onClick={() => handleNavClick('answer-key', 'answer-key')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🔑 Answer Key
              </button>
              <button 
                onClick={() => handleNavClick('syllabus', 'syllabus')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                📚 सिलेबस (Syllabus)
              </button>
              <button 
                onClick={() => handleNavClick('prep')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🎯 परीक्षा तैयारी
              </button>
              <button 
                onClick={() => handleNavClick('states')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                🗺️ राज्यवार नौकरी
              </button>
              <button 
                onClick={() => handleNavClick('correction')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-amber-400 font-medium hover:text-white"
              >
                ✏️ सुधार अनुरोध
              </button>
              <button 
                onClick={() => handleNavClick('setup-guide')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-sky-400 hover:text-white"
              >
                ⚙️ सेटअप व होस्टिंग
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="text-left px-3 py-2 rounded bg-slate-900 text-slate-200 hover:text-white"
              >
                ℹ️ हमारे बारे में
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <span>© Naresh Technical (स्वतंत्र पोर्टल)</span>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-amber-400 underline"
              >
                सहायता / संपर्क
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Login Modal (simulated login validating nareshkumarbaiga260@gmail.com) */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
};
