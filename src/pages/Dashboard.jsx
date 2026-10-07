import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InnovationBar from '../components/layout/InnovationBar';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  UserCircle2, 
  Compass, 
  FileCheck2, 
  Milestone, 
  IndianRupee, 
  Calculator,
  Briefcase
} from 'lucide-react';
import { getInvestorUITranslation } from '../data/investorTranslations';

export default function Dashboard() {
  const { 
    currentProfile, 
    schemes, 
    investors, 
    t, 
    currentLangCode,
    isEligibilityUnlocked,
    hasCompletedDetails,
    hasUploadedMandatoryDocs,
    mandatoryDocsReadyCount
  } = useApp();

  // Interactive Live Financial Calculator & Subsidy Forecaster State
  const [targetInvestment, setTargetInvestment] = useState(500000); // Default ₹5 Lakh
  const [selectedSchemePreset, setSelectedSchemePreset] = useState('nsfdc-term'); // 'nsfdc-micro', 'nsfdc-term', 'nsfdc-edu', 'pmegp', 'custom'
  const [customInterestRate, setCustomInterestRate] = useState(7.5);
  const [moratoriumMonths, setMoratoriumMonths] = useState(6); // 3 to 12 months grace period
  const [tenureYears, setTenureYears] = useState(5);

  // Scheme-specific guidelines (NSFDC, PMEGP, Stand-Up India, Micro Credit)
  const schemePresets = {
    'nsfdc-micro': {
      id: 'nsfdc-micro',
      name: 'NSFDC Micro Credit (MCS)',
      label: 'NSFDC Micro Credit (6.5%)',
      maxLimit: 140000,
      minLimit: 20000,
      interestRate: 6.5,
      loanCoveragePercent: 90,
      marginPercent: 10,
      defaultMoratorium: 3,
      badge: '6.5% Concessional Rate · Max ₹1.40L'
    },
    'nsfdc-term': {
      id: 'nsfdc-term',
      name: 'NSFDC Term Loan',
      label: 'NSFDC Term Loan (7.5%)',
      maxLimit: 5000000,
      minLimit: 140000,
      interestRate: 7.5,
      loanCoveragePercent: 90,
      marginPercent: 10,
      defaultMoratorium: 6,
      badge: '7.5% Concessional Rate · Max ₹50L'
    },
    'nsfdc-edu': {
      id: 'nsfdc-edu',
      name: 'NSFDC Education Loan',
      label: 'NSFDC Education (4.5%)',
      maxLimit: 3000000,
      minLimit: 100000,
      interestRate: 4.5,
      loanCoveragePercent: 90,
      marginPercent: 10,
      defaultMoratorium: 12,
      badge: '4.5% Rate · Course + 6 Mo Moratorium'
    },
    'pmegp': {
      id: 'pmegp',
      name: 'PMEGP Subsidy + Bank Credit',
      label: 'PMEGP (8.5% + Subsidy)',
      maxLimit: 5000000,
      minLimit: 100000,
      interestRate: 8.5,
      loanCoveragePercent: currentProfile.locationType === 'Rural' ? 60 : 70,
      subsidyPercent: currentProfile.locationType === 'Rural' ? 35 : 25,
      marginPercent: 5,
      defaultMoratorium: 6,
      badge: 'Up to 35% Capital Subsidy'
    },
    'custom': {
      id: 'custom',
      name: 'Custom Credit Scheme',
      label: 'Custom Rate (6.5% - 15%)',
      maxLimit: 5000000,
      minLimit: 50000,
      interestRate: customInterestRate,
      loanCoveragePercent: 90,
      marginPercent: 10,
      defaultMoratorium: moratoriumMonths,
      badge: `${customInterestRate}% Custom Rate`
    }
  };

  const activeConfig = schemePresets[selectedSchemePreset] || schemePresets['nsfdc-term'];
  const activeRate = selectedSchemePreset === 'custom' ? customInterestRate : activeConfig.interestRate;
  
  const isPmegp = selectedSchemePreset === 'pmegp';
  const subsidyPercent = isPmegp ? (currentProfile.locationType === 'Rural' ? 35 : 25) : 0;
  const subsidyAmount = isPmegp ? Math.round((targetInvestment * subsidyPercent) / 100) : 0;
  
  const marginMoneyPercent = activeConfig.marginPercent;
  const marginMoneyAmount = Math.round((targetInvestment * marginMoneyPercent) / 100);
  
  const loanAssistancePercent = isPmegp ? (100 - subsidyPercent - marginMoneyPercent) : activeConfig.loanCoveragePercent;
  const bankLoanAmount = Math.round((targetInvestment * loanAssistancePercent) / 100);

  // Post-Moratorium Monthly EMI calculation
  const totalMonths = tenureYears * 12;
  const monthlyRate = activeRate / (12 * 100);
  const estimatedEmi = bankLoanAmount > 0 && monthlyRate > 0
    ? Math.round(
        (bankLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      )
    : 0;

  // Time of day greeting localized
  const hour = new Date().getHours();
  const greetingText = hour < 12 
    ? t('goodMorning') 
    : hour < 18 
      ? (t('goodAfternoon') || t('goodMorning')) 
      : (t('goodEvening') || t('goodMorning'));

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. HERO GREETING BANNER WITH GLASSMORPHIC GLOW */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/70 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Radiant Mesh Background Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('sihTagline')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {greetingText}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">{currentProfile.name}</span>!
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {isEligibilityUnlocked ? (
                <>
                  {t('heroSubtitlePrefix')} <strong className="text-amber-400 font-extrabold">{schemes.length} {t('heroMatchingSchemesText')}</strong> <strong className="text-white">{currentProfile.businessName}</strong> ({currentProfile.businessType} in {currentProfile.state}) {t('heroWithSubsidies')} <strong className="text-emerald-400 font-bold">35%</strong>.
                </>
              ) : (
                <span>Complete your profile details and upload the 4 mandatory KYC documents to unlock affirmative subsidy rates and discover matching government schemes.</span>
              )}
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition cursor-pointer"
              >
                <span>{hasCompletedDetails ? t('findSuitableSchemes') : 'Complete Profile Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/scheme-finder"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t('aiVoiceAdvisorBtn')}</span>
              </Link>

              <Link
                to="/recommendations?tab=investors"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-xs sm:text-sm border border-amber-400/30 transition cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>{getInvestorUITranslation('investorMatching', currentLangCode)} ({(investors || []).length})</span>
              </Link>
            </div>
          </div>

          {/* Right: Profile Readiness Glass Widget */}
          <div className="lg:w-80 p-5 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 shadow-xl shrink-0 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t('profileScore')}</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${
                isEligibilityUnlocked 
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
              }`}>
                {isEligibilityUnlocked ? t('verifiedBadge') : 'Pending Docs'}
              </span>
            </div>

            <div className="my-4 flex items-center gap-4">
              {/* Radial Completion Percentage */}
              <div className="relative w-16 h-16 rounded-full bg-slate-900 border-4 border-amber-400 flex items-center justify-center font-black text-lg text-white shadow-lg shrink-0">
                {currentProfile.completionPercentage}%
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentProfile.category || 'New Entrepreneur'} {t('entrepreneurText')}</p>
                <p className="text-[11px] text-amber-300 truncate mt-0.5">{t('targetFunding')} {currentProfile.fundingRequired || 'Not set'}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {currentProfile.locationType === 'Rural' ? t('ruralPriorityZone') : currentProfile.locationType === 'Urban' ? t('urbanPriorityZone') : 'Location pending'}
                </p>
              </div>
            </div>

            <Link
              to="/profile"
              className="w-full py-2 px-3 text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-xl transition flex items-center justify-center gap-1"
            >
              <span>{t('completeMyProfile')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Action Required Alert Banner when schemes are locked */}
      {!isEligibilityUnlocked && (
        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              🔒
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Government Schemes Locked</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Complete your <strong>Profile Details</strong> ({hasCompletedDetails ? '✅ Completed' : '⚠️ Pending'}) and upload <strong>4 Mandatory KYC Documents</strong> ({mandatoryDocsReadyCount}/4 uploaded) to unlock eligible schemes and subsidy calculations.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!hasCompletedDetails && (
              <Link
                to="/profile"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition"
              >
                Complete Profile
              </Link>
            )}
            {!hasUploadedMandatoryDocs && (
              <Link
                to="/documents"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 rounded-xl transition"
              >
                Upload Docs ({mandatoryDocsReadyCount}/4)
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('matchingSchemes')}</span>
            <div className="text-2xl font-black text-white mt-1">
              {isEligibilityUnlocked ? `${schemes.length} ${t('schemesCountText')}` : `0 ${t('schemesCountText')}`}
            </div>
            <span className="text-[10.5px] text-amber-400 font-semibold mt-0.5 block">
              {isEligibilityUnlocked ? `6 ${t('highCompatibilityText')}` : 'Details & Docs Required'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('capitalSubsidy')}</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{t('upTo35Percent')}</div>
            <span className="text-[10.5px] text-slate-400 font-semibold mt-0.5 block">{t('maxSubsidyCapText')}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('documentsReady')}</span>
            <div className="text-2xl font-black text-white mt-1">
              {currentProfile.documentsReadyCount}/{currentProfile.documentsTotalCount}
            </div>
            <span className="text-[10.5px] text-emerald-400 font-semibold mt-0.5 block">{t('aadhaarVerifiedText')}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('roadmapStatus')}</span>
            <div className="text-2xl font-black text-white mt-1">{t('step4of7')}</div>
            <span className="text-[10.5px] text-indigo-400 font-semibold mt-0.5 block">{t('bankAppraisalPhase')}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-400/10 text-indigo-400 flex items-center justify-center">
            <Milestone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE LIVE SUBSIDY FORECASTER & CONCESSIONAL FINANCIAL CALCULATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>{t('forecasterTitle')}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase">
                  {activeConfig.badge}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic EMI & Capital Calculator accounting for Concessional Lending (6.5% - 8%) & Moratorium Periods (3-12 Mo)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300 font-bold px-3 py-1 bg-slate-800 rounded-xl border border-slate-700">
              SC Empowerment: 90% Project Cost Coverage
            </span>
          </div>
        </div>

        {/* Scheme Guidelines Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>Select Credit / Scheme Guideline:</span>
            <span className="text-[11px] font-mono text-amber-400 font-extrabold">{activeConfig.name}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.values(schemePresets).map((preset) => {
              const isSelected = selectedSchemePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedSchemePreset(preset.id);
                    if (preset.defaultMoratorium) setMoratoriumMonths(preset.defaultMoratorium);
                    if (targetInvestment > preset.maxLimit) setTargetInvestment(preset.maxLimit);
                    if (targetInvestment < preset.minLimit) setTargetInvestment(preset.minLimit);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold transition flex flex-col items-start gap-1 cursor-pointer text-left border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-amber-400/50'
                  }`}
                >
                  <span className="truncate w-full">{preset.label}</span>
                  <span className={`text-[10px] font-medium truncate ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    Max ₹{(preset.maxLimit / 100000).toFixed(1)}L
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Investment Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>{t('targetProjectInvestment')} (Project / Education Cost)</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              ₹{(targetInvestment / 100000).toFixed(2)} Lakh
            </span>
          </div>

          <input
            type="range"
            min={activeConfig.minLimit || 20000}
            max={activeConfig.maxLimit || 5000000}
            step="20000"
            value={targetInvestment}
            onChange={(e) => setTargetInvestment(Number(e.target.value))}
            className="w-full"
          />

          <div className="flex justify-between text-[10px] font-bold text-slate-500">
            <span>Min: ₹{(activeConfig.minLimit / 100000).toFixed(2)}L</span>
            <span>Selected Outlay: ₹{(targetInvestment / 100000).toFixed(2)}L</span>
            <span>Max Scheme Ceiling: ₹{(activeConfig.maxLimit / 100000).toFixed(2)}L</span>
          </div>
        </div>

        {/* Moratorium & Interest Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
              <span>Moratorium Period (Grace Period)</span>
              <span className="text-amber-400 font-mono font-black">{moratoriumMonths} Months</span>
            </div>
            <div className="flex items-center gap-2">
              {[3, 6, 9, 12].map((mo) => (
                <button
                  key={mo}
                  type="button"
                  onClick={() => setMoratoriumMonths(mo)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                    moratoriumMonths === mo
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {mo} Mo
                </button>
              ))}
            </div>
            <p className="text-[10px] text-amber-300/80 mt-1 font-medium">
              ✨ Zero principal repayment required during these {moratoriumMonths} months.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
              <span>Concessional Interest Rate (p.a.)</span>
              <span className="text-emerald-400 font-mono font-black">{activeRate}% p.a.</span>
            </div>
            {selectedSchemePreset === 'custom' ? (
              <input
                type="range"
                min="6.5"
                max="15.0"
                step="0.5"
                value={customInterestRate}
                onChange={(e) => setCustomInterestRate(Number(e.target.value))}
                className="w-full mt-1.5"
              />
            ) : (
              <div className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center justify-between">
                <span>Statutory Scheme Rate</span>
                <span className="font-bold text-white">{activeRate}% p.a. Fixed</span>
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              Concessional rates (6.5% - 8%) routed via State Channelizing Agencies (SCAs).
            </p>
          </div>
        </div>

        {/* 4 Financial Breakdown Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10.5px] font-bold text-emerald-400 uppercase tracking-wider block">
              {isPmegp ? `Govt Subsidy (${subsidyPercent}%)` : `Concessional Loan (${loanAssistancePercent}%)`}
            </span>
            <div className="text-xl font-black text-emerald-300 mt-1 font-mono">
              ₹{((isPmegp ? subsidyAmount : bankLoanAmount) / 100000).toFixed(2)} Lakh
            </div>
            <p className="text-[10.5px] text-emerald-400/80 mt-1 font-medium">
              {isPmegp ? 'Direct Capital Grant' : 'Up to 90% Channel Finance'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <span className="text-[10.5px] font-bold text-amber-400 uppercase tracking-wider block">
              Promoter's Margin ({marginMoneyPercent}%)
            </span>
            <div className="text-xl font-black text-amber-300 mt-1 font-mono">
              ₹{(marginMoneyAmount / 100000).toFixed(2)} Lakh
            </div>
            <p className="text-[10.5px] text-amber-400/80 mt-1 font-medium">
              Self / State Grant Contribution
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
            <span className="text-[10.5px] font-bold text-blue-400 uppercase tracking-wider block">
              Moratorium Period
            </span>
            <div className="text-xl font-black text-blue-300 mt-1 font-mono">
              {moratoriumMonths} Months Grace
            </div>
            <p className="text-[10.5px] text-blue-400/80 mt-1 font-medium">
              No Principal Due during Setup
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <span className="text-[10.5px] font-bold text-indigo-400 uppercase tracking-wider block">
              Post-Grace Monthly EMI
            </span>
            <div className="text-xl font-black text-indigo-300 mt-1 font-mono">
              ₹{estimatedEmi.toLocaleString('en-IN')}/mo
            </div>
            <p className="text-[10.5px] text-indigo-400/80 mt-1 font-medium">
              At {activeRate}% p.a. over {tenureYears} Years
            </p>
          </div>

        </div>
      </div>

      {/* 4. INNOVATION JOURNEY BAR */}
      <InnovationBar />

      {/* 5. DISCLAIMER NOTICE */}
      <DisclaimerNotice />

    </div>
  );
}
