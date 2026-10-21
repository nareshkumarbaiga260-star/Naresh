import React from 'react';
import { AnyPost, JobPostDetails, YojanaPostDetails } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Bookmark, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Users, 
  ExternalLink, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface PostCardProps {
  post: AnyPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { openPostDetail, isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(post.id);

  const isJob = post.category === 'job' || post.category === 'admit-card' || post.category === 'result' || post.category === 'answer-key' || post.category === 'syllabus';
  const job = post as JobPostDetails;
  const yojana = post as YojanaPostDetails;

  const getStatusBadge = () => {
    switch (post.status) {
      case 'Open':
        return (
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            आवेदन चालू (Open)
          </span>
        );
      case 'Upcoming':
        return (
          <span className="text-amber-700 dark:text-amber-400 font-semibold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            जल्द आ रहा है (Upcoming)
          </span>
        );
      case 'Closed':
        return (
          <span className="text-rose-700 dark:text-rose-400 font-semibold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
            आवेदन समाप्त (Closed)
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryLabel = () => {
    switch (post.category) {
      case 'job': return 'सरकारी नौकरी (Job)';
      case 'yojana': return 'सरकारी योजना (Yojana)';
      case 'admit-card': return 'Admit Card';
      case 'result': return 'Result';
      case 'answer-key': return 'Answer Key';
      case 'syllabus': return 'Syllabus';
      default: return post.category;
    }
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      
      {/* Top Meta Line: Clean Unboxed Metadata with Typographic Separator */}
      <div>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              {getCategoryLabel()}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{post.state}</span>
            {post.isDemo && (
              <>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-[11px] text-amber-600 dark:text-amber-500 font-medium">नमूना डेटा</span>
              </>
            )}
          </div>

          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              bookmarked ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={bookmarked ? 'बुकमार्क से हटाएँ' : 'बाद में पढ़ने के लिए सहेजें'}
            aria-label="Bookmark"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Post Title */}
        <h3 
          onClick={() => openPostDetail(post)}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer leading-snug mb-2"
        >
          {post.title}
        </h3>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {post.summary}
        </p>

        {/* Structured Info Grid */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-1.5 mb-4 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate"><strong>विभाग:</strong> {post.department}</span>
          </div>

          {post.category === 'yojana' ? (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate"><strong>लाभ:</strong> {yojana.benefits?.[0] || 'वित्तीय/सामाजिक सहायता'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span><strong>कुल रिक्तियां:</strong> {job.totalVacancies || 'अधिसूचना अनुसार'}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span><strong>योग्यता:</strong> {post.qualification}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              <strong>अंतिम तिथि:</strong> <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold">{post.lastDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Status & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div>
          {getStatusBadge()}
          <span className="block text-[11px] text-slate-400 mt-0.5">
            अपडेट: {post.updatedAt}
          </span>
        </div>

        <button
          onClick={() => openPostDetail(post)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0"
        >
          <span>विस्तार से पढ़ें</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

    </article>
  );
};
