import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { DEMO_PROFILES } from '../data/mockProfiles';
import { SCHEMES_DATABASE, calculateMatchScore, evaluateScheme } from '../data/mockSchemes';
import { INITIAL_DOCUMENTS } from '../data/mockDocuments';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { getLocalizedScheme } from '../data/schemeTranslations';
import { getLocalizedDocument } from '../data/documentTranslations';
import { CHATBOT_GREETINGS, generateAIChatResponse } from '../data/chatbotTranslations';
import { askGeminiSchemeAdvisor } from '../services/geminiService';
import { speakWithGoogleVoice, stopGoogleVoice } from '../utils/voiceUtils';
import { INVESTORS_DATABASE, getEntrepreneurTier, calculateInvestorMatchScore } from '../data/mockInvestors';
import { getLocalizedInvestor } from '../data/investorTranslations';
import confetti from 'canvas-confetti';

const DEFAULT_REGISTERED_USERS = [
  { id: 'ravi', email: 'ravi@schemematch.ai', password: 'password123', profileId: 'ravi', name: 'Ravi Kumar', role: 'user' },
  { id: 'priya', email: 'priya@schemematch.ai', password: 'password123', profileId: 'priya', name: 'Priya Devi', role: 'user' },
  { id: 'arun', email: 'arun@schemematch.ai', password: 'password123', profileId: 'arun', name: 'Arun Kumar', role: 'user' },
  { id: 'meena', email: 'meena@schemematch.ai', password: 'password123', profileId: 'meena', name: 'Meena K.', role: 'user' },
  { id: 'suresh', email: 'suresh@schemematch.ai', password: 'password123', profileId: 'suresh', name: 'Suresh Patel', role: 'user' },
  { id: 'admin-1', email: 'admin@123', password: 'admin123', profileId: 'admin', name: 'Administrator', role: 'admin' },
  { id: 'admin-2', email: 'admin@schemematch.gov.in', password: 'admin123', profileId: 'admin', name: 'Administrator', role: 'admin' },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  // Registered users state with localStorage persistence
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('schemematch_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const emails = new Set(parsed.map(u => (u.email || '').toLowerCase()));
          const missing = DEFAULT_REGISTERED_USERS.filter(u => !emails.has(u.email.toLowerCase()));
          return [...parsed, ...missing];
        }
      }
    } catch (e) {}
    return DEFAULT_REGISTERED_USERS;
  });

  // Helper to sanitize custom user profiles so new/registered users start completely empty
  const sanitizeCustomProfile = (p) => {
    if (!p) return p;
    const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(p.id);
    if (isDemo) return p;

    // Check if this custom profile was populated with previous automatic sample defaults
    const hadSampleDefaults = 
      (typeof p.businessName === 'string' && p.businessName.includes('Enterprises')) ||
      p.fundingRequired === '₹4.50 Lakh' ||
      p.fundingRequired === '₹5.00 Lakh' ||
      p.age === 28 ||
      p.annualIncome === '₹3.00 Lakh' ||
      p.education === 'Graduate / Diploma' ||
      p.employeesCount === '2-5 persons' ||
      p.employeesCount === '4 persons' ||
      p.completionPercentage === 85 ||
      p.completionPercentage === 70;

    if (hadSampleDefaults) {
      return {
        ...p,
        age: '',
        gender: '',
        socialCategory: '',
        socialCategoryCode: '',
        annualIncome: '',
        annualIncomeNum: 0,
        education: '',
        educationLevel: '',
        businessName: '',
        businessType: '',
        sector: '',
        stage: '',
        locationType: '',
        investmentRequired: '',
        fundingRequired: '',
        fundingRequiredNum: 0,
        expectedTurnover: '',
        employeesCount: '',
        fundingType: '',
        supportNeeded: '',
        needInvestment: '',
        useOfFunds: '',
        equityOffered: '',
        socialImpactFocus: '',
        completionPercentage: 10,
        documentsReadyCount: 0,
        activeApplicationsCount: 0,
        matchedSchemesCount: 0
      };
    }
    return p;
  };

  // Profiles State with localStorage persistence (merging defaults + custom registered)
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('schemematch_profiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const ids = new Set(parsed.map(p => p.id));
          const missing = DEMO_PROFILES.filter(p => !ids.has(p.id));
          const cleaned = [...parsed.map(sanitizeCustomProfile), ...missing];
          return cleaned;
        }
      }
    } catch (e) {}
    return DEMO_PROFILES;
  });

  // Keep localStorage in sync with sanitized profiles
  useEffect(() => {
    try {
      localStorage.setItem('schemematch_profiles', JSON.stringify(profiles));
    } catch (e) {}
  }, [profiles]);

  // Active Profile ID
  // Clean up any legacy persistent localStorage sessions so fresh host visits open the Login page
  try {
    localStorage.removeItem('schemematch_user_session');
  } catch (e) {}

  // Active Profile ID with session restore from sessionStorage
  const [currentProfileId, setCurrentProfileId] = useState(() => {
    try {
      const savedSession = sessionStorage.getItem('schemematch_user_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed?.profileId) return parsed.profileId;
      }
    } catch (e) {}
    return 'ravi';
  });

  // User Documents mapping per profile ID with localStorage persistence
  const [userDocuments, setUserDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem('schemematch_user_docs');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure custom users start with empty/missing documents
        Object.keys(parsed).forEach(k => {
          const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(k);
          if (!isDemo && Array.isArray(parsed[k])) {
            parsed[k] = parsed[k].map(doc => ({
              ...doc,
              status: 'missing',
              verified: false,
              fileName: null,
              uploadedAt: null
            }));
          }
        });
        return parsed;
      }
    } catch (e) {}
    return {};
  });

  // Auth state & Role with session restore from sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!sessionStorage.getItem('schemematch_user_session');
    } catch (e) {}
    return false;
  });

  const [userEmail, setUserEmail] = useState(() => {
    try {
      const saved = sessionStorage.getItem('schemematch_user_session');
      if (saved) return JSON.parse(saved)?.email || '';
    } catch (e) {}
    return '';
  });

  const [userRole, setUserRole] = useState(() => {
    try {
      const saved = sessionStorage.getItem('schemematch_user_session');
      if (saved) return JSON.parse(saved)?.role || 'user';
    } catch (e) {}
    return 'user';
  });

  const isAdmin = userRole === 'admin';

  // JWT Auth Token state
  const [authToken, setAuthToken] = useState(() => {
    try {
      return sessionStorage.getItem('schemematch_auth_token') || '';
    } catch (e) {}
    return '';
  });

  // Dynamic Schemes Database State with LocalStorage Persistence and Server Hydration
  const [allSchemes, setAllSchemes] = useState(() => {
    try {
      const saved = localStorage.getItem('schemematch_schemes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SCHEMES_DATABASE;
  });

  // Hydrate schemes from authoritative backend database on boot
  useEffect(() => {
    const fetchBackendSchemes = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/schemes`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setAllSchemes(data.data);
            try {
              localStorage.setItem('schemematch_schemes', JSON.stringify(data.data));
            } catch (e) {}
          }
        }
      } catch (err) {
        // Fallback gracefully to existing catalog
      }
    };
    fetchBackendSchemes();
  }, []);

  // Active Profile object
  const currentProfile = useMemo(() => {
    return profiles.find(p => p.id === currentProfileId) || profiles[0];
  }, [profiles, currentProfileId]);

  // Active Documents for current profile (only demo profiles fallback to INITIAL_DOCUMENTS; new users start with clean/missing docs)
  const activeDocuments = useMemo(() => {
    if (userDocuments[currentProfileId]) {
      return userDocuments[currentProfileId];
    }
    const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(currentProfileId);
    if (isDemo) {
      return INITIAL_DOCUMENTS;
    }
    return INITIAL_DOCUMENTS.map(doc => ({
      ...doc,
      status: 'missing',
      verified: false,
      fileName: null,
      uploadedAt: null
    }));
  }, [userDocuments, currentProfileId]);

  // Applied Schemes mapping per profile ID with localStorage persistence
  const [appliedSchemesMap, setAppliedSchemesMap] = useState(() => {
    try {
      const saved = localStorage.getItem('schemematch_applied_schemes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      ravi: ['pmegp', 'pmfme-scheme'],
      priya: ['standup-india', 'cgtmse'],
      arun: ['startup-seed-fund'],
      meena: ['pmegp', 'nssh-scheme'],
      suresh: ['pmegp', 'mudra-kishore']
    };
  });

  const appliedSchemeIds = useMemo(() => {
    if (appliedSchemesMap[currentProfileId]) {
      return appliedSchemesMap[currentProfileId];
    }
    const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(currentProfileId);
    return isDemo ? ['pmegp', 'pmfme-scheme'] : [];
  }, [appliedSchemesMap, currentProfileId]);

  const [savedSchemeIds, setSavedSchemeIds] = useState(['standup-india']);

  // Modals state
  const [activeModal, setActiveModal] = useState(null);

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Multi-Language State (Default to 'en')
  const [currentLangCode, setCurrentLangCode] = useState('en');

  const selectedLangObj = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];
  }, [currentLangCode]);

  // Translation lookup helper
  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[currentLangCode] || TRANSLATIONS.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    return TRANSLATIONS.en[key] || fallback || key;
  };

  // Google Voice State
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState(null);

  const speakText = (text, identifier = 'general') => {
    if (currentlySpeakingId === identifier) {
      stopGoogleVoice();
      setCurrentlySpeakingId(null);
      return;
    }

    const voiceLang = selectedLangObj.voiceLang || 'en-IN';
    setCurrentlySpeakingId(identifier);

    speakWithGoogleVoice(
      text,
      voiceLang,
      () => setCurrentlySpeakingId(identifier),
      () => setCurrentlySpeakingId(null)
    );
  };

  const stopSpeech = () => {
    stopGoogleVoice();
    setCurrentlySpeakingId(null);
  };

  // AI Chat Messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Namaste! I am your AI Scheme Advisor. Tell me about your business idea, required funding, or state to discover eligible government subsidies and credit schemes.',
      timestamp: 'Just now',
      suggestedPrompts: [
        'I want to start a food processing unit with ₹5 Lakh loan',
        'Which schemes offer capital subsidies in Tamil Nadu?',
        'What are the collateral-free schemes under MUDRA & CGTMSE?',
        'Are there special grants for SC/ST or Women entrepreneurs?'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Update chat greeting when language or profile changes
  useEffect(() => {
    const greetingText = CHATBOT_GREETINGS[currentLangCode] || CHATBOT_GREETINGS.en;

    setChatMessages([
      {
        id: `msg-welcome-${currentLangCode}-${currentProfileId}`,
        sender: 'ai',
        text: greetingText,
        timestamp: 'Just now'
      }
    ]);
  }, [currentLangCode, currentProfileId]);

  // Toast trigger
  const addToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Switch demo profile
  const switchProfile = (profileId) => {
    const target = profiles.find(p => p.id === profileId);
    if (target) {
      setCurrentProfileId(profileId);
      if (target.preferredLanguage) {
        const codeMap = { English: 'en', Tamil: 'ta', Hindi: 'hi', Kannada: 'kn', Malayalam: 'ml', Telugu: 'te' };
        if (codeMap[target.preferredLanguage]) {
          setCurrentLangCode(codeMap[target.preferredLanguage]);
        }
      }
      addToast(`Switched active demo profile to ${target.name} (${target.tagline})`, 'success');
    }
  };

  // Switch Language
  const setLanguage = (langCode) => {
    const target = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    if (target) {
      setCurrentLangCode(langCode);
      stopSpeech();
      addToast(`Language switched to ${target.nativeName} (${target.name}) with Google Voice`, 'info');
    }
  };

  // Helper: Calculate profile completion percentage based on self-entered details & verified documents
  const calculateProfileCompletion = (profile, readyDocsCount = 0) => {
    const fieldsToCheck = [
      'name', 'email', 'mobile', 'state', 'district', 'age', 'gender',
      'socialCategory', 'annualIncome', 'education', 'businessName',
      'businessType', 'sector', 'stage', 'locationType', 'fundingRequired'
    ];
    let filled = 0;
    for (const f of fieldsToCheck) {
      if (profile[f] && String(profile[f]).trim() !== '' && String(profile[f]) !== '0') {
        filled++;
      }
    }
    const fieldPercent = Math.round((filled / fieldsToCheck.length) * 70);
    const docPercent = Math.round((readyDocsCount / 6) * 30);
    return Math.min(100, Math.max(15, fieldPercent + docPercent));
  };

  // Update profile in real-time and persist
  const updateProfile = (updatedFields) => {
    setProfiles(prev => {
      const updated = prev.map(p => {
        if (p.id === currentProfileId) {
          const merged = { ...p, ...updatedFields };
          const docs = userDocuments[currentProfileId] || [];
          const readyCount = docs.filter(d => d.status === 'ready').length;
          const newCompletion = calculateProfileCompletion(merged, readyCount);

          let fundingNum = merged.fundingRequiredNum;
          if (updatedFields.fundingRequired) {
            const raw = String(updatedFields.fundingRequired).replace(/,/g, '');
            const matchLakh = raw.match(/([0-9.]+)\s*lakh/i);
            const matchCr = raw.match(/([0-9.]+)\s*cr/i);
            if (matchLakh) {
              fundingNum = parseFloat(matchLakh[1]) * 100000;
            } else if (matchCr) {
              fundingNum = parseFloat(matchCr[1]) * 10000000;
            } else {
              const justNum = parseFloat(raw.replace(/[^0-9.]/g, ''));
              if (!isNaN(justNum)) fundingNum = justNum;
            }
          }

          let incomeNum = merged.annualIncomeNum;
          if (updatedFields.annualIncome) {
            const raw = String(updatedFields.annualIncome).replace(/,/g, '');
            const matchLakh = raw.match(/([0-9.]+)\s*lakh/i);
            if (matchLakh) {
              incomeNum = parseFloat(matchLakh[1]) * 100000;
            } else {
              const justNum = parseFloat(raw.replace(/[^0-9.]/g, ''));
              if (!isNaN(justNum)) incomeNum = justNum;
            }
          }

          return {
            ...merged,
            completionPercentage: newCompletion,
            fundingRequiredNum: fundingNum || merged.fundingRequiredNum || 0,
            annualIncomeNum: incomeNum || merged.annualIncomeNum || 0
          };
        }
        return p;
      });
      try {
        localStorage.setItem('schemematch_profiles', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (updatedFields.name || updatedFields.email) {
      const cleanEmail = (updatedFields.email || '').toLowerCase().trim();
      setRegisteredUsers(prev => {
        const updatedUsers = prev.map(u => {
          if (u.profileId === currentProfileId) {
            return {
              ...u,
              name: updatedFields.name || u.name,
              email: cleanEmail || u.email
            };
          }
          return u;
        });
        try {
          localStorage.setItem('schemematch_users', JSON.stringify(updatedUsers));
        } catch (e) {}
        return updatedUsers;
      });
    }

    // Try backend sync to Supabase if running
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      fetch(`${backendUrl}/api/profile/${currentProfileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      }).catch(() => {});
    } catch (e) {}

    addToast('Entrepreneur Profile updated successfully!', 'success');
  };

  // Check if current user has filled mandatory profile details for scheme evaluation
  const hasCompletedDetails = useMemo(() => {
    const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(currentProfileId);
    if (isDemo) return true;
    return Boolean(
      currentProfile?.sector &&
      currentProfile?.socialCategory &&
      currentProfile?.locationType &&
      (currentProfile?.fundingRequired || currentProfile?.fundingRequiredNum > 0) &&
      currentProfile?.age &&
      currentProfile?.gender
    );
  }, [currentProfileId, currentProfile]);

  // 4 Mandatory KYC and Verification Document IDs
  const MANDATORY_DOC_IDS = ['doc-identity', 'doc-income', 'doc-bank', 'doc-address'];

  // Count how many mandatory documents are uploaded & verified
  const mandatoryDocsReadyCount = useMemo(() => {
    return MANDATORY_DOC_IDS.filter(docId => {
      const doc = activeDocuments.find(d => d.id === docId);
      return doc && doc.status === 'ready';
    }).length;
  }, [activeDocuments]);

  // Check if all 4 mandatory documents are uploaded
  const hasUploadedMandatoryDocs = useMemo(() => {
    const isDemo = ['ravi', 'priya', 'arun', 'meena', 'suresh', 'admin'].includes(currentProfileId);
    if (isDemo) return true;
    return mandatoryDocsReadyCount === MANDATORY_DOC_IDS.length;
  }, [currentProfileId, mandatoryDocsReadyCount]);

  // Eligibility is unlocked ONLY when all profile details AND all mandatory documents are uploaded
  const isEligibilityUnlocked = useMemo(() => {
    return hasCompletedDetails && hasUploadedMandatoryDocs;
  }, [hasCompletedDetails, hasUploadedMandatoryDocs]);

  // Dynamic calculated schemes based on current profile, active allSchemes database and current language
  // Schemes are ONLY unlocked & computed when all profile details and mandatory documents are provided
  const computedSchemes = useMemo(() => {
    if (!isEligibilityUnlocked) {
      return [];
    }

    return allSchemes.map(scheme => {
      const evaluation = evaluateScheme(scheme, currentProfile);
      const matchScore = evaluation.matchScore;
      let matchLabel = 'General Match';
      let matchColor = 'text-blue-600 bg-blue-50 border-blue-200';
      if (matchScore >= 90) {
        matchLabel = 'Strong Match';
        matchColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      } else if (matchScore >= 80) {
        matchLabel = 'High Match';
        matchColor = 'text-blue-700 bg-blue-50 border-blue-200';
      } else if (matchScore >= 70) {
        matchLabel = 'Moderate Match';
        matchColor = 'text-amber-700 bg-amber-50 border-amber-200';
      }

      // Automatically translate scheme name, ministry, benefits, etc. according to active language
      const localized = getLocalizedScheme(scheme, currentLangCode);

      return {
        ...localized,
        matchScore,
        matchLabel,
        matchColor,
        eligibilityStatus: evaluation.eligibilityStatus,
        status: evaluation.status,
        factorScores: evaluation.factorScores,
        matchedRules: evaluation.matchedRules,
        failedRules: evaluation.failedRules,
        missingRequirements: evaluation.missingRequirements,
        whyMatchedReasons: evaluation.whyMatchedReasons
      };
    }).sort((a, b) => {
      if (a.eligibilityStatus !== 'not_eligible' && b.eligibilityStatus === 'not_eligible') return -1;
      if (a.eligibilityStatus === 'not_eligible' && b.eligibilityStatus !== 'not_eligible') return 1;
      return b.matchScore - a.matchScore;
    });
  }, [allSchemes, currentProfile, currentLangCode, isEligibilityUnlocked]);


  // Dynamic calculated investors with multi-factor match score against active profile and active language
  const computedInvestors = useMemo(() => {
    return INVESTORS_DATABASE.map(investor => {
      const { score, whyMatched, potentialGap } = calculateInvestorMatchScore(investor, currentProfile);
      const withScore = {
        ...investor,
        matchScore: score,
        whyMatched,
        potentialGap
      };
      return getLocalizedInvestor(withScore, currentLangCode);
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [currentProfile, currentLangCode]);

  // Entrepreneur's investment tier based on fundingRequiredNum
  const entrepreneurTier = useMemo(() => {
    return getEntrepreneurTier(currentProfile?.fundingRequiredNum || 500000);
  }, [currentProfile]);

  // Dynamic localized documents based on active language and active profile
  const computedDocuments = useMemo(() => {
    return activeDocuments.map(doc => getLocalizedDocument(doc, currentLangCode));
  }, [activeDocuments, currentLangCode]);

  // Admin Scheme Management Operations (Create, Update, Delete) with Database Persistence
  const addScheme = async (newScheme) => {
    const id = newScheme.id || `scheme-${Date.now()}`;
    const formatted = {
      ...newScheme,
      id,
      shortName: newScheme.shortName || newScheme.name.split(' ')[0],
      sectorsList: newScheme.sectorsList || [newScheme.sector || 'Manufacturing'],
      stageEligibility: newScheme.stageEligibility || ['New (Startup)', 'Existing (Expansion)'],
      factorScores: newScheme.factorScores || {
        sectorMatch: 95,
        locationMatch: 90,
        incomeMatch: 90,
        fundingMatch: 92,
        stageMatch: 90,
        categoryMatch: 95
      },
      whyMatchedReasons: newScheme.whyMatchedReasons || [
        'Matches sector and capital subsidy thresholds under state/central guidelines.',
        'Target investment profile aligns with nodal agency funding band.'
      ],
      eligibilityRules: newScheme.eligibilityRules || [
        { criterion: 'Sector & Activity', value: newScheme.sector || 'Eligible sector', status: 'pass', note: 'Compliant with guidelines' },
        { criterion: 'Applicant Criteria', value: 'Age 18+ and valid Aadhaar', status: 'pass', note: 'Verified requirement' }
      ],
      requiredDocuments: newScheme.requiredDocuments || [
        'Aadhaar / KYC ID Proof',
        'Detailed Project Report (DPR)',
        'Bank Account Details / Cancelled Cheque'
      ],
      applicationSteps: newScheme.applicationSteps || [
        'Register on official portal or JanSamarth platform',
        'Submit digital project proposal and documents',
        'Nodal bank review, verification & subsidy disbursement'
      ]
    };

    // 1. Persist to Express + PostgreSQL Backend
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const token = sessionStorage.getItem('schemematch_auth_token');
      await fetch(`${backendUrl}/api/schemes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formatted)
      });
    } catch (err) {
      console.warn('Backend scheme create sync notice:', err.message);
    }

    // 2. Persist to local state & localStorage
    setAllSchemes(prev => {
      const updated = [formatted, ...prev.filter(s => s.id !== id)];
      try { localStorage.setItem('schemematch_schemes', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
    addToast(`New Scheme "${formatted.name}" published & persisted in database!`, 'success');
    return formatted;
  };

  const updateScheme = async (schemeId, updatedData) => {
    // 1. Persist to Express + PostgreSQL Backend
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const token = sessionStorage.getItem('schemematch_auth_token');
      await fetch(`${backendUrl}/api/schemes/${schemeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {
      console.warn('Backend scheme update sync notice:', err.message);
    }

    // 2. Persist to local state & localStorage
    setAllSchemes(prev => {
      const updated = prev.map(s => (s.id === schemeId ? { ...s, ...updatedData } : s));
      try { localStorage.setItem('schemematch_schemes', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    addToast(`Scheme "${updatedData.name || schemeId}" updated and persisted in database!`, 'success');
  };

  const deleteScheme = async (schemeId) => {
    const target = allSchemes.find(s => s.id === schemeId);

    // 1. Persist to Express + PostgreSQL Backend
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const token = sessionStorage.getItem('schemematch_auth_token');
      await fetch(`${backendUrl}/api/schemes/${schemeId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
    } catch (err) {
      console.warn('Backend scheme delete sync notice:', err.message);
    }

    // 2. Persist to local state & localStorage
    setAllSchemes(prev => {
      const updated = prev.filter(s => s.id !== schemeId);
      try { localStorage.setItem('schemematch_schemes', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    addToast(`Scheme "${target?.shortName || schemeId}" deleted permanently from catalog and database.`, 'info');
  };

  // Document upload in real-time per user profile with OCR metadata
  const uploadDocument = (docId, fileName = 'Uploaded_Document_2026.pdf', meta = {}) => {
    const currentList = userDocuments[currentProfileId] || INITIAL_DOCUMENTS;
    const updatedDocs = currentList.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: 'ready',
          verified: meta.verified !== false,
          confidence: meta.confidence || 0.94,
          maskedIdentifier: meta.maskedIdentifier || null,
          fileName: fileName,
          uploadedAt: 'Today (Verified via OCR)'
        };
      }
      return doc;
    });


    const updatedMap = {
      ...userDocuments,
      [currentProfileId]: updatedDocs
    };
    setUserDocuments(updatedMap);

    const readyCount = updatedDocs.filter(d => d.status === 'ready').length;
    const totalCount = updatedDocs.length;

    // Update active profile documents ready count & completion percentage in real-time
    const updatedProfiles = profiles.map(p => {
      if (p.id === currentProfileId) {
        const newCompletion = calculateProfileCompletion(p, readyCount);
        return {
          ...p,
          documentsReadyCount: readyCount,
          documentsTotalCount: totalCount,
          completionPercentage: newCompletion
        };
      }
      return p;
    });
    setProfiles(updatedProfiles);

    try {
      localStorage.setItem('schemematch_user_docs', JSON.stringify(updatedMap));
      localStorage.setItem('schemematch_profiles', JSON.stringify(updatedProfiles));
    } catch (e) {}

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {}

    addToast(`Document "${fileName}" uploaded & verified successfully!`, 'success');
  };

  // Toggle Save
  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds(prev => {
      const exists = prev.includes(schemeId);
      if (exists) {
        addToast('Removed scheme from saved list', 'info');
        return prev.filter(id => id !== schemeId);
      } else {
        addToast('Saved scheme to your favorites!', 'success');
        return [...prev, schemeId];
      }
    });
  };

  // Apply for scheme
  const applyForScheme = (schemeId) => {
    if (!appliedSchemeIds.includes(schemeId)) {
      setAppliedSchemesMap(prev => {
        const currentList = prev[currentProfileId] || [];
        const updated = { ...prev, [currentProfileId]: [...currentList, schemeId] };
        try {
          localStorage.setItem('schemematch_applied_schemes', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      addToast('Application initiated successfully! Added to Roadmap.', 'success');
    } else {
      addToast('You have already initiated an application for this scheme.', 'info');
    }
  };

  // Send AI Chat Query with Gemini AI & multilingual responses
  const sendChatMessage = async (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Call live Google Gemini 3.6 Flash Scheme Advisor
      const response = await askGeminiSchemeAdvisor(
        queryText,
        currentProfile,
        computedSchemes,
        currentLangCode
      );

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        schemes: response.matchedSchemes,
        isLiveAI: response.isLiveAI !== false,
        model: response.model || 'Gemini 3.6 Flash',
        timestamp: 'Just now'
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto-speak in Google Voice if active
      speakWithGoogleVoice(
        response.text.replace(/[*#_`]/g, ''), 
        selectedLangObj.voiceLang || 'en-IN', 
        () => setCurrentlySpeakingId(aiMsg.id), 
        () => setCurrentlySpeakingId(null)
      );
    } catch (err) {
      console.error('Error sending chat message:', err);
      // Fallback
      const fallback = generateAIChatResponse(queryText, currentLangCode, currentProfile, computedSchemes);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallback.text,
        schemes: fallback.matchedSchemes,
        isLiveAI: false,
        timestamp: 'Just now'
      };
      setChatMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto-speak fallback response
      speakWithGoogleVoice(
        fallback.text.replace(/[*#_`]/g, ''), 
        selectedLangObj.voiceLang || 'en-IN', 
        () => setCurrentlySpeakingId(aiMsg.id), 
        () => setCurrentlySpeakingId(null)
      );
    }
  };

  // Auth methods
  const register = (userData) => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    const cleanPassword = (userData.password || '').trim();
    const cleanName = (userData.fullName || '').trim();

    if (!cleanEmail || !cleanName || !cleanPassword) {
      return { success: false, error: 'Full name, email, and password are required.' };
    }

    // Check duplicate
    const exists = registeredUsers.some(u => (u.email || '').toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    const newProfileId = `user-${Date.now()}`;
    const newProfile = {
      id: newProfileId,
      name: cleanName,
      email: cleanEmail,
      mobile: (userData.mobile || '').trim(),
      tagline: '',
      avatar: '👤',
      age: '',
      gender: '',
      socialCategory: '',
      socialCategoryCode: '',
      state: userData.state || '',
      district: (userData.district || '').trim(),
      annualIncome: '',
      annualIncomeNum: 0,
      education: '',
      educationLevel: '',
      businessName: '',
      businessType: '',
      sector: '',
      stage: '',
      locationType: '',
      investmentRequired: '',
      fundingRequired: '',
      fundingRequiredNum: 0,
      expectedTurnover: '',
      employeesCount: '',
      preferredLanguage: userData.language || 'English',
      fundingType: '',
      supportNeeded: '',
      needInvestment: '',
      useOfFunds: '',
      equityOffered: '',
      socialImpactFocus: '',
      completionPercentage: 10,
      documentsReadyCount: 0,
      documentsTotalCount: 6,
      activeApplicationsCount: 0,
      matchedSchemesCount: 0,
    };

    // Initialize fresh documents: ALL missing, none pre-uploaded or fake verified
    const initialUserDocs = INITIAL_DOCUMENTS.map(doc => ({
      ...doc,
      status: 'missing',
      verified: false,
      fileName: null,
      uploadedAt: null
    }));

    const newUser = {
      id: newProfileId,
      email: cleanEmail,
      password: cleanPassword,
      name: cleanName,
      profileId: newProfileId,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [newUser, ...registeredUsers];
    const updatedProfiles = [newProfile, ...profiles];
    const updatedUserDocs = { ...userDocuments, [newProfileId]: initialUserDocs };
    const updatedAppliedSchemes = { ...appliedSchemesMap, [newProfileId]: [] };

    setRegisteredUsers(updatedUsers);
    setProfiles(updatedProfiles);
    setUserDocuments(updatedUserDocs);
    setAppliedSchemesMap(updatedAppliedSchemes);
    setCurrentProfileId(newProfileId);
    setIsAuthenticated(true);
    setUserEmail(cleanEmail);
    setUserRole('user');

    if (userData.language) {
      const codeMap = { English: 'en', Tamil: 'ta', Hindi: 'hi', Kannada: 'kn', Malayalam: 'ml', Telugu: 'te' };
      if (codeMap[userData.language]) {
        setCurrentLangCode(codeMap[userData.language]);
      }
    }

    try {
      localStorage.setItem('schemematch_users', JSON.stringify(updatedUsers));
      localStorage.setItem('schemematch_profiles', JSON.stringify(updatedProfiles));
      localStorage.setItem('schemematch_user_docs', JSON.stringify(updatedUserDocs));
      localStorage.setItem('schemematch_applied_schemes', JSON.stringify(updatedAppliedSchemes));
      sessionStorage.setItem('schemematch_user_session', JSON.stringify({ email: cleanEmail, profileId: newProfileId, role: 'user' }));
    } catch (e) {}

    // Sync new account creation directly into Supabase via backend
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          mobile: (userData.mobile || '').trim(),
          state: userData.state || '',
          district: (userData.district || '').trim(),
          language: userData.language || 'English',
          profileId: newProfileId
        })
      }).then(r => r.json()).then(data => {
        if (data.success) {
          console.log('✅ User account stored in Supabase PostgreSQL:', data);
        }
      }).catch(err => {
        console.warn('⚠️ Supabase backend sync notice:', err.message);
      });
    } catch (e) {}

    return { success: true, profile: newProfile };
  };

  const resetPassword = (userIdentifier, newPassword) => {
    const cleanId = (userIdentifier || '').trim().toLowerCase();
    const cleanPass = (newPassword || '').trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter both your registered Email/User ID and your new password.' };
    }

    if (cleanPass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    // Check in registeredUsers or profiles
    const userIndex = registeredUsers.findIndex(u => 
      (u.email || '').toLowerCase() === cleanId || 
      (u.id || '').toLowerCase() === cleanId
    );

    const prof = profiles.find(p => 
      (p.email || '').toLowerCase() === cleanId || 
      (p.id || '').toLowerCase() === cleanId
    );

    if (userIndex === -1 && !prof) {
      return { success: false, error: 'No account registered with this email or User ID. Please check the spelling or create an account.' };
    }

    let updatedUsers = [...registeredUsers];
    if (userIndex !== -1) {
      updatedUsers = updatedUsers.map(u => {
        if ((u.email || '').toLowerCase() === cleanId || (u.id || '').toLowerCase() === cleanId) {
          return { ...u, password: cleanPass };
        }
        return u;
      });
    } else if (prof) {
      updatedUsers.push({
        id: prof.id,
        email: prof.email || `${prof.id}@schemematch.ai`,
        password: cleanPass,
        profileId: prof.id,
        name: prof.name,
        role: 'user'
      });
    }

    setRegisteredUsers(updatedUsers);
    try {
      localStorage.setItem('schemematch_users', JSON.stringify(updatedUsers));
    } catch (e) {}

    // Synchronize to backend database
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      fetch(`${backendUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanId, newPassword: cleanPass })
      }).then(r => r.json()).then(res => {
        if (res.success) {
          console.log('✅ Supabase PostgreSQL user password updated:', res);
        }
      }).catch(err => {
        console.warn('Backend password sync fallback notice:', err.message);
      });
    } catch (e) {}

    return { success: true, message: 'Password has been successfully updated! You can now log in.' };
  };

  const login = async (emailOrIdentifier, passwordOrProfileId = null, role = 'user', explicitProfileId = null) => {
    const cleanIdentifier = (emailOrIdentifier || '').trim().toLowerCase();
    const cleanPass = typeof passwordOrProfileId === 'string' ? passwordOrProfileId.trim() : '';

    if (!cleanIdentifier) {
      return { success: false, error: 'Please enter your registered Email or User ID.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your password.' };
    }

    let targetProfileId = explicitProfileId;
    let finalRole = role;

    // Check if second param was passed as profileId in legacy calls (e.g. login(email, 'ravi', 'user'))
    if (passwordOrProfileId && !cleanPass.includes('password') && !cleanPass.includes('admin') && profiles.some(p => p.id === passwordOrProfileId)) {
      targetProfileId = passwordOrProfileId;
    }

    // Call Express + PostgreSQL backend with bcrypt and JWT
    let backendLoginSuccess = false;
    let backendError = null;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: cleanIdentifier,
          password: cleanPass,
          personaId: targetProfileId
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        backendLoginSuccess = true;
        const token = data.token;
        if (token) {
          setAuthToken(token);
          sessionStorage.setItem('schemematch_auth_token', token);
        }
        if (data.user?.role) finalRole = data.user.role;
        if (data.user?.profileId) targetProfileId = data.user.profileId;
      } else {
        backendError = data.error;
      }
    } catch (e) {
      console.warn('Backend login notice:', e.message);
    }

    // Local registered users resolution and strict password verification
    const userMatch = registeredUsers.find(u => 
      (u.email || '').toLowerCase() === cleanIdentifier || 
      (u.id || '').toLowerCase() === cleanIdentifier ||
      (!cleanIdentifier.includes('@') && (u.email || '').toLowerCase() === `${cleanIdentifier}@schemematch.ai`)
    );

    // If backend explicitly rejected due to incorrect password, fail immediately
    if (backendError && backendError.toLowerCase().includes('password')) {
      return { success: false, error: backendError };
    }

    if (userMatch) {
      // STRICT: Verify entered password matches the created/registered password
      if (!backendLoginSuccess && userMatch.password && cleanPass !== userMatch.password) {
        return { success: false, error: 'Incorrect password. Please enter the password you created during registration.' };
      }
      targetProfileId = userMatch.profileId || targetProfileId;
      finalRole = userMatch.role || finalRole;
    } else if (backendLoginSuccess) {
      // Verified via backend
    } else {
      return { 
        success: false, 
        error: backendError || 'No account registered with this email or User ID. Please check your credentials or click "Create Account" below to register.' 
      };
    }

    if (!targetProfileId) {
      targetProfileId = finalRole === 'admin' ? 'admin' : (userMatch?.profileId || 'ravi');
    }

    setIsAuthenticated(true);
    setUserEmail(userMatch?.email || cleanIdentifier || (finalRole === 'admin' ? 'admin@schemematch.gov.in' : 'demo@schemematch.ai'));
    setUserRole(finalRole);
    setCurrentProfileId(targetProfileId);

    const activePersona = profiles.find(p => p.id === targetProfileId) || currentProfile;
    if (activePersona?.preferredLanguage) {
      const codeMap = { English: 'en', Tamil: 'ta', Hindi: 'hi', Kannada: 'kn', Malayalam: 'ml', Telugu: 'te' };
      if (codeMap[activePersona.preferredLanguage]) {
        setCurrentLangCode(codeMap[activePersona.preferredLanguage]);
      }
    }

    try {
      sessionStorage.setItem('schemematch_user_session', JSON.stringify({ email: cleanIdentifier, profileId: targetProfileId, role: finalRole }));
      localStorage.removeItem('schemematch_user_session');
    } catch (e) {}

    if (finalRole === 'admin') {
      addToast('Welcome Administrator! Logged into MSME Scheme Management Console.', 'success');
    } else {
      addToast(`Welcome back, ${activePersona?.name || 'Entrepreneur'}! Logged in successfully.`, 'success');
    }

    return { success: true, user: { email: cleanIdentifier, profileId: targetProfileId, role: finalRole } };
  };

  const logout = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {}

    setIsAuthenticated(false);
    setUserRole('user');
    setAuthToken('');
    stopSpeech();
    try {
      sessionStorage.removeItem('schemematch_user_session');
      sessionStorage.removeItem('schemematch_auth_token');
      localStorage.removeItem('schemematch_user_session');
    } catch (e) {}
    addToast('Logged out of SchemeMatch AI session.', 'info');
  };


  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        userRole,
        isAdmin,
        authToken,
        setUserRole,
        login,
        register,
        resetPassword,
        logout,
        registeredUsers,
        sampleProfiles: DEMO_PROFILES,
        currentProfile,
        profiles,
        switchProfile,
        updateProfile,
        allSchemes,
        addScheme,
        updateScheme,
        deleteScheme,
        schemes: computedSchemes,
        isEligibilityUnlocked,
        hasCompletedDetails,
        hasUploadedMandatoryDocs,
        mandatoryDocsReadyCount,
        mandatoryDocsTotalCount: 4,
        investors: computedInvestors,
        entrepreneurTier,
        documents: computedDocuments,
        rawDocuments: activeDocuments,
        uploadDocument,
        appliedSchemeIds,
        applyForScheme,
        savedSchemeIds,
        toggleSaveScheme,
        activeModal,
        setActiveModal,
        toasts,
        addToast,
        removeToast,
        currentLangCode,
        selectedLangObj,
        languages: SUPPORTED_LANGUAGES,
        setLanguage,
        t,
        getLocalizedScheme,
        currentlySpeakingId,
        speakText,
        stopSpeech,
        chatMessages,
        sendChatMessage,
        isTyping
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
