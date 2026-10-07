import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function EligibilityBadge({ status = 'pass', label }) {
  if (status === 'pass') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {label || 'Likely Matches'}
      </span>
    );
  }

  if (status === 'verify') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertCircle className="w-3.5 h-3.5" />
        {label || 'Needs Verification'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
      <XCircle className="w-3.5 h-3.5" />
      {label || 'Criteria Unmet'}
    </span>
  );
}
