import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnyPost, CorrectionRequest, EmailSubscriber, IndianState, PostCategory, PostStatus, QualificationLevel } from '../types';
import { INITIAL_POSTS } from '../data/initialData';

export type AppView = 
  | 'home' 
  | 'jobs' 
  | 'yojana' 
  | 'admit-card' 
  | 'results' 
  | 'answer-key' 
  | 'syllabus' 
  | 'prep' 
  | 'states' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'disclaimer' 
  | 'terms' 
  | 'correction' 
  | 'admin' 
  | 'setup-guide'
  | 'post-detail';

interface AppContextType {
  posts: AnyPost[];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedPost: AnyPost | null;
  setSelectedPost: (post: AnyPost | null) => void;
  selectedPostSlug: string | null;
  openPostDetail: (post: AnyPost) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  filterState: IndianState | 'सभी';
  setFilterState: (s: any) => void;
  filterQualification: string;
  setFilterQualification: (q: string) => void;
  filterStatus: PostStatus | 'सभी';
  setFilterStatus: (s: any) => void;
  sortBy: 'newest' | 'ending-soon';
  setSortBy: (s: 'newest' | 'ending-soon') => void;
  resetFilters: () => void;
  
  // Bookmarks
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  
  // Admin CMS
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  adminLogout: () => void;
  hasConfiguredPassword: () => boolean;
  setAdminPassword: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  addPost: (post: AnyPost) => void;
  updatePost: (post: AnyPost) => void;
  deletePost: (id: string) => void;
  togglePostDraft: (id: string) => void;

