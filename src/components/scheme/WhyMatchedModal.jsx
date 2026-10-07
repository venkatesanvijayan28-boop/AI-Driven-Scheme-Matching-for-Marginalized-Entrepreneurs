import React from 'react';
import Modal from '../common/Modal';
import MatchScoreBadge from '../common/MatchScoreBadge';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WhyMatchedModal({ scheme, isOpen, onClose }) {
  const { currentProfile, t } = useApp();
  const navigate = useNavigate();

  if (!scheme) return null;

  const factorList = [
    { label: 'Business Sector & Activity', score: scheme.factorScores?.sectorMatch || 95, note: `Matches ${currentProfile.sector}` },
    { label: 'Geographical Location & Area', score: scheme.factorScores?.locationMatch || 92, note: `${currentProfile.locationType} (${currentProfile.state})` },
    { label: 'Funding Requirement Fit', score: scheme.factorScores?.fundingMatch || 94, note: `Requirement: ${currentProfile.fundingRequired}` },
    { label: 'Income & Social Category Priority', score: scheme.factorScores?.categoryMatch || 90, note: `${currentProfile.socialCategory}` },
    { label: 'Enterprise Stage Suitability', score: scheme.factorScores?.stageMatch || 95, note: `Stage: ${currentProfile.stage}` },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-amber-400/10 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>AI Eligibility & Match Breakdown</span>
        </div>
      }
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header Scheme Overview */}
        <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                {scheme.shortName}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-medium">{scheme.department}</span>
            </div>
            <h4 className="text-base font-black text-white mt-1">
              {scheme.name}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Evaluating compatibility for <strong className="text-white">{currentProfile.name}</strong> ({currentProfile.businessName})
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center sm:items-end">
            <MatchScoreBadge score={scheme.matchScore} size="lg" />
            <span className="text-[10.5px] text-slate-400 mt-1 font-bold">Synthesized Confidence</span>
          </div>
        </div>

        {/* Explainability Multi-Factor Weighting Bars */}
        <div>
          <h5 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Evaluated Matching Factors</span>
            <span className="text-slate-500 font-bold">Score Breakdown (0 - 100%)</span>
          </h5>

          <div className="space-y-3 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            {factorList.map((factor, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-slate-200 flex items-center gap-2">
                    <span>{factor.label}</span>
                    <span className="text-[11px] font-medium text-slate-400">({factor.note})</span>
                  </div>
                  <span className="font-black text-amber-400">{factor.score}%</span>
                </div>
                {/* Progress Meter */}
                <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      factor.score >= 90
                        ? 'bg-emerald-400'
                        : factor.score >= 80
                        ? 'bg-amber-400'
                        : 'bg-indigo-400'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainability Bullet Highlights */}
        <div>
          <h5 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
            Key Affirmative Action Reasons
          </h5>
          <div className="space-y-2">
            {scheme.whyMatchedReasons?.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Deterministic XAI Rule Engine</span>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate(`/schemes/${scheme.id}`);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t('viewDetails') || 'View Full Scheme'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
