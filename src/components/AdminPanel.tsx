import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth, AUTHORIZED_ADMIN_EMAIL } from '../AuthContext';
import { AnyPost, JobPostDetails, YojanaPostDetails, IndianState, PostCategory, PostStatus, QualificationLevel } from '../types';
import { STATES_LIST, QUALIFICATIONS_LIST } from '../data/initialData';
import { 
  Lock, 
  KeyRound, 
  LogOut, 
  PlusCircle, 
  ListFilter, 
  FileEdit, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  Clock, 
  Users, 
  HelpCircle, 
  Send,
  Save,
  Globe,
  RefreshCw,
  Search,
  BookOpen,
  X
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    adminLogin, 
    adminLogout, 
    hasConfiguredPassword,
    setAdminPassword,
    posts, 
    addPost, 
    updatePost, 
    deletePost, 
    togglePostDraft,
    corrections,
    updateCorrectionStatus,
    subscribers,
    openPostDetail,
    setCurrentView
  } = useApp();

  const { isAuthenticated, user, login: authLogin, logout: authLogout } = useAuth();

  // Login & Setup Form States
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Setup / Reset mode state
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(() => !hasConfiguredPassword());
  const [resetTokenVerified, setResetTokenVerified] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'posts' | 'new-post' | 'corrections' | 'subscribers' | 'setup-guide'>('posts');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // New Post Form State
  const [category, setCategory] = useState<PostCategory>('job');
  const [state, setState] = useState<IndianState>('केंद्र सरकार (All India)');
  const [qualification, setQualification] = useState<QualificationLevel>('स्नातक (Graduate)');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastDate, setLastDate] = useState('');
  const [status, setStatus] = useState<PostStatus>('Open');
  const [totalVacancies, setTotalVacancies] = useState('');
  const [postNames, setPostNames] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [payScale, setPayScale] = useState('');
  const [applicationFee, setApplicationFee] = useState('');
  const [selectionProcess, setSelectionProcess] = useState('');
  const [examDate, setExamDate] = useState('');
  const [requiredDocs, setRequiredDocs] = useState('');
  const [applySteps, setApplySteps] = useState('');
  const [officialNotificationUrl, setOfficialNotificationUrl] = useState('');
  const [officialApplyUrl, setOfficialApplyUrl] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [formValidationNotice, setFormValidationNotice] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Filter posts inside admin list
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Handle Lockout timer
  useEffect(() => {
    if (lockoutSeconds > 0) {
      const timer = setTimeout(() => setLockoutSeconds(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutSeconds]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setLoginError('');
    setLoginSuccess('');

    // 1. Authenticate against AuthContext (validates hardcoded nareshkumarbaiga260@gmail.com)
    const authResult = authLogin(email, password);
    if (!authResult.success) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      setLoginError(authResult.message);
      if (newAttempts >= 5) {
        setLockoutSeconds(60);
        setLoginError('अत्यधिक असफल प्रयास! सुरक्षा कारणों से 60 सेकंड के लिए लॉगिन अवरुद्ध किया गया है।');
      }
      return;
    }

    // 2. Validate admin password hash if configured
    if (hasConfiguredPassword()) {
      const result = await adminLogin(email, password);
      if (!result.success) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setLoginError(result.message);
        if (newAttempts >= 5) {
          setLockoutSeconds(60);
          setLoginError('अत्यधिक असफल प्रयास! सुरक्षा कारणों से 60 सेकंड के लिए लॉगिन अवरुद्ध किया गया है।');
        }
        return;
      }
    } else {
      // First time login - prompt to set master password or activate session
      sessionStorage.setItem('naresh_admin_session', 'active');
    }

    setLoginError('');
    setLoginAttempts(0);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    adminLogout();
    authLogout();
    setActiveTab('posts');
  };

  const handleSetInitialPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (password !== confirmPassword) {
      setLoginError('दोनों पासवर्ड समान नहीं हैं। कृपया पुनः जाँचें।');
      return;
    }

    const result = await setAdminPassword(email, password);
    if (!result.success) {
      setLoginError(result.message);
    } else {
      setLoginSuccess(result.message);
      setIsSettingNewPassword(false);
      setResetTokenVerified(false);
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleGenerateResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (email.trim().toLowerCase() !== 'nareshkumarbaiga260@gmail.com') {
      setLoginError('अनाधिकृत ईमेल। केवल पंजीकृत एडमिन (nareshkumarbaiga260@gmail.com) ही पासवर्ड रीसेट कर सकते हैं।');
      return;
    }
    const token = 'SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    setGeneratedToken(token);
    setResetTokenVerified(true);
    setLoginSuccess(`सुरक्षित रीसेट सत्र सक्रिय किया गया (प्रमाणीकरण टोकन: ${token})। कृपया नीचे अपना नया पासवर्ड दर्ज करें।`);
  };

  const handleResetForm = () => {
    setEditingPostId(null);
    setTitle('');
    setDepartment('');
    setSummary('');
    setTotalVacancies('');
    setPostNames('');
    setAgeLimit('');
    setPayScale('');
    setApplicationFee('');
    setSelectionProcess('');
    setExamDate('');
    setRequiredDocs('');
    setApplySteps('');
    setOfficialNotificationUrl('');
    setOfficialApplyUrl('');
    setSourceName('');
    setSeoTitle('');
    setSeoDescription('');
    setIsDraft(false);
    setFormValidationNotice('');
    setShowLivePreview(false);
  };

  const startEditPost = (post: AnyPost) => {
    setEditingPostId(post.id);
    setCategory(post.category);
    setState(post.state);
    setQualification(post.qualification);
    setTitle(post.title);
    setDepartment(post.department);
    setSummary(post.summary);
    setStartDate(post.startDate);
    setLastDate(post.lastDate);
    setStatus(post.status);
    setOfficialNotificationUrl(post.officialNotificationUrl);
    setOfficialApplyUrl(post.officialApplyUrl);
    setSourceName(post.sourceName);
    setSeoTitle(post.seoTitle || '');
    setSeoDescription(post.seoDescription || '');
    setIsDraft(post.isDraft);

    const job = post as JobPostDetails;
    setTotalVacancies(job.totalVacancies || '');
    setPostNames(job.postNames?.join(', ') || '');
    setAgeLimit(job.ageLimit || '');
    setPayScale(job.payScale || '');
    setApplicationFee(job.applicationFee || '');
    setSelectionProcess(job.selectionProcess?.join('\n') || '');
    setExamDate(job.examDate || '');
    setRequiredDocs(job.requiredDocuments?.join('\n') || '');
    setApplySteps(job.applicationSteps?.join('\n') || '');

    setActiveTab('new-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (asDraft: boolean) => {
    // Security Guard: Only authenticated admin can save posts
    if (!isAuthenticated) {
      setFormValidationNotice('सुरक्षा अवरोध: केवल पासवर्ड से प्रमाणित एडमिन ही पोस्ट बना या अपडेट कर सकते हैं।');
      return;
    }

    // Validation
    if (!title.trim() || !department.trim() || !lastDate || !officialNotificationUrl || !sourceName) {
      setFormValidationNotice('कृपया अनिवार्य फ़ील्ड भरें: शीर्षक, विभाग, अंतिम तिथि, आधिकारिक नोटिफिकेशन URL और सूचना का स्रोत।');
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);

    const currentDate = new Date().toISOString().split('T')[0];

    const postBase = {
      id: editingPostId || `POST-${Date.now().toString().slice(-5)}`,
      slug: editingPostId ? (posts.find(p => p.id === editingPostId)?.slug || slug) : slug,
      category,
      title: title.trim(),
      department: department.trim(),
      summary: summary.trim() || `${department} द्वारा ${title} के अंतर्गत आधिकारिक सूचना जारी।`,
      state,
      qualification,
      startDate: startDate || currentDate,
      lastDate,
      status,
      officialNotificationUrl: officialNotificationUrl.trim(),
      officialApplyUrl: officialApplyUrl.trim() || officialNotificationUrl.trim(),
      sourceName: sourceName.trim(),
      publishedAt: editingPostId ? (posts.find(p => p.id === editingPostId)?.publishedAt || currentDate) : currentDate,
      updatedAt: currentDate,
      isDraft: asDraft,
      isDemo: false,
      seoTitle: seoTitle.trim() || `${title} - Naresh Technical`,
      seoDescription: seoDescription.trim() || summary.trim()
    };

    let fullPost: AnyPost;

    if (category === 'yojana') {
      fullPost = {
        ...postBase,
        schemeName: title.trim(),
        schemeScope: state.includes('केंद्र') ? 'केंद्र सरकार (Central)' : 'राज्य सरकार (State)',
        objective: summary.trim(),
        eligibility: selectionProcess ? selectionProcess.split('\n').filter(Boolean) : ['पात्र परिवार एवं नागरिक'],
        benefits: totalVacancies ? [totalVacancies] : ['योजना नियमानुसार वित्तीय/सामाजिक सहायता'],
        requiredDocuments: requiredDocs ? requiredDocs.split('\n').filter(Boolean) : ['आधार कार्ड', 'निवास प्रमाणपत्र'],
        applicationSteps: applySteps ? applySteps.split('\n').filter(Boolean) : ['आधिकारिक पोर्टल पर जाएँ', 'आवेदन पत्र भरें']
      } as YojanaPostDetails;
    } else {
      fullPost = {
        ...postBase,
        totalVacancies: totalVacancies.trim() || 'विज्ञप्ति अनुसार',
        postNames: postNames ? postNames.split(',').map(s => s.trim()).filter(Boolean) : [title],
        ageLimit: ageLimit.trim() || 'नियमानुसार',
        payScale: payScale.trim() || 'नियमानुसार',
        applicationFee: applicationFee.trim() || 'विज्ञप्ति अनुसार',
        selectionProcess: selectionProcess ? selectionProcess.split('\n').filter(Boolean) : ['लिखित परीक्षा', 'दस्तावेज सत्यापन'],
        examDate: examDate.trim(),
        requiredDocuments: requiredDocs ? requiredDocs.split('\n').filter(Boolean) : ['आधार कार्ड', 'शैक्षणिक प्रमाणपत्र'],
        applicationSteps: applySteps ? applySteps.split('\n').filter(Boolean) : ['आधिकारिक वेबसाइट पर जाएं', 'पंजीकरण कर आवेदन भरें']
      } as JobPostDetails;
    }

    if (editingPostId) {
      updatePost(fullPost);
    } else {
      addPost(fullPost);
    }

    handleResetForm();
    setActiveTab('posts');
  };

  // Filter posts
  const filteredAdminPosts = posts.filter(p => {
    const matchStatus = adminStatusFilter === 'all' 
      ? true 
      : adminStatusFilter === 'published' ? !p.isDraft : p.isDraft;
    const matchSearch = !adminSearch || 
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.department.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(adminSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Calculate Metrics
  const publishedCount = posts.filter(p => !p.isDraft).length;
  const draftsCount = posts.filter(p => p.isDraft).length;
  const jobsCount = posts.filter(p => p.category === 'job').length;
  const yojanaCount = posts.filter(p => p.category === 'yojana').length;
  const pendingCorrections = corrections.filter(c => c.status === 'Pending').length;

  /* ========================================================
     ADMIN DASHBOARD WITH SECURITY LAYER
     ======================================================== */
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* 1. Modal for Admin Login & Password Setup */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setLoginError('');
                setLoginSuccess('');
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {isSettingNewPassword 
                  ? 'एडमिन पासवर्ड सेटअप / रीसेट' 
                  : 'सुरक्षित एडमिन लॉगिन (Admin Login)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                अधिकृत एडमिन: <strong className="text-amber-600 dark:text-amber-400">{AUTHORIZED_ADMIN_EMAIL}</strong>
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-lg text-xs text-rose-700 dark:text-rose-300">
                {loginError}
              </div>
            )}

            {loginSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
                {loginSuccess}
              </div>
            )}

            {lockoutSeconds > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-lg text-xs text-amber-800 dark:text-amber-300 font-mono text-center">
                सुरक्षा अवरोध सक्रिय: कृपया {lockoutSeconds} सेकंड प्रतीक्षा करें।
              </div>
            )}

            {/* MODE A: Set / Reset Master Password Directly & Privately */}
            {isSettingNewPassword ? (
              <form onSubmit={handleSetInitialPassword} className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    🔒 निजी सुरक्षा निर्देश:
                  </span>
                  <p>
                    आप अपना नया पासवर्ड सीधे इस सुरक्षित कंसोल पर सेट कर रहे हैं। आपका पासवर्ड किसी कोड, प्रॉम्प्ट या सार्वजनिक डेटाबेस में कभी नहीं जाएगा। यह ब्राउज़र के <strong>Web Crypto API (SHA-256 + Salt)</strong> द्वारा सुरक्षित रहेगा।
                  </p>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    अधिकृत एडमिन ईमेल:
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    नया गुप्त पासवर्ड (कम से कम 8 अक्षर) *
                  </label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="नया मजबूत पासवर्ड दर्ज करें"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    नए पासवर्ड की पुनः पुष्टि करें *
                  </label>
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="वही पासवर्ड दोबारा दर्ज करें"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Lock className="w-4 h-4" />
                  <span>सुरक्षित पासवर्ड सहेजें (Save Password)</span>
                </button>

                {hasConfiguredPassword() && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingNewPassword(false);
                      setLoginError('');
                      setLoginSuccess('');
                      setPassword('');
                      setConfirmPassword('');
                    }}
                    className="w-full py-1 text-center text-xs text-slate-500 hover:underline"
                  >
                    वापस लॉगिन स्क्रीन पर जाएँ
                  </button>
                )}
              </form>
            ) : (
              /* MODE B: Standard Secure Login Form */
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    एडमिन ईमेल आईडी:
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={AUTHORIZED_ADMIN_EMAIL}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300">
                      एडमिन पासवर्ड:
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingNewPassword(true);
                        setLoginError('');
                        setLoginSuccess('');
                      }}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      पासवर्ड रीसेट लिंक / बदलें
                    </button>
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={lockoutSeconds > 0}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>लॉगिन करें (Secure Access)</span>
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSettingNewPassword(true);
                      setLoginError('');
                      setLoginSuccess('');
                    }}
                    className="text-[11px] text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
                  >
                    नया पासवर्ड सेट करना चाहते हैं? यहाँ क्लिक करें
                  </button>
                </div>
              </form>
            )}

            {/* Privacy & Zero-Knowledge Guarantee Note */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>शून्य-ज्ञान सुरक्षा (Zero-Knowledge Privacy):</span>
              </div>
              <p className="leading-relaxed">
                • आपका पासवर्ड कभी भी कोड, डेटाबेस, प्रॉम्प्ट या चैट में नहीं जाता।<br />
                • केवल अधिकृत ईमेल ({AUTHORIZED_ADMIN_EMAIL}) को ही प्रशासनिक पहुंच प्राप्त है।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Mandatory Security Layer Banner when Unauthenticated */}
      {!isAuthenticated && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400/80 dark:border-amber-700/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-amber-950 dark:text-amber-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  सुरक्षा लेयर सक्रिय (Security Protection Active)
                </h3>
                <span className="text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
                  केवल पठन मोड (Read-Only)
                </span>
              </div>
              <p className="text-xs text-amber-900/80 dark:text-amber-200/90 mt-1 leading-relaxed">
                सुरक्षा प्रोटोकॉल लागू: अनाधिकृत उपयोगकर्ताओं के लिए एडमिन डैशबोर्ड के अंदर मौजूद <strong>'नई पोस्ट जोड़ें' (New Post Editor)</strong> और <strong>'डिलीट पोस्ट' (Delete Post)</strong> बटन को पूरी तरह छिपा दिया गया है। इन संवेदनशील संपादन कार्यों के लिए केवल पासवर्ड से ऑथेंटिकेटेड एडमिन ({AUTHORIZED_ADMIN_EMAIL}) को ही पहुंच प्राप्त है।
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSettingNewPassword(!hasConfiguredPassword());
              setShowLoginModal(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow flex items-center justify-center gap-2 shrink-0"
          >
            <KeyRound className="w-4 h-4" />
            <span>पासवर्ड से लॉगिन करें</span>
          </button>
        </div>
      )}

      {/* Top Admin Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Naresh Technical एडमिन कंसोल
            </h1>
            {isAuthenticated ? (
              <span className="text-[11px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>सक्रिय एडमिन सत्र</span>
              </span>
            ) : (
              <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>सुरक्षित दृश्य मोड (अनलॉगिन)</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAuthenticated 
              ? `अधिकृत खाता: ${AUTHORIZED_ADMIN_EMAIL} (सामग्री निर्माण, संपादन व विलोपन अधिकार सक्रिय)`
              : 'सामग्री व सांख्यिकी दृश्य - नई पोस्ट जोड़ने व डिलीट करने हेतु पासवर्ड प्रमाणीकरण अनिवार्य'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentView('setup-guide')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>सेटअप SOP</span>
          </button>
          
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>लॉगआउट (Logout)</span>
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsSettingNewPassword(!hasConfiguredPassword());
                setShowLoginModal(true);
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>एडमिन लॉगिन</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">कुल प्रकाशित पोस्ट्स</span>
          <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{publishedCount}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">सहेजे गए ड्राफ्ट्स</span>
          <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">{draftsCount}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">सरकारी भर्तियाँ (Jobs)</span>
          <span className="text-2xl font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">{jobsCount}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">सरकारी योजनाएँ</span>
          <span className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{yojanaCount}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">लंबित सुधार अनुरोध</span>
          <span className="text-2xl font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">{pendingCorrections}</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('posts')}
          className={`py-2.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'posts'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>सभी पोस्ट्स प्रबंधन ({posts.length})</span>
        </button>

        {/* New Post Button: Strictly hidden unless authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => {
              handleResetForm();
              setActiveTab('new-post');
            }}
            className={`py-2.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'new-post'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{editingPostId ? 'पोस्ट संपादित करें (Edit Post)' : '+ नई पोस्ट जोड़ें (New Post)'}</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('corrections')}
          className={`py-2.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'corrections'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>सुधार अनुरोध ({corrections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`py-2.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'subscribers'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>अलर्ट सब्सक्राइबर्स ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('setup-guide')}
          className={`py-2.5 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'setup-guide'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>उत्पादन व होस्टिंग SOP</span>
        </button>
      </div>

      {/* ========================================================
         TAB 1: POSTS LIST MANAGEMENT
         ======================================================== */}
      {activeTab === 'posts' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="शीर्षक या विभाग खोजें..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">स्थिति:</span>
              <button 
                onClick={() => setAdminStatusFilter('all')}
                className={`px-2.5 py-1 rounded-md ${adminStatusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
              >
                सभी ({posts.length})
              </button>
              <button 
                onClick={() => setAdminStatusFilter('published')}
                className={`px-2.5 py-1 rounded-md ${adminStatusFilter === 'published' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
              >
                प्रकाशित ({publishedCount})
              </button>
              <button 
                onClick={() => setAdminStatusFilter('draft')}
                className={`px-2.5 py-1 rounded-md ${adminStatusFilter === 'draft' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
              >
                ड्राफ्ट्स ({draftsCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">शीर्षक व श्रेणी</th>
                  <th className="py-2.5 px-3">विभाग / राज्य</th>
                  <th className="py-2.5 px-3">अंतिम तिथि</th>
                  <th className="py-2.5 px-3">आवेदन स्थिति</th>
                  <th className="py-2.5 px-3">प्रकाशन स्थिति</th>
                  <th className="py-2.5 px-3 text-right">कार्रवाई (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAdminPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      कोई पोस्ट नहीं मिली।
                    </td>
                  </tr>
                ) : (
                  filteredAdminPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="uppercase text-amber-600 font-medium">{post.category}</span>
                          <span>·</span>
                          <span>ID: {post.id}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[180px]">
                          {post.department}
                        </div>
                        <div className="text-[11px] text-slate-400">{post.state}</div>
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                        {post.lastDate}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          post.status === 'Open' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          post.status === 'Upcoming' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {post.status}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {isAuthenticated ? (
                          <button
                            onClick={() => togglePostDraft(post.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                              post.isDraft 
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }`}
                            title="क्लिक करके स्थिति बदलें"
                          >
                            {post.isDraft ? 'ड्राफ्ट (Draft)' : 'प्रकाशित (Live)'}
                          </button>
                        ) : (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            post.isDraft ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {post.isDraft ? 'ड्राफ्ट (Draft)' : 'प्रकाशित (Live)'}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openPostDetail(post)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
                            title="प्रीव्यू देखें"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* SENSITIVE ADMIN OPERATIONS: Strictly restricted to authenticated admin */}
                          {isAuthenticated && (
                            <>
                              <button
                                onClick={() => startEditPost(post)}
                                className="p-1.5 text-amber-600 hover:text-amber-700 rounded"
                                title="संपादित करें"
                              >
                                <FileEdit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`क्या आप निश्चित रूप से "${post.title}" को हटाना चाहते हैं?`)) {
                                    deletePost(post.id);
                                  }
                                }}
                                className="p-1.5 text-rose-600 hover:text-rose-700 rounded"
                                title="हटाएँ (डिलीट पोस्ट / Delete Post)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
         TAB 2: ADD / EDIT POST FORM (Strictly restricted to authenticated admin)
         ======================================================== */}
      {isAuthenticated && activeTab === 'new-post' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingPostId ? 'पोस्ट का संपादन करें (Edit Post)' : 'नई सरकारी भर्ती या योजना पोस्ट बनाएँ'}
              </h2>
              <p className="text-xs text-slate-500">
                कृपया प्रामाणिक आधिकारिक स्रोत (Official Notification) के आधार पर ही जानकारी भरें।
              </p>
            </div>

            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLivePreview ? 'प्रीव्यू छिपाएँ' : 'लाइव प्रीव्यू देखें'}</span>
            </button>
          </div>

          {formValidationNotice && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-lg text-xs">
              ⚠️ {formValidationNotice}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* Category */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                पोस्ट प्रकार (Post Category) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                <option value="job">सरकारी नौकरी (Job)</option>
                <option value="yojana">सरकारी योजना (Yojana)</option>
                <option value="admit-card">Admit Card</option>
                <option value="result">Result</option>
                <option value="answer-key">Answer Key</option>
                <option value="syllabus">Syllabus</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                राज्य / क्षेत्र (State) *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                {STATES_LIST.filter(s => s !== 'सभी राज्य / All India').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                न्यूनतम योग्यता (Qualification) *
              </label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                {QUALIFICATIONS_LIST.filter(q => q !== 'सभी योग्यताएँ').map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs sm:text-sm">
              पोस्ट का मुख्य शीर्षक (Post Title) *
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="उदा. रेलवे RRB टेक्नीशियन भर्ती 2026: 9144 पदों पर ऑनलाइन आवेदन शुरू"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                विभाग / संस्था का नाम (Department / Org) *
              </label>
              <input 
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="उदा. रेलवे भर्ती बोर्ड (RRB) / Ministry of Rural Development"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                कुल पद / योजना अनुदान राशि *
              </label>
              <input 
                type="text"
                value={totalVacancies}
                onChange={(e) => setTotalVacancies(e.target.value)}
                placeholder="उदा. 9,144 पद / ₹1,20,000 वित्तीय अनुदान"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आवेदन शुरू होने की तारीख
              </label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आवेदन की अंतिम तारीख *
              </label>
              <input 
                type="date"
                required
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आवेदन स्थिति (Status) *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                <option value="Open">आवेदन चालू (Open)</option>
                <option value="Upcoming">जल्द आ रहा है (Upcoming)</option>
                <option value="Closed">आवेदन समाप्त (Closed)</option>
              </select>
            </div>
          </div>

          {/* Salary, Age Limit, Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आयु सीमा (Age Limit)
              </label>
              <input 
                type="text"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
                placeholder="उदा. 18 से 33 वर्ष (नियमानुसार छूट)"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                वेतन / Pay Scale
              </label>
              <input 
                type="text"
                value={payScale}
                onChange={(e) => setPayScale(e.target.value)}
                placeholder="उदा. पे लेवल-2 (₹19,900 - ₹63,200)"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आवेदन शुल्क (Application Fee)
              </label>
              <input 
                type="text"
                value={applicationFee}
                onChange={(e) => setApplicationFee(e.target.value)}
                placeholder="उदा. जनरल/OBC: ₹500, SC/ST: ₹250"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Short Overview */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs sm:text-sm">
              संक्षिप्त परिचय / उद्देश्य (Overview) *
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="इस भर्ती अथवा योजना का संक्षिप्त और स्पष्ट विवरण सरल हिंदी में..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            />
          </div>

          {/* Multi-line Lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                चयन प्रक्रिया / पात्रता बिंदु (प्रति पंक्ति एक)
              </label>
              <textarea
                rows={3}
                value={selectionProcess}
                onChange={(e) => setSelectionProcess(e.target.value)}
                placeholder="प्रथम चरण: कंप्यूटर लिखित परीक्षा&#10;द्वितीय चरण: दस्तावेज सत्यापन&#10;तृतीय चरण: मेडिकल टेस्ट"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आवश्यक दस्तावेज (प्रति पंक्ति एक)
              </label>
              <textarea
                rows={3}
                value={requiredDocs}
                onChange={(e) => setRequiredDocs(e.target.value)}
                placeholder="10वीं/12वीं अंकतालिका&#10;पहचान पत्र (आधार कार्ड)&#10;निवास एवं जाति प्रमाणपत्र"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>
          </div>

          {/* MANDATORY OFFICIAL SOURCES & LINKS */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>सत्यापन अनिवार्यता: केवल आधिकारिक स्रोत जोड़ें</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Notification PDF Link *
                </label>
                <input 
                  type="url"
                  required
                  value={officialNotificationUrl}
                  onChange={(e) => setOfficialNotificationUrl(e.target.value)}
                  placeholder="https://...gov.in/notice.pdf"
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Apply / Website Link *
                </label>
                <input 
                  type="url"
                  required
                  value={officialApplyUrl}
                  onChange={(e) => setOfficialApplyUrl(e.target.value)}
                  placeholder="https://...gov.in/apply"
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  सूचना का स्रोत (Source) *
                </label>
                <input 
                  type="text"
                  required
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="उदा. रोजगार समाचार अंक 42 / आयोग आधिकारिक पोर्टल"
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              फॉर्म रीसेट करें
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSavePost(true)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>ड्राफ्ट में सहेजें (Save as Draft)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSavePost(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>सीधे प्रकाशित करें (Publish Now)</span>
              </button>
            </div>
          </div>

          {/* Live Preview Box */}
          {showLivePreview && (
            <div className="mt-6 p-4 border border-dashed border-amber-400 rounded-xl bg-amber-50/20 dark:bg-amber-950/20">
              <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
                लाइव ड्राफ्ट प्रीव्यू (आगंतुक को ऐसे दिखेगा):
              </h4>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-amber-600 font-bold uppercase">{category}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{title || 'शीर्षक यहाँ दिखेगा'}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{summary || 'विवरण यहाँ दिखेगा...'}</p>
                <div className="mt-3 text-xs text-slate-500">
                  विभाग: {department || '-'} | योग्यता: {qualification} | अंतिम तिथि: {lastDate || '-'}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================
         TAB 3: CORRECTION REQUESTS MANAGEMENT
         ======================================================== */}
      {activeTab === 'corrections' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              पाठकों द्वारा भेजे गए सुधार अनुरोध (Correction Requests)
            </h2>
            <p className="text-xs text-slate-500">
              पाठकों द्वारा बताई गई संभावित त्रुटियों को सरकारी गजट से सत्यापित करें और स्थिति अपडेट करें।
            </p>
          </div>

          <div className="space-y-3">
            {corrections.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                वर्तमान में कोई सुधार अनुरोध लंबित नहीं है।
              </div>
            ) : (
              corrections.map((corr) => (
                <div key={corr.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{corr.postTitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      corr.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                      corr.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {corr.status === 'Verified' ? 'सत्यापित / सुधार पूर्ण' : corr.status === 'Rejected' ? 'अस्वीकृत' : 'सत्यापन प्रतीक्षित'}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
                    <strong>सूचित त्रुटि:</strong> {corr.errorDetail}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500">
                    <div>
                      प्रेषक: <strong>{corr.name}</strong> ({corr.email}) | तिथि: {corr.createdAt}
                    </div>

                    <div className="flex items-center gap-2">
                      {corr.verifiedSourceUrl && (
                        <a 
                          href={corr.verifiedSourceUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-amber-600 hover:underline"
                        >
                          साक्ष्य लिंक देखें ↗
                        </a>
                      )}

                      <button
                        onClick={() => updateCorrectionStatus(corr.id, 'Verified')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-medium"
                      >
                        सुधार स्वीकृत करें
                      </button>

                      <button
                        onClick={() => updateCorrectionStatus(corr.id, 'Rejected')}
                        className="px-2.5 py-1 bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded text-[11px]"
                      >
                        अस्वीकार करें
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
         TAB 4: SUBSCRIBERS LIST
         ======================================================== */}
      {activeTab === 'subscribers' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              ईमेल अलर्ट सब्सक्राइबर्स (Notification Subscribers)
            </h2>
            <p className="text-xs text-slate-500">
              इन उपयोगकर्ताओं ने अपनी पसंदीदा श्रेणियों और राज्यों के भर्ती नोटिफिकेशन प्राप्त करने की सहमति दी है।
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-500">
                  <th className="py-2.5 px-3">ईमेल आईडी</th>
                  <th className="py-2.5 px-3">पसंदीदा राज्य</th>
                  <th className="py-2.5 px-3">पसंदीदा श्रेणियां</th>
                  <th className="py-2.5 px-3">सदस्यता तिथि</th>
                  <th className="py-2.5 px-3">स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">{sub.email}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{sub.preferredStates.join(', ')}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{sub.preferredCategories.join(', ')}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{sub.subscribedAt}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                        सक्रिय
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
         TAB 5: PRODUCTION SETUP GUIDE
         ======================================================== */}
      {activeTab === 'setup-guide' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Naresh Technical: उत्पादन (Production) व होस्टिंग मार्गदर्शिका
            </h2>
            <p className="text-xs text-slate-500">
              इस वेबसाइट को इंटरनेट पर लाइव करने और सुरक्षित एडमिन सिस्टम सेटअप करने के 4 मुख्य चरण:
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-600 dark:text-amber-400">
                1. सुरक्षित Admin Login कैसे सेटअप होगा?
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                ब्राउज़र के फ्रंटएंड कोड में कभी भी असली पासवर्ड हार्डकोड नहीं करना चाहिए। उत्पादन में:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>विकल्प 1 (सर्वरलेस - Supabase / Firebase):</strong> Supabase Auth या Firebase Authentication जोड़ें। एडमिन ईमेल पर 2FA (Two-Factor Authentication) ऑन करें और केवल एडमिन यूज़र आईडी के लिए डेटाबेस में Row-Level-Security (RLS) लगाएं।</li>
                <li><strong>विकल्प 2 (Node.js Express Backend):</strong> पासवर्ड को <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">bcrypt</code> से हैश करें और लॉगिन पर <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">HttpOnly; Secure; SameSite=Strict</code> कुकी में JWT टोकन जारी करें।</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-600 dark:text-amber-400">
                2. पहली पोस्ट जोड़ने की मानक संचालन प्रक्रिया (SOP)
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li>संबंधित सरकारी विभाग के अधिकृत <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">.gov.in</code> या <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">.nic.in</code> डोमेन से मूल विज्ञापन PDF डाउनलोड करें।</li>
                <li>पोस्ट एडिटर में जाकर Title, Department, Total Vacancies, Age Limit, और Fee भरें।</li>
                <li>आधिकारिक PDF डाउनलोड लिंक और आधिकारिक आवेदन लिंक अनिवार्य रूप से दर्ज करें।</li>
                <li>"Draft Preview" बटन दबाकर मोबाइल और कंप्यूटर पर प्रीव्यू जाँचें।</li>
                <li>पुष्टि होने पर "सीधे प्रकाशित करें (Publish Now)" पर क्लिक करें।</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-600 dark:text-amber-400">
                3. डोमेन और होस्टिंग पर वेबसाइट कैसे पब्लिश होगी?
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>डोमेन:</strong> Namecheap या GoDaddy से <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">nareshtechnical.com</code> या <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">nareshtechnical.in</code> रजिस्टर करें।</li>
                <li><strong>होस्टिंग:</strong> इस कोड को GitHub पर पुश करें। फिर Cloudflare Pages या Vercel से कनेक्ट करें। यह बिल्कुल मुफ़्त, अति-तेज़ (CDN) और ऑटोमैटिक SSL सर्टिफिकेट प्रदान करता है।</li>
                <li>DNS में CNAME रिकॉर्ड जोड़कर अपने कस्टम डोमेन को जोड़ें।</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-600 dark:text-amber-400">
                4. कौन-सी थर्ड-पार्टी सर्विसेज और क्रेडेंशियल्स जोड़ने होंगे?
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>Google Search Console:</strong> साइटमैप (<code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">sitemap.xml</code>) सबमिट कर गूगल सर्च में पोस्ट्स को इंडेक्स कराने हेतु।</li>
                <li><strong>SMTP ईमेल डिलीवरी:</strong> Brevo / Resend API से संपर्क फॉर्म और सुधार अनुरोधों के अलर्ट ईमेल प्राप्त करने हेतु।</li>
                <li><strong>Google Analytics 4 / Cloudflare Analytics:</strong> विज़िटर्स ट्रैफिक और लोकप्रिय जॉब्स देखने हेतु।</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
