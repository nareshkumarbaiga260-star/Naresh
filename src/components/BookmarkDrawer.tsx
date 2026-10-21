import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bookmark, Trash2, ArrowRight, ExternalLink } from 'lucide-react';

export const BookmarkDrawer: React.FC = () => {
  const { 
    isBookmarkDrawerOpen, 
    setIsBookmarkDrawerOpen, 
    bookmarkedIds, 
    posts, 
    openPostDetail,
    toggleBookmark 
  } = useApp();

  if (!isBookmarkDrawerOpen) return null;

  const savedPosts = posts.filter(p => bookmarkedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>सहेजी गई पोस्ट्स (Saved Posts)</span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-mono">
              {savedPosts.length}
            </span>
          </div>

          <button 
            onClick={() => setIsBookmarkDrawerOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {savedPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p>आपने अभी तक कोई पोस्ट सहेजी नहीं है।</p>
              <p className="text-[11px] text-slate-400">
                कार्ड पर बने 🔖 आइकन पर क्लिक करके महत्वपूर्ण भर्तियों को यहाँ सहेजें।
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div 
                key={post.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-xs"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase text-[10px]">
                    {post.category}
                  </span>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="text-slate-400 hover:text-rose-600 p-0.5"
                    title="हटाएँ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 
                  onClick={() => {
                    openPostDetail(post);
                    setIsBookmarkDrawerOpen(false);
                  }}
                  className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 leading-snug"
                >
                  {post.title}
                </h4>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <span>अंतिम तिथि: {post.lastDate}</span>
                  <button
                    onClick={() => {
                      openPostDetail(post);
                      setIsBookmarkDrawerOpen(false);
                    }}
                    className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5"
                  >
                    <span>देखें</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 text-center">
          यह डेटा आपके अपने ब्राउज़र (LocalStorage) में सुरक्षित रहता है।
        </div>

      </div>
    </div>
  );
};
