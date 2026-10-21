import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import { ShieldAlert, ArrowUp, Mail, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilterCategory, resetFilters } = useApp();

  const handleLink = (view: AppView, catId?: string) => {
    setCurrentView(view);
    if (catId) setFilterCategory(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-amber-500 mt-16">
      
      {/* 1. Mandatory Highlighted Statutory Non-Government Disclaimer Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left text-xs sm:text-sm text-amber-300">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="leading-relaxed">
            <strong>सांविधिक अस्वीकरण (Statutory Disclaimer):</strong> “Naresh Technical एक स्वतंत्र जानकारी वेबसाइट है। यह सरकारी वेबसाइट नहीं है। कृपया आवेदन करने से पहले संबंधित विभाग की आधिकारिक वेबसाइट पर जानकारी जरूर जाँचें।”
          </p>
        </div>
      </div>

      {/* 2. Main Footer Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xl font-black text-white">
              Naresh <span className="text-amber-500">Technical</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              भारत भर के अभ्यर्थियों एवं आम नागरिकों के लिए केंद्र और राज्य सरकारों की भर्तियों, परीक्षा परिणाम, एडमिट कार्ड और जन-कल्याणकारी योजनाओं की सरल हिंदी में प्रामाणिक व स्वतंत्र सूचना।
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span>ईमेल संपर्क: </span>
              <a href="mailto:support@nareshtechnical.demo" className="text-amber-400 hover:underline">
                support@nareshtechnical.demo
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
              मुख्य श्रेणियां
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('jobs', 'job')} className="hover:text-amber-400 transition-colors">
                  नवीनतम भर्ती (Latest Jobs)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('yojana', 'yojana')} className="hover:text-amber-400 transition-colors">
                  सरकारी योजनाएँ (Sarkari Yojana)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('admit-card', 'admit-card')} className="hover:text-amber-400 transition-colors">
                  एडमिट कार्ड (Admit Card)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('results', 'result')} className="hover:text-amber-400 transition-colors">
                  परीक्षा परिणाम (Results)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('answer-key', 'answer-key')} className="hover:text-amber-400 transition-colors">
                  उत्तर कुंजी (Answer Key)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('syllabus', 'syllabus')} className="hover:text-amber-400 transition-colors">
                  पाठ्यक्रम (Syllabus)
                </button>
              </li>
            </ul>
          </div>

          {/* Educational & Tools */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
              तैयारी व राज्यवार
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('prep')} className="hover:text-amber-400 transition-colors">
                  परीक्षा तैयारी मार्गदर्शन
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('states')} className="hover:text-amber-400 transition-colors">
                  राज्यवार नौकरी खोजें
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('correction')} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  ✏️ जानकारी सुधारने का अनुरोध
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('setup-guide')} className="text-sky-400 hover:text-sky-300 transition-colors">
                  ⚙️ उत्पादन सेटअप SOP
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('admin')} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  🔐 एडमिन डैशबोर्ड
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
              नीति एवं कानूनी
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-amber-400 transition-colors">
                  हमारे बारे में (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-amber-400 transition-colors">
                  संपर्क करें (Contact Us)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('privacy')} className="hover:text-amber-400 transition-colors">
                  गोपनीयता नीति (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('disclaimer')} className="hover:text-amber-400 transition-colors">
                  अस्वीकरण (Disclaimer)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('terms')} className="hover:text-amber-400 transition-colors">
                  नियम व शर्तें (Terms & Conditions)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Naresh Technical</strong>. सर्वाधिकार सुरक्षित। (स्वतंत्र गैर-सरकारी सूचना पोर्टल)
          </div>

          <div className="flex items-center gap-4">
            <span>सटीकता और निष्पक्षता को समर्पित</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1"
              title="शीर्ष पर जाएँ"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>ऊपर</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
