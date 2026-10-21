import React, { useState } from 'react';
import { AnyPost, JobPostDetails, YojanaPostDetails } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Building, 
  Award, 
  Clock, 
  Bookmark, 
  Share2, 
  Printer, 
  HelpCircle,
  Flag,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface PostDetailModalProps {
  post: AnyPost;
  onBack: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onBack }) => {
  const { setCurrentView, toggleBookmark, isBookmarked } = useApp();
  const [copied, setCopied] = useState(false);
  const bookmarked = isBookmarked(post.id);

  const isJob = post.category !== 'yojana';
  const job = post as JobPostDetails;
  const yojana = post as YojanaPostDetails;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`*${post.title}*\nविस्तार से पढ़ें Naresh Technical पर: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCorrectionJump = () => {
    setCurrentView('correction');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <button onClick={onBack} className="hover:text-amber-600 dark:hover:text-amber-400 font-medium">
          होम
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="capitalize">{post.category === 'job' ? 'सरकारी भर्ती' : post.category === 'yojana' ? 'सरकारी योजनाएँ' : post.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Back button & Action Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सूची पर वापस जाएँ (Back to List)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              bookmarked 
                ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
            title="सहेजें"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{bookmarked ? 'सहेजा गया' : 'बुकमार्क'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg border bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs flex items-center gap-1"
            title="लिंक कॉपी करें"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'कॉपी हो गया' : 'शेयर'}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-2.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
            title="WhatsApp पर शेयर करें"
          >
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg border bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-xs hidden sm:flex items-center gap-1"
            title="प्रिंट निकालें"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Article */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Statutory Post Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-xl p-4 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Naresh Technical स्वतंत्र सत्यापन सूचना</span>
          </div>
          <p>
            यह पोस्ट अभ्यर्थियों की सुविधा हेतु आधिकारिक प्रेस नोट, रोजगार समाचार एवं विभागीय गजट के आधार पर तैयार की गई है। 
            <strong>Naresh Technical किसी सरकारी विभाग का प्रतिनिधित्व नहीं करता है।</strong> आवेदन करने अथवा शुल्क जमा करने से पहले नीचे दिए गए “आधिकारिक नोटिफिकेशन लिंक” से नियमों की पुष्टि स्वयं करें।
          </p>
        </div>

        {/* Header Block */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
              {post.category === 'job' ? 'सरकारी भर्ती' : post.category === 'yojana' ? 'सरकारी योजना' : post.category}
            </span>
            <span>·</span>
            <span>{post.state}</span>
            <span>·</span>
            <span>अंतिम अपडेट: {post.updatedAt}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-3">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="block text-slate-500 dark:text-slate-400 mb-0.5">संस्था / विभाग</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{post.department}</span>
          </div>
          <div>
            <span className="block text-slate-500 dark:text-slate-400 mb-0.5">
              {isJob ? 'कुल रिक्तियां' : 'योजना क्षेत्र'}
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {isJob ? job.totalVacancies : yojana.schemeScope}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 dark:text-slate-400 mb-0.5">आवेदन की अंतिम तिथि</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{post.lastDate}</span>
          </div>
          <div>
            <span className="block text-slate-500 dark:text-slate-400 mb-0.5">आवेदन स्थिति</span>
            <span className={`font-semibold ${post.status === 'Open' ? 'text-emerald-600' : post.status === 'Upcoming' ? 'text-amber-600' : 'text-rose-600'}`}>
              {post.status === 'Open' ? 'चालू (Open)' : post.status === 'Upcoming' ? 'आगामी (Upcoming)' : 'समाप्त (Closed)'}
            </span>
          </div>
        </div>

        {/* Detailed Information Tables */}
        {isJob ? (
          /* JOB DETAILS */
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
              भर्ती विवरण व पात्रता शर्तें (Eligibility & Criteria)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold w-1/3">
                      पदों के नाम (Post Names)
                    </th>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      {job.postNames?.join(', ') || 'विज्ञप्ति अनुसार'}
                    </td>
                  </tr>

                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
                      न्यूनतम शैक्षणिक योग्यता
                    </th>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 font-medium">
                      {job.qualification}
                    </td>
                  </tr>

                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
                      आयु सीमा (Age Limit)
                    </th>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      {job.ageLimit}
                    </td>
                  </tr>

                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
                      वेतनमान (Pay Scale)
                    </th>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      {job.payScale}
                    </td>
                  </tr>

                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
                      आवेदन शुल्क (Fee)
                    </th>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      {job.applicationFee}
                    </td>
                  </tr>

                  {job.examDate && (
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="py-2.5 px-3 text-left bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold">
                        परीक्षा तिथि (Exam Date)
                      </th>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200 font-mono">
                        {job.examDate}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Selection Process */}
            {job.selectionProcess && job.selectionProcess.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  चयन प्रक्रिया (Selection Process)
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {job.selectionProcess.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Documents */}
            {job.requiredDocuments && job.requiredDocuments.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  आवेदन हेतु आवश्यक दस्तावेज (Required Documents)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {job.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Steps */}
            {job.applicationSteps && job.applicationSteps.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  ऑनलाइन आवेदन कैसे करें (How to Apply Step-by-Step)
                </h3>
                <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {job.applicationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold font-mono text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-xs">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : (
          /* YOJANA DETAILS */
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
              योजना का उद्देश्य व मिलने वाले लाभ (Benefits & Objective)
            </h2>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">योजना का मुख्य उद्देश्य:</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{yojana.objective}</p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                योजना के मुख्य लाभ (Key Benefits)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {yojana.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-lg text-emerald-900 dark:text-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                पात्रता की शर्तें (Eligibility Criteria)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {yojana.eligibility?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                जरूरी दस्तावेज (Required Documents)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {yojana.requiredDocuments?.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                आवेदन कैसे करें (Application Process)
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {yojana.applicationSteps?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-bold font-mono text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* OFFICIAL ACTION CTAS & SOURCE VERIFICATION */}
        <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <ExternalLink className="w-4 h-4" />
            <span>आधिकारिक लिंक्स व सत्यापन स्रोत (Official Verified Links)</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>सूचना का स्रोत:</strong> {post.sourceName} <br />
            किसी भी प्रकार की धोखाधड़ी से बचने हेतु हमेशा संबंधित मंत्रालय या आयोग के अधिकृत डोमेन पर ही आवेदन करें।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={post.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors shadow"
            >
              <FileText className="w-4 h-4" />
              <span>आधिकारिक नोटिफिकेशन देखें (Official PDF) ↗</span>
            </a>

            <a
              href={post.officialApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow"
            >
              <ExternalLink className="w-4 h-4" />
              <span>आधिकारिक वेबसाइट पर जाएँ / Apply Online ↗</span>
            </a>

            <button
              onClick={handleCorrectionJump}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <Flag className="w-3.5 h-3.5 text-amber-400" />
              <span>इस पोस्ट में त्रुटि की सूचना दें</span>
            </button>
          </div>
        </div>

        {/* Post SEO & Meta Details (Transparency) */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <div><strong>पोस्ट आईडी:</strong> <span className="font-mono">{post.id}</span></div>
          <div><strong>URL Slug:</strong> <span className="font-mono">/posts/{post.slug}</span></div>
          {post.seoTitle && <div><strong>SEO Title:</strong> {post.seoTitle}</div>}
          <div><strong>प्रकाशित तारीख:</strong> {post.publishedAt} | <strong>अंतिम अद्यतन:</strong> {post.updatedAt}</div>
        </div>

      </article>

    </div>
  );
};
