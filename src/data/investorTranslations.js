// Multilingual Translations for Investor Matching Module
// Supports: English (en), Tamil (ta), Hindi (hi), Kannada (kn), Malayalam (ml), Telugu (te)
import { getLocalizedSector, getLocalizedStage } from './sectorTranslations.js';

export const INVESTOR_UI_TRANSLATIONS = {
  en: {
    investorMatching: 'Investor Matching',
    schemeMatching: 'Scheme Matching',
    dualEngineNote: 'Dual AI Engines: Scheme Grants & Equity Investors',
    bannerTitle: 'AI Investor Matching & Capital Alignment',
    bannerSubtitle: 'Our AI analyzes your business sector, capital requirement, and maturity stage to connect you with verified Indian angel networks, seed platforms, venture syndicates, and impact funds.',
    multiFactorScored: 'Multi-Factor Compatibility Scored',
    capitalPositioning: 'Your Capital Positioning',
    focus: 'Focus',
    seeking: 'Seeking',
    capitalFor: 'capital for',
    stageEnterpriseIn: 'stage enterprise in',
    tierVsScoreTitle: 'Capital Tier vs Match Score',
    tierVsScoreDesc: 'Capital Tier represents the ticket size (Tier A: ₹1Cr+, Tier B: ₹10L–₹1Cr, Tier C: <₹10L). The Match % represents your business compatibility.',
    searchPlaceholder: 'Search investor by name, network, or sector...',
    allTiers: 'All Tiers',
    tierA: 'Tier A: ₹1Cr+',
    tierB: 'Tier B: ₹10L–₹1Cr',
    tierC: 'Tier C: <₹10L',
    sortBy: 'Sort By:',
    sortHighestMatch: 'Highest AI Compatibility %',
    sortTicketHighLow: 'Max Ticket Size (High to Low)',
    sortTicketLowHigh: 'Min Ticket Size (Low to High)',
    sortNameAZ: 'Investor Name (A-Z)',
    resetFilters: 'Reset Investor Filters',
    advisoryTitle: 'Important Compatibility & Investor Match Advisory',
    advisoryDesc: 'This is an AI compatibility match based on publicly stated investment preferences and ticket ranges, not an investment recommendation or guarantee of funding. Investment availability, terms, and current intake windows must be verified directly on the official investor network portal.',
    showingInvestors: 'Verified Investor Networks',
    showingCount: 'Showing',
    noInvestorsFound: 'No Investors Found Matching Filters',
    noInvestorsDesc: 'Try switching capital tiers or clearing your search term to see all verified investor networks.',
    resetAll: 'Reset All Investor Filters',
    
    // Card UI
    compatibility: 'Compatibility',
    investmentTicket: 'Investment Ticket',
    investorType: 'Investor Type',
    preferredStages: 'Preferred Stages:',
    whyMatchedTitle: 'Why This Investor Was Matched:',
    potentialGapAlert: 'Verification Advisory:',
    targetSectors: 'Target Sectors:',
    impactFocus: 'Impact Focus:',
    equityPreference: 'Equity Preference:',
    verified: 'Verified:',
    statusActive: 'Active Investor Network',
    fullProfile: 'Full Investor Profile',
    lessDetails: 'Less Details',
    visitPortal: 'Visit Portal',
    tierA_badge: 'Tier A — ₹1 Cr+ (Large Capital)',
    tierB_badge: 'Tier B — ₹10L – ₹1 Cr (Medium Capital)',
    tierC_badge: 'Tier C — < ₹10L (Small Capital)',

    // Profile Section 3
    fundingRequirementsTitle: 'Funding & Investor Matching Requirements',
    fundingRequirementsSubtitle: 'Define your capital ask to match with suitable Tier A, B, or C Indian investor networks.',
    matchInvestorsBtn: 'Match Investors (Tier A/B/C)'
  },

  ta: {
    investorMatching: 'முதலீட்டாளர் பொருத்தம்',
    schemeMatching: 'அரசு திட்டங்கள் பொருத்தம்',
    dualEngineNote: 'இரட்டை AI அமைப்புகள்: திட்ட மானியங்கள் & முதலீட்டாளர்கள்',
    bannerTitle: 'AI முதலீட்டாளர் பொருத்தம் & மூலதன பகுப்பாய்வு',
    bannerSubtitle: 'உங்கள் தொழில் துறை, மூலதன தேவை மற்றும் வணிக நிலையை ஆய்வு செய்து, பதிவுசெய்யப்பட்ட இந்திய ஏஞ்சல் நெட்வொர்க்குகள், சீட் நிதிகள் மற்றும் தாக்க முதலீட்டாளர்களுடன் இணைக்கிறது.',
    multiFactorScored: 'பல-காரணி AI பொருத்த மதிப்பீடு',
    capitalPositioning: 'உங்கள் மூலதன நிலை',
    focus: 'முன்னுரிமை',
    seeking: 'கோரும் நிதி',
    capitalFor: 'மூலதனம்',
    stageEnterpriseIn: 'நிலையில் உள்ள தொழிலுக்கு',
    tierVsScoreTitle: 'மூலதன அடுக்கு vs பொருத்தம் மதிப்பெண்',
    tierVsScoreDesc: 'மூலதன அடுக்கு என்பது முதலீட்டு தொகையின் அளவை குறிக்கிறது (Tier A: ₹1 கோடி+, Tier B: ₹10 லட்சம்–₹1 கோடி, Tier C: <₹10 லட்சம்). சதவீத மதிப்பெண் உங்கள் வணிகப் பொருத்தத்தை குறிக்கிறது.',
    searchPlaceholder: 'பெயர், நெட்வொர்க் அல்லது துறை மூலம் முதலீட்டாளரைத் தேடுங்கள்...',
    allTiers: 'அனைத்து அடுக்குகள்',
    tierA: 'அடுக்கு A: ₹1 கோடி+',
    tierB: 'அடுக்கு B: ₹10L–₹1 கோடி',
    tierC: 'அடுக்கு C: <₹10L',
    sortBy: 'வரிசைப்படுத்து:',
    sortHighestMatch: 'அதிக AI பொருந்தக்கூடிய %',
    sortTicketHighLow: 'முதலீட்டு தொகை (உயர் முதல் குறை)',
    sortTicketLowHigh: 'முதலீட்டு தொகை (குறை முதல் உயர்)',
    sortNameAZ: 'முதலீட்டாளர் பெயர் (A-Z)',
    resetFilters: 'வடிகட்டிகளை மீட்டமை',
    advisoryTitle: 'முக்கிய முதலீட்டு எச்சரிக்கை & தகவல்',
    advisoryDesc: 'இது பொது முதலீட்டு கொள்கைகளின் அடிப்படையிலான AI பொருந்தக்கூடிய மதிப்பீடு மட்டுமே; முதலீட்டு உத்தரவாதம் அல்ல. நிதி கிடைக்கும் தன்மை மற்றும் நிபந்தனைகளை அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.',
    showingInvestors: 'சரிபார்க்கப்பட்ட முதலீட்டாளர் அமைப்புகள்',
    showingCount: 'காட்டப்படுகிறது',
    noInvestorsFound: 'முதலீட்டாளர்கள் காணப்படவில்லை',
    noInvestorsDesc: 'வடிகட்டிகளை மாற்றவும் அல்லது அனைத்து முதலீட்டாளர்களையும் காண மீட்டமைக்கவும்.',
    resetAll: 'அனைத்து வடிகட்டிகளையும் மீட்டமை',

    // Card UI
    compatibility: 'பொருத்தம்',
    investmentTicket: 'முதலீட்டு வரம்பு',
    investorType: 'முதலீட்டாளர் வகை',
    preferredStages: 'விரும்பப்படும் நிலைகள்:',
    whyMatchedTitle: 'இந்த முதலீட்டாளர் ஏன் பொருத்தப்பட்டார்:',
    potentialGapAlert: 'சரிபார்ப்பு குறிப்பு:',
    targetSectors: 'இலக்கு துறைகள்:',
    impactFocus: 'தாக்க கவனம்:',
    equityPreference: 'பங்கு உரிமை விருப்பம்:',
    verified: 'சரிபார்க்கப்பட்டது:',
    statusActive: 'செயலில் உள்ள முதலீட்டாளர் நெட்வொர்க்',
    fullProfile: 'முழு விவரங்கள்',
    lessDetails: 'சுருக்கமான விவரங்கள்',
    visitPortal: 'தளத்திற்குச் செல்க',
    tierA_badge: 'அடுக்கு A — ₹1 கோடி+ (பெரிய மூலதனம்)',
    tierB_badge: 'அடுக்கு B — ₹10L – ₹1 கோடி (நடுத்தர மூலதனம்)',
    tierC_badge: 'அடுக்கு C — < ₹10L (சிறிய மூலதனம்)',

    // Profile Section 3
    fundingRequirementsTitle: 'நிதி & முதலீட்டாளர் பொருத்தம் (அடுக்கு A / B / C)',
    fundingRequirementsSubtitle: 'பொருத்தமான அடுக்கு A, B, அல்லது C இந்திய முதலீட்டாளர் அமைப்புகளுடன் இணைய உங்கள் நிதித் தேவையை உள்ளிடவும்.',
    matchInvestorsBtn: 'முதலீட்டாளர்கள் பொருத்தம் (Tier A/B/C)'
  },

  hi: {
    investorMatching: 'निवेशक मिलान',
    schemeMatching: 'सरकारी योजना मिलान',
    dualEngineNote: 'दोहरे एआई इंजन: योजना सब्सिडी एवं इक्विटी निवेशक',
    bannerTitle: 'एआई निवेशक मिलान एवं पूंजी संरेखण',
    bannerSubtitle: 'हमारा एआई आपके व्यावसायिक क्षेत्र, पूंजी की आवश्यकता और विकास चरण का विश्लेषण कर सत्यापित भारतीय एंजल नेटवर्क, सीड प्लेटफॉर्म और इम्पैक्ट फंड्स से जोड़ता है।',
    multiFactorScored: 'मल्टी-फैक्टर अनुकूलता स्कोर',
    capitalPositioning: 'आपकी पूंजी स्थिति',
    focus: 'श्रेणी',
    seeking: 'आवश्यकता',
    capitalFor: 'पूंजी',
    stageEnterpriseIn: 'चरण के उद्यम के लिए',
    tierVsScoreTitle: 'पूंजी श्रेणी बनाम मिलान स्कोर',
    tierVsScoreDesc: 'पूंजी श्रेणी निवेश टिकट आकार को दर्शाती है (Tier A: ₹1 करोड़+, Tier B: ₹10 लाख–₹1 करोड़, Tier C: <₹10 लाख)। मिलान प्रतिशत आपकी व्यावसायिक अनुकूलता को दर्शाता है।',
    searchPlaceholder: 'निवेशक, संस्था या क्षेत्र के नाम से खोजें...',
    allTiers: 'सभी श्रेणियां',
    tierA: 'टियर A: ₹1 करोड़+',
    tierB: 'टियर B: ₹10 लाख–₹1 करोड़',
    tierC: 'टियर C: <₹10 लाख',
    sortBy: 'क्रमबद्ध करें:',
    sortHighestMatch: 'उच्चतम एआई अनुकूलता %',
    sortTicketHighLow: 'अधिकतम टिकट आकार (उच्च से निम्न)',
    sortTicketLowHigh: 'न्यूनतम टिकट आकार (निम्न से उच्च)',
    sortNameAZ: 'निवेशक का नाम (A-Z)',
    resetFilters: 'फ़िल्टर रीसेट करें',
    advisoryTitle: 'महत्वपूर्ण विनियामक एवं अनुकूलता सूचना',
    advisoryDesc: 'यह सार्वजनिक प्राथमिकताओं पर आधारित एआई संगतता मिलान है, निवेश की गारंटी या सिफारिश नहीं। निवेश की उपलब्धता और शर्तों की पुष्टि आधिकारिक पोर्टल पर करें।',
    showingInvestors: 'सत्यापित निवेशक नेटवर्क',
    showingCount: 'प्रदर्शित',
    noInvestorsFound: 'कोई निवेशक नहीं मिला',
    noInvestorsDesc: 'कृपया फ़िल्टर समायोजित करें या सभी निवेशक नेटवर्क देखने के लिए रीसेट करें।',
    resetAll: 'सभी फ़िल्टर रीसेट करें',

    // Card UI
    compatibility: 'अनुकूलता',
    investmentTicket: 'निवेश टिकट आकार',
    investorType: 'निवेशक प्रकार',
    preferredStages: 'पसंदीदा चरण:',
    whyMatchedTitle: 'इस निवेशक का मिलान क्यों हुआ:',
    potentialGapAlert: 'सत्यापन सलाह:',
    targetSectors: 'लक्षित क्षेत्र:',
    impactFocus: 'सामाजिक प्रभाव:',
    equityPreference: 'इक्विटी वरीयता:',
    verified: 'सत्यापित:',
    statusActive: 'सक्रिय निवेशक नेटवर्क',
    fullProfile: 'पूर्ण निवेशक प्रोफ़ाइल',
    lessDetails: 'कम विवरण',
    visitPortal: 'पोर्टल पर जाएं',
    tierA_badge: 'टियर A — ₹1 करोड़+ (बड़ी पूंजी)',
    tierB_badge: 'टियर B — ₹10 लाख – ₹1 करोड़ (मध्यम पूंजी)',
    tierC_badge: 'टियर C — < ₹10 लाख (छोटी पूंजी)',

    // Profile Section 3
    fundingRequirementsTitle: 'फंडिंग एवं निवेशक मिलान आवश्यकताएं (टियर A / B / C)',
    fundingRequirementsSubtitle: 'उपयुक्त टियर A, B, या C भारतीय निवेशक नेटवर्क से मिलान करने के लिए अपनी पूंजी आवश्यकता दर्ज करें।',
    matchInvestorsBtn: 'निवेशक मिलान देखें (Tier A/B/C)'
  },

  kn: {
    investorMatching: 'ಹೂಡಿಕೆದಾರರ ಹೊಂದಾಣಿಕೆ',
    schemeMatching: 'ಸರ್ಕಾರಿ ಯೋಜನೆ ಹೊಂದಾಣಿಕೆ',
    dualEngineNote: 'ದ್ವಿಮುಖ AI ಎಂಜಿನ್: ಯೋಜನೆ ಅನುದಾನಗಳು & ಇಕ್ವಿಟಿ ಹೂಡಿಕೆದಾರರು',
    bannerTitle: 'AI ಹೂಡಿಕೆದಾರರ ಹೊಂದಾಣಿಕೆ & ಬಂಡವಾಳ ವಿಶ್ಲೇಷಣೆ',
    bannerSubtitle: 'ನಿಮ್ಮ ವ್ಯಾಪಾರ ಕ್ಷೇತ್ರ, ಬಂಡವಾಳದ ಅಗತ್ಯತೆ ಮತ್ತು ಹಂತವನ್ನು ಪರಿಶೀಲಿಸಿ ಪರಿಶೀಲಿತ ಭಾರತೀಯ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು ಮತ್ತು ಬೀಜ ನಿಧಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    multiFactorScored: 'ಬಹು-ಅಂಶ AI ಹೊಂದಾಣಿಕೆ ಸ್ಕೋರ್',
    capitalPositioning: 'ನಿಮ್ಮ ಬಂಡವಾಳದ ಸ್ಥಾನಮಾನ',
    focus: 'ಆದ್ಯತೆ',
    seeking: 'ಅಗತ್ಯವಿರುವ ಬಂಡವಾಳ',
    capitalFor: 'ಬಂಡವಾಳ',
    stageEnterpriseIn: 'ಹಂತದ ಉದ್ಯಮಕ್ಕೆ',
    tierVsScoreTitle: 'ಬಂಡವಾಳ ಶ್ರೇಣಿ vs ಹೊಂದಾಣಿಕೆ ಅಂಕ',
    tierVsScoreDesc: 'ಬಂಡವಾಳ ಶ್ರೇಣಿಯು ಹೂಡಿಕೆಯ ಗಾತ್ರವನ್ನು ಸೂಚಿಸುತ್ತದೆ (Tier A: ₹1 ಕೋಟಿ+, Tier B: ₹10 ಲಕ್ಷ–₹1 ಕೋಟಿ, Tier C: <₹10 ಲಕ್ಷ). ಶೇಕಡಾವಾರು ಹೊಂದಾಣಿಕೆಯು ನಿಮ್ಮ ವ್ಯಾಪಾರ ಸೂಕ್ತತೆಯನ್ನು ತಿಳಿಸುತ್ತದೆ.',
    searchPlaceholder: 'ಹೂಡಿಕೆದಾರರು, ಸಂಸ್ಥೆ ಅಥವಾ ಕ್ಷೇತ್ರದ ಮೂಲಕ ಹುಡುಕಿ...',
    allTiers: 'ಎಲ್ಲಾ ಶ್ರೇಣಿಗಳು',
    tierA: 'ಶ್ರೇಣಿ A: ₹1 ಕೋಟಿ+',
    tierB: 'ಶ್ರೇಣಿ B: ₹10L–₹1 ಕೋಟಿ',
    tierC: 'ಶ್ರೇಣಿ C: <₹10L',
    sortBy: 'ವಿಂಗಡಿಸಿ:',
    sortHighestMatch: 'ಗರಿಷ್ಠ AI ಹೊಂದಾಣಿಕೆ %',
    sortTicketHighLow: 'ಗರಿಷ್ಠ ಹೂಡಿಕೆ (ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ)',
    sortTicketLowHigh: 'ಕನಿಷ್ಠ ಹೂಡಿಕೆ (ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು)',
    sortNameAZ: 'ಹೂಡಿಕೆದಾರರ ಹೆಸರು (A-Z)',
    resetFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    advisoryTitle: 'ಪ್ರಮುಖ ಹೂಡಿಕೆ ಮಾಹಿತಿ ಮತ್ತು ಎಚ್ಚರಿಕೆ',
    advisoryDesc: 'ಇದು ಸಾರ್ವಜನಿಕ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾಡಿದ AI ಹೊಂದಾಣಿಕೆಯಾಗಿದೆ; ಹೂಡಿಕೆಯ ಖಾತರಿಯಲ್ಲ. ಲಭ್ಯತೆ ಮತ್ತು ನಿಯಮಗಳನ್ನು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೃಢೀಕರಿಸಿ.',
    showingInvestors: 'ಪರಿಶೀಲಿತ ಹೂಡಿಕೆದಾರರ ನೆಟ್‌ವರ್ಕ್‌ಗಳು',
    showingCount: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
    noInvestorsFound: 'ಯಾವುದೇ ಹೂಡಿಕೆದಾರರು ಕಂಡುಬಂದಿಲ್ಲ',
    noInvestorsDesc: 'ಎಲ್ಲಾ ಹೂಡಿಕೆದಾರರನ್ನು ವೀಕ್ಷಿಸಲು ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ.',
    resetAll: 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',

    // Card UI
    compatibility: 'ಹೊಂದಾಣಿಕೆ',
    investmentTicket: 'ಹೂಡಿಕೆ ಮಿತಿ',
    investorType: 'ಹೂಡಿಕೆದಾರರ ಪ್ರಕಾರ',
    preferredStages: 'ಆದ್ಯತೆಯ ಹಂತಗಳು:',
    whyMatchedTitle: 'ಈ ಹೂಡಿಕೆದಾರರನ್ನು ಏಕೆ ಹೊಂದಿಸಲಾಗಿದೆ:',
    potentialGapAlert: 'ಪರಿಶೀಲನಾ ಸಲಹೆ:',
    targetSectors: 'ಗುರಿ ವಲಯಗಳು:',
    impactFocus: 'ಸಾಮಾಜಿಕ ಪರಿಣಾಮ:',
    equityPreference: 'ಷೇರು ಆದ್ಯತೆ:',
    verified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ:',
    statusActive: 'ಸಕ್ರಿಯ ಹೂಡಿಕೆದಾರರ ನೆಟ್‌ವರ್ಕ್',
    fullProfile: 'ಸಂಪೂರ್ಣ ವಿವರಗಳು',
    lessDetails: 'ಕಡಿಮೆ ವಿವರಗಳು',
    visitPortal: 'ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',
    tierA_badge: 'ಶ್ರೇಣಿ A — ₹1 ಕೋಟಿ+ (ದೊಡ್ಡ ಬಂಡವಾಳ)',
    tierB_badge: 'ಶ್ರೇಣಿ B — ₹10L – ₹1 ಕೋಟಿ (ಮಧ್ಯಮ ಬಂಡವಾಳ)',
    tierC_badge: 'ಶ್ರೇಣಿ C — < ₹10L (ಸಣ್ಣ ಬಂಡವಾಳ)',

    // Profile Section 3
    fundingRequirementsTitle: 'ಬಂಡವಾಳ & ಹೂಡಿಕೆದಾರರ ಹೊಂದಾಣಿಕೆ ಅಗತ್ಯತೆಗಳು',
    fundingRequirementsSubtitle: 'ಸೂಕ್ತ ಶ್ರೇಣಿ A, B, ಅಥವಾ C ಭಾರತೀಯ ಹೂಡಿಕೆದಾರರೊಂದಿಗೆ ಹೊಂದಿಸಲು ನಿಮ್ಮ ಬಂಡವಾಳದ ಅಗತ್ಯವನ್ನು ನಮೂದಿಸಿ.',
    matchInvestorsBtn: 'ಹೂಡಿಕೆದಾರರ ಹೊಂದಾಣಿಕೆ (Tier A/B/C)'
  },

  ml: {
    investorMatching: 'നിക്ഷേപക പൊരുത്തം',
    schemeMatching: 'പദ്ധതി പൊരുത്തം',
    dualEngineNote: 'ഇരട്ട AI എഞ്ചിനുകൾ: സർക്കാർ സബ്‌സിഡികളും ഇക്വിറ്റി നിക്ഷേപകരും',
    bannerTitle: 'AI നിക്ഷേപക പൊരുത്തവും മൂലധന വിന്യാസവും',
    bannerSubtitle: 'നിങ്ങളുടെ ബിസിനസ്സ് മേഖലയും ആവശ്യമായ ഫണ്ടും പരിശോധിച്ച് അംഗീകൃത ഇന്ത്യൻ ഏഞ്ചൽ നെറ്റ്‌വർക്കുകളുമായും ഇംപാക്ട് ഫണ്ടുകളുമായും ബന്ധിപ്പിക്കുന്നു.',
    multiFactorScored: 'മൾട്ടി-ഫാക്ടർ AI സ്കോർ',
    capitalPositioning: 'നിങ്ങളുടെ മൂലധന സ്ഥാനം',
    focus: 'ശ്രേണി',
    seeking: 'ആവശ്യമായ തുക',
    capitalFor: 'മൂലധനം',
    stageEnterpriseIn: 'ഘട്ടത്തിലുള്ള സംരംഭത്തിന്',
    tierVsScoreTitle: 'മൂലധന ശ്രേണിയും സ്കോറും',
    tierVsScoreDesc: 'മൂലധന ശ്രേണി നിക്ഷേപ തുകയുടെ വലിപ്പത്തെ സൂചിപ്പിക്കുന്നു (Tier A: ₹1 കോടി+, Tier B: ₹10 ലക്ഷം–₹1 കോടി, Tier C: <₹10 ലക്ഷം). പൊരുത്ത ശതമാനം ബിസിനസ്സ് അനുയോജ്യതയെ കാണിക്കുന്നു.',
    searchPlaceholder: 'പേര് അല്ലെങ്കിൽ മേഖല ഉപയോഗിച്ച് തിരയുക...',
    allTiers: 'എല്ലാ ശ്രേണികളും',
    tierA: 'ടയർ A: ₹1 കോടി+',
    tierB: 'ടയർ B: ₹10L–₹1 കോടി',
    tierC: 'ടയർ C: <₹10L',
    sortBy: 'ക്രമീകരിക്കുക:',
    sortHighestMatch: 'ഏറ്റവും ഉയർന്ന AI പൊരുത്തം %',
    sortTicketHighLow: 'പരമാവധി നിക്ഷേപം (കൂടിയത് മുതൽ)',
    sortTicketLowHigh: 'കുറഞ്ഞ നിക്ഷേപം (കുറഞ്ഞത് മുതൽ)',
    sortNameAZ: 'പേര് (A-Z)',
    resetFilters: 'ഫിൽട്ടറുകൾ മാറ്റുക',
    advisoryTitle: 'പ്രധാന നിക്ഷേപ അറിയിപ്പ്',
    advisoryDesc: 'ഇത് പൊതു വിവരങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള AI പൊരുത്തം മാത്രമാണ്; നിക്ഷേപ ഗ്യാരണ്ടിയല്ല. ഔദ്യോഗിക പോർട്ടലിൽ വിവരങ്ങൾ പരിശോധിക്കുക.',
    showingInvestors: 'സ്ഥിരീകരിച്ച നിക്ഷേപക ശൃംഖലകൾ',
    showingCount: 'കാണിക്കുന്നത്',
    noInvestorsFound: 'നിക്ഷേപകരെ കണ്ടെത്താനായില്ല',
    noInvestorsDesc: 'എല്ലാ നിക്ഷേപകരെയും കാണാൻ ഫിൽട്ടറുകൾ മാറ്റുക.',
    resetAll: 'എല്ലാ ഫിൽട്ടറുകളും പുനഃക്രമീകരിക്കുക',

    // Card UI
    compatibility: 'പൊരുത്തം',
    investmentTicket: 'നിക്ഷേപ പരിധി',
    investorType: 'നിക്ഷേപക വിഭാഗം',
    preferredStages: 'താല്പര്യമുള്ള ഘട്ടങ്ങൾ:',
    whyMatchedTitle: 'ഈ നിക്ഷേപകനെ പൊരുത്തപ്പെടുത്തിയത് എന്തുകൊണ്ട്:',
    potentialGapAlert: 'പരിശോധനാ നിർദ്ദേശം:',
    targetSectors: 'ലക്ഷ്യ മേഖലകൾ:',
    impactFocus: 'സാമൂഹിക സ്വാധീനം:',
    equityPreference: 'ഓഹരി മുൻഗണന:',
    verified: 'സ്ഥിരീകരിച്ചു:',
    statusActive: 'സജീവ നിക്ഷേപക ശൃംഖല',
    fullProfile: 'പൂർണ്ണ വിവരങ്ങൾ',
    lessDetails: 'കുറഞ്ഞ വിവരങ്ങൾ',
    visitPortal: 'പോർട്ടൽ സന്ദർശിക്കുക',
    tierA_badge: 'ടയർ A — ₹1 കോടി+ (വലിയ മൂലധനം)',
    tierB_badge: 'ടയർ B — ₹10L – ₹1 കോടി (ഇടത്തരം മൂലധനം)',
    tierC_badge: 'ടയർ C — < ₹10L (ചെറിയ മൂലധനം)',

    // Profile Section 3
    fundingRequirementsTitle: 'ഫണ്ടിംഗും നിക്ഷേപക പൊരുത്ത ആവശ്യകതകളും',
    fundingRequirementsSubtitle: 'അനുയോജ്യമായ ഇന്ത്യൻ നിക്ഷേപക ശൃംഖലകളുമായി പൊരുത്തപ്പെടുന്നതിന് നിങ്ങളുടെ മൂലധന ആവശ്യകത നിർവ്വചിക്കുക.',
    matchInvestorsBtn: 'നിക്ഷേപക പൊരുത്തം (Tier A/B/C)'
  },

  te: {
    investorMatching: 'పెట్టుబడిదారుల సరిపోలిక',
    schemeMatching: 'ప్రభుత్వ పథకాల సరిపోలిక',
    dualEngineNote: 'ద్వంద్వ AI ఇంజిన్లు: పథకం సబ్సిడీలు & ఈక్విటీ పెట్టుబడిదారులు',
    bannerTitle: 'AI పెట్టుబడిదారుల సరిపోలిక & మూలధన విశ్లేషణ',
    bannerSubtitle: 'మీ వ్యాపార రంగం, నిధుల అవసరాన్ని విశ్లేషించి ధృవీకరించబడిన ఏంజెల్ నెట్‌వర్క్‌లు మరియు ఇంపాక్ట్ ఫండ్‌లతో కలుపుతుంది.',
    multiFactorScored: 'బహుళ-కారకాల AI స్కోరు',
    capitalPositioning: 'మీ మూలధన స్థితి',
    focus: 'కేటగిరీ',
    seeking: 'అవసరమైన నిధులు',
    capitalFor: 'మూలధనం',
    stageEnterpriseIn: 'దశలో ఉన్న వ్యాపారం కోసం',
    tierVsScoreTitle: 'మూలధన శ్రేణి vs అనుకూలత స్కోరు',
    tierVsScoreDesc: 'మూలధన శ్రేణి పెట్టుబడి పరిమాణాన్ని సూచిస్తుంది (Tier A: ₹1 కోటి+, Tier B: ₹10 లక్షలు–₹1 కోటి, Tier C: <₹10 లక్షలు). సరిపోలిక శాతం మీ వ్యాపార అనుకూలతను తెలియజేస్తుంది.',
    searchPlaceholder: 'పేరు లేదా రంగం ద్వారా శోధించండి...',
    allTiers: 'అన్ని శ్రేణులు',
    tierA: 'టైర్ A: ₹1 కోటి+',
    tierB: 'టైర్ B: ₹10లక్షలు–₹1 కోటి',
    tierC: 'టైర్ C: <₹10లక్షలు',
    sortBy: 'క్రమబద్ధీకరించండి:',
    sortHighestMatch: 'అత్యధిక AI సరిపోలిక %',
    sortTicketHighLow: 'గరిష్ట టికెట్ పరిమాణం (ఎక్కువ నుండి తక్కువ)',
    sortTicketLowHigh: 'కనిష్ట టికెట్ పరిమాణం (తక్కువ నుండి ఎక్కువ)',
    sortNameAZ: 'పేరు (A-Z)',
    resetFilters: 'ఫిల్టర్‌లను రీసెట్ చేయండి',
    advisoryTitle: 'ముఖ్యమైన పెట్టుబడి సలహా & నోటీసు',
    advisoryDesc: 'ఇది పబ్లిక్ సమాచారంపై ఆధారపడిన AI సరిపోలిక మాత్రమే; పెట్టుబడి హామీ కాదు. అధికారిక పోర్టల్‌లో నిబంధనలను ధృవీకరించండి.',
    showingInvestors: 'ధృవీకరించబడిన పెట్టుబడిదారుల నెట్‌వర్క్‌లు',
    showingCount: 'చూపిస్తున్నవి',
    noInvestorsFound: 'పెట్టుబడిదారులు కనిపించలేదు',
    noInvestorsDesc: 'అన్ని పెట్టుబడిదారులను చూడటానికి ఫిల్టర్‌లను రీసెట్ చేయండి.',
    resetAll: 'అన్ని ఫిల్టర్‌లను రీసెట్ చేయండి',

    // Card UI
    compatibility: 'సరిపోలిక',
    investmentTicket: 'పెట్టుబడి పరిధి',
    investorType: 'పెట్టుబడిదారు రకం',
    preferredStages: 'ప్రాధాన్యత దశలు:',
    whyMatchedTitle: 'ఈ పెట్టుబడిదారుడు ఎందుకు సరిపోలారు:',
    potentialGapAlert: 'పరిశీలన సలహా:',
    targetSectors: 'లక్ష్య రంగాలు:',
    impactFocus: 'సామాజిక ప్రభావం:',
    equityPreference: 'ఈక్విటీ ప్రాధాన్యత:',
    verified: 'ధృవీకరించబడింది:',
    statusActive: 'క్రియాశీల నెట్‌వర్క్',
    fullProfile: 'పూర్తి వివరాలు',
    lessDetails: 'తక్కువ వివరాలు',
    visitPortal: 'పోర్టల్‌ని సందర్శించండి',
    tierA_badge: 'టైర్ A — ₹1 కోటి+ (పెద్ద మూలధనం)',
    tierB_badge: 'టైర్ B — ₹10L – ₹1 కోటి (మధ్యస్థ మూలధనం)',
    tierC_badge: 'టైర్ C — < ₹10L (చిన్న మూలధనం)',

    // Profile Section 3
    fundingRequirementsTitle: 'నిధులు & పెట్టుబడిదారుల సరిపోలిక అవసరాలు',
    fundingRequirementsSubtitle: 'తగిన టైర్ A, B, లేదా C భారతీయ పెట్టుబడిదారుల నెట్‌వర్క్‌లతో సరిపోలడానికి మీ మూలధన అవసరాన్ని నమోదు చేయండి.',
    matchInvestorsBtn: 'పెట్టుబడిదారుల సరిపోలిక (Tier A/B/C)'
  }
};

