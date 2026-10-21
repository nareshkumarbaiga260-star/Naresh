import { AnyPost, JobPostDetails, YojanaPostDetails } from '../types';

export const INITIAL_POSTS: AnyPost[] = [
  {
    id: 'JOB-2026-RRB-TECH',
    slug: 'railway-rrb-technician-bharti-2026',
    category: 'job',
    title: 'रेलवे RRB टेक्नीशियन ग्रेड-I एवं III भर्ती 2026 (Railway Technician)',
    department: 'रेलवे भर्ती बोर्ड (Railway Recruitment Boards - RRB)',
    summary: 'रेलवे भर्ती बोर्ड द्वारा टेक्नीशियन ग्रेड-I (सिग्नल) और टेक्नीशियन ग्रेड-III के विभिन्न पदों पर भर्ती हेतु आधिकारिक अधिसूचना जारी की गई है। योग्य उम्मीदवार अंतिम तिथि से पहले ऑनलाइन आवेदन करें।',
    state: 'केंद्र सरकार (All India)',
    qualification: 'ITI / डिप्लोमा',
    startDate: '2026-03-01',
    lastDate: '2026-04-20',
    status: 'Open',
    officialNotificationUrl: 'https://indianrailways.gov.in',
    officialApplyUrl: 'https://www.rrbapply.gov.in',
    sourceName: 'केंद्रीय रोजगार समाचार (Employment News) एवं आधिकारिक RRB पोर्टल',
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-24',
    isDraft: false,
    isDemo: true,
    totalVacancies: '9,144 पद',
    postNames: ['Technician Grade-I Signal', 'Technician Grade-III Blacksmith', 'Technician Grade-III Electrical', 'Technician Grade-III Mechanical'],
    ageLimit: '18 से 33 वर्ष (आरक्षित वर्गों को नियमानुसार 3 से 5 वर्ष की छूट)',
    payScale: 'पे लेवल-2 (₹19,900 - ₹63,200) एवं पे लेवल-5 (₹29,200 - ₹92,300)',
    applicationFee: 'सामान्य/OBC: ₹500 (CBT देने पर ₹400 वापस), SC/ST/महिला/दिव्यांग: ₹250 (पूरा शुल्क रिफंडेबल)',
    selectionProcess: [
      'प्रथम चरण: कंप्यूटर आधारित लिखित परीक्षा (CBT)',
      'द्वितीय चरण: दस्तावेज सत्यापन (Document Verification)',
      'तृतीय चरण: विस्तृत चिकित्सा परीक्षण (Medical Examination)'
    ],
    examDate: 'अक्टूबर - नवंबर 2026 (संभावित)',
    requiredDocuments: [
      '10वीं / मैट्रिकुलेशन प्रमाणपत्र (जन्म तिथि प्रमाण हेतु)',
      'संबंधित ट्रेड में NCVT/SCVT से ITI या डिप्लोमा प्रमाणपत्र',
      'जाति प्रमाणपत्र (SC/ST/OBC-NCL यदि लागू हो)',
      'हाल ही में खिंचवाई गई रंगीन पासपोर्ट साइज फोटो (सफेद बैकग्राउंड)',
      'हस्ताक्षर की स्कैन प्रति एवं आधार कार्ड'
    ],
    applicationSteps: [
      'सर्वप्रथम रेलवे भर्ती बोर्ड की आधिकारिक वेबसाइट rrbapply.gov.in पर जाएँ।',
      'Create an Account विकल्प पर क्लिक करके अपना मोबाइल और ईमेल रजिस्टर करें।',
      'लॉगिन कर व्यक्तिगत विवरण, शैक्षणिक योग्यता और ट्रेड का चयन करें।',
      'फोटो, हस्ताक्षर और जरूरी दस्तावेज निर्धारित फॉर्मेट में अपलोड करें।',
      'ऑनलाइन नेट बैंकिंग / यूपीआई / डेबिट कार्ड से परीक्षा शुल्क जमा करें।',
      'आवेदन का फाइनल प्रिंटआउट और रसीद भविष्य के संदर्भ के लिए सुरक्षित रख लें।'
    ],
    seoTitle: 'Railway RRB Technician Recruitment 2026 - 9144 Vacancies, Syllabus & Apply Online',
    seoDescription: 'रेलवे आरआरबी टेक्नीशियन भर्ती 2026: कुल 9144 पद, योग्यता ITI/डिप्लोमा, आयु सीमा, आवेदन शुल्क एवं आधिकारिक नोटिफिकेशन की पूरी जानकारी।'
  } as JobPostDetails,

  {
    id: 'YOJ-2026-PM-KISAN',
    slug: 'pm-kisan-samman-nidhi-17th-installment',
    category: 'yojana',
    title: 'प्रधानमंत्री किसान सम्मान निधि योजना 2026 (PM-Kisan Scheme)',
    department: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार (Ministry of Agriculture)',
    summary: 'देश के छोटे और सीमांत किसान परिवारों को आर्थिक संबल प्रदान करने हेतु केंद्र सरकार द्वारा ₹6,000 प्रति वर्ष तीन समान किश्तों में सीधे बैंक खातों (DBT) में अंतरित किए जाते हैं।',
    state: 'केंद्र सरकार (All India)',
    qualification: '8वीं / 10वीं पास',
    startDate: '2026-01-01',
    lastDate: '2026-12-31',
    status: 'Open',
    officialNotificationUrl: 'https://pmkisan.gov.in',
    officialApplyUrl: 'https://pmkisan.gov.in/RegistrationFormUpdated.aspx',
    sourceName: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार गजट अधिसूचना',
    publishedAt: '2026-01-10',
    updatedAt: '2026-03-22',
    isDraft: false,
    isDemo: true,
    schemeName: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    schemeScope: 'केंद्र सरकार (Central)',
    objective: 'कृषि आदानों और घरेलू जरूरतों के लिए काश्तकार परिवारों को निश्चित आय सहायता प्रदान करना।',
    eligibility: [
      'सभी भूमिधारक किसान परिवार जिनके नाम कृषि योग्य भूमि है।',
      'परिवार में पति, पत्नी और नाबालिग बच्चे शामिल हैं।',
      'संवैधानिक पदधारक, वर्तमान/पूर्व सांसद, विधायक, और आयकरदाता इस योजना के पात्र नहीं हैं।',
      'बैंक खाते का आधार से लिंक होना और ई-केवाईसी (e-KYC) पूर्ण होना अनिवार्य है।'
    ],
    benefits: [
      'प्रतिवर्ष ₹6,000 की वित्तीय सहायता।',
      'राशि 4-4 माह के अंतराल पर ₹2,000 की तीन किश्तों में सीधे बैंक खाते में।',
      'पारदर्शी DBT प्रणाली, बिचौलियों का कोई हस्तक्षेप नहीं।'
    ],
    requiredDocuments: [
      'आधार कार्ड (Aadhaar Card)',
      'जमीन के दस्तावेज (खसरा/खतौनी नकल)',
      'बैंक पासबुक (आधार लिंक एवं DBT सक्रिय)',
      'सक्रिय मोबाइल नंबर'
    ],
    applicationSteps: [
      'आधिकारिक पोर्टल pmkisan.gov.in पर जाएं।',
      'Farmers Corner सेक्शन में जाकर "New Farmer Registration" पर क्लिक करें।',
      'ग्रामीण अथवा शहरी किसान का चयन कर आधार नंबर व मोबाइल नंबर दर्ज करें।',
      'ओटीपी सत्यापन के बाद राज्य, जिला, ब्लॉक और जमीन का खसरा नंबर भरें।',
      'दस्तावेज अपलोड कर सबमिट करें। स्थानीय पटवारी/कृषि अधिकारी द्वारा सत्यापन उपरांत लाभ शुरू होगा।'
    ],
    seoTitle: 'PM Kisan Samman Nidhi Yojana 2026 - Registration, eKYC Status & Eligibility',
    seoDescription: 'पीएम किसान सम्मान निधि योजना 2026: सालाना ₹6000 सहायता, नई पंजीकरण प्रक्रिया, ई-केवाईसी और लाभार्थी सूची की सरल जानकारी।'
  } as YojanaPostDetails,

  {
    id: 'JOB-2026-SSC-CGL',
    slug: 'ssc-cgl-recruitment-notification-2026',
    category: 'job',
    title: 'कर्मचारी चयन आयोग SSC CGL भर्ती परीक्षा 2026 (Combined Graduate Level)',
    department: 'कर्मचारी चयन आयोग (Staff Selection Commission - SSC)',
    summary: 'केंद्र सरकार के विभिन्न मंत्रालयों, विभागों और संवैधानिक निकायों में ग्रुप-B और ग्रुप-C के राजपत्रित व अराजपत्रित पदों पर सीधी भर्ती हेतु SSC CGL 2026 की अधिसूचना।',
    state: 'केंद्र सरकार (All India)',
    qualification: 'स्नातक (Graduate)',
    startDate: '2026-03-15',
    lastDate: '2026-04-28',
    status: 'Open',
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplyUrl: 'https://ssc.gov.in',
    sourceName: 'कर्मचारी चयन आयोग की आधिकारिक वेबसाइट (ssc.gov.in)',
    publishedAt: '2026-03-15',
    updatedAt: '2026-03-23',
    isDraft: false,
    isDemo: true,
    totalVacancies: '14,500+ पद (संभावित)',
    postNames: ['सहायक अनुभाग अधिकारी (ASO)', 'आयकर निरीक्षक (Inspector IT)', 'सेंट्रल एक्साइज इंस्पेक्टर', 'सहायक प्रवर्तन अधिकारी (ED)', 'सब-इंस्पेक्टर (CBI)', 'ऑडिटर / अकाउंटेंट'],
    ageLimit: '18 से 30 / 32 वर्ष (पदों के अनुसार भिन्न, आरक्षित वर्गों को नियमानुसार छूट)',
    payScale: 'पे लेवल-4 (₹25,500) से लेकर पे लेवल-8 (₹47,600 - ₹1,51,100)',
    applicationFee: 'सामान्य/OBC: ₹100, महिला, SC, ST और पूर्व सैनिकों हेतु निःशुल्क',
    selectionProcess: [
      'टियर-I (कंप्यूटर आधारित वस्तुनिष्ठ परीक्षा - क्वालीफाइंग)',
      'टियर-II (मुख्य परीक्षा - मेरिट निर्धारण + कंप्यूटर ज्ञान परीक्षण)',
      'डाटा एंट्री स्पीड टेस्ट (DEST) व दस्तावेज सत्यापन'
    ],
    examDate: 'टियर-I परीक्षा: जुलाई/अगस्त 2026',
    requiredDocuments: [
      'मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री या अंतिम वर्ष का प्रमाण',
      '10वीं व 12वीं की अंकतालिका',
      'जाति व ईडब्ल्यूएस प्रमाणपत्र',
      'लाइव वेबकैम फोटो (SSC के नए नियम अनुसार) व डिजिटल हस्ताक्षर'
    ],
    applicationSteps: [
      'नए SSC पोर्टल ssc.gov.in पर वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें।',
      'लॉगिन कर CGL 2026 एप्लिकेशन लिंक पर क्लिक करें।',
      'परीक्षा केंद्र वरीयता और पद प्राथमिकता चुनें।',
      'लाइव फोटो कैप्चर करें एवं हस्ताक्षर अपलोड करें।',
      'शुल्क भुगतान कर आवेदन सबमिट करें।'
    ],
    seoTitle: 'SSC CGL 2026 Notification - 14500 Vacancies, Eligibility, Exam Pattern & Apply Online',
    seoDescription: 'एसएससी सीजीएल 2026 भर्ती: कुल 14500+ रिक्तियां, स्नातक पास के लिए शानदार मौका, सिलेबस और परीक्षा तिथि।'
  } as JobPostDetails,

  {
    id: 'YOJ-2026-PM-AWAS',
    slug: 'pradhan-mantri-awas-yojana-gramin-2026',
    category: 'yojana',
    title: 'प्रधानमंत्री आवास योजना ग्रामीण (PMAY-G) नया सर्वे 2026',
    department: 'ग्रामीण विकास मंत्रालय, भारत सरकार (Ministry of Rural Development)',
    summary: 'ग्रामीण क्षेत्रों के बेघर तथा जर्जर व कच्चे मकानों में रहने वाले जरूरतमंद परिवारों को बुनियादी सुविधाओं से युक्त पक्का मकान बनाने के लिए आर्थिक अनुदान।',
    state: 'केंद्र सरकार (All India)',
    qualification: '8वीं / 10वीं पास',
    startDate: '2026-01-01',
    lastDate: '2026-12-31',
    status: 'Open',
    officialNotificationUrl: 'https://pmayg.nic.in',
    officialApplyUrl: 'https://pmayg.nic.in',
    sourceName: 'ग्रामीण विकास मंत्रालय भारत सरकार दिशा-निर्देश 2026',
    publishedAt: '2026-01-15',
    updatedAt: '2026-03-20',
    isDraft: false,
    isDemo: true,
    schemeName: 'प्रधानमंत्री ग्रामीण आवास योजना (PMAY-G)',
    schemeScope: 'केंद्र सरकार (Central)',
    objective: 'ग्रामीण भारत के सभी पात्र बेघर परिवारों को पक्के आवास उपलब्ध कराना।',
    eligibility: [
      'SECC 2011 सूची अथवा नए आवास प्लस सर्वे 2026 में चयनित परिवार।',
      'ऐसे परिवार जिनके पास कोई पक्का मकान नहीं है।',
      'परिवार में कोई भी सदस्य सरकारी सेवा अथवा आयकरदाता न हो।',
      'परिवार के पास चौपहिया वाहन या 50,000 से अधिक किसान क्रेडिट कार्ड सीमा न हो।'
    ],
    benefits: [
      'मैदानी क्षेत्रों में ₹1,20,000 की वित्तीय सहायता।',
      'पहाड़ी व दुर्गम क्षेत्रों में ₹1,30,000 की वित्तीय सहायता।',
      'स्वच्छ भारत मिशन के तहत शौचालय निर्माण हेतु अतिरिक्त ₹12,000।',
      'मनरेगा के तहत 90-95 दिनों की अकुशल मजदूरी (लगभग ₹20,000+)।'
    ],
    requiredDocuments: [
      'आधार कार्ड एवं परिवार के सभी सदस्यों का विवरण',
      'सक्रिय बैंक खाता पासबुक (DBT सक्रिय)',
      'जॉब कार्ड (मनरेगा जॉब कार्ड संख्या)',
      'कच्चे मकान का स्थल फोटोग्राफ'
    ],
    applicationSteps: [
      'ग्राम पंचायत स्तर पर ग्राम विकास अधिकारी (VDO) या आवास मित्र से संपर्क करें।',
      'AwaasApp मोबाइल ऐप के माध्यम से ग्राम पंचायत प्रतिनिधि द्वारा जियो-टैगिंग कराई जाती है।',
      'सत्यापन के उपरांत ग्राम सभा द्वारा अंतिम वरीयता सूची का अनुमोदन होता है।',
      'स्वीकृति उपरांत किश्तें सीधे लाभार्थी के बैंक खाते में निर्माण की प्रगति के अनुसार भेजी जाती हैं।'
    ],
    seoTitle: 'PM Awas Yojana Gramin 2026 - New Beneficiary List, Eligibility & Form Status',
    seoDescription: 'पीएम आवास योजना ग्रामीण 2026: नए सर्वे की जानकारी, ₹1.20 लाख सहायता, पात्रता नियम और सूची में नाम देखने का तरीका।'
  } as YojanaPostDetails,

  {
    id: 'JOB-2026-UP-POLICE',
    slug: 'up-police-constable-si-bharti-update-2026',
    category: 'job',
    title: 'उत्तर प्रदेश पुलिस आरक्षी एवं उप-निरीक्षक भर्ती परीक्षा 2026 (UP Police)',
    department: 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB, Lucknow)',
    summary: 'उत्तर प्रदेश पुलिस में 60,244 नागरिक पुलिस आरक्षी और उप-निरीक्षक (SI) पदों के लिए लिखित परीक्षा और शारीरिक मानक परीक्षण (PST/PET) प्रक्रिया का विस्तृत विवरण।',
    state: 'उत्तर प्रदेश',
    qualification: '12वीं पास',
    startDate: '2026-01-15',
    lastDate: '2026-02-28',
    status: 'Closed',
    officialNotificationUrl: 'https://uppbpb.gov.in',
    officialApplyUrl: 'https://uppbpb.gov.in',
    sourceName: 'UPPRPB आधिकारिक विज्ञप्ति संख्या पीआरबी-1(150)/2024-26',
    publishedAt: '2026-01-15',
    updatedAt: '2026-03-21',
    isDraft: false,
    isDemo: true,
    totalVacancies: '60,244 पद',
    postNames: ['आरक्षी नागरिक पुलिस (Constable Civil Police)', 'आरक्षी पीएसी (PAC)', 'उप-निरीक्षक (Sub-Inspector - SI)'],
    ageLimit: 'पुरुष: 18 से 25 वर्ष, महिला: 18 से 28 वर्ष (शासनादेश अनुसार 3 वर्ष की एकमुश्त छूट सम्मिलित)',
    payScale: 'पे मैट्रिक्स लेवल-3 (₹21,700 - ₹69,100)',
    applicationFee: 'सभी वर्गों हेतु ₹400',
    selectionProcess: [
      'ओएमआर आधारित ऑफलाइन लिखित परीक्षा (300 अंक)',
      'अभिलेखों की संवीक्षा एवं शारीरिक मानक परीक्षण (DV & PST)',
      'शारीरिक दक्षता परीक्षा (PET - 4.8 किमी दौड़ पुरुष / 2.4 किमी महिला)',
      'अंतिम चयन सूची (Merit List) एवं चिकित्सीय परीक्षण'
    ],
    examDate: 'लिखित परीक्षा संपन्न (परिणाम व DV/PST तिथि प्रतीक्षित)',
    requiredDocuments: [
      '10वीं व 12वीं की मूल अंकतालिका व प्रमाणपत्र',
      'उत्तर प्रदेश का मूल निवास प्रमाणपत्र (Domicile)',
      'जाति प्रमाणपत्र (OBC-NCL / SC / ST / EWS)',
      'आधार कार्ड व ओएमआर प्रवेश पत्र'
    ],
    applicationSteps: [
      'नोट: ऑनलाइन आवेदन की अंतिम तिथि समाप्त हो चुकी है।',
      'अभ्यर्थी आधिकारिक वेबसाइट uppbpb.gov.in पर नियमित रूप से उत्तर कुंजी और रिजल्ट नोटिस चेक करें।',
      'शारीरिक मानक परीक्षण के लिए दौड़ का अभ्यास जारी रखें।'
    ],
    seoTitle: 'UP Police Constable Recruitment 2026 - Cutoff, Answer Key & Physical Date',
    seoDescription: 'यूपी पुलिस कांस्टेबल भर्ती 2026: 60244 पदों के लिए आंसर-की, कट-ऑफ मार्क्स और फिजिकल टेस्ट की पूरी जानकारी।'
  } as JobPostDetails,

  {
    id: 'RES-2026-SSC-GD',
    slug: 'ssc-gd-constable-exam-result-2026',
    category: 'result',
    title: 'SSC GD कांस्टेबल सीबीटी परीक्षा परिणाम व कट-ऑफ 2026 (Result Out)',
    department: 'कर्मचारी चयन आयोग (SSC) एवं नोडल एजेंसी CRPF',
    summary: 'एसएससी जीडी कांस्टेबल (BSF, CISF, CRPF, SSB, ITBP, AR, SSF) भर्ती परीक्षा का लिखित परिणाम घोषित। सफल अभ्यर्थी पीईटी/पीएसटी शारीरिक परीक्षा हेतु चयनित।',
    state: 'केंद्र सरकार (All India)',
    qualification: '8वीं / 10वीं पास',
    startDate: '2026-02-20',
    lastDate: '2026-04-30',
    status: 'Open',
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplyUrl: 'https://ssc.gov.in',
    sourceName: 'कर्मचारी चयन आयोग परिणाम नोटिस (Result Write-up)',
    publishedAt: '2026-03-20',
    updatedAt: '2026-03-24',
    isDraft: false,
    isDemo: true,
    totalVacancies: '26,146 पद',
    postNames: ['GD Constable in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles, SSF'],
    ageLimit: '18 से 23 वर्ष',
    payScale: 'पे लेवल-3 (₹21,700 - ₹69,100)',
    applicationFee: 'लागू नहीं (रिजल्ट चरण)',
    selectionProcess: [
      'चरण 1: कंप्यूटर आधारित परीक्षा (CBT - संपन्न)',
      'चरण 2: शारीरिक मानक एवं दक्षता परीक्षा (PST/PET)',
      'चरण 3: विस्तृत चिकित्सा परीक्षण (DME/RME)'
    ],
    examDate: 'CBT परीक्षा 20 फरवरी से 7 मार्च 2026',
    requiredDocuments: [
      'CBT रोल नंबर एवं जन्म तिथि',
      'PET/PST एडमिट कार्ड (जारी होने पर)',
      'पहचान पत्र (आधार/वोटर कार्ड)'
    ],
    applicationSteps: [
      'ssc.gov.in के Result टैब पर क्लिक करें।',
      'CONSTABLE-GD अनुभाग चुनें।',
      'लिखित परीक्षा में चयनित अभ्यर्थियों की पीडीएफ सूची डाउनलोड करें।',
      'Ctrl + F दबाकर अपना नाम अथवा रोल नंबर खोजें।',
      'कट-ऑफ पीडीएफ से अपने राज्य और श्रेणी के कट-ऑफ अंक मिलाएं।'
    ],
    seoTitle: 'SSC GD Result 2026 Declared - Merit List PDF & Category-wise Cutoff Marks',
    seoDescription: 'एसएससी जीडी कांस्टेबल रिजल्ट 2026 घोषित: मेरिट लिस्ट पीडीएफ डाउनलोड करें और फिजिकल टेस्ट के लिए कट-ऑफ चेक करें।'
  } as JobPostDetails,

  {
    id: 'ADM-2026-CTET',
    slug: 'ctet-admit-card-download-2026',
    category: 'admit-card',
    title: 'केंद्रीय शिक्षक पात्रता परीक्षा CTET एडमिट कार्ड 2026 (Admit Card)',
    department: 'केंद्रीय माध्यमिक शिक्षा बोर्ड (CBSE)',
    summary: 'सीबीएसई द्वारा आयोजित केंद्रीय शिक्षक पात्रता परीक्षा (CTET) के लिए ई-प्रवेश पत्र जारी। परीक्षा केंद्र, समय और जरूरी दिशा-निर्देश चेक करें।',
    state: 'केंद्र सरकार (All India)',
    qualification: 'बी.एड / डी.एल.एड',
    startDate: '2026-03-10',
    lastDate: '2026-04-12',
    status: 'Open',
    officialNotificationUrl: 'https://ctet.nic.in',
    officialApplyUrl: 'https://ctet.nic.in',
    sourceName: 'CBSE CTET आधिकारिक पोर्टल प्रेस विज्ञप्ति',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-24',
    isDraft: false,
    isDemo: true,
    totalVacancies: 'पात्रता परीक्षा (Paper-I & Paper-II)',
    postNames: ['प्राथमिक शिक्षक पात्रता (कक्षा 1-5)', 'उच्च प्राथमिक शिक्षक पात्रता (कक्षा 6-8)'],
    ageLimit: 'कोई अधिकतम आयु सीमा नहीं',
    payScale: 'पात्रता प्रमाणपत्र (आजीवन वैधता)',
    applicationFee: 'प्रवेश पत्र डाउनलोड निःशुल्क',
    selectionProcess: ['ऑफलाइन पेन-पेपर मोड परीक्षा (150 वस्तुनिष्ठ प्रश्न)'],
    examDate: '12 अप्रैल 2026 (रविवार)',
    requiredDocuments: [
      'सीटीईटी ऑनलाइन आवेदन संख्या (Application Number)',
      'जन्म तिथि (Date of Birth)',
      'पासपोर्ट साइज फोटो व मूल पहचान पत्र (आधार कार्ड)'
    ],
    applicationSteps: [
      'ctet.nic.in पर जाएं।',
      '"Download Admit Card for CTET 2026" लिंक पर क्लिक करें।',
      'एप्लिकेशन नंबर, जन्मतिथि और स्क्रीन पर दिख रहा सिक्योरिटी पिन दर्ज करें।',
      'एडमिट कार्ड डाउनलोड करें और रंगीन प्रिंटआउट निकालें।',
      'एडमिट कार्ड पर दिए गए परीक्षा केंद्र के रिपोर्टिंग समय का पालन करें।'
    ],
    seoTitle: 'CTET Admit Card 2026 Download Link - Hall Ticket & Exam City Slip',
    seoDescription: 'सीटीईटी एडमिट कार्ड 2026: सीबीएसई शिक्षक पात्रता परीक्षा का प्रवेश पत्र डाउनलोड करें, परीक्षा तिथि और गाइडलाइन्स।'
  } as JobPostDetails,

  {
    id: 'SYL-2026-UPSC-CSE',
    slug: 'upsc-civil-services-ias-exam-syllabus-pattern',
    category: 'syllabus',
    title: 'UPSC सिविल सेवा परीक्षा (IAS / IPS) पाठ्यक्रम एवं परीक्षा पैटर्न 2026',
    department: 'संघ लोक सेवा आयोग (Union Public Service Commission - UPSC)',
    summary: 'यूपीएससी प्रारंभिक (Prelims) और मुख्य (Mains) परीक्षा का आधिकारिक विस्तृत पाठ्यक्रम, अंक विभाजन और वैकल्पिक विषयों की पूरी सूची सरल हिंदी में।',
    state: 'केंद्र सरकार (All India)',
    qualification: 'स्नातक (Graduate)',
    startDate: '2026-01-01',
    lastDate: '2026-12-31',
    status: 'Open',
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplyUrl: 'https://upsc.gov.in',
    sourceName: 'UPSC Civil Services Examination Gazette Notification',
    publishedAt: '2026-01-05',
    updatedAt: '2026-03-10',
    isDraft: false,
    isDemo: true,
    totalVacancies: '1,056 पद',
    postNames: ['भारतीय प्रशासनिक सेवा (IAS)', 'भारतीय पुलिस सेवा (IPS)', 'भारतीय विदेश सेवा (IFS)', 'भारतीय राजस्व सेवा (IRS)'],
    ageLimit: '21 से 32 वर्ष (अनारक्षित वर्ग हेतु 6 प्रयास)',
    payScale: 'पे मैट्रिक्स लेवल-10 (₹56,100 बेसिक) से कैबिनेट सचिव स्तर तक',
    applicationFee: 'सिलेबस अवलोकन निःशुल्क',
    selectionProcess: [
      'प्रारंभिक परीक्षा (Paper 1: सामान्य अध्ययन 200 अंक + Paper 2: CSAT 200 अंक क्वालीफाइंग)',
      'मुख्य लिखित परीक्षा (कुल 9 प्रश्नपत्र - 1750 अंक)',
      'व्यक्तित्व परीक्षण / साक्षात्कार (Interview - 275 अंक)'
    ],
    examDate: 'प्रारंभिक परीक्षा: 24 मई 2026',
    requiredDocuments: [
      'मान्यता प्राप्त स्नातक डिग्री',
      'राष्ट्रीयता प्रमाण (भारतीय नागरिकता)',
      'आरक्षण प्रमाणपत्र यदि लागू हो'
    ],
    applicationSteps: [
      'UPSC के आधिकारिक पोर्टल upsc.gov.in पर जाएं।',
      'Examination सेक्शन में Active Examinations के तहत सिलेबस पीडीएफ डाउनलोड करें।',
      'सामान्य अध्ययन प्रश्नपत्र 1 से 4 और वैकल्पिक विषय का गहन अध्ययन करें।',
      'एनसीईआरटी और पिछले वर्षों के प्रश्नपत्रों से अभ्यास करें।'
    ],
    seoTitle: 'UPSC IAS Exam Syllabus 2026 in Hindi - Prelims & Mains Pattern PDF',
    seoDescription: 'यूपीएससी सिविल सेवा परीक्षा 2026 का पूरा सिलेबस हिंदी में: प्रीलिम्स, मेन्स जीएस पेपर 1-4, ऑप्शनल और इंटरव्यू की तैयारी गाइड।'
  } as JobPostDetails,

  {
    id: 'ANS-2026-RRB-ALP',
    slug: 'rrb-alp-cbt-1-official-answer-key-objection',
    category: 'answer-key',
    title: 'रेलवे RRB सहायक लोको पायलट (ALP) CBT-1 उत्तर कुंजी व आपत्ति दर्ज करें',
    department: 'रेलवे भर्ती बोर्ड (RRB)',
    summary: 'आरआरबी एएलपी भर्ती की प्रथम चरण कंप्यूटर आधारित परीक्षा की आधिकारिक उत्तर कुंजी और रिस्पॉन्स शीट जारी। प्रश्न पर आपत्ति दर्ज करने की सुविधा उपलब्ध।',
    state: 'केंद्र सरकार (All India)',
    qualification: 'ITI / डिप्लोमा',
    startDate: '2026-03-22',
    lastDate: '2026-03-29',
    status: 'Open',
    officialNotificationUrl: 'https://www.rrbapply.gov.in',
    officialApplyUrl: 'https://www.rrbapply.gov.in',
    sourceName: 'रेलवे भर्ती बोर्ड आधिकारिक प्रेस नोट',
    publishedAt: '2026-03-22',
    updatedAt: '2026-03-23',
    isDraft: false,
    isDemo: true,
    totalVacancies: '18,799 पद',
    postNames: ['Assistant Loco Pilot (ALP)'],
    ageLimit: '18 से 30 वर्ष',
    payScale: 'पे लेवल-2 (₹19,900)',
    applicationFee: 'प्रति प्रश्न आपत्ति शुल्क: ₹50 (आपत्ति सही पाए जाने पर रिफंडेबल)',
    selectionProcess: ['CBT-1', 'CBT-2', 'CBAT (साइको टेस्ट)', 'दस्तावेज सत्यापन'],
    examDate: 'मार्च 2026',
    requiredDocuments: ['पंजीकरण संख्या (Registration No.)', 'पासवर्ड / जन्मतिथि'],
    applicationSteps: [
      'अपने संबंधित आरआरबी की वेबसाइट अथवा rrbapply.gov.in पर लॉगिन करें।',
      'View Question Paper & Response Sheet विकल्प पर क्लिक करें।',
      'अपने उत्तरों का आधिकारिक उत्तरों से मिलान करें।',
      'यदि किसी प्रश्न पर आपत्ति हो, तो मानक पुस्तक के साक्ष्य के साथ आपत्ति दर्ज करें।',
      'प्रति प्रश्न ₹50 शुल्क जमा कर आपत्ति सबमिट करें।'
    ],
    seoTitle: 'RRB ALP Answer Key 2026 Out - Check Response Sheet & Raise Objections',
    seoDescription: 'आरआरबी एएलपी सीबीटी-1 उत्तर कुंजी 2026 जारी: अपनी रिस्पॉन्स शीट डाउनलोड करें और गलत प्रश्नों पर आपत्ति दर्ज करें।'
  } as JobPostDetails,

  {
    id: 'YOJ-2026-LADLI-BEHNA',
    slug: 'mukhyamantri-ladli-behna-yojana-mp-2026',
    category: 'yojana',
    title: 'मुख्यमंत्री लाड़ली बहना योजना 2026 (Ladli Behna Yojana MP)',
    department: 'महिला एवं बाल विकास विभाग, मध्य प्रदेश शासन',
    summary: 'मध्य प्रदेश की 21 से 60 वर्ष की विवाहित, विधवा, तलाकशुदा एवं परित्यक्ता महिलाओं को प्रतिमाह ₹1,250 की आर्थिक सहायता उनके बैंक खाते में सीधे उपलब्ध कराई जाती है।',
    state: 'मध्य प्रदेश',
    qualification: 'सभी योग्यताएँ' as any,
    startDate: '2026-01-01',
    lastDate: '2026-12-31',
    status: 'Open',
    officialNotificationUrl: 'https://cmladlibahna.mp.gov.in',
    officialApplyUrl: 'https://cmladlibahna.mp.gov.in',
    sourceName: 'मध्य प्रदेश महिला एवं बाल विकास विभाग आधिकारिक निर्देश',
    publishedAt: '2026-01-10',
    updatedAt: '2026-03-12',
    isDraft: false,
    isDemo: true,
    schemeName: 'मुख्यमंत्री लाड़ली बहना योजना',
    schemeScope: 'राज्य सरकार (State)',
    objective: 'महिलाओं के आर्थिक स्वावलंबन, उनके स्वास्थ्य एवं पोषण स्तर में सुधार और परिवार में निर्णय लेने की भूमिका को सशक्त बनाना।',
    eligibility: [
      'महिला मध्य प्रदेश की स्थानीय निवासी हो।',
      'आयु 21 वर्ष पूर्ण हो चुकी हो तथा 60 वर्ष से कम हो।',
      'परिवार की वार्षिक आय ₹2.5 लाख से अधिक न हो।',
      'परिवार के पास 5 एकड़ से अधिक कृषि भूमि न हो।'
    ],
    benefits: [
      'प्रतिमाह ₹1,250 सीधे डीबीटी के माध्यम से बैंक खाते में।',
      'सालाना कुल ₹15,000 की वित्तीय सहायता।',
      'स्वयं सहायता समूह से जुड़ने पर अतिरिक्त आजीविका प्रोत्साहन।'
    ],
    requiredDocuments: [
      'समग्र परिवार आईडी एवं सदस्य आईडी (e-KYC पूर्ण)',
      'आधार कार्ड (बैंक खाते से लिंक एवं DBT सक्रिय)',
      'मोबाइल नंबर'
    ],
    applicationSteps: [
      'ग्राम पंचायत या वार्ड कार्यालय द्वारा आयोजित शिविर में जाएं।',
      'आवेदन फॉर्म निःशुल्क प्राप्त कर भरें।',
      'समग्र ई-केवाईसी और बैंक आधार लिंक की जांच कराएं।',
      'कैंप में उपस्थित रहकर लाइव फोटो खिंचवाएं।',
      'आवेदन की पावती (Acknowledgement Slip) प्राप्त करें।'
    ],
    seoTitle: 'Ladli Behna Yojana MP 2026 - Registration, Payment Status & List',
    seoDescription: 'लाड़ली बहना योजना मध्य प्रदेश 2026: ₹1250 मासिक सहायता, समग्र ई-केवाईसी, नई सूची और भुगतान स्थिति जांचें।'
  } as YojanaPostDetails,

  {
    id: 'JOB-2026-RAJ-PATWARI',
    slug: 'rajasthan-patwari-recruitment-notification-2026',
    category: 'job',
    title: 'राजस्थान पटवारी सीधी भर्ती परीक्षा 2026 (Rajasthan Patwari Bharti)',
    department: 'राजस्थान कर्मचारी चयन बोर्ड, जयपुर (RSMSSB)',
    summary: 'राजस्व मंडल राजस्थान के अंतर्गत पटवारी के लगभग 3,000 रिक्त पदों पर भर्ती प्रक्रिया। समान पात्रता परीक्षा (CET स्नातक स्तर) के माध्यम से चयन।',
    state: 'राजस्थान',
    qualification: 'स्नातक (Graduate)',
    startDate: '2026-04-01',
    lastDate: '2026-05-15',
    status: 'Upcoming',
    officialNotificationUrl: 'https://rsmssb.rajasthan.gov.in',
    officialApplyUrl: 'https://sso.rajasthan.gov.in',
    sourceName: 'राजस्थान कर्मचारी चयन बोर्ड भर्ती कैलेंडर 2026',
    publishedAt: '2026-03-21',
    updatedAt: '2026-03-24',
    isDraft: false,
    isDemo: true,
    totalVacancies: '2,998 पद',
    postNames: ['पटवारी (गैर-अनुसूचित क्षेत्र)', 'पटवारी (अनुसूचित क्षेत्र)'],
    ageLimit: '18 से 40 वर्ष (राजस्थान के मूल निवासियों को 5 वर्ष की छूट)',
    payScale: 'पे मैट्रिक्स लेवल L-5 (बेसिक ₹20,800)',
    applicationFee: 'सामान्य/क्रीमीलेयर: ₹600, OBC-NCL/SC/ST: ₹400 (एकबारीय पंजीयन OTR)',
    selectionProcess: [
      'राजस्थान CET स्नातक स्तर स्कोर के आधार पर 15 गुना मेरिट',
      'पटवारी मुख्य लिखित परीक्षा',
      'दस्तावेज सत्यापन एवं मेरिट आवंटन'
    ],
    examDate: 'सितंबर 2026 (संभावित)',
    requiredDocuments: [
      'स्नातक डिग्री + RSCIT या समकक्ष कंप्यूटर डिप्लोमा',
      'राजस्थान CET स्नातक स्कोर कार्ड',
      'SSO ID एवं डिजिटल जनाधार कार्ड'
    ],
    applicationSteps: [
      'राजस्थान सरकार के SSO पोर्टल sso.rajasthan.gov.in पर लॉगिन करें।',
      'Recruitment Portal पर जाएं और One Time Registration (OTR) जांचें।',
      'Patwari Recruitment 2026 लिंक पर Apply Now पर क्लिक करें।',
      'CET रोल नंबर भरें, योग्यता विवरण भरें और आवेदन शुल्क जमा करें।'
    ],
    seoTitle: 'Rajasthan Patwari Recruitment 2026 - 2998 Posts, CET Score, Syllabus & Form',
    seoDescription: 'राजस्थान पटवारी भर्ती 2026: 2998 पद, सीईटी कट-ऑफ, कंप्यूटर योग्यता आरएससीआईटी और परीक्षा पैटर्न की संपूर्ण जानकारी।'
  } as JobPostDetails,

  {
    id: 'JOB-2026-BIHAR-BPSC-TRE',
    slug: 'bihar-bpsc-teacher-recruitment-tre-4-2026',
    category: 'job',
    title: 'बिहार शिक्षक भर्ती परीक्षा BPSC TRE 4.0 2026 (Bihar Teacher)',
    department: 'बिहार लोक सेवा आयोग (BPSC, Patna)',
    summary: 'शिक्षा विभाग बिहार के अंतर्गत प्राथमिक (1-5), मध्य (6-8), माध्यमिक (9-10) एवं उच्च माध्यमिक (11-12) विद्यालयों में अध्यापकों के रिक्त पदों पर भर्ती।',
    state: 'बिहार',
    qualification: 'बी.एड / डी.एल.एड',
    startDate: '2026-04-10',
    lastDate: '2026-05-20',
    status: 'Upcoming',
    officialNotificationUrl: 'https://bpsc.bih.nic.in',
    officialApplyUrl: 'https://onlinebpsc.bihar.gov.in',
    sourceName: 'बिहार लोक सेवा आयोग वार्षिक परीक्षा कैलेंडर 2026',
    publishedAt: '2026-03-20',
    updatedAt: '2026-03-24',
    isDraft: false,
    isDemo: true,
    totalVacancies: '85,000+ पद (संभावित)',
    postNames: ['वर्ग 1-5 प्राथमिक विद्यालय अध्यापक', 'वर्ग 6-8 मध्य विद्यालय अध्यापक', 'वर्ग 9-10 माध्यमिक शिक्षक', 'वर्ग 11-12 उच्च माध्यमिक शिक्षक'],
    ageLimit: 'पुरुष: 21 से 37 वर्ष, महिला/पिछड़ा वर्ग: 21 से 40 वर्ष, SC/ST: 21 से 42 वर्ष',
    payScale: 'मूल वेतन ₹25,000 से ₹32,000 प्रतिमाह + DA, HRA, मेडिकल भत्ता',
    applicationFee: 'सामान्य/अन्य राज्य: ₹750, बिहार की महिलाएं, SC/ST/दिव्यांग: ₹200',
    selectionProcess: [
      'लिखित वस्तुनिष्ठ परीक्षा (भाषा अर्हता + सामान्य अध्ययन + संबंधित विषय)',
      'कोई इंटरव्यू नहीं (सीधी भर्ती)',
      'काउंसलिंग एवं मूल दस्तावेज सत्यापन'
    ],
    examDate: 'अगस्त 2026',
    requiredDocuments: [
      'CTET (पेपर 1 या 2) अथवा बिहार STET उत्तीर्ण प्रमाणपत्र',
      'डीएलएड / बीएड प्रशिक्षण उपाधि',
      'बिहार स्थायी निवास प्रमाणपत्र',
      'जाति / ईडब्ल्यूएस प्रमाणपत्र'
    ],
    applicationSteps: [
      'onlinebpsc.bihar.gov.in पर जाकर OTR पंजीकरण करें।',
      'शिक्षक भर्ती TRE 4.0 के लिए आवेदन लिंक खोलें।',
      'शैक्षणिक योग्यता व शिक्षक पात्रता परीक्षा (CTET/STET) के विवरण दर्ज करें।',
      'पीडीएफ दस्तावेज अपलोड करें और ऑनलाइन परीक्षा शुल्क का भुगतान करें।'
    ],
    seoTitle: 'BPSC TRE 4.0 Notification 2026 - 85000 Bihar Teacher Vacancy, Eligibility & Date',
    seoDescription: 'बिहार शिक्षक भर्ती टीआरई 4.0: 85000+ पदों पर भर्ती की पात्रता, सीटीईटी/एसटेट नियम, सिलेबस और ऑनलाइन फॉर्म भरने की पूरी गाइड।'
  } as JobPostDetails
];

