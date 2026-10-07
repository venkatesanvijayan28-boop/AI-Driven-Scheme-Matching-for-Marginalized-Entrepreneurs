import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getLocalizedSector } from '../../data/sectorTranslations';
import MatchScoreBadge from '../common/MatchScoreBadge';
import WhyMatchedModal from './WhyMatchedModal';
import { 
  Building2, 
  HelpCircle, 
  ArrowRight, 
  Bookmark, 
  Volume2, 
  VolumeX,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  Check,
  ExternalLink
} from 'lucide-react';

export default function SchemeCard({ scheme }) {
  const { savedSchemeIds, toggleSaveScheme, t, speakText, currentlySpeakingId, currentLangCode } = useApp();
  const [showModal, setShowModal] = useState(false);

  const isSaved = savedSchemeIds.includes(scheme.id);
  const isSpeakingThis = currentlySpeakingId === `card-${scheme.id}`;

  const schemeVoiceSummary = `${scheme.name}. ${scheme.shortName}. ${scheme.potentialBenefit}. Maximum funding ${scheme.maxFunding}.`;

  // Translated match label
  let matchLabelTranslated = t('generalMatch') || 'General Fit';
  let matchBadgeColor = 'bg-blue-500/10 text-blue-300 border-blue-500/30';
  if (scheme.matchScore >= 90) {
    matchLabelTranslated = t('strongMatch') || 'Strong Match';
    matchBadgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
  } else if (scheme.matchScore >= 80) {
    matchLabelTranslated = t('highMatch') || 'High Match';
    matchBadgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/40';
  } else if (scheme.matchScore >= 70) {
    matchLabelTranslated = t('moderateMatch') || 'Moderate Match';
    matchBadgeColor = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40';
  }

  return (
    <>
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 hover:border-amber-400/50 shadow-lg hover:shadow-2xl card-hover flex flex-col justify-between overflow-hidden transition-all duration-200 group">
        
        {/* Card Header & Badges */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                {scheme.shortName}
              </span>
              {scheme.schemeType === 'private' ? (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                  <span>🏢 {t('privatePrograms') || 'Private'}</span>
                </span>
              ) : scheme.schemeType === 'csr' ? (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center gap-1">
                  <span>🤝 {t('csrInitiatives') || 'CSR'}</span>
                </span>
              ) : (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1">
                  <span>🏛️ {t('govtSchemes') || 'Govt'}</span>
                </span>
              )}
              {scheme.officialPortal && (
                <a
                  href={scheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 transition cursor-pointer"
                  title="Open Official Portal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Google Voice Audio Button */}
              <button
                onClick={() => speakText(schemeVoiceSummary, `card-${scheme.id}`)}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isSpeakingThis
                    ? 'bg-amber-400 text-slate-950 animate-pulse shadow-md'
                    : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                }`}
                title={isSpeakingThis ? t('stopVoice') : t('listenVoice')}
                aria-label="Listen with Google Voice"
              >
                {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Bookmark button */}
              <button
                onClick={() => toggleSaveScheme(scheme.id)}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isSaved ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isSaved ? 'Saved in favorites' : 'Save scheme'}
                aria-label="Bookmark scheme"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Scheme Title & Ministry */}
          <Link to={`/schemes/${scheme.id}`} className="group block">
            <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition leading-snug line-clamp-2">
              {scheme.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-amber-400/80" />
            <span className="truncate">{scheme.provider ? `${scheme.provider} · ${scheme.department}` : scheme.department}</span>
          </p>

          {/* Match Score & Status Banner */}
          <div className="mt-4 p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t('matchCompatibility') || 'Match Compatibility'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-xs font-black px-2 py-0.5 rounded-lg border ${matchBadgeColor}`}>
                  {matchLabelTranslated}
                </span>
              </div>
            </div>
            <MatchScoreBadge score={scheme.matchScore} size="lg" showLabel={false} />
          </div>

          {/* Potential Benefit Tag */}
          <div className="mt-3.5">
            <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-amber-400" />
              <span>{t('potentialBenefitTitle') || 'Potential Benefit & Finance'}</span>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 font-medium leading-relaxed">
              {scheme.potentialBenefit}
            </div>
          </div>

          {/* Sector & Ceiling Grid */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-semibold block">{t('maxFundingLabel') || 'Max Funding'}</span>
              <span className="font-black text-white truncate block mt-0.5">{scheme.maxFunding}</span>
            </div>
            <div className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-semibold block">{t('targetSectorLabel') || 'Target Sector'}</span>
              <span className="font-black text-white truncate block mt-0.5">{getLocalizedSector(scheme.sector?.split(',')[0] || scheme.sectorsList?.[0] || 'General', currentLangCode)}</span>
            </div>
          </div>

          {/* Why Matched Checklist Highlights */}
          <div className="mt-4 space-y-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
              {t('topMatchedFactors') || 'Top Matched Factors'}
            </span>
            {scheme.whyMatchedReasons?.slice(0, 2).map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="line-clamp-1 leading-snug">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-4 pt-3 bg-slate-800/40 border-t border-slate-800 flex items-center gap-2.5">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('whyAmIMatched') || 'Why matched?'}</span>
          </button>

          <Link
            to={`/schemes/${scheme.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 rounded-2xl shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            <span>{t('viewDetails') || 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Explainability Breakdown Modal */}
      <WhyMatchedModal
        scheme={scheme}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
