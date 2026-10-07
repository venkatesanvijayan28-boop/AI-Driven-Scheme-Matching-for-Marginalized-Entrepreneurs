import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DisclaimerNotice({ className = '' }) {
  const { t } = useApp();

  return (
    <div className={`flex items-start gap-3 p-4 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 text-slate-300 text-xs shadow-lg ${className}`}>
      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <span className="font-bold text-amber-300 mr-1">{t('disclaimerTitle') || 'Preliminary Match Notice: '}</span>
        <span className="text-slate-400">{t('disclaimerText')}</span>
      </div>
    </div>
  );
}
