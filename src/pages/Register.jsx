import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, User, Phone, Mail, Lock, MapPin, Globe, Crown, Eye, EyeOff } from 'lucide-react';
import { ALL_INDIAN_STATES, getDistrictsForState } from '../data/indiaLocations';

const REGISTER_TRANSLATIONS = {
  en: {
    portalBadge: 'National AI Scheme Matching Portal',
    selectLanguage: 'Language / மொழி',
    title: 'Create Entrepreneur Account',
    subtitle: 'Join SchemeMatch AI to discover targeted government subsidies & financing',
    fullName: 'Full Name',
    mobile: 'Mobile Number (Aadhaar linked)',
    email: 'Email Address',
    password: 'Password',
    state: 'State',
    district: 'District',
    preferredLang: 'Preferred Language',
    submitBtn: 'Create Account & Setup Profile',
    alreadyAccount: 'Already have an account?',
    loginHere: 'Login here'
  },
  te: {
    portalBadge: 'జాతీయ AI పథకాల సరిపోలిక పోర్టల్',
    selectLanguage: 'భాషను ఎంచుకోండి',
    title: 'కొత్త వ్యాపారవేత్త ఖాతాను సృష్టించండి',
    subtitle: 'లక్ష్యిత ప్రభుత్వ రాయితీలు & ఆర్థిక సహాయం కోసం స్కీమ్‌మ్యాచ్ AI లో చేరండి',
    fullName: 'పూర్తి పేరు',
    mobile: 'మొబైల్ సంఖ్య (ఆధార్ లింక్ చేయబడింది)',
    email: 'ఈమెయిల్ చిరునామా',
    password: 'పాస్‌వర్డ్',
    state: 'రాష్ట్రం',
    district: 'జిల్లా',
    preferredLang: 'ప్రాధాన్యతా భాష',
    submitBtn: 'ఖాతాను సృష్టించి ప్రొఫైల్ ప్రారంభించండి',
    alreadyAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    loginHere: 'ఇక్కడ లాగిన్ అవ్వండి'
  },
  ta: {
    portalBadge: 'தேசிய AI திட்ட பொருத்த போர்டல்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    title: 'தொழில்முனைவோர் கணக்கை உருவாக்கவும்',
    subtitle: 'அரசு மானியங்கள் மற்றும் நிதியுதவியைக் கண்டறிய SchemeMatch AI இல் இணையுங்கள்',
    fullName: 'முழு பெயர்',
    mobile: 'கைபேசி எண் (ஆதார் இணைக்கப்பட்டது)',
    email: 'மின்னஞ்சல் முகவரி',
    password: 'கடவுச்சொல்',
    state: 'மாநிலம்',
    district: 'மாவட்டம்',
    preferredLang: 'விருப்பமான மொழி',
    submitBtn: 'கணக்கை உருவாக்கி சுயவிவரத்தை அமைக்கவும்',
    alreadyAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    loginHere: 'இங்கே உள்நுழையவும்'
  },
  hi: {
    portalBadge: 'राष्ट्रीय AI योजना मिलान पोर्टल',
    selectLanguage: 'भाषा चुनें',
    title: 'उद्यमी खाता बनाएं',
    subtitle: 'लक्षित सरकारी सब्सिडी और वित्तपोषण प्राप्त करने के लिए SchemeMatch AI से जुड़ें',
    fullName: 'पूरा नाम',
    mobile: 'मोबाइल नंबर (आधार से जुड़ा)',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    state: 'राज्य',
    district: 'जिला',
    preferredLang: 'पसंदीदा भाषा',
    submitBtn: 'खाता बनाएं और प्रोफाइल सेट करें',
    alreadyAccount: 'क्या आपके पास पहले से खाता है?',
    loginHere: 'यहाँ लॉगिन करें'
  },
  kn: {
    portalBadge: 'ರಾಷ್ಟ್ರೀಯ AI ಯೋಜನೆ ಹೊಂದಾಣಿಕೆ ಪೋರ್ಟಲ್',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    title: 'ಉದ್ಯಮಿ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
    subtitle: 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಹಣಕಾಸು ಸೌಲಭ್ಯಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು SchemeMatch AI ಗೆ ಸೇರಿ',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    mobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಆಧಾರ್ ಲಿಂಕ್)',
    email: 'ಇಮೇಲ್ ವಿಳಾಸ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    state: 'ರಾಜ್ಯ',
    district: 'ಜಿಲ್ಲೆ',
    preferredLang: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
    submitBtn: 'ಖಾತೆ ರಚಿಸಿ ಮತ್ತು ಪ್ರೊಫೈಲ್ ಹೊಂದಿಸಿ',
    alreadyAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
    loginHere: 'ಇಲ್ಲಿ ಲಾಗಿನ್ ಮಾಡಿ'
  },
  ml: {
    portalBadge: 'ദേശീയ AI സ്കീം മാച്ചിംഗ് പോർട്ടൽ',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    title: 'സംരംഭക അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    subtitle: 'സർക്കാർ സബ്‌സിഡികളും വായ്പകളും കണ്ടെത്താൻ SchemeMatch AI-ൽ ചേരൂ',
    fullName: 'പൂർണ്ണ നാമം',
    mobile: 'മൊബൈൽ നമ്പർ (ആധാർ ബന്ധിപ്പിച്ചത്)',
    email: 'ഇമെയിൽ വിലാസം',
    password: 'പാസ്‌വേഡ്',
    state: 'സംസ്ഥാനം',
    district: 'ജില്ല',
    preferredLang: 'തിരഞ്ഞെടുത്ത ഭാഷ',
    submitBtn: 'അക്കൗണ്ട് സൃഷ്ടിച്ച് പ്രൊഫൈൽ തുടങ്ങുക',
    alreadyAccount: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
    loginHere: 'ഇവിടെ ലോഗിൻ ചെയ്യുക'
  }
};

