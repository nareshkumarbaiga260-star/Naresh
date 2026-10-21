import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Clock
} from 'lucide-react';
import { STATES_LIST } from '../data/initialData';

/* ========================================================
   1. ABOUT US PAGE
   ======================================================== */
export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            हमारे बारे में
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Naresh Technical सूचना मंच का परिचय
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            सत्यापित, निष्पक्ष और सरल हिंदी में सरकारी जानकारी का स्वतंत्र स्रोत
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            <strong>Naresh Technical</strong> एक स्वतंत्र शिक्षा एवं करियर सूचना पोर्टल है। हमारा मुख्य उद्देश्य देश के लाखों युवाओं, छात्रों और ग्रामीण व शहरी नागरिकों तक केंद्र और राज्य सरकारों द्वारा जारी की जाने वाली भर्तियों (Sarkari Bharti), प्रतियोगी परीक्षाओं, परिणाम (Results), प्रवेश पत्र (Admit Cards), और जन-कल्याणकारी योजनाओं (Sarkari Yojana) की सही जानकारी उनकी अपनी भाषा <strong>सरल हिंदी</strong> में पहुँचाना है।
          </p>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>हमारा स्वतंत्रता व गैर-सरकारी संकल्प:</span>
            </h3>
            <p className="text-amber-900 dark:text-amber-200">
              Naresh Technical किसी भी सरकारी मंत्रालय, विभाग या आयोग से संबद्ध या अनुबंधित नहीं है। हम कोई भी सरकारी सेवा सीधे प्रदान नहीं करते और न ही नौकरी या लाभ दिलाने का कोई अनुचित वादा करते हैं। हम केवल एक माध्यम हैं जो आधिकारिक सूचनाओं को सरल रूप में प्रस्तुत करता है।
            </p>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            हमारे तीन मार्गदर्शक सिद्धांत:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">1. केवल प्रमाणित स्रोत</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                केवल सरकारी गजट, रोजगार समाचार और आयोगों के .gov.in / .nic.in डोमेन से प्राप्त जानकारी।
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">2. शून्य भ्रामकता</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                कोई "नौकरी पक्की" या अप्रमाणित तारीखों के भ्रामक दावे नहीं। जो सच है वही लिखा जाता है।
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">3. पूर्णतः निःशुल्क</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                जानकारी पढ़ने अथवा आधिकारिक लिंक प्राप्त करने के लिए पाठकों से कभी कोई शुल्क नहीं लिया जाता।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   2. CONTACT US PAGE
   ======================================================== */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            संपर्क करें
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Naresh Technical सहायता डेस्क
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            सुझाव, सामान्य पूछताछ अथवा प्रतिक्रिया हेतु हमें संदेश भेजें
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  धन्यवाद! आपका संदेश प्राप्त हो गया है।
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  हमारी टीम 24-48 व्यावसायिक घंटों के भीतर आपके ईमेल पते पर उत्तर देगी।
                </p>
                <button
                  onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                >
                  नया संदेश भेजें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="पूरा नाम दर्ज करें"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ईमेल आईडी *
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
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    विषय (Subject) *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="उदा. भर्ती विज्ञापन में स्पष्टीकरण"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    संदेश (Message) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="अपना संदेश यहाँ लिखें..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>संदेश भेजें</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">संपर्क विवरण:</h3>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>support@nareshtechnical.demo</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>+91 98765 43210 (हेल्पलाइन - सोमवार से शनिवार 10 AM - 6 PM)</span>
              </div>
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Naresh Technical डिजिटल स्टूडियो, मध्य प्रदेश / नई दिल्ली, भारत</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
              <strong>ध्यान दें:</strong> हम किसी भी विभाग के लिए आवेदन फॉर्म नहीं भरते और न ही कॉल पर नौकरी का आश्वासन देते हैं। यदि कोई व्यक्ति Naresh Technical के नाम से पैसे मांगे तो तुरंत पुलिस में शिकायत करें।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   3. CORRECTION REQUEST PAGE
   ======================================================== */
