export const ROADMAP_TRANSLATIONS = {
  en: {
    targetCompletionText: 'Target Completion: Next 3 Days',
    nextActionTitle: (sector) => `Upload Detailed Project Report (DPR) for ${sector}`,
    nextActionDesc: 'Your PMEGP & PMFME scheme applications require a technical project feasibility report. Upload your DPR or get free assistance from your District Industry Centre (DIC).',
    lifecycleTitle: '7-Stage Government Enterprise Scheme Lifecycle',
    steps: [
      {
        stepNumber: 1,
        title: 'Complete Profile',
        desc: 'Fill basic personal, business, and funding parameters in SchemeMatch AI.',
        badge: 'Done ✓'
      },
      {
        stepNumber: 2,
        title: 'Check Preliminary Eligibility',
        desc: 'AI synthesized multi-parameter score across KVIC, MoFPI, SIDBI, and MSME rules.',
        badge: 'Match Verified ✓'
      },
      {
        stepNumber: 3,
        title: 'Prepare Documents',
        desc: 'Verify Aadhaar KYC, Income Certificate, Address proof, and Bank Passbook.',
        badge: 'Uploaded ✓'
      },
      {
        stepNumber: 4,
        title: 'Complete Missing Documents',
        desc: 'Finalize Udyam MSME Registration and Detailed Project Report (DPR).',
        badge: 'In Progress (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'Submit Application',
        desc: 'File application on official KVIC / JanSamarth / PMFME e-Portals.',
        badge: 'Scheduled'
      },
      {
        stepNumber: 6,
        title: 'Visit Bank / CSC if required',
        desc: 'Attend physical verification at designated Lead MSME Bank Branch or CSC Seva Kendra.',
        badge: 'Local Kiosk'
      },
      {
        stepNumber: 7,
        title: 'Track Application & Subsidy Release',
        desc: 'Monitor DLTFC committee clearance and margin money credit into escrow account.',
        badge: 'Tracking'
      }
    ]
  },
  ml: {
    targetCompletionText: 'ലക്ഷ്യ പൂർത്തീകരണം: അടുത്ത 3 ദിവസത്തിനകം',
    nextActionTitle: (sector) => `${sector} യൂണിറ്റിനായി പ്രോജക്ട് റിപ്പോർട്ട് (DPR) അപ്‌ലോഡ് ചെയ്യുക`,
    nextActionDesc: 'PMEGP, PMFME പദ്ധതികൾക്കായി സാങ്കേതിക പ്രോജക്ട് റിപ്പോർട്ട് ആവശ്യമാണ്. നിങ്ങളുടെ DPR അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ജില്ലാ വ്യവസായ കേന്ദ്രത്തിൽ (DIC) നിന്ന് സൗജന്യ സഹായം നേടുക.',
    lifecycleTitle: '7-ഘട്ട സർക്കാർ സംരംഭക പദ്ധതി പ്രക്രിയ',
    steps: [
      {
        stepNumber: 1,
        title: 'പ്രൊഫൈൽ പൂർത്തിയാക്കുക',
        desc: 'വ്യക്തിഗത, ബിസിനസ്സ്, വായ്പാ വിവരങ്ങൾ സ്കീംമാച്ച് AI-ൽ രേഖപ്പെടുത്തുക.',
        badge: 'പൂർത്തിയായി ✓'
      },
      {
        stepNumber: 2,
        title: 'പ്രാഥമിക യോഗ്യത പരിശോധിക്കുക',
        desc: 'KVIC, MoFPI, SIDBI, MSME നിയമങ്ങൾ അടിസ്ഥാനമാക്കി AI യോഗ്യത നിർണ്ണയിച്ചു.',
        badge: 'പരിശോധിച്ചുറപ്പിച്ചു ✓'
      },
      {
        stepNumber: 3,
        title: 'രേഖകൾ തയ്യാറാക്കുക',
        desc: 'ആധാർ KYC, വരുമാന സർട്ടിഫിക്കറ്റ്, വിലാസ രേഖ, ബാങ്ക് പാസ്സ്ബുക്ക് എന്നിവ പരിശോധിക്കുക.',
        badge: 'അപ്‌ലോഡ് ചെയ്തു ✓'
      },
      {
        stepNumber: 4,
        title: 'ബാക്കി നിൽക്കുന്ന രേഖകൾ പൂർത്തിയാക്കുക',
        desc: 'ഉദ്യം MSME രജിസ്ട്രേഷനും വിശദമായ പ്രോജക്ട് റിപ്പോർട്ടും (DPR) ലഭ്യമാക്കുക.',
        badge: 'നടപടി ആവശ്യമാണ് (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'അപേക്ഷ സമർപ്പിക്കുക',
        desc: 'ഔദ്യോഗിക KVIC / JanSamarth / PMFME പോർട്ടലുകളിൽ അപേക്ഷ രജിസ്റ്റർ ചെയ്യുക.',
        badge: 'ഷെഡ്യൂൾ ചെയ്തു'
      },
      {
        stepNumber: 6,
        title: 'ബാങ്ക് / അക്ഷയ കേന്ദ്രം സന്ദർശിക്കുക',
        desc: 'നിർദ്ദിഷ്ട ലീഡ് ബാങ്ക് ശാഖയിലോ അക്ഷയ കേന്ദ്രത്തിലോ നേരിട്ട് ഹാജരാവുക.',
        badge: 'നേരിട്ടുള്ള പരിശോധന'
      },
      {
        stepNumber: 7,
        title: 'അപേക്ഷ ട്രാക്ക് ചെയ്യുക & സബ്‌സിഡി ലഭ്യമാക്കുക',
        desc: 'DLTFC കമ്മിറ്റി അനുമതിയും സബ്‌സിഡി തുക അക്കൗണ്ടിൽ ലഭ്യമാകുന്നതും നിരീക്ഷിക്കുക.',
        badge: 'ട്രാക്കിംഗ്'
      }
    ]
  },
  ta: {
    targetCompletionText: 'இலக்கு நிறைவு: அடுத்த 3 நாட்களுக்குள்',
    nextActionTitle: (sector) => `${sector} தொழிலுக்கான விரிவான திட்ட அறிக்கையை (DPR) பதிவேற்றவும்`,
    nextActionDesc: 'உங்கள் PMEGP மற்றும் PMFME திட்ட விண்ணப்பத்திற்கு திட்ட அறிக்கை தேவை. உங்கள் DPR-ஐ பதிவேற்றவும் அல்லது மாவட்ட தொழில் மையத்தில் (DIC) இலவச உதவி பெறவும்.',
    lifecycleTitle: '7-படி அரசு நிறுவன திட்ட சுழற்சி',
    steps: [
      {
        stepNumber: 1,
        title: 'சுயவிவரத்தை பூர்த்தி செய்க',
        desc: 'அடிப்படை தனிநபர், வணிகம் மற்றும் நிதி விவரங்களை ஸ்கீம்மியாட்ச் AI-ல் பதிவு செய்யவும்.',
        badge: 'முடிந்தது ✓'
      },
      {
        stepNumber: 2,
        title: 'தொடக்கத் தகுதியை சரிபார்க்கவும்',
        desc: 'KVIC, MoFPI, SIDBI மற்றும் MSME விதிகளின் அடிப்படையில் AI தகுதி கணக்கிடப்பட்டது.',
        badge: 'சரிபார்க்கப்பட்டது ✓'
      },
      {
        stepNumber: 3,
        title: 'ஆவணங்களை தயார் செய்யவும்',
        desc: 'ஆதார் KYC, வருமானச் சான்றிதழ், முகவரி சான்று மற்றும் வங்கி பாஸ்புக்கை உறுதிப்படுத்தவும்.',
        badge: 'பதிவேற்றப்பட்டது ✓'
      },
      {
        stepNumber: 4,
        title: 'விடுபட்ட ஆவணங்களை முடிக்கவும்',
        desc: 'உத்யம் MSME பதிவு மற்றும் விரிவான திட்ட அறிக்கையை (DPR) தயார் செய்யவும்.',
        badge: 'செயல்பாட்டில் (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்',
        desc: 'அதிகாரப்பூர்வ KVIC / JanSamarth / PMFME இணையதளத்தில் விண்ணப்பிக்கவும்.',
        badge: 'திட்டமிடப்பட்டது'
      },
      {
        stepNumber: 6,
        title: 'வங்கி / இ-சேவை மையத்தை அணுகவும்',
        desc: 'வங்கி கிளை அல்லது இ-சேவை மையத்தில் நேரடி சரிபார்ப்பை மேற்கொள்ளவும்.',
        badge: 'நேரடி சேவை'
      },
      {
        stepNumber: 7,
        title: 'விண்ணப்பத்தை கண்காணித்து மானியம் பெறவும்',
        desc: 'DLTFC குழுவின் ஒப்புதல் மற்றும் மூலதன மானியம் வங்கிக் கணக்கில் வருவதைக் கண்காணிக்கவும்.',
        badge: 'கண்காணிப்பு'
      }
    ]
  },
  hi: {
    targetCompletionText: 'लक्ष्य पूर्णता: अगले 3 दिनों में',
    nextActionTitle: (sector) => `${sector} इकाई हेतु विस्तृत परियोजना रिपोर्ट (DPR) अपलोड करें`,
    nextActionDesc: 'PMEGP एवं PMFME योजनाओं हेतु तकनीकी परियोजना रिपोर्ट अनिवार्य है। अपनी DPR अपलोड करें या जिला उद्योग केंद्र (DIC) से सहायता प्राप्त करें।',
    lifecycleTitle: '7-चरणीय सरकारी उद्यम योजना चक्र',
    steps: [
      {
        stepNumber: 1,
        title: 'प्रोफाइल पूरा करें',
        desc: 'स्कीममैच AI में बुनियादी व्यक्तिगत, व्यावसायिक एवं ऋण विवरण भरें।',
        badge: 'पूर्ण हुआ ✓'
      },
      {
        stepNumber: 2,
        title: 'प्रारंभिक पात्रता जांचें',
        desc: 'KVIC, MoFPI, SIDBI एवं MSME नियमों के आधार पर AI द्वारा पात्रता जांची गई।',
        badge: 'सत्यापित ✓'
      },
      {
        stepNumber: 3,
        title: 'दस्तावेज़ तैयार करें',
        desc: 'आधार KYC, आय प्रमाण पत्र, पता प्रमाण एवं बैंक पासबुक सत्यापित करें।',
        badge: 'अपलोड किया गया ✓'
      },
      {
        stepNumber: 4,
        title: 'लंबित दस्तावेज़ पूर्ण करें',
        desc: 'उद्यम MSME पंजीकरण एवं विस्तृत परियोजना रिपोर्ट (DPR) तैयार करें।',
        badge: 'प्रगति पर (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'आवेदन जमा करें',
        desc: 'आधिकारिक KVIC / JanSamarth / PMFME ई-पोर्टल पर आवेदन दर्ज करें।',
        badge: 'निर्धारित'
      },
      {
        stepNumber: 6,
        title: 'बैंक / CSC केंद्र जाएं',
        desc: 'नामित लीड बैंक शाखा या CSC सेवा केंद्र में भौतिक सत्यापन कराएं।',
        badge: 'स्थानीय केंद्र'
      },
      {
        stepNumber: 7,
        title: 'आवेदन ट्रैक करें एवं सब्सिडी प्राप्त करें',
        desc: 'DLTFC समिति की स्वीकृति एवं बैंक खाते में सब्सिडी क्रेडिट की निगरानी करें।',
        badge: 'ट्रैकिंग'
      }
    ]
  },
  kn: {
    targetCompletionText: 'ಗುರಿ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ: ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ',
    nextActionTitle: (sector) => `${sector} ಘಟಕಕ್ಕಾಗಿ ಯೋಜನಾ ವರದಿ (DPR) ಅಪ್‌ಲೋಡ್ ಮಾಡಿ`,
    nextActionDesc: 'PMEGP ಮತ್ತು PMFME ಯೋಜನೆಗಳಿಗಾಗಿ ತಾಂತ್ರಿಕ ವರದಿ ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ DPR ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಜಿಲ್ಲಾ ಕೈಗಾರಿಕಾ ಕೇಂದ್ರದಿಂದ (DIC) ಉಚಿತ ನೆರವು ಪಡೆಯಿರಿ.',
    lifecycleTitle: '7-ಹಂತದ ಸರ್ಕಾರಿ ಉದ್ಯಮ ಯೋಜನಾ ಪ್ರಕ್ರಿಯೆ',
    steps: [
      {
        stepNumber: 1,
        title: 'ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ',
        desc: 'ಸ್ಕೀಮ್‌ಮ್ಯಾಚ್ AI ನಲ್ಲಿ ಮೂಲ ವೈಯಕ್ತಿಕ ಮತ್ತು ವ್ಯಾಪಾರ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
        badge: 'ಪೂರ್ಣಗೊಂಡಿದೆ ✓'
      },
      {
        stepNumber: 2,
        title: 'ಪ್ರಾಥಮಿಕ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
        desc: 'KVIC, MoFPI, SIDBI ಮತ್ತು MSME ನಿಯಮಗಳ ಆಧಾರದ ಮೇಲೆ AI ಅರ್ಹತೆ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿದೆ.',
        badge: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ ✓'
      },
      {
        stepNumber: 3,
        title: 'ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ',
        desc: 'ಆಧಾರ್ KYC, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ವಿಳಾಸ ಪುರಾವೆ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪರಿಶೀಲಿಸಿ.',
        badge: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ ✓'
      },
      {
        stepNumber: 4,
        title: 'ಬಾಕಿ ಇರುವ ದಾಖಲೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ',
        desc: 'ಉದ್ಯಮ್ MSME ನೋಂದಣಿ ಮತ್ತು ವಿವರವಾದ ಯೋಜನಾ ವರದಿಯನ್ನು (DPR) ಸಿದ್ಧಪಡಿಸಿ.',
        badge: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        desc: 'ಅಧಿಕೃತ KVIC / JanSamarth / PMFME ಪೋರ್ಟಲ್‌ಗಳಲ್ಲಿ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.',
        badge: 'ನಿಗದಿಯಾಗಿದೆ'
      },
      {
        stepNumber: 6,
        title: 'ಬ್ಯಾಂಕ್ / CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ',
        desc: 'ಲೀಡ್ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ CSC ಕೇಂದ್ರದಲ್ಲಿ ಖುದ್ದಾಗಿ ಪರಿಶೀಲನೆ ನಡೆಸಿ.',
        badge: 'ನೇರ ಪರಿಶೀಲನೆ'
      },
      {
        stepNumber: 7,
        title: 'ಅರ್ಜಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ & ಸಬ್ಸಿಡಿ ಪಡೆಯಿರಿ',
        desc: 'DLTFC ಸಮಿತಿ ಅನುಮೋದನೆ ಮತ್ತು ಖಾತೆಗೆ ಸಬ್ಸಿಡಿ ಜಮೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
        badge: 'ಟ್ರ್ಯಾಕಿಂಗ್'
      }
    ]
  },
  te: {
    targetCompletionText: 'లక్ష్య పూర్తి: రాబోయే 3 రోజుల్లో',
    nextActionTitle: (sector) => `${sector} వ్యాపారం కోసం ప్రాజెక్ట్ నివేదికను (DPR) అప్‌లోడ్ చేయండి`,
    nextActionDesc: 'PMEGP మరియు PMFME పథకాల దరఖాస్తుకు సాంకేతిక ప్రాజెక్ట్ నివేదిక అవసరం. మీ DPR అప్‌లోడ్ చేయండి లేదా జిల్లా పరిశ్రమల కేంద్రం (DIC) సహాయం పొందండి.',
    lifecycleTitle: '7-దశల ప్రభుత్వ వ్యాపార పథకాల ప్రక్రియ',
    steps: [
      {
        stepNumber: 1,
        title: 'ప్రొఫైల్ పూర్తి చేయండి',
        desc: 'స్కీమ్‌మ్యాచ్ AI లో ప్రాథమిక వ్యక్తిగత మరియు వ్యాపార వివరాలను నమోదు చేయండి.',
        badge: 'పూర్తయింది ✓'
      },
      {
        stepNumber: 2,
        title: 'ప్రాథమిక అర్హతను తనిఖీ చేయండి',
        desc: 'KVIC, MoFPI, SIDBI మరియు MSME నిబంధనల ప్రకారం AI అర్హతను విశ్లేషించింది.',
        badge: 'ధృవీకరించబడింది ✓'
      },
      {
        stepNumber: 3,
        title: 'పత్రాలను సిద్ధం చేసుకోండి',
        desc: 'ఆధార్ KYC, ఆదాయ ధృవీకరణ పత్రం, చిరునామా మరియు బ్యాంక్ పాస్‌బుక్ తనిఖీ చేయండి.',
        badge: 'అప్‌లోడ్ చేయబడింది ✓'
      },
      {
        stepNumber: 4,
        title: 'మిగిలిన పత్రాలను పూర్తి చేయండి',
        desc: 'ఉద్యమ్ MSME నమోదు మరియు వివరణాత్మక ప్రాజెక్ట్ నివేదికను (DPR) సిద్ధం చేయండి.',
        badge: 'పురోగతిలో ఉంది (Pending DPR)'
      },
      {
        stepNumber: 5,
        title: 'దరఖాస్తును సమర్పించండి',
        desc: 'అధికారిక KVIC / JanSamarth / PMFME ఈ-పోర్టల్స్‌లో దరఖాస్తు చేసుకోండి.',
        badge: 'షెడ్యూల్ చేయబడింది'
      },
      {
        stepNumber: 6,
        title: 'బ్యాంక్ / మీ-సేవా కేంద్రానికి వెళ్లండి',
        desc: 'లీడ్ బ్యాంక్ బ్రాంచ్ లేదా మీ-సేవా కేంద్రంలో ప్రత్యక్ష ధృవీకరణ పూర్తి చేయండి.',
        badge: 'ప్రత్యక్ష ధృవీకరణ'
      },
      {
        stepNumber: 7,
        title: 'దరఖాస్తు ట్రాక్ చేసి రాయితీ పొందండి',
        desc: 'DLTFC కమిటీ ఆమోదం మరియు ఖాతాలో సబ్సిడీ జమను పర్యవేక్షించండి.',
        badge: 'ట్రాకింగ్'
      }
    ]
  }
};

export function getLocalizedRoadmapData(langCode = 'en') {
  return ROADMAP_TRANSLATIONS[langCode] || ROADMAP_TRANSLATIONS.en;
}