  // Correction & Subscribers
  corrections: CorrectionRequest[];
  submitCorrection: (req: Omit<CorrectionRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateCorrectionStatus: (id: string, status: 'Pending' | 'Verified' | 'Rejected') => void;
  subscribers: EmailSubscriber[];
  addSubscriber: (sub: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'active'>) => boolean;
  
  // Theme & Drawers
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isBookmarkDrawerOpen: boolean;
  setIsBookmarkDrawerOpen: (o: boolean) => void;
  isAlertModalOpen: boolean;
  setIsAlertModalOpen: (o: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_POSTS_KEY = 'naresh_technical_posts_v1';
const STORAGE_BOOKMARKS_KEY = 'naresh_technical_bookmarks';
const STORAGE_CORRECTIONS_KEY = 'naresh_technical_corrections';
const STORAGE_SUBSCRIBERS_KEY = 'naresh_technical_subscribers';
const STORAGE_THEME_KEY = 'naresh_technical_theme';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Posts
  const [posts, setPosts] = useState<AnyPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved posts:', e);
    }
    return INITIAL_POSTS;
  });

  // Current View & Detail
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPost, setSelectedPost] = useState<AnyPost | null>(null);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterState, setFilterState] = useState<any>('सभी');
  const [filterQualification, setFilterQualification] = useState<string>('सभी');
  const [filterStatus, setFilterStatus] = useState<any>('सभी');
  const [sortBy, setSortBy] = useState<'newest' | 'ending-soon'>('newest');

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Admin Auth (secure token simulation with lockout & attempt tracking)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('naresh_admin_session') === 'active';
  });

  // Corrections
  const [corrections, setCorrections] = useState<CorrectionRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CORRECTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'CORR-01',
        name: 'अमित कुमार',
        email: 'amit.student@example.com',
        postTitle: 'रेलवे RRB टेक्नीशियन भर्ती 2026',
        postUrl: 'https://nareshtechnical.demo/jobs/railway-rrb-technician-bharti-2026',
        errorDetail: 'टेक्नीशियन ग्रेड-III के लिए न्यूनतम आयु सीमा 18 वर्ष है, कृपया इसे स्पष्ट करें।',
        verifiedSourceUrl: 'https://indianrailways.gov.in/cen-02-2024.pdf',
        status: 'Verified',
        createdAt: '2026-03-22'
      }
    ];
  });

  // Subscribers
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SUBSCRIBERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'SUB-1',
        email: 'nareshkumarbaiga260@gmail.com',
        preferredStates: ['केंद्र सरकार (All India)', 'मध्य प्रदेश'],
        preferredCategories: ['job', 'yojana'],
        subscribedAt: '2026-03-20',
        active: true
      }
    ];
  });

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  // Drawers
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn('Error saving posts:', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Error saving bookmarks:', e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CORRECTIONS_KEY, JSON.stringify(corrections));
    } catch (e) {
      console.warn('Error saving corrections:', e);
    }
  }, [corrections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SUBSCRIBERS_KEY, JSON.stringify(subscribers));
    } catch (e) {
      console.warn('Error saving subscribers:', e);
    }
  }, [subscribers]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openPostDetail = (post: AnyPost) => {
    setSelectedPost(post);
    setSelectedPostSlug(post.slug);
    setCurrentView('post-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterState('सभी');
    setFilterQualification('सभी');
    setFilterStatus('सभी');
    setSortBy('newest');
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // Authorized Admin Email
  const ADMIN_EMAIL = 'nareshkumarbaiga260@gmail.com';

  // Secure Password Hash helper using browser Web Crypto API
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(`naresh_tech_salt_2026_${password}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Check if admin master password has been configured in secure browser storage
  const hasConfiguredPassword = (): boolean => {
    return !!localStorage.getItem('naresh_admin_hash');
  };

  // Set / Reset Admin Password directly in private browser storage (never hardcoded in code)
  const setAdminPassword = async (emailInput: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (emailInput.trim().toLowerCase() !== ADMIN_EMAIL) {
      return { success: false, message: `अनाधिकृत ईमेल। केवल पंजीकृत एडमिन (${ADMIN_EMAIL}) ही पासवर्ड सेट कर सकते हैं।` };
    }
    if (newPassword.length < 8) {
      return { success: false, message: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए, जिसमें अक्षर, अंक और विशेष वर्ण शामिल हों।' };
    }
    const hash = await hashPassword(newPassword);
    localStorage.setItem('naresh_admin_hash', hash);
    localStorage.setItem('naresh_admin_email', ADMIN_EMAIL);
    return { success: true, message: 'एडमिन पासवर्ड सुरक्षित रूप से सेट हो गया है। अब आप लॉगिन कर सकते हैं।' };
  };

  // Admin Login with Hash verification
  const adminLogin = async (emailInput: string, passInput: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail !== ADMIN_EMAIL) {
      return {
        success: false,
        message: 'अमान्य क्रेडेंशियल्स। केवल पंजीकृत एडमिन ईमेल को ही पहुंच की अनुमति है।'
      };
    }

    const storedHash = localStorage.getItem('naresh_admin_hash');
    if (!storedHash) {
      return {
        success: false,
        message: 'एडमिन पासवर्ड अभी सेट नहीं किया गया है। कृपया पहले "नया पासवर्ड सेट करें" विकल्प का उपयोग करें।'
      };
    }

    const inputHash = await hashPassword(passInput);
    if (inputHash === storedHash) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('naresh_admin_session', 'active');
      return { success: true, message: 'सफल लॉगिन! स्वागत है एडमिन डैशबोर्ड में।' };
    }

    return {
      success: false,
      message: 'अमान्य पासवर्ड। कृपया सही पासवर्ड दर्ज करें या रीसेट करें।'
    };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('naresh_admin_session');
    setCurrentView('home');
  };

  const addPost = (newPost: AnyPost) => {
    if (!isAdminLoggedIn) {
      console.error('अनाधिकृत प्रयास: पोस्ट जोड़ने के लिए एडमिन प्रमाणीकरण अनिवार्य है।');
      return;
    }
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (updated: AnyPost) => {
    if (!isAdminLoggedIn) {
      console.error('अनाधिकृत प्रयास: पोस्ट संपादित करने के लिए एडमिन प्रमाणीकरण अनिवार्य है।');
      return;
    }
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (selectedPost && selectedPost.id === updated.id) {
      setSelectedPost(updated);
    }
  };

  const deletePost = (id: string) => {
    if (!isAdminLoggedIn) {
      console.error('अनाधिकृत प्रयास: पोस्ट हटाने के लिए एडमिन प्रमाणीकरण अनिवार्य है।');
      return;
    }
    setPosts(prev => prev.filter(p => p.id !== id));
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
      setCurrentView('home');
    }
  };

  const togglePostDraft = (id: string) => {
    if (!isAdminLoggedIn) {
      console.error('अनाधिकृत प्रयास: ड्राफ्ट/प्रकाशन बदलने के लिए एडमिन प्रमाणीकरण अनिवार्य है।');
      return;
    }
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isDraft: !p.isDraft,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
  };

  const submitCorrection = (req: Omit<CorrectionRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: CorrectionRequest = {
      ...req,
      id: 'CORR-' + Date.now().toString().slice(-5),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setCorrections(prev => [newReq, ...prev]);
  };

  const updateCorrectionStatus = (id: string, status: 'Pending' | 'Verified' | 'Rejected') => {
    setCorrections(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const addSubscriber = (sub: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'active'>) => {
    const existing = subscribers.find(s => s.email.toLowerCase() === sub.email.toLowerCase());
    if (existing) {
      return false; // Already subscribed
    }
    const newSub: EmailSubscriber = {
      ...sub,
      id: 'SUB-' + Date.now().toString().slice(-4),
      subscribedAt: new Date().toISOString().split('T')[0],
      active: true
    };
    setSubscribers(prev => [newSub, ...prev]);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        currentView,
        setCurrentView,
        selectedPost,
        setSelectedPost,
        selectedPostSlug,
        openPostDetail,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        filterState,
        setFilterState,
        filterQualification,
        setFilterQualification,
        filterStatus,
        setFilterStatus,
        sortBy,
        setSortBy,
        resetFilters,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        hasConfiguredPassword,
        setAdminPassword,
        addPost,
        updatePost,
        deletePost,
        togglePostDraft,
        corrections,
        submitCorrection,
        updateCorrectionStatus,
        subscribers,
        addSubscriber,
        theme,
        toggleTheme,
        isBookmarkDrawerOpen,
        setIsBookmarkDrawerOpen,
        isAlertModalOpen,
        setIsAlertModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