export default function Register() {
  const { register, addToast, languages, currentLangCode, setLanguage } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    state: 'Tamil Nadu',
    district: '',
    language: 'English',
  });
  const [showPassword, setShowPassword] = useState(false);

  const tReg = (key) => (REGISTER_TRANSLATIONS[currentLangCode] || REGISTER_TRANSLATIONS.en)[key] || REGISTER_TRANSLATIONS.en[key];

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      addToast('Please provide your full name, email, and password.', 'error');
      return;
    }
    const result = register(formData);
    if (result && !result.success) {
      addToast(result.error || 'Registration failed.', 'error');
      return;
    }
    const successMsg = {
      te: 'ఖాతా విజయవంతంగా సృష్టించబడింది! మీ వ్యాపార ప్రొఫైల్‌ను పూర్తి చేద్దాం.',
      ta: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! உங்கள் வணிக சுயவிவரத்தை பூர்த்தி செய்வோம்.',
      hi: 'खाता सफलतापूर्वक बनाया गया! आइए अपनी व्यावसायिक प्रोफ़ाइल पूरी करें।',
      kn: 'ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ! ನಿಮ್ಮ ವ್ಯಾಪಾರ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸೋಣ.',
      ml: 'അക്കൗണ്ട് വിജയകരമായി സൃഷ്ടിച്ചു! നിങ്ങളുടെ ബിസിനസ്സ് പ്രൊഫൈൽ പൂർത്തിയാക്കാം.',
      en: 'Account created successfully! Let’s complete your business profile.'
    }[currentLangCode] || 'Account created successfully! Let’s complete your business profile.';
    addToast(successMsg, 'success');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Gov Stripe */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF671F] via-[#F59E0B] to-[#046A38] z-50"></div>

      {/* Top Portal Banner */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {tReg('portalBadge')}
          </span>
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Crown className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {tReg('title')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {tReg('subtitle')}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('fullName')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  id="applicant_register_fullname"
                  name="applicant_register_fullname"
                  autoComplete="off"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('mobile')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  id="applicant_register_mobile"
                  name="applicant_register_mobile"
                  autoComplete="off"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('email')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  id="applicant_register_email"
                  name="applicant_register_email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="applicant_register_password"
                  name="applicant_register_password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 transition focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('state')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={formData.state}
                  onChange={(e) => {
                    const nextState = e.target.value;
                    const nextDistricts = getDistrictsForState(nextState);
                    setFormData({
                      ...formData,
                      state: nextState,
                      district: nextDistricts.includes(formData.district) ? formData.district : (nextDistricts[0] || '')
                    });
                  }}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30"
                >
                  <option value="">-- Select State --</option>
                  {ALL_INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tReg('district')}
              </label>
              {getDistrictsForState(formData.state).length > 0 ? (
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                >
                  <option value="">-- Select District --</option>
                  {getDistrictsForState(formData.state).map(dst => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Villupuram"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  required
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {tReg('preferredLang')}
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={formData.language}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setFormData({ ...formData, language: selectedName });
                  const match = languages.find(l => l.name === selectedName);
                  if (match) setLanguage(match.code);
                }}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/30"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/30 shadow-sm transition cursor-pointer"
            >
              <span>{tReg('submitBtn')}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          {tReg('alreadyAccount')}{' '}
          <Link to="/login" className="font-bold text-amber-700 hover:underline">
            {tReg('loginHere')}
          </Link>
        </p>
      </div>
    </div>
  );
}