// Multilingual translations for specific investors
export const INVESTOR_DATA_TRANSLATIONS = {
  'startup-india-connect': {
    ta: {
      name: 'ஸ்டார்ட்அப் இந்தியா இன்வெஸ்டர் கனெக்ட்',
      organization: 'DPIIT, வர்த்தக அமைச்சகம், இந்திய அரசு',
      investorType: 'அரசு முதலீட்டாளர் இணைப்பு தளம்',
      description: 'DPIIT பதிவுசெய்த ஸ்டார்ட்அப்களை முன்னணி ஏஞ்சல் நெட்வொர்க்குகள், துணிகர நிதிகள் மற்றும் கூட்டு முதலீட்டு வசதியுடன் இணைக்கும் இந்திய அரசின் அதிகாரப்பூர்வ தளம்.',
      investmentRangeText: '₹5 லட்சம் – ₹5 கோடி',
      whyMatchedReasons: [
        'துறை பொருத்தம்: உங்கள் தொழில்துறைக்கு நேரடி முன்னுரிமை அளிக்கிறது.',
        'நிதி வரம்பு பொருத்தம்: உங்கள் கோரிக்கை அரசு தளம் வரம்பிற்குள் உள்ளது.',
        'அனைத்திந்திய தகுதி மற்றும் அரசு அங்கீகாரம்.'
      ],
      potentialGap: 'கூட்டு முதலீட்டு தகுதிக்கு DPIIT அங்கீகாரம் தேவைப்படுகிறது.'
    },
    hi: {
      name: 'स्टार्टअप इंडिया इन्वेस्टर कनेक्ट',
      organization: 'DPIIT, वाणिज्य एवं उद्योग मंत्रालय, भारत सरकार',
      investorType: 'सरकारी निवेशक कनेक्ट प्लेटफॉर्म',
      description: 'DPIIT-मान्यता प्राप्त स्टार्टअप्स को प्रमुख एंजल नेटवर्क, वेंचर फंड और सह-निवेश सुविधा से जोड़ने वाला भारत सरकार का आधिकारिक मंच।',
      investmentRangeText: '₹5 लाख – ₹5 करोड़',
      whyMatchedReasons: [
        'क्षेत्र मिलान: आपके उद्योग क्षेत्र के लिए सीधा समर्थन।',
        'फंडिंग रेंज मिलान: आपकी आवश्यकता मंच की सीमा के अनुकूल है।',
        'अखिल भारतीय कवरेज एवं सरकारी विश्वसनीयता।'
      ],
      potentialGap: 'सह-निवेश के लिए DPIIT स्टार्टअप मान्यता आवश्यक है।'
    },
    kn: {
      name: 'ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಇಂಡಿಯಾ ಇನ್ವೆಸ್ಟರ್ ಕನೆಕ್ಟ್',
      organization: 'DPIIT, ವಾಣಿಜ್ಯ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
      investorType: 'ಸರ್ಕಾರಿ ಹೂಡಿಕೆದಾರರ ಸಂಪರ್ಕ ವೇದಿಕೆ',
      description: 'DPIIT ಮಾನ್ಯತೆ ಪಡೆದ ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳನ್ನು ಪ್ರಮುಖ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು ಮತ್ತು ಸಾಂಸ್ಥಿಕ ನಿಧಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರದ ವೇದಿಕೆ.',
      investmentRangeText: '₹5 ಲಕ್ಷ – ₹5 ಕೋಟಿ',
      whyMatchedReasons: [
        'ಕ್ಷೇತ್ರ ಹೊಂದಾಣಿಕೆ: ನಿಮ್ಮ ಉದ್ಯಮ ವಲಯಕ್ಕೆ ನೇರ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.',
        'ಬಂಡವಾಳ ಮಿತಿ ಹೊಂದಾಣಿಕೆ: ನಿಮ್ಮ ಅವಶ್ಯಕತೆ ವೇದಿಕೆಯ ಮಿತಿಯಲ್ಲಿದೆ.',
        'ಅಖಿಲ ಭಾರತ ವ್ಯಾಪ್ತಿ ಮತ್ತು ಶೂನ್ಯ ಅರ್ಜಿ ಶುಲ್ಕ.'
      ],
      potentialGap: 'ಸಹ-ಹೂಡಿಕೆಗೆ DPIIT ಮಾನ್ಯತೆ ಅಗತ್ಯವಿದೆ.'
    },
    ml: {
      name: 'സ്റ്റാർട്ടപ്പ് ഇന്ത്യ ഇൻവെസ്റ്റർ കണക്ട്',
      organization: 'DPIIT, വാണിജ്യ മന്ത്രാലയം, ഭാരത സർക്കാർ',
      investorType: 'സർക്കാർ നിക്ഷേപക ബന്ധിപ്പിക്കൽ പ്ലാറ്റ്‌ഫോം',
      description: 'DPIIT അംഗീകൃത സ്റ്റാർട്ടപ്പുകളെ പ്രമുഖ ഏഞ്ചൽ നെറ്റ്‌വർക്കുകളുമായും വെഞ്ച്വർ ഫണ്ടുകളുമായും ബന്ധിപ്പിക്കുന്ന ഭാരത സർക്കാരിന്റെ ഔദ്യോഗിക പ്ലാറ്റ്‌ഫോം.',
      investmentRangeText: '₹5 ലക്ഷം – ₹5 കോടി'
    },
    te: {
      name: 'స్టార్టప్ ఇండియా ఇన్వెస్టర్ కనెక్ట్',
      organization: 'DPIIT, వాణిజ్య మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
      investorType: 'ప్రభుత్వ పెట్టుబడిదారుల కనెక్ట్ ప్లాట్‌ఫారమ్',
      description: 'DPIIT గుర్తింపు పొందిన స్టార్టప్‌లను ప్రముఖ ఏంజెల్ నెట్‌వర్క్‌లు మరియు వెంచర్ ఫండ్‌లతో అనుసంధానించే అధికారిక భారత ప్రభుత్వ వేదిక.',
      investmentRangeText: '₹5 లక్షలు – ₹5 కోట్లు'
    }
  },

  'indian-angel-network': {
    ta: {
      name: 'இந்தியன் ஏஞ்சல் நெட்வொர்க் (IAN)',
      organization: 'இந்தியன் ஏஞ்சல் நெட்வொர்க்',
      investorType: 'ஏஞ்சல் முதலீட்டாளர் கூட்டமைப்பு',
      description: 'விவசாயம், சுகாதாரம், ஐடி மற்றும் உற்பத்தியில் ஆரம்ப கட்ட நிறுவனங்களுக்கு $1M வரை நிதி மற்றும் வழிகாட்டுதல் வழங்கும் இந்தியாவின் முதன்மை ஏஞ்சல் நெட்வொர்க்.',
      investmentRangeText: '₹25 லட்சம் – ₹8.5 கோடி ($1M வரை)',
      whyMatchedReasons: [
        'வணிக நிலை பொருத்தம்: புதிய மற்றும் ஆரம்ப வளர்ச்சி நிறுவனங்களுக்கு ஆதரவு.',
        'மூத்த தொழில்முனைவோர் வழிகாட்டுதல் மற்றும் வணிக சந்தை இணைப்பு.',
        'அகில இந்திய அளவிலான முதலீட்டு வாய்ப்பு.'
      ],
      potentialGap: 'குறைந்தபட்ச முதலீட்டு வரம்பு ₹25 லட்சம்; திட்ட விரிவாக்கத்திற்கு மிகவும் உகந்தது.'
    },
    hi: {
      name: 'इंडियन एंजल नेटवर्क (IAN)',
      organization: 'इंडियन एंजल नेटवर्क',
      investorType: 'एंजल निवेशक नेटवर्क',
      description: 'कृषि, स्वास्थ्य, आईटी और विनिर्माण में शुरुआती चरण के व्यवसायों में $1M तक का निवेश और अनुभवी संस्थापकों से मेंटरशिप प्रदान करने वाला प्रमुख नेटवर्क।',
      investmentRangeText: '₹25 लाख – ₹8.5 करोड़ ($1M तक)',
      whyMatchedReasons: [
        'व्यावसायिक चरण मिलान: स्टार्टअप और प्रारंभिक विकास उद्यमों का समर्थन।',
        'अनुभवी सलाहकारों द्वारा मार्गदर्शन एवं अखिल भारतीय बाजार पहुंच।',
        'विस्तार हेतु उच्च पूंजी क्षमता।'
      ],
      potentialGap: 'न्यूनतम टिकट ₹25 लाख है; भविष्य के विस्तार राउंड के लिए उपयुक्त।'
    },
    kn: {
      name: 'ಇಂಡಿಯನ್ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್ (IAN)',
      organization: 'ಇಂಡಿಯನ್ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್',
      investorType: 'ಏಂಜಲ್ ಹೂಡಿಕೆದಾರರ ಒಕ್ಕೂಟ',
      description: 'ಕೃಷಿ, ಆರೋಗ್ಯ, ಐಟಿ ಮತ್ತು ಉತ್ಪಾದನಾ ವಲಯಗಳಲ್ಲಿ ಆರಂಭಿಕ ಹಂತದ ವ್ಯವಹಾರಗಳಿಗೆ $1 ಮಿಲಿಯನ್‌ವರೆಗೆ ಬಂಡವಾಳ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಪ್ರಮುಖ ನೆಟ್‌ವರ್ಕ್.',
      investmentRangeText: '₹25 ಲಕ್ಷ – ₹8.5 ಕೋಟಿ ($1M ವರೆಗೆ)'
    },
    ml: {
      name: 'ഇന്ത്യൻ ഏഞ്ചൽ നെറ്റ്‌വർക്ക് (IAN)',
      organization: 'ഇന്ത്യൻ ഏഞ്ചൽ നെറ്റ്‌വർക്ക്',
      investorType: 'ഏഞ്ചൽ നിക്ഷേപക ശൃംഖല',
      description: 'കാർഷികം, ആരോഗ്യം, ഐടി മേഖലകളിലെ ആദ്യകാല ബിസിനസുകൾക്ക് $1M വരെ നിക്ഷേപവും പിന്തുണയും നൽകുന്ന പ്രമുഖ കൂട്ടായ്മ.',
      investmentRangeText: '₹25 ലക്ഷം – ₹8.5 കോടി'
    },
    te: {
      name: 'ఇండియన్ ఏంజెల్ నెట్‌వర్క్ (IAN)',
      organization: 'ఇండియన్ ఏంజెల్ నెట్‌వర్క్',
      investorType: 'ఏంజెల్ ఇన్వెస్టర్ నెట్‌వర్క్',
      description: 'వ్యవసాయం, ఆరోగ్యం, ఐటీ మరియు తయారీ రంగాలలో ప్రారంభ దశ వ్యాపారాలకు $1M వరకు నిధులు మరియు మెంటార్‌షిప్ అందించే ప్రముఖ నెట్‌వర్క్.',
      investmentRangeText: '₹25 లక్షలు – ₹8.5 కోట్లు'
    }
  },

  'angeltech': {
    ta: {
      name: 'ஏஞ்சல்டெக் (AngelTech)',
      organization: 'ஏஞ்சல்டெக் இன்னோவேஷன் சிண்டிகேட்',
      investorType: 'தொழில்நுட்ப ஏஞ்சல் தளம்',
      description: 'அக்ரிடெக், ஹெல்த்தெக், ஈவி மற்றும் தூய தொழில்நுட்பத்தில் புதுமை படைக்கும் ஸ்டார்ட்அப்களுக்கான சிறப்பு முதலீட்டு தளம்.',
      investmentRangeText: '₹10 லட்சம் – ₹1 கோடி',
      whyMatchedReasons: [
        'தொழில்நுட்பம் மற்றும் விவசாய புத்தாக்கங்களுக்கு முன்னுரிமை.',
        'நடுத்தர மூலதன அடுக்கு B வரம்பிற்குள் உள்ள தேவை.',
        'விரைவான நிதி ஒருங்கிணைப்பு மற்றும் வழிகாட்டுதல்.'
      ]
    },
    hi: {
      name: 'एंजलटेक (AngelTech)',
      organization: 'एंजलटेक इनोवेशन सिंडिकेट',
      investorType: 'प्रौद्योगिकी एंजल प्लेटफॉर्म',
      description: 'एग्रीटेक, हेल्थटेक, ईवी और क्लीनटेक में प्रौद्योगिकी-सक्षम स्टार्टअप्स को एंजल निवेशकों से जोड़ने वाला विशेष प्लेटफॉर्म।',
      investmentRangeText: '₹10 लाख – ₹1 करोड़',
      whyMatchedReasons: [
        'क्षेत्रीय अनुकूलता: कृषि एवं तकनीकी नवाचार पर ध्यान।',
        'टियर B पूंजी आवश्यकता के भीतर टिकट आकार।',
        'तकनीकी परामर्श और उत्पाद वास्तुकला समर्थन।'
      ]
    },
    kn: {
      name: 'ಏಂಜಲ್‌ಟೆಕ್ (AngelTech)',
      organization: 'ಏಂಜಲ್‌ಟೆಕ್ ಇನ್ನೋವೇಶನ್ ಸಿಂಡಿಕೇಟ್',
      investorType: 'ತಂತ್ರಜ್ಞಾನ ಏಂಜಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
      description: 'ಅಗ್ರೋಟೆಕ್, ಹೆಲ್ತ್‌ಟೆಕ್ ಮತ್ತು ಇವಿ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ತಂತ್ರಜ್ಞಾನ ಆಧಾರಿತ ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಗೆ ಹೂಡಿಕೆ ಒದಗಿಸುವ ವೇದಿಕೆ.',
      investmentRangeText: '₹10 ಲಕ್ಷ – ₹1 ಕೋಟಿ'
    },
    ml: {
      name: 'ഏഞ്ചൽടെക് (AngelTech)',
      organization: 'ഏഞ്ചൽടെക് ഇന്നൊവേഷൻ സിൻഡിക്കേറ്റ്',
      investorType: 'ടെക്നോളജി ഏഞ്ചൽ പ്ലാറ്റ്‌ഫോം',
      description: 'അഗ്രിടെക്, ഹെൽത്ത്‌ടെക്, ഇവി മേഖലകളിലെ സ്റ്റാർട്ടപ്പുകളെ നിക്ഷേപകരുമായി ബന്ധിപ്പിക്കുന്ന പ്ലാറ്റ്‌ഫോം.',
      investmentRangeText: '₹10 ലക്ഷം – ₹1 കോടി'
    },
    te: {
      name: 'ఏంజెల్‌టెక్ (AngelTech)',
      organization: 'ఏంజెల్‌టెక్ ఇన్నోవేషన్ సిండికేట్',
      investorType: 'టెక్నాలజీ ఏంజెల్ ప్లాట్‌ఫారమ్',
      description: 'అగ్రిటెక్, హెల్త్‌టెక్ మరియు ఈవీ రంగాలలో సాంకేతిక ఆధారిత స్టార్టప్‌లకు పెట్టుబడులు సమకూర్చే వేదిక.',
      investmentRangeText: '₹10 లక్షలు – ₹1 కోటి'
    }
  },

  'epifunds': {
    ta: {
      name: 'எபிஃபண்ட்ஸ் (EPIFUNDS)',
      organization: 'EPIFUNDS ஏஞ்சல் சிண்டிகேட்',
      investorType: 'தேர்ந்தெடுக்கப்பட்ட ஏஞ்சல் நெட்வொர்க்',
      description: 'பரிசீலிக்கப்பட்ட நிறுவனர்களை 250+ ஏஞ்சல் முதலீட்டாளர்களுடன் இணைக்கும் பிரீமியம் முதலீட்டு நெட்வொர்க்.',
      investmentRangeText: '₹50 லட்சம் – ₹10 கோடி',
      whyMatchedReasons: [
        'அடுக்கு A பெரு மூலதன வளர்ச்சி நிறுவனங்களுக்கானது.',
        'ஒற்றை விண்ணப்பத்தின் மூலம் 250+ முதலீட்டாளர்களை அடையலாம்.'
      ],
      potentialGap: 'குறைந்தபட்ச நுழைவு வரம்பு ₹50 லட்சம்; எதிர்கால வளர்ச்சி நிதிக்கு உகந்தது.'
    },
    hi: {
      name: 'एपीफंड्स (EPIFUNDS)',
      organization: 'EPIFUNDS एंजल सिंडिकेट',
      investorType: 'क्यूरेटेड एंजल नेटवर्क',
      description: 'प्रमाणित संस्थापकों को अनुभवी एंजल निवेशकों और फैमिली ऑफिस से जोड़ने वाला नेटवर्क।',
      investmentRangeText: '₹50 लाख – ₹10 करोड़'
    },
    kn: {
      name: 'ಇಪಿಫಂಡ್ಸ್ (EPIFUNDS)',
      organization: 'EPIFUNDS ಏಂಜಲ್ ಸಿಂಡಿಕೇಟ್',
      investorType: 'ಕ್ಯುರೇಟೆಡ್ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್',
      description: 'ಅನುಭವಿ ಸಂಸ್ಥಾಪಕರನ್ನು ಏಂಜಲ್ ಹೂಡಿಕೆದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ಪ್ರಮುಖ ವೇದಿಕೆ.',
      investmentRangeText: '₹50 ಲಕ್ಷ – ₹10 ಕೋಟಿ'
    },
    ml: {
      name: 'എപ്പിഫണ്ട്സ് (EPIFUNDS)',
      organization: 'EPIFUNDS ഏഞ്ചൽ സിൻഡിക്കേറ്റ്',
      investorType: 'ക്യൂറേറ്റഡ് ഏഞ്ചൽ നെറ്റ്‌വർക്ക്',
      description: 'പരിചയസമ്പന്നരായ സംരംഭകരെ ഏഞ്ചൽ നിക്ഷേപകരുമായി ബന്ധിപ്പിക്കുന്ന ശൃംഖല.',
      investmentRangeText: '₹50 ലക്ഷം – ₹10 കോടി'
    },
    te: {
      name: 'ఎపిఫండ్స్ (EPIFUNDS)',
      organization: 'EPIFUNDS ఏంజెల్ సిండికేట్',
      investorType: 'క్యూరేటెడ్ ఏంజెల్ నెట్‌వర్క్',
      description: 'ధృవీకరించబడిన వ్యవస్థాపకులను ఏంజెల్ పెట్టుబడిదారులతో అనుసంధానించే నెట్‌వర్క్.',
      investmentRangeText: '₹50 లక్షలు – ₹10 కోట్లు'
    }
  },

  'ynos-platform': {
    ta: {
      name: 'வைனோஸ் இன்வெஸ்டர் பிளாட்பார்ம் (YNOS)',
      organization: 'YNOS வென்ச்சர் எஞ்சின் (ஐஐடி மெட்ராஸ் இன்குபேஷன்)',
      investorType: 'முதலீட்டாளர் கண்டுபிடிப்பு மற்றும் நுண்ணறிவு தளம்',
      description: 'ஐஐடி மெட்ராஸில் இன்குபேட் செய்யப்பட்ட தளம்; ஆரம்ப நிலை தொழில்முனைவோருக்கு ஏஞ்சல்கள், சீட் நிதிகள் மற்றும் மானியங்களை இணைக்கிறது.',
      investmentRangeText: '₹2 லட்சம் – ₹2 கோடி',
      whyMatchedReasons: [
        'சிறிய மூலதன அடுக்கு C & B நிறுவனங்களுக்கு மிகவும் உகந்தது (₹2L முதல் தொடக்கம்).',
        'ஐஐடி மெட்ராஸ் ஆராய்ச்சி அடிப்படையிலான துல்லியமான தகவல்.',
        'தமிழ்நாடு மற்றும் தென்னிந்திய தொழில்முனைவோருக்கு கூடுதல் முன்னுரிமை.'
      ]
    },
    hi: {
      name: 'वाईनोस इन्वेस्टर प्लेटफॉर्म (YNOS)',
      organization: 'YNOS वेंचर इंजन (आईआईटी मद्रास इनक्यूबेटेड)',
      investorType: 'निवेशक खोज एवं विश्लेषण मंच',
      description: 'आईआईटी मद्रास में इनक्यूबेटेड; शुरुआती उद्यमियों, एंजल निवेशकों और सीड फंड्स को पारदर्शी एनालिटिक्स के साथ जोड़ने वाला मंच।',
      investmentRangeText: '₹2 लाख – ₹2 करोड़',
      whyMatchedReasons: [
        'टियर C और माइक्रो व्यवसायों के लिए अत्यंत सुलभ (₹2 लाख से शुरू)।',
        'आईआईटी मद्रास शोध द्वारा समर्थित डेटा मैचमेकिंग।',
        'सभी विनिर्माण एवं सेवा क्षेत्रों का समावेश।'
      ]
    },
    kn: {
      name: 'ವೈನೋಸ್ ಇನ್ವೆಸ್ಟರ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ (YNOS)',
      organization: 'YNOS ವೆಂಚರ್ ಇಂಜಿನ್ (ಐಐಟಿ ಮದ್ರಾಸ್ ಬೆಂಬಲಿತ)',
      investorType: 'ಹೂಡಿಕೆದಾರರ ಶೋಧನೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ವೇದಿಕೆ',
      description: 'ಐಐಟಿ ಮದ್ರಾಸ್‌ನಲ್ಲಿ ಇನ್‌ಕ್ಯುಬೇಟ್ ಆದ ವೇದಿಕೆ; ಆರಂಭಿಕ ಉದ್ಯಮಿಗಳನ್ನು ಏಂಜಲ್‌ಗಳು ಮತ್ತು ಬೀಜ ನಿಧಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
      investmentRangeText: '₹2 ಲಕ್ಷ – ₹2 ಕೋಟಿ'
    },
    ml: {
      name: 'വൈനോസ് ഇൻവെസ്റ്റർ പ്ലാറ്റ്‌ഫോം (YNOS)',
      organization: 'YNOS വെഞ്ച്വർ എഞ്ചിൻ (IIT മദ്രാസ്)',
      investorType: 'നിക്ഷേപക കണ്ടെത്തൽ പ്ലാറ്റ്‌ഫോം',
      description: 'ഐഐടി മദ്രാസ് ഇൻകുബേറ്റ് ചെയ്ത പ്ലാറ്റ്‌ഫോം; പ്രാരംഭ സംരംഭകരെ ഏഞ്ചലുകളുമായും സീഡ് ഫണ്ടുകളുമായും ബന്ധിപ്പിക്കുന്നു.',
      investmentRangeText: '₹2 ലക്ഷം – ₹2 കോടി'
    },
    te: {
      name: 'వైనోస్ ఇన్వెస్టర్ ప్లాట్‌ఫారమ్ (YNOS)',
      organization: 'YNOS వెంచర్ ఇంజిన్ (IIT మద్రాస్ ఇంక్యుబేటెడ్)',
      investorType: 'పెట్టుబడిదారుల గుర్తింపు వేదిక',
      description: 'ఐఐటీ మద్రాస్‌లో ఇంక్యుబేట్ చేయబడిన వేదిక; ప్రారంభ వ్యాపారవేత్తలను ఏంజెల్స్ మరియు గ్రాంట్‌లతో కలుపుతుంది.',
      investmentRangeText: '₹2 లక్షలు – ₹2 కోట్లు'
    }
  },

  'impact-investors-council': {
    ta: {
      name: 'இம்பாக்ட் இன்வெஸ்டர்ஸ் கவுன்சில் (IIC)',
      organization: 'இம்பாக்ட் இன்வெஸ்டர்ஸ் கவுன்சில் (ஆவிஷ்கார், அக்குமன், அவானா, எலேவர்)',
      investorType: 'சமூக தாக்க முதலீட்டு கூட்டமைப்பு',
      description: 'கிராமப்புற வாழ்வாதாரம், மகளிர் அதிகாரம், விவசாயம் மற்றும் சமூக தாக்கத்தை உருவாக்கும் நிறுவனங்களுக்கு நீண்ட கால பொறுமை மூலதனத்தை வழங்கும் இந்திய முன்னணி நிதிகள்.',
      investmentRangeText: '₹1 கோடி – ₹25 கோடி',
      whyMatchedReasons: [
        'சமூக மற்றும் கிராமப்புற வாழ்வாதார நிறுவனங்களுக்கு நேரடி முன்னுரிமை.',
        'மகளிர் மற்றும் விளிம்புநிலை தொழில்முனைவோருக்கு சிறப்பு கவனம்.',
        '7-10 ஆண்டு கால நீண்டகால நோக்குடன் கூடிய பொறுமை மூலதனம்.'
      ],
      potentialGap: 'அடுக்கு A அளவிலான பெரிய மூலதனம்; விரிவான வணிக விரிவாக்கத்திற்கு உகந்தது.'
    },
    hi: {
      name: 'इम्पैक्ट इन्वेस्टर्स काउंसिल (IIC)',
      organization: 'इम्पैक्ट इन्वेस्टर्स काउंसिल (आविष्कार, एक्यूमेन, अवाना, एलेवर)',
      investorType: 'सामाजिक प्रभाव निवेश पारिस्थितिकी तंत्र',
      description: 'ग्रामीण आजीविका, महिला सशक्तिकरण और कृषि में सकारात्मक प्रभाव पैदा करने वाले उद्यमों में दीर्घकालिक पूंजी लगाने वाला प्रमुख नेटवर्क।',
      investmentRangeText: '₹1 करोड़ – ₹25 करोड़',
      whyMatchedReasons: [
        'ग्रामीण और सामाजिक प्रभाव वाले व्यवसायों को सर्वोच्च प्राथमिकता।',
        'महिला और वंचित वर्ग के उद्यमियों के लिए समर्पित फोकस।',
        'दीर्घकालिक 7-10 वर्ष का निवेश क्षितिज।'
      ],
      potentialGap: 'बड़ा टिकट आकार; विकास और विस्तार के लिए सर्वोत्तम।'
    },
    kn: {
      name: 'ಇಂಪ್ಯಾಕ್ಟ್ ಇನ್ವೆಸ್ಟರ್ಸ್ ಕೌನ್ಸಿಲ್ (IIC)',
      organization: 'ಇಂಪ್ಯಾಕ್ಟ್ ಇನ್ವೆಸ್ಟರ್ಸ್ ಕೌನ್ಸಿಲ್ (ಆವಿಷ್ಕಾರ್, ಅಕ್ಯುಮೆನ್, ಎಲೆವರ್)',
      investorType: 'ಸಾಮಾಜಿಕ ಪರಿಣಾಮ ಹೂಡಿಕೆ ಒಕ್ಕೂಟ',
      description: 'ಗ್ರಾಮೀಣ ಜೀವನೋಪಾಯ, ಮಹಿಳಾ ಸಬಲೀಕರಣ ಮತ್ತು ಕೃಷಿಯಲ್ಲಿ ಸಕಾರಾತ್ಮಕ ಪರಿಣಾಮ ಬೀರುವ ಉದ್ಯಮಗಳಿಗೆ ದೀರ್ಘಾವಧಿ ಬಂಡವಾಳ ಒದಗಿಸುವ ಒಕ್ಕೂಟ.',
      investmentRangeText: '₹1 ಕೋಟಿ – ₹25 ಕೋಟಿ'
    },
    ml: {
      name: 'ഇംപാക്ട് ഇൻവെസ്റ്റേഴ്സ് കൗൺസിൽ (IIC)',
      organization: 'ഇംപാക്ട് ഇൻവെസ്റ്റേഴ്സ് കൗൺസിൽ',
      investorType: 'സാമൂഹിക സ്വാധീന നിക്ഷേപ കൂട്ടായ്മ',
      description: 'ഗ്രാമീണ ഉപജീവനം, സ്ത്രീ ശാക്തീകരണം എന്നിവയ്ക്ക് പിന്തുണ നൽകുന്ന ഇന്ത്യയിലെ പ്രമുഖ ഇംപാക്ട് ഫണ്ടുകളുടെ കൂട്ടായ്മ.',
      investmentRangeText: '₹1 കോടി – ₹25 കോടി'
    },
    te: {
      name: 'ఇంపాక్ట్ ఇన్వెస్టర్స్ కౌన్సిల్ (IIC)',
      organization: 'ఇంపాక్ట్ ఇన్వెస్టర్స్ కౌన్సిల్',
      investorType: 'సామాజిక ప్రభావ పెట్టుబడి పర్యావరణ వ్యవస్థ',
      description: 'గ్రామీణ జీవనోపాధి, మహిళా సాధికారత మరియు వ్యవసాయంలో సానుకూల ప్రభావం చూపే సంస్థలకు దీర్ఘకాలిక మూలధనం అందించే వేదిక.',
      investmentRangeText: '₹1 కోటి – ₹25 కోట్లు'
    }
  },

  'native-angel-network': {
    ta: {
      name: 'நேட்டிவ் ஏஞ்சல் நெட்வொர்க் (NAN)',
      organization: 'நேட்டிவ்லீட் பவுண்டேஷன்',
      investorType: 'பிராந்திய / அடுக்கு 2-3 நகர ஏஞ்சல் நெட்வொர்க்',
      description: 'தமிழ்நாடு மற்றும் தென்னிந்தியாவின் சிறு நகரங்கள், கிராமப்புறங்கள் மற்றும் பாரம்பரிய விவசாயம்/கைத்தறி தொழில்களில் ஈடுபடும் நிறுவனங்களுக்கான முன்னோடி ஏஞ்சல் நெட்வொர்க்.',
      investmentRangeText: '₹3 லட்சம் – ₹25 லட்சம்',
      whyMatchedReasons: [
        'தமிழ்நாடு மற்றும் தென்னிந்தியாவின் கிராமப்புற/சிறுநகர தொழில்முனைவோருக்கு மிகச் சிறந்த பொருத்தம்.',
        'சிறிய மூலதன அடுக்கு C வரம்பிற்குள் உள்ள தேவை (₹3 லட்சத்தில் இருந்து தொடக்கம்).',
        'உள்ளூர் வணிக முன்னோடிகளின் நேரடி வழிகாட்டுதல்.'
      ]
    },
    hi: {
      name: 'नेटिव एंजल नेटवर्क (NAN)',
      organization: 'नेटिवलीड फाउंडेशन',
      investorType: 'क्षेत्रीय / टियर 2-3 शहर एंजल नेटवर्क',
      description: 'तमिलनाडु और दक्षिण भारत के गैर-महानगरीय, ग्रामीण और कृषि-हथकरघा उद्यमियों के लिए समर्पित अग्रणी नेटवर्क।',
      investmentRangeText: '₹3 लाख – ₹25 लाख',
      whyMatchedReasons: [
        'टियर 2/3 कस्बों और ग्रामीण युवाओं के लिए उपयुक्त।',
        'कम प्रवेश टिकट सीमा (₹3 लाख से शुरू)।',
        'क्षेत्रೀಯ उद्यमियों का स्थानीय मार्गदर्शन।'
      ]
    },
    kn: {
      name: 'ನೇಟಿವ್ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್ (NAN)',
      organization: 'ನೇಟಿವ್‌ಲೀಡ್ ಫೌಂಡೇಶನ್',
      investorType: 'ಪ್ರಾದೇಶಿಕ ಏಂಜಲ್ ನೆಟ್‌ವರ್ಕ್',
      description: 'ದಕ್ಷಿಣ ಭಾರತದ ಸಣ್ಣ ಪಟ್ಟಣಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗೆ ಕೃಷಿ, ಆಹಾರ ಮತ್ತು ಕೈಮಗ್ಗ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಬಂಡವಾಳ ಒದಗಿಸುವ ನೆಟ್‌ವರ್ಕ್.',
      investmentRangeText: '₹3 ಲಕ್ಷ – ₹25 ಲಕ್ಷ'
    },
    ml: {
      name: 'നേറ്റീവ് ഏഞ്ചൽ നെറ്റ്‌വർക്ക് (NAN)',
      organization: 'നേറ്റീവ്‌ലീഡ് ഫൗണ്ടേഷൻ',
      investorType: 'റീജിയണൽ ഏഞ്ചൽ നെറ്റ്‌വർക്ക്',
      description: 'ദക്ഷിണേന്ത്യയിലെ ചെറുപട്ടണങ്ങളിലെയും ഗ്രാമീണ മേഖലകളിലെയും സംരംഭകർക്ക് പിന്തുണ നൽകുന്ന ശൃംഖല.',
      investmentRangeText: '₹3 ലക്ഷം – ₹25 ലക്ഷം'
    },
    te: {
      name: 'నేటివ్ ఏంజెల్ నెట్‌వర్క్ (NAN)',
      organization: 'నేటివ్‌లీడ్ ఫౌండేషన్',
      investorType: 'ప్రాంతీయ ఏంజెల్ నెట్‌వర్క్',
      description: 'దక్షిణ భారతదేశంలోని చిన్న పట్టణాలు మరియు గ్రామీణ ప్రాంతాల వ్యాపారాలకు మూలధనం అందించే వేదిక.',
      investmentRangeText: '₹3 లక్షలు – ₹25 లక్షలు'
    }
  },

  'villgro-innovations': {
    ta: {
      name: 'வில்குரோ இன்னோவேஷன்ஸ் (Villgro)',
      organization: 'வில்குரோ இன்னோவேஷன்ஸ் பவுண்டேஷன்',
      investorType: 'சமூக நிறுவன இன்குபேட்டர் & சீட் நிதி',
      description: 'விவசாயம், காலநிலை மற்றும் சுகாதாரத்தில் அடித்தட்டு சவால்களை தீர்க்கும் ஆரம்ப கட்ட புத்தாக்க நிறுவனங்களுக்கு மானியம் மற்றும் முதலீடு வழங்கும் சமூக இன்குபேட்டர்.',
      investmentRangeText: '₹10 லட்சம் – ₹65 லட்சம்',
      whyMatchedReasons: [
        'நடுத்தர மூலதன அடுக்கு B வரம்பிற்குள் உள்ள தேவை (₹10L – ₹65L).',
        'விவசாயம் மற்றும் சமூக தாக்கத்திற்கு நேரடி முன்னுரிமை.',
        'மானியம் மற்றும் முதலீடு கலந்த சிறப்பு நிதி உதவி.'
      ]
    },
    hi: {
      name: 'विल्ग्रो इनोवेशंस (Villgro)',
      organization: 'विल्ग्रो इनोवेशंस फाउंडेशन',
      investorType: 'सामाजिक उद्यम इनक्यूबेटर एवं सीड फंड',
      description: 'कृषि, जलवायु और स्वास्थ्य में नवाचार करने वाले शुरुआती उद्यमियों को मिश्रित वित्त और गहन इनक्यूबेशन प्रदान करने वाला मंच।',
      investmentRangeText: '₹10 लाख – ₹65 लाख',
      whyMatchedReasons: [
        'टियर B पूंजी आवश्यकता के भीतर टिकट आकार।',
        'कृषि और सामाजिक प्रभाव में गहन विशेषज्ञता।',
        'अनुदान और इक्विटी का मिश्रित वित्तीय ढांचा।'
      ]
    },
    kn: {
      name: 'ವಿಲ್ಗ್ರೋ ಇನ್ನೋವೇಶನ್ಸ್ (Villgro)',
      organization: 'ವಿಲ್ಗ್ರೋ ಇನ್ನೋವೇಶನ್ಸ್ ಫೌಂಡೇಶನ್',
      investorType: 'ಸಾಮಾಜಿಕ ಉದ್ಯಮ ಇನ್‌ಕ್ಯುಬೇಟರ್ & ಬೀಜ ನಿಧಿ',
      description: 'ಕೃಷಿ, ಹವಾಮಾನ ಮತ್ತು ಆರೋಗ್ಯ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಸಾಮಾಜಿಕ ಆವಿಷ್ಕಾರಗಳಿಗೆ ಅನುದಾನ ಮತ್ತು ಬೀಜ ಬಂಡವಾಳ ಒದಗಿಸುವ ಪ್ರಮುಖ ಸಂಸ್ಥೆ.',
      investmentRangeText: '₹10 ಲಕ್ಷ – ₹65 ಲಕ್ಷ'
    },
    ml: {
      name: 'വിൽഗ്രോ ഇന്നൊവേഷൻസ് (Villgro)',
      organization: 'വിൽഗ്രോ ഇന്നൊവേഷൻസ് ഫൗണ്ടേഷൻ',
      investorType: 'സോഷ്യൽ എന്റർപ്രൈസ് ഇൻകുബേറ്റർ',
      description: 'കൃഷി, ആരോഗ്യം മേഖലകളിലെ സാമൂഹിക സംരംഭങ്ങൾക്ക് ഗ്രാന്റും നിക്ഷേപവും നൽകുന്ന ഫൗണ്ടേഷൻ.',
      investmentRangeText: '₹10 ലക്ഷം – ₹65 ലക്ഷം'
    },
    te: {
      name: 'విల్‌గ్రో ఇన్నోవేషన్స్ (Villgro)',
      organization: 'విల్‌గ్రో ఇన్నోవేషన్స్ ఫౌండేషన్',
      investorType: 'సోషల్ ఎంటర్‌ప్రైజ్ ఇంక్యుబేటర్',
      description: 'వ్యవసాయం, ఆరోగ్యం రంగాలలో సామాజిక ఆవిష్కరణలకు సీడ్ ఫండ్ మరియు ఇంక్యుబేషన్ అందించే సంస్థ.',
      investmentRangeText: '₹10 లక్షలు – ₹65 లక్షలు'
    }
  }
};

