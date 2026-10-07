import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MatchScoreBadge from '../components/common/MatchScoreBadge';
import EligibilityBadge from '../components/common/EligibilityBadge';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import WhyMatchedModal from '../components/scheme/WhyMatchedModal';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Milestone, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Bookmark,
  Volume2,
  VolumeX,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

export default function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { schemes, currentProfile, applyForScheme, appliedSchemeIds, savedSchemeIds, toggleSaveScheme, t, speakText, currentlySpeakingId } = useApp();
  const [showWhyMatched, setShowWhyMatched] = useState(false);

  const scheme = schemes.find(s => s.id === id) || schemes[0];

  const isApplied = appliedSchemeIds.includes(scheme.id);
  const isSaved = savedSchemeIds.includes(scheme.id);
  const isSpeakingThis = currentlySpeakingId === `detail-${scheme.id}`;

  const fullVoiceText = `${scheme.name}. Offered by ${scheme.department}. ${scheme.description}. Max funding limit is ${scheme.maxFunding}. Capital subsidy rate: ${scheme.subsidyRate}. Required documents include ${scheme.requiredDocuments?.slice(0, 3).join(', ')}.`;

  const handleStartRoadmap = () => {
    applyForScheme(scheme.id);
    navigate('/roadmap');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Back Navigation & Action Controls */}
      <div className="flex items-center justify-between">
        <Link
          to="/recommendations"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToMatching') || 'Back to Matching Schemes'}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          {/* Google Voice Read Aloud */}
          <button
            onClick={() => speakText(fullVoiceText, `detail-${scheme.id}`)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
              isSpeakingThis
                ? 'bg-amber-400 text-slate-950 animate-pulse shadow-md'
                : 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeakingThis ? t('stopVoice') : t('listenVoice')}</span>
          </button>

          <button
            onClick={() => toggleSaveScheme(scheme.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border transition cursor-pointer ${
              isSaved
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? (t('saved') || 'Saved') : (t('saveScheme') || 'Save Scheme')}</span>
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                {scheme.shortName}
              </span>
              {scheme.schemeType === 'private' ? (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  🏢 {t('privateProgramBadge') || 'Private Program'}
                </span>
              ) : scheme.schemeType === 'csr' ? (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  🤝 {t('csrInitiativeBadge') || 'CSR Initiative'}
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  🏛️ {t('governmentSchemeBadge') || 'Government Scheme'}
                </span>
              )}
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-amber-300/80 font-medium">{scheme.provider ? `${scheme.provider} · ${scheme.department}` : scheme.department}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {scheme.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {scheme.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-slate-800/80 rounded-xl text-slate-300 border border-slate-700">
                {t('sectorLabel') || 'Sector:'} <strong className="text-white">{scheme.sector}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-800/80 rounded-xl text-slate-300 border border-slate-700">
                {t('nodalLabel') || 'Nodal:'} <strong className="text-white">{scheme.nodalAgency}</strong>
              </span>
              {scheme.officialPortal && (
                <a
                  href={scheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-xl border border-cyan-500/40 font-bold transition cursor-pointer"
                >
                  <span>{t('officialGovtPortal') || 'Official Government Portal'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Match Score & Explainability Trigger Box */}
          <div className="lg:w-72 bg-slate-800/90 backdrop-blur-xl p-5 rounded-3xl border border-slate-700/80 shadow-xl shrink-0 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {t('compatibilityRating') || 'Compatibility Rating'}
              </span>
              <div className="flex items-center justify-between">
                <MatchScoreBadge score={scheme.matchScore} size="lg" />
                <EligibilityBadge status={scheme.eligibilityStatus} />
              </div>
            </div>

            <button
              onClick={() => setShowWhyMatched(true)}
              className="w-full mt-4 py-2.5 px-3 bg-slate-700/60 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-2xl transition border border-slate-600 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('whyAmIMatched') || 'Why matched?'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial & Subsidy Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-xl">
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">{t('maxFundingLabel') || 'Maximum Funding'}</span>
          <div className="text-xl font-black text-white mt-1 font-mono">{scheme.maxFunding}</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">{t('compositeProjectCeiling') || 'Composite Project Ceiling'}</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-xl">
          <span className="text-[10.5px] font-bold text-emerald-400 uppercase tracking-wider">{t('capitalSubsidyRateLabel') || 'Capital Subsidy Rate'}</span>
          <div className="text-xl font-black text-emerald-300 mt-1 font-mono">{scheme.subsidyRate}</div>
          <span className="text-[10px] text-emerald-400/80 mt-0.5 block">{t('directNonRepayableGrant') || 'Direct Non-Repayable Grant'}</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-xl">
          <span className="text-[10.5px] font-bold text-amber-400 uppercase tracking-wider">{t('marginMoneyLabel') || 'Margin Money (Own Contribution)'}</span>
          <div className="text-xl font-black text-amber-300 mt-1 font-mono">{scheme.marginMoney}</div>
          <span className="text-[10px] text-amber-400/80 mt-0.5 block">{t('affirmativeQuotaRate') || 'Affirmative Quota Rate'}</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-xl">
          <span className="text-[10.5px] font-bold text-indigo-400 uppercase tracking-wider">{t('financingAgencyLabel') || 'Financing Agency'}</span>
          <div className="text-lg font-black text-white mt-1 truncate">{scheme.nodalAgency}</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">{t('allCommercialBanks') || 'All Scheduled Commercial Banks'}</span>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Requirements & Key Reasons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Potential Benefit Box */}
          <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span>{t('financialBenefitFor') || 'Financial Benefit for'} {currentProfile.name}</span>
            </h3>
            <p className="text-xs text-amber-200 leading-relaxed font-medium bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
              {scheme.potentialBenefit}
            </p>
          </div>

          {/* Top Matched Factors Checklist */}
          <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t('aiMatchEvaluationFactors') || 'AI Algorithm Match Evaluation Factors'}</span>
            </h3>
            <div className="space-y-2.5 pt-1">
              {scheme.whyMatchedReasons?.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Required Documents & Application Launcher */}
        <div className="space-y-6">
          {/* Required Documents */}
          <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t('requiredCertificatesDocs') || 'Required Certificates & Documents'}</span>
            </h3>

            <div className="space-y-2">
              {scheme.requiredDocuments?.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs">
                  <span className="font-semibold text-slate-300">{doc}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {t('mandatory') || 'Mandatory'}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/documents')}
              className="w-full py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-2xl transition border border-slate-700 cursor-pointer"
            >
              {t('verifyInDocHub') || 'Verify in Document Hub →'}
            </button>
          </div>

          {/* Action Launcher Card */}
          <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 rounded-3xl p-6 border border-amber-500/30 shadow-2xl space-y-4">
            <h3 className="text-sm font-black text-white">{t('readyToInitiateApp') || 'Ready to initiate application?'}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('trackProgressRoadmap') || 'Track progress through the 7-stage SchemeMatch Guided Application Roadmap.'}
            </p>

            <button
              onClick={handleStartRoadmap}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Milestone className="w-4 h-4" />
              <span>{isApplied ? (t('viewInAppRoadmap') || 'View in Application Roadmap') : (t('startAppRoadmap') || 'Start Application Roadmap')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {scheme.officialPortal && (
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>{t('applyOnOfficialPortal') || 'Apply on Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Disclaimer Notice */}
      <DisclaimerNotice />

      {/* Why Matched Modal */}
      <WhyMatchedModal
        scheme={scheme}
        isOpen={showWhyMatched}
        onClose={() => setShowWhyMatched(false)}
      />
    </div>
  );
}
