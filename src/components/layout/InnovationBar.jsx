import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Mic, 
  Cpu, 
  HelpCircle, 
  IndianRupee, 
  Building, 
  FileCheck2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function InnovationBar() {
  const { t } = useApp();

  const steps = [
    { number: '01', title: t('stepNeed') || 'Need', subtitle: t('stepNeedDesc') || 'Voice & Profile', icon: Mic, active: true },
    { number: '02', title: t('stepMatch') || 'Match', subtitle: t('stepMatchDesc') || 'AI Multi-Param Fit', icon: Cpu, active: true },
    { number: '03', title: t('stepExplain') || 'Explain', subtitle: t('stepExplainDesc') || 'XAI Breakdown', icon: HelpCircle, active: true },
    { number: '04', title: t('stepFinance') || 'Finance', subtitle: t('stepFinanceDesc') || '35% Subsidies', icon: IndianRupee, active: true },
    { number: '05', title: t('stepPartner') || 'Partner', subtitle: t('stepPartnerDesc') || 'Bank & CSC', icon: Building, active: true },
    { number: '06', title: t('stepApply') || 'Apply', subtitle: t('stepApplyDesc') || '7-Stage Roadmap', icon: FileCheck2, active: true },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 rounded-3xl border border-slate-800/80 p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight">
              {t('innovationJourney') || 'The SchemeMatch AI Decision Journey'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t('innovationSubtitle') || 'Deterministic rule graph combined with multi-lingual conversational access'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('zeroBlackBoxBadge') || 'Zero Black-Box XAI'}</span>
          </span>
        </div>
      </div>

      {/* 6 High-Tech Step Pills */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-amber-400/80 font-mono">
                  STEP {step.number}
                </span>
                <div className="w-6 h-6 rounded-lg bg-slate-700/60 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-300 flex items-center justify-center transition">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-white group-hover:text-amber-300 transition">
                  {step.title}
                </p>
                <p className="text-[10.5px] text-slate-400 leading-tight mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
