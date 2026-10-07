import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SchemeCard from '../components/scheme/SchemeCard';
import SchemeFilterBar from '../components/scheme/SchemeFilterBar';
import InvestorCard from '../components/investor/InvestorCard';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import { getInvestorUITranslation } from '../data/investorTranslations';
import { getLocalizedSector } from '../data/sectorTranslations';
import { 
  Compass, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Coins, 
  Briefcase, 
  TrendingUp, 
  Search, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Lock
} from 'lucide-react';

export default function Recommendations() {
  const { 
    schemes, 
    investors, 
    entrepreneurTier, 
    currentProfile, 
    currentLangCode, 
    t,
    isEligibilityUnlocked,
    hasCompletedDetails,
    hasUploadedMandatoryDocs,
    mandatoryDocsReadyCount
  } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const tInv = (key) => getInvestorUITranslation(key, currentLangCode);

  // Active module mode: 'schemes' (Govt/Private/CSR) vs 'investors' (Angel/VC/Impact)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'investors' ? 'investors' : 'schemes');

  // Scheme Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSchemeType, setSelectedSchemeType] = useState(searchParams.get('type') || 'all');
  const [selectedSector, setSelectedSector] = useState(currentProfile?.sector || 'All Sectors');
  const [selectedFundingRange, setSelectedFundingRange] = useState('all');
  const [selectedMatchLevel, setSelectedMatchLevel] = useState('all');
  const [sortBy, setSortBy] = useState('match_desc');
  const [hasSearched, setHasSearched] = useState(Boolean(searchParams.get('search') || searchParams.get('type')) || false);

  // Investor Filters state
  const [investorSearch, setInvestorSearch] = useState('');
  const [selectedInvestorTier, setSelectedInvestorTier] = useState('all'); // 'all', 'Tier A', 'Tier B', 'Tier C'
  const [selectedInvestorSector, setSelectedInvestorSector] = useState('all');
  const [investorSortBy, setInvestorSortBy] = useState('match_desc');

  // Scheme Type Counts
  const schemeTypeCounts = useMemo(() => {
    return {
      all: schemes.length,
      government: schemes.filter(s => (s.schemeType || 'government') === 'government').length,
      private: schemes.filter(s => s.schemeType === 'private').length,
      csr: schemes.filter(s => s.schemeType === 'csr').length
    };
  }, [schemes]);

  // Investor Tier Counts
  const investorTierCounts = useMemo(() => {
    return {
      all: (investors || []).length,
      tierA: (investors || []).filter(i => i.tier === 'Tier A').length,
      tierB: (investors || []).filter(i => i.tier === 'Tier B').length,
      tierC: (investors || []).filter(i => i.tier === 'Tier C').length
    };
  }, [investors]);

  // Trigger search
  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleQuickSectorSelect = (sec) => {
    setSelectedSector(sec);
    setHasSearched(true);
  };

  // Filtered & Sorted schemes
  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      // Scheme Type (Category: Government vs Private vs CSR)
      if (selectedSchemeType !== 'all') {
        const type = scheme.schemeType || 'government';
        if (selectedSchemeType === 'private_csr') {
          if (type !== 'private' && type !== 'csr') return false;
        } else if (type !== selectedSchemeType) {
          return false;
        }
      }

      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = scheme.name.toLowerCase().includes(query);
        const matchShort = scheme.shortName.toLowerCase().includes(query);
        const matchDept = scheme.department.toLowerCase().includes(query);
        const matchSector = scheme.sector.toLowerCase().includes(query);
        const matchProvider = scheme.provider?.toLowerCase().includes(query);
        if (!matchName && !matchShort && !matchDept && !matchSector && !matchProvider) {
          return false;
        }
      }

      // Sector
      if (selectedSector !== 'All Sectors') {
        const hasSector = scheme.sectorsList?.some(s => s.toLowerCase() === selectedSector.toLowerCase()) ||
                          scheme.sector?.toLowerCase().includes(selectedSector.toLowerCase());
        if (!hasSector) return false;
      }

      // Funding Range
      if (selectedFundingRange === 'up_to_5l' && scheme.maxFundingNum > 500000 && scheme.minFundingNum > 500000) {
        return false;
      } else if (selectedFundingRange === '5l_to_25l' && (scheme.maxFundingNum < 500000 || scheme.minFundingNum > 2500000)) {
        return false;
      } else if (selectedFundingRange === 'above_25l' && scheme.maxFundingNum < 2500000) {
        return false;
      }

      // Match level
      if (selectedMatchLevel === 'strong' && scheme.matchScore < 85) return false;
      if (selectedMatchLevel === 'moderate' && (scheme.matchScore < 70 || scheme.matchScore >= 85)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match_desc') return b.matchScore - a.matchScore;
      if (sortBy === 'funding_desc') return b.maxFundingNum - a.maxFundingNum;
      if (sortBy === 'funding_asc') return a.maxFundingNum - b.maxFundingNum;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [schemes, selectedSchemeType, searchQuery, selectedSector, selectedFundingRange, selectedMatchLevel, sortBy]);

  // Filtered & Sorted Investors
  const filteredInvestors = useMemo(() => {
    return (investors || []).filter((investor) => {
      // Tier filter
      if (selectedInvestorTier !== 'all' && investor.tier !== selectedInvestorTier) {
        return false;
      }

      // Search keyword
      if (investorSearch.trim()) {
        const q = investorSearch.toLowerCase();
        const mName = investor.name.toLowerCase().includes(q);
        const mOrg = investor.organization.toLowerCase().includes(q);
        const mType = investor.investorType.toLowerCase().includes(q);
        const mSec = investor.preferredSectors.some(s => s.toLowerCase().includes(q));
        if (!mName && !mOrg && !mType && !mSec) return false;
      }

      // Sector filter
      if (selectedInvestorSector !== 'all') {
        const hasSec = investor.preferredSectors.some(s => 
          s.toLowerCase() === 'all sectors' || 
          s.toLowerCase().includes(selectedInvestorSector.toLowerCase())
        );
        if (!hasSec) return false;
      }

      return true;
    }).sort((a, b) => {
      if (investorSortBy === 'match_desc') return b.matchScore - a.matchScore;
      if (investorSortBy === 'funding_desc') return b.maxInvestment - a.maxInvestment;
      if (investorSortBy === 'funding_asc') return a.minInvestment - b.minInvestment;
      if (investorSortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [investors, selectedInvestorTier, investorSearch, selectedInvestorSector, investorSortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSchemeType('all');
    setSelectedSector('All Sectors');
    setSelectedFundingRange('all');
    setSelectedMatchLevel('all');
    setSortBy('match_desc');
    setSearchParams({});
    setHasSearched(false);
  };

  const handleResetInvestorFilters = () => {
    setInvestorSearch('');
    setSelectedInvestorTier('all');
    setSelectedInvestorSector('all');
    setInvestorSortBy('match_desc');
  };

  const sectorChips = [
    { label: 'Food Processing & Agro', icon: '🌾' },
    { label: 'Textiles & Handloom', icon: '🧵' },
    { label: 'Information Technology & Agritech', icon: '💻' },
    { label: 'Food Products & Spices', icon: '🌶️' },
    { label: 'Manufacturing', icon: '⚙️' },
    { label: 'Services & Software', icon: '🚀' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Dual Module Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('schemes');
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.delete('tab');
                return next;
              });
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition cursor-pointer ${
              activeTab === 'schemes'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{tInv('schemeMatching')}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTab === 'schemes' ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {filteredSchemes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('investors');
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.set('tab', 'investors');
                return next;
              });
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition cursor-pointer ${
              activeTab === 'investors'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{tInv('investorMatching')}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTab === 'investors' ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {(investors || []).length}
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 pr-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{tInv('dualEngineNote')}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SCHEMES & SUBSIDIES MODULE VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          {/* Top Header Banner with Glassmorphic Styling */}
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <Compass className="w-5 h-5" />
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t('bestMatches') || 'Your Best Scheme Matches'}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                {hasSearched ? (
                  <>
                    <strong className="text-amber-400 font-extrabold">{filteredSchemes.length} {t('schemesMatchedText') || 'schemes matched'}</strong> ({currentProfile.name} · {selectedSector !== 'All Sectors' ? selectedSector : currentProfile.businessType} in {currentProfile.state}).
                  </>
                ) : (
                  <span>Select your business sector and criteria below to analyze and display matching government schemes.</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multi-Factor AI Scored</span>
              </span>
            </div>
          </div>

          {/* Gated Scheme Evaluation: Only display schemes after Profile Details & Mandatory Docs are completed */}
          {!isEligibilityUnlocked ? (
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 sm:p-10 border border-amber-500/40 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t('schemesLockedTitle') || 'Scheme Recommendations are Locked'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t('schemesLockedDesc') || 'To calculate accurate affirmative action subsidy rates and 100% compliant eligibility evaluation, government schemes will be unlocked once you provide all profile details and upload the 4 mandatory KYC verification documents.'}
                </p>
              </div>

              {/* 2 Step Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2 text-left">
                <div className={`p-5 rounded-2xl border transition-all ${
                  hasCompletedDetails 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Step 1: Profile Details</span>
                    {hasCompletedDetails ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                        <AlertCircle className="w-4 h-4" /> Pending Details
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Sector, Category, Location Type, Funding Amount, Age & Gender.
                  </p>
                  <Link
                    to="/profile"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    {hasCompletedDetails ? 'View Profile Details →' : 'Complete Profile Details →'}
                  </Link>
                </div>

                <div className={`p-5 rounded-2xl border transition-all ${
                  hasUploadedMandatoryDocs 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Step 2: Mandatory KYC Docs</span>
                    {hasUploadedMandatoryDocs ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> 4/4 Uploaded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
                        <AlertCircle className="w-4 h-4" /> {mandatoryDocsReadyCount}/4 Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Aadhaar Proof, Income/Caste Certificate, Bank Statement & Address Proof.
                  </p>
                  <Link
                    to="/documents"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    {hasUploadedMandatoryDocs ? 'View Uploaded Documents →' : 'Upload Mandatory Documents →'}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Filter and Search Bar */}
              <SchemeFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSchemeType={selectedSchemeType}
                setSelectedSchemeType={setSelectedSchemeType}
                schemeTypeCounts={schemeTypeCounts}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                selectedFundingRange={selectedFundingRange}
                setSelectedFundingRange={setSelectedFundingRange}
                selectedMatchLevel={selectedMatchLevel}
                setSelectedMatchLevel={setSelectedMatchLevel}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                onSearch={handleSearch}
                totalResults={filteredSchemes.length}
              />

              {/* Conditional Rendering: Only show schemes after user selects sector / searches */}
              {hasSearched ? (
                filteredSchemes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-slate-300">
                        <span>{t('foundMatchingFor') || 'Found Matching Schemes for'}</span> <span className="text-amber-400 font-black">{filteredSchemes.length}</span> ({getLocalizedSector(selectedSector, currentLangCode)})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSchemes.map((scheme) => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/80 rounded-3xl p-12 text-center border border-slate-800 shadow-xl space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto text-xl font-bold">
                      🔍
                    </div>
                    <h3 className="text-base font-bold text-white">{t('noSchemesFoundTitle') || 'No Schemes Found Matching Filters'}</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      {t('noSchemesFoundDesc') || 'Try adjusting your search keyword, selecting a broader sector, or resetting all filters.'}
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                    >
                      {t('resetAllFilters') || 'Reset All Filters'}
                    </button>
                  </div>
                )
              ) : (
                /* Pre-Search State: Interactive Sector Selection Card */
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl text-center space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>

                  <div className="space-y-2 max-w-xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {t('selectSectorTitle') || 'Select Your Business Sector to Analyze Schemes'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {t('selectSectorDesc') || 'Choose your sector below or use the filter bar above, then click Search Schemes to calculate your affirmative subsidy rates and matching central/state programs.'}
                    </p>
                  </div>

                  {/* Quick Sector Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-w-3xl mx-auto pt-2">
                    {sectorChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickSectorSelect(chip.label)}
                        className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer group ${
                          selectedSector === chip.label
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                            : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl p-2 rounded-xl bg-slate-900/60 shrink-0 group-hover:scale-110 transition">
                          {chip.icon}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold leading-snug group-hover:text-amber-300 transition">
                            {getLocalizedSector(chip.label, currentLangCode)}
                          </h4>
                          <span className="text-[10px] text-slate-400">{t('clickToEvaluate') || 'Click to evaluate'}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>{t('analyzeAndShowSchemes') || 'Analyze & Show Eligible Schemes'}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INVESTOR MATCHING MODULE VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'investors' && (
        <div className="space-y-6">
          {/* Top Header Banner for Investor Matching */}
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <Briefcase className="w-5 h-5" />
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {tInv('bannerTitle')}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium max-w-2xl">
                {tInv('bannerSubtitle')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{tInv('multiFactorScored')}</span>
              </span>
            </div>
          </div>

          {/* Entrepreneur Profile Capital Positioning Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {tInv('capitalPositioning')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {entrepreneurTier?.tier || 'Tier C'} {tInv('focus')}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {currentProfile.businessName} · <span className="text-amber-400">{currentProfile.sector}</span>
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {tInv('seeking')} <strong className="text-white font-bold">{currentProfile.fundingRequired}</strong> {tInv('capitalFor')} {currentProfile.stage} {tInv('stageEnterpriseIn')} {currentProfile.state}.
                </p>
              </div>

              {/* Capital Tier Explanation Box */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs max-w-md">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>{tInv('tierVsScoreTitle')}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {tInv('tierVsScoreDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Investor Filter Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            {/* Top Row: Search & Tier Tabs */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={tInv('searchPlaceholder')}
                  value={investorSearch}
                  onChange={(e) => setInvestorSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Capital Tier Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setSelectedInvestorTier('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedInvestorTier === 'all'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {tInv('allTiers')} ({investorTierCounts.all})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInvestorTier('Tier A')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedInvestorTier === 'Tier A'
                      ? 'bg-purple-500 text-white font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {tInv('tierA')} ({investorTierCounts.tierA})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInvestorTier('Tier B')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedInvestorTier === 'Tier B'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {tInv('tierB')} ({investorTierCounts.tierB})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInvestorTier('Tier C')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedInvestorTier === 'Tier C'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {tInv('tierC')} ({investorTierCounts.tierC})
                </button>
              </div>
            </div>

            {/* Bottom Row: Sort and Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">{tInv('sortBy')}</span>
                <select
                  value={investorSortBy}
                  onChange={(e) => setInvestorSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-medium focus:outline-none"
                >
                  <option value="match_desc">{tInv('sortHighestMatch')}</option>
                  <option value="funding_desc">{tInv('sortTicketHighLow')}</option>
                  <option value="funding_asc">{tInv('sortTicketLowHigh')}</option>
                  <option value="name_asc">{tInv('sortNameAZ')}</option>
                </select>
              </div>

              {(investorSearch || selectedInvestorTier !== 'all' || investorSortBy !== 'match_desc') && (
                <button
                  type="button"
                  onClick={handleResetInvestorFilters}
                  className="text-amber-400 hover:text-amber-300 font-bold text-xs cursor-pointer"
                >
                  {tInv('resetFilters')}
                </button>
              )}
            </div>
          </div>

          {/* Mandatory Regulatory / Platform Notice */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">{tInv('advisoryTitle')}</p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {tInv('advisoryDesc')}
              </p>
            </div>
          </div>

          {/* Investor Cards Grid */}
          {filteredInvestors.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-300">
                  {tInv('showingCount')} <span className="text-amber-400 font-black">{filteredInvestors.length}</span> {tInv('showingInvestors')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvestors.map((investor) => (
                  <InvestorCard key={investor.id} investor={investor} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/80 rounded-3xl p-12 text-center border border-slate-800 shadow-xl space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto text-xl font-bold">
                🔍
              </div>
              <h3 className="text-base font-bold text-white">{tInv('noInvestorsFound')}</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {tInv('noInvestorsDesc')}
              </p>
              <button
                onClick={handleResetInvestorFilters}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                {tInv('resetAll')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Persistent Disclaimer Notice */}
      <DisclaimerNotice />
    </div>
  );
}
