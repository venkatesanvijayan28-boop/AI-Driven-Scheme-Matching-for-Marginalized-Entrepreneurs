import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MatchScoreBadge({ score, size = 'md', showLabel = true }) {
  let colorStyle = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  let badgeLabel = 'Strong Match';

  if (score >= 90) {
    colorStyle = 'text-emerald-700 bg-emerald-50 border-emerald-300 ring-emerald-500/20';
    badgeLabel = 'Strong Match';
  } else if (score >= 80) {
    colorStyle = 'text-blue-700 bg-blue-50 border-blue-300 ring-blue-500/20';
    badgeLabel = 'High Match';
  } else if (score >= 70) {
    colorStyle = 'text-amber-700 bg-amber-50 border-amber-300 ring-amber-500/20';
    badgeLabel = 'Moderate Match';
  } else {
    colorStyle = 'text-slate-700 bg-slate-100 border-slate-300';
    badgeLabel = 'General Fit';
  }

  if (size === 'lg') {
    return (
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs ${colorStyle}`}>
        <Sparkles className="w-4 h-4 shrink-0" />
        <span className="font-bold text-base">{score}%</span>
        {showLabel && <span className="text-xs font-semibold uppercase tracking-wider pl-1 border-l border-current/20">{badgeLabel}</span>}
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-bold ${colorStyle}`}>
        {score}%
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${colorStyle}`}>
      <Sparkles className="w-3.5 h-3.5 shrink-0" />
      <span>{score}% Match</span>
    </div>
  );
}