function localizeWhyMatchedItem(text, langCode) {
  if (!text || !langCode || langCode === 'en') return text;
  
  // 1. Sector Alignment: Focuses on <Sector>
  const sectorMatch = text.match(/Sector Alignment:\s*Focuses on\s*(.*)/i);
  if (sectorMatch) {
    const rawSector = sectorMatch[1].trim();
    const locSector = getLocalizedSector(rawSector, langCode);
    const templates = {
      hi: `क्षेत्र संरेखण: ${locSector} पर केंद्रित है`,
      ta: `துறை பொருத்தம்: ${locSector} துறையில் கவனம் செலுத்துகிறது`,
      kn: `ಕ್ಷೇತ್ರ ಹೊಂದಾಣಿಕೆ: ${locSector} ಕ್ಷೇತ್ರದ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸುತ್ತದೆ`,
      ml: `മേഖലാ പൊരുത്തം: ${locSector} മേഖലയിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു`,
      te: `రంగం సరిపోలిక: ${locSector} రంగానికి ప్రాధాన్యత ఇస్తుంది`
    };
    return templates[langCode] || text;
  }

  // 2. Business Stage Fit: Actively backs <Stage> ventures
  const stageMatch = text.match(/Business Stage Fit:\s*Actively backs\s*(.*?)\s*ventures/i);
  if (stageMatch) {
    const rawStage = stageMatch[1].trim();
    const locStage = getLocalizedStage(rawStage, langCode);
    const templates = {
      hi: `व्यावसायिक चरण मिलान: सक्रिय रूप से ${locStage} उद्यमों का समर्थन करता है`,
      ta: `வணிக நிலை பொருத்தம்: ${locStage} நிறுவனங்களை தீவிரமாக ஆதரிக்கிறது`,
      kn: `ವ್ಯವಹಾರ ಹಂತ ಹೊಂದಾಣಿಕೆ: ${locStage} ಉದ್ಯಮಗಳನ್ನು ಸಕ್ರಿಯವಾಗಿ ಬೆಂಬಲಿಸುತ್ತದೆ`,
      ml: `സംരംഭ ഘട്ട പൊരുത്തം: ${locStage} സംരംഭങ്ങൾക്ക് സജീവ പിന്തുണ നൽകുന്നു`,
      te: `వ్యాపార దశ సరిపోలిక: ${locStage} సంస్థలకు చురుకైన మద్దతు ఇస్తుంది`
    };
    return templates[langCode] || text;
  }

  // 3. Funding Range Match: Your requirement (<Req>) falls within stated ticket band (<Band>)
  const fundingMatch = text.match(/Funding Range Match:\s*Your requirement \((.*?)\) falls within stated ticket band \((.*?)\)/i);
  if (fundingMatch) {
    const req = fundingMatch[1].trim();
    const band = fundingMatch[2].trim();
    const templates = {
      hi: `फंडिंग रेंज मिलान: आपकी आवश्यकता (${req}) टिकट बैंड (${band}) के भीतर है`,
      ta: `நிதி வரம்பு பொருத்தம்: உங்கள் தேவை (${req}) முதலீட்டு வரம்பிற்குள் (${band}) உள்ளது`,
      kn: `ನಿಧಿ ಶ್ರೇಣಿ ಹೊಂದಾಣಿಕೆ: ನಿಮ್ಮ ಅವಶ್ಯಕತೆ (${req}) ನಿಗದಿತ ಶ್ರೇಣಿಯೊಳಗೆ (${band}) ಬರುತ್ತದೆ`,
      ml: `ഫണ്ടിംഗ് പരിധി പൊരുത്തം: നിങ്ങളുടെ ആവശ്യം (${req}) നിക്ഷേപ പരിധിക്കുള്ളിലാണ് (${band})`,
      te: `నిధుల పరిధి సరిపోలిక: మీ అవసరం (${req}) పేర్కొన్న టిక్కెట్ బ్యాండ్‌లో (${band}) ఉంది`
    };
    return templates[langCode] || text;
  }

  // 4. Geographic Coverage: Active deployment across <Loc>
  const geoMatch = text.match(/Geographic Coverage:\s*Active deployment across\s*(.*)/i);
  if (geoMatch) {
    const loc = geoMatch[1].trim();
    const templates = {
      hi: `भौगोलिक कवरेज: ${loc} में सक्रिय निवेश और समर्थन`,
      ta: `புவியியல் கவரேஜ்: ${loc} முழுவதும் செயலில் உள்ள முதலீடுகள்`,
      kn: `ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿ: ${loc} ನಾದ್ಯಂತ ಸಕ್ರಿಯ ಹೂಡಿಕೆ ವಿಸ್ತರಣೆ`,
      ml: `ഭൂമിശാസ്ത്രപരമായ വ്യാപനം: ${loc} ഉടനീളം സജീവ വിന്യാസം`,
      te: `భౌగోళిక విస్తృతి: ${loc} అంతటా చురుకైన నిధుల పంపిణీ`
    };
    return templates[langCode] || text;
  }

  return text;
}

