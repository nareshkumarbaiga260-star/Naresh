/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FiltersBar } from './components/FiltersBar';
import { PostCard } from './components/PostCard';
import { PostDetailModal } from './components/PostDetailModal';
import { AdminPanel } from './components/AdminPanel';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { AlertModal } from './components/AlertModal';
import { Footer } from './components/Footer';
import { 
  AboutPage, 
  ContactPage, 
  CorrectionPage, 
  DisclaimerPage, 
  PrivacyPage, 
  TermsPage, 
  ExamPrepPage, 
  StatewisePage,
  SetupGuidePage 
} from './components/StaticPages';
import { 
  Briefcase, 
  Landmark, 
  CheckCircle2, 
  Search, 
  FileQuestion, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { STATES_LIST } from './data/initialData';

const MainContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView,
    selectedPost,
    posts, 
    searchQuery, 
    filterCategory, 
    filterState, 
    filterQualification, 
    filterStatus, 
    sortBy,
    setFilterState,
    setFilterCategory,
    resetFilters
  } = useApp();

  // Filter & Sort Logic for Posts
  const filteredPosts = posts.filter(post => {
    // Hide drafts from visitors unless in admin view
    if (post.isDraft && currentView !== 'admin') return false;

    // Category filter
    let matchCategory = true;
    if (filterCategory !== 'all') {
      matchCategory = post.category === filterCategory;
    }

    // State filter
    let matchState = true;
    if (filterState !== 'सभी' && filterState !== 'सभी राज्य / All India') {
      matchState = post.state === filterState;
    }

    // Qualification filter
    let matchQual = true;
    if (filterQualification !== 'सभी' && filterQualification !== 'सभी योग्यताएँ') {
      matchQual = post.qualification.includes(filterQualification) || 
                  (post.category === 'yojana' && post.qualification as any === 'सभी योग्यताएँ');
    }

    // Status filter
    let matchStatus = true;
    if (filterStatus !== 'सभी') {
      matchStatus = post.status === filterStatus;
    }

    // Search query
    let matchSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      matchSearch = post.title.toLowerCase().includes(q) ||
                    post.department.toLowerCase().includes(q) ||
                    post.state.toLowerCase().includes(q) ||
                    post.qualification.toLowerCase().includes(q) ||
                    post.summary.toLowerCase().includes(q);
    }

    return matchCategory && matchState && matchQual && matchStatus && matchSearch;
  });

  // Sort logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'ending-soon') {
      return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
    }
    // Newest first
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Router dispatcher
  if (currentView === 'post-detail' && selectedPost) {
    return <PostDetailModal post={selectedPost} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  if (currentView === 'setup-guide') {
    return <SetupGuidePage />;
  }

  if (currentView === 'about') return <AboutPage />;
  if (currentView === 'contact') return <ContactPage />;
  if (currentView === 'correction') return <CorrectionPage />;
  if (currentView === 'disclaimer') return <DisclaimerPage />;
  if (currentView === 'privacy') return <PrivacyPage />;
  if (currentView === 'terms') return <TermsPage />;
  if (currentView === 'prep') return <ExamPrepPage />;
  if (currentView === 'states') return <StatewisePage />;

  // Default directory view (Home, Jobs, Yojana, Admit Card, Results, Answer Key, Syllabus)
  const getViewTitle = () => {
    switch (currentView) {
      case 'jobs': return 'नवीनतम सरकारी भर्ती (Latest Government Jobs)';
      case 'yojana': return 'सरकारी योजनाएँ (Government Welfare Schemes)';
      case 'admit-card': return 'एडमिट कार्ड डाउनलोड (Admit Cards)';
      case 'results': return 'परीक्षा परिणाम व मेरिट (Exam Results)';
      case 'answer-key': return 'उत्तर कुंजी व आपत्तियां (Official Answer Keys)';
      case 'syllabus': return 'परीक्षा पाठ्यक्रम एवं पैटर्न (Syllabus)';
      default: return 'नवीनतम अपडेट एवं सक्रिय सूचनाएँ';
    }
  };

  return (
    <div>
      {/* Hero Section on Home View */}
      {currentView === 'home' && <HeroSection />}

      {/* Main Container */}
      <main id="posts-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <button onClick={() => { setCurrentView('home'); resetFilters(); }} className="hover:underline">
            होम
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            {currentView === 'home' ? 'मुख्य डायरेक्टरी' : getViewTitle().split(' ')[0]}
          </span>
          {filterCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">{filterCategory}</span>
            </>
          )}
        </div>

        {/* Directory Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {getViewTitle()}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              आवेदन करने से पहले आधिकारिक नोटिफिकेशन अवश्य पढ़ें। (कुल परिणाम: {sortedPosts.length})
            </p>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>दैनिक सत्यापित अपडेट्स</span>
          </div>
        </div>

        {/* Filters Bar */}
        <FiltersBar />

        {/* Posts Grid */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3">
            <FileQuestion className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              कोई मिलती-जुलती पोस्ट नहीं मिली
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              आपके द्वारा चुने गए फ़िल्टर या खोज शब्दों के अनुसार कोई परिणाम उपलब्ध नहीं है। कृपया दूसरे शब्दों या फ़िल्टर का उपयोग करें।
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
            >
              सभी फ़िल्टर साफ़ करें
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Quick State Cards Section (on Home) */}
        {currentView === 'home' && (
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  राज्यवार सरकारी नौकरी व योजनाएँ
                </h3>
                <p className="text-xs text-slate-500">अपने राज्य की विशेष भर्तियाँ और योजनाएँ सीधे खोजें</p>
              </div>
              <button
                onClick={() => setCurrentView('states')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>सभी राज्य देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              {STATES_LIST.slice(1, 7).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setFilterState(st);
                    const el = document.getElementById('posts-directory-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-amber-500 hover:shadow-sm text-left transition-all"
                >
                  <MapPin className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block truncate">{st}</span>
                  <span className="text-[10px] text-slate-400">भर्तियाँ देखें →</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Header />
          <div className="flex-1">
            <MainContent />
          </div>
          <BookmarkDrawer />
          <AlertModal />
          <Footer />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