export const CorrectionPage: React.FC = () => {
  const { submitCorrection, setCurrentView } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const [verifiedSourceUrl, setVerifiedSourceUrl] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  // Anti-bot simple math captcha (7 + 5 = 12)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '12') {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    submitCorrection({
      name: name.trim(),
      email: email.trim(),
      postTitle: postTitle.trim(),
      postUrl: postUrl.trim(),
      errorDetail: errorDetail.trim(),
      verifiedSourceUrl: verifiedSourceUrl.trim()
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            पारदर्शिता व सत्यनिष्ठा
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            जानकारी सुधारने का अनुरोध (Correction Request)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            यदि आपको Naresh Technical की किसी पोस्ट में कोई तिथि, योग्यता, शुल्क, पद संख्या या लिंक में त्रुटि दिखे, तो कृपया साक्ष्य सहित सूचित करें। हम 24 घंटे में गजट से मिलान कर सुधार करेंगे।
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
              अनुरोध सफलतापूर्वक दर्ज कर लिया गया!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
              आपकी सतर्कता के लिए धन्यवाद। संपादकीय टीम आधिकारिक अधिसूचना से मिलान कर इस पोस्ट को तुरंत अपडेट करेगी।
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
              >
                होम पेज पर जाएँ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  आपका नाम *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल शर्मा"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  आपका ईमेल *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                संबंधित पोस्ट का शीर्षक *
              </label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="उदा. रेलवे RRB टेक्नीशियन भर्ती 2026"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                पोस्ट का URL या लिंक (यदि उपलब्ध हो)
              </label>
              <input
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://nareshtechnical.demo/posts/..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                क्या त्रुटि है और सही जानकारी क्या होनी चाहिए? *
              </label>
              <textarea
                rows={4}
                required
                value={errorDetail}
                onChange={(e) => setErrorDetail(e.target.value)}
                placeholder="स्पष्ट बताएं कि पोस्ट में कौन सी तारीख, पद संख्या या नियम गलत दर्ज है और आधिकारिक नोटिफिकेशन में क्या लिखा है..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                आधिकारिक नोटिफिकेशन या साक्ष्य का सीधा लिंक (Official Source URL) *
              </label>
              <input
                type="url"
                required
                value={verifiedSourceUrl}
                onChange={(e) => setVerifiedSourceUrl(e.target.value)}
                placeholder="https://...gov.in/official_notice.pdf"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Anti-spam math captcha */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                सुरक्षा प्रश्न (Anti-Bot): 7 + 5 = ?
              </span>
              <input
                type="text"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="उत्तर दर्ज करें"
                className="w-24 p-1.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-center"
              />
              {captchaError && (
                <span className="text-xs text-rose-600 font-semibold">गलत उत्तर! कृपया दोबारा जाँचें।</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow"
            >
              सुधार अनुरोध सबमिट करें
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ========================================================
   4. STATUTORY LEGAL DISCLAIMER PAGE
   ======================================================== */
export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            कानूनी सूचना
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            अस्वीकरण (Disclaimer)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            अंतिम नवीनीकरण: 2026
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl font-medium text-amber-900 dark:text-amber-200">
            “Naresh Technical एक स्वतंत्र जानकारी वेबसाइट है। यह सरकारी वेबसाइट नहीं है। कृपया आवेदन करने से पहले संबंधित विभाग की आधिकारिक वेबसाइट पर जानकारी जरूर जाँचें।”
          </div>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            1. गैर-संबद्धता (No Government Affiliation)
          </h3>
          <p>
            Naresh Technical भारत सरकार, किसी भी राज्य सरकार, केंद्र शासित प्रदेश प्रशासन या किसी भी संवैधानिक व सार्वजनिक आयोग (जैसे UPSC, SSC, RRB, IBPS, आदि) की आधिकारिक वेबसाइट नहीं है। हमारी वेबसाइट पर प्रयुक्त किसी भी संस्था का नाम केवल संदर्भ एवं शैक्षणिक पहचान हेतु है।
          </p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            2. सटीकता एवं पाठक का उत्तरदायित्व
          </h3>
          <p>
            यद्यपि हम सभी तिथियों, शुल्क, योग्यता और नियमों को सरकारी नोटिफिकेशन से अत्यंत सावधानीपूर्वक मिलान कर प्रकाशित करते हैं, फिर भी किसी मुद्रण त्रुटि अथवा बाद में विभाग द्वारा किए गए शुद्धिपत्र (Corrigendum) के लिए Naresh Technical उत्तरदायी नहीं होगा। उम्मीदवार को आवेदन करने से पूर्व आधिकारिक विज्ञापन का अवलोकन स्वयं करना अनिवार्य है।
          </p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            3. चयन या लाभ की कोई गारंटी नहीं
          </h3>
          <p>
            Naresh Technical किसी भी अभ्यर्थी को किसी नौकरी में चयन दिलवाने या किसी सरकारी योजना का आर्थिक लाभ दिलवाने का दावा नहीं करता है। चयन प्रक्रिया पूर्णतः संबंधित आयोग द्वारा निर्धारित नियमों पर निर्भर करती है।
          </p>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   5. PRIVACY POLICY PAGE
   ======================================================== */
export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            गोपनीयता
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            गोपनीयता नीति (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            उपयोगकर्ता डेटा सुरक्षा व गोपनीयता प्रतिज्ञा
          </p>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            Naresh Technical आपके व्यक्तिगत डेटा की गोपनीयता का पूर्ण सम्मान करता है। हम इस नीति के तहत स्पष्ट करते हैं कि हम कौन-सी जानकारी लेते हैं और उसका क्या उपयोग होता है:
          </p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. कोई अनिवार्य लॉगिन नहीं</h3>
          <p>हमारी वेबसाइट पर भर्ती व योजना की जानकारी पढ़ने के लिए किसी भी पाठक को लॉगिन या पंजीकरण करने की आवश्यकता नहीं है।</p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. स्वैच्छिक ईमेल अलर्ट्स</h3>
          <p>यदि आप जॉब अलर्ट्स हेतु ईमेल दर्ज करते हैं, तो आपकी ईमेल केवल नोटिफिकेशन भेजने के लिए सुरक्षित रूप से रखी जाती है। हम आपकी जानकारी किसी तीसरे पक्ष को बेचते या साझा नहीं करते हैं। प्रत्येक ईमेल में Unsubscribe का सीधा विकल्प होता है।</p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">3. कुकीज़ एवं एनालिटिक्स</h3>
          <p>हम केवल साइट को तेजी से लोड करने और डार्क/लाइट मोड की पसंद सहेजने हेतु स्थानीय स्टोरेज (localStorage) का उपयोग करते हैं।</p>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   6. TERMS AND CONDITIONS PAGE
   ======================================================== */
export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            नियम व शर्तें
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Terms and Conditions
          </h1>
        </div>

        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            Naresh Technical की सेवाओं का उपयोग करने पर आप निम्नलिखित शर्तों से बाध्य होते हैं:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>इस वेबसाइट की सामग्री केवल व्यक्तिगत अध्ययन और गैर-व्यावसायिक मार्गदर्शन के लिए है।</li>
            <li>वेबसाइट के कोड, ब्रांड नाम या लेखों की अनधिकृत कॉपी या व्यावसायिक पुनर्विक्रय निषिद्ध है।</li>
            <li>उपयोगकर्ता को किसी भी सरकारी आवेदन हेतु संबंधित विभाग के पोर्टल पर अपने उत्तरदायित्व से आवेदन करना होगा।</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   7. EXAM PREPARATION GUIDE PAGE
   ======================================================== */
export const ExamPrepPage: React.FC = () => {
  const { setFilterCategory, setCurrentView } = useApp();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            तैयारी रणनीति
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            सरकारी परीक्षा तैयारी मार्गदर्शन (Exam Preparation)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            रणनीति, समय प्रबंधन, मॉडल पेपर्स और सफलता के प्रमाणित सुझाव
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>1. पाठ्यक्रम का गहन विश्लेषण</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              तैयारी शुरू करने से पहले आयोग द्वारा जारी विस्तृत सिलेबस का प्रिंट निकालें। प्रत्येक विषय के अंकों के भार को समझें।
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>2. पिछले 5 वर्षों के प्रश्नपत्र (PYQ)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              पिछले वर्षों के प्रश्नपत्र हल करने से प्रश्नों की प्रकृति, कठिनाई स्तर और समय प्रबंधन का सटीक अनुमान लगता है।
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>3. नियमित मॉक टेस्ट और विश्लेषण</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              सप्ताह में कम से कम 2 पूर्ण लंबाई वाले टेस्ट दें। टेस्ट के बाद गलत हुए प्रश्नों का रिवीजन करना सबसे जरूरी है।
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>4. करंट अफेयर्स एवं सामान्य ज्ञान</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              सरकारी योजनाएं, बजट, महत्वपूर्ण नियुक्तियां और खेल से जुड़े प्रश्नों के लिए पिछले 6 से 12 माह का अध्ययन करें।
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between flex-wrap gap-3">
          <div>
            <h4 className="font-bold text-sm text-amber-400">सभी परीक्षाओं के आधिकारिक पाठ्यक्रम देखें:</h4>
            <p className="text-xs text-slate-300">UPSC, SSC, Railway, UP Police, शिक्षक भर्ती के सिलेबस उपलब्ध हैं।</p>
          </div>
          <button
            onClick={() => {
              setFilterCategory('syllabus');
              setCurrentView('syllabus');
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors"
          >
            पाठ्यक्रम सूची देखें →
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   8. STATE-WISE EXPLORER PAGE
   ======================================================== */
export const StatewisePage: React.FC = () => {
  const { setFilterState, setCurrentView } = useApp();

  const handleStatePick = (st: string) => {
    setFilterState(st);
    setCurrentView('home');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            राज्यवार अन्वेषण
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            राज्यवार सरकारी नौकरी व योजनाएँ (State-wise Directory)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            अपने राज्य का चयन करें और केवल अपने राज्य की सक्रिय भर्तियां और योजनाएं देखें
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {STATES_LIST.map((st) => (
            <button
              key={st}
              onClick={() => handleStatePick(st)}
              className="p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-xl text-left transition-all group flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 block">
                  {st}
                </span>
                <span className="text-[11px] text-slate-500">
                  {st.includes('केंद्र') ? 'अखिल भारतीय स्तर' : 'राज्य सेवा व जनकल्याण'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ========================================================
   9. PRODUCTION SETUP GUIDE PAGE (Publicly accessible)
   ======================================================== */
export const SetupGuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            उत्पादन व तकनीकी गाइड
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Naresh Technical: उत्पादन एवं होस्टिंग मार्गदर्शिका (Setup SOP)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            वेबसाइट को लाइव करने, कस्टम डोमेन जोड़ने और सुरक्षित प्रमाणीकरण कॉन्फ़िगर करने के 4 मुख्य चरण
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">
              1. सुरक्षित Admin Authentication कैसे सेटअप करें?
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              वर्तमान में वेबसाइट में क्लाइंट-साइड Web Crypto API (SHA-256 + Salt) द्वारा सुरक्षित निजी तिजोरी दी गई है। उत्पादन में स्वचालित ईमेल आमंत्रण व पासवर्ड रीसेट लिंक हेतु:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>विकल्प A (Supabase Auth - मुफ़्त व तेज़):</strong> Supabase पर प्रोजेक्ट बनाएं, <code>nareshkumarbaiga260@gmail.com</code> को एडमिन बनाएं और Row-Level Security (RLS) नीतियां लागू करें।</li>
              <li><strong>विकल्प B (Transactional SMTP / Express):</strong> Node.js बैकएंड में <code>bcrypt</code> हैशिंग और Resend/Brevo API से स्वचालित ईमेल रीसेट टोकन भेजें।</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">
              2. पहली पोस्ट जोड़ने की मानक संचालन प्रक्रिया (SOP)
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>केंद्रीय या राज्य भर्ती बोर्ड के आधिकारिक <code>.gov.in</code> या <code>.nic.in</code> डोमेन से मूल विज्ञापन PDF प्राप्त करें।</li>
              <li>एडमिन पैनल में लॉगिन कर “+ नई पोस्ट जोड़ें” पर क्लिक करें और सभी अनिवार्य फ़ील्ड भरें।</li>
              <li>आधिकारिक PDF डाउनलोड लिंक और आधिकारिक आवेदन लिंक अनिवार्य रूप से दर्ज करें।</li>
              <li>“लाइव ड्राफ्ट प्रीव्यू” देखकर पुष्टि करें कि कोई गलत दावा या त्रुटि नहीं है, फिर “सीधे प्रकाशित करें” चुनें।</li>
            </ol>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">
              3. कस्टम डोमेन और होस्टिंग पर कैसे पब्लिश करें?
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>डोमेन:</strong> GoDaddy, Namecheap या Google Domains से <code>nareshtechnical.com</code> या <code>nareshtechnical.in</code> बुक करें।</li>
              <li><strong>होस्टिंग:</strong> कोड को GitHub रिपोजिटरी में रखें और <strong>Cloudflare Pages</strong> या <strong>Vercel</strong> से जोड़ें। यह 100% मुफ़्त, ग्लोबल CDN और ऑटोमैटिक HTTPS/SSL प्रदान करता है।</li>
              <li>DNS सेटिंग्स में Cloudflare के CNAME रिकॉर्ड जोड़ें।</li>
            </ul>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">
              4. आवश्यक थर्ड-पार्टी सर्विसेज और क्रेडेंशियल्स
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>Google Search Console:</strong> <code>sitemap.xml</code> सबमिट कर गूगल सर्च में पोस्ट्स को इंडेक्स कराएं।</li>
              <li><strong>Email Delivery (SMTP / API):</strong> संपर्क और सुधार अनुरोधों के संदेश सीधे अपने इनबॉक्स में पाने हेतु Brevo या Resend API जोड़ें।</li>
              <li><strong>Google Analytics 4:</strong> प्रतिदिन आने वाले विज़िटर्स और लोकप्रिय जॉब्स की रिपोर्ट देखने हेतु।</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