function localizePotentialGapItem(text, langCode) {
  if (!text || !langCode || langCode === 'en') return text;
  
  if (text.includes('Active deal window and cohort intake timeline')) {
    const templates = {
      hi: 'सक्रिय सौदे की विंडो और कोहोर्ट समयसीमा को आधिकारिक पोर्टल पर सत्यापित किया जाना चाहिए।',
      ta: 'செயலில் உள்ள முதலீட்டு காலம் மற்றும் தொகுதி விவரங்களை அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.',
      kn: 'ಸಕ್ರಿಯ ಒಪ್ಪಂದದ ವಿಂಡೋ ಮತ್ತು ಪ್ರವೇಶ ಸಮಯವನ್ನು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಬೇಕು.',
      ml: 'ഡീൽ വിൻഡോയും പ്രവേശന സമയക്രമവും ഔദ്യോഗിക പോർട്ടലിൽ സ്ഥിരീകരിക്കേണ്ടതാണ്.',
      te: 'యాక్టివ్ డీల్ విండో మరియు ప్రవేశ కాలక్రమాన్ని అధికారిక పోర్టల్‌లో ధృవీకరించాలి.'
    };
    return templates[langCode] || text;
  }

  if (text.includes('Minimum ticket size is higher than current ask')) {
    const templates = {
      hi: 'न्यूनतम टिकट का आकार वर्तमान आवश्यकता से अधिक है। भविष्य के विस्तार दौर के लिए उपयुक्त।',
      ta: 'குறைந்தபட்ச முதலீட்டுத் தொகை தற்போதைய தேவையை விட அதிகமாக உள்ளது. எதிர்கால விரிவாக்கத்திற்கு ஏற்றது.',
      kn: 'ಕನಿಷ್ಠ ಟಿಕೆಟ್ ಗಾತ್ರವು ಪ್ರಸ್ತುತ ಬೇಡಿಕೆಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ. ಭವಿಷ್ಯದ ವಿಸ್ತರಣಾ ಸುತ್ತಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.',
      ml: 'കുറഞ്ഞ നിക്ഷേപ തുക ഇപ്പോഴത്തെ ആവശ്യത്തേക്കാൾ കൂടുതലാണ്. ഭാവി വളർച്ചാ ഘട്ടങ്ങൾക്ക് അനുയോജ്യം.',
      te: 'కనిష్ట పెట్టుబడి పరిమాణం ప్రస్తుత అవసరం కంటే ఎక్కువ. భవిష్యత్ విస్తరణ రౌండ్‌కు అనుకూలం.'
    };
    return templates[langCode] || text;
  }

  if (text.includes('High ticket size requires verified audited financial tracks')) {
    const templates = {
      hi: 'उच्च टिकट आकार के लिए सत्यापित लेखापरीक्षित वित्तीय रिकॉर्ड आवश्यक हैं।',
      ta: 'அதிக முதலீட்டுத் தொகைக்கு சரிபார்க்கப்பட்ட தணிக்கை செய்யப்பட்ட கணக்குகள் தேவை.',
      kn: 'ಹೆಚ್ಚಿನ ಟಿಕೆಟ್ ಗಾತ್ರಕ್ಕೆ ಪರಿಶೀಲಿಸಿದ ಲೆಕ್ಕಪರಿಶೋಧಿತ ಹಣಕಾಸು ದಾಖಲೆಗಳು ಅಗತ್ಯವಿದೆ.',
      ml: 'ഉയർന്ന നിക്ഷേപ തുകയ്ക്ക് ഓഡിറ്റ് ചെയ്ത സാമ്പത്തിക രേഖകൾ ആവശ്യമാണ്.',
      te: 'అధిక టిక్కెట్ పరిమాణానికి ధృవీకరించబడిన ఆడిట్ చేయబడిన ఆర్థిక రికార్డులు అవసరం.'
    };
    return templates[langCode] || text;
  }

  return text;
}

