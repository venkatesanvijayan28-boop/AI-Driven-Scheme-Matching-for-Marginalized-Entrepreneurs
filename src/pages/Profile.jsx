import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Building2, 
  Sliders, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Coins, 
  Layers 
} from 'lucide-react';
import { getInvestorUITranslation } from '../data/investorTranslations';
import { getProfileTranslation } from '../data/profileTranslations.js';
import { getLocalizedSector } from '../data/sectorTranslations.js';
import { ALL_INDIAN_STATES, getDistrictsForState } from '../data/indiaLocations';
import confetti from 'canvas-confetti';

export default function Profile() {
  const { currentProfile, updateProfile, addToast, currentLangCode, t, setLanguage } = useApp();
  const navigate = useNavigate();

  const tInv = (key) => getInvestorUITranslation(key, currentLangCode);
  const tProf = (key) => getProfileTranslation(key, currentLangCode);

  const [formState, setFormState] = useState(currentProfile);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Available districts for selected state
  const stateDistricts = useMemo(() => {
    return getDistrictsForState(formState.state);
  }, [formState.state]);

  useEffect(() => {
    setFormState(currentProfile);
  }, [currentProfile]);

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (field === 'preferredLanguage' && setLanguage) {
      const codeMap = {
        'English': 'en',
        'Tamil': 'ta',
        'Hindi': 'hi',
        'Kannada': 'kn',
        'Malayalam': 'ml',
        'Telugu': 'te'
      };
      if (codeMap[value]) {
        setLanguage(codeMap[value]);
      }
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    updateProfile(formState);
  };

  const handleAnalyzeEligibility = () => {
    updateProfile(formState);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
      addToast('Eligibility criteria re-analyzed across 8 national schemes!', 'success');
      navigate('/recommendations');
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Completion Meter */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{formState.avatar}</span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('profileTitle') || 'Entrepreneur & Business Profile'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium mt-1">
            {t('profileSubtitle') || 'Keep your profile updated. Our AI algorithm continuously maps your parameters against subsidy quotas.'}
          </p>
        </div>

        {/* Completion Ring & Stats */}
        <div className="flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-700/80 shrink-0 shadow-lg">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{t('profileCompletion') || 'Profile Score'}</span>
            <span className="text-2xl font-black text-amber-400 tracking-tight">{formState.completionPercentage}%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* 1. PERSONAL INFORMATION */}
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-base font-black text-white">{t('personalInfo') || 'Personal Information'}</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{tProf('section1Badge')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('applicantNameLabel')}</label>
              <input
                type="text"
                value={formState.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('ageLabel')}</label>
              <input
                type="number"
                value={formState.age || ''}
                onChange={(e) => handleChange('age', e.target.value ? parseInt(e.target.value) : '')}
                placeholder="e.g. 28"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('genderLabel')}</label>
              <select
                value={formState.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectGender') || '-- Select Gender --'}</option>
                <option value="Male">{tProf('male')}</option>
                <option value="Female">{tProf('female')}</option>
                <option value="Transgender / Other">{tProf('otherGender')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('socialCategoryLabel')}</label>
              <select
                value={formState.socialCategory || ''}
                onChange={(e) => handleChange('socialCategory', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectCategory') || '-- Select Social Category --'}</option>
                <option value="OBC / Rural Youth">{tProf('obcRuralYouth')}</option>
                <option value="SC / Women Entrepreneur">{tProf('scWomenEntrepreneur')}</option>
                <option value="ST / Rural Women SHG Leader">{tProf('stWomenShg')}</option>
                <option value="General / Youth Innovator">{tProf('genYouthInnovator')}</option>
                <option value="Minority Community">{tProf('minorityCommunity')}</option>
                <option value="Differently-Abled (PwD)">{tProf('pwdCategory')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('stateLabel')}</label>
              <select
                value={formState.state || ''}
                onChange={(e) => {
                  const newState = e.target.value;
                  handleChange('state', newState);
                  const available = getDistrictsForState(newState);
                  if (formState.district && !available.includes(formState.district)) {
                    handleChange('district', '');
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectState') || '-- Select State of Domicile --'}</option>
                {ALL_INDIAN_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('districtLabel')}</label>
              {stateDistricts.length > 0 ? (
                <select
                  value={formState.district || ''}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
                >
                  <option value="">{tProf('selectDistrict') || '-- Select District --'}</option>
                  {formState.district && !stateDistricts.includes(formState.district) && (
                    <option value={formState.district}>{formState.district}</option>
                  )}
                  {stateDistricts.map(dst => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formState.district || ''}
                  onChange={(e) => handleChange('district', e.target.value)}
                  placeholder="e.g. Villupuram"
                  className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
                />
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('annualIncomeLabel')}</label>
              <input
                type="text"
                value={formState.annualIncome || ''}
                onChange={(e) => handleChange('annualIncome', e.target.value)}
                placeholder="e.g. ₹3.00 Lakh"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('educationLabel')}</label>
              <input
                type="text"
                value={formState.education || ''}
                onChange={(e) => handleChange('education', e.target.value)}
                placeholder="e.g. Graduate / Diploma"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* 2. BUSINESS INFORMATION */}
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-black text-white">{t('businessInfo') || 'Business & Enterprise Profile'}</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{tProf('section2Badge')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('businessNameLabel')}</label>
              <input
                type="text"
                value={formState.businessName || ''}
                onChange={(e) => handleChange('businessName', e.target.value)}
                placeholder="Enter enterprise name"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('businessTypeLabel')}</label>
              <select
                value={formState.businessType || ''}
                onChange={(e) => handleChange('businessType', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectBusinessType') || '-- Select Business Type --'}</option>
                <option value="Manufacturing">{tProf('manufacturingType')}</option>
                <option value="Services & Software">{tProf('servicesSoftwareType')}</option>
                <option value="Trading & Retail">{tProf('tradingRetailType')}</option>
                <option value="Agri-Allied & Dairy">{tProf('agriAlliedType')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('primarySectorLabel')}</label>
              <select
                value={formState.sector || ''}
                onChange={(e) => handleChange('sector', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectSector') || '-- Select Sector --'}</option>
                <option value="Food Processing & Agro">{getLocalizedSector('Food Processing & Agro', currentLangCode)}</option>
                <option value="Textiles & Handloom">{getLocalizedSector('Textiles & Handloom', currentLangCode)}</option>
                <option value="Information Technology & Agritech">{getLocalizedSector('Information Technology & Agritech', currentLangCode)}</option>
                <option value="Food Products & Spices">{getLocalizedSector('Food Products & Spices', currentLangCode)}</option>
                <option value="Manufacturing">{getLocalizedSector('Manufacturing', currentLangCode)}</option>
                <option value="Services & Software">{getLocalizedSector('Services & Software', currentLangCode)}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('enterpriseStageLabel')}</label>
              <select
                value={formState.stage || ''}
                onChange={(e) => handleChange('stage', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectStage') || '-- Select Stage --'}</option>
                <option value="New (Startup)">{tProf('stageNew')}</option>
                <option value="Existing (Expansion)">{tProf('stageExisting')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('locationTypeLabel')}</label>
              <select
                value={formState.locationType || ''}
                onChange={(e) => handleChange('locationType', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">{tProf('selectLocation') || '-- Select Location Type --'}</option>
                <option value="Rural">{tProf('locationRural')}</option>
                <option value="Urban">{tProf('locationUrban')}</option>
                <option value="Semi-Urban">{tProf('locationSemiUrban')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('totalInvestmentLabel')}</label>
              <input
                type="text"
                value={formState.investmentRequired || ''}
                onChange={(e) => handleChange('investmentRequired', e.target.value)}
                placeholder="e.g. ₹5.00 Lakh"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('fundingRequiredLabel')}</label>
              <input
                type="text"
                value={formState.fundingRequired || ''}
                onChange={(e) => handleChange('fundingRequired', e.target.value)}
                placeholder="e.g. ₹4.00 Lakh"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('expectedTurnoverLabel')}</label>
              <input
                type="text"
                value={formState.expectedTurnover || ''}
                onChange={(e) => handleChange('expectedTurnover', e.target.value)}
                placeholder="e.g. ₹10.00 Lakh"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('employeesCountLabel')}</label>
              <input
                type="text"
                value={formState.employeesCount || ''}
                onChange={(e) => handleChange('employeesCount', e.target.value)}
                placeholder="e.g. 3 persons"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* 3. FUNDING & INVESTOR MATCHING REQUIREMENTS */}
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">{tInv('fundingRequirementsTitle')}</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">{tInv('fundingRequirementsSubtitle')}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500">{tProf('section3Badge')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('needInvestmentLabel')}</label>
              <select
                value={formState.needInvestment || ''}
                onChange={(e) => handleChange('needInvestment', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">-- Select Preference --</option>
                <option value="Yes">{tProf('needInvYes')}</option>
                <option value="No">{tProf('needInvNo')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('capitalReqLabel')}</label>
              <select
                value={
                  !formState.fundingRequiredNum
                    ? ''
                    : formState.fundingRequiredNum < 1000000
                      ? 'tier_c'
                      : formState.fundingRequiredNum <= 10000000
                        ? 'tier_b'
                        : 'tier_a_1_5'
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) {
                    handleChange('fundingRequired', '');
                    handleChange('fundingRequiredNum', 0);
                  } else if (val === 'tier_c') {
                    handleChange('fundingRequired', '₹5.00 Lakh');
                    handleChange('fundingRequiredNum', 500000);
                  } else if (val === 'tier_b') {
                    handleChange('fundingRequired', '₹50.00 Lakh');
                    handleChange('fundingRequiredNum', 5000000);
                  } else if (val === 'tier_a_1_5') {
                    handleChange('fundingRequired', '₹2.50 Crore');
                    handleChange('fundingRequiredNum', 25000000);
                  } else if (val === 'tier_a_5_10') {
                    handleChange('fundingRequired', '₹7.50 Crore');
                    handleChange('fundingRequiredNum', 75000000);
                  } else if (val === 'tier_a_above_10') {
                    handleChange('fundingRequired', '₹15.00 Crore');
                    handleChange('fundingRequiredNum', 150000000);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">-- Select Investment Tier --</option>
                <option value="tier_c">{tProf('tierCOption')}</option>
                <option value="tier_b">{tProf('tierBOption')}</option>
                <option value="tier_a_1_5">{tProf('tierA15Option')}</option>
                <option value="tier_a_5_10">{tProf('tierA510Option')}</option>
                <option value="tier_a_above_10">{tProf('tierAAbove10Option')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('exactAmountLabel')}</label>
              <input
                type="text"
                value={formState.fundingRequired || ''}
                onChange={(e) => handleChange('fundingRequired', e.target.value)}
                placeholder="e.g. ₹25.00 Lakh"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('useOfFundsLabel')}</label>
              <select
                value={formState.useOfFunds || ''}
                onChange={(e) => handleChange('useOfFunds', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">-- Select Primary Use of Funds --</option>
                <option value="Product Development & Prototyping">{tProf('useProductDev')}</option>
                <option value="Machinery & Capex Procurement">{tProf('useMachinery')}</option>
                <option value="Working Capital & Inventory">{tProf('useWorkingCap')}</option>
                <option value="Marketing, Branding & Expansion">{tProf('useMarketing')}</option>
                <option value="Team Hiring & Operational Scale">{tProf('useTeamHiring')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('equityOfferedLabel')}</label>
              <select
                value={formState.equityOffered || ''}
                onChange={(e) => handleChange('equityOffered', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">-- Select Equity Range --</option>
                <option value="3% – 5%">{tProf('equity3_5')}</option>
                <option value="5% – 10%">{tProf('equity5_10')}</option>
                <option value="10% – 15%">{tProf('equity10_15')}</option>
                <option value="15% – 20%">{tProf('equity15_20')}</option>
                <option value="Negotiable / Convertible">{tProf('equitySafe')}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('socialImpactLabel')}</label>
              <select
                value={formState.socialImpactFocus || ''}
                onChange={(e) => handleChange('socialImpactFocus', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="">-- Select Social Impact --</option>
                <option value="Yes">{tProf('impactYes')}</option>
                <option value="No">{tProf('impactNo')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. PREFERENCES */}
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-indigo-400/10 border border-indigo-400/30 text-indigo-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h2 className="text-base font-black text-white">{t('preferences') || 'Preferences & Handholding'}</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{tProf('section4Badge')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('prefLangLabel')}</label>
              <select
                value={formState.preferredLanguage}
                onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              >
                <option value="English">English</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Malayalam">മലയാളം (Malayalam)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('desiredFundingLabel')}</label>
              <input
                type="text"
                value={formState.fundingType || ''}
                onChange={(e) => handleChange('fundingType', e.target.value)}
                placeholder="e.g. Credit-linked Subsidy & Term Loan"
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">{tProf('assistanceNeededLabel')}</label>
              <input
                type="text"
                value={formState.supportNeeded || ''}
                onChange={(e) => handleChange('supportNeeded', e.target.value)}
                placeholder="Describe machinery subsidy, working capital or FSSAI guidance needed..."
                className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-amber-500/40 text-white font-medium"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-2xl border border-slate-700 shadow-md transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-400" />
            <span>{t('saveProfile') || 'Save Profile'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              updateProfile(formState);
              navigate('/recommendations?tab=investors');
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 font-bold text-xs rounded-2xl border border-purple-500/40 shadow-md transition cursor-pointer"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{tInv('matchInvestorsBtn')}</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyzeEligibility}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>{tProf('analyzingMatrix')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{t('analyzeEligibility') || 'Analyze Schemes & Match Investors'}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