export const STATES_LIST = [
  'सभी राज्य / All India',
  'केंद्र सरकार (All India)',
  'उत्तर प्रदेश',
  'बिहार',
  'राजस्थान',
  'मध्य प्रदेश',
  'हरियाणा',
  'दिल्ली',
  'झारखंड',
  'उत्तराखंड'
];

export const QUALIFICATIONS_LIST = [
  'सभी योग्यताएँ',
  '8वीं / 10वीं पास',
  '12वीं पास',
  'स्नातक (Graduate)',
  'स्नातकोत्तर (Post Graduate)',
  'ITI / डिप्लोमा',
  'इंजीनियरिंग / बी.टेक',
  'बी.एड / डी.एल.एड'
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'सभी जानकारी (All)', type: null },
  { id: 'job', label: 'सरकारी नौकरी (Jobs)', type: 'job' },
  { id: 'yojana', label: 'सरकारी योजनाएँ (Yojana)', type: 'yojana' },
  { id: 'admit-card', label: 'एडमिट कार्ड (Admit Card)', type: 'admit-card' },
  { id: 'result', label: 'रिजल्ट (Results)', type: 'result' },
  { id: 'answer-key', label: 'उत्तर कुंजी (Answer Key)', type: 'answer-key' },
  { id: 'syllabus', label: 'पाठ्यक्रम (Syllabus)', type: 'syllabus' }
];
