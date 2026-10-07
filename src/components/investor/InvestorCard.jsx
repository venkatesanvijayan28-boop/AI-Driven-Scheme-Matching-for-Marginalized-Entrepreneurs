import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getInvestorUITranslation } from '../../data/investorTranslations';
import { getLocalizedSector, getLocalizedStage } from '../../data/sectorTranslations';
import { 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Coins, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Award,
  Globe2,
  Users,
  Compass
} from 'lucide-react';

export default function InvestorCard({ investor }) {
  const { currentLangCode } = useApp();
  const [showFullDetails, setShowFullDetails] = useState(false);

  const tInv = (key) => getInvestorUITranslation(key, currentLangCode);

  // Capital Tier Badge Styling & Tooltip
  const tierConfig = {
    'Tier A': {
      bg: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
      tag: tInv('tierA_badge'),
      range: '₹1 Crore and above'
    },
    'Tier B': {
      bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      tag: tInv('tierB_badge'),
      range: '₹10 Lakh – ₹1 Crore'
    },
    'Tier C': {
      bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      tag: tInv('tierC_badge'),
      range: 'Below ₹10 Lakh'
    }
  };

  const currentTier = tierConfig[investor.tier] || tierConfig['Tier B'];

  // Score styling
  const score = investor.matchScore || 85;
  const scoreColor = score >= 85 
    ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/40' 
    : score >= 70 
      ? 'text-amber-400 bg-amber-500/15 border-amber-500/40' 
      : 'text-blue-400 bg-blue-500/15 border-blue-500/40';

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5 relative overflow-hidden group">
      {/* Decorative subtle ambient gradient glow */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

      <div>
        {/* Top Badges Header: Tier + Match Score */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {/* Capital Tier Badge */}
          <span 
            className={`text-[11px] font-black px-3 py-1 rounded-xl border flex items-center gap-1.5 shadow-xs ${currentTier.bg}`}
            title="Represents investor capital ticket size: Tier A (₹1Cr+), Tier B (₹10L–₹1Cr), Tier C (<₹10L)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{currentTier.tag}</span>
          </span>

          {/* AI Compatibility Score Badge */}
          <span className={`text-[11px] font-black px-3 py-1 rounded-xl border flex items-center gap-1.5 shadow-xs ${scoreColor}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{score}% {tInv('compatibility')}</span>
          </span>
        </div>

        {/* Investor Name and Organization */}
        <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
          {investor.name}
        </h3>
        
        <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{investor.organization}</span>
        </p>

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-2 mt-3 leading-relaxed font-normal">
          {investor.description}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              {tInv('investmentTicket')}
            </span>
            <span className="text-sm font-black text-amber-400 mt-0.5 block">
              {investor.investmentRangeText}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              {tInv('investorType')}
            </span>
            <span className="text-xs font-bold text-white mt-0.5 block truncate" title={investor.investorType}>
              {investor.investorType}
            </span>
          </div>
        </div>

        {/* Preferred Stages Tags */}
        <div className="space-y-1.5 mb-3.5">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
            {tInv('preferredStages')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {investor.preferredStages.slice(0, 4).map((st, i) => (
              <span 
                key={i} 
                className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
              >
                {getLocalizedStage(st, currentLangCode)}
              </span>
            ))}
          </div>
        </div>

        {/* Why Matched AI Insights */}
        {investor.whyMatched && investor.whyMatched.length > 0 && (
          <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 mb-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{tInv('whyMatchedTitle')}</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300">
              {investor.whyMatched.slice(0, 3).map((reason, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Potential Gap / Verification Advisory */}
        {investor.potentialGap && (
          <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2 mb-3.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{investor.potentialGap}</span>
          </div>
        )}

        {/* Expandable Deep Breakdown */}
        {showFullDetails && (
          <div className="space-y-3 pt-2 border-t border-slate-800 text-xs text-slate-300 animate-fadeIn">
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                {tInv('targetSectors')}
              </span>
              <div className="flex flex-wrap gap-1">
                {investor.preferredSectors.map((sec, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {getLocalizedSector(sec, currentLangCode)}
                  </span>
                ))}
              </div>
            </div>

            {investor.impactFocus && investor.impactFocus.length > 0 && (
              <div>
                <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                  {tInv('impactFocus')}
                </span>
                <span className="text-xs text-emerald-300 font-semibold">
                  {investor.impactFocus.join(' · ')}
                </span>
              </div>
            )}

            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-0.5">
                {tInv('equityPreference')}
              </span>
              <span className="text-xs text-slate-200">
                {investor.equityPreference || 'Equity / Syndicate Safe Note'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span>{tInv('verified')} <strong className="text-slate-300">{investor.lastVerified}</strong></span>
              <span><strong className="text-emerald-400">{tInv('statusActive')}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="text-xs font-bold text-slate-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
        >
          <span>{showFullDetails ? tInv('lessDetails') : tInv('fullProfile')}</span>
          {showFullDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <a
          href={investor.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          <span>{tInv('visitPortal')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