/**
 * Returns localized investor object
 */
export function getLocalizedInvestor(investor, langCode = 'en') {
  if (!investor) return investor;
  if (!langCode || langCode === 'en') return investor;

  const trans = INVESTOR_DATA_TRANSLATIONS[investor.id]?.[langCode];

  const baseWhy = trans?.whyMatchedReasons && trans.whyMatchedReasons.length > 0 
    ? trans.whyMatchedReasons 
    : (investor.whyMatched || []);

  const localizedWhy = baseWhy.map(item => localizeWhyMatchedItem(item, langCode));

  const baseGap = trans?.potentialGap || investor.potentialGap || [];
  const localizedGap = Array.isArray(baseGap)
    ? baseGap.map(item => localizePotentialGapItem(item, langCode))
    : [localizePotentialGapItem(baseGap, langCode)];

  return {
    ...investor,
    name: trans?.name || investor.name,
    organization: trans?.organization || investor.organization,
    investorType: trans?.investorType || investor.investorType,
    description: trans?.description || investor.description,
    investmentRangeText: trans?.investmentRangeText || investor.investmentRangeText,
    whyMatched: localizedWhy,
    potentialGap: localizedGap
  };
}

/**
 * Returns localized UI string for Investor Module
 */
export function getInvestorUITranslation(key, langCode = 'en') {
  const dict = INVESTOR_UI_TRANSLATIONS[langCode] || INVESTOR_UI_TRANSLATIONS.en;
  return dict[key] || INVESTOR_UI_TRANSLATIONS.en[key] || key;
}
